/**
 * Constellation Data Conversion Script
 * 
 * Converts d3-celestial constellation lines data to our game format.
 * Run with: bun run scripts/convert-constellations.ts
 */

// Constellation full names mapping (3-letter codes to full names)
const CONSTELLATION_NAMES: Record<string, { name: string; latinName: string; description: string }> = {
  And: { name: 'Andromeda', latinName: 'Andromeda', description: 'The Chained Princess - Home to the Andromeda Galaxy, our nearest major galaxy.' },
  Ant: { name: 'Antlia', latinName: 'Antlia', description: 'The Air Pump - A faint southern constellation representing a vacuum pump.' },
  Aps: { name: 'Apus', latinName: 'Apus', description: 'The Bird of Paradise - A southern constellation near the celestial pole.' },
  Aqr: { name: 'Aquarius', latinName: 'Aquarius', description: 'The Water Bearer - A zodiac constellation associated with water.' },
  Aql: { name: 'Aquila', latinName: 'Aquila', description: 'The Eagle - Contains Altair, one of the Summer Triangle stars.' },
  Ara: { name: 'Ara', latinName: 'Ara', description: 'The Altar - A southern constellation representing a ceremonial altar.' },
  Ari: { name: 'Aries', latinName: 'Aries', description: 'The Ram - A zodiac constellation marking the spring equinox.' },
  Aur: { name: 'Auriga', latinName: 'Auriga', description: 'The Charioteer - Contains bright Capella, the sixth-brightest star.' },
  Boo: { name: 'Boötes', latinName: 'Boötes', description: 'The Herdsman - Contains Arcturus, the fourth-brightest star in the sky.' },
  Cae: { name: 'Caelum', latinName: 'Caelum', description: 'The Chisel - One of the faintest constellations in the sky.' },
  Cam: { name: 'Camelopardalis', latinName: 'Camelopardalis', description: 'The Giraffe - A large but faint northern constellation.' },
  Cnc: { name: 'Cancer', latinName: 'Cancer', description: 'The Crab - A zodiac constellation containing the Beehive Cluster.' },
  CVn: { name: 'Canes Venatici', latinName: 'Canes Venatici', description: 'The Hunting Dogs - Contains the beautiful Whirlpool Galaxy.' },
  CMa: { name: 'Canis Major', latinName: 'Canis Major', description: 'The Great Dog - Contains Sirius, the brightest star in the night sky.' },
  CMi: { name: 'Canis Minor', latinName: 'Canis Minor', description: 'The Little Dog - Contains Procyon, the eighth-brightest star.' },
  Cap: { name: 'Capricornus', latinName: 'Capricornus', description: 'The Sea Goat - An ancient zodiac constellation.' },
  Car: { name: 'Carina', latinName: 'Carina', description: 'The Keel - Part of the ancient ship Argo Navis, contains Canopus.' },
  Cas: { name: 'Cassiopeia', latinName: 'Cassiopeia', description: 'The Queen - Famous W-shaped constellation circling the North Pole.' },
  Cen: { name: 'Centaurus', latinName: 'Centaurus', description: 'The Centaur - Contains Alpha Centauri, the closest star system to Earth.' },
  Cep: { name: 'Cepheus', latinName: 'Cepheus', description: 'The King - A circumpolar constellation, husband of Cassiopeia.' },
  Cet: { name: 'Cetus', latinName: 'Cetus', description: 'The Sea Monster - A large constellation containing the variable star Mira.' },
  Cha: { name: 'Chamaeleon', latinName: 'Chamaeleon', description: 'The Chameleon - A small far-southern constellation.' },
  Cir: { name: 'Circinus', latinName: 'Circinus', description: 'The Compass - A small southern constellation near Centaurus.' },
  Col: { name: 'Columba', latinName: 'Columba', description: 'The Dove - Represents the dove that followed Noah\'s Ark.' },
  Com: { name: 'Coma Berenices', latinName: 'Coma Berenices', description: 'Berenice\'s Hair - Named after an Egyptian queen\'s sacrifice.' },
  CrA: { name: 'Corona Australis', latinName: 'Corona Australis', description: 'The Southern Crown - A small arc-shaped southern constellation.' },
  CrB: { name: 'Corona Borealis', latinName: 'Corona Borealis', description: 'The Northern Crown - A distinctive semicircular constellation.' },
  Crv: { name: 'Corvus', latinName: 'Corvus', description: 'The Crow - A small constellation known since ancient times.' },
  Crt: { name: 'Crater', latinName: 'Crater', description: 'The Cup - Represents a chalice in Greek mythology.' },
  Cru: { name: 'Crux', latinName: 'Crux', description: 'The Southern Cross - The smallest constellation but most famous southern one.' },
  Cyg: { name: 'Cygnus', latinName: 'Cygnus', description: 'The Swan - Contains Deneb and the Northern Cross asterism.' },
  Del: { name: 'Delphinus', latinName: 'Delphinus', description: 'The Dolphin - A small but distinctive constellation.' },
  Dor: { name: 'Dorado', latinName: 'Dorado', description: 'The Swordfish - Contains the Large Magellanic Cloud.' },
  Dra: { name: 'Draco', latinName: 'Draco', description: 'The Dragon - Winds around the north celestial pole.' },
  Equ: { name: 'Equuleus', latinName: 'Equuleus', description: 'The Little Horse - The second-smallest constellation.' },
  Eri: { name: 'Eridanus', latinName: 'Eridanus', description: 'The River - A long winding constellation representing a river.' },
  For: { name: 'Fornax', latinName: 'Fornax', description: 'The Furnace - Contains the Fornax Cluster of galaxies.' },
  Gem: { name: 'Gemini', latinName: 'Gemini', description: 'The Twins - A zodiac constellation with bright Castor and Pollux.' },
  Gru: { name: 'Grus', latinName: 'Grus', description: 'The Crane - A graceful bird constellation in the southern sky.' },
  Her: { name: 'Hercules', latinName: 'Hercules', description: 'The Hero - The fifth-largest constellation, containing M13.' },
  Hor: { name: 'Horologium', latinName: 'Horologium', description: 'The Pendulum Clock - A faint southern constellation.' },
  Hya: { name: 'Hydra', latinName: 'Hydra', description: 'The Water Snake - The largest of all 88 constellations.' },
  Hyi: { name: 'Hydrus', latinName: 'Hydrus', description: 'The Lesser Water Snake - A southern constellation near the pole.' },
  Ind: { name: 'Indus', latinName: 'Indus', description: 'The Indian - A southern constellation with no bright stars.' },
  Lac: { name: 'Lacerta', latinName: 'Lacerta', description: 'The Lizard - A small constellation between Cygnus and Andromeda.' },
  Leo: { name: 'Leo', latinName: 'Leo', description: 'The Lion - A zodiac constellation with bright Regulus.' },
  LMi: { name: 'Leo Minor', latinName: 'Leo Minor', description: 'The Little Lion - A small constellation between Leo and Ursa Major.' },
  Lep: { name: 'Lepus', latinName: 'Lepus', description: 'The Hare - Sits at Orion\'s feet in the winter sky.' },
  Lib: { name: 'Libra', latinName: 'Libra', description: 'The Scales - The only zodiac constellation representing an object.' },
  Lup: { name: 'Lupus', latinName: 'Lupus', description: 'The Wolf - An ancient constellation near Centaurus.' },
  Lyn: { name: 'Lynx', latinName: 'Lynx', description: 'The Lynx - A faint constellation requiring keen eyes to see.' },
  Lyr: { name: 'Lyra', latinName: 'Lyra', description: 'The Lyre - Contains Vega, the fifth-brightest star.' },
  Men: { name: 'Mensa', latinName: 'Mensa', description: 'The Table Mountain - The faintest named constellation.' },
  Mic: { name: 'Microscopium', latinName: 'Microscopium', description: 'The Microscope - A faint southern constellation.' },
  Mon: { name: 'Monoceros', latinName: 'Monoceros', description: 'The Unicorn - Located on the celestial equator.' },
  Mus: { name: 'Musca', latinName: 'Musca', description: 'The Fly - A small constellation near the Southern Cross.' },
  Nor: { name: 'Norma', latinName: 'Norma', description: 'The Carpenter\'s Square - A small southern constellation.' },
  Oct: { name: 'Octans', latinName: 'Octans', description: 'The Octant - Contains the south celestial pole.' },
  Oph: { name: 'Ophiuchus', latinName: 'Ophiuchus', description: 'The Serpent Bearer - A large constellation on the celestial equator.' },
  Ori: { name: 'Orion', latinName: 'Orion', description: 'The Hunter - The most recognizable constellation in the sky.' },
  Pav: { name: 'Pavo', latinName: 'Pavo', description: 'The Peacock - A southern constellation with a bright alpha star.' },
  Peg: { name: 'Pegasus', latinName: 'Pegasus', description: 'The Winged Horse - Famous for its Great Square asterism.' },
  Per: { name: 'Perseus', latinName: 'Perseus', description: 'The Hero - Contains the famous variable star Algol.' },
  Phe: { name: 'Phoenix', latinName: 'Phoenix', description: 'The Phoenix - A southern constellation representing the mythical bird.' },
  Pic: { name: 'Pictor', latinName: 'Pictor', description: 'The Painter\'s Easel - A faint southern constellation.' },
  Psc: { name: 'Pisces', latinName: 'Pisces', description: 'The Fishes - A zodiac constellation with the spring equinox point.' },
  PsA: { name: 'Piscis Austrinus', latinName: 'Piscis Austrinus', description: 'The Southern Fish - Contains bright Fomalhaut.' },
  Pup: { name: 'Puppis', latinName: 'Puppis', description: 'The Stern - Part of the ancient ship Argo Navis.' },
  Pyx: { name: 'Pyxis', latinName: 'Pyxis', description: 'The Compass - Represents a ship\'s compass.' },
  Ret: { name: 'Reticulum', latinName: 'Reticulum', description: 'The Reticle - A small southern constellation.' },
  Sge: { name: 'Sagitta', latinName: 'Sagitta', description: 'The Arrow - The third-smallest constellation.' },
  Sgr: { name: 'Sagittarius', latinName: 'Sagittarius', description: 'The Archer - Points toward the galactic center.' },
  Sco: { name: 'Scorpius', latinName: 'Scorpius', description: 'The Scorpion - A striking zodiac constellation with red Antares.' },
  Scl: { name: 'Sculptor', latinName: 'Sculptor', description: 'The Sculptor - Contains the south galactic pole.' },
  Sct: { name: 'Scutum', latinName: 'Scutum', description: 'The Shield - A small but distinctive constellation.' },
  Ser: { name: 'Serpens', latinName: 'Serpens', description: 'The Serpent - The only constellation split into two parts.' },
  Sex: { name: 'Sextans', latinName: 'Sextans', description: 'The Sextant - A faint equatorial constellation.' },
  Tau: { name: 'Taurus', latinName: 'Taurus', description: 'The Bull - A zodiac constellation with the Pleiades and Hyades.' },
  Tel: { name: 'Telescopium', latinName: 'Telescopium', description: 'The Telescope - A small southern constellation.' },
  Tri: { name: 'Triangulum', latinName: 'Triangulum', description: 'The Triangle - A small northern constellation.' },
  TrA: { name: 'Triangulum Australe', latinName: 'Triangulum Australe', description: 'The Southern Triangle - A distinctive southern constellation.' },
  Tuc: { name: 'Tucana', latinName: 'Tucana', description: 'The Toucan - Contains the Small Magellanic Cloud.' },
  UMa: { name: 'Ursa Major', latinName: 'Ursa Major', description: 'The Great Bear - Contains the famous Big Dipper asterism.' },
  UMi: { name: 'Ursa Minor', latinName: 'Ursa Minor', description: 'The Little Bear - Contains Polaris, the North Star.' },
  Vel: { name: 'Vela', latinName: 'Vela', description: 'The Sails - Part of the ancient ship Argo Navis.' },
  Vir: { name: 'Virgo', latinName: 'Virgo', description: 'The Maiden - The second-largest constellation with bright Spica.' },
  Vol: { name: 'Volans', latinName: 'Volans', description: 'The Flying Fish - A small southern constellation.' },
  Vul: { name: 'Vulpecula', latinName: 'Vulpecula', description: 'The Fox - A faint northern constellation.' },
};

