/**
 * Seeing Stars - Main Entry Point
 */

import { Game } from './game/Game';
import { ObservatorySwitcher } from './ui/ObservatorySwitcher';


// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('sky-canvas') as HTMLCanvasElement;
  const telescopeOverlay = document.getElementById('telescope-overlay') as HTMLDivElement;
  const startScreen = document.getElementById('start-screen') as HTMLDivElement;
  const startButton = document.getElementById('start-button') as HTMLButtonElement;

  if (!canvas || !telescopeOverlay) {
    console.error('Required elements not found');
    return;
  }

  // Initialize the game (but don't start yet)
  const game = new Game(canvas, telescopeOverlay);

  // Initialize observatory switcher UI
  new ObservatorySwitcher(game);

  // Start game when button is clicked (this also unlocks audio)
  startButton?.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    game.start();
  });
});

