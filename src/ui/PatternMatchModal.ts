import type { Constellation } from '../game/Constellation';
import type { ConstellationData, Star } from '../data/types';
import type { AudioManager } from '../audio/AudioManager';
import { SKY_WIDTH } from '../data/constellations';

interface DecoyStar {
  x: number;
  y: number;
}

export class PatternMatchModal {
  private constellation: Constellation;
  private data: ConstellationData;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private modalElement: HTMLElement;

  private targetStars: Set<number>; // Indices of constellation stars
  private clickedStars: Set<number>;
  private decoyStars: DecoyStar[] = [];

  private onComplete: () => void;

  // Phase tracking
  private phase: 'study' | 'challenge' = 'study';
  private studyTimeDuration: number;
  private studyTimeRemaining: number;
  private studyTimer: number | null = null;

  // Coordinate transformation
  private bounds!: { minX: number; maxX: number; minY: number; maxY: number; width: number; height: number };
  private scale: number = 1;
  private offsetX: number = 0;
  private offsetY: number = 0;

  // Normalized star positions (handles wrap-around)
  private normalizedStars: Array<{ x: number; y: number }> = [];

  // Animation loop
  private animationFrameId: number | null = null;
  private animationStartTime: number = 0;

  // Click/touch handler references for cleanup
  private clickHandler: ((e: MouseEvent) => void) | null = null;
  private touchHandler: ((e: TouchEvent) => void) | null = null;

  // Connection animations
  private animatingConnections: Map<string, number> = new Map(); // key: "idx1-idx2", value: animationProgress 0-1

  // Audio
  private audioManager?: AudioManager;

  constructor(constellation: Constellation, onComplete: () => void, audioManager?: AudioManager) {
    this.constellation = constellation;
    this.data = constellation.getData();
    this.onComplete = onComplete;
    this.audioManager = audioManager;

    // Calculate study time based on constellation complexity
    this.studyTimeDuration = this.calculateStudyTime();
    this.studyTimeRemaining = this.studyTimeDuration;

    // Initialize target stars (all stars in constellation)
    this.targetStars = new Set();
    for (let i = 0; i < this.data.stars.length; i++) {
      this.targetStars.add(i);
    }
    this.clickedStars = new Set();

    // Create modal structure
    this.modalElement = this.createModalElement();
    this.canvas = this.modalElement.querySelector('canvas')!;
    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get 2D context');
    this.ctx = ctx;

    // Apply high-DPI scaling for crisp rendering on retina displays
    this.setupHighDPICanvas();

    // Calculate bounds and scaling for coordinate transformation
    this.calculateBounds();

    // Generate decoy stars
    this.generateDecoyStars();

    // Start study phase
    this.startStudyPhase();
  }

  private createModalElement(): HTMLElement {
    const modal = document.createElement('div');
    modal.className = 'pattern-match-modal';

    modal.innerHTML = `
      <div class="modal-frame">
        <div class="frame-corner tl"></div>
        <div class="frame-corner tr"></div>
        <div class="frame-corner bl"></div>
        <div class="frame-corner br"></div>

        <div class="modal-content">
          <div class="modal-header">
            <div class="header-line"></div>
            <h3 class="modal-title"></h3>
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

          <div class="progress-container hidden">
            <div class="progress-text"></div>
          </div>
        </div>
      </div>
    `;

    return modal;
  }

  private calculateStudyTime(): number {
    const starCount = this.data.stars.length;
    // Base 5 seconds + 0.3 seconds per star above 10
    // e.g., 10 stars = 5s, 15 stars = 6.5s, 20 stars = 8s
    return Math.max(5, 5 + (starCount - 10) * 0.3);
  }

