# Seeing Stars 🔭✨

An atmospheric browser-based exploration game where you peer through an antique telescope to discover constellations in a vast night sky.

## Features

- **Telescope Viewport**: A magnified circular view that follows your cursor with realistic drift/lag
- **Constellation Discovery**: Hover over celestial patterns to reveal and collect them
- **Animated Reveals**: Watch as constellation lines trace between stars with sound effects
- **Discoveries Collection**: A Pokédex-style panel to track your found constellations
- **Atmospheric Audio**: Ambient soundscape with discovery chimes

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) runtime installed

### Installation

```bash
# Install dependencies
bun install

# Start development (builds and watches for changes + serves)
bun run dev
# In another terminal:
bun run serve

# Or build and run in one command:
bun run start
```

Then open http://localhost:3000 in your browser.

## How to Play

1. Move your cursor to control the telescope
2. Explore the night sky by sweeping the telescope around
3. When you hover over a hidden constellation, you'll see stars begin to pulse
4. Keep the telescope over the constellation to discover it
5. Watch the beautiful reveal animation as paths trace between stars
6. Collect all 6 constellations!

## Tech Stack

- **Runtime**: Bun
- **Language**: TypeScript
- **Rendering**: HTML5 Canvas
- **Audio**: Web Audio API (procedural sound generation)
- **Styling**: Vanilla CSS with custom properties

## Project Structure

```
seeing-stars/
├── src/
│   ├── main.ts              # Entry point
│   ├── game/
│   │   ├── Game.ts          # Main game loop & state
│   │   ├── Telescope.ts     # Telescope viewport
│   │   ├── StarField.ts     # Star rendering
│   │   └── Constellation.ts # Constellation logic
│   ├── ui/
│   │   └── DiscoveriesTab.ts
│   ├── audio/
│   │   └── AudioManager.ts
│   └── data/
│       └── constellations.ts
├── public/
│   ├── index.html
│   └── styles.css
└── package.json
```

## Constellations to Discover

- 🏹 **Orion** - The Hunter
- 🐻 **Ursa Major** - The Great Bear  
- 👑 **Cassiopeia** - The Queen
- 🦢 **Cygnus** - The Swan
- 🎵 **Lyra** - The Lyre
- 🦂 **Scorpius** - The Scorpion

## License

MIT
