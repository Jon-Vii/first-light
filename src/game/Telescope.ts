/**
 * Telescope - Handles the telescope viewport (fixed at screen center)
 * Mouse movement controls view panning with smooth drift/parallax effect
 */

export class Telescope {
  private element: HTMLDivElement;
  private radius: number;

  // View offset with drift/parallax effect
  private currentOffsetX: number = 0;
  private currentOffsetY: number = 0;
  private targetOffsetX: number = 0;
  private targetOffsetY: number = 0;

  // Lag/drift parameters for smooth parallax
  private readonly defaultLagFactor = 0.06;  // Lower = more lag/drift
  private currentLagFactor = 0.06;
  private radiusMultiplier = 1.0;

  // Event handler reference for cleanup
  private resizeHandler: () => void;

  // Cached position object to avoid garbage collection pressure
  private cachedPosition: { x: number; y: number } = { x: 0, y: 0 };

  constructor(element: HTMLDivElement) {
    this.element = element;
    this.radius = this.calculateRadius();

    // Update radius and position on resize (store reference for cleanup)
    this.resizeHandler = () => {
      this.radius = this.calculateRadius();
      this.updateElementPosition();
      this.updateCachedPosition();
    };
    window.addEventListener('resize', this.resizeHandler);

    // Position telescope at center
    this.updateElementPosition();
    this.updateCachedPosition();
  }

  private calculateRadius(): number {
    // Telescope diameter is 92% of min viewport dimension (from CSS)
    // The visual hole in the SVG is radius 310 out of 400 (77.5%)
    // Effective radius factor = 0.5 * 0.92 * 0.775 = 0.3565
    return Math.min(window.innerWidth, window.innerHeight) * 0.36 * this.radiusMultiplier;
  }

  /**
   * Set drift/stabilizer factor (0.0 to 1.0)
   * Higher = less lag (more stable)
   */
  setDriftFactor(factor: number): void {
    // Map factor to lag range: 0.06 (default drifty) to 0.2 (stabilized)
    // Higher factor = higher lagFactor = faster tracking = more stable
    this.currentLagFactor = this.defaultLagFactor + (factor * 0.14);
  }

  /**
   * Cleanup event listeners
   */
  destroy(): void {
    window.removeEventListener('resize', this.resizeHandler);
  }

  /**
   * Set radius multiplier (e.g., 1.15 for 15% larger)
   */
  setRadiusMultiplier(multiplier: number): void {
    this.radiusMultiplier = multiplier;
    this.radius = this.calculateRadius();
  }

  /**
   * Update view offset based on mouse position with smooth drift effect
   */
  update(mouseX: number, mouseY: number, deltaTime: number): void {
    // Calculate target offset from center (how far mouse is from center)
    this.targetOffsetX = mouseX - window.innerWidth / 2;
    this.targetOffsetY = mouseY - window.innerHeight / 2;

    // Apply smooth lag/drift to create parallax feel
    const lagAmount = 1 - Math.pow(1 - this.currentLagFactor, deltaTime * 60);

    const dx = this.targetOffsetX - this.currentOffsetX;
    const dy = this.targetOffsetY - this.currentOffsetY;

    this.currentOffsetX += dx * lagAmount;
    this.currentOffsetY += dy * lagAmount;
  }

  private updateElementPosition(): void {
    // Telescope stays fixed at screen center
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    this.element.style.left = `${centerX}px`;
    this.element.style.top = `${centerY}px`;
  }

  private updateCachedPosition(): void {
    // Update cached position object without creating a new one
    this.cachedPosition.x = window.innerWidth / 2;
    this.cachedPosition.y = window.innerHeight / 2;
  }

  /**
   * Get telescope center position (always screen center)
   * Returns cached object to avoid garbage collection pressure
   */
  getPosition(): { x: number; y: number } {
    // Update values each call (cheap) but reuse same object (avoids GC)
    this.cachedPosition.x = window.innerWidth / 2;
    this.cachedPosition.y = window.innerHeight / 2;
    return this.cachedPosition;
  }

  /**
   * Get current view offset with drift applied (for panning the star field)
   */
  getViewOffset(): { x: number; y: number } {
    return {
      x: this.currentOffsetX,
      y: this.currentOffsetY
    };
  }

  /**
   * Get telescope viewport radius
   */
  getRadius(): number {
    return this.radius;
  }

  // Magnification
  private magnification: number = 1.0;

  setMagnification(level: number): void {
    this.magnification = level;
  }

  getMagnification(): number {
    return this.magnification;
  }

  /**
   * Get the effective radius in world coordinates based on current zoom
   * When zoomed OUT (mag < 1), we see MORE world, so radius is LARGER.
   */
  getInWorldRadius(): number {
    return this.radius / this.magnification;
  }
}
