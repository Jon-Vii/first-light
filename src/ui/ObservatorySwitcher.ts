/**
 * ObservatorySwitcher - UI component for switching between observatories
 *
 * Works with the brass dial interface in the new UI design
 */

import { OBSERVATORIES, type Observatory } from '../data/constellations';
import type { Game } from '../game/Game';

export class ObservatorySwitcher {
  private dialElement: HTMLElement | null;
  private nameplateElement: HTMLElement | null;
  private game: Game;
  private currentObservatory: Observatory;

  constructor(game: Game) {
    this.game = game;
    this.currentObservatory = game.getCurrentObservatory();
    this.dialElement = document.getElementById('observatory-dial');
    this.nameplateElement = document.getElementById('observatory-nameplate');

    this.updateUI();
    this.setupEventListeners();
  }

  private updateUI(): void {
    if (!this.dialElement) return;

    // Update dial sector active states
    const sectors = this.dialElement.querySelectorAll('.dial-sector');
    sectors.forEach(sector => {
      const sectorEl = sector as HTMLElement;
      const observatory = sectorEl.dataset.observatory as Observatory;

      if (observatory === this.currentObservatory) {
        sectorEl.classList.add('active');
      } else {
        sectorEl.classList.remove('active');
      }
    });

    // Update nameplate
    this.updateNameplate();
  }

  private updateNameplate(): void {
    if (!this.nameplateElement) return;

    const obs = OBSERVATORIES[this.currentObservatory];
    const locationEl = this.nameplateElement.querySelector('.observatory-location');
    const coordsEl = this.nameplateElement.querySelector('.observatory-coords');

    if (locationEl) {
      locationEl.textContent = obs.name;
    }
    if (coordsEl) {
      coordsEl.textContent = obs.location;
    }
  }

  private setupEventListeners(): void {
    if (!this.dialElement) return;

    this.dialElement.addEventListener('click', (e) => {
      const sector = (e.target as HTMLElement).closest('.dial-sector') as HTMLElement;
      if (!sector) return;

      const observatory = sector.dataset.observatory as Observatory;
      if (observatory && observatory !== this.currentObservatory) {
        this.switchTo(observatory);
      }
    });
  }

  private switchTo(observatory: Observatory): void {
    this.currentObservatory = observatory;
    this.game.switchObservatory(observatory);
    this.updateUI();
  }
}
