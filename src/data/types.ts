/**
 * Constellation Data Types
 */

export type Observatory = 'northern' | 'southern';

export interface Star {
  id: string;
  x: number;
  y: number;
  brightness: number;
}

export interface ConstellationData {
  id: string;
  name: string;
  latinName: string;
  description: string;
  centerX: number;
  centerY: number;
  radius: number;
  discovered: boolean;
  observatory: Observatory;
  stars: Star[];
  connections: [number, number][];
  set?: string; // ID of the set this constellation belongs to
}
