/**
 * Main Game class - orchestrates all game systems
 */

import { StarField } from './StarField';
import { Telescope } from './Telescope';
import { Constellation } from './Constellation';
import { Nebula } from './Nebula';
import { StarCluster } from './StarCluster';
import { Galaxy } from './Galaxy';
import { type CelestialObject } from './CelestialObject';

import { DiscoveriesTab } from '../ui/DiscoveriesTab';
import { ModalManager } from '../ui/ModalManager';
import { PatternMatchModal } from '../ui/PatternMatchModal';
import { NebulaFeatureModal } from '../ui/NebulaFeatureModal';
import { ClusterMatchModal } from '../ui/ClusterMatchModal';
import { GalaxyStructureModal } from '../ui/GalaxyStructureModal';
import { AudioManager } from '../audio/AudioManager';
import {
  CONSTELLATIONS,
  SKY_WIDTH,
  SKY_HEIGHT,
  getConstellationsByObservatory,
  type ConstellationData,
  type Observatory
} from '../data/constellations';
import { CONSTELLATION_SETS } from '../data/sets';
import { NEBULAE, getNebulaeByObservatory } from '../data/nebulae';
import { CLUSTERS, getClustersByObservatory } from '../data/clusters';
import { GALAXIES, getGalaxiesByObservatory } from '../data/galaxies';


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

  // All objects to render/update
  private celestialObjects: CelestialObject[] = [];

  // Specific references for logic that needs them
  private constellations: Constellation[] = [];

  private discoveriesTab: DiscoveriesTab;
  private modalManager: ModalManager;
  private audioManager: AudioManager;
  private modalActive: boolean = false;
  private currentModal: { destroy(): void } | null = null;

  private lastFrameTime: number = 0;
  private animationFrameId: number = 0;

  // Event handler references for cleanup
  private mouseMoveHandler: (e: MouseEvent) => void;
  private resizeHandler: () => void;
  private keyDownHandler: (e: KeyboardEvent) => void;

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
    this.modalManager = new ModalManager();
    this.audioManager = new AudioManager();
    this.discoveriesTab = new DiscoveriesTab(this.state.currentObservatory);

    // Load initial objects
    this.loadCelestialObjects(this.state.currentObservatory);

    // Set up event listeners
    this.setupEventListeners();
    this.resizeCanvas();
  }

  private setupEventListeners(): void {
    // Mouse movement (store reference for cleanup)
    this.mouseMoveHandler = (e: MouseEvent) => {
      this.state.mouseX = e.clientX;
      this.state.mouseY = e.clientY;
    };
    window.addEventListener('mousemove', this.mouseMoveHandler);

    // Window resize (store reference for cleanup)
    this.resizeHandler = () => this.resizeCanvas();
    window.addEventListener('resize', this.resizeHandler);

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

    // Lens Case - Two separate lens buttons
    const attachLensListeners = () => {
      const lensCase = document.getElementById('lens-case');
      if (lensCase) {
        lensCase.addEventListener('click', (e) => {
          const slot = (e.target as HTMLElement).closest('.lens-slot') as HTMLElement;
          if (!slot) return;

          const lensType = slot.dataset.lens;
          if (lensType === 'standard') {
            this.setLens(1.0);
          } else if (lensType === 'wide') {
            this.setLens(0.5);
          } else if (lensType === 'deep') {
            this.setLens(3.0);
          }
          e.preventDefault();
        });
      } else {
        setTimeout(attachLensListeners, 500);
      }
    };
    attachLensListeners();

    // Keyboard shortcuts (store reference for cleanup)
    this.keyDownHandler = (e: KeyboardEvent) => {
      // Skip if typing in an input
      if (document.activeElement?.tagName === 'INPUT' ||
          document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      // Tab - Toggle discoveries panel
      if (e.key === 'Tab') {
        e.preventDefault();
        togglePanel();
      }

      // 1 - Standard lens
      if (e.key === '1') {
        this.setLens(1.0);
      }

      // 2 - Wide lens
      if (e.key === '2') {
        this.setLens(0.5);
      }

      // 3 - Deep Field lens
      if (e.key === '3') {
        this.setLens(3.0);
      }

      // Arrow keys - Observatory switching
      if (e.key === 'ArrowLeft') {
        this.switchObservatory('northern');
      }
      if (e.key === 'ArrowRight') {
        this.switchObservatory('southern');
      }
    };
    window.addEventListener('keydown', this.keyDownHandler);
  }

  private setLens(magnification: number): void {
    const currentMag = this.telescope.getMagnification();
    if (currentMag === magnification) return;

    this.telescope.setMagnification(magnification);

    // Update lens case UI
    const standardSlot = document.getElementById('lens-standard');
    const wideSlot = document.getElementById('lens-wide');
    const deepSlot = document.getElementById('lens-deep');

    if (standardSlot && wideSlot && deepSlot) {
      // Remove all active classes
      standardSlot.classList.remove('active');
      wideSlot.classList.remove('active');
      deepSlot.classList.remove('active');

      // Add active to current lens
      if (magnification === 1.0) {
        standardSlot.classList.add('active');
      } else if (magnification === 0.5) {
        wideSlot.classList.add('active');
      } else if (magnification === 3.0) {
        deepSlot.classList.add('active');
      }
    }
  }

  private resizeCanvas(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  /**
   * Load celestial objects for a specific observatory
   */
  private loadCelestialObjects(observatory: Observatory): void {
    this.celestialObjects = [];
    this.constellations = [];

    // Load Constellations
    const constellationData = getConstellationsByObservatory(observatory);
    for (const data of constellationData) {
      const c = new Constellation(data);
      this.constellations.push(c);
      this.celestialObjects.push(c);
    }

    // Load Nebulae (filtered by observatory)
    const nebulaeData = getNebulaeByObservatory(observatory);
    for (const data of nebulaeData) {
      this.celestialObjects.push(new Nebula(data));
    }

    // Load Star Clusters (filtered by observatory)
    const clustersData = getClustersByObservatory(observatory);
    for (const data of clustersData) {
      this.celestialObjects.push(new StarCluster(data));
    }

    // Load Galaxies (filtered by observatory)
    const galaxiesData = getGalaxiesByObservatory(observatory);
    for (const data of galaxiesData) {
      this.celestialObjects.push(new Galaxy(data));
    }
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

    // Reload objects
    this.loadCelestialObjects(observatory);

    // Update discoveries tab
    this.discoveriesTab.setObservatory(observatory);

    // Update dial UI
    const dialElement = document.getElementById('observatory-dial');
    if (dialElement) {
      const sectors = dialElement.querySelectorAll('.dial-sector');
      sectors.forEach(sector => {
        const sectorEl = sector as HTMLElement;
        if (sectorEl.dataset.observatory === observatory) {
          sectorEl.classList.add('active');
        } else {
          sectorEl.classList.remove('active');
        }
      });
    }

    // Update nameplate text
    const locationEl = document.querySelector('.observatory-location');
    const coordsEl = document.querySelector('.observatory-coords');
    if (locationEl && coordsEl) {
      if (observatory === 'northern') {
        locationEl.textContent = 'Alpine Observatory';
        coordsEl.textContent = '46°N · Swiss Alps';
      } else {
        locationEl.textContent = 'Andean Observatory';
        coordsEl.textContent = '30°S · Chilean Andes';
      }
    }
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
    this.cleanup();
  }

  /**
   * Cleanup event listeners and resources
   */
  private cleanup(): void {
    window.removeEventListener('mousemove', this.mouseMoveHandler);
    window.removeEventListener('resize', this.resizeHandler);
    window.removeEventListener('keydown', this.keyDownHandler);
    this.telescope.destroy();
    if (this.currentModal) {
      this.currentModal.destroy();
      this.currentModal = null;
    }
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
   * Calculate horizontal delta between two X positions, accounting for wrap-around.
   * Returns the shortest distance, which may go through the wrap boundary.
   */
  private getWrappedDeltaX(x1: number, x2: number): number {
    let dx = x1 - x2;
    // If the distance is more than half the sky, wrap through the boundary
    if (dx > SKY_WIDTH / 2) dx -= SKY_WIDTH;
    if (dx < -SKY_WIDTH / 2) dx += SKY_WIDTH;
    return dx;
  }

  /**
   * Update game state
   */
  private update(deltaTime: number): void {
    // Skip game updates when modal is active
    if (this.modalActive) return;

    // Update telescope view offset with drift effect
    this.telescope.update(this.state.mouseX, this.state.mouseY, deltaTime);

    // Update view position based on mouse offset (with smooth drift/parallax)
    const viewOffset = this.telescope.getViewOffset();
    const viewSpeedX = viewOffset.x * 0.5;
    const viewSpeedY = viewOffset.y * 0.5;

    this.state.viewX += viewSpeedX * deltaTime;
    this.state.viewY += viewSpeedY * deltaTime;

    // Wrap X horizontally (infinite horizontal scrolling like a celestial sphere)
    if (this.state.viewX < 0) this.state.viewX += SKY_WIDTH;
    if (this.state.viewX >= SKY_WIDTH) this.state.viewX -= SKY_WIDTH;

    // Clamp Y to sky bounds (poles are natural limits)
    const margin = 400;
    this.state.viewY = Math.max(margin, Math.min(SKY_HEIGHT - margin, this.state.viewY));

    // Check for discovery
    this.checkDiscovery(deltaTime);

    // Update all objects
    const skyX = this.state.viewX;
    const skyY = this.state.viewY;

    // Visibile radius depends on magnification
    // Standard radius covers X amount of sky. 
    // If zoom is 0.5x, we see 2x more sky, so effective radius for culling is larger.
    const effectiveTelescopeRadius = this.telescope.getInWorldRadius();

    for (const obj of this.celestialObjects) {
      // Calculate visibility generically
      const dx = this.getWrappedDeltaX(skyX, obj.x);
      const dy = skyY - obj.y;
      const distance = Math.hypot(dx, dy);
      // Use generous safety margin to prevent premature culling (especially for scaled DSOs)
      const isInView = distance < obj.radius + effectiveTelescopeRadius * 1.5;

      obj.update(deltaTime, isInView);
    }
  }

  /**
   * Check if player is hovering over any undiscovered object
   */
  private checkDiscovery(deltaTime: number): void {
    // Don't process new discoveries while a modal is active
    if (this.modalActive) return;

    const telescopeRadius = this.telescope.getRadius();
    const skyX = this.state.viewX;
    const skyY = this.state.viewY;

    let isHoveringAny = false;
    let hoveringObject: CelestialObject | null = null;

    for (const obj of this.celestialObjects) {
      if (obj.isDiscovered) continue;

      const dx = this.getWrappedDeltaX(skyX, obj.x);
      const dy = skyY - obj.y;
      const distance = Math.hypot(dx, dy);

      if (distance < obj.radius + telescopeRadius * 0.3) {
        // Player is hovering over this object
        isHoveringAny = true;
        hoveringObject = obj;

        // Accumulate hover time for discovery
        if (obj.addHoverTime(deltaTime)) {
          this.onObjectDiscovered(obj);
        }

        // Play build-up sound based on discovery progress (Constellation primarily)
        if (obj instanceof Constellation) {
          const progress = obj.discoveryProgress;
          this.audioManager.playDiscoveryBuildUp(progress);
        } else if (obj instanceof Nebula) {
          // Nebula has property directly
          const progress = obj.discoveryProgress;
          this.audioManager.startNebulaDrone(progress);
        }

      } else {
        obj.resetHoverTime();
      }
    }

    // Stop sounds if not hovering
    if (!isHoveringAny) {
      this.audioManager.stopDiscoveryBuildUp();
      this.audioManager.stopNebulaDrone();
    } else if (hoveringObject && !(hoveringObject instanceof Nebula)) {
      // If hovering something else, make sure nebula drone stops
      this.audioManager.stopNebulaDrone();
    }
  }

  /**
   * generic discovery handler
   */
  private onObjectDiscovered(obj: CelestialObject): void {
    this.state.discoveredCount++;

    if (obj instanceof Constellation) {
      // Stop build up
      this.audioManager.stopDiscoveryBuildUp();

      const c = obj as Constellation;
      const data = c.getData();

      c.setOnConnectionRevealed((index, total) => {
        this.audioManager.playStarConnectionSound(index, total);
      });

      c.setOnAnimationComplete(() => {
        // Play dramatic finish sound when animation completes
        this.audioManager.playCosmicFlash();

        // Open pattern match modal instead of immediately logging discovery
        this.openPatternMatchModal(c);
      });
    } else if (obj instanceof Nebula) {
      // Stop nebula drone and wait for bloom animation
      this.audioManager.stopNebulaDrone();
      const n = obj as Nebula;
      n.setOnAnimationComplete(() => {
        this.openNebulaFeatureModal(n);
      });
    } else if (obj instanceof StarCluster) {
      // Play cluster sparkle and wait for reveal animation
      this.audioManager.playClusterSparkle(1.0);
      const sc = obj as StarCluster;
      sc.setOnAnimationComplete(() => {
        this.openClusterMatchModal(sc);
      });
    } else if (obj instanceof Galaxy) {
      // Play discovery sound and wait for bloom animation
      this.audioManager.playDiscoverySound();
      const g = obj as Galaxy;
      g.setOnAnimationComplete(() => {
        this.openGalaxyStructureModal(g);
      });
    }
  }

  /**
   * Open pattern match modal for constellation discovery
   */
  private openPatternMatchModal(constellation: Constellation): void {
    this.modalActive = true;

    const modal = new PatternMatchModal(
      constellation,
      () => {
        this.onPatternMatchComplete(constellation);
      },
      this.audioManager // Pass audio manager for sound feedback
    );

    this.currentModal = modal;
    this.modalManager.show(modal.render());
  }

  /**
   * Handle pattern match completion
   */
  private onPatternMatchComplete(constellation: Constellation): void {
    const data = constellation.getData();

    // Play gentle completion chime for pattern matching success
    this.audioManager.playPatternCompletionChime();

    // Log the discovery
    this.discoveriesTab.addDiscovery(data);
    this.showDiscoveryNotification(data.name);
    if (data.set) this.checkSetCompletion(data.set);

    // Destroy modal before hiding
    if (this.currentModal) {
      this.currentModal.destroy();
      this.currentModal = null;
    }

    // Close modal - defer modalActive = false until after fade-out completes
    this.modalManager.hide(() => {
      this.modalActive = false;
    });
  }

  /**
   * Open nebula feature identification modal
   */
  private openNebulaFeatureModal(nebula: Nebula): void {
    this.modalActive = true;

    const modal = new NebulaFeatureModal(
      nebula,
      () => {
        this.onDSOModalComplete(nebula);
      },
      this.audioManager
    );

    this.currentModal = modal;
    this.modalManager.show(modal.render());
  }

  /**
   * Open star cluster visual matching modal
   */
  private openClusterMatchModal(cluster: StarCluster): void {
    this.modalActive = true;

    // Get all StarCluster instances for the quiz options
    const allClusters = this.celestialObjects.filter(
      (obj): obj is StarCluster => obj instanceof StarCluster
    );

    const modal = new ClusterMatchModal(
      cluster,
      allClusters,
      () => {
        this.onDSOModalComplete(cluster);
      },
      this.audioManager
    );

    this.currentModal = modal;
    this.modalManager.show(modal.render());
  }

  /**
   * Open galaxy structure identification modal
   */
  private openGalaxyStructureModal(galaxy: Galaxy): void {
    this.modalActive = true;

    const modal = new GalaxyStructureModal(
      galaxy,
      () => {
        this.onDSOModalComplete(galaxy);
      },
      this.audioManager
    );

    this.currentModal = modal;
    this.modalManager.show(modal.render());
  }

  /**
   * Handle DSO modal completion (nebula, cluster, or galaxy)
   */
  private onDSOModalComplete(obj: CelestialObject): void {
    // Play gentle completion chime for quiz success
    this.audioManager.playPatternCompletionChime();

    // Add to discoveries
    this.discoveriesTab.addDiscovery(obj.getData());
    this.showDiscoveryNotification(obj.name);

    // Destroy modal before hiding
    if (this.currentModal) {
      this.currentModal.destroy();
      this.currentModal = null;
    }

    // Close modal - defer modalActive = false until after fade-out completes
    this.modalManager.hide(() => {
      this.modalActive = false;
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

    // Clear canvas with deep space gradient
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.height
    );
    gradient.addColorStop(0, '#0f1020');
    gradient.addColorStop(0.6, '#0a0a18');
    gradient.addColorStop(1, '#050510');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Get telescope position and radius for clipping
    const telescopePos = this.telescope.getPosition();
    const telescopeRadius = this.telescope.getRadius();

    // Create circular clipping region for telescope view
    ctx.save();
    ctx.beginPath();
    ctx.arc(telescopePos.x, telescopePos.y, telescopeRadius, 0, Math.PI * 2);
    ctx.clip();

    // Apply Magnification
    // We scale around the center of the telescope
    const mag = this.telescope.getMagnification();

    // Enhanced vignette at Deep Field (3.0x) magnification
    if (mag === 3.0) {
      const vignetteGradient = ctx.createRadialGradient(
        telescopePos.x, telescopePos.y, telescopeRadius * 0.4,
        telescopePos.x, telescopePos.y, telescopeRadius
      );
      vignetteGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignetteGradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.15)');
      vignetteGradient.addColorStop(1, 'rgba(0, 0, 0, 0.4)');

      ctx.fillStyle = vignetteGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Transform to center, scale, transform back
    ctx.translate(telescopePos.x, telescopePos.y);
    ctx.scale(mag, mag);
    ctx.translate(-telescopePos.x, -telescopePos.y);

    // Calculate DSO scale and visual effect parameters based on magnification
    const dsoScale = 0.4 + (mag / 3.0) * 0.6;
    const constellationOpacity = mag === 3.0 ? 0.4 : 1.0;
    const dsoGlow = mag === 3.0 ? 1.3 : 1.0;

    // Render Order:
    // 0. Galaxies (Furthest background)
    // 1. Nebulae (Background)
    // 2. StarField (Stars)
    // 3. Constellations & Clusters (Foreground)

    // Galaxies (furthest)
    for (const obj of this.celestialObjects) {
      if (obj instanceof Galaxy) {
        obj.render(ctx, viewX, viewY, canvas.width, canvas.height, dsoScale, dsoGlow);
      }
    }

    // Nebulae
    for (const obj of this.celestialObjects) {
      if (obj instanceof Nebula) {
        obj.render(ctx, viewX, viewY, canvas.width, canvas.height, dsoScale, dsoGlow);
      }
    }

    // StarField (Stars)
    // Draw star field within telescope view
    this.starField.render(ctx, viewX, viewY, canvas.width, canvas.height, telescopePos);

    // Constellations & Clusters
    for (const obj of this.celestialObjects) {
      if (obj instanceof Constellation) {
        obj.render(ctx, viewX, viewY, canvas.width, canvas.height, constellationOpacity);
      } else if (obj instanceof StarCluster) {
        obj.render(ctx, viewX, viewY, canvas.width, canvas.height, dsoScale, dsoGlow);
      }
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

  /**
   * Check if a constellation set is completed
   */
  private checkSetCompletion(setId: string): void {
    const set = CONSTELLATION_SETS[setId];
    if (!set) return;

    // Get all constellations in this set
    const setConstellations = this.constellations.filter(c => c.getData().set === setId);
    const allFound = setConstellations.every(c => c.isDiscovered);

    if (allFound) {
      // Apply upgrades
      if (set.upgradeId === 'stabilizer') {
        this.telescope.setDriftFactor(1.0); // Maximum stability
        this.showUpgradeNotification(set.name, set.upgradeName!);
      } else if (set.upgradeId === 'wide_angle') {
        this.telescope.setRadiusMultiplier(1.15); // 15% larger
        this.showUpgradeNotification(set.name, set.upgradeName!);
      } else {
        // Just show set completion if no specific upgrade
        this.showDiscoveryNotification(`${set.name} Completed!`);
      }
    }
  }

  /**
   * Show upgrade notification
   */
  private showUpgradeNotification(setName: string, upgradeName: string): void {
    const notification = document.getElementById('discovery-notification');
    const titleEl = notification?.querySelector('.notification-title');
    const nameEl = notification?.querySelector('.constellation-name');

    if (notification && titleEl && nameEl) {
      notification.classList.remove('hidden');
      titleEl.textContent = `${setName} Completed!`;
      nameEl.textContent = `Unlocked: ${upgradeName}`;
      nameEl.classList.add('upgrade-text'); // Add exciting style class

      // Trigger animation
      requestAnimationFrame(() => {
        notification.classList.add('visible');
      });

      // Hide after longer delay for upgrades
      setTimeout(() => {
        notification.classList.remove('visible');
        setTimeout(() => {
          notification.classList.add('hidden');
          // Reset text
          titleEl.textContent = 'Constellation Discovered';
          nameEl.classList.remove('upgrade-text');
        }, 5000);
      }, 5000);
    }
  }
}
