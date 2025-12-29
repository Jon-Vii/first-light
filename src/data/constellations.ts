/**
 * Constellation Data
 * 
 * Re-exports all constellation data from the auto-generated file.
 * The generated file contains all 88 IAU constellations with accurate
 * celestial coordinates from the d3-celestial dataset.
 * 
 * To regenerate: bun run scripts/convert-constellations.ts
 */

export {
  SKY_WIDTH,
  SKY_HEIGHT,
  OBSERVATORIES,
  CONSTELLATIONS,
  getConstellation,
  getUndiscoveredConstellations,
  getDiscoveredConstellations,
  getConstellationsByObservatory,
} from './constellations-generated';

export type { Observatory, ConstellationData, Star } from './types';
