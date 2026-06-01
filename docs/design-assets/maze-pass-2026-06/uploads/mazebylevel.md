# Maze Design Prompts — by level

Six self-contained prompts to hand to Design Claude. Each level is one prompt;
the player encounters them in order; each prompt is independent so you can
paste them sequentially or run them in parallel sessions.

Sprite & prop libraries already exist in the Anthropic Design workspace:
**Claude Code Quest — Props.html** and **Claude Code Quest — Enemy Sprites.html**.
Design Claude should reference those by name; the prompts below also list every
asset inline so Design Claude doesn't need to context-switch.

Boss-sprite assignments (suggested — adjust if you want):

| Level | Boss name | Sprite |
|------:|----------|--------|
| 01 | EMBERLING | slime |
| 02 | MORDRANG | warlock |
| 03 | GRIST | goblin |
| 04 | VORTHEX | ghost |
| 05 | LICH QUORUM | skeleton |
| 06 | THE OVERLORD | dragon |

## Hazard model (locked — same across every level)

The mazes are no longer purely about navigation; they're a real platforming
challenge with hazards that damage the player. Spec:

- **Player has 5 hearts of overworld HP.** Currently displayed as a small HP
  bar in the top-left of the play canvas.
- **Hazards damage on contact.** Touching an active hazard tile costs 1 heart
  + a ~0.5s invuln-flash so you can step away cleanly.
- **0 HP → respawn at the chamber entry door** with full HP. Boss progress,
  keys, and collected lore are preserved. The respawn is forgiving — the
  maze is still a teaching tool, you just retry the corridor.
