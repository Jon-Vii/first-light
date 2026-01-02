/**
 * AudioManager - Handles all game audio
 * Uses Web Audio API for procedural sound generation
 */

// Ambient audio configuration - all tunable parameters in one place
const AMBIENT_CONFIG = {
  // Master levels
  AMBIENT_MASTER_GAIN: 0.25,
  FADE_IN_TIME: 3.0,
  FADE_OUT_TIME: 2.0,

  // Sub bass layer
  SUB_BASS: {
    FREQUENCY: 36.71,    // D1 - below pitch perception
    GAIN: 0.06,
    LFO_RATE: 0.02,      // Hz
    LFO_DEPTH: 2,        // +/- Hz
  },

  // Drone pad layer
  DRONE: {
    FREQUENCIES: [73.42, 110, 146.83],  // D2, A2, D3 (root, fifth, octave)
    DETUNE_HZ: [0.5, 0.3, 0.4],         // Slight detuning for beating
    GAINS: [0.025, 0.018, 0.012],       // Decreasing volume for higher partials
    FILTER_FREQ: 400,
    FILTER_Q: 0.7,
    FILTER_LFO_RATE: 0.03,
    FILTER_LFO_MIN: 300,
    FILTER_LFO_MAX: 600,
  },

  // Texture bed layer (filtered noise)
  TEXTURE: {
    GAIN: 0.008,
    HPF_FREQ: 800,
    BPF_FREQ_LEFT: 1800,
    BPF_FREQ_RIGHT: 2200,
    BPF_Q: 0.3,
    LFO_RATE: 0.015,
    LFO_DEPTH: 400,
  },

  // High shimmer layer
  SHIMMER: {
    FREQUENCIES: [1046.5, 1318.5, 1568, 2093],  // C6, E6, G6, C7
    GAIN_MIN: 0.003,
    GAIN_MAX: 0.008,
    FADE_TIME_MIN: 8,
    FADE_TIME_MAX: 15,
    HOLD_TIME_MIN: 5,
    HOLD_TIME_MAX: 20,
    MAX_CONCURRENT: 2,
  },

  // Bus levels
  BUSES: {
    SUB_BASS: 0.5,
    DRONE: 0.7,
    TEXTURE: 0.4,
    SHIMMER: 0.3,
  },

  // Spatial delay
  SPATIAL: {
    DELAY_LEFT: 1.2,
    DELAY_RIGHT: 1.7,
    FEEDBACK_LEFT: 0.15,
    FEEDBACK_RIGHT: 0.12,
    WET_MIX: 0.08,
    DELAY_LPF: 2000,
  },

  // Master filtering
  MASTER_HPF: 20,
  MASTER_LPF: 8000,
};

export class AudioManager {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private ambientNodes: OscillatorNode[] = [];
  private isAmbientPlaying: boolean = false;
  private initialized: boolean = false;

  // New ambient system - layer nodes
  private subBassOsc: OscillatorNode | null = null;
  private subBassGain: GainNode | null = null;
  private subBassLFO: OscillatorNode | null = null;
  private subBassLFOGain: GainNode | null = null;

  private droneOscillators: OscillatorNode[] = [];
  private droneGains: GainNode[] = [];
  private droneFilter: BiquadFilterNode | null = null;
  private droneLFO: OscillatorNode | null = null;
  private droneLFOGain: GainNode | null = null;

  private textureSource: AudioBufferSourceNode | null = null;
  private textureGainNode: GainNode | null = null;
  private textureLFO: OscillatorNode | null = null;
  private textureFiltersLeft: BiquadFilterNode[] = [];
  private textureFiltersRight: BiquadFilterNode[] = [];

  private shimmerOscillators: Map<number, OscillatorNode> = new Map();
  private shimmerGains: Map<number, GainNode> = new Map();
  private shimmerPanners: Map<number, StereoPannerNode> = new Map();
  private shimmerTimeouts: ReturnType<typeof setTimeout>[] = [];
  private activeShimmerCount: number = 0;

  // Layer buses
  private subBassBus: GainNode | null = null;
  private droneBus: GainNode | null = null;
  private textureBus: GainNode | null = null;
  private shimmerBus: GainNode | null = null;

  // Ambient master chain
  private ambientMaster: GainNode | null = null;
  private ambientHPF: BiquadFilterNode | null = null;
  private ambientLPF: BiquadFilterNode | null = null;

  // Spatial processing
  private spatialMerger: ChannelMergerNode | null = null;
  private delayLeft: DelayNode | null = null;
  private delayRight: DelayNode | null = null;
  private delayFeedbackLeft: GainNode | null = null;
  private delayFeedbackRight: GainNode | null = null;
  private delayWetGain: GainNode | null = null;
  private delayFilterLeft: BiquadFilterNode | null = null;
  private delayFilterRight: BiquadFilterNode | null = null;

  // Discovery build-up state
  private buildUpOscillators: OscillatorNode[] = [];
  private buildUpGains: GainNode[] = [];
  private isBuildUpPlaying: boolean = false;