// d3-celestial uses degrees with RA as longitude (-180 to 180) and Dec as latitude (-90 to 90)
// We need to convert to our sky coordinate system (0 to SKY_WIDTH, 0 to SKY_HEIGHT)
const SKY_WIDTH = 6000;
const SKY_HEIGHT = 3000;

interface GeoJSONFeature {
  type: string;
  id: string;
  properties: { rank: string };
  geometry: {
    type: string;
    coordinates: number[][][];
  };
}

interface ConstellationData {
  id: string;
  name: string;
  latinName: string;
  description: string;
  centerX: number;
  centerY: number;
  radius: number;
  discovered: boolean;
  observatory: 'northern' | 'southern';
  stars: { id: string; x: number; y: number; brightness: number }[];
  connections: [number, number][];
}

// Convert RA/Dec to screen coordinates
// RA: -180 to 180 degrees (or 0 to 360) -> 0 to SKY_WIDTH
// Dec: -90 to 90 degrees -> SKY_HEIGHT to 0 (inverted for screen coords)
function convertCoords(ra: number, dec: number): { x: number; y: number } {
  // Normalize RA to 0-360 range
  let raNorm = ra;
  if (raNorm < 0) raNorm += 360;

  // Map to sky coordinates
  const x = (raNorm / 360) * SKY_WIDTH;
  const y = ((90 - dec) / 180) * SKY_HEIGHT;

  return { x: Math.round(x), y: Math.round(y) };
}

