/**
 * Constellation - Manages individual constellation state and rendering
 */

import type { ConstellationData } from '../data/constellations';


export class Constellation {
  private data: ConstellationData;
  private hoverTime: number = 0;
  private discoveryProgress: number = 0;
  private isAnimating: boolean = false;
  private animationTime: number = 0;
  private revealedConnections: number = 0;
  private currentConnectionProgress: number = 0;  // 0-1 progress through current connection
  private lastRevealedConnections: number = 0;  // Track for sound triggers
  private onAnimationComplete: (() => void) | null = null;
  private onConnectionRevealed: ((index: number, total: number) => void) | null = null;
  private starActivationTimes: Map<number, number> = new Map();  // Star index -> activation time
  private cosmicFlashTime: number = 0;  // When cosmic flash started

  // Color palette - warm golden tones
  private readonly colors = {
    coreWhite: 'rgba(255, 255, 245, ',
    innerGold: 'rgba(255, 225, 130, ',
    midAmber: 'rgba(255, 190, 80, ',
    outerGlow: 'rgba(220, 160, 60, ',
    cosmicHaze: 'rgba(180, 140, 100, ',
  };

  // Discovery parameters
  private readonly hoverTimeRequired = 2.0;  // Seconds of hover to discover
  private readonly animationDuration = 3.5;  // Duration of discovery animation
  private readonly starFlashDuration = 0.6;  // How long the star flash lasts
  private readonly cosmicFlashDuration = 1.2;  // Duration of completion flash

  constructor(data: ConstellationData) {
    this.data = { ...data };
  }

  /**
   * Get constellation data
   */
  getData(): ConstellationData {
    return this.data;
  }

  /**
   * Get animation duration for timing external events
   */
  getAnimationDuration(): number {
    return this.animationDuration;
  }

  /**
   * Set callback for when animation completes
   */
  setOnAnimationComplete(callback: () => void): void {
    this.onAnimationComplete = callback;
  }

  /**
   * Set callback for when a new connection is revealed
   */
  setOnConnectionRevealed(callback: (index: number, total: number) => void): void {
    this.onConnectionRevealed = callback;
  }


  /**
   * Check if constellation is discovered
   */
  isDiscovered(): boolean {
    return this.data.discovered;
  }

  /**
   * Add hover time and check for discovery
   * Returns true if just discovered
   */
  addHoverTime(deltaTime: number): boolean {
    if (this.data.discovered || this.isAnimating) return false;

    this.hoverTime += deltaTime;
    this.discoveryProgress = Math.min(1, this.hoverTime / this.hoverTimeRequired);

    if (this.hoverTime >= this.hoverTimeRequired) {
      this.discover();
      return true;
    }

    return false;
  }

  /**
   * Reset hover time (when player moves away)
   */
  resetHoverTime(): void {
    // Gradual decay for smoother feel
    this.hoverTime = Math.max(0, this.hoverTime - 0.1);
    this.discoveryProgress = this.hoverTime / this.hoverTimeRequired;
  }

  /**
   * Trigger discovery
   */
  private discover(): void {
    this.data.discovered = true;
    this.isAnimating = true;
    this.animationTime = 0;
    this.revealedConnections = 0;
    this.starActivationTimes.clear();
    this.cosmicFlashTime = 0;
  }