  // Pentatonic scale frequencies (C major pentatonic: C, D, E, G, A)
  private readonly pentatonicScale = [
    523.25,  // C5
    587.33,  // D5
    659.25,  // E5
    783.99,  // G5
    880.00,  // A5
    1046.50, // C6
  ];

  constructor() {
    // Audio context will be created on first user interaction
    this.initOnInteraction();
  }

  /**
   * Initialize audio context on first user interaction (browser requirement)
   */
  private initOnInteraction(): void {
    const initAudio = () => {
      this.ensureInitialized();
      document.removeEventListener('click', initAudio);
      document.removeEventListener('keydown', initAudio);
      document.removeEventListener('mousemove', initAudio);
    };

    document.addEventListener('click', initAudio);
    document.addEventListener('keydown', initAudio);
    document.addEventListener('mousemove', initAudio);
  }

  /**
   * Ensure audio context is initialized and will be running
   * Note: Sounds scheduled on a suspended context will play when resumed
   */
  private ensureInitialized(): boolean {
    // Already initialized - just try to resume if needed
    if (this.initialized && this.audioContext) {
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
      // Return true even if suspended - scheduled sounds will play when resumed
      return true;
    }

    try {
      this.audioContext = new AudioContext();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.value = 0.3;
      this.masterGain.connect(this.audioContext.destination);

      this.ambientGain = this.audioContext.createGain();
      this.ambientGain.gain.value = 0;
      this.ambientGain.connect(this.masterGain);

      this.initialized = true;
      console.log('🔊 Audio initialized, state:', this.audioContext.state);

      // Try to resume immediately
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      return true;
    } catch (e) {
      console.warn('Audio initialization failed:', e);
      return false;
    }
  }

  // ========== NEW AMBIENT SYSTEM HELPERS ==========

  /**
   * Create the ambient bus routing and master chain
   */
  private createAmbientBuses(): void {
    if (!this.audioContext || !this.masterGain) return;

    const ctx = this.audioContext;

    // Create layer buses
    this.subBassBus = ctx.createGain();
    this.subBassBus.gain.value = AMBIENT_CONFIG.BUSES.SUB_BASS;

    this.droneBus = ctx.createGain();
    this.droneBus.gain.value = AMBIENT_CONFIG.BUSES.DRONE;

    this.textureBus = ctx.createGain();
    this.textureBus.gain.value = AMBIENT_CONFIG.BUSES.TEXTURE;

    this.shimmerBus = ctx.createGain();
    this.shimmerBus.gain.value = AMBIENT_CONFIG.BUSES.SHIMMER;

    // Create ambient master with HPF -> LPF chain
    this.ambientHPF = ctx.createBiquadFilter();
    this.ambientHPF.type = 'highpass';
    this.ambientHPF.frequency.value = AMBIENT_CONFIG.MASTER_HPF;

    this.ambientLPF = ctx.createBiquadFilter();
    this.ambientLPF.type = 'lowpass';
    this.ambientLPF.frequency.value = AMBIENT_CONFIG.MASTER_LPF;

    this.ambientMaster = ctx.createGain();
    this.ambientMaster.gain.value = 0; // Start silent, fade in

    // Route buses -> HPF -> LPF -> master -> main
    this.subBassBus.connect(this.ambientHPF);
    this.droneBus.connect(this.ambientHPF);
    this.textureBus.connect(this.ambientHPF);
    this.shimmerBus.connect(this.ambientHPF);

    this.ambientHPF.connect(this.ambientLPF);
    this.ambientLPF.connect(this.ambientMaster);
    this.ambientMaster.connect(this.masterGain);
  }

  /**
   * Create an LFO (low frequency oscillator) for modulation
   */
  private createLFO(rate: number): OscillatorNode {
    if (!this.audioContext) throw new Error('AudioContext not initialized');

    const lfo = this.audioContext.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = rate;
    return lfo;
  }

  /**
   * Connect an LFO to an AudioParam with range mapping
   * LFO outputs -1 to 1, this maps to min-max range
   */
  private connectLFOToParam(
    lfo: OscillatorNode,
    param: AudioParam,
    min: number,
    max: number
  ): GainNode {
    if (!this.audioContext) throw new Error('AudioContext not initialized');

    // LFO -> gain (scales to range) -> param
    const range = (max - min) / 2;
    const center = min + range;

    const lfoGain = this.audioContext.createGain();
    lfoGain.gain.value = range;

    lfo.connect(lfoGain);
    lfoGain.connect(param);
    param.value = center;

    return lfoGain;
  }

