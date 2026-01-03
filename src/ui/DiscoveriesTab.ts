/**
 * DiscoveriesTab - Manages the discoveries panel UI
 *
 * Features:
 * - Progress dial with SVG ring animation
 * - Set-based organization with completion tracking
 * - Card animations on discovery
 */

import { type ConstellationData, getConstellationsByObservatory, type Observatory } from '../data/constellations';
import { CONSTELLATION_SETS } from '../data/sets';
import { type NebulaData, NEBULAE } from '../data/nebulae';
import { type ClusterData, CLUSTERS } from '../data/clusters';
import { type GalaxyData, GALAXIES } from '../data/galaxies';

type DiscoveryItem = ConstellationData | NebulaData | ClusterData | GalaxyData;

export class DiscoveriesTab {
  private listElement: HTMLElement | null;
  private countElement: HTMLElement | null;
  private progressCountElement: HTMLElement | null;
  private progressFillElement: SVGCircleElement | null;
  private panelElement: HTMLElement | null;
  private discoveriesByObservatory: Map<Observatory, DiscoveryItem[]> = new Map([
    ['northern', []],
    ['southern', []]
  ]);
  private totalItems: number = 0;
  private currentObservatory: Observatory;

  // Track DOM elements for sets to avoid rebuilding
  private setSections: Map<string, HTMLElement> = new Map();

  // Progress ring circumference (2 * PI * r where r = 15.5)
  private readonly RING_CIRCUMFERENCE = 97.4;

  constructor(observatory: Observatory = 'northern') {
    this.listElement = document.getElementById('discoveries-list');
    this.countElement = document.querySelector('.discovery-count');
    this.progressCountElement = document.querySelector('.progress-count');
    this.progressFillElement = document.querySelector('.progress-fill');
    this.panelElement = document.getElementById('discoveries-panel');
    this.currentObservatory = observatory;
    this.calculateTotalItems();
    this.updateCount();
    this.updateHeader();
  }

  private calculateTotalItems(): void {
    const constellations = getConstellationsByObservatory(this.currentObservatory).length;
    const nebulae = NEBULAE.length;
    const clusters = CLUSTERS.length;
    const galaxies = GALAXIES.length;
    this.totalItems = constellations + nebulae + clusters + galaxies;
  }

  /**
   * Get the discovery list for the current observatory
   */
  private getCurrentDiscoveries(): DiscoveryItem[] {
    return this.discoveriesByObservatory.get(this.currentObservatory) || [];
  }

  /**
   * Switch to a different observatory, preserving discoveries per-observatory
   */
  setObservatory(observatory: Observatory): void {
    this.currentObservatory = observatory;
    this.calculateTotalItems();

    // Don't clear discoveries - they're now stored per-observatory
    this.setSections.clear();

    if (this.listElement) {
      this.listElement.innerHTML = '';
    }

    // Re-render the current observatory's discoveries
    this.render();
    this.updateCount();
    this.updateHeader();
  }

  /**
   * Add a newly discovered item
   */
  addDiscovery(item: DiscoveryItem): void {
    const discoveries = this.getCurrentDiscoveries();
    if (discoveries.some(d => d.id === item.id)) return;

    discoveries.push(item);
    this.updateCount();
    this.addCardToSet(item);

    // Flash the toggle button
    const toggle = document.getElementById('discoveries-toggle');
    if (toggle) {
      toggle.classList.add('pulse');
      setTimeout(() => toggle.classList.remove('pulse'), 500);
    }
  }

  /**
   * Update the discovery count badge and progress dial
   */
  private updateCount(): void {
    const discoveries = this.getCurrentDiscoveries();
    const count = discoveries.length;

    // Update badge text
    if (this.countElement) {
      this.countElement.textContent = `${count}/${this.totalItems}`;
    }

    // Update progress count number
    if (this.progressCountElement) {
      this.progressCountElement.textContent = String(count);
    }

    // Update progress ring
    if (this.progressFillElement) {
      const progress = this.totalItems > 0 ? count / this.totalItems : 0;
      const offset = this.RING_CIRCUMFERENCE * (1 - progress);
      this.progressFillElement.style.strokeDashoffset = String(offset);
    }
  }

