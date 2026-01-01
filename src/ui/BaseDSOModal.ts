import type { CelestialObject } from '../game/CelestialObject';
import type { AudioManager } from '../audio/AudioManager';

/**
 * Abstract base class for DSO (Deep Sky Object) discovery minigames.
 *
 * Provides shared functionality for all DSO modals:
 * - Two-phase structure (study → challenge)
 * - Timer/countdown management
 * - Canvas rendering coordination
 * - Audio feedback integration
 * - DOM structure creation
 *
 * Each subclass implements type-specific challenge mechanics.
 */
export abstract class BaseDSOModal {
  protected celestialObject: CelestialObject;
  protected onComplete: () => void;
  protected audioManager?: AudioManager;

  protected canvas: HTMLCanvasElement;
  protected ctx: CanvasRenderingContext2D;
  protected modalElement: HTMLElement;

  // Phase tracking
  protected phase: 'study' | 'challenge' = 'study';
  protected studyTimeRemaining: number;
  protected studyTimeDuration: number;
  protected studyTimer: number | null = null;

  constructor(
    celestialObject: CelestialObject,
    onComplete: () => void,
    studyDuration: number = 5,
    audioManager?: AudioManager
  ) {
    this.celestialObject = celestialObject;
    this.onComplete = onComplete;
    this.studyTimeDuration = studyDuration;
    this.studyTimeRemaining = studyDuration;
    this.audioManager = audioManager;

    // Create modal structure
    this.modalElement = this.createModalElement();
    this.canvas = this.modalElement.querySelector('canvas')!;
    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get 2D context');
    this.ctx = ctx;

    // Start study phase
    this.startStudyPhase();
  }

  /**
   * Creates the modal DOM structure.
   * Reuses patterns from PatternMatchModal for consistency.
   */
  protected createModalElement(): HTMLElement {
    const modal = document.createElement('div');
    modal.className = 'dso-modal';

    modal.innerHTML = `
      <div class="modal-frame">
        <div class="frame-corner tl"></div>
        <div class="frame-corner tr"></div>
        <div class="frame-corner bl"></div>
        <div class="frame-corner br"></div>

        <div class="modal-content">
          <div class="modal-header">
            <div class="header-line"></div>
            <h3 class="modal-title">${this.celestialObject.name}</h3>
            <div class="header-line"></div>
          </div>

          <p class="modal-instruction"></p>

          <div class="countdown-container">
            <div class="hourglass">
              <div class="hourglass-top"></div>
              <div class="hourglass-bottom"></div>
              <div class="sand"></div>
            </div>
            <span class="countdown-text"></span>
          </div>

          <canvas width="600" height="300"></canvas>

          <div class="challenge-container hidden"></div>
        </div>
      </div>
    `;

    return modal;
  }

  /**
   * Starts the study phase with countdown timer.
   */
  protected startStudyPhase(): void {
    this.phase = 'study';
    this.updateInstructions();
    this.renderObjectOnCanvas();

    // Add study phase class for CSS styling
    const modalContent = this.modalElement.querySelector('.modal-content')!;
    modalContent.classList.add('phase-study');

    // Start countdown timer
    this.studyTimer = window.setInterval(() => {
      this.studyTimeRemaining -= 0.1;
      this.updateCountdown();

      // Add urgency class in final 2 seconds
      const countdownContainer = this.modalElement.querySelector('.countdown-container')!;
      if (this.studyTimeRemaining <= 2 && this.studyTimeRemaining > 0) {
        countdownContainer.classList.add('urgent');
      }

      if (this.studyTimeRemaining <= 0) {
        this.startChallengePhase();
      }
    }, 100);
  }

  /**
   * Transitions to the challenge phase.
   */
  protected startChallengePhase(): void {
    if (this.studyTimer) {
      clearInterval(this.studyTimer);
      this.studyTimer = null;
    }

    const modalContent = this.modalElement.querySelector('.modal-content')!;

    // Phase transition animation
    modalContent.classList.add('phase-transitioning');

    setTimeout(() => {
      this.phase = 'challenge';
      this.updateInstructions();

      // Show type-specific challenge content
      const challengeContainer = this.modalElement.querySelector('.challenge-container')!;
      challengeContainer.innerHTML = ''; // Clear any previous content
      challengeContainer.appendChild(this.createChallengeContent());
      challengeContainer.classList.remove('hidden');

      // Switch phase classes
      modalContent.classList.remove('phase-study', 'phase-transitioning');
      modalContent.classList.add('phase-challenge');

      // Hide countdown
      this.modalElement.querySelector('.countdown-container')!.classList.add('hidden');
    }, 350); // Match CSS transition duration
  }

