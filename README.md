# Claude Code Quest

> 8-bit terminal-styled learning game that teaches Claude Code through a 5-level dungeon crawl.

**Live demo:** https://claude-code-quest-sigma.vercel.app

---

## What this is

A retro CRT-styled game where you pilot a customizable pixel bot through five themed levels, each centered on a Claude Code concept. Every level is a small multi-chamber dungeon: walk in, find lore terminals, talk to NPCs, answer a challenge prompt, collect a key, exit through a locked door, watch a loading screen with a "Did you know..." Claude fun fact, and arrive in the next level.

The **engine and level architecture are complete**. The lesson content (`src/content/*.ts`) is placeholder text — drop the real curriculum in there and the game ships.

---

## Quick start

```bash
gh repo clone connorjseale17/claude-code-quest
cd claude-code-quest
npm install
npm run dev     # http://localhost:5173
npm run build   # outputs to dist/
```

Stack: React 19 · TypeScript · Vite · Tailwind v4.

---

## The five levels

| # | Title | Theme | Chambers | Topic |
|---|---|---|---|---|
| 01 | **Welcome** | Orange CRT | Antechamber → Sanctum | First prompt |
| 02 | **The Claude.md** | Purple archive | Archives → Stacks → Vault | Project context files |
| 03 | **Slash Commands** | Green registry | Foyer → Registry → Execution | Custom prompts |
| 04 | **MCP Servers** | Teal network | Hub → Server Rack → Integration | External tools |
| 05 | **Subagents** | Pink hive | Lobby → Agent Pool → Briefing Room | Task tool / parallel agents |

NPCs vary per level: Owl (archivist), Cat (clerk), Duck (rubber-duck connector), plus a roster of Claude-bot subagents in level 5.

---

## Game flow

```
boot → splash → instructions → customize → loading → playing → loading → … → playing → gameOver
```

| Phase | Component | What happens |
|-------|-----------|--------------|
| `boot` | `BootScreen.tsx` | npm-install / "claude-code-quest init" load sequence with CLAUDE CODE QUEST ASCII art |
| `splash` | `SplashScreen.tsx` | Typewriter intro, big pixel bot |
| `instructions` | `InstructionsScreen.tsx` | Controls + level lineup |
| `customize` | `CustomizeScreen.tsx` | Player name + bot color (8 options) — persisted to `localStorage['ccq-player']` |
| `loading` | `LoadingScreen.tsx` | Animated bot, ASCII progress bar (~5s), typewriter "Did you know..." fact |
| `playing` | `Room.tsx` + panels | The actual dungeon: walk, interact, challenge, key, door |
| `gameOver` | `EndScreen.tsx` | Quest-complete screen |

---

## Architecture

The data model is **level → chambers**.

- A `LevelConfig` (5 of them, in `src/engine/roomConfigs.ts`) has `id`, `number`, `title`, `theme`, and a `chambers` map.
- A `ChamberConfig` is a tile grid (40px tiles, ~16-22 wide × 12-14 tall) with `items`, `doors`, `npcs`, `decorations`, and an optional `keySpawn`.
- A `DoorConfig` points to another chamber (`{kind:'chamber'}`), another level (`{kind:'level'}`), or the end (`{kind:'end'}`). Doors can be `locked` + `requiresLevelKey`.
- **Level state** (`{challengePassed, keyCollected}`) tracks progress through a level's boss challenge → key → exit door loop.
- **Chamber state** (`{visited, loreSeen, npcSeen}`) tracks per-chamber discoveries (fuels the lore counter HUD).

Walking through an unlocked door swaps `currentChamber` and respawns the bot at `door.spawnX/Y`. Walking through a level-target door triggers the loading screen before swapping `currentLevel`. The final door (`{kind:'end'}`) sets `gamePhase: 'gameOver'`.

---

## Where things live

```
src/
├── engine/
│   ├── GameContext.tsx     — state + reducer (the brain)
│   ├── roomConfigs.ts      — all 5 levels + chambers as data + themes
│   ├── useMovement.ts      — keyboard input, custom key-repeat, door transitions
│   └── collision.ts        — walkable tiles, door checks, adjacent-interactable lookup
├── components/
│   ├── App.tsx             — PhaseRouter + viewport scaling
│   ├── Room.tsx            — renders current chamber (tiles, items, NPCs, key, bot, doors)
│   ├── PixelSprite.tsx     — palette-indexed sprite renderer + AnimatedSprite
│   ├── Bot.tsx             — player sprite (idle/walk) with player.botColor tint
│   ├── ChallengePanel.tsx  — boss-challenge modal (multiple-choice)
│   ├── LorePanel.tsx       — lore-terminal modal
│   ├── NPCDialog.tsx       — NPC conversation modal
│   ├── PauseMenu.tsx       — Esc-triggered progress overlay
│   ├── LoadingScreen.tsx   — between-level loading screen
│   ├── PromptLine.tsx      — HUD bottom-bar (objective + lore counter)
│   ├── IntroOverlay.tsx    — per-room intro text overlay
│   ├── BootScreen.tsx      — opening boot sequence
│   ├── SplashScreen.tsx    — typewriter splash
│   ├── InstructionsScreen.tsx
│   ├── CustomizeScreen.tsx
│   ├── EndScreen.tsx
│   ├── TerminalFrame.tsx   — CRT window chrome used by every screen
│   ├── Door.tsx · Item.tsx · DPad.tsx
├── content/
│   ├── types.ts            — LessonContent type
│   ├── welcome.ts · claudemd.ts · slash.ts · mcp.ts · subagents.ts
│   │                       — PLACEHOLDER lesson content (drop real curriculum here)
│   └── funFacts.ts         — "Did you know..." facts for loading screens
├── assets/
│   └── sprites.ts          — all 16×16 pixel-art frames (bot, creatures, items)
├── index.css               — global styles, CRT effects, glow keyframes
└── main.tsx                — entrypoint
```

