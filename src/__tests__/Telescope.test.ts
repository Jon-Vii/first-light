/**
 * Tests for Telescope class - drift/parallax calculations
 * 
 * Note: The Telescope class has DOM dependencies (HTMLDivElement, window).
 * These tests focus on the testable drift math logic by creating a minimal mock.
 */

import { describe, test, expect, beforeEach, mock } from 'bun:test';

// Mock window for tests
const mockWindow = {
  innerWidth: 1920,
  innerHeight: 1080,
  addEventListener: mock(() => { }),
};

// @ts-ignore - mock global window
globalThis.window = mockWindow;

// Import after mocking window
import { Telescope } from '../game/Telescope';

describe('Telescope', () => {
  let telescope: Telescope;
  let mockElement: HTMLDivElement;

  beforeEach(() => {
    // Reset window dimensions
    mockWindow.innerWidth = 1920;
    mockWindow.innerHeight = 1080;

    // Create mock element
    mockElement = {
      style: { left: '', top: '' }
    } as unknown as HTMLDivElement;

    telescope = new Telescope(mockElement);
  });

  describe('getPosition', () => {
    test('returns screen center coordinates', () => {
      const pos = telescope.getPosition();

      expect(pos.x).toBe(1920 / 2);
      expect(pos.y).toBe(1080 / 2);
    });

    test('adapts to different screen sizes', () => {
      mockWindow.innerWidth = 800;
      mockWindow.innerHeight = 600;

      const pos = telescope.getPosition();

      expect(pos.x).toBe(400);
      expect(pos.y).toBe(300);
    });
  });

  describe('getRadius', () => {
    test('calculates radius as 42.5% of smaller dimension', () => {
      const radius = telescope.getRadius();

      // 1080 is smaller, so: 1080 * 0.425 = 459
      expect(radius).toBe(1080 * 0.425);
    });

    test('uses height when height is smaller', () => {
      mockWindow.innerWidth = 1920;
      mockWindow.innerHeight = 800;

      // Need new telescope instance to recalculate
      const newTelescope = new Telescope(mockElement);
      const radius = newTelescope.getRadius();

      expect(radius).toBe(800 * 0.425);
    });

    test('uses width when width is smaller', () => {
      mockWindow.innerWidth = 600;
      mockWindow.innerHeight = 800;

      const newTelescope = new Telescope(mockElement);
      const radius = newTelescope.getRadius();

      expect(radius).toBe(600 * 0.425);
    });
  });

  describe('getViewOffset', () => {
    test('starts at origin (0, 0)', () => {
      const offset = telescope.getViewOffset();

      expect(offset.x).toBe(0);
      expect(offset.y).toBe(0);
    });

    test('moves toward mouse position over time', () => {
      // Mouse at screen center = no offset target
      telescope.update(960, 540, 0.016);
      let offset = telescope.getViewOffset();
      expect(offset.x).toBeCloseTo(0, 1);
      expect(offset.y).toBeCloseTo(0, 1);

      // Mouse 100px right of center
      telescope.update(1060, 540, 0.016);
      offset = telescope.getViewOffset();

      // Should have moved toward 100, but with lag
      expect(offset.x).toBeGreaterThan(0);
      expect(offset.x).toBeLessThan(100);
    });

    test('converges toward target with sufficient updates', () => {
      // Move mouse 200px right of center
      const targetOffsetX = 200;
      const mouseX = mockWindow.innerWidth / 2 + targetOffsetX;

      // Simulate many frames
      for (let i = 0; i < 300; i++) {
        telescope.update(mouseX, 540, 0.016);
      }

      const offset = telescope.getViewOffset();

      // Should be very close to target after many frames
      expect(offset.x).toBeCloseTo(targetOffsetX, 0);
    });

    test('applies lag factor correctly - larger deltaTime means faster convergence', () => {
      const mouseX = mockWindow.innerWidth / 2 + 100;

      // Two telescopes, one with small deltaTime, one with large
      const telescopeSmallDt = new Telescope(mockElement);
      const telescopeLargeDt = new Telescope(mockElement);

      telescopeSmallDt.update(mouseX, 540, 0.008);  // Half frame
      telescopeLargeDt.update(mouseX, 540, 0.032);  // Double frame

      const offsetSmall = telescopeSmallDt.getViewOffset();
      const offsetLarge = telescopeLargeDt.getViewOffset();

      // Larger deltaTime should result in more movement
      expect(offsetLarge.x).toBeGreaterThan(offsetSmall.x);
    });
  });
});