  /**
   * Get or create the section element for a specific set
   */
  private getSetSection(setId: string | undefined, type: 'constellation' | 'nebula' | 'cluster' | 'galaxy'): HTMLElement {
    const list = this.listElement;
    if (!list) throw new Error('Discoveries list element not found');

    let key = setId || 'misc';
    let title = 'Other Constellations';
    let upgradeText = '';

    if (type === 'nebula') {
      key = 'nebulae';
      title = 'Nebulae';
    } else if (type === 'cluster') {
      key = 'clusters';
      title = 'Star Clusters';
    } else if (type === 'galaxy') {
      key = 'galaxies';
      title = 'Galaxies';
    } else if (setId && CONSTELLATION_SETS[setId]) {
      const set = CONSTELLATION_SETS[setId];
      title = set.name;
      if (set.upgradeName) {
        upgradeText = `<span class="set-upgrade-hint">${set.upgradeName}</span>`;
      }
    }

    if (this.setSections.has(key)) {
      return this.setSections.get(key)!;
    }

    const section = document.createElement('div');
    section.className = 'discovery-set-section';
    section.dataset.set = key;

    const header = document.createElement('div');
    header.className = 'discovery-set-header';

    header.innerHTML = `
        <div class="set-title-row">
          <h4>${title}</h4>
          ${upgradeText}
        </div>
        <div class="set-progress-text">0 discovered</div>
    `;

    section.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'discovery-set-grid';
    section.appendChild(grid);

    list.appendChild(section);

    this.setSections.set(key, section);
    return section;
  }

  /**
   * Update the progress text in the set header
   */
  private updateSetProgress(setId: string, section: HTMLElement, type: 'constellation' | 'nebula' | 'cluster' | 'galaxy'): void {
    const discoveries = this.getCurrentDiscoveries();
    let setDiscoveries = 0;
    let setTotal = 0;
    let isSet = false;

    if (type === 'constellation' && setId && CONSTELLATION_SETS[setId]) {
      setDiscoveries = discoveries.filter(d => (d as ConstellationData).set === setId).length;
      setTotal = getConstellationsByObservatory(this.currentObservatory)
        .filter(d => d.set === setId).length;
      isSet = true;
    } else if (type === 'nebula') {
      setDiscoveries = discoveries.filter(d => 'layers' in d && !('galaxyType' in d)).length;
      setTotal = NEBULAE.length;
    } else if (type === 'cluster') {
      setDiscoveries = discoveries.filter(d => 'starCount' in d).length;
      setTotal = CLUSTERS.length;
    } else if (type === 'galaxy') {
      setDiscoveries = discoveries.filter(d => 'galaxyType' in d).length;
      setTotal = GALAXIES.length;
    } else {
      return;
    }

    const progressEl = section.querySelector('.set-progress-text');
    if (progressEl) {
      progressEl.textContent = `${setDiscoveries} / ${setTotal} discovered`;

      if (setDiscoveries === setTotal && setTotal > 0) {
        progressEl.classList.add('completed');
        progressEl.textContent = isSet ? '✦ Set Complete ✦' : '✦ All Found ✦';
        section.classList.add('set-completed');
      }
    }
  }

