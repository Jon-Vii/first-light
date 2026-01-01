import type { CelestialObject } from './CelestialObject';
import type { ClusterData } from '../data/clusters';

interface ClusterStar {
  x: number; // Relative to cluster center
  y: number;
  size: number;
  brightness: number;
  activationTime?: number; // When this star "turns on" during discovery
}

export class StarCluster implements CelestialObject {
  readonly id: string;
  readonly name: string;
  readonly x: number;
  readonly y: number;
  readonly radius: number;

  isDiscovered: boolean = false;
  discoveryProgress: number = 0;

  private data: ClusterData;
  private stars: ClusterStar[] = [];

  private hoverTime: number = 0;
  private readonly hoverTimeRequired = 2.0;

  // Animation
  private isAnimating: boolean = false;
  private animationTime: number = 0;
  private readonly animationDuration = 2.5; // Fast, energetic discovery
  private onAnimationComplete: (() => void) | null = null;

  constructor(data: ClusterData) {
    this.data = data;
    this.id = data.id;
    this.name = data.name;
    this.x = data.x;
    this.y = data.y;
    this.radius = data.radius;

    this.generateStars();
  }

  getData(): ClusterData {
    return this.data;
  }

  private generateStars() {
    // Procedurally generate stars within radius
    // Use a consistent seed based on ID if we wanted, but Math.random is fine for now as it's built once
    for (let i = 0; i < this.data.starCount; i++) {
      // Random point in circle
      const angle = Math.random() * Math.PI * 2;
      // Distribute more towards center for a "core" feel
      const r = Math.pow(Math.random(), 0.5) * this.data.radius;

      this.stars.push({
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r,
        size: Math.random() * 1.5 + 0.5,
        brightness: Math.random() * 0.5 + 0.5,
      });
    }

    // Sort by distance to center triggers from center-out effect? 
    // Or random for "sparkle"? Random is better for "jewel box" feel.
    // Let's randomize activation order during discovery.
  }

  containsPoint(x: number, y: number): boolean {
    const dx = x - this.x;
    const dy = y - this.y;
    return (dx * dx + dy * dy) < (this.radius * this.radius);
  }

  addHoverTime(dt: number): boolean {
    if (this.isDiscovered || this.isAnimating) return false;

    this.hoverTime += dt;
    this.discoveryProgress = Math.min(1, this.hoverTime / this.hoverTimeRequired);

    if (this.hoverTime >= this.hoverTimeRequired) {
      this.discover();
      return true;
    }
    return false;
  }

  resetHoverTime(): void {
    this.hoverTime = 0;
    this.discoveryProgress = 0;
  }

  private discover(): void {
    this.isDiscovered = true;
    this.isAnimating = true;
    this.animationTime = 0;

    // Assign random activation times for sparkle effect
    // Spread them over the first 70% of animation duration
    const spread = this.animationDuration * 0.7;
    for (const star of this.stars) {
      star.activationTime = Math.random() * spread;
    }
  }

  /**
   * Set callback for when animation completes
   */
  setOnAnimationComplete(callback: () => void): void {
    this.onAnimationComplete = callback;
  }

  update(dt: number, _isInView: boolean): void {
    if (this.isAnimating) {
      this.animationTime += dt;
      if (this.animationTime >= this.animationDuration) {
        this.isAnimating = false;
        // Trigger completion callback
        if (this.onAnimationComplete) {
          this.onAnimationComplete();
          this.onAnimationComplete = null;
        }
      }
    }
  }

  render(
    ctx: CanvasRenderingContext2D,
    viewX: number,
    viewY: number,
    canvasWidth: number,
    canvasHeight: number,
    scale: number = 1.0,
    glowMultiplier: number = 1.0
  ): void {
    const centerX = this.x - viewX + canvasWidth / 2;
    const centerY = this.y - viewY + canvasHeight / 2;

    ctx.save();
    // Apply DSO scale
    ctx.translate(centerX, centerY);
    ctx.scale(scale, scale);
    ctx.translate(-centerX, -centerY);

    // Hint glow (while hovering)
    if (!this.isDiscovered && this.discoveryProgress > 0) {
      ctx.save();
      const hintAlpha = this.discoveryProgress * 0.3;
      const pulse = 1 + Math.sin(Date.now() * 0.005) * 0.1;

      const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, this.radius * 1.5);
      grad.addColorStop(0, `rgba(200, 220, 255, ${hintAlpha * pulse})`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, this.radius * 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    if (this.isDiscovered) {
      const alpha = this.isAnimating ? Math.min(1, this.animationTime / 1.0) : 1;

      if (alpha > 0) {
        ctx.save();
        ctx.globalAlpha = alpha * glowMultiplier;

        // Reflection Nebula effect (e.g., Pleiades)
        // Instead of one big blob, we draw subtle glow around the main stars
        ctx.globalCompositeOperation = 'screen';

        for (const star of this.stars) {
          // Only for brighter stars
          if (star.brightness < 0.6) continue;

          const sx = centerX + star.x;
          const sy = centerY + star.y;

          // Calculate a "streak" or halo direction
          // For Pleiades, roughly uniform but slightly chaotic blue-white wisps
          const color = this.data.color || '#A0C0FF';

          // Halo
          const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, star.size * 30);
          grad.addColorStop(0, color + '22'); // faint center
          grad.addColorStop(1, '#00000000');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(sx, sy, star.size * 30, 0, Math.PI * 2);
          ctx.fill();

          // Additional "wisp"
          ctx.save();
          ctx.translate(sx, sy);
          // Random rotation based on position for consistency
          ctx.rotate(star.x * 0.01 + star.y * 0.01);

          const wispGrad = ctx.createLinearGradient(-20, 0, 20, 0);
          wispGrad.addColorStop(0, '#00000000');
          wispGrad.addColorStop(0.5, color + '11'); // very faint streak
          wispGrad.addColorStop(1, '#00000000');

          ctx.fillStyle = wispGrad;
          ctx.fillRect(-20, -10, 40, 20);
          ctx.restore();
        }
        ctx.restore();
      }

      // Draw stars
      for (const star of this.stars) {
        let starAlpha = 0;
        let starSize = star.size;

        if (this.isAnimating && star.activationTime !== undefined) {
          if (this.animationTime < star.activationTime) continue; // Not yet lit

          const timeSinceActive = this.animationTime - star.activationTime;

          // "Pop" in
          if (timeSinceActive < 0.3) {
            const pop = Math.sin((timeSinceActive / 0.3) * Math.PI);
            starSize = star.size * (1 + pop * 2); // Flash big
            starAlpha = 1;
          } else {
            starAlpha = star.brightness;
          }
        } else {
          starAlpha = star.brightness;
        }

        // Draw the star
        const sx = centerX + star.x;
        const sy = centerY + star.y;

        ctx.beginPath();
        ctx.arc(sx, sy, starSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${starAlpha})`;
        ctx.fill();

        // Subtle glow per star
        if (starAlpha > 0.5) {
          ctx.beginPath();
          ctx.arc(sx, sy, starSize * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(160, 200, 255, ${starAlpha * 0.3})`;
          ctx.fill();
        }
      }

      // Name
      if (!this.isAnimating) {
        ctx.font = '14px "Cormorant Garamond", serif';
        ctx.fillStyle = `rgba(200, 220, 255, 0.7)`;
        ctx.textAlign = 'center';
        ctx.fillText(this.name, centerX, centerY + this.radius + 25);
      }
    }

    ctx.restore();
  }
}
