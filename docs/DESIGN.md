# Seeing Stars — Game Design Document

> **Document Version:** 2.0  
> **Last Updated:** 2025-12-24

## Overview

**Seeing Stars** is an atmospheric, browser-based exploration game where players peer through an antique telescope to discover constellations in a vast night sky. The experience blends the wonder of astronomical discovery with collectible mechanics, wrapped in a mysterious, contemplative aesthetic.

### Inspirations
- **Myst** — Mysterious atmosphere, discovery through exploration
- **Civilization VI** — Fog-of-war revelation, strategic discovery
- **The Outer Wilds** — Cosmic wonder, player-driven exploration
- **Pokémon** — Collection mechanics, Pokédex-style catalog

---

## Current Implementation Status

### ✅ Implemented (v1.0)

| Feature | Status | Notes |
|---------|--------|-------|
| Telescope viewport | ✅ Complete | Fixed at screen center, mouse controls view panning |
| Drift/parallax effect | ✅ Complete | Smooth lag effect (0.06 factor) creates weighted feel |
| Star field rendering | ✅ Complete | Multi-layer stars with varying sizes/brightness |
| Parallax background | ✅ Complete | Background moves at different rate than foreground |
| Constellation discovery | ✅ Complete | Hover 2 seconds to trigger discovery |
| Path-tracing animation | ✅ Complete | Sequential star-to-star line drawing |
| Star flash effects | ✅ Complete | Stars pulse when activated during discovery |
| Cosmic flash effect | ✅ Complete | Radial shockwave + glow on completion |
| Procedural audio | ✅ Complete | Web Audio API, no external files needed |
| Connection chimes | ✅ Complete | Ascending tones as each star connects |
| Completion sound | ✅ Complete | Resonant chord sequence |
| Ambient drone | ✅ Complete | Ethereal background atmosphere |
| Discoveries tab | ✅ Complete | Collapsible panel showing found constellations |
| Click to Start | ✅ Complete | Handles browser audio autoplay policy |
| Discovery notifications | ✅ Complete | Toast popup when constellation found |

### 🚧 Planned (Future)

| Feature | Priority | Notes |
|---------|----------|-------|
| "Rip loose" collection animation | Medium | Paper-tear effect into discoveries tab |
| Detailed constellation lore | Low | Descriptions, mythology, star facts |
| Mobile/touch support | Medium | Drag to pan instead of mouse |
| Persistence (localStorage) | Medium | Remember discovered constellations |
| Additional celestial objects | Low | Nebulae, planets, shooting stars |
| Achievements system | Low | Milestones for discoveries |
| Hint system | Low | Guide players to undiscovered areas |

---

## Core Experience

### The Telescope Viewport

The player views the night sky through a circular telescope lens that stays **fixed at screen center**. Mouse movement controls the **view panning** with a subtle drift/lag effect—evoking the weight and inertia of an antique brass instrument.

- **Lens size:** 42.5% of the smaller screen dimension
- **Drift factor:** 0.06 (lower = more lag/weight)
- **Pan range:** Unlimited within sky bounds (4000×2000 virtual units)

### Visual Style