- **Four hazard families** are available (see each level's hazard-kit section):
  *timed gates* (wall-on-cycle), *pressure plates + gates* (state puzzles),
  *projectile shooters* (wall-mounted darts firing across a row), and
  *decorative danger* (looks scary, doesn't damage — purely atmospheric).
- **Hazards have telegraphs.** Every "on" phase is preceded by a 1-beat
  warm-up visual so the player can read the cycle.
- **Hazards have safe windows.** Every hazard puzzle must have a clear
  cross-able moment, AND ideally a slow alternative path around it for
  accessibility (longer, less risky).

Design each maze to be **fully playable without hazards** — the hazards are
an overlay layer. Mark hazard placements with cycle/visual/safe-window
notes so we can wire them up in an engine pass without redesigning the
chamber. Same maze data, hazards turned off in v1, on in v1.5.

---

## PROMPT — Level 01: WELCOME

You're designing the full maze layout for **Level 01 (WELCOME)** of *Claude
Code Quest*, a retro CRT-styled educational dungeon game. The engine and
curriculum are locked. Your job is the **floor plan and atmosphere of every
chamber in this level**.

### What you're working with

**Prop library** (25 props — use any, place with intention):
- **LIGHT & FIRE** (flicker/pulse): wall-sconce, brazier, hanging-lantern, mana-crystal, cursor-beacon
- **INTERACTIVE** (idle ↔ active): treasure-chest, barrel, floor-lever, crt-terminal, server-stack
- **WALL DRESSING**: banner, cracked-bricks, wall-runes, chains, cobweb
- **FLOOR DETAIL**: rubble, bones, puddle, summoning-circle, cable-run
- **FURNITURE**: table, anvil, weapon-rack, bookshelf, crate

**Boss for this level**: EMBERLING (use the **slime** sprite — small green/orange whelp). The boss sits in the second chamber, behind the key gate.

**Theme color**: orange (the welcome warmth).
**Style**: 8-bit pixel art on a 40px tile grid; reference the existing Style Guide page (CRT, JetBrains Mono, scanlines).

### The pedagogical goal — guided maze

Every chamber is a **maze the player walks through**, and the maze does the teaching:

- The **critical path** from spawn → exit passes through every NPC and the challenge altar. The player cannot miss them.
- **Lore items on the critical path** are mandatory waypoints.
- **Lore items in dead-end alcoves** are optional supplements that reward exploration.
- The architecture should *teach the player to look at lore before they reach the NPC*, who deepens what they read, who then sends them at the boss.

### Locked cast for Level 01

The lesson this level teaches: **how to operate Claude Code safely from the first session — permission modes (PLAN/ACCEPT-EDITS/AUTO/ASK), plain-English briefs, and the deploy-to-Vercel loop**.

**Chamber 1 — Antechamber (~20×12 tiles).** Entry point.
- NPC `guide-bot`: a friendly green Claude-bot at center-left. Teaches permission modes through a 10-beat conversation.
- Lore `manual` (book sprite): "Tip: Shift+Tab cycles permission modes. Order: PLAN, ACCEPT-EDITS, AUTO, ASK."
- Lore `sticky-note` (paper sprite): "Tip: brief Claude like you'd brief a junior consultant — what, who for, in what style."
- Practice terminal `proposal-architect-practice` (hint_token sprite): a fill-in-the-blank exercise — bonus, in a side alcove.
- Player spawns at the west edge (around tile 2,6). Exit door is on the east edge (around tile 19,6) leading to the Sanctum.

**Chamber 2 — Sanctum (~18×12 tiles).** Boss chamber.
- Challenge terminal (CRT monitor) — when interacted with, triggers the EMBERLING boss battle.
- Lore `side-note` (paper sprite): "Tip: Vercel free tier hosts every prototype. PR → preview URL the client can review live."
- Key spawns near tile (10, 9) once the boss falls.
- West door (unlocked) back to Antechamber. East door (locked, requires the level key) leads to Level 02.

### What to produce — per chamber

1. **ASCII grid** of the maze. Use `#` walls, `.` floor, `D` door tiles, `K` key spawn, `L` lore (with id), `P` practice, `C` challenge altar, `N` NPC (with id). Label every letter below the grid.
2. **Prop placements** — for each prop you use, list its name + (x,y) tile coords + one sentence on what it thematically suggests in this room.
3. **Ambient elements** — lighting (which sconces/braziers/lanterns are active), wall dressing scatter, floor details, any animated props in motion.
4. **The critical path** — overlay arrows on the grid OR list (x,y) waypoints; the path must pass through every NPC and lore-on-spine in order.
5. **One-sentence distinctness note** — what makes this room *not* feel like any other room.

### Constraints

- **Locked cast** — every NPC, lore item, practice terminal, and challenge listed above must appear. Don't omit, rename, or merge them. You may move them within a chamber.
- **Tile grid** — 16-22 wide × 11-14 tall. Going larger risks scroll/zoom.
- **Distinct chambers** — even within this level, the Antechamber and Sanctum must look and feel different. Across all 12 chambers in the game (you only see this level, but assume the others exist), no mirrored layouts.
- **Maze density** — heavier than open-floor; ~22-30% of interior is wall. Branching corridors and at least one dead-end alcove per chamber.
- **The cast is locked; the maze is yours to invent.** Take liberties with chamber dimensions and prop choices where they serve the design.

### Hazard kit for Level 01

This level **introduces** hazards — keep the density gentle, this is the
player's first contact with the system. Hazard theme: **warming flames**.

Available families (see the "Hazard model" section at the top of this doc
for full mechanics + damage/respawn behavior):

- **Timed gates** as flame jets: a floor tile that toggles between safe
  and lit on a cycle (~2s off → 1s warming → 2s on). Visually use the
  `brazier` palette — orange flame, floor scorch when off.
- **Decorative danger**: `cracked-bricks`, `rubble`, `cobweb` in corners
  to read "abandoned but lived-in" without damaging.

**Place 1-2 hazards in this level total** (Welcome is a tutorial level —
don't overwhelm). A single flame-jet pair in the corridor before the
Sanctum's challenge altar is a great teaching moment. No pressure-plates
or projectile shooters in Level 01 — save those for later levels.

Add as the 6th deliverable per chamber:

6. **Hazard placements** — for each hazard: (x,y) tile, family, cycle
   timing (e.g., "off 2s · warm 1s · on 2s"), visual reskin, and a one-
   sentence note on the safe-passage window the player will use.

Surprise us. Welcome should feel like a friendly threshold — warm, lived-in, slightly worn — with the boss room turning a notch colder as the Emberling stirs.

---

## PROMPT — Level 02: THE CLAUDE.MD

You're designing the full maze layout for **Level 02 (THE CLAUDE.MD)** of *Claude Code Quest*. The engine and curriculum are locked. Your job is the floor plan and atmosphere of every chamber in this level.

### What you're working with

**Prop library** (25 props):
- **LIGHT & FIRE**: wall-sconce, brazier, hanging-lantern, mana-crystal, cursor-beacon
- **INTERACTIVE**: treasure-chest, barrel, floor-lever, crt-terminal, server-stack
- **WALL DRESSING**: banner, cracked-bricks, wall-runes, chains, cobweb
- **FLOOR DETAIL**: rubble, bones, puddle, summoning-circle, cable-run
- **FURNITURE**: table, anvil, weapon-rack, bookshelf, crate

**Boss for this level**: MORDRANG THE SORCERER (use the **warlock** sprite — hooded caster, purple/gold). Sits in the Vault chamber behind the key gate.

**Theme color**: purple (the archives — old paper, memory, contracts).
**Style**: 8-bit pixel grid; CRT scanlines; this level leans archival — think reading rooms, dusty stacks, candlelight.

### Guided maze — same rules as Level 01

Critical path must pass through every NPC and on-spine lore. NPCs always on spine. Boss at the end. Optional lore in dead-end alcoves.

### Locked cast for Level 02

The lesson: **CLAUDE.md as a behavioral contract Claude reads every session — what goes in it, where it lives (global / team / local), and how to manage context (`/compact`, `/clear`, `/rewind`, `/memory`)**.

**Chamber 1 — Archives (~22×12 tiles).** Entry, dense with reading desks.
- NPC `archivist-bot` (sprite: owl, purple): a serious librarian. Teaches CLAUDE.md across a 10-beat conversation. Place her near the center of the room.
- Lore `old-note` (paper sprite): "Tip: CLAUDE.md belongs in repo root. Claude reads it every session before any task."
- Lore `log` (scroll sprite): "Tip: /init drafts a starter CLAUDE.md from the repo. Prune the noise before checking in."
- Entry from west (spawn ~2,6). Exit door is **north** (around 11,0) leading to The Stacks.

**Chamber 2 — The Stacks (~16×14 tiles).** A maze of bookshelves and side aisles.
- Lore `fragment-a` (book sprite): "Tip: ~/.claude/CLAUDE.md = global preferences. ./CLAUDE.md = team contract. ./CLAUDE.local.md = just you."
- Lore `fragment-b` (book sprite): "Tip: /compact preserves the conversation; /clear nukes it. Pick by intent."
- Lore `fragment-c` (paper sprite): "Tip: /memory shows what Claude figured out on its own. Promote useful bits to CLAUDE.md."
- Practice `contract-auditor-practice` (hint_token sprite): bonus exercise in a side alcove.
- South door (back to Archives). East door (unlocked) to The Vault.

**Chamber 3 — The Vault (~16×11 tiles).** Boss chamber.
- Challenge altar (CRT monitor or scroll-style — your call) — triggers the MORDRANG boss battle.
- Key spawns at (8,7) after the boss falls.
- West door (unlocked) back to Stacks. East door (locked) to Level 03.

### What to produce per chamber

Same five deliverables as Level 01: ASCII grid, prop placements, ambient elements, critical path, distinctness note.

### Tone for Level 02

A scholar's level. Bookshelves, banner-style hangings, candle/sconce light, dust in the air, runes on walls (purple/gold). The Stacks should feel like a labyrinth of knowledge — branching aisles between shelves, with the lore fragments tucked in corners or carrels. The Vault should feel ceremonial, almost sacred — colonnades, a summoning circle around or near the altar, deeper darkness, mana-crystals pulsing.

Distinct chambers: Archives = open + warm reading-room with desks (use `bookshelf`, `table`, `wall-sconce`, `banner`); Stacks = tight maze of shelves with narrow aisles (use `bookshelf` heavily, `chains`, `cobweb` in corners); Vault = ceremonial + cold (use `mana-crystal`, `wall-runes`, `summoning-circle`, `brazier`).

### Hazard kit for Level 02

The wraith's domain. Hazard theme: **memory-rot magic** — barriers that
fade in and out as the archives' wards activate.

Available families (see "Hazard model" at top of doc):

- **Timed gates** as magic barriers: a vertical line of `wall-runes` that
  pulses purple-active on a cycle. Reads as "memory wards" the wraith
  flickers on to trap intruders.
- **Decorative danger**: `chains`, `cobweb`, swinging from the
  ceiling-corners of every chamber. Sets mood.

**Place 2-3 hazards in this level total.** The Stacks is a maze of shelves
— at least one timed magic-barrier should gate a critical-path corridor
there. The Vault should feel cleaner / more ceremonial; if you place a
hazard there, make it part of the boss-room approach (one ring of pulsing
floor-runes around the altar that activate during the approach).

No projectile shooters or pressure plates in Level 02 — keep the metaphor
strict (this is a wraith's domain, not a mechanical one).

Add as the 6th deliverable per chamber:

6. **Hazard placements** — for each: (x,y), family, cycle timing, visual
   reskin (e.g. "purple wall-runes pulse, 3s safe → 1s warm → 2s sealed"),
   and the safe-passage window.

Same constraints as Level 01: tile grid 16-22 × 11-14, locked cast, ~22-30% walls, branching corridors and at least one dead-end per chamber. Distinct from each other and from every other chamber in the game.

---

## PROMPT — Level 03: SLASH COMMANDS

You're designing the full maze layout for **Level 03 (SLASH COMMANDS)** of *Claude Code Quest*. Engine and curriculum locked.

### What you're working with

(Same prop library and rules as the prior prompts — copied below for self-containedness.)

**Prop library** (25 props):
- **LIGHT & FIRE**: wall-sconce, brazier, hanging-lantern, mana-crystal, cursor-beacon
- **INTERACTIVE**: treasure-chest, barrel, floor-lever, crt-terminal, server-stack
- **WALL DRESSING**: banner, cracked-bricks, wall-runes, chains, cobweb
- **FLOOR DETAIL**: rubble, bones, puddle, summoning-circle, cable-run
- **FURNITURE**: table, anvil, weapon-rack, bookshelf, crate

**Boss**: GRIST THE GOLEM (use the **goblin** sprite — green, hunched, scrappy). Sits in the Execution chamber.

**Theme color**: green (the registry — terminal-glow, command-line energy).
**Style**: this level is mechanical, organizational — filing cabinets, command terminals, lever-arrays, a queue-system architecture turned into a dungeon.

### Guided maze — same rules

### Locked cast for Level 03

The lesson: **custom slash commands, skills (auto-invoking commands), hooks (deterministic enforcement), and permission rules**.

**Chamber 1 — Prompt Foyer (~18×11 tiles).** Entry — a queueing/intake area.
- NPC `clerk-bot` (sprite: cat, green): a clerk at a front desk. Teaches commands/skills/hooks/permissions across an 11-beat conversation. Place her in the center where the player must pass.
- Lore `command-sheet` (paper sprite): "Tip: a slash command is just a markdown file in `.claude/commands/`. The body IS the prompt."
- Lore `index` (scroll sprite): "Tip: skills auto-invoke when their description matches. Slash commands fire on demand."
- Entry from west (spawn ~2,5). Exit east to The Registry.

**Chamber 2 — The Registry (~18×13 tiles).** A filing-cabinet maze.
- Lore `card-a` (database sprite): "Tip: bottle your firm's deliverables — /draft-proposal, /summarize-call, /qbr-deck."
- Lore `card-b` (database sprite): "Tip: hooks GUARANTEE actions. Format on save, lint before commit, block writes to /client-data."
- Lore `card-c` (database sprite): "Tip: permission rules are tool-specific allow/ask/deny. Layer with whichever mode you're in."
- Practice `command-architect-practice` (hint_token sprite): bonus exercise.
- West/east doors connect Foyer ↔ Execution.

**Chamber 3 — Execution (~16×11 tiles).** Boss room.
- Challenge altar (CRT terminal) → triggers GRIST boss battle.
- Key spawns at (8,7) after victory.
- East door (locked) to Level 04.

### Per-chamber deliverables — same five as before.

### Tone for Level 03

A working clerical dungeon. Filing cabinets as walls (`bookshelf` + `crate`), `crt-terminal` props on desks, `cable-run` on the floor between them. `server-stack` clusters in the Registry. `cursor-beacon` lights blinking on terminals. Sconces give way to `mana-crystal` and CRT glow. Execution should feel like the inside of a green CRT — pure terminal phosphor.

Distinct chambers: Foyer = front-desk + queue (use `table`, `chains` as queue stanchions, `cursor-beacon` on the desk); Registry = filing-cabinet maze (use `bookshelf` arranged in tight columns, `cable-run` underfoot, `crt-terminal` and `server-stack` decorating walls); Execution = stage with central altar (use `summoning-circle` around the altar, `cursor-beacon` on the four corners, otherwise sparse).

### Hazard kit for Level 03

The mechanical level. Hazard theme: **clerical machinery** — stone crushers
that slam shut on a schedule, plus a pressure-plate puzzle that opens a
shortcut.

Available families:

- **Timed gates** as crushers: a wall section that drops ("slams") on a
  cycle, blocking a corridor when shut. Visually a thick stone slab; the
  warm-up is a ~1s "rumbling" pulse. Place at chokepoints in the Registry
  maze.
- **Pressure plates + gates**: at least one in this level. Step on a
  `floor-lever` to open a specific wall section elsewhere (could be a
  shortcut back to the Foyer from deep in the Registry, OR a secret
  alcove with a fourth lore card). Use the existing `floor-lever` prop.
- **Decorative danger**: `chains`, `rubble`, hanging `cracked-bricks` for
  industrial worn-in feel.

**Place 2-3 hazards** in this level: 1-2 crushers in the Registry maze
(gates on the critical path), and 1 pressure plate that unlocks a
shortcut or secret. Execution can stay clean — the boss IS the hazard
there.

Add as the 6th deliverable per chamber:

6. **Hazard placements** — for each: (x,y), family, cycle timing OR
   pressure-plate target ("plate at (X,Y) opens wall section at (P,Q-R)"),
   visual reskin, safe-passage window.

Same constraints. Distinct from every other chamber.

---

## PROMPT — Level 04: MCP SERVERS

You're designing the full maze layout for **Level 04 (MCP SERVERS)** of *Claude Code Quest*. Engine and curriculum locked.

### What you're working with

(Same prop library — listed below.)

**Prop library** (25 props):
- **LIGHT & FIRE**: wall-sconce, brazier, hanging-lantern, mana-crystal, cursor-beacon
- **INTERACTIVE**: treasure-chest, barrel, floor-lever, crt-terminal, server-stack
- **WALL DRESSING**: banner, cracked-bricks, wall-runes, chains, cobweb
- **FLOOR DETAIL**: rubble, bones, puddle, summoning-circle, cable-run
- **FURNITURE**: table, anvil, weapon-rack, bookshelf, crate

**Boss**: VORTHEX (use the **ghost** sprite — floaty cyan/white wraith — reads as "reaches through walls", which fits the MCP-as-connection-protocol theme). Sits in the Integration chamber.

**Theme color**: teal (the server room — cool, wired-in, plasma-blue).
**Style**: this is a SERVER ROOM dungeon. Cable runs across the floor. Server stacks against walls. Patch panels. Less "fantasy" than Level 02; more "futuristic catacomb."

### Guided maze — same rules

### Locked cast for Level 04

The lesson: **MCP (Model Context Protocol) — open standard for plugging external tools into Claude. Transports (stdio vs http/sse), primitives (Tools/Resources/Prompts), and the security model (scoped tokens, default-deny)**.

**Chamber 1 — Hub (~22×12 tiles).** Entry — a central switchboard.
- NPC `connector-bot` (sprite: duck, teal): a debugging duck wired into the patch-panel. Teaches MCP across an 11-beat conversation.
- Lore `broadcast` (database sprite): "Tip: MCP is an open standard. Write the integration once, every AI client speaks to it."
- Lore `connection-log` (paper sprite): "Tip: `stdio` transport for local tools, `http`/`sse` for remote SaaS. Pick by where it lives."
- Entry from west (spawn ~2,6). Exit east to Server Rack.

**Chamber 2 — Server Rack (~16×14 tiles).** A tight maze between server columns.
- Lore `rack-a` (hint_token sprite): "Tip: MCP servers expose TOOLS (callable), RESOURCES (readable), PROMPTS (templated)."
- Lore `rack-b` (hint_token sprite): "Tip: typical firm stack — GitHub MCP + Slack MCP + Drive MCP + Notion MCP. Scope each tight."
- Lore `rack-c` (hint_token sprite): "Tip: every MCP tool call sees what the auth token sees. Default-deny, scope narrow."
- Practice `integrations-engineer-practice` (database sprite): bonus exercise.
- West/east doors connect Hub ↔ Integration.

**Chamber 3 — Integration (~16×11 tiles).** Boss room.
- Challenge altar (CRT) → triggers VORTHEX boss battle.
- Key spawns at (8,7) after victory.
- East door (locked) to Level 05.

### Per-chamber deliverables — same five.

### Tone for Level 04

Cool server-room aesthetic. `server-stack` against walls, `cable-run` snaking across the floor connecting them, `cursor-beacon` blinking on each rack, occasional `mana-crystal` for plasma-glow accents. `puddle` (cyan shimmer) suggests coolant leaks. The Hub should feel like a brain — every cable converges. The Rack maze should be tight, claustrophobic, full of humming towers. Integration should feel exposed, a server-temple with the altar plugged into the wall.

Distinct chambers: Hub = central switchboard (use `cable-run` radiating from a center point, `server-stack` ringing the walls); Rack = tall corridor maze (use `server-stack` AS the wall columns themselves); Integration = altar wired into the wall (use `cable-run` connecting altar to a server cluster, `puddle` and `cursor-beacon` for atmosphere).

### Hazard kit for Level 04

The server-room level. Hazard theme: **plasma + electric darts** — the
infrastructure itself attacks. This is the level where **projectile
shooters** make their debut.

Available families:

- **Timed gates** as plasma jets: a floor tile that toggles between safe
  and a cyan-orange plasma plume on a cycle. Visually drawn from the
  `mana-crystal` palette (cyan core, orange flare). Use these in the
  Rack maze corridors.
- **Projectile shooters** (NEW for this level): a wall-mounted "dart
  emitter" — embedded in a `server-stack` panel — that fires a small
  electric pulse across a row on a cycle. Telegraphed by a wind-up glow
  on the emitter, ~1s before fire. The dart moves tile-by-tile across
  the row over ~2 seconds, then despawns. Player pauses-and-continues
  between volleys.
- **Decorative danger**: `puddle` (coolant leaks), `cable-run` with
  occasional sparks, `cracked-bricks` near server towers.

**Place 3 hazards in this level**: at least one plasma-jet corridor in
the Rack, one projectile-shooter hallway (a long straight corridor with
a wall-mounted emitter — classic dart-trap setup), and one decorative-
only flourish in the Hub. Integration is the boss room — keep it tense
but clean.

Add as the 6th deliverable per chamber:

6. **Hazard placements** — for each: (x,y), family, cycle timing
   (including projectile speed across the row), visual reskin, and the
   safe-passage window.

Same constraints. Distinct from every other chamber.

---

## PROMPT — Level 05: SUBAGENTS

You're designing the full maze layout for **Level 05 (SUBAGENTS)** of *Claude Code Quest*. Engine and curriculum locked.

### What you're working with

**Prop library** (25 props):
- **LIGHT & FIRE**: wall-sconce, brazier, hanging-lantern, mana-crystal, cursor-beacon
- **INTERACTIVE**: treasure-chest, barrel, floor-lever, crt-terminal, server-stack
- **WALL DRESSING**: banner, cracked-bricks, wall-runes, chains, cobweb
- **FLOOR DETAIL**: rubble, bones, puddle, summoning-circle, cable-run
- **FURNITURE**: table, anvil, weapon-rack, bookshelf, crate

**Boss**: LICH QUORUM (use the **skeleton** sprite — angular undead, rattling — sits in the Briefing Room).

**Theme color**: pink (the mission lobby — warmer than green/teal, more human-collaborative).
**Style**: this is the agent pool — workstations, briefing tables, mission boards. Less archival, more operational. Think a special-ops command room mid-prep.

### Guided maze — same rules

### Locked cast for Level 05

The lesson: **subagents (parallel Claude instances with fresh context), foreground vs background, parallelism, routines (`/loop` scheduled agents)**.

**Chamber 1 — Mission Lobby (~20×12 tiles).** Entry — a roster + ops board area.
- NPC `scout-bot`: green Claude-bot, teaches the Explore archetype (4-beat conversation). Place at left-center.
- NPC `planner-bot`: blue Claude-bot, teaches the Plan archetype (4-beat conversation). Place center-right, after scout.
- Lore `roster` (paper sprite): "Tip: a subagent gets a fresh context window — brief it like a stranger walking in cold."
- Lore `mission-brief` (scroll sprite): "Tip: /agents shows every running subagent at a glance — blocked, waiting, done."
- Entry from west (spawn ~2,6). Exit east to Agent Pool.

**Chamber 2 — Agent Pool (~18×14 tiles).** A larger room with workstation pods.
- NPC `reviewer-bot`: yellow Claude-bot, teaches independent code review (4 beats). Upper area.
- NPC `debugger-bot`: pink Claude-bot, teaches scientific debugging (5 beats). Upper area.
- Lore `fragment-x` (paper sprite): "Tip: spawn N subagents in one message — they run truly concurrent. 5× throughput on parallel briefs."
- Lore `fragment-y` (paper sprite): "Tip: routines (/loop) schedule agents on Anthropic infra. Your laptop can be off."
- Practice `orchestrator-practice` (hint_token sprite): bonus exercise.
- West/east doors connect Lobby ↔ Briefing.

**Chamber 3 — Briefing Room (~16×11 tiles).** Boss room.
- Challenge altar (CRT) → triggers LICH QUORUM boss battle.
- Key spawns at (8,7) after victory.
- East door (locked) → leads to the Throne Room (Level 06).

### Per-chamber deliverables — same five.

### Tone for Level 05

Operational, collaborative. `table` props for briefing surfaces, `crt-terminal` for each agent workstation, `banner` for unit insignias, `cursor-beacon` blinking softly. Less spooky than Level 04, more "war room." The Lobby should feel like a recruiting hall — two NPCs visible from the entrance. The Pool should feel populated — four workstation pods with NPCs at two of them, room to spread out. The Briefing Room should narrow to ceremony — a single altar, dim, with `chains` or `wall-runes` hinting at the Lich's presence.

Distinct chambers: Lobby = two NPCs by an open foyer with mission board (use `banner`, `table`, `cursor-beacon`); Pool = four pods around a central walkway (use `table` + `crt-terminal` per pod, `bookshelf` for reference racks); Briefing = ceremonial single-altar room (use `wall-runes` glowing pink, `chains` hanging, `mana-crystal` faint).

### Hazard kit for Level 05

The ops level. Hazard theme: **shadow barriers + pressure-puzzle shortcuts**.
The Lich Quorum's presence leaks into the pool.

Available families:

- **Timed gates** as shadow-barriers: a vertical or horizontal line that
  pulses opaque-on-cycle. Visually pink-tinted `wall-runes` flickering on
  and off. Reads as "the Quorum's grasp tightens, then releases."
- **Pressure plates + gates**: use again here — one plate in the Pool
  opens the Briefing Room door early (lets the player skip a long
  approach if they find the plate). Reuses the `floor-lever` prop.
- **Decorative danger**: `bones` scattered in the Pool corners (failed
  subagent shells), `cobweb` over disused workstation pods, `mana-crystal`
  pulsing faintly.

**Place 2-3 hazards**: one shadow-barrier corridor in the Pool, one
pressure-plate-opens-shortcut puzzle. Briefing Room can stay clean of
hazards — the Lich IS the hazard there.

No projectile shooters in Level 05 — those belong to MCP (mechanical
infrastructure). Keep the metaphor: Subagents are *agents*, not turrets.

Add as the 6th deliverable per chamber:

6. **Hazard placements** — for each: (x,y), family, cycle timing OR
   pressure-plate target, visual reskin, safe-passage window.

Same constraints. Distinct from every other chamber.

---

## PROMPT — Level 06: THE THRONE

You're designing the layout for **Level 06 (THE THRONE)** of *Claude Code Quest* — the final chamber. The engine and content are locked; this is one room, but it must feel like the climax of the whole game.

### What you're working with

**Prop library** (use the same kit — every prop available):
- **LIGHT & FIRE**: wall-sconce, brazier, hanging-lantern, mana-crystal, cursor-beacon
- **INTERACTIVE**: treasure-chest, barrel, floor-lever, crt-terminal, server-stack
- **WALL DRESSING**: banner, cracked-bricks, wall-runes, chains, cobweb
- **FLOOR DETAIL**: rubble, bones, puddle, summoning-circle, cable-run
- **FURNITURE**: table, anvil, weapon-rack, bookshelf, crate

**Boss**: THE OVERLORD (use the **dragon** sprite — the largest, most detailed enemy in the bestiary, horned and fire-breathing). The Overlord pulls one quiz question from each of the five preceding modules plus several synthesis questions across all of them.

**Theme color**: crimson (deeper, hotter than orange — final-boss red).
**Style**: a ceremonial throne room. NOT a maze. This is the **walk-up moment**: a long, ominous approach to the throne where the dragon waits. Less navigation puzzle, more *stage*.

### What this room is

- One chamber, **~22×13 tiles**.
- Player enters from the **west door** (spawn ~1,6) and walks east toward the altar/throne.
- The challenge altar — `overlord-altar` — sits in front of the throne at roughly tile (17,6).
- After the Overlord falls, a key spawns at (17,9). The **east door** is the GAME-END door (`{kind: 'end'}`), locked until the key is collected.
- **No NPCs. No lore.** No side quests. Every other chamber teaches; this one **judges**.

### What you'll produce

1. **ASCII grid** for the single chamber.
2. **Prop placements** — every prop you use, with (x,y) coords and one sentence of intent.
3. **Ambient elements** — lighting cues, animated props, atmospheric details.
4. **The approach** — a labeled critical path from spawn to altar. This is the "walk-up to the throne" moment — make it feel ceremonial.
5. **Distinctness note** — what makes the Throne Room unmistakably the *finale*, not just another room with a boss.

### Tone for Level 06

This is the climax. Make it feel like *Ozymandias meets a server room.* Suggestions (take or leave):

- Two **colonnades of pillars** flanking the central approach, narrowing the player's path into a single ceremonial corridor.
- **Braziers** at intervals lining the approach — flickering orange light against crimson walls.
- **Cracked-bricks**, **rubble**, and **bones** scattered along the floor — this throne has seen battles.
- A **summoning-circle** ringing the altar at the throne's foot.
- **Wall-runes** pulsing crimson behind the throne.
- **Chains** hanging from the ceiling at the back.
- An empty **anvil** or **weapon-rack** as a relic — failed heroes' gear left behind.
- Maybe one **treasure-chest** (closed — never opened, taunting) in a corner as a dead-end aside.

No maze branches. No exploration alcoves. The chamber's job is to make every step feel weightier than the last.

### Hazard kit for Level 06

The finale. Hazard theme: **the gauntlet** — a sequence of hazards from
every previous level, escalating along the approach.

This is the climax, so go hard. Available families (all four — use them):

- **Timed gates** as flame jets (Welcome-flavor), shadow barriers
  (Subagents-flavor), and stone crushers (Slash-flavor) — three of each
  family along the approach, on offset cycles so the player must read
  multiple rhythms simultaneously.
- **Projectile shooters** (MCP-flavor): two emitters firing across the
  approach corridor, telegraphed and timed so the player races between
  volleys.
- **Pressure plates + gates**: a single dramatic plate near the throne
  that, when stepped on, *closes the door behind the player* — sealing
  them in for the final fight. (Visual + audio cue: chain rattles, door
  slam.)
- **Decorative danger**: `bones`, `chains`, `cracked-bricks`, `rubble`,
  `wall-runes` pulsing crimson, all heavy. The throne room is a
  battlefield's afterimage.

**Place 5-7 hazards along the approach.** Sequence them so the player
encounters them in escalating combinations:

1. Single flame jet (warm-up — the player learns the rhythm).
2. Pair of shadow barriers on opposite cycles (a-b alternating).
3. A projectile-shooter hallway with one telegraphed dart.
4. A stone crusher that drops directly on the path.
5. The "seal the door" pressure plate at the throne's foot.

The approach should feel like the player is being TESTED on everything
they've learned in the previous five levels.

Add as the 6th deliverable:

6. **Hazard placements** — for each: (x,y), family, cycle timing (or
   plate target), visual reskin, safe-window. Include a chained sequence
   note showing the player's expected rhythm across the gauntlet.

### Constraints

- Tile grid ~22×13. Don't exceed 24 wide × 14 tall.
- The altar (`overlord-altar`) at ~(17,6), key spawn at (17,9), east end-door at (21,6), west entry at (0,6). You may shift these by 1-2 tiles if it serves the layout.
- The chamber should NOT feel like a maze. It should feel like a **gauntlet**.

Make it feel like the player has earned the right to be there.

---

## How to use these

1. Open Design Claude in the same workspace as Props.html + Enemy Sprites.html.
2. Paste one prompt per session. Don't combine — each level deserves its own attention pass.
3. Once Design Claude returns the layouts (ASCII grids + prop placements + ambient notes), drop them back here and the wire-up turns each into:
   - `fillRect` calls in `src/engine/roomConfigs.ts` (the walls).
   - `decorations` entries with the named prop sprites (the ambient kit).
   - Updates to existing boss `art` fields and the `BossSprite` system to use the new enemy sprites.
4. The boss-sprite mapping (Emberling→slime, Mordrang→warlock, Grist→goblin, Vorthex→ghost, Lich Quorum→skeleton, Overlord→dragon) is a starting point — Design Claude can argue for a different mapping if it sees one.
