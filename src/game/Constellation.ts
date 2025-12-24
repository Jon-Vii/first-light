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

  // Discovery parameters
  private readonly hoverTimeRequired = 2.0;  // Seconds of hover to discover
  private readonly animationDuration = 2.5;  // Duration of discovery animation
  private readonly starFlashDuration = 0.4;  // How long the star flash lasts

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
    const isFlashing = this.isAnimating &&
      this.revealedConnections === this.data.connections.length;

    // Flash effect at completion
    let flashIntensity = 0;
    if (isFlashing) {
      const flashProgress = (this.animationTime - this.animationDuration * 0.9) /
        (this.animationDuration * 0.1);
      flashIntensity = Math.sin(flashProgress * Math.PI) * 0.8;
    }

    const baseAlpha = this.isAnimating ? 0.8 : 0.6;
    const lineAlpha = baseAlpha + flashIntensity;

    // Draw connections (lines between stars)
    ctx.strokeStyle = `rgba(255, 217, 61, ${lineAlpha * 0.7})`;
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';

    const connectionsToRender = this.isAnimating
      ? this.revealedConnections
      : this.data.connections.length;

    // Draw fully revealed connections
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

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // Draw the current connection being animated (partial line)
    // Skip animation if destination star is already lit (loop-back connections)
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

          // If destination is already activated, draw full line immediately (no animation)
          const destAlreadyLit = starIdx2 !== undefined && this.starActivationTimes.has(starIdx2);

          if (destAlreadyLit) {
            // Draw full line instantly for loop-back connections
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          } else {
            // Animate the line drawing
            const progress = this.currentConnectionProgress;
            const currentX = x1 + (x2 - x1) * progress;
            const currentY = y1 + (y2 - y1) * progress;

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(currentX, currentY);
            ctx.stroke();
          }
        }
      }
    }

    // Draw stars
    for (let starIdx = 0; starIdx < this.data.stars.length; starIdx++) {
      const star = this.data.stars[starIdx];
      if (!star) continue;

      const screenX = star.x - viewX + canvasWidth / 2;
      const screenY = star.y - viewY + canvasHeight / 2;

      const activationTime = this.starActivationTimes.get(starIdx);
      const isActivated = activationTime !== undefined;

      let size = 3 + star.brightness * 3;
      let starAlpha = baseAlpha + flashIntensity;
      let glowMultiplier = 1;

      // During animation: unactivated stars are dimmer, activated stars can flash
      if (this.isAnimating) {
        if (!isActivated) {
          // Dim unactivated stars during animation
          starAlpha *= 0.3;
          size *= 0.7;
        } else {
          // Flash effect for recently activated stars
          const timeSinceActivation = this.animationTime - activationTime;
          if (timeSinceActivation < this.starFlashDuration) {
            const flashProgress = timeSinceActivation / this.starFlashDuration;
            const pulse = Math.sin(flashProgress * Math.PI);

            // Subtle size increase during flash (up to 30% larger)
            size *= 1 + pulse * 0.3;
            // Subtle glow increase
            glowMultiplier = 1 + pulse * 0.5;
            // Slightly brighten the star
            starAlpha = Math.min(1, starAlpha + pulse * 0.2);
          }
        }
      }

      // Glow
      ctx.beginPath();
      ctx.arc(screenX, screenY, size * 4 * glowMultiplier, 0, Math.PI * 2);
      const glowGradient = ctx.createRadialGradient(
        screenX, screenY, 0,
        screenX, screenY, size * 4 * glowMultiplier
      );
      glowGradient.addColorStop(0, `rgba(255, 217, 61, ${starAlpha * 0.6})`);
      glowGradient.addColorStop(0.5, `rgba(255, 217, 61, ${starAlpha * 0.2})`);
      glowGradient.addColorStop(1, 'rgba(255, 217, 61, 0)');
      ctx.fillStyle = glowGradient;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 250, 230, ${starAlpha})`;
      ctx.fill();
    }

    // Constellation name (when fully discovered)
    if (!this.isAnimating) {
      const centerX = this.data.centerX - viewX + canvasWidth / 2;
      const centerY = this.data.centerY - viewY + canvasHeight / 2;

      ctx.font = '14px "Cormorant Garamond", serif';
      ctx.fillStyle = 'rgba(200, 210, 230, 0.6)';
      ctx.textAlign = 'center';
      ctx.fillText(this.data.name, centerX, centerY + this.data.radius + 30);
    }
  }
}
