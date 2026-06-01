# Research — Interactive movement hazards

> What kinds of "platformer-ish" hazards make sense in a top-down tile-based
> dungeon, what they cost to build, and which ones to include in the maze
> design prompts vs. defer to a future engine pass.

## Engine reality check

We're top-down, tile-based, no z-axis. The current movement model:

- `canMoveTo()` (`collision.ts:20-44`): wall if `tile === 1`, NPC blocks its tile, door checks lock state, otherwise floor.
- No clock, no projectiles, no patrolling NPCs, no overworld HP.
- Boss fights have HP but the overworld doesn't — taking damage outside a boss currently has no meaning.
- "Jump" doesn't fit a top-down camera; the analog is a **dash** that crosses 2-3 tiles in one beat.

So before designing hazards, the real question is: **what's the engine going
to do when the player touches one?** Three options, with very different scope:

1. **Block-when-on / pass-when-off** — the hazard is just a periodic wall.
   No HP, no damage. Pure timing puzzle. ~50 lines of engine work.
2. **Bonk-back** — touching a hazard pushes the player back one tile and
   plays a hit-flash. No HP. Annoying but not punishing. ~80 lines.
3. **Full damage system** — overworld HP, hazard deals 1 heart on contact,
   die → respawn at chamber entry. Real stakes. ~200 lines + UI + balance.

My recommendation is **#1 for now** — biggest design payoff per line of code.
It unlocks fire walls, dart corridors, propeller traps, and crushers all
through a single mechanic (a tile that's a wall on even-phases and a floor
on odd-phases). We can always upgrade to #2 or #3 in a follow-up pass.

## Design patterns from the games we'd be inspired by

### Tile-based top-down precedents