  /**
   * Updates instruction text based on current phase.
   */
  protected updateInstructions(): void {
    const instructionEl = this.modalElement.querySelector('.modal-instruction')!;

    if (this.phase === 'study') {
      instructionEl.textContent = this.getStudyInstruction();
    } else {
      instructionEl.textContent = this.getChallengeInstruction();
    }
  }

  /**
   * Updates the countdown timer display.
   */
  protected updateCountdown(): void {
    const countdownText = this.modalElement.querySelector('.countdown-text')!;
    countdownText.textContent = `${Math.ceil(this.studyTimeRemaining)}s`;

    // Animate sand (hourglass animation)
    const progress = 1 - (this.studyTimeRemaining / this.studyTimeDuration);
    const sand = this.modalElement.querySelector('.sand') as HTMLElement;
    if (sand) {
      sand.style.setProperty('--progress', progress.toString());
    }
  }

  /**
   * Renders the celestial object on the canvas.
   * Reuses the object's existing render() method for consistency.
   */
  protected renderObjectOnCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Temporarily mark as discovered to render at full brightness
    const wasDiscovered = this.celestialObject.isDiscovered;
    this.celestialObject.isDiscovered = true;

    // Render centered in canvas with enhanced scale
    this.celestialObject.render(
      this.ctx,
      this.celestialObject.x,  // viewX = object.x centers object horizontally
      this.celestialObject.y,  // viewY = object.y centers object vertically
      this.canvas.width,
      this.canvas.height
    );

    // Restore original discovery state
    this.celestialObject.isDiscovered = wasDiscovered;
  }

  /**
   * Plays audio feedback for correct answer.
   */
  protected playCorrectSound(): void {
    if (this.audioManager) {
      this.audioManager.playStarConnectionSound(0, 1);
    }
  }

  /**
   * Plays audio feedback for incorrect answer.
   */
  protected playErrorTone(): void {
    if (!this.audioManager || !(this.audioManager as any).audioContext) return;

    const ctx = (this.audioManager as any).audioContext;
    const masterGain = (this.audioManager as any).masterGain;
    if (!ctx || !masterGain) return;

    const now = ctx.currentTime;

    // Low frequency tone (150 Hz) with quick decay
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.value = 150;

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.03, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  /**
   * Visual feedback for incorrect answer.
   */
  protected flashIncorrect(): void {
    this.canvas.style.filter = 'brightness(1.3) sepia(0.3)';
    setTimeout(() => {
      this.canvas.style.filter = 'none';
    }, 150);
  }

  /**
   * Completes the challenge and calls the completion callback.
   */
  protected completeChallenge(): void {
    // Show completion state
    const instructionEl = this.modalElement.querySelector('.modal-instruction')!;
    instructionEl.textContent = 'Discovery Complete!';
    instructionEl.classList.add('pattern-complete');

    // Play completion sound
    if (this.audioManager) {
      this.audioManager.playCosmicFlash();
    }

    // Brief delay before completing
    setTimeout(() => {
      this.onComplete();
    }, 1500);
  }

  /**
   * Returns the modal element for rendering.
   */
  render(): HTMLElement {
    return this.modalElement;
  }

  /**
   * Cleanup method to stop timers and free resources.
   */
  destroy(): void {
    if (this.studyTimer) {
      clearInterval(this.studyTimer);
    }
  }

  // ========================================
  // ABSTRACT METHODS - Must be implemented by subclasses
  // ========================================

  /**
   * Returns the study phase instruction text.
   * Each modal type has different instructions.
   */
  protected abstract getStudyInstruction(): string;

  /**
   * Returns the challenge phase instruction text.
   */
  protected abstract getChallengeInstruction(): string;

  /**
   * Creates the type-specific challenge UI content.
   * This is where nebula/cluster/galaxy modals differ.
   */
  protected abstract createChallengeContent(): HTMLElement;
}