  /**
   * Add a discovery card to the appropriate set section
   */
  private addCardToSet(item: DiscoveryItem): void {
    if (!this.listElement) return;

    let type: 'constellation' | 'nebula' | 'cluster' | 'galaxy' = 'constellation';
    let setId: string | undefined = undefined;
    let description = '';

    if ('connections' in item) {
      type = 'constellation';
      setId = item.set;
      description = item.latinName || '';
    } else if ('galaxyType' in item) {
      type = 'galaxy';
      const galaxyItem = item as GalaxyData;
      description = `${galaxyItem.galaxyType.charAt(0).toUpperCase() + galaxyItem.galaxyType.slice(1)} Galaxy`;
    } else if ('layers' in item) {
      type = 'nebula';
      description = 'Nebula';
    } else if ('starCount' in item) {
      type = 'cluster';
      description = 'Star Cluster';
    }

    const section = this.getSetSection(setId, type);
    const grid = section.querySelector('.discovery-set-grid');

    if (!grid) return;

    const card = document.createElement('div');
    card.className = 'discovery-card';

    const icon = this.generateIcon(item);

    card.innerHTML = `
      <div class="discovery-icon">
        ${icon}
      </div>
      <div class="discovery-info">
        <h3>${item.name}</h3>
        <p>${description}</p>
      </div>
    `;

    // Entry animation
    card.style.opacity = '0';
    card.style.transform = 'translateY(-20px) rotate(-0.3deg)';

    grid.prepend(card);

    this.updateSetProgress(setId || '', section, type);

    requestAnimationFrame(() => {
      card.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0) rotate(-0.3deg)';
    });
  }

  /**
   * Generates a simple SVG visualization
   */
  private generateIcon(data: DiscoveryItem): string {
    if ('connections' in data) {
      return this.generateConstellationSVG(data);
    } else if ('galaxyType' in data) {
      return this.generateGalaxySVG(data as GalaxyData);
    } else if ('layers' in data) {
      return this.generateNebulaSVG(data);
    } else {
      return this.generateClusterSVG(data);
    }
  }

  private generateNebulaSVG(data: NebulaData): string {
    const layer1 = data.layers[0];
    const layer2 = data.layers[1] || layer1;

    const color1 = layer1 ? layer1.color : '#8866aa';
    const color2 = layer2 ? layer2.color : '#aabbcc';

    return `<svg viewBox="0 0 100 100" class="miniature">
        <filter id="blur-${data.id}">
           <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
        </filter>
        <circle cx="50" cy="50" r="40" fill="${color1}" filter="url(#blur-${data.id})" opacity="0.6" />
        <circle cx="50" cy="50" r="25" fill="${color2}" filter="url(#blur-${data.id})" opacity="0.8" />
      </svg>`;
  }

  private generateClusterSVG(data: ClusterData): string {
    let circles = '';
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const r = 20 + (i % 3) * 5;
      const cx = 50 + Math.cos(angle) * r;
      const cy = 50 + Math.sin(angle) * r;
      circles += `<circle cx="${cx}" cy="${cy}" r="${2 + (i % 2)}" fill="#3d2e24" opacity="0.8" />`;
    }
    circles += `<circle cx="50" cy="50" r="40" fill="${data.color}" opacity="0.15" />`;
    circles += `<circle cx="50" cy="50" r="5" fill="#3d2e24" />`;

    return `<svg viewBox="0 0 100 100" class="miniature">
         ${circles}
      </svg>`;
  }

  private generateConstellationSVG(data: ConstellationData): string {
    const minX = Math.min(...data.stars.map(s => s.x));
    const maxX = Math.max(...data.stars.map(s => s.x));
    const minY = Math.min(...data.stars.map(s => s.y));
    const maxY = Math.max(...data.stars.map(s => s.y));

    const padding = 50;
    const width = maxX - minX + (padding * 2);
    const height = maxY - minY + (padding * 2);

    const mapX = (x: number) => ((x - minX + padding) / width) * 100;
    const mapY = (y: number) => ((y - minY + padding) / height) * 100;

    // Using ink color from CSS variables
    let svg = `<svg viewBox="0 0 100 100" class="constellation-miniature">`;

    // Draw connections with ink color
    data.connections.forEach(([startIdx, endIdx]) => {
      const start = data.stars[startIdx];
      const end = data.stars[endIdx];

      if (start && end) {
        svg += `<line
          x1="${mapX(start.x)}" y1="${mapY(start.y)}"
          x2="${mapX(end.x)}" y2="${mapY(end.y)}"
          stroke="#3d2e24"
          stroke-width="1.5"
          stroke-linecap="round"
          opacity="0.5" />`;
      }
    });

    // Draw stars
    data.stars.forEach(star => {
      const cx = mapX(star.x);
      const cy = mapY(star.y);
      const r = 2.5 + (star.brightness * 1.5);

      svg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#1a1410" />`;
    });

    svg += `</svg>`;
    return svg;
  }

  private generateGalaxySVG(data: GalaxyData): string {
    let svg = `<svg viewBox="0 0 100 100" class="miniature">`;
    svg += `<defs>
      <radialGradient id="galaxy-grad-${data.id}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style="stop-color:#c4c4bb;stop-opacity:0.8" />
        <stop offset="40%" style="stop-color:#998899;stop-opacity:0.5" />
        <stop offset="100%" style="stop-color:#554455;stop-opacity:0" />
      </radialGradient>
    </defs>`;

    if (data.galaxyType === 'spiral') {
      // Spiral galaxy representation
      svg += `<ellipse cx="50" cy="50" rx="45" ry="35" fill="url(#galaxy-grad-${data.id})" opacity="0.5" />`;
      svg += `<ellipse cx="50" cy="50" rx="30" ry="23" fill="url(#galaxy-grad-${data.id})" opacity="0.6" />`;
      // Bright core
      svg += `<ellipse cx="50" cy="50" rx="12" ry="10" fill="#d4ccbb" opacity="0.8" />`;
      svg += `<ellipse cx="50" cy="50" rx="6" ry="5" fill="#f4e4cc" opacity="0.9" />`;
    } else if (data.galaxyType === 'elliptical') {
      // Elliptical galaxy representation
      svg += `<ellipse cx="50" cy="50" rx="40" ry="40" fill="url(#galaxy-grad-${data.id})" opacity="0.6" />`;
      svg += `<ellipse cx="50" cy="50" rx="25" ry="25" fill="#ccbbaa" opacity="0.7" />`;
      svg += `<ellipse cx="50" cy="50" rx="12" ry="12" fill="#e4d4bb" opacity="0.8" />`;
    } else {
      // Irregular galaxy
      svg += `<ellipse cx="50" cy="50" rx="35" ry="28" fill="url(#galaxy-grad-${data.id})" opacity="0.5" transform="rotate(15 50 50)" />`;
      svg += `<ellipse cx="45" cy="55" rx="20" ry="18" fill="#998899" opacity="0.6" />`;
      svg += `<ellipse cx="55" cy="45" rx="15" ry="12" fill="#bbaaaa" opacity="0.5" />`;
    }

    svg += `</svg>`;
    return svg;
  }

  /**
   * Get all discoveries for the current observatory
   */
  getDiscoveries(): DiscoveryItem[] {
    return this.getCurrentDiscoveries();
  }

  /**
   * Update the Field Notes header to show current observatory
   */
  private updateHeader(): void {
    const header = this.panelElement?.querySelector('.journal-header h2');
    if (!header) return;

    const observatoryName = this.currentObservatory === 'northern'
      ? 'Alpine Observatory'
      : 'Andean Observatory';

    header.textContent = `Field Notes - ${observatoryName}`;
  }

  /**
   * Re-render all discoveries for the current observatory
   */
  private render(): void {
    const discoveries = this.getCurrentDiscoveries();

    // Re-add all cards in order
    for (const item of discoveries) {
      this.addCardToSet(item);
    }
  }

  /**
   * Cleanup method for consistency with other UI components
   */
  destroy(): void {
    this.setSections.clear();
    if (this.listElement) {
      this.listElement.innerHTML = '';
    }
  }
}
