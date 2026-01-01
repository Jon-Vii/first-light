export interface NebulaLayer {
  offsetX: number; // Relative to center
  offsetY: number;
  width: number;
  height: number;
  color: string;
  rotation?: number; // Radians
  opacity: number;
  shape: 'ellipse' | 'cloud' | 'streak';
  noiseScale?: number; // For texture detail (future use)
  blendMode?: GlobalCompositeOperation; // 'screen', 'source-over', 'multiply', etc.
}

export interface NebulaFeature {
  description: string;
  isPresent: boolean;
  category?: 'structure' | 'color' | 'component';
}

import type { Observatory } from './types';

export interface NebulaData {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  observatory: Observatory;
  layers: NebulaLayer[];
  features?: NebulaFeature[];
}

export const NEBULAE: NebulaData[] = [
  {
    id: 'orion_nebula',
    name: 'Orion Nebula (M42)',
    x: 1380,
    y: 1510,
    width: 64,
    height: 56,
    rotation: Math.PI / 12,
    observatory: 'northern',
    layers: [
      // ====================================
      // OUTER HALO - Following outline extent
      // ====================================
      // Faint outer envelope matching astronomical boundary
      { offsetX: 32, offsetY: -3, width: 150, height: 135, color: '#3d1a28', opacity: 0.09, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 30, offsetY: -2, width: 130, height: 120, color: '#4a2233', opacity: 0.12, shape: 'cloud', blendMode: 'screen' },

      // ====================================
      // EASTERN (LEFT) WING - Based on outline points
      // ====================================
      // Outline shows eastern wing extends from (0,0) to (21.5, -33.8)
      // That's the upper-left wing region
      { offsetX: -22, offsetY: -20, width: 75, height: 60, rotation: -0.3, color: '#773355', opacity: 0.16, shape: 'cloud', blendMode: 'screen' },
      { offsetX: -18, offsetY: -24, width: 60, height: 52, rotation: -0.25, color: '#884466', opacity: 0.18, shape: 'cloud', blendMode: 'screen' },
      { offsetX: -12, offsetY: -28, width: 48, height: 45, rotation: -0.2, color: '#994477', opacity: 0.19, shape: 'cloud', blendMode: 'screen' },
      // Bright edge
      { offsetX: -15, offsetY: -22, width: 42, height: 38, rotation: -0.18, color: '#aa5588', opacity: 0.21, shape: 'cloud', blendMode: 'screen' },

      // ====================================
      // WESTERN (RIGHT) WING - Based on outline points
      // ====================================
      // Outline shows western wing extends from (43.5, -23.7) to (63.5, -3.3)
      // That's the upper-right wing region
      { offsetX: 35, offsetY: -18, width: 72, height: 58, rotation: 0.25, color: '#663344', opacity: 0.17, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 42, offsetY: -14, width: 62, height: 50, rotation: 0.22, color: '#773355', opacity: 0.19, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 48, offsetY: -10, width: 52, height: 44, rotation: 0.2, color: '#884466', opacity: 0.20, shape: 'cloud', blendMode: 'screen' },
      // Bright edge
      { offsetX: 40, offsetY: -12, width: 45, height: 40, rotation: 0.18, color: '#994477', opacity: 0.22, shape: 'cloud', blendMode: 'screen' },

      // ====================================
      // SOUTHERN EXTENSION - Based on outline points
      // ====================================
      // Outline shows southern extent at (55.9, 28.0) and (37.4, 21.9)
      // This is "The Sword" - bright southern extension
      { offsetX: 28, offsetY: 18, width: 65, height: 52, rotation: 0.12, color: '#884466', opacity: 0.18, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 32, offsetY: 22, width: 55, height: 45, rotation: 0.1, color: '#994477', opacity: 0.20, shape: 'cloud', blendMode: 'screen' },

      // ====================================
      // CENTRAL HUYGENIAN REGION
      // ====================================
      // Main emission body - centered roughly at (30, 0)
      { offsetX: 18, offsetY: 2, width: 85, height: 72, color: '#884466', opacity: 0.20, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 20, offsetY: 0, width: 72, height: 62, color: '#994477', opacity: 0.22, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 22, offsetY: -2, width: 62, height: 54, color: '#aa5577', opacity: 0.24, shape: 'cloud', blendMode: 'screen' },

      // Inner bright concentration
      { offsetX: 24, offsetY: -4, width: 52, height: 46, color: '#bb6688', opacity: 0.26, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 25, offsetY: -5, width: 44, height: 40, color: '#cc7799', opacity: 0.28, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 26, offsetY: -6, width: 36, height: 34, color: '#dd88aa', opacity: 0.30, shape: 'cloud', blendMode: 'screen' },

      // ====================================
      // GREENISH IONIZATION (OIII)
      // ====================================
      { offsetX: 10, offsetY: 8, width: 38, height: 32, rotation: -0.22, color: '#668877', opacity: 0.17, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 36, offsetY: 6, width: 35, height: 30, rotation: 0.2, color: '#779988', opacity: 0.16, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 22, offsetY: -8, width: 30, height: 26, rotation: 0.1, color: '#88aa99', opacity: 0.15, shape: 'cloud', blendMode: 'screen' },

      // ====================================
      // TRAPEZIUM CLUSTER - Four distinct stars
      // ====================================
      // Positioned in central region around (26, -6)
      // Star 1 (NW)
      { offsetX: 24, offsetY: -8, width: 7, height: 7, color: '#ddeeff', opacity: 0.72, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 24, offsetY: -8, width: 4, height: 4, color: '#ffffff', opacity: 0.86, shape: 'ellipse', blendMode: 'screen' },

      // Star 2 (NE)
      { offsetX: 28, offsetY: -7, width: 6, height: 6, color: '#ddeeff', opacity: 0.70, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 28, offsetY: -7, width: 3, height: 3, color: '#ffffff', opacity: 0.84, shape: 'ellipse', blendMode: 'screen' },

      // Star 3 (SW)
      { offsetX: 25, offsetY: -4, width: 8, height: 8, color: '#ddeeff', opacity: 0.74, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 25, offsetY: -4, width: 4, height: 4, color: '#ffffff', opacity: 0.88, shape: 'ellipse', blendMode: 'screen' },

      // Star 4 (SE) - Brightest
      { offsetX: 28, offsetY: -3, width: 9, height: 9, color: '#eef4ff', opacity: 0.77, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 28, offsetY: -3, width: 5, height: 5, color: '#ffffff', opacity: 0.92, shape: 'ellipse', blendMode: 'screen' },

      // Central glow from Trapezium
      { offsetX: 26, offsetY: -5, width: 22, height: 20, color: '#cce4ff', opacity: 0.48, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 26, offsetY: -5, width: 14, height: 13, color: '#ddeeff', opacity: 0.58, shape: 'ellipse', blendMode: 'screen' },

      // ====================================
      // FISH'S MOUTH - Dark intrusion from NE
      // ====================================
      // Based on outline and visual research, dark lane cuts from northeast
      // Positioned in upper region
      { offsetX: 18, offsetY: -22, width: 58, height: 38, rotation: 0.32, color: '#0a0508', opacity: 0.88, shape: 'cloud', blendMode: 'source-over' },
      { offsetX: 15, offsetY: -24, width: 46, height: 30, rotation: 0.35, color: '#050305', opacity: 0.95, shape: 'cloud', blendMode: 'source-over' },
      { offsetX: 13, offsetY: -26, width: 36, height: 24, rotation: 0.38, color: '#000000', opacity: 1.0, shape: 'cloud', blendMode: 'source-over' },

      // Additional dark intrusions creating the "mouth" shape
      { offsetX: 20, offsetY: -18, width: 32, height: 22, rotation: 0.25, color: '#0f0a0f', opacity: 0.75, shape: 'cloud', blendMode: 'source-over' },
      { offsetX: 32, offsetY: -16, width: 28, height: 20, rotation: -0.22, color: '#140a14', opacity: 0.70, shape: 'cloud', blendMode: 'source-over' },

      // ====================================
      // M43 - Comma-shaped companion to north
      // ====================================
      // Positioned north of main nebula, separated by dark lane
      { offsetX: 8, offsetY: -42, width: 42, height: 38, color: '#884466', opacity: 0.23, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 8, offsetY: -42, width: 34, height: 32, color: '#994477', opacity: 0.27, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 8, offsetY: -42, width: 26, height: 25, color: '#aa5588', opacity: 0.31, shape: 'ellipse', blendMode: 'screen' },

      // M43 bright core
      { offsetX: 8, offsetY: -42, width: 17, height: 16, color: '#bb6699', opacity: 0.37, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 8, offsetY: -42, width: 10, height: 9, color: '#cc7799', opacity: 0.46, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 8, offsetY: -42, width: 6, height: 5, color: '#ddaacc', opacity: 0.56, shape: 'ellipse', blendMode: 'screen' },

      // Comma tail
      { offsetX: 6, offsetY: -36, width: 20, height: 16, rotation: -0.5, color: '#663344', opacity: 0.19, shape: 'streak', blendMode: 'screen' },

      // Dark separation between M42 and M43
      { offsetX: 14, offsetY: -32, width: 32, height: 14, rotation: 0.12, color: '#0a0508', opacity: 0.68, shape: 'streak', blendMode: 'source-over' },

      // ====================================
      // STRUCTURAL FILAMENTS
      // ====================================
      // Southern filaments
      { offsetX: 16, offsetY: 24, width: 44, height: 13, rotation: -0.16, color: '#773355', opacity: 0.15, shape: 'streak', blendMode: 'screen' },
      { offsetX: 38, offsetY: 26, width: 42, height: 12, rotation: 0.18, color: '#664444', opacity: 0.14, shape: 'streak', blendMode: 'screen' },

      // Northern filaments
      { offsetX: 8, offsetY: -20, width: 36, height: 11, rotation: -0.28, color: '#884466', opacity: 0.14, shape: 'streak', blendMode: 'screen' },
      { offsetX: 42, offsetY: -14, width: 34, height: 10, rotation: 0.26, color: '#775544', opacity: 0.13, shape: 'streak', blendMode: 'screen' },

      // Bright ionization fronts at wing edges
      { offsetX: -10, offsetY: -18, width: 30, height: 24, rotation: -0.2, color: '#bb7788', opacity: 0.18, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 50, offsetY: -8, width: 32, height: 26, rotation: 0.22, color: '#aa6677', opacity: 0.17, shape: 'cloud', blendMode: 'screen' }
    ],
    features: [
      { description: "Contains dark dust lanes forming a 'Fish Mouth' shape", isPresent: true, category: 'structure' },
      { description: "Has a bright central star cluster (Trapezium)", isPresent: true, category: 'component' },
      { description: "Shows a companion nebula (M43)", isPresent: true, category: 'component' },
      { description: "Displays greenish OIII emission regions", isPresent: true, category: 'color' },
      { description: "Has a ring or shell structure", isPresent: false, category: 'structure' },
      { description: "Shows dark pillar structures", isPresent: false, category: 'structure' }
    ]
  },

  // ==========================================
  // RING NEBULA (M57) - Planetary Nebula
  // ==========================================
  {
    id: 'ring_nebula',
    name: 'Ring Nebula (M57)',
    x: 3850, // Near Lyra
    y: 1200,
    width: 32,  // 80 * 0.4
    height: 32, // 80 * 0.4
    rotation: Math.PI / 18, // Slight tilt
    observatory: 'northern',
    layers: [
      // ====================================
      // OUTER FAINT HALO
      // ====================================
      // Extended tenuous envelope beyond main ring
      { offsetX: 0, offsetY: 0, width: 76, height: 74, color: '#5a3344', opacity: 0.10, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 68, height: 66, color: '#6b4455', opacity: 0.13, shape: 'ellipse', blendMode: 'screen' },

      // ====================================
      // OUTER RED SHELL (H-alpha emission)
      // ====================================
      // Aged coral/rose tones from hydrogen emission
      { offsetX: 0, offsetY: 0, width: 60, height: 58, color: '#995555', opacity: 0.24, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 54, height: 52, color: '#aa6666', opacity: 0.26, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 50, height: 48, color: '#bb7777', opacity: 0.22, shape: 'ellipse', blendMode: 'screen' },

      // ====================================
      // TRANSITION ZONE (Mixed emission)
      // ====================================
      { offsetX: 0, offsetY: 0, width: 46, height: 44, color: '#889988', opacity: 0.28, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 44, height: 42, color: '#99aa99', opacity: 0.24, shape: 'ellipse', blendMode: 'screen' },

      // ====================================
      // INNER BLUE-GREEN RING (OIII emission)
      // ====================================
      // Distinctive teal/turquoise from doubly-ionized oxygen
      { offsetX: 0, offsetY: 0, width: 40, height: 38, color: '#5a9999', opacity: 0.32, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 38, height: 36, color: '#6baaaa', opacity: 0.35, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 36, height: 34, color: '#7cbbbb', opacity: 0.30, shape: 'ellipse', blendMode: 'screen' },

      // Brightest inner edge of ring
      { offsetX: 0, offsetY: 0, width: 34, height: 32, color: '#8dcccc', opacity: 0.38, shape: 'ellipse', blendMode: 'screen' },

      // ====================================
      // CENTRAL CAVITY - The "hole" in the donut
      // ====================================
      // Darker central region creating ring effect
      { offsetX: 0, offsetY: 0, width: 24, height: 22, color: '#0a0a14', opacity: 0.65, shape: 'ellipse', blendMode: 'source-over' },
      { offsetX: 0, offsetY: 0, width: 20, height: 18, color: '#050508', opacity: 0.75, shape: 'ellipse', blendMode: 'source-over' },

      // ====================================
      // CENTRAL WHITE DWARF STAR
      // ====================================
      // Faint but visible central star
      { offsetX: 0, offsetY: 0, width: 7, height: 7, color: '#d4d4bb', opacity: 0.62, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 4, height: 4, color: '#e4e4cc', opacity: 0.72, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 2, height: 2, color: '#ffffff', opacity: 0.85, shape: 'ellipse', blendMode: 'screen' },

      // ====================================
      // STRUCTURAL DETAILS - Knots and irregularities
      // ====================================
      // Ring is not perfectly smooth - has density variations
      { offsetX: 13, offsetY: -9, width: 15, height: 13, rotation: 0.35, color: '#7aaa99', opacity: 0.26, shape: 'cloud', blendMode: 'screen' },
      { offsetX: -15, offsetY: 11, width: 17, height: 15, rotation: -0.52, color: '#6b9988', opacity: 0.24, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 9, offsetY: 13, width: 14, height: 12, rotation: 0.8, color: '#8bbb99', opacity: 0.22, shape: 'cloud', blendMode: 'screen' },
      { offsetX: -11, offsetY: -12, width: 16, height: 14, rotation: -0.7, color: '#7caa88', opacity: 0.25, shape: 'cloud', blendMode: 'screen' },

      // Brighter knots on inner edge
      { offsetX: -10, offsetY: 0, width: 11, height: 10, rotation: 0.2, color: '#9dccbb', opacity: 0.28, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 10, offsetY: -1, width: 12, height: 11, rotation: -0.3, color: '#8dbbaa', opacity: 0.27, shape: 'cloud', blendMode: 'screen' }
    ],
    features: [
      { description: "Has a ring or shell structure", isPresent: true, category: 'structure' },
      { description: "Shows a central white dwarf star", isPresent: true, category: 'component' },
      { description: "Displays blue-green OIII emission in the inner ring", isPresent: true, category: 'color' },
      { description: "Shows a red outer shell from H-alpha emission", isPresent: true, category: 'color' },
      { description: "Contains dark pillar structures", isPresent: false, category: 'structure' },
      { description: "Has a central pulsar", isPresent: false, category: 'component' }
    ]
  },

  // ==========================================
  // CRAB NEBULA (M1) - Supernova Remnant
  // ==========================================
  {
    id: 'crab_nebula',
    name: 'Crab Nebula (M1)',
    x: 1250, // Near Taurus
    y: 1280,
    width: 44,  // 110 * 0.4
    height: 36, // 90 * 0.4
    rotation: Math.PI / 7,
    observatory: 'northern',
    layers: [
      // ====================================
      // OUTER SHOCKWAVE - Expanding blast wave
      // ====================================
      { offsetX: 0, offsetY: 0, width: 92, height: 76, color: '#5a3322', opacity: 0.11, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 82, height: 68, color: '#6b4433', opacity: 0.14, shape: 'cloud', blendMode: 'screen' },

      // ====================================
      // BASE EMISSION CLOUD - Explosive debris
      // ====================================
      // Irregular, chaotic shape from supernova explosion
      { offsetX: 0, offsetY: 0, width: 72, height: 60, color: '#7a4433', opacity: 0.18, shape: 'cloud', blendMode: 'screen' },
      { offsetX: -4, offsetY: 2, width: 64, height: 54, color: '#8b5544', opacity: 0.20, shape: 'cloud', blendMode: 'screen' },

      // ====================================
      // MAJOR FILAMENTS - Web-like structure
      // ====================================
      // Northeast filament cluster
      { offsetX: -18, offsetY: -14, width: 52, height: 15, rotation: 0.55, color: '#aa5533', opacity: 0.26, shape: 'streak', blendMode: 'screen' },
      { offsetX: -16, offsetY: -12, width: 46, height: 13, rotation: 0.6, color: '#bb6644', opacity: 0.28, shape: 'streak', blendMode: 'screen' },
      { offsetX: -14, offsetY: -10, width: 40, height: 11, rotation: 0.65, color: '#cc7755', opacity: 0.24, shape: 'streak', blendMode: 'screen' },

      // Southeast filament cluster
      { offsetX: 22, offsetY: -10, width: 48, height: 14, rotation: -0.38, color: '#995533', opacity: 0.24, shape: 'streak', blendMode: 'screen' },
      { offsetX: 20, offsetY: -8, width: 42, height: 12, rotation: -0.42, color: '#aa6644', opacity: 0.26, shape: 'streak', blendMode: 'screen' },
      { offsetX: 18, offsetY: -6, width: 36, height: 10, rotation: -0.46, color: '#bb7755', opacity: 0.22, shape: 'streak', blendMode: 'screen' },

      // Southwest filament cluster
      { offsetX: -14, offsetY: 18, width: 44, height: 13, rotation: -0.75, color: '#b85533', opacity: 0.23, shape: 'streak', blendMode: 'screen' },
      { offsetX: -12, offsetY: 16, width: 38, height: 11, rotation: -0.8, color: '#c96644', opacity: 0.25, shape: 'streak', blendMode: 'screen' },
      { offsetX: -10, offsetY: 14, width: 32, height: 9, rotation: -0.85, color: '#da7755', opacity: 0.21, shape: 'streak', blendMode: 'screen' },

      // Northwest filament cluster
      { offsetX: 16, offsetY: 20, width: 42, height: 14, rotation: 0.88, color: '#8b4433', opacity: 0.25, shape: 'streak', blendMode: 'screen' },
      { offsetX: 14, offsetY: 18, width: 36, height: 12, rotation: 0.92, color: '#9c5544', opacity: 0.27, shape: 'streak', blendMode: 'screen' },
      { offsetX: 12, offsetY: 16, width: 30, height: 10, rotation: 0.96, color: '#ad6655', opacity: 0.23, shape: 'streak', blendMode: 'screen' },

      // ====================================
      // SECONDARY FILAMENTS - Inner web detail
      // ====================================
      // Crossing filaments creating network
      { offsetX: -8, offsetY: -8, width: 34, height: 11, rotation: 0.18, color: '#cc7755', opacity: 0.20, shape: 'streak', blendMode: 'screen' },
      { offsetX: 10, offsetY: -4, width: 32, height: 10, rotation: -0.25, color: '#bb6644', opacity: 0.22, shape: 'streak', blendMode: 'screen' },
      { offsetX: -6, offsetY: 8, width: 30, height: 9, rotation: 1.05, color: '#aa5533', opacity: 0.21, shape: 'streak', blendMode: 'screen' },
      { offsetX: 8, offsetY: 6, width: 28, height: 9, rotation: -1.1, color: '#995544', opacity: 0.19, shape: 'streak', blendMode: 'screen' },

      // Fine detail filaments
      { offsetX: 0, offsetY: -12, width: 24, height: 7, rotation: 0, color: '#dd8866', opacity: 0.18, shape: 'streak', blendMode: 'screen' },
      { offsetX: -10, offsetY: 0, width: 22, height: 7, rotation: 0.5, color: '#cc7755', opacity: 0.17, shape: 'streak', blendMode: 'screen' },
      { offsetX: 10, offsetY: 10, width: 20, height: 6, rotation: -0.6, color: '#bb6644', opacity: 0.16, shape: 'streak', blendMode: 'screen' },

      // ====================================
      // CENTRAL PULSAR REGION
      // ====================================
      // Bright core with embedded neutron star (pulsar)
      { offsetX: 0, offsetY: 0, width: 28, height: 24, color: '#d4aa77', opacity: 0.32, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 20, height: 18, color: '#e4bb88', opacity: 0.38, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 14, height: 12, color: '#f4cc99', opacity: 0.46, shape: 'ellipse', blendMode: 'screen' },

      // Pulsar itself (very bright, tiny)
      { offsetX: 0, offsetY: 0, width: 6, height: 5, color: '#ffddaa', opacity: 0.68, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 3, height: 2, color: '#ffffff', opacity: 0.82, shape: 'ellipse', blendMode: 'screen' },

      // ====================================
      // BRIGHT KNOTS - Dense condensations
      // ====================================
      // Scattered bright regions in filaments
      { offsetX: -20, offsetY: -10, width: 12, height: 10, rotation: 0.4, color: '#ee9977', opacity: 0.28, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 18, offsetY: 12, width: 11, height: 9, rotation: -0.5, color: '#dd8866', opacity: 0.26, shape: 'cloud', blendMode: 'screen' },
      { offsetX: -8, offsetY: 14, width: 10, height: 8, rotation: 0.7, color: '#cc7755', opacity: 0.24, shape: 'cloud', blendMode: 'screen' }
    ],
    features: [
      { description: "Shows filamentary structure throughout", isPresent: true, category: 'structure' },
      { description: "Has a central pulsar", isPresent: true, category: 'component' },
      { description: "Displays an irregular, chaotic shape", isPresent: true, category: 'structure' },
      { description: "Shows orange-red emission", isPresent: true, category: 'color' },
      { description: "Has a ring or shell structure", isPresent: false, category: 'structure' },
      { description: "Contains a companion nebula", isPresent: false, category: 'component' }
    ]
  },

  // ==========================================
  // EAGLE NEBULA (M16) - "Pillars of Creation"
  // ==========================================
  {
    id: 'eagle_nebula',
    name: 'Eagle Nebula (M16)',
    x: 4200, // Serpens region
    y: 1650,
    width: 40,  // 100 * 0.4
    height: 64, // 160 * 0.4
    rotation: Math.PI / 12,
    observatory: 'southern',
    layers: [
      // ====================================
      // BACKGROUND EMISSION - Based on outline (31 vertices, 23×22px core)
      // ====================================
      // Extended emission envelope surrounding the pillars
      { offsetX: 0, offsetY: 0, width: 102, height: 138, color: '#6b3344', opacity: 0.13, shape: 'cloud', blendMode: 'screen' },
      { offsetX: -6, offsetY: -12, width: 88, height: 118, color: '#7a4455', opacity: 0.16, shape: 'cloud', blendMode: 'screen' },
      { offsetX: -4, offsetY: -8, width: 72, height: 96, color: '#885566', opacity: 0.18, shape: 'cloud', blendMode: 'screen' },

      // Central emission region (compact core from outline)
      { offsetX: 0, offsetY: 8, width: 56, height: 52, color: '#994466', opacity: 0.22, shape: 'cloud', blendMode: 'screen' },
      { offsetX: -2, offsetY: 6, width: 44, height: 42, color: '#aa5577', opacity: 0.24, shape: 'cloud', blendMode: 'screen' },

      // ====================================
      // THE THREE PILLARS - "Pillars of Creation"
      // ====================================
      // Left Pillar (Tallest, ~80px)
      // Main dark body
      { offsetX: -15, offsetY: -6, width: 20, height: 84, rotation: -0.12, color: '#0f0a0f', opacity: 0.92, shape: 'streak', blendMode: 'source-over' },
      { offsetX: -16, offsetY: -8, width: 17, height: 78, rotation: -0.14, color: '#0a0508', opacity: 0.96, shape: 'streak', blendMode: 'source-over' },
      { offsetX: -17, offsetY: -10, width: 14, height: 72, rotation: -0.15, color: '#050305', opacity: 1.0, shape: 'streak', blendMode: 'source-over' },

      // Left pillar bright ionization edge (western side)
      { offsetX: -24, offsetY: -8, width: 12, height: 68, rotation: -0.1, color: '#994466', opacity: 0.32, shape: 'streak', blendMode: 'screen' },
      { offsetX: -26, offsetY: -6, width: 9, height: 58, rotation: -0.08, color: '#aa5577', opacity: 0.28, shape: 'streak', blendMode: 'screen' },

      // Center Pillar (Medium height, ~72px)
      // Main dark body
      { offsetX: 0, offsetY: 6, width: 22, height: 76, rotation: 0.04, color: '#140a0f', opacity: 0.90, shape: 'streak', blendMode: 'source-over' },
      { offsetX: -1, offsetY: 4, width: 19, height: 70, rotation: 0.05, color: '#0f0a0a', opacity: 0.94, shape: 'streak', blendMode: 'source-over' },
      { offsetX: -2, offsetY: 2, width: 16, height: 64, rotation: 0.06, color: '#0a0508', opacity: 1.0, shape: 'streak', blendMode: 'source-over' },

      // Center pillar bright edge (eastern side)
      { offsetX: 9, offsetY: 4, width: 13, height: 62, rotation: 0.08, color: '#aa5566', opacity: 0.34, shape: 'streak', blendMode: 'screen' },
      { offsetX: 11, offsetY: 6, width: 10, height: 52, rotation: 0.1, color: '#bb6677', opacity: 0.30, shape: 'streak', blendMode: 'screen' },

      // Right Pillar (Shorter, thicker, ~56px)
      // Main dark body
      { offsetX: 17, offsetY: 16, width: 24, height: 60, rotation: 0.18, color: '#1a0f14', opacity: 0.88, shape: 'streak', blendMode: 'source-over' },
      { offsetX: 16, offsetY: 14, width: 21, height: 56, rotation: 0.2, color: '#140a0f', opacity: 0.92, shape: 'streak', blendMode: 'source-over' },
      { offsetX: 15, offsetY: 12, width: 18, height: 50, rotation: 0.22, color: '#0f0a0a', opacity: 1.0, shape: 'streak', blendMode: 'source-over' },

      // Right pillar bright edge
      { offsetX: 26, offsetY: 16, width: 12, height: 48, rotation: 0.16, color: '#995566', opacity: 0.30, shape: 'streak', blendMode: 'screen' },
      { offsetX: 28, offsetY: 18, width: 9, height: 40, rotation: 0.14, color: '#aa6677', opacity: 0.26, shape: 'streak', blendMode: 'screen' },

      // ====================================
      // STAR-FORMING REGIONS - Tips of pillars
      // ====================================
      // Left pillar tip - intense star formation
      { offsetX: -16, offsetY: -46, width: 16, height: 15, color: '#cc8899', opacity: 0.38, shape: 'cloud', blendMode: 'screen' },
      { offsetX: -17, offsetY: -48, width: 12, height: 11, color: '#ddaaaa', opacity: 0.44, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: -18, offsetY: -50, width: 8, height: 7, color: '#eeccbb', opacity: 0.52, shape: 'ellipse', blendMode: 'screen' },

      // Center pillar tip
      { offsetX: -1, offsetY: -36, width: 14, height: 13, color: '#bb7788', opacity: 0.40, shape: 'cloud', blendMode: 'screen' },
      { offsetX: -2, offsetY: -38, width: 10, height: 9, color: '#cc99aa', opacity: 0.48, shape: 'ellipse', blendMode: 'screen' },

      // Right pillar tip
      { offsetX: 16, offsetY: -22, width: 12, height: 11, color: '#aa6677', opacity: 0.36, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 17, offsetY: -24, width: 8, height: 7, color: '#bb8899', opacity: 0.42, shape: 'ellipse', blendMode: 'screen' },

      // ====================================
      // SURROUNDING NEBULOSITY
      // ====================================
      // Extended emission around pillars
      { offsetX: -32, offsetY: 26, width: 42, height: 46, rotation: -0.28, color: '#6b3344', opacity: 0.16, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 30, offsetY: 34, width: 46, height: 50, rotation: 0.35, color: '#774455', opacity: 0.15, shape: 'cloud', blendMode: 'screen' },

      // Fainter wisps
      { offsetX: -18, offsetY: -54, width: 28, height: 24, rotation: -0.15, color: '#885566', opacity: 0.18, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 22, offsetY: 42, width: 32, height: 28, rotation: 0.25, color: '#774455', opacity: 0.14, shape: 'cloud', blendMode: 'screen' }
    ],
    features: [
      { description: "Contains dark pillar structures (Pillars of Creation)", isPresent: true, category: 'structure' },
      { description: "Shows bright star-forming regions at pillar tips", isPresent: true, category: 'component' },
      { description: "Displays silhouetted dust columns", isPresent: true, category: 'structure' },
      { description: "Shows red and green emission nebulosity", isPresent: true, category: 'color' },
      { description: "Has a ring or shell structure", isPresent: false, category: 'structure' },
      { description: "Shows filamentary structure", isPresent: false, category: 'structure' }
    ]
  },

  // ==========================================
  // LAGOON NEBULA (M8) - Emission Nebula
  // ==========================================
  {
    id: 'lagoon_nebula',
    name: 'Lagoon Nebula (M8)',
    x: 4550, // Sagittarius
    y: 1850,
    width: 64,  // 160 * 0.4
    height: 48, // 120 * 0.4
    rotation: Math.PI / 9,
    observatory: 'southern',
    layers: [
      // ====================================
      // OUTER ENVELOPE - Based on outline (30 vertices, 95×64px)
      // ====================================
      // Extended emission halo
      { offsetX: 0, offsetY: 0, width: 138, height: 98, color: '#5a2244', opacity: 0.12, shape: 'cloud', blendMode: 'screen' },
      { offsetX: -4, offsetY: -2, width: 118, height: 84, color: '#6b3355', opacity: 0.15, shape: 'cloud', blendMode: 'screen' },

      // ====================================
      // MAIN EMISSION REGIONS (Upper & Lower lobes)
      // ====================================
      // Upper (northern) lobe
      { offsetX: -8, offsetY: -16, width: 88, height: 42, color: '#884466', opacity: 0.20, shape: 'cloud', blendMode: 'screen' },
      { offsetX: -6, offsetY: -18, width: 72, height: 36, color: '#994477', opacity: 0.22, shape: 'cloud', blendMode: 'screen' },
      { offsetX: -4, offsetY: -20, width: 58, height: 30, color: '#aa5588', opacity: 0.24, shape: 'cloud', blendMode: 'screen' },

      // Lower (southern) lobe
      { offsetX: 4, offsetY: 12, width: 92, height: 46, color: '#7a3355', opacity: 0.19, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 6, offsetY: 14, width: 76, height: 38, color: '#8b4466', opacity: 0.21, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 8, offsetY: 16, width: 62, height: 32, color: '#9c5577', opacity: 0.23, shape: 'cloud', blendMode: 'screen' },

      // ====================================
      // HOURGLASS REGION - Bright central zones
      // ====================================
      // Western (left) bright region
      { offsetX: -20, offsetY: -8, width: 48, height: 38, color: '#bb6688', opacity: 0.26, shape: 'cloud', blendMode: 'screen' },
      { offsetX: -22, offsetY: -10, width: 38, height: 32, color: '#cc7799', opacity: 0.28, shape: 'cloud', blendMode: 'screen' },
      { offsetX: -24, offsetY: -12, width: 28, height: 24, color: '#dd88aa', opacity: 0.32, shape: 'cloud', blendMode: 'screen' },

      // Eastern (right) bright region
      { offsetX: 16, offsetY: 4, width: 52, height: 42, color: '#aa5577', opacity: 0.25, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 18, offsetY: 6, width: 42, height: 34, color: '#bb6688', opacity: 0.27, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 20, offsetY: 8, width: 32, height: 26, color: '#cc7799', opacity: 0.30, shape: 'cloud', blendMode: 'screen' },

      // ====================================
      // THE DARK LANE - Creating the "Lagoon"
      // ====================================
      // Prominent dark dust lane bisecting the nebula
      { offsetX: 0, offsetY: 0, width: 96, height: 18, rotation: 0.08, color: '#0a0508', opacity: 0.90, shape: 'streak', blendMode: 'source-over' },
      { offsetX: -2, offsetY: 1, width: 82, height: 14, rotation: 0.1, color: '#050305', opacity: 0.95, shape: 'streak', blendMode: 'source-over' },
      { offsetX: 0, offsetY: 2, width: 68, height: 12, rotation: 0.08, color: '#000000', opacity: 1.0, shape: 'streak', blendMode: 'source-over' },

      // Additional dark wisps creating structure
      { offsetX: 12, offsetY: -4, width: 44, height: 10, rotation: 0.15, color: '#140a14', opacity: 0.75, shape: 'streak', blendMode: 'source-over' },
      { offsetX: -16, offsetY: 3, width: 38, height: 9, rotation: -0.12, color: '#1a0f14', opacity: 0.70, shape: 'streak', blendMode: 'source-over' },

      // ====================================
      // NGC 6530 STAR CLUSTER - Embedded young stars
      // ====================================
      // Western cluster region
      { offsetX: -26, offsetY: -10, width: 20, height: 18, color: '#e4ccaa', opacity: 0.38, shape: 'cloud', blendMode: 'screen' },
      { offsetX: -28, offsetY: -12, width: 14, height: 13, color: '#f4ddbb', opacity: 0.45, shape: 'ellipse', blendMode: 'screen' },

      // Eastern cluster region
      { offsetX: 22, offsetY: 8, width: 22, height: 20, color: '#d4bbaa', opacity: 0.36, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 24, offsetY: 10, width: 16, height: 14, color: '#e4ccbb', opacity: 0.42, shape: 'ellipse', blendMode: 'screen' },

      // ====================================
      // STRUCTURAL DETAILS
      // ====================================
      // Bright knots and condensations
      { offsetX: -12, offsetY: -22, width: 18, height: 16, rotation: 0.25, color: '#cc8899', opacity: 0.28, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 14, offsetY: 18, width: 20, height: 18, rotation: -0.3, color: '#bb7788', opacity: 0.26, shape: 'cloud', blendMode: 'screen' },

      // Fainter outer wisps extending the nebula
      { offsetX: -42, offsetY: -12, width: 48, height: 36, rotation: -0.35, color: '#663344', opacity: 0.14, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 38, offsetY: 14, width: 52, height: 38, rotation: 0.4, color: '#774455', opacity: 0.15, shape: 'cloud', blendMode: 'screen' }
    ],
    features: [
      { description: "Has a dark lane bisecting the nebula", isPresent: true, category: 'structure' },
      { description: "Shows bright hourglass-shaped regions", isPresent: true, category: 'structure' },
      { description: "Contains an embedded star cluster", isPresent: true, category: 'component' },
      { description: "Displays pink-red emission nebulosity", isPresent: true, category: 'color' },
      { description: "Shows dark pillar structures", isPresent: false, category: 'structure' },
      { description: "Has a ring or shell structure", isPresent: false, category: 'structure' }
    ]
  },

  // ==========================================
  // HORSEHEAD NEBULA - Dark Nebula
  // ==========================================
  {
    id: 'horsehead_nebula',
    name: 'Horsehead Nebula',
    x: 1450, // Near Orion's Belt
    y: 1450,
    width: 28,  // 70 * 0.4
    height: 40, // 100 * 0.4
    rotation: Math.PI / 10,
    observatory: 'northern',
    layers: [
      // ====================================
      // IC 434 BACKGROUND - Based on outline (83 vertices, 89×126px)
      // ====================================
      // Extended vertical emission nebula
      { offsetX: 0, offsetY: 0, width: 92, height: 132, color: '#6b2233', opacity: 0.14, shape: 'cloud', blendMode: 'screen' },
      { offsetX: -4, offsetY: -8, width: 78, height: 116, color: '#7a3344', opacity: 0.18, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 2, offsetY: 4, width: 68, height: 98, color: '#884455', opacity: 0.20, shape: 'cloud', blendMode: 'screen' },

      // Brighter central region of IC 434
      { offsetX: -2, offsetY: 0, width: 56, height: 82, color: '#994466', opacity: 0.22, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 0, offsetY: -4, width: 48, height: 70, color: '#aa5577', opacity: 0.20, shape: 'cloud', blendMode: 'screen' },

      // ====================================
      // HORSEHEAD SILHOUETTE - Dark molecular cloud
      // ====================================
      // Lower body/chest (widest part)
      { offsetX: 2, offsetY: 12, width: 42, height: 38, rotation: 0.08, color: '#0a0508', opacity: 1.0, shape: 'cloud', blendMode: 'source-over' },
      { offsetX: 0, offsetY: 10, width: 36, height: 34, rotation: 0.05, color: '#050305', opacity: 1.0, shape: 'cloud', blendMode: 'source-over' },
      { offsetX: -1, offsetY: 9, width: 32, height: 30, rotation: 0.03, color: '#000000', opacity: 1.0, shape: 'cloud', blendMode: 'source-over' },

      // Neck (narrowing upward)
      { offsetX: -2, offsetY: -2, width: 26, height: 32, rotation: -0.05, color: '#0a0508', opacity: 1.0, shape: 'cloud', blendMode: 'source-over' },
      { offsetX: -3, offsetY: -4, width: 22, height: 28, rotation: -0.08, color: '#050305', opacity: 1.0, shape: 'cloud', blendMode: 'source-over' },

      // Head (distinct angular shape)
      { offsetX: -5, offsetY: -13, width: 20, height: 22, rotation: -0.12, color: '#000000', opacity: 1.0, shape: 'cloud', blendMode: 'source-over' },
      { offsetX: -6, offsetY: -15, width: 18, height: 19, rotation: -0.14, color: '#000000', opacity: 1.0, shape: 'cloud', blendMode: 'source-over' },

      // Muzzle/nose (distinctive protrusion)
      { offsetX: -11, offsetY: -17, width: 16, height: 15, rotation: -0.18, color: '#000000', opacity: 1.0, shape: 'ellipse', blendMode: 'source-over' },
      { offsetX: -13, offsetY: -18, width: 13, height: 12, rotation: -0.2, color: '#000000', opacity: 1.0, shape: 'ellipse', blendMode: 'source-over' },

      // Ears/crest (two distinct peaks)
      { offsetX: -4, offsetY: -24, width: 10, height: 12, rotation: -0.25, color: '#0a0508', opacity: 0.98, shape: 'ellipse', blendMode: 'source-over' },
      { offsetX: -8, offsetY: -26, width: 8, height: 10, rotation: -0.35, color: '#050305', opacity: 0.95, shape: 'ellipse', blendMode: 'source-over' },

      // ====================================
      // IONIZATION RIM - Bright edge
      // ====================================
      // Left (western) edge of Horsehead catches IC 434 light
      { offsetX: -14, offsetY: -10, width: 18, height: 28, rotation: -0.15, color: '#cc7766', opacity: 0.18, shape: 'streak', blendMode: 'screen' },
      { offsetX: -16, offsetY: -4, width: 14, height: 22, rotation: -0.12, color: '#bb6655', opacity: 0.16, shape: 'streak', blendMode: 'screen' },

      // Subtle rim at neck/head junction
      { offsetX: -10, offsetY: -12, width: 12, height: 16, rotation: -0.18, color: '#dd8877', opacity: 0.14, shape: 'streak', blendMode: 'screen' },

      // ====================================
      // SURROUNDING MOLECULAR CLOUD
      // ====================================
      // Extension below and to the right
      { offsetX: 8, offsetY: 20, width: 36, height: 42, rotation: 0.25, color: '#1a0f14', opacity: 0.75, shape: 'cloud', blendMode: 'source-over' },
      { offsetX: 12, offsetY: 24, width: 28, height: 34, rotation: 0.3, color: '#0f0a0f', opacity: 0.85, shape: 'cloud', blendMode: 'source-over' },

      // Wisps connecting to broader dark cloud complex
      { offsetX: -8, offsetY: 18, width: 24, height: 28, rotation: -0.2, color: '#140a14', opacity: 0.65, shape: 'cloud', blendMode: 'source-over' }
    ],
    features: [
      { description: "Shows a horse-shaped dark cloud silhouette", isPresent: true, category: 'structure' },
      { description: "Has a bright ionization rim along its edge", isPresent: true, category: 'structure' },
      { description: "Appears as a dark absorption nebula", isPresent: true, category: 'structure' },
      { description: "Shows pink-red background emission", isPresent: true, category: 'color' },
      { description: "Contains bright star-forming pillars", isPresent: false, category: 'structure' },
      { description: "Has a central white dwarf", isPresent: false, category: 'component' }
    ]
  },

  // ==========================================
  // HELIX NEBULA (NGC 7293) - "Eye of God"
  // ==========================================
  {
    id: 'helix_nebula',
    name: 'Helix Nebula (NGC 7293)',
    x: 5150, // Aquarius
    y: 1750,
    width: 52,  // 130 * 0.4
    height: 52, // 130 * 0.4
    rotation: Math.PI / 15,
    observatory: 'southern',
    layers: [
      // ====================================
      // FAINT OUTER ENVELOPE - Extended halo
      // ====================================
      { offsetX: 0, offsetY: 0, width: 118, height: 118, color: '#5a4433', opacity: 0.10, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 108, height: 108, color: '#6b5544', opacity: 0.13, shape: 'cloud', blendMode: 'screen' },

      // ====================================
      // OUTER RED HALO (H-alpha emission)
      // ====================================
      // Large outer shell - aged coral/rose tones
      { offsetX: 0, offsetY: 0, width: 100, height: 100, color: '#885544', opacity: 0.17, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 92, height: 92, color: '#997755', opacity: 0.19, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 86, height: 86, color: '#aa8866', opacity: 0.18, shape: 'ellipse', blendMode: 'screen' },

      // ====================================
      // OUTER RING STRUCTURE
      // ====================================
      // Dusty coral/rose intermediate zone
      { offsetX: 0, offsetY: 0, width: 78, height: 78, color: '#aa8866', opacity: 0.22, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 72, height: 72, color: '#bb9977', opacity: 0.24, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 68, height: 68, color: '#ccaa88', opacity: 0.20, shape: 'ellipse', blendMode: 'screen' },

      // ====================================
      // TRANSITION ZONE - Color gradient
      // ====================================
      { offsetX: 0, offsetY: 0, width: 62, height: 62, color: '#99aa99', opacity: 0.26, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 58, height: 58, color: '#88bb99', opacity: 0.24, shape: 'ellipse', blendMode: 'screen' },

      // ====================================
      // INNER TURQUOISE REGION (OIII emission)
      // ====================================
      // Blue-green inner zone from doubly-ionized oxygen
      { offsetX: 0, offsetY: 0, width: 52, height: 52, color: '#66aa99', opacity: 0.30, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 48, height: 48, color: '#77bbaa', opacity: 0.32, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 44, height: 44, color: '#88ccbb', opacity: 0.28, shape: 'ellipse', blendMode: 'screen' },

      // Brightest inner ring
      { offsetX: 0, offsetY: 0, width: 40, height: 40, color: '#99ddcc', opacity: 0.34, shape: 'ellipse', blendMode: 'screen' },

      // ====================================
      // CENTRAL CAVITY - The "Pupil"
      // ====================================
      // Dark central region creating eye-like appearance
      { offsetX: 0, offsetY: 0, width: 28, height: 28, color: '#0f1419', opacity: 0.58, shape: 'ellipse', blendMode: 'source-over' },
      { offsetX: 0, offsetY: 0, width: 22, height: 22, color: '#0a0f14', opacity: 0.68, shape: 'ellipse', blendMode: 'source-over' },
      { offsetX: 0, offsetY: 0, width: 18, height: 18, color: '#050a0f', opacity: 0.75, shape: 'ellipse', blendMode: 'source-over' },

      // ====================================
      // CENTRAL WHITE DWARF STAR
      // ====================================
      { offsetX: 0, offsetY: 0, width: 8, height: 8, color: '#d4d4bb', opacity: 0.68, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 5, height: 5, color: '#e4e4cc', opacity: 0.78, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 3, height: 3, color: '#f4f4dd', opacity: 0.88, shape: 'ellipse', blendMode: 'screen' },
      { offsetX: 0, offsetY: 0, width: 1, height: 1, color: '#ffffff', opacity: 0.95, shape: 'ellipse', blendMode: 'screen' },

      // ====================================
      // COMETARY KNOTS - Fibrous texture
      // ====================================
      // Thousands of small knots create distinctive texture
      // Radial pattern around the ring

      // Northeast quadrant
      { offsetX: 18, offsetY: -16, width: 14, height: 12, rotation: 0.38, color: '#88aa88', opacity: 0.24, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 22, offsetY: -12, width: 12, height: 10, rotation: 0.42, color: '#99bb99', opacity: 0.22, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 16, offsetY: -20, width: 11, height: 10, rotation: 0.35, color: '#779977', opacity: 0.20, shape: 'cloud', blendMode: 'screen' },

      // Northwest quadrant
      { offsetX: -20, offsetY: -14, width: 13, height: 11, rotation: -0.35, color: '#669966', opacity: 0.23, shape: 'cloud', blendMode: 'screen' },
      { offsetX: -16, offsetY: -18, width: 12, height: 10, rotation: -0.4, color: '#77aa77', opacity: 0.25, shape: 'cloud', blendMode: 'screen' },
      { offsetX: -22, offsetY: -10, width: 11, height: 9, rotation: -0.3, color: '#889988', opacity: 0.21, shape: 'cloud', blendMode: 'screen' },

      // Southeast quadrant
      { offsetX: 20, offsetY: 16, width: 15, height: 13, rotation: 0.75, color: '#aa9977', opacity: 0.22, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 16, offsetY: 20, width: 13, height: 11, rotation: 0.8, color: '#99aa88', opacity: 0.24, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 22, offsetY: 12, width: 12, height: 10, rotation: 0.7, color: '#88bb99', opacity: 0.20, shape: 'cloud', blendMode: 'screen' },

      // Southwest quadrant
      { offsetX: -18, offsetY: 18, width: 14, height: 12, rotation: -0.72, color: '#779988', opacity: 0.25, shape: 'cloud', blendMode: 'screen' },
      { offsetX: -22, offsetY: 14, width: 12, height: 11, rotation: -0.68, color: '#88aa99', opacity: 0.23, shape: 'cloud', blendMode: 'screen' },
      { offsetX: -16, offsetY: 22, width: 13, height: 10, rotation: -0.78, color: '#668877', opacity: 0.21, shape: 'cloud', blendMode: 'screen' },

      // Inner knots (closer to center)
      { offsetX: 12, offsetY: -10, width: 10, height: 9, rotation: 0.5, color: '#99ccbb', opacity: 0.26, shape: 'cloud', blendMode: 'screen' },
      { offsetX: -12, offsetY: 10, width: 11, height: 9, rotation: -0.55, color: '#88bbaa', opacity: 0.27, shape: 'cloud', blendMode: 'screen' },
      { offsetX: 10, offsetY: 12, width: 9, height: 8, rotation: 0.9, color: '#77aa99', opacity: 0.24, shape: 'cloud', blendMode: 'screen' },
      { offsetX: -10, offsetY: -12, width: 10, height: 8, rotation: -0.85, color: '#88cc99', opacity: 0.25, shape: 'cloud', blendMode: 'screen' }
    ],
    features: [
      { description: "Has a ring or shell structure", isPresent: true, category: 'structure' },
      { description: "Shows a central white dwarf star", isPresent: true, category: 'component' },
      { description: "Displays cometary knots texture throughout", isPresent: true, category: 'structure' },
      { description: "Shows blue-green inner ring emission", isPresent: true, category: 'color' },
      { description: "Has a horse-shaped silhouette", isPresent: false, category: 'structure' },
      { description: "Contains dark pillar structures", isPresent: false, category: 'structure' }
    ]
  }
];

export function getNebulaeByObservatory(observatory: Observatory): NebulaData[] {
  return NEBULAE.filter(n => n.observatory === observatory);
}
