import type { Observatory } from './types';

export interface ClusterData {
  id: string;
  name: string;
  x: number;
  y: number;
  starCount: number;
  radius: number;
  color: string; // Base color of stars in cluster
  observatory: Observatory;
}

export const CLUSTERS: ClusterData[] = [
  {
    id: 'pleiades',
    name: 'The Pleiades (M45)',
    x: 950,
    y: 1150,
    starCount: 50,
    radius: 48,  // 80 * 0.6
    color: '#A0C0FF', // Blue-white stars
    observatory: 'northern',
  },

  // NORTHERN SKY CLUSTERS
  {
    id: 'hyades',
    name: 'Hyades',
    x: 1100, // Taurus - forms the bull's face
    y: 1300,
    starCount: 40,
    radius: 60,  // 100 * 0.6
    color: '#FFD0A0', // Orange giants (aged cluster)
    observatory: 'northern',
  },

  {
    id: 'beehive',
    name: 'Beehive Cluster (M44)',
    x: 2100, // Cancer
    y: 1400,
    starCount: 60,
    radius: 42,  // 70 * 0.6
    color: '#FFFFFF', // Mixed ages, white stars
    observatory: 'northern',
  },

  {
    id: 'double_cluster',
    name: 'Double Cluster (NGC 869/884)',
    x: 650, // Perseus - actually two clusters positioned close
    y: 950,
    starCount: 70,
    radius: 36,  // 60 * 0.6
    color: '#B0D0FF', // Young blue stars
    observatory: 'northern',
  },

  // SOUTHERN SKY CLUSTERS
  {
    id: 'jewel_box',
    name: 'Jewel Box (NGC 4755)',
    x: 3300, // Crux (Southern Cross)
    y: 2100,
    starCount: 50,
    radius: 30,  // 50 * 0.6
    color: '#FFA0C0', // Colorful mix with slight red tint
    observatory: 'southern',
  },

  {
    id: '47_tucanae',
    name: '47 Tucanae (NGC 104)',
    x: 550, // Tucana (southern sky)
    y: 2300,
    starCount: 120,
    radius: 54,  // 90 * 0.6
    color: '#FFFFB0', // Ancient yellow stars, very dense globular
    observatory: 'southern',
  },

  {
    id: 'omega_centauri',
    name: 'Omega Centauri (NGC 5139)',
    x: 3500, // Centaurus
    y: 2000,
    starCount: 150,
    radius: 66,  // 110 * 0.6
    color: '#FFFFE0', // Largest globular, very dense core
    observatory: 'southern',
  }
];

export function getClustersByObservatory(observatory: Observatory): ClusterData[] {
  return CLUSTERS.filter(c => c.observatory === observatory);
}
