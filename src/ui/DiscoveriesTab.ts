/**
 * DiscoveriesTab - Manages the discoveries panel UI
 */

import { type ConstellationData, CONSTELLATIONS } from '../data/constellations';

export class DiscoveriesTab {
  private listElement: HTMLElement | null;
  private countElement: HTMLElement | null;
  private discoveries: ConstellationData[] = [];
  private totalConstellations: number = 0;

  constructor() {
    this.listElement = document.getElementById('discoveries-list');
    this.countElement = document.querySelector('.discovery-count');
    this.totalConstellations = CONSTELLATIONS.length;
    this.updateCount(); // Init with 0/Total
  }

  /**
   * Add a newly discovered constellation
   */
  addDiscovery(constellation: ConstellationData): void {
    // Prevent duplicates
    if (this.discoveries.some(d => d.id === constellation.id)) return;

    this.discoveries.push(constellation);
    this.updateCount();
    this.addCard(constellation);

    // Flash the toggle button
    const toggle = document.getElementById('discoveries-toggle');
    if (toggle) {
      toggle.classList.add('pulse');
      setTimeout(() => toggle.classList.remove('pulse'), 500);
    }
  }

  /**
   * Update the discovery count badge
   */
  private updateCount(): void {
    if (this.countElement) {
      this.countElement.textContent = `${this.discoveries.length}/${this.totalConstellations}`;
    }
  }

  /**
   * Add a discovery card to the list
   */
  private addCard(constellation: ConstellationData): void {
    if (!this.listElement) return;

    const card = document.createElement('div');
    card.className = 'discovery-card';

    // Generate SVG mini-map
    const svgMap = this.generateConstellationSVG(constellation);

    card.innerHTML = `
      <div class="discovery-icon">
        ${svgMap}
      </div>
      <div class="discovery-info">
        <h3>${constellation.name}</h3>
        <p>${constellation.description || constellation.latinName || ''}</p>
      </div>
    `;

    // Add with animation
    card.style.opacity = '0';
    card.style.transform = 'translateY(-20px)';
    this.listElement.prepend(card);

    requestAnimationFrame(() => {
      card.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
  }

  /**
   * Generates a simple SVG visualization of the constellation
   */
  private generateConstellationSVG(data: ConstellationData): string {
    // Calculate bounding box to normalize coordinates
    const minX = Math.min(...data.stars.map(s => s.x));
    const maxX = Math.max(...data.stars.map(s => s.x));
    const minY = Math.min(...data.stars.map(s => s.y));
    const maxY = Math.max(...data.stars.map(s => s.y));

    // Add padding
    const padding = 50;
    const width = maxX - minX + (padding * 2);
    const height = maxY - minY + (padding * 2);

    // Helper to map coordinates
    const mapX = (x: number) => ((x - minX + padding) / width) * 100;
    const mapY = (y: number) => ((y - minY + padding) / height) * 100;

    let svg = `<svg viewBox="0 0 100 100" class="constellation-miniature">`;

    // Draw connections
    data.connections.forEach(([startIdx, endIdx]) => {
      const start = data.stars[startIdx];
      const end = data.stars[endIdx];

      if (start && end) {
        svg += `<line 
          x1="${mapX(start.x)}" y1="${mapY(start.y)}" 
          x2="${mapX(end.x)}" y2="${mapY(end.y)}" 
          stroke="var(--color-brass-dark)" 
          stroke-width="2" 
          stroke-linecap="round"
          opacity="0.6" />`;
      }
    });

    // Draw stars
    data.stars.forEach(star => {
      const cx = mapX(star.x);
      const cy = mapY(star.y);
      const r = 2 + (star.brightness * 2.5); // Radius based on brightness

      svg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="var(--color-ink)" />`;
    });

    svg += `</svg>`;
    return svg;
  }

  /**
   * Get all discoveries
   */
  getDiscoveries(): ConstellationData[] {
    return this.discoveries;
  }
}
