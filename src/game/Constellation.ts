/**
 * Constellation - Manages individual constellation state and rendering
 */

import type { ConstellationData } from '../data/constellations';
import { SKY_WIDTH } from '../data/constellations';


import type { CelestialObject } from './CelestialObject';

export class Constellation implements CelestialObject {
  // CelestialObject implementation
  get id(): string { return this.data.id; }
  get name(): string { return this.data.name; }
  get x(): number { return this.data.centerX; }
  get y(): number { return this.data.centerY; }
  get radius(): number { return this.data.radius; }
  // discoveryProgress is handled by existing getDiscoveryProgress but we need a property access for interface
  // We can make discoveryProgress public or add a getter. The field is private.
  // Using a getter to expose the private field.

  containsPoint(x: number, y: number): boolean {
    const dx = x - this.x;
    const dy = y - this.y;
    return (dx * dx + dy * dy) < (this.radius * this.radius);
  }

  private data: ConstellationData;
  private hoverTime: number = 0;
  private _discoveryProgress: number = 0;
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
  private readonly animationDuration: number;  // Computed based on connection count
  private readonly starFlashDuration = 0.6;  // How long the star flash lasts
  private readonly cosmicFlashDuration = 1.2;  // Duration of completion flash

  // Scale factor to fit constellations better in view
  private readonly scale = 0.85;

  constructor(data: ConstellationData) {
    this.data = { ...data };

    // Scale animation duration with constellation complexity
    // ~0.4 seconds per connection for consistent light-travel speed
    const connectionCount = this.data.connections.length;
    this.animationDuration = Math.max(2.0, connectionCount * 0.4);
  }

