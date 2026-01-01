import type { CelestialObject } from './CelestialObject';
import type { GalaxyData } from '../data/galaxies';

export class Galaxy implements CelestialObject {
  readonly id: string;
  readonly name: string;
  readonly x: number;
  readonly y: number;
  readonly radius: number;

  isDiscovered: boolean = false;
  discoveryProgress: number = 0;

  private data: GalaxyData;
  private hoverTime: number = 0;
  private readonly hoverTimeRequired = 2.0;

  // Animation state
  private isAnimating: boolean = false;
  private animationTime: number = 0;
  private readonly animationDuration = 5.0; // Slightly longer than nebulae for distant feel
  private bloomProgress: number = 0;
  private onAnimationComplete: (() => void) | null = null;

  // Procedural effects
  private timeOffset: number;
  private rotationSpeed: number; // For spiral galaxies

  constructor(data: GalaxyData) {
    this.data = data;
    this.id = data.id;
    this.name = data.name;
    this.x = data.x;
    this.y = data.y;
    // Radius covers the general area - increased from 0.7 to 1.0 to compensate for smaller visual sizes
    this.radius = Math.max(data.width, data.height) * 1.0;
    this.timeOffset = Math.random() * 1000;

    // Spiral galaxies rotate very slowly
    this.rotationSpeed = data.galaxyType === 'spiral' ? 0.00005 : 0;
  }

  getData(): GalaxyData {
    return this.data;
  }

  containsPoint(x: number, y: number): boolean {
    const dx = x - this.x;
    const dy = y - this.y;
    return (dx * dx + dy * dy) < (this.radius * this.radius);
  }

  update(dt: number, _isInView: boolean): void {
    // Only update animation if active
    if (this.isAnimating) {
      this.animationTime += dt;
      this.bloomProgress = Math.min(1, this.animationTime / this.animationDuration);

      if (this.animationTime >= this.animationDuration) {
        this.isAnimating = false;
        this.bloomProgress = 1;
        // Trigger completion callback
        if (this.onAnimationComplete) {
          this.onAnimationComplete();
          this.onAnimationComplete = null;
        }
      }
    } else if (this.isDiscovered) {
      this.bloomProgress = 1;
    }
  }

  // Handle hover interaction from Game loop
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
    this.bloomProgress = 0;
  }

  /**
   * Set callback for when animation completes
   */
  setOnAnimationComplete(callback: () => void): void {
    this.onAnimationComplete = callback;
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
    // Basic visibility check
    if (this.x + this.radius < viewX || this.x - this.radius > viewX + canvasWidth ||
      this.y + this.radius < viewY || this.y - this.radius > viewY + canvasHeight) {
      return;
    }

    // Calculate global opacity based on discovery state
    let globalAlpha = 0;
    if (this.isDiscovered) {
      // Fade in during animation
      globalAlpha = this.bloomProgress;
    } else {
      // Very faint hint while hovering (galaxies are distant)
      globalAlpha = 0.05 + (this.discoveryProgress * 0.25);
    }

    if (globalAlpha <= 0.01) return;

    ctx.save();
    ctx.translate(this.x - viewX + canvasWidth / 2, this.y - viewY + canvasHeight / 2);

    // Apply DSO scale
    ctx.scale(scale, scale);

    // Base rotation from data
    if (this.data.rotation) ctx.rotate(this.data.rotation);

    // Subtle slow rotation for spiral galaxies
    if (this.rotationSpeed > 0) {
      const time = Date.now() / 1000 + this.timeOffset;
      ctx.rotate(time * this.rotationSpeed);
    }

    // Very subtle "breathing" for depth
    const time = Date.now() / 1000 + this.timeOffset;
    const breathScale = 1 + Math.sin(time * 0.3) * 0.02;
    ctx.scale(breathScale, breathScale);

    // Render layers
    if (this.data.layers) {
      for (const layer of this.data.layers) {
        ctx.globalCompositeOperation = layer.blendMode || 'screen';
        this.drawLayer(ctx, layer, globalAlpha, time, glowMultiplier);
      }
    }

    // Name label if fully discovered
    if (this.isDiscovered && !this.isAnimating) {
      // Reset transform for text to ensure it's straight
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      const screenX = this.x - viewX + canvasWidth / 2;
      const screenY = this.y - viewY + canvasHeight / 2;

      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.font = '15px "Cormorant Garamond", serif';
      ctx.fillStyle = `rgba(200, 210, 230, 0.75)`; // Slightly different color for galaxies
      ctx.textAlign = 'center';
      ctx.fillText(this.name, screenX, screenY + this.radius * 0.8 + 22);
    }

    ctx.restore();
  }

  private drawLayer(ctx: CanvasRenderingContext2D, layer: any, globalAlpha: number, time: number, glowMultiplier: number = 1.0) {
    const layerAlpha = layer.opacity * globalAlpha * glowMultiplier;
    if (layerAlpha <= 0) return;

    ctx.save();

    // Very subtle layer animation (galaxies are more stable/distant)
    const layerSeed = (layer.offsetX * 13 + layer.offsetY * 17);
    const wanderX = Math.sin(time * 0.2 + layerSeed) * 3;
    const wanderY = Math.cos(time * 0.25 + layerSeed) * 3;

    ctx.translate(layer.offsetX + wanderX, layer.offsetY + wanderY);
    if (layer.rotation) ctx.rotate(layer.rotation);

    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(layer.width, layer.height) / 2);
    grad.addColorStop(0, layer.color);
    grad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = grad;
    ctx.globalAlpha = layerAlpha;

    ctx.beginPath();

    if (layer.shape === 'ellipse') {
      ctx.ellipse(0, 0, layer.width / 2, layer.height / 2, 0, 0, Math.PI * 2);
    } else if (layer.shape === 'streak') {
      // Elongated shape for dust lanes or spiral arms
      ctx.ellipse(0, 0, layer.width / 2, layer.height / 6, 0, 0, Math.PI * 2);
    } else {
      // 'cloud' - soft irregular shape
      ctx.ellipse(0, 0, layer.width / 2, layer.height / 2, 0, 0, Math.PI * 2);
    }

    ctx.fill();
    ctx.restore();
  }
}