  /**
   * Update animation state (call every frame, independent of render)
   */
  update(deltaTime: number): void {
    if (!this.isAnimating) return;

    const wasFirstFrame = this.animationTime === 0;
    this.animationTime += deltaTime;

    // On first frame, activate the starting star and play initial sound
    if (wasFirstFrame && this.data.connections.length > 0) {
      const firstConnection = this.data.connections[0];
      if (firstConnection) {
        const [starIdx1] = firstConnection;
        if (starIdx1 !== undefined) {
          this.starActivationTimes.set(starIdx1, this.animationTime);
          // Play sound for first star (-1 means "starting star")
          if (this.onConnectionRevealed) {
            this.onConnectionRevealed(-1, this.data.connections.length);
          }
        }
      }
    }

    // Calculate continuous progress through all connections
    const totalProgress = Math.min(1, this.animationTime / this.animationDuration);
    const connectionProgress = totalProgress * this.data.connections.length;
    const newRevealedConnections = Math.floor(connectionProgress);

    // Track partial progress through current connection (0-1)
    this.currentConnectionProgress = connectionProgress - newRevealedConnections;

    // Play sound and activate stars for each newly revealed connection
    if (newRevealedConnections > this.revealedConnections) {
      for (let i = this.revealedConnections; i < newRevealedConnections; i++) {
        // Play sound
        if (this.onConnectionRevealed) {
          this.onConnectionRevealed(i, this.data.connections.length);
        }

        // Mark the destination star as activated (for flash effect) - only if not already activated
        const connection = this.data.connections[i];
        if (connection) {
          const [, starIdx2] = connection;
          if (starIdx2 !== undefined && !this.starActivationTimes.has(starIdx2)) {
            this.starActivationTimes.set(starIdx2, this.animationTime);
          }
        }
      }
    }
    this.revealedConnections = newRevealedConnections;

    // Check if animation is complete
    if (this.animationTime >= this.animationDuration) {
      this.isAnimating = false;
      this.revealedConnections = this.data.connections.length;
      this.currentConnectionProgress = 0;

      // Trigger completion callback
      if (this.onAnimationComplete) {
        this.onAnimationComplete();
        this.onAnimationComplete = null;
        this.onConnectionRevealed = null;
      }
    }
  }

  /**
   * Render the constellation
   */
  render(
    ctx: CanvasRenderingContext2D,
    viewX: number,
    viewY: number,
    canvasWidth: number,
    canvasHeight: number
  ): void {
    // Convert constellation center to screen coordinates
    const centerScreenX = this.data.centerX - viewX + canvasWidth / 2;
    const centerScreenY = this.data.centerY - viewY + canvasHeight / 2;

    // Skip if too far from view
    if (Math.abs(centerScreenX - canvasWidth / 2) > canvasWidth ||
      Math.abs(centerScreenY - canvasHeight / 2) > canvasHeight) {
      return;
    }

    // Render based on state
    if (this.data.discovered) {
      this.renderDiscovered(ctx, viewX, viewY, canvasWidth, canvasHeight);
    } else if (this.discoveryProgress > 0) {
      this.renderHint(ctx, viewX, viewY, canvasWidth, canvasHeight);
    }
  }

