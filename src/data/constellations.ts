/**
 * Constellation data definitions
 * Using simplified artistic star positions for aesthetic appeal
 */

export interface Star {
  id: string;
  x: number;  // Position in sky coordinates (0-1 normalized)
  y: number;
  brightness: number;  // 0-1, affects size and glow
}

export interface ConstellationData {
  id: string;
  name: string;
  latinName?: string;
  stars: Star[];
  connections: [number, number][];  // Pairs of star indices to connect
  centerX: number;  // Center position for discovery detection
  centerY: number;
  radius: number;   // Detection radius
  discovered: boolean;
  description?: string;
}

// Sky dimensions in virtual units
export const SKY_WIDTH = 4000;
export const SKY_HEIGHT = 2000;

/**
 * Initial constellation data
 * Positions are in sky coordinates (0 to SKY_WIDTH/HEIGHT)
 */
export const CONSTELLATIONS: ConstellationData[] = [
  {
    id: 'orion',
    name: 'Orion',
    latinName: 'Orion',
    description: 'The Hunter - One of the most recognizable constellations in the night sky.',
    centerX: 800,
    centerY: 600,
    radius: 200,
    discovered: false,
    stars: [
      { id: 'betelgeuse', x: 700, y: 450, brightness: 1.0 },    // Left shoulder
      { id: 'bellatrix', x: 900, y: 470, brightness: 0.85 },    // Right shoulder
      { id: 'alnitak', x: 770, y: 600, brightness: 0.8 },       // Belt left
      { id: 'alnilam', x: 800, y: 590, brightness: 0.85 },      // Belt center
      { id: 'mintaka', x: 830, y: 580, brightness: 0.8 },       // Belt right
      { id: 'saiph', x: 720, y: 750, brightness: 0.75 },        // Left foot
      { id: 'rigel', x: 880, y: 770, brightness: 0.95 },        // Right foot
    ],
    connections: [
      [0, 1],  // Shoulders
      [0, 2],  // Left shoulder to belt
      [1, 4],  // Right shoulder to belt
      [2, 3],  // Belt
      [3, 4],  // Belt
      [2, 5],  // Belt to left foot
      [4, 6],  // Belt to right foot
    ]
  },
  {
    id: 'ursa-major',
    name: 'Ursa Major',
    latinName: 'Ursa Major',
    description: 'The Great Bear - Contains the famous Big Dipper asterism.',
    centerX: 1800,
    centerY: 400,
    radius: 180,
    discovered: false,
    stars: [
      { id: 'dubhe', x: 1650, y: 320, brightness: 0.9 },
      { id: 'merak', x: 1680, y: 420, brightness: 0.85 },
      { id: 'phecda', x: 1780, y: 450, brightness: 0.8 },
      { id: 'megrez', x: 1820, y: 380, brightness: 0.7 },
      { id: 'alioth', x: 1900, y: 360, brightness: 0.85 },
      { id: 'mizar', x: 1970, y: 340, brightness: 0.9 },
      { id: 'alkaid', x: 2050, y: 380, brightness: 0.88 },
    ],
    connections: [
      [0, 1],  // Bowl front
      [1, 2],  // Bowl bottom
      [2, 3],  // Bowl back
      [3, 0],  // Bowl top
      [3, 4],  // Handle start
      [4, 5],  // Handle middle
      [5, 6],  // Handle end
    ]
  },
  {
    id: 'cassiopeia',
    name: 'Cassiopeia',
    latinName: 'Cassiopeia',
    description: 'The Queen - Easily recognized by its distinctive W shape.',
    centerX: 2800,
    centerY: 300,
    radius: 140,
    discovered: false,
    stars: [
      { id: 'schedar', x: 2650, y: 280, brightness: 0.9 },
      { id: 'caph', x: 2720, y: 350, brightness: 0.85 },
      { id: 'gamma-cas', x: 2800, y: 260, brightness: 0.95 },
      { id: 'ruchbah', x: 2880, y: 340, brightness: 0.8 },
      { id: 'segin', x: 2950, y: 290, brightness: 0.75 },
    ],
    connections: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ]
  },
  {
    id: 'cygnus',
    name: 'Cygnus',
    latinName: 'Cygnus',
    description: 'The Swan - Also known as the Northern Cross.',
    centerX: 1200,
    centerY: 1200,
    radius: 160,
    discovered: false,
    stars: [
      { id: 'deneb', x: 1200, y: 1050, brightness: 1.0 },       // Tail
      { id: 'sadr', x: 1200, y: 1180, brightness: 0.85 },       // Center
      { id: 'gienah', x: 1100, y: 1220, brightness: 0.75 },     // Left wing
      { id: 'delta-cyg', x: 1300, y: 1230, brightness: 0.78 },  // Right wing
      { id: 'albireo', x: 1200, y: 1350, brightness: 0.8 },     // Head
    ],
    connections: [
      [0, 1],  // Body
      [1, 4],  // Body to head
      [1, 2],  // Left wing
      [1, 3],  // Right wing
    ]
  },
  {
    id: 'lyra',
    name: 'Lyra',
    latinName: 'Lyra',
    description: 'The Lyre - Home to Vega, one of the brightest stars.',
    centerX: 2400,
    centerY: 900,
    radius: 100,
    discovered: false,
    stars: [
      { id: 'vega', x: 2400, y: 820, brightness: 1.0 },
      { id: 'sulafat', x: 2380, y: 920, brightness: 0.7 },
      { id: 'sheliak', x: 2420, y: 930, brightness: 0.72 },
      { id: 'delta-lyr', x: 2360, y: 990, brightness: 0.65 },
      { id: 'zeta-lyr', x: 2440, y: 980, brightness: 0.68 },
    ],
    connections: [
      [0, 1],
      [0, 2],
      [1, 2],
      [1, 3],
      [2, 4],
      [3, 4],
    ]
  },
  {
    id: 'scorpius',
    name: 'Scorpius',
    latinName: 'Scorpius',
    description: 'The Scorpion - Features the red supergiant Antares.',
    centerX: 3200,
    centerY: 1400,
    radius: 200,
    discovered: false,
    stars: [
      { id: 'antares', x: 3100, y: 1300, brightness: 1.0 },     // Heart
      { id: 'graffias', x: 3000, y: 1200, brightness: 0.75 },   // Claw
      { id: 'dschubba', x: 3050, y: 1250, brightness: 0.8 },    // Head
      { id: 'sigma-sco', x: 3150, y: 1380, brightness: 0.7 },   // Body
      { id: 'tau-sco', x: 3200, y: 1450, brightness: 0.72 },    // Tail
      { id: 'sargas', x: 3280, y: 1520, brightness: 0.78 },     // Tail
      { id: 'shaula', x: 3350, y: 1580, brightness: 0.85 },     // Stinger
    ],
    connections: [
      [1, 2],  // Claw to head
      [2, 0],  // Head to heart
      [0, 3],  // Heart to body
      [3, 4],  // Body to tail
      [4, 5],  // Tail
      [5, 6],  // To stinger
    ]
  },
];

/**
 * Get a constellation by ID
 */
export function getConstellation(id: string): ConstellationData | undefined {
  return CONSTELLATIONS.find(c => c.id === id);
}

/**
 * Get all undiscovered constellations
 */
export function getUndiscoveredConstellations(): ConstellationData[] {
  return CONSTELLATIONS.filter(c => !c.discovered);
}

/**
 * Get all discovered constellations
 */
export function getDiscoveredConstellations(): ConstellationData[] {
  return CONSTELLATIONS.filter(c => c.discovered);
}
