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
   * Play discovery sound sequence
   */
  playDiscoverySound(): void {
    if (!this.ensureInitialized() || !this.audioContext || !this.masterGain) {
      return;
    }

    const ctx = this.audioContext;
    const now = ctx.currentTime;

    // Ascending chime sequence
    const notes = [523.25, 659.25, 783.99, 1046.5];  // C5, E5, G5, C6
    const noteDuration = 0.15;

    for (let i = 0; i < notes.length; i++) {
      const freq = notes[i];
      if (!freq) continue;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;

      const startTime = now + i * noteDuration;

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.3, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + noteDuration * 2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + noteDuration * 3);
    }

    // Final resonant tone
    const finalOsc = ctx.createOscillator();
    const finalGain = ctx.createGain();

    finalOsc.type = 'sine';
    finalOsc.frequency.value = 523.25;  // C5

    const finalStart = now + notes.length * noteDuration;

    finalGain.gain.setValueAtTime(0, finalStart);
    finalGain.gain.linearRampToValueAtTime(0.4, finalStart + 0.1);
    finalGain.gain.exponentialRampToValueAtTime(0.01, finalStart + 1.5);

    finalOsc.connect(finalGain);
    finalGain.connect(this.masterGain);

    finalOsc.start(finalStart);
    finalOsc.stop(finalStart + 2);
  }

  /**
   * Play a single star connection sound
   */
  playStarConnectionSound(index: number, total: number): void {
    console.log(`🔊 Playing connection sound ${index + 1}/${total}`);
    if (!this.ensureInitialized() || !this.audioContext || !this.masterGain) {
      console.warn('Audio not initialized for connection sound');
      return;
    }

    const ctx = this.audioContext;
    const now = ctx.currentTime;

    // Ascending pitch based on progress
    const baseFreq = 400;
    const freq = baseFreq + (index / total) * 400;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.value = freq;

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.3);
  }
}
