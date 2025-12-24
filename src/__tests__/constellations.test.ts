/**
 * Tests for constellation data utilities
 * 
 * These tests verify the data structure integrity and utility functions.
 */

import { describe, test, expect } from 'bun:test';
import {
  CONSTELLATIONS,
  getConstellation,
  getUndiscoveredConstellations,
  getDiscoveredConstellations,
  SKY_WIDTH,
  SKY_HEIGHT,
  type ConstellationData,
} from '../data/constellations';

describe('Constellation Data', () => {
  describe('constants', () => {
    test('SKY_WIDTH is defined', () => {
      expect(SKY_WIDTH).toBe(4000);
    });

    test('SKY_HEIGHT is defined', () => {
      expect(SKY_HEIGHT).toBe(2000);
    });
  });

  describe('CONSTELLATIONS array', () => {
    test('contains 6 constellations', () => {
      expect(CONSTELLATIONS.length).toBe(6);
    });

    test('all constellations have unique IDs', () => {
      const ids = CONSTELLATIONS.map(c => c.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    test('all constellations have required fields', () => {
      for (const constellation of CONSTELLATIONS) {
        expect(typeof constellation.id).toBe('string');
        expect(typeof constellation.name).toBe('string');
        expect(typeof constellation.centerX).toBe('number');
        expect(typeof constellation.centerY).toBe('number');
        expect(typeof constellation.radius).toBe('number');
        expect(typeof constellation.discovered).toBe('boolean');
        expect(Array.isArray(constellation.stars)).toBe(true);
        expect(Array.isArray(constellation.connections)).toBe(true);
      }
    });

    test('all stars have valid structure', () => {
      for (const constellation of CONSTELLATIONS) {
        for (const star of constellation.stars) {
          expect(typeof star.id).toBe('string');
          expect(typeof star.x).toBe('number');
          expect(typeof star.y).toBe('number');
          expect(typeof star.brightness).toBe('number');
          expect(star.brightness).toBeGreaterThanOrEqual(0);
          expect(star.brightness).toBeLessThanOrEqual(1);
        }
      }
    });

    test('all connections reference valid star indices', () => {
      for (const constellation of CONSTELLATIONS) {
        const numStars = constellation.stars.length;

        for (const [idx1, idx2] of constellation.connections) {
          expect(idx1).toBeGreaterThanOrEqual(0);
          expect(idx1).toBeLessThan(numStars);
          expect(idx2).toBeGreaterThanOrEqual(0);
          expect(idx2).toBeLessThan(numStars);
        }
      }
    });

    test('constellation centers are within sky bounds', () => {
      for (const constellation of CONSTELLATIONS) {
        expect(constellation.centerX).toBeGreaterThanOrEqual(0);
        expect(constellation.centerX).toBeLessThanOrEqual(SKY_WIDTH);
        expect(constellation.centerY).toBeGreaterThanOrEqual(0);
        expect(constellation.centerY).toBeLessThanOrEqual(SKY_HEIGHT);
      }
    });

    test('constellation radii are positive', () => {
      for (const constellation of CONSTELLATIONS) {
        expect(constellation.radius).toBeGreaterThan(0);
      }
    });
  });

  describe('getConstellation', () => {
    test('returns constellation by valid ID', () => {
      const orion = getConstellation('orion');

      expect(orion).toBeDefined();
      expect(orion?.name).toBe('Orion');
    });

    test('returns undefined for invalid ID', () => {
      const result = getConstellation('nonexistent');

      expect(result).toBeUndefined();
    });

    test('finds all known constellations by ID', () => {
      const knownIds = ['orion', 'ursa-major', 'cassiopeia', 'cygnus', 'lyra', 'scorpius'];

      for (const id of knownIds) {
        const constellation = getConstellation(id);
        expect(constellation).toBeDefined();
        expect(constellation?.id).toBe(id);
      }
    });
  });

  describe('getUndiscoveredConstellations', () => {
    test('returns array of undiscovered constellations', () => {
      const undiscovered = getUndiscoveredConstellations();

      expect(Array.isArray(undiscovered)).toBe(true);

      for (const c of undiscovered) {
        expect(c.discovered).toBe(false);
      }
    });

    test('initially returns all constellations (none discovered by default)', () => {
      const undiscovered = getUndiscoveredConstellations();

      // All constellations start undiscovered
      expect(undiscovered.length).toBe(CONSTELLATIONS.filter(c => !c.discovered).length);
    });
  });

  describe('getDiscoveredConstellations', () => {
    test('returns array of discovered constellations', () => {
      const discovered = getDiscoveredConstellations();

      expect(Array.isArray(discovered)).toBe(true);

      for (const c of discovered) {
        expect(c.discovered).toBe(true);
      }
    });
  });

  describe('specific constellation data', () => {
    test('Orion has correct star count', () => {
      const orion = getConstellation('orion');
      expect(orion?.stars.length).toBe(7);
    });

    test('Cassiopeia has W-shape connections (4 segments)', () => {
      const cassiopeia = getConstellation('cassiopeia');
      expect(cassiopeia?.connections.length).toBe(4);
    });

    test('all constellations have at least 1 connection', () => {
      for (const constellation of CONSTELLATIONS) {
        expect(constellation.connections.length).toBeGreaterThanOrEqual(1);
      }
    });
  });
});
