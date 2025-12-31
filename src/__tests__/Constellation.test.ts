/**
 * Tests for Constellation class - discovery state machine
 * 
 * These tests verify the discovery mechanics, animation state transitions,
 * and callback behavior without testing any canvas rendering.
 */

import { describe, test, expect, beforeEach, mock } from 'bun:test';
import { Constellation } from '../game/Constellation';
import type { ConstellationData } from '../data/constellations';

// Factory for test constellation data
function createTestConstellation(overrides: Partial<ConstellationData> = {}): ConstellationData {
  return {
    id: 'test-constellation',
    name: 'Test Constellation',
    latinName: 'Testus Constellatus',
    description: 'A test constellation',
    centerX: 500,
    centerY: 500,
    radius: 100,
    discovered: false,
    observatory: 'northern',
    stars: [
      { id: 'star1', x: 450, y: 450, brightness: 1.0 },
      { id: 'star2', x: 550, y: 450, brightness: 0.8 },
      { id: 'star3', x: 500, y: 550, brightness: 0.9 },
    ],
    connections: [
      [0, 1],  // star1 -> star2
      [1, 2],  // star2 -> star3
    ],
    ...overrides,
  };
}

describe('Constellation', () => {
  let constellation: Constellation;

  beforeEach(() => {
    constellation = new Constellation(createTestConstellation());
  });

  describe('initial state', () => {
    test('starts undiscovered', () => {
      expect(constellation.isDiscovered).toBe(false);
    });

    test('starts with zero discovery progress', () => {
      expect(constellation.getDiscoveryProgress()).toBe(0);
    });

    test('is not animating initially', () => {
      expect(constellation.isAnimatingDiscovery()).toBe(false);
    });

    test('returns correct data', () => {
      const data = constellation.getData();
      expect(data.id).toBe('test-constellation');
      expect(data.name).toBe('Test Constellation');
      expect(data.stars.length).toBe(3);
      expect(data.connections.length).toBe(2);
    });
  });

  describe('hover time accumulation', () => {
    test('accumulates hover time', () => {
      constellation.addHoverTime(0.5);
      expect(constellation.getDiscoveryProgress()).toBe(0.25); // 0.5 / 2.0
    });

    test('caps progress at 1.0', () => {
      constellation.addHoverTime(3.0); // More than required
      expect(constellation.getDiscoveryProgress()).toBe(1);
    });

    test('returns false when not yet discovered', () => {
      const result = constellation.addHoverTime(0.5);
      expect(result).toBe(false);
    });

    test('returns true when discovery threshold reached', () => {
      constellation.addHoverTime(1.9);
      const result = constellation.addHoverTime(0.2); // Total: 2.1s
      expect(result).toBe(true);
    });

    test('triggers discovery at exactly 2 seconds', () => {
      const result = constellation.addHoverTime(2.0);
      expect(result).toBe(true);
      expect(constellation.isDiscovered).toBe(true);
    });
  });

  describe('resetHoverTime', () => {
    test('resets hover time to zero', () => {
      constellation.addHoverTime(1.5);
      expect(constellation.getDiscoveryProgress()).toBeGreaterThan(0);

      constellation.resetHoverTime();

      expect(constellation.getDiscoveryProgress()).toBe(0);
    });

    test('allows discovery process to restart', () => {
      constellation.addHoverTime(1.5);
      constellation.resetHoverTime();

      constellation.addHoverTime(2.0);
      expect(constellation.isDiscovered).toBe(true);
    });
  });

  describe('discovery animation', () => {
    test('triggers animation on discovery', () => {
      constellation.addHoverTime(2.0);

      expect(constellation.isAnimatingDiscovery()).toBe(true);
    });

    test('animation progresses with update calls', () => {
      constellation.addHoverTime(2.0);

      const initiallyAnimating = constellation.isAnimatingDiscovery();

      // Progress through full animation (3.5 seconds)
      for (let i = 0; i < 250; i++) {
        constellation.update(0.016, true);
      }

      expect(initiallyAnimating).toBe(true);
      expect(constellation.isAnimatingDiscovery()).toBe(false);
    });

    test('animation does not progress when not in view', () => {
      constellation.addHoverTime(2.0);

      // Update with isInView = false
      for (let i = 0; i < 100; i++) {
        constellation.update(0.016, false);
      }

      // Should still be animating since no progress was made
      expect(constellation.isAnimatingDiscovery()).toBe(true);
    });

    test('getAnimationDuration returns expected value', () => {
      const duration = constellation.getAnimationDuration();
      expect(duration).toBe(3.5);
    });
  });

  describe('cancelDiscovery', () => {
    test('resets discovered state', () => {
      constellation.addHoverTime(2.0);
      expect(constellation.isDiscovered).toBe(true);

      constellation.cancelDiscovery();

      expect(constellation.isDiscovered).toBe(false);
    });

    test('stops animation', () => {
      constellation.addHoverTime(2.0);
      constellation.update(0.5, true);
      expect(constellation.isAnimatingDiscovery()).toBe(true);

      constellation.cancelDiscovery();

      expect(constellation.isAnimatingDiscovery()).toBe(false);
    });

    test('resets hover progress', () => {
      constellation.addHoverTime(2.0);
      constellation.cancelDiscovery();

      expect(constellation.getDiscoveryProgress()).toBe(0);
    });

    test('has no effect if not animating', () => {
      constellation.addHoverTime(1.0);
      constellation.cancelDiscovery();

      // Should still work normally
      constellation.addHoverTime(2.0);
      expect(constellation.isDiscovered).toBe(true);
    });
  });

  describe('callbacks', () => {
    test('onConnectionRevealed fires for each connection', () => {
      const callback = mock((index: number, total: number) => { });
      constellation.setOnConnectionRevealed(callback);

      constellation.addHoverTime(2.0);

      // Progress through animation
      for (let i = 0; i < 250; i++) {
        constellation.update(0.016, true);
      }

      // Should have been called: once for first star (-1), then for each connection
      // First star (-1, 2) + connection 0 (0, 2) + connection 1 (1, 2) = 3 calls
      expect(callback).toHaveBeenCalled();
      expect(callback.mock.calls.length).toBeGreaterThanOrEqual(3);
    });

    test('onAnimationComplete fires when animation ends', () => {
      const callback = mock(() => { });
      constellation.setOnAnimationComplete(callback);

      constellation.addHoverTime(2.0);

      // Progress through full animation
      for (let i = 0; i < 250; i++) {
        constellation.update(0.016, true);
      }

      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('callbacks are cleared after animation completes', () => {
      const completeCallback = mock(() => { });
      const revealCallback = mock((index: number, total: number) => { });

      constellation.setOnAnimationComplete(completeCallback);
      constellation.setOnConnectionRevealed(revealCallback);

      constellation.addHoverTime(2.0);

      // Complete animation
      for (let i = 0; i < 250; i++) {
        constellation.update(0.016, true);
      }

      const callCount = completeCallback.mock.calls.length;

      // Try to trigger again (shouldn't be possible, but verify callbacks cleared)
      constellation.update(1.0, true);

      expect(completeCallback.mock.calls.length).toBe(callCount);
    });
  });

  describe('already discovered constellation', () => {
    test('addHoverTime returns false when already discovered', () => {
      const discovered = new Constellation(createTestConstellation({ discovered: true }));

      const result = discovered.addHoverTime(2.0);

      expect(result).toBe(false);
    });

    test('addHoverTime does not change state when already discovered', () => {
      const discovered = new Constellation(createTestConstellation({ discovered: true }));

      discovered.addHoverTime(2.0);

      expect(discovered.getDiscoveryProgress()).toBe(0);
      expect(discovered.isAnimatingDiscovery()).toBe(false);
    });
  });

  describe('addHoverTime during animation', () => {
    test('returns false while animating', () => {
      constellation.addHoverTime(2.0);
      constellation.update(0.1, true);

      const result = constellation.addHoverTime(0.5);

      expect(result).toBe(false);
    });
  });
});