- **Zelda (LTTP / Link's Awakening)** — flame jets, spike floors, crushers,
  electric barriers. All on fixed cycles, telegraphed by an animation 1-2
  beats before activation. Damage on contact but you can run past during
  the off-phase.
- **Stardew Valley Mines** — sliding boulders, narrow shooter dart traps.
  Same pattern: fixed cycle, telegraphed, walkable when off.
- **Hyper Light Drifter / Death's Door** — dash through hazard. Adds skill
  expression on top of pure timing.
- **Crypt of the NecroDancer** — every hazard tied to the music beat;
  the rhythm IS the telegraph. Beautiful design but doesn't fit our model.

### The four hazard families that survive into a tile-based engine

| Family | What it is | Engine cost | Fun payoff |
|--------|-----------|-------------|-----------|
| **Timed gate** | A wall tile that toggles passable on a cycle | Low (~50 lines) | High — endlessly reskin-able |
| **Patrolling sentry** | An NPC that walks a fixed loop | Medium (~80 lines) | High but needs guard sprites we don't have |
| **Projectile shooter** | A wall fires a moving "dart" across a row | High (~200 lines) | Very high but new entity system |
| **Decorative danger** | Animated prop that reads as dangerous but doesn't damage | Zero | Low — atmospheric only |

## Catalog: hazards that fit the engine

### A. Timed flame jet (FAMILY: timed gate)

A floor tile. Cycle: 2s OFF (walkable) → 1s "warming" (telegraph: orange
glow pulses, sound stinger) → 2s ON (impassable, full flame sprite). Player
crosses during OFF; if they step onto a "warming" tile, the next move
attempt blocks them from crossing further. Three layout patterns:

- **All-in-phase** — a row of jets all on/off together. Cross the whole row
  in one window.
- **Alternating phase** — jets on offset cycles, creating a "stepping
  stones" rhythm. Cross when each individual jet is off.
- **Sequential wave** — jets fire in a chain (j1 → j2 → j3). Race ahead
  of the wave.

**Visual**: reuse the `brazier` / `wall-sconce` prop palette — orange flame,
floor scorch when off.

### B. Magic barrier (FAMILY: timed gate, reskinned)

Same mechanic, different look. A vertical line of `wall-runes` that pulses
purple-on then fades-off on a cycle. Fits Level 02 (Mordrang's domain) and
Level 05 (Lich Quorum aura).

### C. Crusher / piston (FAMILY: timed gate, vertical)

A 1-tile slot in a wall that opens/closes on a cycle. Same engine mechanic
(timed gate). Reads visually as "stone slab slams down." Fits Level 03's
mechanical Registry — `anvil`-adjacent prop, or a wall section that drops.

### D. Sweeper blade / propeller (FAMILY: timed gate, rotating)

A center tile that's always walkable, plus 1-4 adjacent tiles that are
"blade tiles" — passable when the blade points elsewhere, impassable when
the blade is pointed at them. Engine-wise this is N timed gates with
offset phases, so still just the timed-gate primitive. Visually we'd need
new sprite frames (a rotating blade) or just a fast-flickering color
overlay.

### E. Sentry patrol (FAMILY: patrolling sentry)

A "guard" NPC that walks a fixed loop of tiles every N seconds. The
player must time passage when the guard's back is turned or they're at
the far end of the loop. Stealth-puzzle feel. Engine cost: medium — needs
NPC movement tick, facing direction, and a way to "block" or "alert" on
player overlap. **Open issue:** we don't have guard sprites in the
bestiary — all 5 enemies are designed for boss battles. We'd need a new
sprite, OR repurpose one (skeleton-guard? warlock-on-patrol?).

### F. Pressure plate + gate (FAMILY: state-driven, NOT timed)

Floor lever (already in the props library!) + a locked gate. Step on the
plate to open the gate. Classic puzzle. Engine cost: low if we tie the
existing `floor-lever` interactive prop to a per-chamber "lever state"
boolean and gate the wall on that. ~30 lines.

### G. Conveyor floor (FAMILY: forced movement)

A floor tile that, when the player ends a move on it, automatically
pushes them one more tile in a direction the next frame. Surprisingly
fun, common in older Zelda dungeons. Engine cost: medium — needs to
override the bot's idle state and force a move.

### H. Decorative danger (FAMILY: zero-mechanic ambiance)

Animated props that look threatening but don't damage. Flickering wall
runes, dripping puddles (`puddle` prop is already shimmer-animated), a
chained corpse swinging in the corner (`chains` + `bones`). Zero engine
cost — just decorations. Adds dread without adding mechanics.

## Out of scope (good ideas for later)

- **Projectile dart shooters.** Honestly the most satisfying — but needs
  a real moving-entity system. Defer to a future engine pass after we
  see how the timed-gate hazards play.
- **Dash / jump.** Would need a new input + 2-tile movement logic + a
  cooldown UI. Adds skill expression but ~100 lines.
- **Overworld HP / damage / respawn.** Would change the feel of the game
  — currently dying is impossible outside a boss fight. Could make the
  hazards feel real, but also could feel unfair given the mazes are
  meant to teach. Decide based on playtest.

## Recommended scope for THIS pass

1. **Build the timed-gate primitive** — one new tile type (or `ItemConfig`
   subtype) with `cycle: { offMs, warmMs, onMs }`. ~50 lines of engine
   work. Unlocks A/B/C/D and gives every level a flagship hazard.
2. **Build the pressure-plate primitive** — reuse the `floor-lever` prop;
   tie it to a chamber-local boolean that gates a specific wall section.
   ~30 lines. Adds puzzle variety.
3. **Decorative-only danger** — purely for atmosphere. Zero engine cost.

Skip patrolling sentries, projectiles, dash, and overworld HP for now.

## Per-level hazard themes (proposed)

The hazards should match each level's metaphor, like the bosses do:

| Level | Hazard theme | Suggested mechanic |
|------:|-------------|---------------------|
| 01 Welcome | None or 1 minor flame jet (introductory — show the player hazards exist) | one timed flame jet near the boss door |
| 02 Claude.md | Magic-rot barriers (the wraith's memory drain) | timed magic barriers across narrow corridors in the Stacks |
| 03 Slash | Mechanical crushers (clerical machinery) | a crusher in the Registry that gates one path; a pressure plate elsewhere opens a shortcut |
| 04 MCP | Plasma jets from server racks; cable-arc barriers | alternating-phase plasma jets in the Rack corridor |
| 05 Subagents | Patrolling shadows OR magic-barrier rings (skip patrol if no guard sprite) | timed barriers between workstation pods |
| 06 Throne | All of the above, gauntlet-style — the final approach is dotted with hazards on different cycles | the walk-up to the Overlord is paced by timed jets + crushers in sequence |

## How this changes the maze-design prompts

Each prompt should now ask Design Claude to also include:

- **Hazard placements** — what hazards go where, with cycle timing notes
  ("this jet is on for 2s every 5s, telegraphed by a glow 1s before").
- **Telegraph design** — how the player learns the timing (sound + visual cue).
- **Safe paths** — every hazard must have a clear safe-passage window;
  ideally an alternative slow path around for accessibility.
- **A note** on hazards that are aspirational (out of current engine scope)
  vs. ones that fit the timed-gate primitive.

We'd want to add a small section to each prompt — probably 4-6 lines —
that introduces the hazard kit and asks Design Claude to place 1-3 per
chamber.
