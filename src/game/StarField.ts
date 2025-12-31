/**
 * StarField - Manages the background star rendering
 */

export interface BackgroundStar {
  x: number;
  y: number;
  size: number;
  brightness: number;
  twinkleOffset: number;
}

export class StarField {
  private skyWidth: number;
  private skyHeight: number;
  private stars: BackgroundStar[];
  private backgroundStars: BackgroundStar[];
  private time: number = 0;

  constructor(skyWidth: number, skyHeight: number) {
    this.skyWidth = skyWidth;
    this.skyHeight = skyHeight;
    this.stars = this.generateStars(800);
    this.backgroundStars = this.generateBackgroundStars(200);
  }

  /**
   * Generate random stars for the detailed view
   */
  private generateStars(count: number): BackgroundStar[] {
    const stars: BackgroundStar[] = [];

    // Use seeded random for consistency
    let seed = 12345;
    const random = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return seed / 0x7fffffff;
    };

    for (let i = 0; i < count; i++) {
      stars.push({
        x: random() * this.skyWidth,
        y: random() * this.skyHeight,
        size: random() * 2 + 0.5,
        brightness: random() * 0.5 + 0.5,
        twinkleOffset: random() * Math.PI * 2
      });
    }

    return stars;
  }

  /**
   * Generate simpler background stars for the non-magnified view
   */
  private generateBackgroundStars(count: number): BackgroundStar[] {
    const stars: BackgroundStar[] = [];

    let seed = 67890;
    const random = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return seed / 0x7fffffff;
    };

    for (let i = 0; i < count; i++) {
      stars.push({
        x: random() * this.skyWidth,
        y: random() * this.skyHeight,
        size: random() * 1.5 + 0.3,
        brightness: random() * 0.6 + 0.2,
        twinkleOffset: random() * Math.PI * 2
      });
    }

    return stars;
  }

  /**
   * Get background stars for rendering outside telescope
   */
  getBackgroundStars(): BackgroundStar[] {
    return this.backgroundStars;
  }

  /**
   * Render stars within the telescope view
   */
  render(
    ctx: CanvasRenderingContext2D,
    viewX: number,
    viewY: number,
    canvasWidth: number,
    canvasHeight: number,
    telescopePos: { x: number; y: number }
  ): void {
    this.time += 0.016;  // Approximate frame time

    // Calculate visible stars
    for (const star of this.stars) {
      // Convert sky coordinates to screen coordinates
      const screenX = star.x - viewX + canvasWidth / 2;
      const screenY = star.y - viewY + canvasHeight / 2;

      // Skip stars outside visible area (with margin)
      if (screenX < -50 || screenX > canvasWidth + 50 ||
        screenY < -50 || screenY > canvasHeight + 50) {
        continue;
      }

      // Calculate twinkle effect
      const twinkle = Math.sin(this.time * 2 + star.twinkleOffset) * 0.2 + 0.8;
      const brightness = star.brightness * twinkle;

      // Draw star with glow
      this.drawStar(ctx, screenX, screenY, star.size, brightness);
    }
  }

  /**
   * Draw a single star with glow effect
   */
  private drawStar(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    brightness: number
  ): void {
    // Outer glow
    const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, size * 4);
    glowGradient.addColorStop(0, `rgba(200, 210, 255, ${brightness * 0.3})`);
    glowGradient.addColorStop(0.5, `rgba(200, 210, 255, ${brightness * 0.1})`);
    glowGradient.addColorStop(1, 'rgba(200, 210, 255, 0)');

    ctx.beginPath();
    ctx.arc(x, y, size * 4, 0, Math.PI * 2);
    ctx.fillStyle = glowGradient;
    ctx.fill();

    // Core
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
    ctx.fill();
  }
}
