# Seeing Stars

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000?logo=bun&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)
[![Deploy](https://img.shields.io/badge/Play%20Now-Vercel-black?logo=vercel)](https://first-light.vercel.app)

*A meditative journey through the celestial sphere*

Step into the shoes of a 19th-century astronomer. Peer through the brass eyepiece of an antique telescope, sweep across the endless night sky, and chart the heavens one constellation at a time.

## The Experience

Guide your telescope across a vast star field spanning both hemispheres. When starlight catches your lens just right, hold steady—watch as ancient patterns reveal themselves, lines tracing between stars to the sound of crystalline chimes. Log each discovery in your field notes and unlock the tools of a master observer.

## Features

**Discovery**
- 88 constellations from the IAU catalog, organized into thematic sets
- Deep sky objects: nebulae, star clusters, and distant galaxies
- Pattern-matching challenges after each find

**The Telescope**
- Three interchangeable lenses: Standard, Wide Field, and Deep Field
- Realistic drift and momentum as you pan across the sky
- Circular viewport with authentic vignette and chromatic aberration

**Progression**
- Complete constellation sets to unlock telescope upgrades
- Switch between Northern and Southern observatories
- Track your discoveries in a leather-bound field journal

**Atmosphere**
- Victorian observatory aesthetic with brass fixtures and aged parchment
- Procedural ambient soundscape—no audio files, all synthesized
- Animated reveals as constellation lines trace between stars

## How to Play

1. Move your cursor to guide the telescope
2. Explore—stars will pulse when you're near something undiscovered
3. Hold steady over a constellation until the discovery triggers
4. Watch the reveal animation and complete the pattern challenge
5. Check your Field Notes to track progress

## Controls

| Input | Action |
|-------|--------|
| Mouse | Pan telescope |
| 1 / 2 / 3 | Switch lens |
| ← / → | Change observatory |
| Tab | Toggle field notes |

## Getting Started

Requires [Bun](https://bun.sh).

```bash
bun install
bun run dev     # Watch for changes
bun run serve   # Start dev server at localhost:3000
```

## Tech

- TypeScript + HTML5 Canvas
- Web Audio API (procedural synthesis)
- Bun runtime

## License

MIT
