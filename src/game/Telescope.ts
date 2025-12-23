/**
 * Telescope - Handles the telescope viewport and cursor-following behavior
 */

export class Telescope {
  private element: HTMLDivElement;
  private currentX: number;
  private currentY: number;
  private targetX: number;
  private targetY: number;
  private radius: number;

  // Lag/drift parameters
  private readonly lagFactor = 0.08;  // Lower = more lag
  private readonly maxLag = 50;       // Maximum pixels of lag

  constructor(element: HTMLDivElement) {
    this.element = element;
    this.currentX = window.innerWidth / 2;
    this.currentY = window.innerHeight / 2;
    this.targetX = this.currentX;
    this.targetY = this.currentY;
    this.radius = this.calculateRadius();

    // Update radius on resize
    window.addEventListener('resize', () => {
      this.radius = this.calculateRadius();
    });

    // Initial position
    this.updateElementPosition();
  }

  private calculateRadius(): number {
    return Math.min(window.innerWidth, window.innerHeight) * 0.425;
  }

  /**
   * Update telescope position with smooth lag effect
   */
  update(mouseX: number, mouseY: number, deltaTime: number): void {
    this.targetX = mouseX;
    this.targetY = mouseY;

    // Calculate distance to target
    const dx = this.targetX - this.currentX;
    const dy = this.targetY - this.currentY;

    // Apply lag with deltaTime for frame-independent movement
    const lagAmount = 1 - Math.pow(1 - this.lagFactor, deltaTime * 60);

    this.currentX += dx * lagAmount;
    this.currentY += dy * lagAmount;

    // Update DOM element position
    this.updateElementPosition();
  }

  private updateElementPosition(): void {
    this.element.style.left = `${this.currentX}px`;
    this.element.style.top = `${this.currentY}px`;
  }

  /**
   * Get current telescope center position
   */
  getPosition(): { x: number; y: number } {
    return { x: this.currentX, y: this.currentY };
  }

  /**
   * Get telescope viewport radius
   */
  getRadius(): number {
    return this.radius;
  }
}