---

## Mechanics

### Movement
- **WASD / arrow keys** — tile-by-tile movement.
- Custom key-repeat: **220ms** initial delay, **100ms** repeat interval. Single tap = one tile; held key = continuous walk that matches the 100ms CSS transition for smooth motion.
- Held direction carries through chamber-to-chamber transitions (you can walk into a door without losing momentum).
- Window-blur releases held keys (no stuck-key bug after alt-tab).

### Interact
- **Space / Enter / E** — opens the panel for whatever's adjacent (lore, NPC, or boss challenge). All three keys work everywhere they make sense.

### Pause
- **Esc** — pause menu showing current level/chamber, objective, lore-fragment counter, characters-met counter, and controls reference. Esc again resumes. Movement is frozen while paused.

### Loading screens
- Fire on `customize → Level 01` and every `Level N → Level N+1` transition.
- Show an animated bot cycling through activity frames (thinking → idle → walk × 4 → confused) at 4 fps.
- ASCII progress bar fills over ~5 seconds.
- Typewriter "Did you know..." Claude Code fact below the bar.
- At 100%, prompt for Space/Enter to continue.

### Theming
- Each level has a `Theme` (wall, wall-shadow, floor, floor-dot, accent colors).
- Sprite tinting works via the palette `'1'` override on `PixelSprite` — pass `primaryColor` and any pixel marked `1` in the sprite frame becomes that color.
- Active-objective glow: whichever item should be interacted with next (challenge → key → exit door) pulses via the `.cc-active-objective` CSS class.

### Customization
- Name (12 chars max) and bot color (8 hex options) picked at the start.
- Stored in `localStorage` as `ccq-player`. Re-uses on return visits.
- The chosen color tints the bot sprite across all screens (splash, instructions, customize preview, gameplay, loading, end).

---

## Design references

The level structure draws from:
- **Zelda dungeons** — multi-chamber networks with a clear spine, branches, and a key-then-locked-door loop.
- **Pokémon routes** — dead-end alcoves rewarded with lore/items, never frustrating.
- **Stardew biomes** — palette swap + one signature tile = a distinct "new place."
- **Classic CRT loading screens** — block-letter ASCII, scanline overlay, monospace everywhere.

---

## Style guide

**Reference before any visual change:** [Claude Code Quest — Style Guide](https://api.anthropic.com/v1/design/h/wJyBbpNaz6wE5qNiyKYqHA?open_file=Claude+Code+Quest+-+Style+Guide.html)

The style guide above is the source of truth for colors, typography, terminal-frame chrome, accent usage, and motion. Anything new (a new screen, panel, sprite tint, animation) should be cross-checked against it before merging.

---

## What's done vs. what's pending

**Done:**
- Five-level multi-chamber engine
- Chamber + level state machine
- Locked-door + key gating
- Pause menu (Esc) with objective surfacing
- Between-level loading screens with typewriter fun facts
- NPC system with custom creature sprites + dialog
- Character customization (name + color) with localStorage persistence
- Theme system (per-level palette + accent)
- Active-objective glow indicator
- Lore-fragment counter HUD
- Smooth held-key movement tuned for tile-grid feel
- Boot screen, splash, instructions, end screen — all on-brand
- Full Vercel deployment pipeline (`.vercel/` project config is committed)

**Pending:**
- **Real curriculum content.** The `LessonContent` files in `src/content/welcome.ts`, `claudemd.ts`, `slash.ts`, `mcp.ts`, `subagents.ts` are all placeholder text. Replace `intro`, `prompt`, `choices`, `passFeedback`, `failFeedback`, and the `lore` array with real Claude Code lessons. The shape is already wired into ChallengePanel + LorePanel.

---

## Deployment

Auto-deployed to **Vercel** at https://claude-code-quest-sigma.vercel.app.

To deploy a new revision from this directory:

```bash
npx vercel --prod
```

The `.vercel/project.json` is committed, so the CLI knows which project to push to. The build runs `tsc -b && vite build`, output goes to `dist/`.

---

## Notes for next session

- **Curriculum first.** Everything else is in place; the next big chunk is content.
- **Adding a 6th level?** Register it in `LEVEL_CONFIGS` (`src/engine/roomConfigs.ts`) **and** in the `CONTENT` map at the top of `src/components/ChallengePanel.tsx`. Add a corresponding `src/content/<id>.ts` file matching the `LessonContent` shape. Wire the previous level's exit door target to `{kind:'level', level:'<new-id>', chamber:'<new-id>-...'}` and the new level's exit door to `{kind:'end'}`.
- **Sprite tile size is 40px.** Chambers are sized in tiles. The game's internal canvas is 960×640 and gets scaled to fit the viewport via the `useScale()` hook in `App.tsx` — do not try to make individual components responsive; just author at 960×640.
- **All keyboard handlers accept both Enter and Space** wherever activation is the action (already audited; preserve this when adding new screens).
- **Sprite tinting:** to add a new tinted sprite, write the frame using palette key `'1'` for the part that should be the theme color, then pass `primaryColor={theme.accentColor}` to `PixelSprite`.
- **Pixel art process:** each sprite is a string array of 14-16 rows × 16 chars. Use `fixWidths` to pad. See examples at the bottom of `src/assets/sprites.ts`.

---

## Credits

Built with Claude Code. Pixel art and copy: original. Design references: Zelda, Pokémon, Stardew Valley, every CRT loading screen I've ever stared at.
