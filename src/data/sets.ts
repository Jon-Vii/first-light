/**
 * Constellation Sets Configuration
 * 
 * Groups constellations into families/sets. Completing a set unlocks an upgrade.
 */

export interface ConstellationSet {
  id: string;
  name: string;
  description: string;
  upgradeId?: 'stabilizer' | 'wide_angle';
  upgradeName?: string;
  upgradeDescription?: string;
}

export const CONSTELLATION_SETS: Record<string, ConstellationSet> = {
  zodiac: {
    id: 'zodiac',
    name: 'The Zodiac',
    description: 'The twelve constellations lying along the plane of the ecliptic.',
    upgradeId: 'wide_angle',
    upgradeName: 'Wide Angle Lens',
    upgradeDescription: 'Increases the viewport field of view by 15%.'
  },
  ursa: {
    id: 'ursa',
    name: 'The Great Bears',
    description: 'The guardians of the North Pole.',
    upgradeId: 'stabilizer',
    upgradeName: 'Gyroscopic Stabilizer',
    upgradeDescription: 'Significantly reduces telescope drift and lag.'
  },
  royal: {
    id: 'royal',
    name: 'The Royal Family',
    description: 'The saga of Andromeda, bringing together Queen, King, and Hero.',
  },
  orion: {
    id: 'orion',
    name: 'The Hunter\'s Circle',
    description: 'Bright constellations surrounding the mighty Orion.',
  },
  waters: {
    id: 'waters',
    name: 'The Heavenly Waters',
    description: 'Creatures of the celestial ocean.',
  },
  argo: {
    id: 'argo',
    name: 'Argo Navis',
    description: 'The great ship of Jason and the Argonauts, now split into three parts.',
    // Reusing wide adjustment for massive ship
    upgradeId: 'wide_angle',
    upgradeName: 'Wide Angle Lens',
    upgradeDescription: 'Increases the viewport field of view by 15%.'
  },
  birds: {
    id: 'birds',
    name: 'The Southern Birds',
    description: 'Exotic birds of the southern skies, introduced by explorers.',
  },
  instruments: {
    id: 'instruments',
    name: 'La Caille\'s Instruments',
    description: 'Scientific tools and instruments comprising the modern constellations.',
    // Reusing stabilizer for precision instruments
    upgradeId: 'stabilizer',
    upgradeName: 'Gyroscopic Stabilizer',
    upgradeDescription: 'Significantly improves stability and reduces drift.'
  },
  centaur: {
    id: 'centaur',
    name: 'The Centaur\'s Family',
    description: 'Dominant constellations of the southern Milky Way.',
  }
};

// Map constellation IDs (3-letter code lowercase) to Set IDs
// Based on historical/astronomical families
export const CONSTELLATION_TO_SET: Record<string, string> = {
  // Zodiac
  'ari': 'zodiac', 'tau': 'zodiac', 'gem': 'zodiac', 'cnc': 'zodiac',
  'leo': 'zodiac', 'vir': 'zodiac', 'lib': 'zodiac', 'sco': 'zodiac',
  'sgr': 'zodiac', 'cap': 'zodiac', 'aqr': 'zodiac', 'psc': 'zodiac',

  // Ursa Family
  'uma': 'ursa', 'umi': 'ursa', 'dra': 'ursa', 'boo': 'ursa', 'cvn': 'ursa',

  // Royal Family
  'and': 'royal', 'cas': 'royal', 'cep': 'royal', 'per': 'royal', 'peg': 'royal', 'cet': 'royal',

  // Orion/Hunter
  'ori': 'orion', 'cma': 'orion', 'cmi': 'orion', 'lep': 'orion', 'mon': 'orion',

  // Heavenly Waters
  'eri': 'waters', 'psa': 'waters', 'dor': 'waters', 'vol': 'waters',
  'del': 'waters', 'equ': 'waters', 'hya': 'waters', 'hyi': 'waters',

  // Argo Navis (The Ship)
  'car': 'argo', 'pup': 'argo', 'vel': 'argo', 'pyx': 'argo', 'col': 'argo',

  // The Southern Birds (Bayer)
  'pav': 'birds', 'tuc': 'birds', 'gru': 'birds', 'phe': 'birds', 'aps': 'birds', 'cha': 'birds', 'mus': 'birds',

  // La Caille's Instruments
  'ant': 'instruments', 'cae': 'instruments', 'cir': 'instruments', 'for': 'instruments', 'hor': 'instruments',
  'men': 'instruments', 'mic': 'instruments', 'nor': 'instruments', 'oct': 'instruments', 'pic': 'instruments',
  'ret': 'instruments', 'scl': 'instruments', 'tel': 'instruments',

  // The Centaur's Neighborhood
  'cen': 'centaur', 'cru': 'centaur', 'lup': 'centaur', 'ara': 'centaur', 'tra': 'centaur', 'ind': 'centaur', 'sex': 'centaur', 'crt': 'centaur', 'crv': 'centaur'
};