  /**
   * Render hint when player is close to discovering
   */
  private renderHint(
    ctx: CanvasRenderingContext2D,
    viewX: number,
    viewY: number,
    canvasWidth: number,
    canvasHeight: number
  ): void {
    const alpha = this.discoveryProgress * 0.5;

    // Subtle pulsing stars
    for (const star of this.data.stars) {
      const screenX = star.x - viewX + canvasWidth / 2;
      const screenY = star.y - viewY + canvasHeight / 2;

      const pulse = Math.sin(Date.now() * 0.005) * 0.3 + 0.7;
      const size = 3 + star.brightness * 2;

      // Glow
      ctx.beginPath();
      ctx.arc(screenX, screenY, size * 3, 0, Math.PI * 2);
      const glowGradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, size * 3);
      glowGradient.addColorStop(0, `rgba(255, 217, 61, ${alpha * pulse * 0.5})`);
      glowGradient.addColorStop(1, 'rgba(255, 217, 61, 0)');
      ctx.fillStyle = glowGradient;
      ctx.fill();
    }
  }

  /**
   * Render discovered constellation
   */
  private renderDiscovered(
    ctx: CanvasRenderingContext2D,
    viewX: number,
    viewY: number,
    canvasWidth: number,
    canvasHeight: number
  ): void {
    const centerScreenX = this.data.centerX - viewX + canvasWidth / 2;
    const centerScreenY = this.data.centerY - viewY + canvasHeight / 2;

    // Trigger cosmic flash when all connections are revealed
    const justCompleted = this.isAnimating &&
      this.revealedConnections === this.data.connections.length;
    if (justCompleted && this.cosmicFlashTime === 0) {
      this.cosmicFlashTime = this.animationTime;
    }

    // Calculate cosmic flash intensity
    let cosmicFlashIntensity = 0;
    if (this.cosmicFlashTime > 0) {
      const timeSinceFlash = this.animationTime - this.cosmicFlashTime;
      if (timeSinceFlash < this.cosmicFlashDuration) {
        const progress = timeSinceFlash / this.cosmicFlashDuration;
        cosmicFlashIntensity = Math.sin(progress * Math.PI);
      }
    }

    const baseAlpha = this.isAnimating ? 0.8 : 0.6;
    const lineAlpha = baseAlpha + cosmicFlashIntensity * 0.4;

    // ========== COSMIC FLASH EFFECT ==========
    if (cosmicFlashIntensity > 0) {
      // Radial shockwave expanding from constellation center
      const shockwaveRadius = cosmicFlashIntensity * 350;
      const shockwaveGradient = ctx.createRadialGradient(
        centerScreenX, centerScreenY, shockwaveRadius * 0.7,
        centerScreenX, centerScreenY, shockwaveRadius
      );
      shockwaveGradient.addColorStop(0, `rgba(255, 220, 100, 0)`);
      shockwaveGradient.addColorStop(0.5, `rgba(255, 180, 50, ${cosmicFlashIntensity * 0.4})`);
      shockwaveGradient.addColorStop(1, `rgba(255, 140, 30, 0)`);

      ctx.beginPath();
      ctx.arc(centerScreenX, centerScreenY, shockwaveRadius, 0, Math.PI * 2);
      ctx.fillStyle = shockwaveGradient;
      ctx.fill();

      // Central cosmic glow
      const glowGradient = ctx.createRadialGradient(
        centerScreenX, centerScreenY, 0,
        centerScreenX, centerScreenY, 180
      );
      glowGradient.addColorStop(0, `rgba(255, 250, 220, ${cosmicFlashIntensity * 0.5})`);
      glowGradient.addColorStop(0.4, `rgba(255, 200, 100, ${cosmicFlashIntensity * 0.3})`);
      glowGradient.addColorStop(1, `rgba(255, 160, 50, 0)`);

      ctx.beginPath();
      ctx.arc(centerScreenX, centerScreenY, 180, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();
    }

    // ========== CONNECTION LINES WITH GRADIENT GLOW ==========
    ctx.lineCap = 'round';

    const connectionsToRender = this.isAnimating
      ? this.revealedConnections
      : this.data.connections.length;

    // Draw fully revealed connections with glow
    for (let i = 0; i < connectionsToRender; i++) {
      const connection = this.data.connections[i];
      if (!connection) continue;

      const [starIdx1, starIdx2] = connection;
      const star1 = this.data.stars[starIdx1];
      const star2 = this.data.stars[starIdx2];

      if (!star1 || !star2) continue;

      const x1 = star1.x - viewX + canvasWidth / 2;
      const y1 = star1.y - viewY + canvasHeight / 2;
      const x2 = star2.x - viewX + canvasWidth / 2;
      const y2 = star2.y - viewY + canvasHeight / 2;

      this.drawGlowingLine(ctx, x1, y1, x2, y2, lineAlpha);
    }

    // Draw the current connection being animated with spark head
    if (this.isAnimating && this.revealedConnections < this.data.connections.length) {
      const currentConnection = this.data.connections[this.revealedConnections];
      if (currentConnection) {
        const [starIdx1, starIdx2] = currentConnection;
        const star1 = this.data.stars[starIdx1];
        const star2 = this.data.stars[starIdx2];

        if (star1 && star2) {
          const x1 = star1.x - viewX + canvasWidth / 2;
          const y1 = star1.y - viewY + canvasHeight / 2;
          const x2 = star2.x - viewX + canvasWidth / 2;
          const y2 = star2.y - viewY + canvasHeight / 2;

          // If destination is already activated, draw full line immediately
          const destAlreadyLit = starIdx2 !== undefined && this.starActivationTimes.has(starIdx2);

          if (destAlreadyLit) {
            this.drawGlowingLine(ctx, x1, y1, x2, y2, lineAlpha);
          } else {
            // Animate the line drawing with spark head
            const progress = this.currentConnectionProgress;
            const currentX = x1 + (x2 - x1) * progress;
            const currentY = y1 + (y2 - y1) * progress;

            // Draw partial glowing line
            this.drawGlowingLine(ctx, x1, y1, currentX, currentY, lineAlpha);

            // Draw spark head at leading edge
            this.drawSparkHead(ctx, currentX, currentY);
          }
        }
      }
    }

    // ========== STARS WITH MULTI-LAYERED CORONA ==========
    for (let starIdx = 0; starIdx < this.data.stars.length; starIdx++) {
      const star = this.data.stars[starIdx];
      if (!star) continue;

      const screenX = star.x - viewX + canvasWidth / 2;
      const screenY = star.y - viewY + canvasHeight / 2;

      const activationTime = this.starActivationTimes.get(starIdx);
      const isActivated = activationTime !== undefined;

      let size = 3 + star.brightness * 3;
      let starAlpha = baseAlpha + cosmicFlashIntensity * 0.3;
      let flashProgress = 0;

      // During animation: unactivated stars are dimmer, activated stars can flash
      if (this.isAnimating) {
        if (!isActivated) {
          starAlpha *= 0.25;
          size *= 0.6;
        } else {
          const timeSinceActivation = this.animationTime - activationTime;
          if (timeSinceActivation < this.starFlashDuration) {
            flashProgress = Math.sin((timeSinceActivation / this.starFlashDuration) * Math.PI);
            size *= 1 + flashProgress * 0.4;
            starAlpha = Math.min(1, starAlpha + flashProgress * 0.3);
          }
        }
      }

      // Render star with multi-layer corona
      this.renderCosmicStar(ctx, screenX, screenY, size, starAlpha, isActivated, flashProgress);
    }

    // Constellation name (when fully discovered)
    if (!this.isAnimating) {
      ctx.font = '16px "Cormorant Garamond", serif';
      ctx.fillStyle = 'rgba(255, 220, 180, 0.7)';
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(255, 180, 80, 0.5)';
      ctx.shadowBlur = 10;
      ctx.fillText(this.data.name, centerScreenX, centerScreenY + this.data.radius + 35);
      ctx.shadowBlur = 0;
    }
  }

  /**
   * Draw a glowing gradient line between two points
   */
  private drawGlowingLine(
    ctx: CanvasRenderingContext2D,
    x1: number, y1: number,
    x2: number, y2: number,
    alpha: number
  ): void {
    ctx.lineCap = 'round';

    // Outer warm glow
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = `${this.colors.outerGlow}${alpha * 0.2})`;
    ctx.lineWidth = 12;
    ctx.stroke();

    // Mid amber glow
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = `${this.colors.midAmber}${alpha * 0.4})`;
    ctx.lineWidth = 6;
    ctx.stroke();

    // Inner gold glow
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = `${this.colors.innerGold}${alpha * 0.7})`;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Hot white core
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = `${this.colors.coreWhite}${alpha * 0.9})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  /**
   * Draw a spark/ember at the leading edge of an animating line
   */
  private drawSparkHead(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    const sparkSize = 10;
    const time = Date.now() * 0.01;
    const flicker = 0.85 + Math.sin(time) * 0.15;

    // Outer glow
    const outerGlow = ctx.createRadialGradient(x, y, 0, x, y, sparkSize * 2.5);
    outerGlow.addColorStop(0, `rgba(255, 160, 60, ${0.8 * flicker})`);
    outerGlow.addColorStop(0.5, `rgba(220, 100, 40, ${0.4 * flicker})`);
    outerGlow.addColorStop(1, 'rgba(180, 80, 60, 0)');

    ctx.beginPath();
    ctx.arc(x, y, sparkSize * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = outerGlow;
    ctx.fill();

    // Hot core
    const coreGlow = ctx.createRadialGradient(x, y, 0, x, y, sparkSize);
    coreGlow.addColorStop(0, `rgba(255, 255, 250, ${flicker})`);
    coreGlow.addColorStop(0.4, `rgba(255, 230, 150, ${0.9 * flicker})`);
    coreGlow.addColorStop(0.7, `rgba(255, 180, 80, ${0.5 * flicker})`);
    coreGlow.addColorStop(1, 'rgba(255, 140, 50, 0)');

    ctx.beginPath();
    ctx.arc(x, y, sparkSize, 0, Math.PI * 2);
    ctx.fillStyle = coreGlow;
    ctx.fill();

    // Brilliant white center
    ctx.beginPath();
    ctx.arc(x, y, sparkSize * 0.25, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${flicker})`;
    ctx.fill();
  }

  /**
   * Render a star with multi-layered corona effect
   */
  private renderCosmicStar(
    ctx: CanvasRenderingContext2D,
    x: number, y: number,
    size: number, alpha: number,
    isActivated: boolean, flashProgress: number
  ): void {
    const coronaMultiplier = isActivated ? (1 + flashProgress * 0.6) : 0.5;

    // Layer 4: Outer warm haze (only for activated stars)
    if (isActivated) {
      const outerRadius = size * 6 * coronaMultiplier;
      const outerHaze = ctx.createRadialGradient(x, y, size * 2, x, y, outerRadius);
      outerHaze.addColorStop(0, `${this.colors.outerGlow}${alpha * 0.15})`);
      outerHaze.addColorStop(0.6, `${this.colors.cosmicHaze}${alpha * 0.08})`);
      outerHaze.addColorStop(1, 'rgba(180, 140, 100, 0)');

      ctx.beginPath();
      ctx.arc(x, y, outerRadius, 0, Math.PI * 2);
      ctx.fillStyle = outerHaze;
      ctx.fill();
    }

    // Layer 3: Amber glow
    const amberRadius = size * 4 * coronaMultiplier;
    const amberGlow = ctx.createRadialGradient(x, y, size, x, y, amberRadius);
    amberGlow.addColorStop(0, `${this.colors.midAmber}${alpha * 0.4})`);
    amberGlow.addColorStop(0.6, `${this.colors.outerGlow}${alpha * 0.2})`);
    amberGlow.addColorStop(1, 'rgba(220, 160, 60, 0)');

    ctx.beginPath();
    ctx.arc(x, y, amberRadius, 0, Math.PI * 2);
    ctx.fillStyle = amberGlow;
    ctx.fill();

    // Layer 2: Inner gold glow
    const goldRadius = size * 2.5 * coronaMultiplier;
    const goldGlow = ctx.createRadialGradient(x, y, 0, x, y, goldRadius);
    goldGlow.addColorStop(0, `${this.colors.innerGold}${alpha * 0.7})`);
    goldGlow.addColorStop(0.5, `${this.colors.midAmber}${alpha * 0.4})`);
    goldGlow.addColorStop(1, 'rgba(255, 190, 80, 0)');

    ctx.beginPath();
    ctx.arc(x, y, goldRadius, 0, Math.PI * 2);
    ctx.fillStyle = goldGlow;
    ctx.fill();

    // Layer 1: Hot white core
    ctx.beginPath();
    ctx.arc(x, y, size * 0.8, 0, Math.PI * 2);
    ctx.fillStyle = `${this.colors.coreWhite}${Math.min(1, alpha * 1.1)})`;
    ctx.fill();
  }
}