  /**
   * Initialize spatial delay processing for depth
   */
  private initSpatialProcessing(): void {
    if (!this.audioContext || !this.ambientLPF || !this.ambientMaster) return;

    const ctx = this.audioContext;
    const cfg = AMBIENT_CONFIG.SPATIAL;

    // Create stereo delay network
    this.delayLeft = ctx.createDelay(cfg.DELAY_LEFT + 0.1);
    this.delayLeft.delayTime.value = cfg.DELAY_LEFT;

    this.delayRight = ctx.createDelay(cfg.DELAY_RIGHT + 0.1);
    this.delayRight.delayTime.value = cfg.DELAY_RIGHT;

    // Feedback gains
    this.delayFeedbackLeft = ctx.createGain();
    this.delayFeedbackLeft.gain.value = cfg.FEEDBACK_LEFT;

    this.delayFeedbackRight = ctx.createGain();
    this.delayFeedbackRight.gain.value = cfg.FEEDBACK_RIGHT;

    // Low-pass filters on delay tails
    this.delayFilterLeft = ctx.createBiquadFilter();
    this.delayFilterLeft.type = 'lowpass';
    this.delayFilterLeft.frequency.value = cfg.DELAY_LPF;

    this.delayFilterRight = ctx.createBiquadFilter();
    this.delayFilterRight.type = 'lowpass';
    this.delayFilterRight.frequency.value = cfg.DELAY_LPF;

    // Wet mix gain
    this.delayWetGain = ctx.createGain();
    this.delayWetGain.gain.value = cfg.WET_MIX;

    // Stereo merger
    this.spatialMerger = ctx.createChannelMerger(2);

    // Route: LPF output -> delays -> filters -> feedback -> merger -> wet gain -> master
    this.ambientLPF.connect(this.delayLeft);
    this.ambientLPF.connect(this.delayRight);

    this.delayLeft.connect(this.delayFilterLeft);
    this.delayRight.connect(this.delayFilterRight);

    // Feedback loops
    this.delayFilterLeft.connect(this.delayFeedbackLeft);
    this.delayFeedbackLeft.connect(this.delayLeft);

    this.delayFilterRight.connect(this.delayFeedbackRight);
    this.delayFeedbackRight.connect(this.delayRight);

    // Merge to stereo and mix
    this.delayFilterLeft.connect(this.spatialMerger, 0, 0);
    this.delayFilterRight.connect(this.spatialMerger, 0, 1);
    this.spatialMerger.connect(this.delayWetGain);
    this.delayWetGain.connect(this.ambientMaster);
  }

  /**
   * Initialize sub bass layer with frequency LFO
   */
  private initSubBassLayer(): void {
    if (!this.audioContext || !this.subBassBus) return;

    const ctx = this.audioContext;
    const cfg = AMBIENT_CONFIG.SUB_BASS;

    // Create oscillator
    this.subBassOsc = ctx.createOscillator();
    this.subBassOsc.type = 'sine';
    this.subBassOsc.frequency.value = cfg.FREQUENCY;

    // Create gain
    this.subBassGain = ctx.createGain();
    this.subBassGain.gain.value = cfg.GAIN;

    // Create frequency LFO
    this.subBassLFO = this.createLFO(cfg.LFO_RATE);
    this.subBassLFOGain = this.connectLFOToParam(
      this.subBassLFO,
      this.subBassOsc.frequency,
      cfg.FREQUENCY - cfg.LFO_DEPTH,
      cfg.FREQUENCY + cfg.LFO_DEPTH
    );

    // Connect: osc -> gain -> bus
    this.subBassOsc.connect(this.subBassGain);
    this.subBassGain.connect(this.subBassBus);

    // Start
    this.subBassOsc.start();
    this.subBassLFO.start();
  }

  /**
   * Initialize drone pad layer with detuned oscillator pairs and filter LFO
   */
  private initDroneLayer(): void {
    if (!this.audioContext || !this.droneBus) return;

    const ctx = this.audioContext;
    const cfg = AMBIENT_CONFIG.DRONE;

    // Create filter
    this.droneFilter = ctx.createBiquadFilter();
    this.droneFilter.type = 'lowpass';
    this.droneFilter.frequency.value = cfg.FILTER_FREQ;
    this.droneFilter.Q.value = cfg.FILTER_Q;

    // Create filter LFO
    this.droneLFO = this.createLFO(cfg.FILTER_LFO_RATE);
    this.droneLFOGain = this.connectLFOToParam(
      this.droneLFO,
      this.droneFilter.frequency,
      cfg.FILTER_LFO_MIN,
      cfg.FILTER_LFO_MAX
    );
    this.droneLFO.start();

    // Create oscillator pairs for each frequency
    for (let i = 0; i < cfg.FREQUENCIES.length; i++) {
      const baseFreq = cfg.FREQUENCIES[i]!;
      const detune = cfg.DETUNE_HZ[i]!;
      const gain = cfg.GAINS[i]!;

      // Oscillator A (primary - triangle for odd harmonics)
      const oscA = ctx.createOscillator();
      oscA.type = i === 1 ? 'sine' : 'triangle'; // Fifth is sine, root/octave are triangle
      oscA.frequency.value = baseFreq;

      const gainA = ctx.createGain();
      gainA.gain.value = gain;

      oscA.connect(gainA);
      gainA.connect(this.droneFilter);
      oscA.start();

      this.droneOscillators.push(oscA);
      this.droneGains.push(gainA);

      // Oscillator B (detuned - sine for smooth beating)
      const oscB = ctx.createOscillator();
      oscB.type = 'sine';
      oscB.frequency.value = baseFreq + detune;

      const gainB = ctx.createGain();
      gainB.gain.value = gain;

      oscB.connect(gainB);
      gainB.connect(this.droneFilter);
      oscB.start();

      this.droneOscillators.push(oscB);
      this.droneGains.push(gainB);
    }

    // Connect filter to bus
    this.droneFilter.connect(this.droneBus);
  }