| Element | Current Implementation |
|---------|----------------------|
| Background | Deep dark via CSS gradient |
| Outside lens | Faint, dim stars visible at reduced opacity |
| Inside lens | Full brightness star field with parallax |
| Stars | Circles with radial gradient glow |
| Connections | Yellow-gold lines (#FFD93D) |
| Telescope rim | CSS border with subtle shadow |
| Constellation flash | Radial shockwave + central glow |

---

## Constellation Discovery Mechanic

### How It Works

1. Player moves mouse to pan the telescope view across the sky
2. When the view center is within a constellation's detection radius, a discovery timer begins
3. Stars in the constellation subtly pulse to hint at their connection
4. After **2 seconds** of hover, the discovery animation triggers:
   - A path traces between stars **sequentially**
   - Each star connection triggers an ascending chime
   - Stars flash/pulse when reached by the animation
   - Upon completion, the entire constellation **flashes** with a cosmic shockwave
   - A completion sound (ascending chord) plays
5. Constellation settles into its discovered visual state (permanently visible)

### Animation Timing

- **Total animation duration:** ~3.0 seconds
- **Star flash duration:** 0.5 seconds per star
- **Cosmic flash duration:** 1.2 seconds (post-completion)

---

## Constellations

### Current Roster (6 Constellations)

| Name | Stars | Description |
|------|-------|-------------|
| **Orion** | 7 | The Hunter - Most recognizable constellation |
| **Ursa Major** | 7 | The Great Bear - Contains the Big Dipper |
| **Cassiopeia** | 5 | The Queen - Distinctive W shape |
| **Cygnus** | 5 | The Swan - Also known as Northern Cross |
| **Lyra** | 5 | The Lyre - Home to bright star Vega |
| **Scorpius** | 7 | The Scorpion - Features red Antares |

### Sky Layout

- **Sky dimensions:** 4000 × 2000 virtual units
- **Constellation positions:** Spread across the sky with artistic spacing
- **Detection radius:** 100-200 units per constellation

---

## Audio Design

### Procedural Audio (Web Audio API)

All sounds are generated procedurally—no external audio files required.

| Sound | Implementation |
|-------|----------------|
| **Ambient drone** | Multiple sine oscillators at harmonic frequencies (55, 82.5, 110, 165 Hz) |
| **Connection chime** | Triangle wave, frequency increases with progress (400-800 Hz) |
| **Completion chord** | Ascending notes (C5, E5, G5, C6) + final resonant C5 tone |

### Audio Initialization

- Audio context created on first user interaction (browser policy)
- "Click to Start" overlay ensures audio works before gameplay begins

---

## Technical Architecture

### Stack

| Layer | Technology |
|-------|------------|
| Runtime | Bun |
| Language | TypeScript |
| Rendering | HTML5 Canvas (2D context) |
| Build | Bun's built-in bundler with watch mode |
| Audio | Web Audio API (procedural) |
| Version Control | Git |

### Project Structure

```
seeing-stars/
├── src/
│   ├── main.ts              # Entry point, canvas setup
│   ├── game/
│   │   ├── Game.ts          # Main game loop & state
│   │   ├── Telescope.ts     # Viewport + drift effect
│   │   ├── StarField.ts     # Star rendering + parallax
│   │   └── Constellation.ts # Discovery & animation
│   ├── ui/
│   │   └── DiscoveriesTab.ts # Collection panel
│   ├── audio/
│   │   └── AudioManager.ts  # Procedural sound
│   └── data/
│       └── constellations.ts # Constellation definitions
├── public/
│   ├── index.html           # Main page + overlays
│   └── styles.css           # Styling
├── docs/
│   └── DESIGN.md            # This document
├── serve.ts                 # Development server
├── package.json
└── tsconfig.json
```

### Key Classes

| Class | Responsibility |
|-------|----------------|
| `Game` | Main loop, state management, coordinates all systems |
| `Telescope` | Fixed viewport, drift math, pan offset calculation |
| `StarField` | Background star generation, parallax rendering |
| `Constellation` | Individual constellation state, discovery animation, rendering |
| `DiscoveriesTab` | UI panel for collected constellations |
| `AudioManager` | Web Audio API, procedural sound generation |

---

## Development

### Running Locally

```bash
# Install dependencies
bun install

# Start dev server (watches for changes)
bun run dev &
bun run serve

# Open http://localhost:3000
```

### Scripts

| Command | Action |
|---------|--------|
| `bun run dev` | Build with watch mode |
| `bun run serve` | Start local server (port 3000) |
| `bun run build` | Production build (minified) |
| `bun run typecheck` | TypeScript type checking |

---

## Open Questions / Future Considerations

1. **Branching animation:** Should connections to multiple stars animate simultaneously? (Tried BFS, reverted to sequential for cleaner feel)
2. **Sky boundaries:** Currently bounded at 4000×2000. Should it wrap or have hard edges?
3. **Difficulty curve:** Should some constellations be harder to find (smaller radius, fainter stars)?
4. **Mobile adaptation:** How to handle touch panning vs mouse drift?
5. **Persistence:** localStorage vs. cloud save for discovered constellations?

---

## Changelog

### v2.0 (2025-12-24)
- Constellation discovery fully working with sequential path animation
- Cosmic flash effect on completion (shockwave + glow)
- Telescope now fixed at center; mouse controls view panning with drift
- Procedural audio (no external files)
- 6 constellations implemented
- Discoveries tab with collection UI
- Click-to-start overlay for audio policy compliance

### v1.0 (2025-12-23)
- Initial implementation
- Basic telescope following cursor
- Star field with parallax
- Discovery mechanic prototype