  /**
   * Get star position scaled relative to constellation center
   */
  private getScaledStarPosition(star: { x: number, y: number }): { x: number, y: number } {
    const dx = star.x - this.data.centerX;
    const dy = star.y - this.data.centerY;
    return {
      x: this.data.centerX + dx * this.scale,
      y: this.data.centerY + dy * this.scale
    };
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
  get isDiscovered(): boolean {
    return this.data.discovered;
  }

  /**
   * Get current discovery progress (0-1)
   */
  get discoveryProgress(): number {
    return this._discoveryProgress;
  }

  /**
   * Add hover time and check for discovery
   * Returns true if just discovered
   */
  addHoverTime(deltaTime: number): boolean {
    if (this.data.discovered || this.isAnimating) return false;

    this.hoverTime += deltaTime;
    this._discoveryProgress = Math.min(1, this.hoverTime / this.hoverTimeRequired);

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
    // Immediate reset - discovery requires continuous hover
    this.hoverTime = 0;
    this._discoveryProgress = 0;
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
   * Cancel an in-progress discovery animation
   * Called when player moves away before animation completes
   */
  cancelDiscovery(): void {
    if (!this.isAnimating) return;

    // Reset all state
    this.data.discovered = false;
    this.isAnimating = false;
    this.animationTime = 0;
    this.revealedConnections = 0;
    this.currentConnectionProgress = 0;
    this.starActivationTimes.clear();
    this.cosmicFlashTime = 0;
    this.hoverTime = 0;
    this._discoveryProgress = 0;

    // Clear callbacks
    this.onAnimationComplete = null;
    this.onConnectionRevealed = null;
  }

  /**
   * Check if currently animating
   */
  isAnimatingDiscovery(): boolean {
    return this.isAnimating;
  }

  /**
   * Update animation state (call every frame, independent of render)
   * @param deltaTime - Time since last frame in seconds
   * @param isInView - Whether the constellation is currently visible in the telescope
   */
  update(deltaTime: number, isInView: boolean = true): void {
    if (!this.isAnimating) return;

    // Only progress animation when constellation is in view
    if (!isInView) return;

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
    canvasHeight: number,
    opacityMultiplier: number = 1.0
  ): void {
    // Convert constellation center to screen coordinates with wrapping
    let effectiveViewX = viewX;
    const dx = this.data.centerX - viewX;

    if (dx < -SKY_WIDTH / 2) effectiveViewX -= SKY_WIDTH;
    else if (dx > SKY_WIDTH / 2) effectiveViewX += SKY_WIDTH;

    const centerScreenX = this.data.centerX - effectiveViewX + canvasWidth / 2;
    const centerScreenY = this.data.centerY - viewY + canvasHeight / 2;

    // Skip if too far from view
    if (Math.abs(centerScreenX - canvasWidth / 2) > canvasWidth ||
      Math.abs(centerScreenY - canvasHeight / 2) > canvasHeight) {
      return;
    }

    // Render based on state - passing effectiveViewX
    if (this.data.discovered) {
      this.renderDiscovered(ctx, effectiveViewX, viewY, canvasWidth, canvasHeight, opacityMultiplier);
    } else if (this._discoveryProgress > 0) {
      this.renderHint(ctx, effectiveViewX, viewY, canvasWidth, canvasHeight);
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
    const alpha = this._discoveryProgress * 0.5;

    // Subtle pulsing stars
    for (const star of this.data.stars) {
      const pos = this.getScaledStarPosition(star);
      const screenX = pos.x - viewX + canvasWidth / 2;
      const screenY = pos.y - viewY + canvasHeight / 2;

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
    canvasHeight: number,
    opacityMultiplier: number = 1.0
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

    const baseAlpha = (this.isAnimating ? 0.8 : 0.6) * opacityMultiplier;
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

    /**
     * Check if a line between two points crosses the wrap boundary
     * and should be drawn as two segments instead.
     */
    const shouldWrapLine = (x1: number, x2: number): boolean => {
      const distance = Math.abs(x2 - x1);
      return distance > SKY_WIDTH / 2;
    };

    /**
     * Draw a line that may wrap around the sky boundary
     */
    const drawWrappedLine = (
      x1Coord: number, y1Coord: number,
      x2Coord: number, y2Coord: number,
      viewXCoord: number,
      canvasWidthParam: number,
      alpha: number
    ): void => {
      // Calculate screen positions
      const screenX1 = x1Coord - viewXCoord + canvasWidthParam / 2;
      const screenY1 = y1Coord;
      const screenX2 = x2Coord - viewXCoord + canvasWidthParam / 2;
      const screenY2 = y2Coord;

      // Check if line crosses wrap boundary
      if (shouldWrapLine(x1Coord, x2Coord)) {
        // Draw two segments: one on each side of the screen
        // This prevents the line from stretching across the entire canvas

        // Determine which star is on the left vs right
        const leftX = x1Coord < x2Coord ? x1Coord : x2Coord;
        const rightX = x1Coord < x2Coord ? x2Coord : x1Coord;
        const leftY = x1Coord < x2Coord ? y1Coord : y2Coord;
        const rightY = x1Coord < x2Coord ? y2Coord : y1Coord;

        // Calculate screen positions of original stars
        const leftScreenX = leftX - viewXCoord + canvasWidthParam / 2;
        const rightScreenX = rightX - viewXCoord + canvasWidthParam / 2;

        // Wrapped position of right star on left side
        const wrappedRightX = rightX - SKY_WIDTH;
        const wrappedScreenX = wrappedRightX - viewXCoord + canvasWidthParam / 2;

        // Wrapped position of left star on right side
        const wrappedLeftX = leftX + SKY_WIDTH;
        const wrappedLeftScreenX = wrappedLeftX - viewXCoord + canvasWidthParam / 2;

        // Check if either original star is visible (with generous margin for constellation radius)
        const margin = 200; // Larger margin to account for constellation spread
        const leftStarVisible = leftScreenX >= -margin && leftScreenX <= canvasWidthParam + margin;
        const rightStarVisible = rightScreenX >= -margin && rightScreenX <= canvasWidthParam + margin;

        // If left star is visible, draw segment to wrapped right star
        if (leftStarVisible || (wrappedScreenX >= -margin && wrappedScreenX <= canvasWidthParam + margin)) {
          this.drawGlowingLine(ctx, leftScreenX, leftY, wrappedScreenX, rightY, alpha);
        }

        // If right star is visible, draw segment from wrapped left star
        if (rightStarVisible || (wrappedLeftScreenX >= -margin && wrappedLeftScreenX <= canvasWidthParam + margin)) {
          this.drawGlowingLine(ctx, wrappedLeftScreenX, leftY, rightScreenX, rightY, alpha);
        }
      } else {
        // Normal line drawing (no wrap)
        this.drawGlowingLine(ctx, screenX1, screenY1, screenX2, screenY2, alpha);
      }
    };

    // Draw fully revealed connections with glow
    for (let i = 0; i < connectionsToRender; i++) {
      const connection = this.data.connections[i];
      if (!connection) continue;

      const [starIdx1, starIdx2] = connection;
      const star1 = this.data.stars[starIdx1];
      const star2 = this.data.stars[starIdx2];

      if (!star1 || !star2) continue;

      const pos1 = this.getScaledStarPosition(star1);
      const pos2 = this.getScaledStarPosition(star2);

      const y1 = pos1.y - viewY + canvasHeight / 2;
      const y2 = pos2.y - viewY + canvasHeight / 2;

      // Use wrapped line drawing to handle constellations that span the wrap boundary
      drawWrappedLine(pos1.x, y1, pos2.x, y2, viewX, canvasWidth, lineAlpha);
    }

    // Draw the current connection being animated with spark head
    if (this.isAnimating && this.revealedConnections < this.data.connections.length) {
      const currentConnection = this.data.connections[this.revealedConnections];
      if (currentConnection) {
        const [starIdx1, starIdx2] = currentConnection;
        const star1 = this.data.stars[starIdx1];
        const star2 = this.data.stars[starIdx2];

        if (star1 && star2) {
          const pos1 = this.getScaledStarPosition(star1);
          const pos2 = this.getScaledStarPosition(star2);

          const y1 = pos1.y - viewY + canvasHeight / 2;
          const y2 = pos2.y - viewY + canvasHeight / 2;

          // Animate the line drawing with spark head
          // (Star flash is already skipped for already-lit stars in update())
          const progress = this.currentConnectionProgress;

          // Calculate partial position in world coordinates for wrap-aware interpolation
          let partialX = pos1.x;
          let partialY = y1;

          if (shouldWrapLine(pos1.x, pos2.x)) {
            // For wrap-around lines, we need to interpolate differently
            const dx = pos2.x - pos1.x;
            if (Math.abs(dx) > SKY_WIDTH / 2) {
              // Wrapping case - adjust the target for interpolation
              const adjustedX2 = dx > 0 ? pos2.x - SKY_WIDTH : pos2.x + SKY_WIDTH;
              partialX = pos1.x + (adjustedX2 - pos1.x) * progress;
              // Normalize back to 0-SKY_WIDTH range
              if (partialX < 0) partialX += SKY_WIDTH;
              if (partialX >= SKY_WIDTH) partialX -= SKY_WIDTH;
            }
          } else {
            // Normal interpolation
            partialX = pos1.x + (pos2.x - pos1.x) * progress;
          }
          partialY = y1 + (y2 - y1) * progress;

          // Draw partial glowing line using wrap-aware drawing
          drawWrappedLine(pos1.x, y1, partialX, partialY, viewX, canvasWidth, lineAlpha);

          // Draw spark head at leading edge (in screen coordinates)
          const partialScreenX = partialX - viewX + canvasWidth / 2;
          this.drawSparkHead(ctx, partialScreenX, partialY);
        }
      }
    }

    // ========== STARS WITH MULTI-LAYERED CORONA ==========
    // Calculate pulse once per frame for all unactivated stars (performance optimization)
    const pulse = Math.sin(Date.now() * 0.005) * 0.3 + 0.7;

    for (let starIdx = 0; starIdx < this.data.stars.length; starIdx++) {
      const star = this.data.stars[starIdx];
      if (!star) continue;

      const pos = this.getScaledStarPosition(star);
      const screenX = pos.x - viewX + canvasWidth / 2;
      const screenY = pos.y - viewY + canvasHeight / 2;

      const activationTime = this.starActivationTimes.get(starIdx);
      const isActivated = activationTime !== undefined;

      let size = 3 + star.brightness * 3;
      let starAlpha = baseAlpha + cosmicFlashIntensity * 0.3;
      let flashProgress = 0;

      // During animation: activated stars flash and are bright, unactivated stay faint
      if (this.isAnimating && !isActivated) {
        // Render unactivated stars with simple hint-style glow (same as before discovery)
        const hintAlpha = 0.35;
        const hintSize = 3 + star.brightness * 2;
        // Use pre-calculated pulse value (calculated once per frame above)

        ctx.beginPath();
        ctx.arc(screenX, screenY, hintSize * 3, 0, Math.PI * 2);
        const glowGradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, hintSize * 3);
        glowGradient.addColorStop(0, `rgba(255, 217, 61, ${hintAlpha * pulse * 0.5})`);
        glowGradient.addColorStop(1, 'rgba(255, 217, 61, 0)');
        ctx.fillStyle = glowGradient;
        ctx.fill();
        continue;  // Skip the cosmic star rendering
      }

      // Activated stars during animation can flash
      if (this.isAnimating && isActivated) {
        const timeSinceActivation = this.animationTime - activationTime;
        if (timeSinceActivation < this.starFlashDuration) {
          flashProgress = Math.sin((timeSinceActivation / this.starFlashDuration) * Math.PI);
          size *= 1 + flashProgress * 0.4;
          starAlpha = Math.min(1, starAlpha + flashProgress * 0.3);
        }
      }

      // Render star with multi-layer corona (activated stars only during animation, all stars after)
      this.renderCosmicStar(ctx, screenX, screenY, size, starAlpha, isActivated, flashProgress);
    }

    // Constellation name (when fully discovered)
    if (!this.isAnimating) {
      ctx.font = '16px "Cormorant Garamond", serif';
      ctx.fillStyle = `rgba(255, 220, 180, ${0.7 * opacityMultiplier})`;
      ctx.textAlign = 'center';
      ctx.shadowColor = `rgba(255, 180, 80, ${0.5 * opacityMultiplier})`;
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