  /**
   * Setup high-DPI canvas scaling for crisp rendering on retina displays.
   * Similar to Game.ts resizeCanvas() approach.
   */
  private setupHighDPICanvas(): void {
    const dpr = window.devicePixelRatio || 1;
    const logicalWidth = 600;
    const logicalHeight = 300;

    // Set canvas internal resolution to match device pixels
    this.canvas.width = logicalWidth * dpr;
    this.canvas.height = logicalHeight * dpr;

    // CSS size remains at logical pixels
    this.canvas.style.width = `${logicalWidth}px`;
    this.canvas.style.height = `${logicalHeight}px`;

    // Scale context so all drawing operations happen at device resolution
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  private getConnectionKey(idx1: number, idx2: number): string {
    return idx1 < idx2 ? `${idx1}-${idx2}` : `${idx2}-${idx1}`;
  }

  private calculateBounds(): void {
    // First, normalize star positions to handle wrap-around
    this.normalizeStarPositions();

    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;

    for (const star of this.normalizedStars) {
      minX = Math.min(minX, star.x);
      maxX = Math.max(maxX, star.x);
      minY = Math.min(minY, star.y);
      maxY = Math.max(maxY, star.y);
    }

    const width = maxX - minX;
    const height = maxY - minY;

    this.bounds = { minX, maxX, minY, maxY, width, height };

    // Calculate scale to fit in 80% of canvas (leave padding)
    const targetWidth = this.canvas.width * 0.8;
    const targetHeight = this.canvas.height * 0.8;

    this.scale = Math.min(targetWidth / width, targetHeight / height);

    // Calculate offset to center constellation
    this.offsetX = (this.canvas.width - width * this.scale) / 2;
    this.offsetY = (this.canvas.height - height * this.scale) / 2;
  }

  /**
   * Normalizes star positions to handle constellations that span the wrap boundary.
   * If a constellation has stars at both ends of the sky (e.g., x=100 and x=5900),
   * this shifts them to be contiguous so they render together properly.
   */
  private normalizeStarPositions(): void {
    // Start with original positions
    this.normalizedStars = this.data.stars.map(star => ({ x: star.x, y: star.y }));

    // Calculate initial bounds to detect wrap-around
    let minX = Infinity, maxX = -Infinity;
    for (const star of this.data.stars) {
      minX = Math.min(minX, star.x);
      maxX = Math.max(maxX, star.x);
    }

    const rawWidth = maxX - minX;

    // If width is greater than half the sky, this constellation likely wraps
    if (rawWidth > SKY_WIDTH / 2) {
      // Find the center X of the constellation
      const centerX = (minX + maxX) / 2;

      // Shift stars to be contiguous around the wrap point
      // Stars on the "far" side of center get shifted
      for (const star of this.normalizedStars) {
        // If star is far from center, shift it
        const dx = star.x - centerX;
        if (dx > SKY_WIDTH / 2) {
          star.x -= SKY_WIDTH;
        } else if (dx < -SKY_WIDTH / 2) {
          star.x += SKY_WIDTH;
        }
      }
    }
  }

  private worldToCanvas(x: number, y: number): { x: number; y: number } {
    return {
      x: (x - this.bounds.minX) * this.scale + this.offsetX,
      y: (y - this.bounds.minY) * this.scale + this.offsetY
    };
  }

  private generateDecoyStars(): void {
    const targetCount = this.targetStars.size;
    const decoyCount = Math.floor(targetCount * 2.5); // 2.5x as many decoys

    // Use canvas bounds instead of world bounds
    const padding = 50; // pixels
    const minX = padding;
    const maxX = this.canvas.width - padding;
    const minY = padding;
    const maxY = this.canvas.height - padding;

    const minDistance = 25; // Minimum distance from actual stars (in canvas pixels)

    for (let i = 0; i < decoyCount; i++) {
      let attempts = 0;
      let validPosition = false;
      let x = 0, y = 0;

      while (!validPosition && attempts < 50) {
        // Generate in canvas space
        x = minX + Math.random() * (maxX - minX);
        y = minY + Math.random() * (maxY - minY);

        validPosition = true;

        // Check distance from all actual stars (in canvas space)
        for (const star of this.normalizedStars) {
          const starPos = this.worldToCanvas(star.x, star.y);
          const dx = x - starPos.x;
          const dy = y - starPos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < minDistance) {
            validPosition = false;
            break;
          }
        }

        attempts++;
      }

      if (validPosition) {
        this.decoyStars.push({ x, y }); // Already in canvas space
      }
    }
  }

