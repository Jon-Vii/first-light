/**
 * Seeing Stars - Main Entry Point
 */

import { Game } from './game/Game';


// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('sky-canvas') as HTMLCanvasElement;
  const telescopeOverlay = document.getElementById('telescope-overlay') as HTMLDivElement;
  const loadingScreen = document.getElementById('loading-screen') as HTMLDivElement;
  const loadingProgress = document.querySelector('.loading-progress') as HTMLDivElement;

  if (!canvas || !telescopeOverlay) {
    console.error('Required elements not found');
    return;
  }

  // Initialize the game
  const game = new Game(canvas, telescopeOverlay);

  // Simulate loading (in real app, this would track asset loading)
  let progress = 0;
  const loadingInterval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadingInterval);

      // Hide loading screen
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        game.start();
      }, 500);
    }
    loadingProgress.style.width = `${progress}%`;
  }, 200);
});
