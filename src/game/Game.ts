/**
 * Main Game class - orchestrates all game systems
 */

import { StarField } from './StarField';
import { Telescope } from './Telescope';
import { Constellation } from './Constellation';
import { DiscoveriesTab } from '../ui/DiscoveriesTab';
import { AudioManager } from '../audio/AudioManager';
import {
  CONSTELLATIONS,
  SKY_WIDTH,
  SKY_HEIGHT,
  getConstellationsByObservatory,
  type ConstellationData,
  type Observatory
} from '../data/constellations';


export interface GameState {
  running: boolean;
  mouseX: number;
  mouseY: number;
  viewX: number;  // Current view center in sky coordinates
  viewY: number;
  discoveredCount: number;
  currentObservatory: Observatory;
}

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private telescopeOverlay: HTMLDivElement;

  private state: GameState;
  private starField: StarField;
  private telescope: Telescope;
  private constellations: Constellation[];
  private discoveriesTab: DiscoveriesTab;
  private audioManager: AudioManager;

  private lastFrameTime: number = 0;
  private animationFrameId: number = 0;

  constructor(canvas: HTMLCanvasElement, telescopeOverlay: HTMLDivElement) {
    this.canvas = canvas;
    this.telescopeOverlay = telescopeOverlay;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not get 2D context');
    }
    this.ctx = ctx;

    // Initialize state - start view in center of sky
    this.state = {
      running: false,
      mouseX: window.innerWidth / 2,
      mouseY: window.innerHeight / 2,
      viewX: SKY_WIDTH / 2,
      viewY: SKY_HEIGHT / 2,
      discoveredCount: 0,
      currentObservatory: 'northern'
    };

    // Initialize subsystems
    this.starField = new StarField(SKY_WIDTH, SKY_HEIGHT);
    this.telescope = new Telescope(telescopeOverlay);
    this.constellations = this.loadConstellationsForObservatory(this.state.currentObservatory);
    this.discoveriesTab = new DiscoveriesTab(this.state.currentObservatory);
    this.audioManager = new AudioManager();

    // Set up event listeners
    this.setupEventListeners();
    this.resizeCanvas();
  }

  private setupEventListeners(): void {
    // Mouse movement
    window.addEventListener('mousemove', (e) => {
      this.state.mouseX = e.clientX;
      this.state.mouseY = e.clientY;
    });

    // Window resize
    window.addEventListener('resize', () => this.resizeCanvas());

    // Discoveries panel toggle (click and keyboard)
    const toggle = document.getElementById('discoveries-toggle');
    const panel = document.getElementById('discoveries-panel');

    const togglePanel = () => {
      if (panel) {
        panel.classList.toggle('collapsed');
      }
    };

    if (toggle && panel) {
      toggle.addEventListener('click', togglePanel);
    }

    // Keyboard shortcut: 'D' to toggle discoveries
    window.addEventListener('keydown', (e) => {
      if (e.key === 'd' || e.key === 'D') {
        // Don't trigger if user is typing in an input
        if (document.activeElement?.tagName !== 'INPUT' &&
          document.activeElement?.tagName !== 'TEXTAREA') {
          togglePanel();
        }
      }
    });
  }

  private resizeCanvas(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  /**
   * Load constellations for a specific observatory
   */
  private loadConstellationsForObservatory(observatory: Observatory): Constellation[] {
    return getConstellationsByObservatory(observatory).map(data => new Constellation(data));
  }

  /**
   * Switch to a different observatory
   */
  switchObservatory(observatory: Observatory): void {
    if (observatory === this.state.currentObservatory) return;

    this.state.currentObservatory = observatory;
    this.state.viewX = SKY_WIDTH / 2;
    this.state.viewY = SKY_HEIGHT / 2;
    this.state.discoveredCount = 0;

    // Reload constellations for the new observatory
    this.constellations = this.loadConstellationsForObservatory(observatory);

    // Update discoveries tab
    this.discoveriesTab.setObservatory(observatory);
  }

  /**
   * Get current observatory
   */
  getCurrentObservatory(): Observatory {
    return this.state.currentObservatory;
  }

  /**
   * Start the game loop
   */
  start(): void {
    this.state.running = true;
    this.lastFrameTime = performance.now();
    this.audioManager.startAmbient();
    this.gameLoop();
  }

  /**
   * Stop the game loop
   */
  stop(): void {
    this.state.running = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.audioManager.stopAmbient();
  }

  /**
   * Main game loop
   */
  private gameLoop = (): void => {
    if (!this.state.running) return;

    const currentTime = performance.now();
    const deltaTime = (currentTime - this.lastFrameTime) / 1000;  // Convert to seconds
    this.lastFrameTime = currentTime;

    this.update(deltaTime);
    this.render();

    this.animationFrameId = requestAnimationFrame(this.gameLoop);
  };

  /**
   * Update game state
   */
  private update(deltaTime: number): void {
    // Update telescope view offset with drift effect
    this.telescope.update(this.state.mouseX, this.state.mouseY, deltaTime);

    // Update view position based on mouse offset (with smooth drift/parallax)
    const viewOffset = this.telescope.getViewOffset();
    const viewSpeedX = viewOffset.x * 0.5;
    const viewSpeedY = viewOffset.y * 0.5;

    this.state.viewX += viewSpeedX * deltaTime;
    this.state.viewY += viewSpeedY * deltaTime;

    // Clamp view to sky bounds
    const margin = 400;
    this.state.viewX = Math.max(margin, Math.min(SKY_WIDTH - margin, this.state.viewX));
    this.state.viewY = Math.max(margin, Math.min(SKY_HEIGHT - margin, this.state.viewY));

    // Check for constellation discovery
    this.checkConstellationDiscovery(deltaTime);

    // Update constellation animations - pass whether each is in view
    const skyX = this.state.viewX;
    const skyY = this.state.viewY;
    const telescopeRadius = this.telescope.getRadius();

    for (const constellation of this.constellations) {
      const data = constellation.getData();
      const distance = Math.hypot(skyX - data.centerX, skyY - data.centerY);
      const isInView = distance < data.radius + telescopeRadius * 0.5;

      // Cancel animation if moved out of view
      if (!isInView && constellation.isAnimatingDiscovery()) {
        constellation.cancelDiscovery();
        // Decrement count since discovery was cancelled
        if (this.state.discoveredCount > 0) {
          this.state.discoveredCount--;
        }
      }

      constellation.update(deltaTime, isInView);
    }
  }

  /**
   * Check if player is hovering over any undiscovered constellation
   */
  private checkConstellationDiscovery(deltaTime: number): void {
    const telescopePos = this.telescope.getPosition();
    const telescopeRadius = this.telescope.getRadius();

    // Sky coordinates are simply the current view position (telescope is at center)
    const skyX = this.state.viewX;
    const skyY = this.state.viewY;

    let isHoveringAny = false;

    for (const constellation of this.constellations) {
      if (constellation.isDiscovered()) continue;

      const data = constellation.getData();
      const distance = Math.hypot(skyX - data.centerX, skyY - data.centerY);

      if (distance < data.radius + telescopeRadius * 0.3) {
        // Player is hovering over this constellation
        isHoveringAny = true;
        const discovered = constellation.addHoverTime(deltaTime);

        // Play build-up sound based on discovery progress
        const progress = constellation.getDiscoveryProgress();
        this.audioManager.playDiscoveryBuildUp(progress);

        if (discovered) {
          this.audioManager.stopDiscoveryBuildUp();
          this.onConstellationDiscovered(constellation);
        }
      } else {
        constellation.resetHoverTime();
      }
    }

    // Stop build-up if not hovering over any constellation
    if (!isHoveringAny) {
      this.audioManager.stopDiscoveryBuildUp();
    }
  }

  /**
   * Handle constellation discovery
   */
  private onConstellationDiscovered(constellation: Constellation): void {
    const data = constellation.getData();
    this.state.discoveredCount++;

    // Play sound for each connection as it's revealed
    constellation.setOnConnectionRevealed((index, total) => {
      this.audioManager.playStarConnectionSound(index, total);
    });

    // Set up callback for when path-tracing animation completes
    constellation.setOnAnimationComplete(() => {
      // Play completion sound
      this.audioManager.playDiscoverySound();

      // Update UI
      this.discoveriesTab.addDiscovery(data);

      // Show notification
      this.showDiscoveryNotification(data.name);
    });
  }

  /**
   * Show discovery notification popup
   */
  private showDiscoveryNotification(name: string): void {
    const notification = document.getElementById('discovery-notification');
    const nameEl = notification?.querySelector('.constellation-name');

    if (notification && nameEl) {
      notification.classList.remove('hidden');
      nameEl.textContent = name;

      // Trigger animation
      requestAnimationFrame(() => {
        notification.classList.add('visible');
      });

      // Hide after delay
      setTimeout(() => {
        notification.classList.remove('visible');
        setTimeout(() => {
          notification.classList.add('hidden');
        }, 500);
      }, 3000);
    }
  }

  /**
   * Render the game
   */
  private render(): void {
    const { ctx, canvas } = this;
    const { viewX, viewY } = this.state;

    // Clear canvas with deep space color
    ctx.fillStyle = '#050510';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Get telescope position and radius for clipping
    const telescopePos = this.telescope.getPosition();
    const telescopeRadius = this.telescope.getRadius();

    // Create circular clipping region for telescope view
    ctx.save();
    ctx.beginPath();
    ctx.arc(telescopePos.x, telescopePos.y, telescopeRadius, 0, Math.PI * 2);
    ctx.clip();

    // Draw star field within telescope view
    this.starField.render(ctx, viewX, viewY, canvas.width, canvas.height, telescopePos);

    // Draw constellations
    for (const constellation of this.constellations) {
      constellation.render(ctx, viewX, viewY, canvas.width, canvas.height);
    }

    ctx.restore();

    // Draw background stars (outside telescope, faint)
    this.renderBackgroundStars();
  }

  /**
   * Render faint background stars visible outside the telescope
   */
  private renderBackgroundStars(): void {
    const { ctx, canvas } = this;
    const telescopePos = this.telescope.getPosition();
    const telescopeRadius = this.telescope.getRadius();

    // Use seeded random for consistent background
    const bgStars = this.starField.getBackgroundStars();

    ctx.save();

    // Invert clip - draw outside telescope
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.arc(telescopePos.x, telescopePos.y, telescopeRadius + 30, 0, Math.PI * 2, true);
    ctx.clip();

    for (const star of bgStars) {
      const screenX = (star.x / SKY_WIDTH) * canvas.width;
      const screenY = (star.y / SKY_HEIGHT) * canvas.height;

      ctx.beginPath();
      ctx.arc(screenX, screenY, star.size * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 210, 255, ${star.brightness * 0.3})`;
      ctx.fill();
    }

    ctx.restore();
  }
}
