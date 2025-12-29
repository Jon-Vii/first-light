/**
 * ObservatorySwitcher - UI component for switching between observatories
 */

import { OBSERVATORIES, type Observatory } from '../data/constellations';
import type { Game } from '../game/Game';

export class ObservatorySwitcher {
  private container: HTMLElement | null;
  private game: Game;
  private currentObservatory: Observatory;

  constructor(game: Game) {
    this.game = game;
    this.currentObservatory = game.getCurrentObservatory();
    this.container = document.getElementById('observatory-switcher');

    this.render();
    this.setupEventListeners();
  }

  private render(): void {
    if (!this.container) return;

    const northern = OBSERVATORIES.northern;
    const southern = OBSERVATORIES.southern;

    this.container.innerHTML = `
      <div class="observatory-buttons">
        <button 
          class="observatory-btn ${this.currentObservatory === 'northern' ? 'active' : ''}"
          data-observatory="northern"
          title="${northern.name} - ${northern.location}"
        >
          <span class="observatory-icon">🏔️</span>
          <span class="observatory-label">North</span>
        </button>
        <button 
          class="observatory-btn ${this.currentObservatory === 'southern' ? 'active' : ''}"
          data-observatory="southern"
          title="${southern.name} - ${southern.location}"
        >
          <span class="observatory-icon">🏜️</span>
          <span class="observatory-label">South</span>
        </button>
      </div>
      <div class="observatory-info">
        <span class="observatory-name">${OBSERVATORIES[this.currentObservatory].name}</span>
      </div>
    `;
  }

  private setupEventListeners(): void {
    if (!this.container) return;

    this.container.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest('.observatory-btn') as HTMLElement;
      if (!btn) return;

      const observatory = btn.dataset.observatory as Observatory;
      if (observatory && observatory !== this.currentObservatory) {
        this.switchTo(observatory);
      }
    });
  }

  private switchTo(observatory: Observatory): void {
    this.currentObservatory = observatory;
    this.game.switchObservatory(observatory);
    this.render();
    this.setupEventListeners();
  }
}