  /**
   * Initialize texture bed layer with stereo filtered noise
   */
  private initTextureLayer(): void {
    if (!this.audioContext || !this.textureBus) return;

    const ctx = this.audioContext;
    const cfg = AMBIENT_CONFIG.TEXTURE;

    // Create white noise buffer
    const bufferSize = ctx.sampleRate * 2; // 2 seconds, will loop
    const noiseBuffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);

    // Fill with white noise (stereo)
    for (let channel = 0; channel < 2; channel++) {
      const data = noiseBuffer.getChannelData(channel);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    }

    // Create buffer source
    this.textureSource = ctx.createBufferSource();
    this.textureSource.buffer = noiseBuffer;
    this.textureSource.loop = true;

    // Create channel splitter for stereo processing
    const splitter = ctx.createChannelSplitter(2);
    const merger = ctx.createChannelMerger(2);

    // Left channel filters: HPF -> BPF
    const hpfLeft = ctx.createBiquadFilter();
    hpfLeft.type = 'highpass';
    hpfLeft.frequency.value = cfg.HPF_FREQ;

    const bpfLeft = ctx.createBiquadFilter();
    bpfLeft.type = 'bandpass';
    bpfLeft.frequency.value = cfg.BPF_FREQ_LEFT;
    bpfLeft.Q.value = cfg.BPF_Q;

    this.textureFiltersLeft = [hpfLeft, bpfLeft];

    // Right channel filters: HPF -> BPF (different frequency)
    const hpfRight = ctx.createBiquadFilter();
    hpfRight.type = 'highpass';
    hpfRight.frequency.value = cfg.HPF_FREQ;

    const bpfRight = ctx.createBiquadFilter();
    bpfRight.type = 'bandpass';
    bpfRight.frequency.value = cfg.BPF_FREQ_RIGHT;
    bpfRight.Q.value = cfg.BPF_Q;

    this.textureFiltersRight = [hpfRight, bpfRight];

    // Create gain
    this.textureGainNode = ctx.createGain();
    this.textureGainNode.gain.value = cfg.GAIN;

    // Create LFO for band-pass modulation (modulates both channels)
    this.textureLFO = this.createLFO(cfg.LFO_RATE);

    // Connect LFO to both band-pass filters
    const lfoGainLeft = ctx.createGain();
    lfoGainLeft.gain.value = cfg.LFO_DEPTH;
    this.textureLFO.connect(lfoGainLeft);
    lfoGainLeft.connect(bpfLeft.frequency);

    const lfoGainRight = ctx.createGain();
    lfoGainRight.gain.value = cfg.LFO_DEPTH;
    this.textureLFO.connect(lfoGainRight);
    lfoGainRight.connect(bpfRight.frequency);

    // Route: source -> splitter -> filters -> merger -> gain -> bus
    this.textureSource.connect(splitter);

    splitter.connect(hpfLeft, 0);
    hpfLeft.connect(bpfLeft);
    bpfLeft.connect(merger, 0, 0);

    splitter.connect(hpfRight, 1);
    hpfRight.connect(bpfRight);
    bpfRight.connect(merger, 0, 1);

    merger.connect(this.textureGainNode);
    this.textureGainNode.connect(this.textureBus);

