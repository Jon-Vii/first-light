/**
 * AudioManager - Handles all game audio
 * Uses Web Audio API for procedural sound generation
 */

export class AudioManager {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private ambientNodes: OscillatorNode[] = [];
  private isAmbientPlaying: boolean = false;
  private initialized: boolean = false;

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

  /**
   * Start ambient background sounds
   */
  startAmbient(): void {
    if (this.isAmbientPlaying) return;
    if (!this.ensureInitialized() || !this.audioContext || !this.ambientGain) return;
    this.isAmbientPlaying = true;

    // Create ethereal drone using multiple oscillators
    const frequencies = [55, 82.5, 110, 165];  // Low harmonious frequencies

    const now = this.audioContext.currentTime;

    for (const freq of frequencies) {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;

      // Very subtle volume for ambient feel
      gain.gain.value = 0.02;

      osc.connect(gain);
      gain.connect(this.ambientGain);

      osc.start();
      this.ambientNodes.push(osc);
    }

    // Fade in ambient
    this.ambientGain.gain.linearRampToValueAtTime(0.5, now + 2);
  }

  /**
   * Stop ambient sounds
   */
  stopAmbient(): void {
    if (!this.audioContext || !this.ambientGain) return;

    const now = this.audioContext.currentTime;
    this.ambientGain.gain.linearRampToValueAtTime(0, now + 1);

    setTimeout(() => {
      for (const osc of this.ambientNodes) {
        osc.stop();
        osc.disconnect();
      }
      this.ambientNodes = [];
      this.isAmbientPlaying = false;
    }, 1000);
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