// Determine hemisphere based on average declination
function getObservatory(avgDec: number): 'northern' | 'southern' {
  return avgDec >= 0 ? 'northern' : 'southern';
}

async function main() {
  // Fetch the constellation data
  const response = await fetch('https://raw.githubusercontent.com/ofrohn/d3-celestial/master/data/constellations.lines.json');
  const data = await response.json() as { features: GeoJSONFeature[] };

  const constellations: ConstellationData[] = [];
  const idCounts = new Map<string, number>(); // Track duplicate IDs (e.g., Serpens has 2 parts)

  for (const feature of data.features) {
    const code = feature.id;
    const meta = CONSTELLATION_NAMES[code];

    if (!meta) {
      console.warn(`Unknown constellation code: ${code}`);
      continue;
    }

    // Handle duplicate IDs (e.g., Serpens Caput and Serpens Cauda both have "Ser")
    const baseId = code.toLowerCase();
    const count = idCounts.get(baseId) || 0;
    idCounts.set(baseId, count + 1);
    const finalId = count > 0 ? `${baseId}-${count + 1}` : baseId;

    // Collect all unique points across all line segments
    const points: { x: number; y: number; ra: number; dec: number }[] = [];
    const pointMap = new Map<string, number>(); // "x,y" -> index

    // Build connections from line segments
    const connections: [number, number][] = [];

    for (const lineSegment of feature.geometry.coordinates) {
      let prevIndex: number | null = null;

      for (const [ra, dec] of lineSegment) {
        const { x, y } = convertCoords(ra, dec);
        const key = `${x},${y}`;

        let index: number;
        if (pointMap.has(key)) {
          index = pointMap.get(key)!;
        } else {
          index = points.length;
          pointMap.set(key, index);
          points.push({ x, y, ra, dec });
        }

        if (prevIndex !== null && prevIndex !== index) {
          connections.push([prevIndex, index]);
        }
        prevIndex = index;
      }
    }

    if (points.length === 0) continue;

    // Fix wrap-around: if constellation spans more than half the sky,
    // it's crossing the RA=0 boundary. Shift all points > SKY_WIDTH/2 to negative
    const xs = points.map(p => p.x);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);

    if (maxX - minX > SKY_WIDTH / 2) {
      // This constellation wraps around - shift high-X points to be negative
      for (const point of points) {
        if (point.x > SKY_WIDTH / 2) {
          point.x = point.x - SKY_WIDTH;
        }
      }
    }

    // Calculate center and radius (after wrap-fix)
    const adjustedXs = points.map(p => p.x);
    const ys = points.map(p => p.y);
    const rawCenterX = adjustedXs.reduce((a, b) => a + b, 0) / adjustedXs.length;
    const centerY = Math.round(ys.reduce((a, b) => a + b, 0) / ys.length);

    // Shift everything back to positive coordinates if center is negative
    let offsetX = 0;
    if (rawCenterX < 300) {
      // Shift the whole constellation right to be visible
      offsetX = 500 - Math.round(rawCenterX);
      for (const point of points) {
        point.x += offsetX;
      }
    }

    const finalXs = points.map(p => p.x);
    const centerX = Math.round(finalXs.reduce((a, b) => a + b, 0) / finalXs.length);

    const maxDist = Math.max(...points.map(p =>
      Math.sqrt((p.x - centerX) ** 2 + (p.y - centerY) ** 2)
    ));
    const radius = Math.round(maxDist * 1.2); // Add 20% padding

    // Determine hemisphere based on average declination
    const avgDec = points.reduce((sum, p) => sum + p.dec, 0) / points.length;
    const observatory = getObservatory(avgDec);

    // Create star entries
    const stars = points.map((p, i) => ({
      id: `${finalId}-${i}`,
      x: p.x,
      y: p.y,
      brightness: 0.8 + Math.random() * 0.2, // Random brightness 0.8-1.0
    }));

    constellations.push({
      id: finalId,
      name: meta.name,
      latinName: meta.latinName,
      description: meta.description,
      centerX,
      centerY,
      radius: Math.min(Math.max(radius, 50), 150), // Min 50, max 150 for tight detection
      discovered: false,
      observatory,
      stars,
      connections,
    });
  }

  // Sort: Northern first, then Southern, alphabetically within each
  constellations.sort((a, b) => {
    if (a.observatory !== b.observatory) {
      return a.observatory === 'northern' ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });

  // Generate TypeScript output
  const output = `// AUTO-GENERATED FILE - Do not edit directly
// Generated from d3-celestial constellation data
// Source: https://github.com/ofrohn/d3-celestial

import type { ConstellationData, Observatory } from './types';

export const SKY_WIDTH = ${SKY_WIDTH};
export const SKY_HEIGHT = ${SKY_HEIGHT};

export type { Observatory };
export type { ConstellationData };

export const OBSERVATORIES: Record<Observatory, { id: Observatory; name: string; location: string; description: string }> = {
  northern: {
    id: 'northern',
    name: 'Alpine Observatory',
    location: 'Swiss Alps, 46°N',
    description: 'A historic mountain observatory with crisp, clear skies perfect for viewing northern constellations.',
  },
  southern: {
    id: 'southern',
    name: 'Atacama Observatory',
    location: 'Chile, 24°S',
    description: 'One of the driest places on Earth, offering unparalleled views of the southern celestial hemisphere.',
  },
};

export const CONSTELLATIONS: ConstellationData[] = ${JSON.stringify(constellations, null, 2)};

export function getConstellation(id: string): ConstellationData | undefined {
  return CONSTELLATIONS.find(c => c.id === id);
}

export function getUndiscoveredConstellations(): ConstellationData[] {
  return CONSTELLATIONS.filter(c => !c.discovered);
}

export function getDiscoveredConstellations(): ConstellationData[] {
  return CONSTELLATIONS.filter(c => c.discovered);
}

export function getConstellationsByObservatory(observatory: Observatory): ConstellationData[] {
  return CONSTELLATIONS.filter(c => c.observatory === observatory);
}
`;

  // Count results
  const northern = constellations.filter(c => c.observatory === 'northern').length;
  const southern = constellations.filter(c => c.observatory === 'southern').length;

  console.log(`Generated ${constellations.length} constellations:`);
  console.log(`  Northern: ${northern}`);
  console.log(`  Southern: ${southern}`);

  // Write output file
  await Bun.write('src/data/constellations-generated.ts', output);
  console.log('Written to src/data/constellations-generated.ts');
}

main().catch(console.error);
