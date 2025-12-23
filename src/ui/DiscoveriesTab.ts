/**
 * DiscoveriesTab - Manages the discoveries panel UI
 */

import type { ConstellationData } from '../data/constellations';


export class DiscoveriesTab {
  private listElement: HTMLElement | null;
  private countElement: HTMLElement | null;
  private discoveries: ConstellationData[] = [];

  constructor() {
    this.listElement = document.getElementById('discoveries-list');
    this.countElement = document.querySelector('.discovery-count');
  }

  /**
   * Add a newly discovered constellation
   */
  addDiscovery(constellation: ConstellationData): void {
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
      this.countElement.textContent = String(this.discoveries.length);
    }
  }

  /**
   * Add a discovery card to the list
   */
  private addCard(constellation: ConstellationData): void {
    if (!this.listElement) return;

    const card = document.createElement('div');
    card.className = 'discovery-card';
    card.innerHTML = `
      <h3>${constellation.name}</h3>
      <p>${constellation.description || constellation.latinName || ''}</p>
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
   * Get all discoveries
   */
  getDiscoveries(): ConstellationData[] {
    return this.discoveries;
  }
}
