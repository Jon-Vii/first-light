import type { CelestialObject } from './CelestialObject';
import type { NebulaData, NebulaLayer } from '../data/nebulae';

export class Nebula implements CelestialObject {
  readonly id: string;
  readonly name: string;
  readonly x: number;
  readonly y: number;
  readonly radius: number;

  isDiscovered: boolean = false;
  discoveryProgress: number = 0;

  private data: NebulaData;
  private hoverTime: number = 0;
  private readonly hoverTimeRequired = 2.0;

  // Animation state
  private isAnimating: boolean = false;
  private animationTime: number = 0;
  private readonly animationDuration = 2.5;
  private bloomProgress: number = 0;
  private onAnimationComplete: (() => void) | null = null;

  // Procedural noise offsets for "breathing" effect
  private timeOffset: number;

  constructor(data: NebulaData) {
    this.data = data;
    this.id = data.id;
    this.name = data.name;
    this.x = data.x;
    this.y = data.y;
    // Radius covers the general area - increased from 0.7 to 1.0 to compensate for smaller visual sizes
    this.radius = Math.max(data.width, data.height) * 1.0;
    this.timeOffset = Math.random() * 1000;
  }

  getData(): NebulaData {
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
        // Ensure fully visible
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

  // ... (previous methods unchanged)

  render(
    ctx: CanvasRenderingContext2D,
    viewX: number,
    viewY: number,
    canvasWidth: number,
    canvasHeight: number,
    scale: number = 1.0,
    glowMultiplier: number = 1.0
  ): void {
    // Calculate screen position
    const screenX = this.x - viewX + canvasWidth / 2;
    const screenY = this.y - viewY + canvasHeight / 2;

    // Skip if completely off-screen (with generous margin for scaled size and bloom)
    const visualRadius = this.radius * scale * 1.5;
    if (screenX + visualRadius < 0 || screenX - visualRadius > canvasWidth ||
        screenY + visualRadius < 0 || screenY - visualRadius > canvasHeight) {
      return;
    }

    // Calculate global opacity based on discovery state
    let globalAlpha = 0;
    if (this.isDiscovered) {
      // Fade in during animation
      globalAlpha = this.bloomProgress;
    } else {
      // Faint hint while hovering
      globalAlpha = 0.1 + (this.discoveryProgress * 0.3);
    }

    if (globalAlpha <= 0.01) return;

    ctx.save();
    ctx.translate(this.x - viewX + canvasWidth / 2, this.y - viewY + canvasHeight / 2);

    // Apply DSO scale
    ctx.scale(scale, scale);

    if (this.data.rotation) ctx.rotate(this.data.rotation);

    // "Breathing" movement
    const time = Date.now() / 1000 + this.timeOffset;
    const breathScale = 1 + Math.sin(time * 0.5) * 0.03;
    ctx.scale(breathScale, breathScale);

    // Render layers
    if (this.data.layers) {
      for (const layer of this.data.layers) {
        // Default to screen for additive glow if not specified
        ctx.globalCompositeOperation = layer.blendMode || 'screen';
        this.drawLayer(ctx, layer, globalAlpha, time, glowMultiplier);
      }
    } else {
      // Fallback for legacy data if any
      // (This part is effectively removed by our data update, but good for safety)
    }

    // Name label if fully discovered
    if (this.isDiscovered && !this.isAnimating) {
      // Reset transform for text to ensure it's straight
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset to identity
      // Re-translate to center of nebula in screen space
      const screenX = this.x - viewX + canvasWidth / 2;
      const screenY = this.y - viewY + canvasHeight / 2;

      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.font = '16px "Cormorant Garamond", serif';
      ctx.fillStyle = `rgba(220, 200, 255, 0.7)`;
      ctx.textAlign = 'center';
      ctx.fillText(this.name, screenX, screenY + this.radius * 0.8 + 20);
    }

    ctx.restore();
  }

  private drawLayer(ctx: CanvasRenderingContext2D, layer: NebulaLayer, globalAlpha: number, time: number, glowMultiplier: number = 1.0) {
    const layerAlpha = layer.opacity * globalAlpha * glowMultiplier;
    if (layerAlpha <= 0) return;

    ctx.save();

    // Animate individual layers slightly for dynamic feel
    // Use hash of color or offset to desync layers
    const layerSeed = (layer.offsetX * 13 + layer.offsetY * 17);
    const wanderX = Math.sin(time * 0.3 + layerSeed) * 5;
    const wanderY = Math.cos(time * 0.4 + layerSeed) * 5;

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
      // Elongated ellipse with stronger falloff
      ctx.ellipse(0, 0, layer.width / 2, layer.height / 6, 0, 0, Math.PI * 2);
    } else {
      // 'cloud' - slightly irregular? simpler to just use soft ellipse for now, 
      // or we could use multiple overlapping circles if we really wanted detail.
      // For now, ellipse matches the gradient shape best.
      ctx.ellipse(0, 0, layer.width / 2, layer.height / 2, 0, 0, Math.PI * 2);
    }

    ctx.fill();
    ctx.restore();
  }
}