    // Start
    this.textureSource.start();
    this.textureLFO.start();
  }

  /**
   * Initialize shimmer layer with random fade in/out scheduling
   */
  private initShimmerLayer(): void {
    if (!this.audioContext || !this.shimmerBus) return;

    // Start scheduling shimmers for each frequency slot
    for (let i = 0; i < AMBIENT_CONFIG.SHIMMER.FREQUENCIES.length; i++) {
      this.scheduleNextShimmer(i);
    }
  }

  /**
   * Schedule the next shimmer note for a given slot
   */
  private scheduleNextShimmer(index: number): void {
    if (!this.audioContext || !this.isAmbientPlaying) return;

    const cfg = AMBIENT_CONFIG.SHIMMER;

    // Random delay before starting
    const delay = (cfg.HOLD_TIME_MIN + Math.random() * (cfg.HOLD_TIME_MAX - cfg.HOLD_TIME_MIN)) * 1000;

    const timeout = setTimeout(() => {
      if (!this.isAmbientPlaying) return;

      // Check if we're at max concurrent shimmers
      if (this.activeShimmerCount >= cfg.MAX_CONCURRENT) {
        // Try again later
        this.scheduleNextShimmer(index);
        return;
      }

      const freq = cfg.FREQUENCIES[index]!;
      const fadeTime = cfg.FADE_TIME_MIN + Math.random() * (cfg.FADE_TIME_MAX - cfg.FADE_TIME_MIN);
      const holdTime = cfg.HOLD_TIME_MIN + Math.random() * (cfg.HOLD_TIME_MAX - cfg.HOLD_TIME_MIN);

      this.fadeInShimmer(index, freq, fadeTime, holdTime);
    }, delay);

    this.shimmerTimeouts.push(timeout);
  }

  /**
   * Fade in a shimmer note
   */
  private fadeInShimmer(index: number, frequency: number, fadeTime: number, holdTime: number): void {
    if (!this.audioContext || !this.shimmerBus) return;

    const ctx = this.audioContext;
    const cfg = AMBIENT_CONFIG.SHIMMER;
    const now = ctx.currentTime;

    // Create oscillator
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = frequency;

    // Create gain
    const gain = ctx.createGain();
    const targetGain = cfg.GAIN_MIN + Math.random() * (cfg.GAIN_MAX - cfg.GAIN_MIN);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(targetGain, now + fadeTime);

    // Create panner (subtle stereo positioning)
    const panner = ctx.createStereoPanner();
    panner.pan.value = (Math.random() - 0.5) * 1.2; // -0.6 to 0.6

    // Connect: osc -> gain -> panner -> bus
    osc.connect(gain);
    gain.connect(panner);
    panner.connect(this.shimmerBus);

    // Store references
    this.shimmerOscillators.set(index, osc);
    this.shimmerGains.set(index, gain);
    this.shimmerPanners.set(index, panner);
    this.activeShimmerCount++;

    // Start
    osc.start();

    // Schedule fade out
    const fadeOutTimeout = setTimeout(() => {
      this.fadeOutShimmer(index, fadeTime);
    }, (holdTime + fadeTime) * 1000);

    this.shimmerTimeouts.push(fadeOutTimeout);
  }

  /**
   * Fade out a shimmer note
   */
  private fadeOutShimmer(index: number, fadeTime: number): void {
    if (!this.audioContext) return;

    const ctx = this.audioContext;
    const now = ctx.currentTime;

    const gain = this.shimmerGains.get(index);
    const osc = this.shimmerOscillators.get(index);
    const panner = this.shimmerPanners.get(index);

    if (gain && osc) {
      // Fade out
      gain.gain.linearRampToValueAtTime(0, now + fadeTime);

      // Clean up after fade
      setTimeout(() => {
        try {
          osc.stop();
          osc.disconnect();
          gain.disconnect();
          panner?.disconnect();
        } catch (e) {
          // Ignore if already stopped
        }

        this.shimmerOscillators.delete(index);
        this.shimmerGains.delete(index);
        this.shimmerPanners.delete(index);
        this.activeShimmerCount--;

        // Schedule next shimmer for this slot
        if (this.isAmbientPlaying) {
          this.scheduleNextShimmer(index);
        }
      }, fadeTime * 1000 + 100);
    }
  }

  /**
   * Clean up all ambient nodes
   */
  private cleanupAmbientNodes(): void {
    // Clear shimmer timeouts
    for (const timeout of this.shimmerTimeouts) {
      clearTimeout(timeout);
    }
    this.shimmerTimeouts = [];

    // Stop and disconnect shimmer oscillators
    for (const [_, osc] of this.shimmerOscillators) {
      try { osc.stop(); osc.disconnect(); } catch (e) { }
    }
    this.shimmerOscillators.clear();
    this.shimmerGains.forEach(g => g.disconnect());
    this.shimmerGains.clear();
    this.shimmerPanners.forEach(p => p.disconnect());
    this.shimmerPanners.clear();
    this.activeShimmerCount = 0;

    // Stop sub bass
    if (this.subBassOsc) {
      try { this.subBassOsc.stop(); this.subBassOsc.disconnect(); } catch (e) { }
      this.subBassOsc = null;
    }
    if (this.subBassLFO) {
      try { this.subBassLFO.stop(); this.subBassLFO.disconnect(); } catch (e) { }
      this.subBassLFO = null;
    }
    this.subBassGain?.disconnect();
    this.subBassGain = null;
    this.subBassLFOGain?.disconnect();
    this.subBassLFOGain = null;

    // Stop drone oscillators
    for (const osc of this.droneOscillators) {
      try { osc.stop(); osc.disconnect(); } catch (e) { }
    }
    this.droneOscillators = [];
    this.droneGains.forEach(g => g.disconnect());
    this.droneGains = [];
    if (this.droneLFO) {
      try { this.droneLFO.stop(); this.droneLFO.disconnect(); } catch (e) { }
      this.droneLFO = null;
    }
    this.droneLFOGain?.disconnect();
    this.droneLFOGain = null;
    this.droneFilter?.disconnect();
    this.droneFilter = null;

    // Stop texture
    if (this.textureSource) {
      try { this.textureSource.stop(); this.textureSource.disconnect(); } catch (e) { }
      this.textureSource = null;
    }
    if (this.textureLFO) {
      try { this.textureLFO.stop(); this.textureLFO.disconnect(); } catch (e) { }
      this.textureLFO = null;
    }
    this.textureGainNode?.disconnect();
    this.textureGainNode = null;
    this.textureFiltersLeft.forEach(f => f.disconnect());
    this.textureFiltersLeft = [];
    this.textureFiltersRight.forEach(f => f.disconnect());
    this.textureFiltersRight = [];

    // Disconnect buses
    this.subBassBus?.disconnect();
    this.subBassBus = null;
    this.droneBus?.disconnect();
    this.droneBus = null;
    this.textureBus?.disconnect();
    this.textureBus = null;
    this.shimmerBus?.disconnect();
    this.shimmerBus = null;

    // Disconnect spatial
    this.delayLeft?.disconnect();
    this.delayLeft = null;
    this.delayRight?.disconnect();
    this.delayRight = null;
    this.delayFeedbackLeft?.disconnect();
    this.delayFeedbackLeft = null;
    this.delayFeedbackRight?.disconnect();
    this.delayFeedbackRight = null;
    this.delayFilterLeft?.disconnect();
    this.delayFilterLeft = null;
    this.delayFilterRight?.disconnect();
    this.delayFilterRight = null;
    this.delayWetGain?.disconnect();
    this.delayWetGain = null;
    this.spatialMerger?.disconnect();
    this.spatialMerger = null;

    // Disconnect master chain
    this.ambientHPF?.disconnect();
    this.ambientHPF = null;
    this.ambientLPF?.disconnect();
    this.ambientLPF = null;
    this.ambientMaster?.disconnect();
    this.ambientMaster = null;
  }

  // ========== END NEW AMBIENT SYSTEM HELPERS ==========

  /**
   * Start ambient background sounds
   * New 4-layer system: sub bass, drone pad, texture, shimmer
   */
  startAmbient(): void {
    if (this.isAmbientPlaying) return;
    if (!this.ensureInitialized() || !this.audioContext || !this.masterGain) return;
    this.isAmbientPlaying = true;

    const now = this.audioContext.currentTime;

    // Create bus routing and master chain
    this.createAmbientBuses();

    // Initialize spatial processing
    this.initSpatialProcessing();

    // Initialize all layers
    this.initSubBassLayer();
    this.initDroneLayer();
    this.initTextureLayer();
    this.initShimmerLayer();

    // Fade in ambient master
    if (this.ambientMaster) {
      this.ambientMaster.gain.linearRampToValueAtTime(
        AMBIENT_CONFIG.AMBIENT_MASTER_GAIN,
        now + AMBIENT_CONFIG.FADE_IN_TIME
      );
    }
  }

  /**
   * Stop ambient sounds
   */
  stopAmbient(): void {
    if (!this.audioContext || !this.isAmbientPlaying) return;

    const now = this.audioContext.currentTime;

    // Fade out ambient master
    if (this.ambientMaster) {
      this.ambientMaster.gain.linearRampToValueAtTime(0, now + AMBIENT_CONFIG.FADE_OUT_TIME);
    }

    // Clean up after fade
    setTimeout(() => {
      this.cleanupAmbientNodes();
      this.isAmbientPlaying = false;
    }, AMBIENT_CONFIG.FADE_OUT_TIME * 1000 + 100);
  }

  /**
   * Play discovery sound sequence (kept for compatibility, but cosmic flash is now separate)
   */
  playDiscoverySound(): void {
    // Now primarily handled by playCosmicFlash
    this.playCosmicFlash();
  }

  /**
   * Play cosmic flash sound - dramatic completion effect
   * Combines sub-bass thump, rising whoosh, and resonant shimmer
   */
  playCosmicFlash(): void {
    if (!this.ensureInitialized() || !this.audioContext || !this.masterGain) {
      return;
    }

    const ctx = this.audioContext;
    const now = ctx.currentTime;

    // === SUB-BASS THUMP ===
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(50, now);
    subOsc.frequency.exponentialRampToValueAtTime(30, now + 0.3);

    subGain.gain.setValueAtTime(0, now);
    subGain.gain.linearRampToValueAtTime(0.5, now + 0.02);
    subGain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

    subOsc.connect(subGain);
    subGain.connect(this.masterGain);
    subOsc.start(now);
    subOsc.stop(now + 0.6);

    // === RISING WHOOSH (filtered noise) ===
    const bufferSize = ctx.sampleRate * 0.8;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      noiseData[i] = Math.random() * 2 - 1;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(200, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(3000, now + 0.4);
    noiseFilter.Q.value = 1;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0, now);
    noiseGain.gain.linearRampToValueAtTime(0.15, now + 0.1);
    noiseGain.gain.linearRampToValueAtTime(0.2, now + 0.3);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    noiseSource.start(now);
    noiseSource.stop(now + 0.8);

    // === RESONANT SHIMMER (high harmonics) ===
    const shimmerFreqs = [1046.5, 1318.5, 1568, 2093]; // C6, E6, G6, C7
    for (let i = 0; i < shimmerFreqs.length; i++) {
      const freq = shimmerFreqs[i];
      if (!freq) continue;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;

      const startTime = now + 0.1 + i * 0.05;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.12, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(startTime);
      osc.stop(startTime + 1.5);
    }
  }

  /**
   * Play a gentle chime for completing the pattern matching challenge.
   * Lighter than cosmic flash - celebrates player skill, not discovery.
   * Uses a major triad arpeggio (C5 → E5 → G5 → C6) for a clear, uplifting tone.
   */
  playPatternCompletionChime(): void {
    if (!this.ensureInitialized() || !this.audioContext || !this.masterGain) {
      return;
    }

    const currentTime = this.audioContext.currentTime;

    // Create oscillators for a major triad arpeggio (C5 → E5 → G5 → C6)
    const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const baseVolume = 0.15;

    frequencies.forEach((freq, index) => {
      const osc = this.audioContext!.createOscillator();
      const gainNode = this.audioContext!.createGain();

      // Sine wave for pure, bell-like tone
      osc.type = 'sine';
      osc.frequency.value = freq;

      // Stagger the notes in quick succession (50ms apart)
      const startTime = currentTime + (index * 0.05);
      const endTime = startTime + 0.8;

      // Bell envelope: quick attack, gentle decay
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(baseVolume, startTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, endTime);

      osc.connect(gainNode);
      gainNode.connect(this.masterGain!);

      osc.start(startTime);
      osc.stop(endTime);
    });
  }

  /**
   * Play a single star connection sound - rich bell-like chime
   * Uses pentatonic scale, layered oscillators with detuning
   */
  playStarConnectionSound(index: number, total: number): void {
    if (!this.ensureInitialized() || !this.audioContext || !this.masterGain) {
      return;
    }

    const ctx = this.audioContext;
    const now = ctx.currentTime;

    // Pick note from pentatonic scale (cycles through)
    const noteIndex = index % this.pentatonicScale.length;
    const baseFreq = this.pentatonicScale[noteIndex] || 523.25;

    // === MAIN OSCILLATORS WITH SLIGHT DETUNING ===
    const detuneAmount = 3; // Hz

    // Primary oscillator (slightly flat)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.value = baseFreq - detuneAmount;

    // Secondary oscillator (slightly sharp)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.value = baseFreq + detuneAmount;

    // === HARMONIC SHIMMER (octave above, quieter) ===
    const harmOsc = ctx.createOscillator();
    const harmGain = ctx.createGain();
    harmOsc.type = 'sine';
    harmOsc.frequency.value = baseFreq * 2;

    // === ENVELOPE SETTINGS ===
    const attackTime = 0.015;
    const decayTime = 0.6;
    const mainVolume = 0.12;
    const harmVolume = 0.04;

    // Main oscillator envelopes
    for (const [osc, gain] of [[osc1, gain1], [osc2, gain2]] as [OscillatorNode, GainNode][]) {
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(mainVolume, now + attackTime);
      gain.gain.exponentialRampToValueAtTime(0.001, now + decayTime);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + decayTime + 0.1);
    }

    // Harmonic envelope (slightly delayed attack for shimmer)
    harmGain.gain.setValueAtTime(0, now);
    harmGain.gain.linearRampToValueAtTime(harmVolume, now + attackTime * 2);
    harmGain.gain.exponentialRampToValueAtTime(0.001, now + decayTime * 0.8);

    harmOsc.connect(harmGain);
    harmGain.connect(this.masterGain);
    harmOsc.start(now);
    harmOsc.stop(now + decayTime);
  }

  /**
   * Start or update discovery build-up sound
   * Called continuously while hovering over a constellation
   */
  playDiscoveryBuildUp(progress: number): void {
    if (!this.ensureInitialized() || !this.audioContext || !this.masterGain) {
      return;
    }

    const ctx = this.audioContext;

    // If not already playing, create the build-up oscillators
    if (!this.isBuildUpPlaying) {
      this.isBuildUpPlaying = true;

      // Low rumble oscillator
      const lowOsc = ctx.createOscillator();
      const lowGain = ctx.createGain();
      lowOsc.type = 'sine';
      lowOsc.frequency.value = 80;
      lowGain.gain.value = 0;
      lowOsc.connect(lowGain);
      lowGain.connect(this.masterGain);
      lowOsc.start();
      this.buildUpOscillators.push(lowOsc);
      this.buildUpGains.push(lowGain);

      // Mid tone oscillator
      const midOsc = ctx.createOscillator();
      const midGain = ctx.createGain();
      midOsc.type = 'sine';
      midOsc.frequency.value = 220;
      midGain.gain.value = 0;
      midOsc.connect(midGain);
      midGain.connect(this.masterGain);
      midOsc.start();
      this.buildUpOscillators.push(midOsc);
      this.buildUpGains.push(midGain);

      // High shimmer oscillator
      const highOsc = ctx.createOscillator();
      const highGain = ctx.createGain();
      highOsc.type = 'sine';
      highOsc.frequency.value = 440;
      highGain.gain.value = 0;
      highOsc.connect(highGain);
      highGain.connect(this.masterGain);
      highOsc.start();
      this.buildUpOscillators.push(highOsc);
      this.buildUpGains.push(highGain);
    }

    // Update based on progress (0-1)
    const now = ctx.currentTime;

    // Low rumble - constant low volume
    if (this.buildUpGains[0]) {
      this.buildUpGains[0].gain.setTargetAtTime(0.03 * progress, now, 0.1);
    }

    // Mid oscillator - pitch rises with progress
    if (this.buildUpOscillators[1] && this.buildUpGains[1]) {
      const midFreq = 220 + progress * 180; // 220 -> 400 Hz
      this.buildUpOscillators[1].frequency.setTargetAtTime(midFreq, now, 0.1);
      this.buildUpGains[1].gain.setTargetAtTime(0.04 * progress, now, 0.1);
    }

    // High shimmer - fades in later in the progress
    if (this.buildUpOscillators[2] && this.buildUpGains[2]) {
      const highProgress = Math.max(0, (progress - 0.5) * 2); // Only after 50%
      const highFreq = 440 + highProgress * 200;
      this.buildUpOscillators[2].frequency.setTargetAtTime(highFreq, now, 0.1);
      this.buildUpGains[2].gain.setTargetAtTime(0.025 * highProgress, now, 0.1);
    }
  }


  /**
   * Stop discovery build-up sound with smooth fade-out
   */
  stopDiscoveryBuildUp(): void {
    if (!this.isBuildUpPlaying || !this.audioContext) return;

    const now = this.audioContext.currentTime;

    // Fade out all build-up gains
    for (const gain of this.buildUpGains) {
      gain.gain.setTargetAtTime(0, now, 0.15);
    }

    // Stop and clean up after fade
    setTimeout(() => {
      for (const osc of this.buildUpOscillators) {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {
          // Ignore if already stopped
        }
      }
      this.buildUpOscillators = [];
      this.buildUpGains = [];
      this.isBuildUpPlaying = false;
    }, 300);
  }

  // === NEBULA AUDIO ===
  private nebulaOscillators: OscillatorNode[] = [];
  private nebulaGains: GainNode[] = [];
  private isNebulaPlaying: boolean = false;

  /**
   * Play atmospheric drone for nebula hover
   * Deep, breathing pads
   */
  startNebulaDrone(progress: number): void {
    if (!this.ensureInitialized() || !this.audioContext || !this.masterGain) return;

    const ctx = this.audioContext;
    const now = ctx.currentTime;

    if (!this.isNebulaPlaying) {
      this.isNebulaPlaying = true;

      // Drone 1: Deep bass
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sawtooth'; // Richer texture
      osc1.frequency.value = 65.41; // C2

      // Filter the sawtooth to make it soft
      const filter1 = ctx.createBiquadFilter();
      filter1.type = 'lowpass';
      filter1.frequency.value = 200;

      osc1.connect(filter1);
      filter1.connect(gain1);
      gain1.connect(this.masterGain);

      osc1.start();
      gain1.gain.value = 0;

      this.nebulaOscillators.push(osc1);
      this.nebulaGains.push(gain1);

      // Drone 2: Fifth
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.value = 98.00; // G2

      osc2.connect(gain2);
      gain2.connect(this.masterGain);

      osc2.start();
      gain2.gain.value = 0;

      this.nebulaOscillators.push(osc2);
      this.nebulaGains.push(gain2);
    }

    // Modulate volume based on progress
    const vol = Math.min(0.2, progress * 0.2);
    for (const gain of this.nebulaGains) {
      gain.gain.setTargetAtTime(vol, now, 0.2);
    }
  }

  stopNebulaDrone(): void {
    if (!this.isNebulaPlaying || !this.audioContext) return;

    const now = this.audioContext.currentTime;
    for (const gain of this.nebulaGains) {
      gain.gain.setTargetAtTime(0, now, 0.5);
    }

    setTimeout(() => {
      this.nebulaOscillators.forEach(o => { try { o.stop(); o.disconnect(); } catch (e) { } });
      this.nebulaGains = [];
      this.nebulaOscillators = [];
      this.isNebulaPlaying = false;
    }, 600);
  }

  // === CLUSTER AUDIO ===

  /**
   * Play a granular sparkle sound for star clusters
   * Burst of high frequency short grains
   */
  playClusterSparkle(intensity: number): void {
    if (!this.ensureInitialized() || !this.audioContext || !this.masterGain) return;

    const ctx = this.audioContext;
    const now = ctx.currentTime;

    // Launch a few high pitched grains
    const count = Math.floor(3 + intensity * 5); // 3 to 8 grains

    for (let i = 0; i < count; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      // Random high frequencies from pentatonic high octaves
      const freqBase = this.pentatonicScale[Math.floor(Math.random() * this.pentatonicScale.length)] || 880;
      osc.frequency.value = freqBase * (Math.random() > 0.5 ? 2 : 4); // Very high

      const timeOffset = Math.random() * 0.1;
      const duration = 0.05 + Math.random() * 0.1;

      gain.gain.setValueAtTime(0, now + timeOffset);
      gain.gain.linearRampToValueAtTime(0.05, now + timeOffset + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + timeOffset);
      osc.stop(now + timeOffset + duration + 0.1);
    }
  }
}
