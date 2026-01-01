export interface CelestialObject {
  id: string;
  name: string;
  // Position in the sky (virtual coordinates)
  x: number;
  y: number;
  // Radius for discovery detection
  radius: number;
  // Whether it has been discovered
  isDiscovered: boolean;
  // Progress of discovery animation (0 to 1)
  discoveryProgress: number;

  // Updates state (called every frame)
  update(dt: number, isInView: boolean): void;
  // Renders the object
  render(
    ctx: CanvasRenderingContext2D,
    viewportX: number,
    viewportY: number,
    canvasWidth: number,
    canvasHeight: number,
    scale?: number,
    glowMultiplier?: number
  ): void;
  // Checks if point is within interaction radius
  containsPoint(x: number, y: number): boolean;

  // Interaction
  addHoverTime(dt: number): boolean;
  resetHoverTime(): void;
}
