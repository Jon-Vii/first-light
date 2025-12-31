# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Seeing Stars is an atmospheric browser-based constellation discovery game. Players peer through an antique telescope viewport to explore a vast night sky and discover celestial objects (constellations, nebulae, star clusters).

## Commands

```bash
# Development - run these in separate terminals
bun run dev          # Build and watch for changes
bun run serve        # Start dev server with hot reload (port 3000)

# Or build and run together
bun run start        # Build + serve in sequence

# Testing
bun test             # Run all tests
bun test --watch     # Watch mode
bun test src/__tests__/Constellation.test.ts  # Single test file

# Type checking
bun run typecheck    # TypeScript check (no emit)

# Data generation
bun run scripts/convert-constellations.ts  # Regenerate constellation data from d3-celestial
```

## Architecture

### Game Loop (src/game/Game.ts)
Central orchestrator that manages:
- Canvas rendering with telescope viewport clipping
- View position tracking with horizontal wrap-around (infinite X scrolling, clamped Y)
- Discovery detection based on telescope proximity to celestial objects
- Observatory switching (northern/southern hemisphere views)

### Celestial Object System
All discoverable objects implement `CelestialObject` interface (src/game/CelestialObject.ts):
- `Constellation` - Star patterns with animated line-drawing reveals
- `Nebula` - Atmospheric cloud effects with layered rendering
- `StarCluster` - Dense star groupings with sparkle effects

Discovery flow: hover accumulates time → triggers discovery state → plays reveal animation → fires callbacks → updates UI.

### Telescope (src/game/Telescope.ts)
Fixed at screen center. Mouse movement pans the sky view with configurable drift/parallax lag. Supports magnification switching (1.0x standard, 0.5x wide-angle).

### Coordinate System
- Sky dimensions: 6000 x 3000 virtual pixels
- X wraps horizontally (celestial sphere simulation)
- Y is clamped (polar limits)
- Screen coordinates derived from view center + offset

### Audio (src/audio/AudioManager.ts)
All procedural using Web Audio API - no audio files. Includes ambient drone, discovery build-up sounds, star connection chimes (pentatonic scale), and cosmic flash effects.

### Data Pipeline
Constellation data is generated from d3-celestial's GeoJSON format:
1. `scripts/convert-constellations.ts` fetches and converts data
2. Outputs to `src/data/constellations-generated.ts` (auto-generated, do not edit)
3. `src/data/constellations.ts` re-exports with additional utilities
4. Constellation sets defined in `src/data/sets.ts` (unlockable upgrades)

### UI Layer
- `DiscoveriesTab` - Tracks and displays found objects, organized by sets
- `ObservatorySwitcher` - Hemisphere selection UI
- DOM elements defined in `public/index.html`, styled in `public/styles.css`

## Testing Patterns

Tests use Bun's test runner. Constellation tests focus on the state machine (discovery mechanics, callbacks) without canvas rendering - see `src/__tests__/Constellation.test.ts` for the factory pattern used to create test fixtures.

## Path Aliases

TypeScript configured with `@/*` mapping to `src/*`.
