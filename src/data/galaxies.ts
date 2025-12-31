import { type NebulaLayer } from './nebulae';
import type { Observatory } from './types';

export interface GalaxyData {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  galaxyType: 'spiral' | 'elliptical' | 'irregular';
  observatory: Observatory;
  layers: NebulaLayer[];
}

export const GALAXIES: GalaxyData[] = [
  // ==========================================
  // ANDROMEDA GALAXY (M31) - Spiral Galaxy
  // ==========================================
  {
    id: 'andromeda',
    name: 'Andromeda Galaxy (M31)',
    x: 200, // Andromeda constellation (northern sky)
    y: 1100,
    width: 54,  // 180 * 0.3
    height: 36, // 120 * 0.3
    rotation: Math.PI / 8,
    galaxyType: 'spiral',
    observatory: 'northern',
    layers: [
      // ====================================
      // EXTENDED STELLAR HALO
      // ====================================
      // Vast faint envelope detected in surveys
      { offsetX: 0, offsetY: 0, width: 130, height: 88, rotation: 0.3, color: '#443344', opacity: 0.07, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 115, height: 78, rotation: 0.3, color: '#554455', opacity: 0.09, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 102, height: 70, rotation: 0.3, color: '#665566', opacity: 0.11, shape: 'ellipse', blendMode: 'screen' },

      // ====================================
      // OUTER DISK - Faint outer regions
      // ====================================
      { offsetX: 0, offsetY: 0, width: 94, height: 54, rotation: 0.3, color: '#887788', opacity: 0.16, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 86, height: 50, rotation: 0.3, color: '#998899', opacity: 0.18, shape: 'ellipse', blendMode: 'screen' },

      // ====================================
      // SPIRAL ARM STRUCTURE - Tilted view
      // ====================================
      // Western (upper-left) arm segment
      { offsetX: -28, offsetY: -14, width: 68, height: 26, rotation: -0.35, color: '#7788aa', opacity: 0.17, shape: 'cloud', blendMode: 'screen' },
      { offsetX: -32, offsetY: -12, width: 58, height: 22, rotation: -0.42, color: '#8899bb', opacity: 0.19, shape: 'cloud', blendMode: 'screen' },
      { offsetX: -36, offsetY: -10, width: 48, height: 18, rotation: -0.48, color: '#99aacc', opacity: 0.15, shape: 'cloud', blendMode: 'screen' },

      // Eastern (lower-right) arm segment
      { offsetX: 25, offsetY: 11, width: 64, height: 24, rotation: 0.48, color: '#6677aa', opacity: 0.18, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 29, offsetY: 13, width: 54, height: 20, rotation: 0.55, color: '#7788bb', opacity: 0.20, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 33, offsetY: 15, width: 44, height: 16, rotation: 0.62, color: '#8899cc', opacity: 0.16, shape: 'cloud', blendMode: 'screen' },

      // Star-forming regions in arms (blue knots)
      { offsetX: -26, offsetY: -10, width: 11, height: 9, rotation: -0.4, color: '#aaccee', opacity: 0.24, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 24, offsetY: 10, width: 10, height: 8, rotation: 0.5, color: '#99bbdd', opacity: 0.22, shape: 'cloud', blendMode: 'screen' },

      // ====================================
      // MAIN DISK - Bright stellar disk
      // ====================================
      { offsetX: 0, offsetY: 0, width: 78, height: 46, rotation: 0.3, color: '#aa99aa', opacity: 0.22, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 70, height: 41, rotation: 0.3, color: '#bbaaaa', opacity: 0.24, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 62, height: 37, rotation: 0.3, color: '#ccbbaa', opacity: 0.26, shape: 'ellipse', blendMode: 'screen' },

      // ====================================
      // INNER DISK - Brighter inner regions
      // ====================================
      { offsetX: 0, offsetY: 0, width: 52, height: 31, rotation: 0.3, color: '#ccbbaa', opacity: 0.28, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 44, height: 26, rotation: 0.3, color: '#d4ccbb', opacity: 0.30, shape: 'ellipse', blendMode: 'screen' },

      // ====================================
      // DUST LANES - Prominent dark bands
      // ====================================
      // Western dust lane
      { offsetX: -16, offsetY: -6, width: 42, height: 10, rotation: 0.25, color: '#0f0a0f', opacity: 0.38, shape: 'streak', blendMode: 'source-over' },
      { offsetX: -14, offsetY: -5, width: 36, height: 8, rotation: 0.22, color: '#1a1419', opacity: 0.32, shape: 'streak', blendMode: 'source-over' },

      // Eastern dust lane
      { offsetX: 18, offsetY: 4, width: 38, height: 9, rotation: 0.38, color: '#140a14', opacity: 0.35, shape: 'streak', blendMode: 'source-over' },
      { offsetX: 16, offsetY: 3, width: 32, height: 7, rotation: 0.42, color: '#1a1419', opacity: 0.28, shape: 'streak', blendMode: 'source-over' },

      // ====================================
      // CENTRAL BULGE - Large elliptical bulge
      // ====================================
      { offsetX: 0, offsetY: 0, width: 34, height: 20, rotation: 0.3, color: '#d4ccbb', opacity: 0.34, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 27, height: 16, rotation: 0.3, color: '#e4d4bb', opacity: 0.38, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 21, height: 13, rotation: 0.3, color: '#f4e4cc', opacity: 0.44, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 15, height: 10, rotation: 0.3, color: '#ffffdd', opacity: 0.52, shape: 'ellipse', blendMode: 'screen' },

      // ====================================
      // NUCLEAR REGION - Very bright core
      // ====================================
      { offsetX: 0, offsetY: 0, width: 10, height: 7, rotation: 0.3, color: '#ffffee', opacity: 0.62, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 6, height: 4, rotation: 0.3, color: '#ffffff', opacity: 0.72, shape: 'ellipse', blendMode: 'screen' },

      // ====================================
      // COMPANION GALAXIES
      // ====================================
      // M32 - Compact elliptical (closer to center, bottom-right)
      { offsetX: 24, offsetY: 14, width: 11, height: 10, color: '#998899', opacity: 0.22, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 24, offsetY: 14, width: 7, height: 7, color: '#bbaaaa', opacity: 0.28, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 24, offsetY: 14, width: 4, height: 4, color: '#d4ccbb', opacity: 0.36, shape: 'ellipse', blendMode: 'screen' },

      // M110 (NGC 205) - Dwarf elliptical (further out, upper-left)
      { offsetX: -42, offsetY: -16, width: 14, height: 11, color: '#887788', opacity: 0.18, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: -42, offsetY: -16, width: 9, height: 7, color: '#aa99aa', opacity: 0.24, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: -42, offsetY: -16, width: 5, height: 4, color: '#ccbbaa', opacity: 0.32, shape: 'ellipse', blendMode: 'screen' }
    ]
  },

  // ==========================================
  // WHIRLPOOL GALAXY (M51) - Face-on Spiral
  // ==========================================
  {
    id: 'whirlpool',
    name: 'Whirlpool Galaxy (M51)',
    x: 3200, // Canes Venatici
    y: 1150,
    width: 33,  // 110 * 0.3
    height: 33, // 110 * 0.3
    rotation: 0,
    galaxyType: 'spiral',
    observatory: 'northern',
    layers: [
      // ====================================
      // OUTER HALO - Extended envelope
      // ====================================
      { offsetX: 0, offsetY: 0, width: 76, height: 76, color: '#443355', opacity: 0.08, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 68, height: 68, color: '#554466', opacity: 0.11, shape: 'cloud', blendMode: 'screen' },

      // ====================================
      // OUTER DISK - Faint outer regions
      // ====================================
      { offsetX: 0, offsetY: 0, width: 58, height: 58, color: '#776688', opacity: 0.15, shape: 'ellipse', blendMode: 'screen' },

      // ====================================
      // SPIRAL ARM STRUCTURE - Two prominent arms
      // ====================================
      // Northern arm (sweeps from NW to SE)
      // Outer segments
      { offsetX: -6, offsetY: -16, width: 32, height: 13, rotation: -0.65, color: '#6677aa', opacity: 0.18, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 4, offsetY: -18, width: 28, height: 11, rotation: -0.3, color: '#7788bb', opacity: 0.20, shape: 'cloud', blendMode: 'screen' },
      // Mid segments
      { offsetX: 12, offsetY: -12, width: 36, height: 14, rotation: 0.15, color: '#7788bb', opacity: 0.22, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 18, offsetY: -2, width: 32, height: 13, rotation: 0.65, color: '#8899cc', opacity: 0.21, shape: 'cloud', blendMode: 'screen' },
      // Inner segments
      { offsetX: 16, offsetY: 8, width: 28, height: 12, rotation: 1.15, color: '#8899bb', opacity: 0.20, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 6, offsetY: 16, width: 24, height: 11, rotation: 1.65, color: '#7788aa', opacity: 0.19, shape: 'cloud', blendMode: 'screen' },

      // Southern arm (sweeps from SW to NE)
      // Outer segments
      { offsetX: -4, offsetY: 18, width: 30, height: 12, rotation: 2.05, color: '#6677aa', opacity: 0.19, shape: 'cloud', blendMode: 'screen' },
      { offsetX: -14, offsetY: 14, width: 28, height: 11, rotation: 2.4, color: '#7788bb', opacity: 0.21, shape: 'cloud', blendMode: 'screen' },
      // Mid segments
      { offsetX: -18, offsetY: 4, width: 34, height: 13, rotation: -2.85, color: '#7788bb', opacity: 0.23, shape: 'cloud', blendMode: 'screen' },
      { offsetX: -16, offsetY: -8, width: 30, height: 12, rotation: -2.35, color: '#8899cc', opacity: 0.22, shape: 'cloud', blendMode: 'screen' },
      // Inner segments
      { offsetX: -8, offsetY: -14, width: 26, height: 11, rotation: -1.85, color: '#8899bb', opacity: 0.21, shape: 'cloud', blendMode: 'screen' },

      // ====================================
      // STAR-FORMING REGIONS - HII regions in arms
      // ====================================
      // Blue knots along northern arm
      { offsetX: 14, offsetY: -10, width: 10, height: 9, rotation: 0.4, color: '#99ccee', opacity: 0.28, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 18, offsetY: 2, width: 9, height: 8, rotation: 0.8, color: '#aaddff', opacity: 0.32, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 12, offsetY: 12, width: 8, height: 8, rotation: 1.3, color: '#88bbdd', opacity: 0.26, shape: 'cloud', blendMode: 'screen' },

      // Blue knots along southern arm
      { offsetX: -12, offsetY: 14, width: 9, height: 8, rotation: 2.3, color: '#99ccee', opacity: 0.30, shape: 'cloud', blendMode: 'screen' },
      { offsetX: -18, offsetY: 2, width: 10, height: 9, rotation: -2.7, color: '#aaddff', opacity: 0.29, shape: 'cloud', blendMode: 'screen' },
      { offsetX: -14, offsetY: -10, width: 8, height: 7, rotation: -2.0, color: '#88bbdd', opacity: 0.27, shape: 'cloud', blendMode: 'screen' },

      // ====================================
      // CENTRAL DISK - Bright inner disk
      // ====================================
      { offsetX: 0, offsetY: 0, width: 32, height: 32, color: '#aa9988', opacity: 0.24, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 26, height: 26, color: '#bbaa99', opacity: 0.27, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 22, height: 22, color: '#ccbbaa', opacity: 0.30, shape: 'ellipse', blendMode: 'screen' },

      // ====================================
      // CENTRAL BULGE - Yellow-white core
      // ====================================
      { offsetX: 0, offsetY: 0, width: 17, height: 17, color: '#d4ccbb', opacity: 0.36, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 13, height: 13, color: '#e4d4bb', opacity: 0.42, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 9, height: 9, color: '#f4e4cc', opacity: 0.50, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 6, height: 6, color: '#ffffee', opacity: 0.60, shape: 'ellipse', blendMode: 'screen' },

      // Nuclear region
      { offsetX: 0, offsetY: 0, width: 3, height: 3, color: '#ffffff', opacity: 0.70, shape: 'ellipse', blendMode: 'screen' },

      // ====================================
      // COMPANION GALAXY NGC 5195
      // ====================================
      // Irregular companion to the southeast
      { offsetX: 27, offsetY: 22, width: 19, height: 17, rotation: 0.3, color: '#887788', opacity: 0.18, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 27, offsetY: 22, width: 14, height: 13, rotation: 0.3, color: '#998899', opacity: 0.23, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 27, offsetY: 22, width: 10, height: 9, rotation: 0.3, color: '#bbaaaa', opacity: 0.28, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 27, offsetY: 22, width: 6, height: 6, rotation: 0.3, color: '#d4ccbb', opacity: 0.36, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 27, offsetY: 22, width: 3, height: 3, rotation: 0.3, color: '#e4ddcc', opacity: 0.48, shape: 'ellipse', blendMode: 'screen' },

      // ====================================
      // TIDAL INTERACTION - Bridge and distortion
      // ====================================
      // Tidal bridge connecting M51 and NGC 5195
      { offsetX: 14, offsetY: 11, width: 20, height: 16, rotation: 0.75, color: '#665577', opacity: 0.13, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 18, offsetY: 14, width: 16, height: 13, rotation: 0.8, color: '#776688', opacity: 0.15, shape: 'cloud', blendMode: 'screen' },

      // Arm distortion from tidal pull
      { offsetX: 21, offsetY: 16, width: 14, height: 11, rotation: 0.9, color: '#8899aa', opacity: 0.17, shape: 'cloud', blendMode: 'screen' }
    ]
  },

  // ==========================================
  // SOMBRERO GALAXY (M104) - Edge-on Spiral
  // ==========================================
  {
    id: 'sombrero',
    name: 'Sombrero Galaxy (M104)',
    x: 3100, // Virgo
    y: 1600,
    width: 42,  // 140 * 0.3
    height: 15, // 50 * 0.3
    rotation: Math.PI / 20,
    galaxyType: 'spiral',
    observatory: 'southern',
    layers: [
      // ====================================
      // EXTENDED HALO - Faint outer envelope
      // ====================================
      { offsetX: 0, offsetY: 0, width: 96, height: 48, rotation: 0, color: '#443344', opacity: 0.08, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 88, height: 42, rotation: 0, color: '#554455', opacity: 0.11, shape: 'ellipse', blendMode: 'screen' },

      // ====================================
      // OUTER DISK - Extended thin disk
      // ====================================
      { offsetX: 0, offsetY: 0, width: 82, height: 32, rotation: 0, color: '#776677', opacity: 0.16, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 76, height: 28, rotation: 0, color: '#887788', opacity: 0.18, shape: 'ellipse', blendMode: 'screen' },

      // ====================================
      // MAIN STELLAR DISK
      // ====================================
      { offsetX: 0, offsetY: 0, width: 70, height: 24, rotation: 0, color: '#998899', opacity: 0.22, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 66, height: 22, rotation: 0, color: '#aa99aa', opacity: 0.24, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 62, height: 20, rotation: 0, color: '#bbaaaa', opacity: 0.26, shape: 'ellipse', blendMode: 'screen' },

      // ====================================
      // DISK REGIONS ABOVE DUST LANE (Northern side)
      // ====================================
      { offsetX: 0, offsetY: -5, width: 64, height: 10, rotation: 0, color: '#bbaaaa', opacity: 0.20, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: -6, width: 58, height: 8, rotation: 0, color: '#ccbbbb', opacity: 0.22, shape: 'ellipse', blendMode: 'screen' },

      // ====================================
      // DISK REGIONS BELOW DUST LANE (Southern side)
      // ====================================
      { offsetX: 0, offsetY: 5, width: 64, height: 10, rotation: 0, color: '#bbaaaa', opacity: 0.20, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 6, width: 58, height: 8, rotation: 0, color: '#ccbbbb', opacity: 0.22, shape: 'ellipse', blendMode: 'screen' },

      // ====================================
      // THE DUST LANE - Signature feature
      // ====================================
      // Prominent dark silhouette cutting horizontally
      { offsetX: 0, offsetY: 0, width: 76, height: 8, rotation: 0, color: '#0a0508', opacity: 0.88, shape: 'streak', blendMode: 'source-over' },
      { offsetX: 0, offsetY: 0, width: 70, height: 6, rotation: 0, color: '#050305', opacity: 0.94, shape: 'streak', blendMode: 'source-over' },
      { offsetX: 0, offsetY: 0, width: 64, height: 5, rotation: 0, color: '#000000', opacity: 1.0, shape: 'streak', blendMode: 'source-over' },

      // Dust lane extensions (slightly irregular)
      { offsetX: 0, offsetY: -1, width: 58, height: 4, rotation: 0, color: '#0f0a0f', opacity: 0.75, shape: 'streak', blendMode: 'source-over' },
      { offsetX: 0, offsetY: 1, width: 58, height: 4, rotation: 0, color: '#0f0a0f', opacity: 0.75, shape: 'streak', blendMode: 'source-over' },

      // ====================================
      // CENTRAL BULGE - Large spheroidal component
      // ====================================
      // This is the "crown" of the sombrero hat
      { offsetX: 0, offsetY: 0, width: 34, height: 32, rotation: 0, color: '#bbaa99', opacity: 0.28, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 30, height: 28, rotation: 0, color: '#ccbbaa', opacity: 0.32, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 26, height: 24, rotation: 0, color: '#d4ccbb', opacity: 0.36, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 22, height: 21, rotation: 0, color: '#e4d4bb', opacity: 0.42, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 18, height: 17, rotation: 0, color: '#f4e4cc', opacity: 0.48, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 14, height: 14, rotation: 0, color: '#ffffdd', opacity: 0.56, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 10, height: 11, rotation: 0, color: '#ffffee', opacity: 0.64, shape: 'ellipse', blendMode: 'screen' },

      // ====================================
      // NUCLEAR REGION - Very bright active nucleus
      // ====================================
      { offsetX: 0, offsetY: 0, width: 7, height: 8, rotation: 0, color: '#ffffff', opacity: 0.72, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 4, height: 5, rotation: 0, color: '#ffffff', opacity: 0.82, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 2, height: 2, rotation: 0, color: '#ffffff', opacity: 0.92, shape: 'ellipse', blendMode: 'screen' },

      // ====================================
      // BULGE STRUCTURE - Boxy/peanut shape hints
      // ====================================
      // Subtle enhancement showing slightly boxy bulge shape
      { offsetX: -8, offsetY: 0, width: 12, height: 18, rotation: 0, color: '#d4ccbb', opacity: 0.16, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 8, offsetY: 0, width: 12, height: 18, rotation: 0, color: '#d4ccbb', opacity: 0.16, shape: 'ellipse', blendMode: 'screen' }
    ]
  }
];

export function getGalaxiesByObservatory(observatory: Observatory): GalaxyData[] {
  return GALAXIES.filter(g => g.observatory === observatory);
}