  private startStudyPhase(): void {
    this.phase = 'study';
    this.updateInstructions();
    this.renderStudyPhase();

    // Add study phase class
    const modalContent = this.modalElement.querySelector('.modal-content')!;
    modalContent.classList.add('phase-study');

    // Start countdown
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

  private startAnimationLoop(): void {
    this.animationStartTime = performance.now();
    const animate = () => {
      this.renderChallengePhase();
      this.animationFrameId = requestAnimationFrame(animate);
    };
    this.animationFrameId = requestAnimationFrame(animate);
  }

  private startChallengePhase(): void {
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
      this.renderChallengePhase();

      // Switch phase classes
      modalContent.classList.remove('phase-study', 'phase-transitioning');
      modalContent.classList.add('phase-challenge');

      // Enable click/touch detection (store references for cleanup)
      this.clickHandler = this.handleClick.bind(this);
      this.touchHandler = this.handleTouch.bind(this);
      this.canvas.addEventListener('click', this.clickHandler);
      this.canvas.addEventListener('touchend', this.touchHandler);

      // Start animation loop for pulse effects
      this.startAnimationLoop();
    }, 350); // Match CSS transition duration
  }

  private updateInstructions(): void {
    const titleEl = this.modalElement.querySelector('.modal-title')!;
    const instructionEl = this.modalElement.querySelector('.modal-instruction')!;

    if (this.phase === 'study') {
      titleEl.textContent = this.data.name;
      instructionEl.textContent = 'Study this pattern carefully...';
    } else {
      titleEl.textContent = 'Reconstruct the Pattern';
      instructionEl.textContent = 'Click the stars to reconstruct the constellation';

      // Hide countdown, show progress
      this.modalElement.querySelector('.countdown-container')!.classList.add('hidden');
      this.modalElement.querySelector('.progress-container')!.classList.remove('hidden');
      this.updateProgress();
    }
  }

  private updateCountdown(): void {
    const countdownText = this.modalElement.querySelector('.countdown-text')!;
    countdownText.textContent = `${Math.ceil(this.studyTimeRemaining)}s`;

    // Animate sand
    const progress = 1 - (this.studyTimeRemaining / this.studyTimeDuration);
    const sand = this.modalElement.querySelector('.sand') as HTMLElement;
    if (sand) {
      sand.style.setProperty('--progress', progress.toString());
    }
  }

  private updateProgress(): void {
    const progressText = this.modalElement.querySelector('.progress-text')!;
    const clicked = this.clickedStars.size;
    const total = this.targetStars.size;
    const percent = (clicked / total) * 100;

    progressText.textContent = `${clicked} of ${total} stars identified`;

    // Update progress bar CSS variable
    const progressContainer = this.modalElement.querySelector('.progress-container') as HTMLElement;
    if (progressContainer) {
      progressContainer.style.setProperty('--progress-percent', `${percent}%`);
    }
  }

  private handleClick(event: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    const canvasX = event.clientX - rect.left;
    const canvasY = event.clientY - rect.top;
    this.processStarTap(canvasX, canvasY);
  }

  private handleTouch(event: TouchEvent): void {
    // Prevent the delayed click event from also firing
    event.preventDefault();

    // Get the touch point that ended
    const touch = event.changedTouches[0];
    if (!touch) return;

    const rect = this.canvas.getBoundingClientRect();
    const canvasX = touch.clientX - rect.left;
    const canvasY = touch.clientY - rect.top;
    this.processStarTap(canvasX, canvasY);
  }

  /**
   * Shared star tap detection logic for both click and touch events
   */
  private processStarTap(canvasX: number, canvasY: number): void {
    // Check if near any target star
    const clickRadius = 30; // Increased for better touch interaction on mobile
    let clicked = false;

    for (let i = 0; i < this.data.stars.length; i++) {
      if (this.clickedStars.has(i)) continue; // Already clicked

      const normalizedStar = this.normalizedStars[i]!;

      // Transform normalized star position to canvas space
      const starPos = this.worldToCanvas(normalizedStar.x, normalizedStar.y);

      const dx = canvasX - starPos.x;
      const dy = canvasY - starPos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < clickRadius) {
        // Correct star clicked!
        this.clickedStars.add(i);
        this.onStarClicked(i, true);
        clicked = true;
        break;
      }
    }

    if (!clicked) {
      // Incorrect click - brief flash
      this.onStarClicked(-1, false);
    }
  }

  private onStarClicked(starIndex: number, correct: boolean): void {
    if (correct) {
      // Audio feedback: pentatonic scale chime
      if (this.audioManager) {
        const noteIndex = this.clickedStars.size % 5;
        this.audioManager.playStarConnectionSound(noteIndex, 5);
      }

      // Visual feedback: canvas shimmer
      this.canvas.classList.add('star-clicked');
      setTimeout(() => {
        this.canvas.classList.remove('star-clicked');
      }, 300);

      // Find newly completed connections and trigger animations
      for (const [idx1, idx2] of this.data.connections) {
        if ((idx1 === starIndex || idx2 === starIndex) &&
            this.clickedStars.has(idx1) && this.clickedStars.has(idx2)) {
          const key = this.getConnectionKey(idx1, idx2);
          if (!this.animatingConnections.has(key)) {
            this.animatingConnections.set(key, 0); // Start animation
          }
        }
      }

      // Update progress and check completion
      this.updateProgress();

      if (this.checkComplete()) {
        this.completeChallenge();
      }
    } else {
      // Audio feedback: brief low tone for incorrect click
      if (this.audioManager) {
        this.playErrorTone();
      }

      // Brief red flash for incorrect click
      this.flashIncorrect();
    }
  }

  private playErrorTone(): void {
    // Create brief low tone for incorrect click feedback
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

  private flashIncorrect(): void {
    this.canvas.style.filter = 'brightness(1.3) sepia(0.3)';
    setTimeout(() => {
      this.canvas.style.filter = 'none';
    }, 150);
  }

  private checkComplete(): boolean {
    return this.clickedStars.size === this.targetStars.size;
  }

  private completeChallenge(): void {
    // Show completion animation
    const instructionEl = this.modalElement.querySelector('.modal-instruction')!;
    instructionEl.textContent = 'Pattern Complete!';
    instructionEl.classList.add('pattern-complete');

    // Brief delay before completing
    setTimeout(() => {
      this.onComplete();
    }, 1000); // Standardized delay for consistent feel
  }

  private renderStudyPhase(): void {
    const ctx = this.ctx;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.save();

    // Draw connections (with coordinate transformation)
    ctx.strokeStyle = 'rgba(212, 168, 75, 0.8)'; // Brass color
    ctx.lineWidth = 2;
    ctx.shadowColor = 'rgba(212, 168, 75, 0.5)';
    ctx.shadowBlur = 8;

    for (const [idx1, idx2] of this.data.connections) {
      const star1 = this.normalizedStars[idx1]!;
      const star2 = this.normalizedStars[idx2]!;

      // Transform world coordinates to canvas coordinates
      const pos1 = this.worldToCanvas(star1.x, star1.y);
      const pos2 = this.worldToCanvas(star2.x, star2.y);

      ctx.beginPath();
      ctx.moveTo(pos1.x, pos1.y);
      ctx.lineTo(pos2.x, pos2.y);
      ctx.stroke();
    }

    // Draw stars (with coordinate transformation)
    for (let i = 0; i < this.data.stars.length; i++) {
      const star = this.data.stars[i]!;
      const normalizedStar = this.normalizedStars[i]!;
      const size = 4 + star.brightness * 3; // Slightly larger for better visibility on mobile

      // Transform normalized coordinates to canvas coordinates
      const pos = this.worldToCanvas(normalizedStar.x, normalizedStar.y);

      // Star glow
      ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  private renderChallengePhase(): void {
    const ctx = this.ctx;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.save();

    // Calculate pulse effect for unclicked stars
    const elapsedTime = performance.now() - this.animationStartTime;
    const pulseIntensity = Math.sin(elapsedTime / 1000) * 0.15 + 0.85; // Oscillates 0.7-1.0

    // Draw completed connections with animation
    for (const [idx1, idx2] of this.data.connections) {
      if (this.clickedStars.has(idx1) && this.clickedStars.has(idx2)) {
        const key = this.getConnectionKey(idx1, idx2);
        const star1 = this.normalizedStars[idx1]!;
        const star2 = this.normalizedStars[idx2]!;

        // Transform normalized coordinates to canvas coordinates
        const pos1 = this.worldToCanvas(star1.x, star1.y);
        const pos2 = this.worldToCanvas(star2.x, star2.y);

        // Check if this connection is animating
        let progress = this.animatingConnections.get(key);
        if (progress !== undefined && progress < 1) {
          // Animate the connection drawing
          progress = Math.min(1, progress + 0.05); // 20 frames to complete (~333ms)
          this.animatingConnections.set(key, progress);

          // Draw partial line with enhanced glow during animation
          ctx.strokeStyle = 'rgba(212, 168, 75, 0.9)';
          ctx.lineWidth = 3;
          ctx.shadowColor = 'rgba(212, 168, 75, 0.8)';
          ctx.shadowBlur = 12;

          const dx = pos2.x - pos1.x;
          const dy = pos2.y - pos1.y;

          ctx.beginPath();
          ctx.moveTo(pos1.x, pos1.y);
          ctx.lineTo(pos1.x + dx * progress, pos1.y + dy * progress);
          ctx.stroke();
        } else {
          // Draw completed static line
          ctx.strokeStyle = 'rgba(212, 168, 75, 0.6)';
          ctx.lineWidth = 2;
          ctx.shadowColor = 'rgba(212, 168, 75, 0.4)';
          ctx.shadowBlur = 8;

          ctx.beginPath();
          ctx.moveTo(pos1.x, pos1.y);
          ctx.lineTo(pos2.x, pos2.y);
          ctx.stroke();
        }
      }
    }

    // Draw decoy stars (already in canvas space)
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(200, 200, 200, 0.3)';
    for (const decoy of this.decoyStars) {
      ctx.beginPath();
      ctx.arc(decoy.x, decoy.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw target stars (with coordinate transformation and pulse effect)
    for (let i = 0; i < this.data.stars.length; i++) {
      const star = this.data.stars[i]!;
      const normalizedStar = this.normalizedStars[i]!;
      const isClicked = this.clickedStars.has(i);

      // Transform normalized coordinates to canvas coordinates
      const pos = this.worldToCanvas(normalizedStar.x, normalizedStar.y);

      if (isClicked) {
        // Bright, glowing, steady
        const size = 4 + star.brightness * 3; // Slightly larger for better visibility on mobile
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.shadowBlur = 12;
        ctx.fillStyle = '#ffffff';

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Dim, unmarked with subtle pulse
        const baseSize = 2.5;
        const size = baseSize * pulseIntensity;
        const alpha = 0.5 * pulseIntensity;

        ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(200, 200, 200, ${alpha})`;

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }

  render(): HTMLElement {
    return this.modalElement;
  }

  destroy(): void {
    if (this.studyTimer) {
      clearInterval(this.studyTimer);
    }
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.clickHandler) {
      this.canvas.removeEventListener('click', this.clickHandler);
      this.clickHandler = null;
    }
    if (this.touchHandler) {
      this.canvas.removeEventListener('touchend', this.touchHandler);
      this.touchHandler = null;
    }
  }
}
