import { LAYOUT_OVERRIDES } from './layoutOverrides';

// ============================================================================
// Level / Chamber data model
//
// A "level" is a themed unit of curriculum (e.g. "Welcome", "Claude.md").
// A level contains one or more "chambers" — discrete rooms connected by doors.
// The player navigates between chambers within a level, and between levels
// once they collect the level key and pass through the locked exit door.
// ============================================================================

export type LevelId =
  | 'orientation'
  | 'welcome'
  | 'claudemd'
  | 'slash'
  | 'mcp'
  | 'subagents'
  | 'final-boss'
  | 'twic-1'
  | 'twic-2'
  | 'twic-3';

export type ChamberId = string;

export type Theme = {
  /** Wall fill color */
  wallColor: string;
  /** Wall accent / shadow */
  wallShadow: string;
  /** Floor base color */
  floorColor: string;
  /** Floor dot accent color */
  floorDot: string;
  /** Per-level accent (used for active-objective glow) */
  accentColor: string;
};

export type DoorTarget =
  | { kind: 'chamber'; chamber: ChamberId }
  | { kind: 'level'; level: LevelId; chamber: ChamberId }
  | { kind: 'end' };

export type DoorConfig = {
  id: string;
  x: number;
  y: number;
  target: DoorTarget;
  /** Where the bot spawns after walking through this door */
  spawnX: number;
  spawnY: number;
  /** Is this door currently locked? */
  locked: boolean;
  /** Does this door unlock when the player collects the level key? */
  requiresLevelKey?: boolean;
};

export type NPCConfig = {
  id: string;
  x: number;
  y: number;
  /** Sprite frame name. Defaults to 'idle_a' (Claude-bot) when omitted. */
  sprite?: string;
  /** Primary color (recolors palette key '1') */
  color: string;
  name: string;
  /** Sequential dialog lines */
  dialog: string[];
};

export type DecorationConfig = {
  x: number;
  y: number;
  sprite: string;
  /** Optional color override applied to palette key '1' */
  tint?: string;
  /**
   * Whether this decoration blocks movement onto its tile.
   * - If set explicitly, that wins.
   * - If omitted, collision falls back to a sprite heuristic: flat floor/wall
   *   decals (puddles, paper, bones, runes…) stay walkable; everything else
   *   (furniture, crates, braziers, bookshelves…) is solid. See
   *   isDecorationSolid in collision.ts.
   */
  solid?: boolean;
};

export type ItemConfig = {
  id: string;
  type: 'challenge' | 'lore' | 'practice';
  x: number;
  y: number;
  sprite: string;
};

export type KeySpawnConfig = {
  x: number;
  y: number;
};

export type ChamberConfig = {
  id: ChamberId;
  level: LevelId;
  /** Display label shown in HUD, e.g. "Antechamber" */
  name: string;
  width: number;
  height: number;
  tiles: number[][];
  items: ItemConfig[];
  doors: DoorConfig[];
  npcs: NPCConfig[];
  decorations: DecorationConfig[];
  /** Default spawn (when level starts in this chamber) */
  spawnX: number;
  spawnY: number;
  /** Where the level key spawns after the boss challenge is passed.
   *  Only set on the chamber that holds the challenge. */
  keySpawn?: KeySpawnConfig;
};

export type LevelConfig = {
  id: LevelId;
  number: number;
  title: string;
  subtitle: string;
  theme: Theme;
  chambers: Record<ChamberId, ChamberConfig>;
  startingChamber: ChamberId;
  /** The chamber that contains the boss challenge + key spawn */
  challengeChamber: ChamberId;
  /** Which learning path this level belongs to. Defaults to 'quest'. */
  track?: 'quest' | 'twic';
};

/** The editable subset of a ChamberConfig that Layout Mode serializes and that
 *  layout overrides replace. `id` / `level` / `name` stay stable from the
 *  builder and are intentionally excluded. */
export type SerializedChamber = {
  width: number;
  height: number;
  tiles: number[][];
  items: ItemConfig[];
  doors: DoorConfig[];
  npcs: NPCConfig[];
  decorations: DecorationConfig[];
  spawnX: number;
  spawnY: number;
  keySpawn?: KeySpawnConfig;
};

// ============================================================================
// Tile builder helpers
// ============================================================================

/** Tile codes:
 *  0 = floor, 1 = wall, 2 = door tile (rendered separately)
 */
function blankTileMap(width: number, height: number): number[][] {
  const tiles: number[][] = [];
  for (let y = 0; y < height; y++) {
    const row: number[] = [];
    for (let x = 0; x < width; x++) {
      if (y === 0 || y === height - 1 || x === 0 || x === width - 1) {
        row.push(1); // perimeter wall
      } else {
        row.push(0); // floor
      }
    }
    tiles.push(row);
  }
  return tiles;
}

/** Set a rectangle of tiles to a value (used for interior walls / mazes). */
function fillRect(tiles: number[][], x0: number, y0: number, x1: number, y1: number, value: number) {
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      if (tiles[y] && tiles[y][x] !== undefined) tiles[y][x] = value;
    }
  }
}

// ============================================================================
// THEMES
// ============================================================================

const THEME_AMBER: Theme = {
  wallColor: '#0C0B0A',
  wallShadow: '#A88030',
  floorColor: '#2E2A1F',
  floorDot: '#E8C57A',
  accentColor: '#E8C57A',
};

const THEME_ORANGE: Theme = {
  wallColor: '#E8633D',
  wallShadow: '#B84A28',
  floorColor: '#3A3A3A',
  floorDot: '#3FB950',
  accentColor: '#E8633D',
};

const THEME_PURPLE: Theme = {
  wallColor: '#0C0B0A',
  wallShadow: '#5E37A6',
  floorColor: '#2E2A36',
  floorDot: '#A972F0',
  accentColor: '#A972F0',
};

const THEME_GREEN: Theme = {
  wallColor: '#0C0B0A',
  wallShadow: '#1F7028',
  floorColor: '#22302A',
  floorDot: '#3FB950',
  accentColor: '#3FB950',
};

const THEME_TEAL: Theme = {
  wallColor: '#0C0B0A',
  wallShadow: '#3D8E80',
  floorColor: '#1D2C2D',
  floorDot: '#6FD7C2',
  accentColor: '#6FD7C2',
};

const THEME_PINK: Theme = {
  wallColor: '#0C0B0A',
  wallShadow: '#A03050',
  floorColor: '#2F2A2E',
  floorDot: '#FF6FA5',
  accentColor: '#FF6FA5',
};

const THEME_CRIMSON: Theme = {
  wallColor: '#0C0B0A',
  wallShadow: '#8A241A',
  floorColor: '#2A1C19',
  floorDot: '#D43A2A',
  accentColor: '#D43A2A',
};

/** Placeholder TWiC theme — style guide will refine. Cool blue, newsroom feel. */
const THEME_NEWSROOM: Theme = {
  wallColor: '#0C0B0A',
  wallShadow: '#2F5BA8',
  floorColor: '#1B2230',
  floorDot: '#6EAAEF',
  accentColor: '#6EAAEF',
};

// ============================================================================
// Level 00: Orientation — single chamber (the Orientation Trail)
// ============================================================================
//
// Level 0 is the day-zero on-ramp the Quest used to assume: what Claude Code
// is, what a terminal/session is, and the core read → plan → review → build →
// ship loop. Single 16×11 chamber with a guide NPC, three lore plaques, one
// practice token, a checkpoint challenge, and a locked exit door to Welcome.

function buildOrientationLevel(): LevelConfig {
  const tW = 16, tH = 11;
  const tiles = blankTileMap(tW, tH);
  // East exit door tile (locked until checkpoint passes and key is collected).
  tiles[5][tW - 1] = 2;

  const trail: ChamberConfig = {
    id: 'orientation-trail',
    level: 'orientation',
    name: 'Orientation Trail',
    width: tW,
    height: tH,
    tiles,
    spawnX: 1,
    spawnY: 5,
    items: [
      { id: 'what-is-it', type: 'lore', x: 3, y: 2, sprite: 'paper' },
      { id: 'terminal-primer', type: 'lore', x: 8, y: 2, sprite: 'paper' },
      { id: 'core-loop', type: 'lore', x: 11, y: 2, sprite: 'paper' },
      { id: 'orientation-practice', type: 'practice', x: 12, y: 7, sprite: 'hint_token' },
      { id: 'orientation-checkpoint', type: 'challenge', x: 13, y: 5, sprite: 'slime_a' },
    ],
    doors: [
      {
        id: 'exit',
        x: tW - 1,
        y: 5,
        target: { kind: 'level', level: 'welcome', chamber: 'welcome-antechamber' },
        spawnX: 1,
        spawnY: 5,
        locked: true,
        requiresLevelKey: true,
      },
    ],
    npcs: [
      {
        id: 'guide-init',
        x: 4,
        y: 5,
        color: '#E8C57A',
        name: 'Init-bot',
        dialog: [],
      },
    ],
    decorations: [],
    keySpawn: { x: 13, y: 6 },
  };

  return {
    id: 'orientation',
    number: 0,
    title: 'Orientation',
    subtitle: 'Before you begin',
    theme: THEME_AMBER,
    chambers: {
      [trail.id]: trail,
    },
    startingChamber: trail.id,
    challengeChamber: trail.id,
  };
}

// ============================================================================
// Level 01: Welcome — 2 chambers (Antechamber + Sanctum)
// ============================================================================

function buildWelcomeLevel(): LevelConfig {
  // ----- Chamber A: Antechamber (19×12) -----
  // New maze: a spine wall at col 9 with a 1-tile pinch at row 6 splits the
  // chamber in two. The player weaves up over the col-5 center pillar, through
  // the pinch past guide-bot, then up over the col-14 center pillar to the
  // east door. Items / lore / decorations are intentionally not placed here
  // yet — they come in a later pass.
  const aW = 19, aH = 12;
  const aTiles = blankTileMap(aW, aH);
  // East door opens (unlocked) to Sanctum
  aTiles[6][aW - 1] = 2;
  // Crate clusters in the four corners
  fillRect(aTiles, 3, 2, 4, 3, 1);
  fillRect(aTiles, 3, 8, 4, 9, 1);
  fillRect(aTiles, 13, 2, 14, 3, 1);
  fillRect(aTiles, 13, 8, 14, 9, 1);
  // Center pillars left + right of the spine
  fillRect(aTiles, 5, 5, 5, 7, 1);
  fillRect(aTiles, 14, 5, 14, 7, 1);
  // Spine wall at col 9, gap at row 6 = the central pinch
  fillRect(aTiles, 9, 1, 9, 5, 1);
  fillRect(aTiles, 9, 7, 9, 10, 1);

  const antechamber: ChamberConfig = {
    id: 'welcome-antechamber',
    level: 'welcome',
    name: 'Antechamber',
    width: aW,
    height: aH,
    tiles: aTiles,
    spawnX: 2,
    spawnY: 6,
    items: [],
    doors: [
      {
        id: 'to-sanctum',
        x: aW - 1,
        y: 6,
        target: { kind: 'chamber', chamber: 'welcome-sanctum' },
        spawnX: 1,
        spawnY: 6,
        locked: false,
      },
    ],
    npcs: [
      {
        id: 'guide-bot',
        x: 11,
        y: 6,
        color: '#3FB950',
        name: 'Guide-bot',
        dialog: [],
      },
    ],
    decorations: [],
  };

  // ----- Chamber B: Sanctum (19×12) -----
  // Boss hall: a single 1×3 approach blocker at col 5 forces the player to
  // weave north before entering the chamber's open east half, where the
  // EMBERLING altar waits at (9, 5). Four corner crate clusters frame the
  // hall as a colonnade. Lore / decorations are not placed here yet — they
  // come in a later pass alongside the bestiary boss-sprite swap.
  const bW = 19, bH = 12;
  const bTiles = blankTileMap(bW, bH);
  // West door (unlocked, back to antechamber)
  bTiles[6][0] = 2;
  // East door (locked, to next level)
  bTiles[6][bW - 1] = 2;
  // Corner crate clusters
  fillRect(bTiles, 3, 2, 4, 3, 1);
  fillRect(bTiles, 3, 9, 4, 10, 1);
  fillRect(bTiles, 12, 2, 13, 3, 1);
  fillRect(bTiles, 12, 9, 13, 10, 1);
  // Approach blocker pillar (1×3) on the entry side
  fillRect(bTiles, 5, 5, 5, 7, 1);

  const sanctum: ChamberConfig = {
    id: 'welcome-sanctum',
    level: 'welcome',
    name: 'Sanctum',
    width: bW,
    height: bH,
    tiles: bTiles,
    spawnX: 1,
    spawnY: 6,
    items: [
      // The EMBERLING boss visual — bestiary slime sprite, animated 2-frame
      // bounce. Interacting opens the boss battle.
      { id: 'terminal', type: 'challenge', x: 9, y: 5, sprite: 'slime_a' },
    ],
    doors: [
      {
        id: 'back',
        x: 0,
        y: 6,
        target: { kind: 'chamber', chamber: 'welcome-antechamber' },
        spawnX: aW - 2,
        spawnY: 6,
        locked: false,
      },
      {
        id: 'exit',
        x: bW - 1,
        y: 6,
        target: { kind: 'level', level: 'claudemd', chamber: 'claudemd-archives' },
        spawnX: 1,
        spawnY: 6,
        locked: true,
        requiresLevelKey: true,
      },
    ],
    npcs: [],
    decorations: [],
    keySpawn: { x: 10, y: 9 },
  };

  return {
    id: 'welcome',
    number: 1,
    title: 'WELCOME',
    subtitle: 'Your first prompt',
    theme: THEME_ORANGE,
    chambers: {
      [antechamber.id]: antechamber,
      [sanctum.id]: sanctum,
    },
    startingChamber: antechamber.id,
    challengeChamber: sanctum.id,
  };
}

// ============================================================================
// Level 02: The Claude.md — 3 chambers (Archives + Stacks + Vault)
// ============================================================================

function buildClaudemdLevel(): LevelConfig {
  // ----- Chamber A: Archives (16×12) -----
  // Reading room. West door enters from Welcome; east door exits to Stacks.
  // Two 1×3 vertical pillars (cols 5 and 10) flank the spine; archivist-bot
  // stands on the spine between them at (8, 6). Lore intentionally not
  // placed yet — re-attaches in the items pass.
  const aW = 16, aH = 12;
  const aTiles = blankTileMap(aW, aH);
  // West door (back to Welcome sanctum)
  aTiles[6][0] = 2;
  // East door (open) to Stacks
  aTiles[6][aW - 1] = 2;
  // Corner crate clusters
  fillRect(aTiles, 2, 2, 3, 3, 1);
  fillRect(aTiles, 2, 9, 3, 10, 1);
  fillRect(aTiles, 12, 2, 13, 3, 1);
  fillRect(aTiles, 12, 9, 13, 10, 1);
  // Flanking vertical pillars on the spine
  fillRect(aTiles, 5, 5, 5, 7, 1);
  fillRect(aTiles, 10, 5, 10, 7, 1);

  const archives: ChamberConfig = {
    id: 'claudemd-archives',
    level: 'claudemd',
    name: 'Archives',
    width: aW,
    height: aH,
    tiles: aTiles,
    spawnX: 1,
    spawnY: 6,
    items: [],
    doors: [
      {
        id: 'back-to-welcome',
        x: 0,
        y: 6,
        target: { kind: 'chamber', chamber: 'welcome-sanctum' },
        spawnX: 17,
        spawnY: 6,
        locked: false,
      },
      {
        id: 'to-stacks',
        x: aW - 1,
        y: 6,
        target: { kind: 'chamber', chamber: 'claudemd-stacks' },
        spawnX: 1,
        spawnY: 6,
        locked: false,
      },
    ],
    npcs: [
      {
        id: 'archivist-bot',
        x: 8,
        y: 6,
        sprite: 'owl',
        color: '#D94DFF',
        name: 'Archivist Owl',
        dialog: [],
      },
    ],
    decorations: [],
  };

  // ----- Chamber B: The Stacks (16×12) -----
  // West entry from Archives, NORTH exit to Vault (the level turns the
  // corner here). A single col-5 pillar on the spine + a horizontal wall
  // row 3 cols 9-12 push the player up and around toward the north door.
  const sW = 16, sH = 12;
  const sTiles = blankTileMap(sW, sH);
  // West door (back to Archives)
  sTiles[6][0] = 2;
  // North door (to Vault)
  sTiles[0][8] = 2;
  // Corner crate clusters
  fillRect(sTiles, 2, 2, 3, 3, 1);
  fillRect(sTiles, 2, 9, 3, 10, 1);
  fillRect(sTiles, 12, 2, 13, 3, 1);
  fillRect(sTiles, 12, 9, 13, 10, 1);
  // Vertical pillar on the spine
  fillRect(sTiles, 5, 5, 5, 7, 1);
  // Horizontal wall row 3, cols 9-12 — forces the climb out north
  fillRect(sTiles, 9, 3, 12, 3, 1);

  const stacks: ChamberConfig = {
    id: 'claudemd-stacks',
    level: 'claudemd',
    name: 'The Stacks',
    width: sW,
    height: sH,
    tiles: sTiles,
    spawnX: 1,
    spawnY: 6,
    items: [],
    doors: [
      {
        id: 'back',
        x: 0,
        y: 6,
        target: { kind: 'chamber', chamber: 'claudemd-archives' },
        spawnX: aW - 2,
        spawnY: 6,
        locked: false,
      },
      {
        id: 'to-vault',
        x: 8,
        y: 0,
        target: { kind: 'chamber', chamber: 'claudemd-vault' },
        spawnX: 8,
        spawnY: 10,
        locked: false,
      },
    ],
    npcs: [],
    decorations: [],
  };

  // ----- Chamber C: Vault (16×12) -----
  // South entry from Stacks; east locked exit to Slash (preserved from
  // existing wiring — slash-foyer expects a west entry).
  // Two staggered horizontal wall rows (3-8, row 8) and (7-12, row 5)
  // force a zigzag approach toward MORDRANG at (8, 3).
  const vW = 16, vH = 12;
  const vTiles = blankTileMap(vW, vH);
  // South door (back to Stacks)
  vTiles[vH - 1][8] = 2;
  // East door (locked) to next level
  vTiles[6][vW - 1] = 2;
  // Corner crate clusters
  fillRect(vTiles, 2, 2, 3, 3, 1);
  fillRect(vTiles, 2, 9, 3, 10, 1);
  fillRect(vTiles, 12, 2, 13, 3, 1);
  fillRect(vTiles, 12, 9, 13, 10, 1);
  // Staggered horizontal walls — zigzag approach
  fillRect(vTiles, 3, 8, 8, 8, 1);
  fillRect(vTiles, 7, 5, 12, 5, 1);

  const vault: ChamberConfig = {
    id: 'claudemd-vault',
    level: 'claudemd',
    name: 'Vault',
    width: vW,
    height: vH,
    tiles: vTiles,
    spawnX: 8,
    spawnY: 10,
    items: [
      // MORDRANG boss visual — bestiary warlock sprite, animated.
      { id: 'scroll', type: 'challenge', x: 8, y: 3, sprite: 'warlock_a' },
    ],
    doors: [
      {
        id: 'back',
        x: 8,
        y: vH - 1,
        target: { kind: 'chamber', chamber: 'claudemd-stacks' },
        spawnX: 8,
        spawnY: 1,
        locked: false,
      },
      {
        id: 'exit',
        x: vW - 1,
        y: 6,
        target: { kind: 'level', level: 'slash', chamber: 'slash-foyer' },
        spawnX: 1,
        spawnY: 5,
        locked: true,
        requiresLevelKey: true,
      },
    ],
    npcs: [],
    decorations: [],
    keySpawn: { x: 8, y: 7 },
  };

  return {
    id: 'claudemd',
    number: 2,
    title: 'THE CLAUDE.MD',
    subtitle: 'Context is everything',
    theme: THEME_PURPLE,
    chambers: {
      [archives.id]: archives,
      [stacks.id]: stacks,
      [vault.id]: vault,
    },
    startingChamber: archives.id,
    challengeChamber: vault.id,
  };
}

// ============================================================================
// Level 03: Slash Commands — 3 chambers (Foyer + Registry + Execution)
// ============================================================================

function buildSlashLevel(): LevelConfig {
  // ----- Chamber A: Prompt Foyer (16×12) -----
  // West entry from claudemd-vault. SOUTH exit to Registry — the level turns
  // the corner the same way L02 did. Clerk Cat NPC on the spine, two interior
  // blockers force a weave.
  const aW = 16, aH = 12;
  const aTiles = blankTileMap(aW, aH);
  // West entry door (from claudemd-vault)
  aTiles[6][0] = 2;
  // South exit door to Registry
  aTiles[aH - 1][8] = 2;
  // Corner crates
  fillRect(aTiles, 2, 2, 3, 3, 1);
  fillRect(aTiles, 2, 9, 3, 10, 1);
  fillRect(aTiles, 12, 2, 13, 3, 1);
  fillRect(aTiles, 12, 9, 13, 10, 1);
  // Vertical pillar on spine
  fillRect(aTiles, 5, 5, 5, 7, 1);
  // Horizontal wall row 7 cols 9-12 — pushes the player south
  fillRect(aTiles, 9, 7, 12, 7, 1);

  const foyer: ChamberConfig = {
    id: 'slash-foyer',
    level: 'slash',
    name: 'Prompt Foyer',
    width: aW,
    height: aH,
    tiles: aTiles,
    spawnX: 1,
    spawnY: 6,
    items: [],
    doors: [
      {
        id: 'back-to-claudemd',
        x: 0,
        y: 6,
        target: { kind: 'chamber', chamber: 'claudemd-vault' },
        spawnX: 14,
        spawnY: 6,
        locked: false,
      },
      {
        id: 'to-registry',
        x: 8,
        y: aH - 1,
        target: { kind: 'chamber', chamber: 'slash-registry' },
        spawnX: 8,
        spawnY: 1,
        locked: false,
      },
    ],
    npcs: [
      {
        id: 'clerk-bot',
        x: 6,
        y: 6,
        sprite: 'cat',
        color: '#3FB950',
        name: 'Clerk Cat',
        dialog: [],
      },
    ],
    decorations: [],
  };

  // ----- Chamber B: The Registry (16×12) -----
  // North entry from Foyer; east exit to Execution. Filing-cabinet maze:
  // horizontal wall row 4 cols 4-8 and vertical wall col 10 rows 5-8.
  const rW = 16, rH = 12;
  const rTiles = blankTileMap(rW, rH);
  // North door (back to Foyer)
  rTiles[0][8] = 2;
  // East door to Execution
  rTiles[6][rW - 1] = 2;
  // Corner crates
  fillRect(rTiles, 2, 2, 3, 3, 1);
  fillRect(rTiles, 2, 9, 3, 10, 1);
  fillRect(rTiles, 12, 2, 13, 3, 1);
  fillRect(rTiles, 12, 9, 13, 10, 1);
  // Interior blockers
  fillRect(rTiles, 4, 4, 8, 4, 1);
  fillRect(rTiles, 10, 5, 10, 8, 1);

  const registry: ChamberConfig = {
    id: 'slash-registry',
    level: 'slash',
    name: 'Registry',
    width: rW,
    height: rH,
    tiles: rTiles,
    spawnX: 8,
    spawnY: 1,
    items: [],
    doors: [
      {
        id: 'back',
        x: 8,
        y: 0,
        target: { kind: 'chamber', chamber: 'slash-foyer' },
        spawnX: 8,
        spawnY: aH - 2,
        locked: false,
      },
      {
        id: 'to-execution',
        x: rW - 1,
        y: 6,
        target: { kind: 'chamber', chamber: 'slash-execution' },
        spawnX: 1,
        spawnY: 6,
        locked: false,
      },
    ],
    npcs: [],
    decorations: [],
  };

  // ----- Chamber C: Execution (16×12) -----
  // West entry from Registry; east locked exit to MCP Hub.
  // Single vertical pillar at col 5 rows 5-7; goblin altar at (8, 6).
  const eW = 16, eH = 12;
  const eTiles = blankTileMap(eW, eH);
  // West door (back to Registry)
  eTiles[6][0] = 2;
  // East door (locked) to MCP
  eTiles[6][eW - 1] = 2;
  // Corner crates
  fillRect(eTiles, 2, 2, 3, 3, 1);
  fillRect(eTiles, 2, 9, 3, 10, 1);
  fillRect(eTiles, 12, 2, 13, 3, 1);
  fillRect(eTiles, 12, 9, 13, 10, 1);
  // Vertical pillar
  fillRect(eTiles, 5, 5, 5, 7, 1);

  const execution: ChamberConfig = {
    id: 'slash-execution',
    level: 'slash',
    name: 'Execution',
    width: eW,
    height: eH,
    tiles: eTiles,
    spawnX: 1,
    spawnY: 6,
    items: [
      // GRIST boss — bestiary goblin sprite.
      { id: 'terminal', type: 'challenge', x: 8, y: 6, sprite: 'goblin_a' },
    ],
    doors: [
      {
        id: 'back',
        x: 0,
        y: 6,
        target: { kind: 'chamber', chamber: 'slash-registry' },
        spawnX: rW - 2,
        spawnY: 6,
        locked: false,
      },
      {
        id: 'exit',
        x: eW - 1,
        y: 6,
        target: { kind: 'level', level: 'mcp', chamber: 'mcp-hub' },
        spawnX: 8,
        spawnY: 1,
        locked: true,
        requiresLevelKey: true,
      },
    ],
    npcs: [],
    decorations: [],
    keySpawn: { x: 8, y: 9 },
  };

  return {
    id: 'slash',
    number: 3,
    title: 'SLASH COMMANDS',
    subtitle: 'Summon any prompt',
    theme: THEME_GREEN,
    chambers: {
      [foyer.id]: foyer,
      [registry.id]: registry,
      [execution.id]: execution,
    },
    startingChamber: foyer.id,
    challengeChamber: execution.id,
  };
}

// ============================================================================
// Level 04: MCP Servers — 3 chambers (Hub + Server Rack + Integration)
// ============================================================================

function buildMcpLevel(): LevelConfig {
  // ----- Chamber A: Hub (16×12) -----
  // NORTH entry from slash (the level drops in from above). South exit to
  // Server Rack. Two horizontal walls (cols 4-8 row 5, cols 7-11 row 8)
  // stagger the descent past the Connector Duck.
  const aW = 16, aH = 12;
  const aTiles = blankTileMap(aW, aH);
  // North entry door (from slash-execution)
  aTiles[0][8] = 2;
  // South exit door to Server Rack
  aTiles[aH - 1][4] = 2;
  // Corner crates
  fillRect(aTiles, 2, 2, 3, 3, 1);
  fillRect(aTiles, 2, 9, 3, 10, 1);
  fillRect(aTiles, 12, 2, 13, 3, 1);
  fillRect(aTiles, 12, 9, 13, 10, 1);
  // Staggered horizontal walls
  fillRect(aTiles, 4, 5, 8, 5, 1);
  fillRect(aTiles, 7, 8, 11, 8, 1);

  const hub: ChamberConfig = {
    id: 'mcp-hub',
    level: 'mcp',
    name: 'Hub',
    width: aW,
    height: aH,
    tiles: aTiles,
    spawnX: 8,
    spawnY: 1,
    items: [],
    doors: [
      {
        id: 'back-to-slash',
        x: 8,
        y: 0,
        target: { kind: 'chamber', chamber: 'slash-execution' },
        spawnX: 14,
        spawnY: 6,
        locked: false,
      },
      {
        id: 'to-rack',
        x: 4,
        y: aH - 1,
        target: { kind: 'chamber', chamber: 'mcp-rack' },
        spawnX: 8,
        spawnY: 1,
        locked: false,
      },
    ],
    npcs: [
      {
        id: 'connector-bot',
        x: 8,
        y: 6,
        sprite: 'duck',
        color: '#00D4AA',
        name: 'Connector Duck',
        dialog: [],
      },
    ],
    decorations: [],
  };

  // ----- Chamber B: Server Rack (16×12) -----
  // North entry from Hub; east exit to Integration. Vertical + horizontal
  // wall stack carves a turn through the rack.
  const rW = 16, rH = 12;
  const rTiles = blankTileMap(rW, rH);
  // North entry (back to Hub)
  rTiles[0][8] = 2;
  // East exit door to Integration (row 8 per design corridor location)
  rTiles[8][rW - 1] = 2;
  // Corner crates
  fillRect(rTiles, 2, 2, 3, 3, 1);
  fillRect(rTiles, 2, 9, 3, 10, 1);
  fillRect(rTiles, 12, 2, 13, 3, 1);
  fillRect(rTiles, 12, 9, 13, 10, 1);
  // Interior racks: vertical col 6 rows 5-8 + horizontal row 9 cols 8-12
  fillRect(rTiles, 6, 5, 6, 8, 1);
  fillRect(rTiles, 8, 9, 12, 9, 1);

  const rack: ChamberConfig = {
    id: 'mcp-rack',
    level: 'mcp',
    name: 'Server Rack',
    width: rW,
    height: rH,
    tiles: rTiles,
    spawnX: 8,
    spawnY: 1,
    items: [],
    doors: [
      {
        id: 'back',
        x: 8,
        y: 0,
        target: { kind: 'chamber', chamber: 'mcp-hub' },
        spawnX: 4,
        spawnY: aH - 2,
        locked: false,
      },
      {
        id: 'to-integration',
        x: rW - 1,
        y: 8,
        target: { kind: 'chamber', chamber: 'mcp-integration' },
        spawnX: 1,
        spawnY: 8,
        locked: false,
      },
    ],
    npcs: [],
    decorations: [],
  };

  // ----- Chamber C: Integration (16×12) -----
  // West entry from Rack; east locked exit to Subagents (preserves cross-level
  // wiring even though the design has a south exit — subagents-lobby still
  // expects a west entry).
  // Two vertical pillars (cols 5 and 9, rows 5-7) flank a central aisle where
  // VORTHEX/ghost waits at (7, 6).
  const iW = 16, iH = 12;
  const iTiles = blankTileMap(iW, iH);
  // West entry door (from Rack)
  iTiles[8][0] = 2;
  // East locked door to Subagents
  iTiles[6][iW - 1] = 2;
  // Corner crates
  fillRect(iTiles, 2, 2, 3, 3, 1);
  fillRect(iTiles, 2, 9, 3, 10, 1);
  fillRect(iTiles, 12, 2, 13, 3, 1);
  fillRect(iTiles, 12, 9, 13, 10, 1);
  // Twin vertical pillars
  fillRect(iTiles, 5, 5, 5, 7, 1);
  fillRect(iTiles, 9, 5, 9, 7, 1);

  const integration: ChamberConfig = {
    id: 'mcp-integration',
    level: 'mcp',
    name: 'Integration',
    width: iW,
    height: iH,
    tiles: iTiles,
    spawnX: 1,
    spawnY: 8,
    items: [
      // VORTHEX boss — bestiary ghost sprite.
      { id: 'terminal', type: 'challenge', x: 7, y: 6, sprite: 'ghost_a' },
    ],
    doors: [
      {
        id: 'back',
        x: 0,
        y: 8,
        target: { kind: 'chamber', chamber: 'mcp-rack' },
        spawnX: rW - 2,
        spawnY: 8,
        locked: false,
      },
      {
        id: 'exit',
        x: iW - 1,
        y: 6,
        target: { kind: 'level', level: 'subagents', chamber: 'subagents-lobby' },
        spawnX: 1,
        spawnY: 6,
        locked: true,
        requiresLevelKey: true,
      },
    ],
    npcs: [],
    decorations: [],
    keySpawn: { x: 7, y: 9 },
  };

  return {
    id: 'mcp',
    number: 4,
    title: 'MCP SERVERS',
    subtitle: 'Tools without walls',
    theme: THEME_TEAL,
    chambers: {
      [hub.id]: hub,
      [rack.id]: rack,
      [integration.id]: integration,
    },
    startingChamber: hub.id,
    challengeChamber: integration.id,
  };
}

// ============================================================================
// Level 05: Subagents — 3 chambers (Lobby + Agent Pool + Briefing)
// ============================================================================

function buildSubagentsLevel(): LevelConfig {
  // ----- Chamber A: Mission Lobby (16×12) -----
  // West entry from mcp-integration; NORTH exit to Agent Pool. Scout +
  // Planner flank the entrance on the spine. A 4-wide horizontal blocker
  // at row 8 cols 8-11 pushes the path back north toward the exit.
  const aW = 16, aH = 12;
  const aTiles = blankTileMap(aW, aH);
  // West entry door
  aTiles[6][0] = 2;
  // North exit door to Pool
  aTiles[0][8] = 2;
  // Corner crates
  fillRect(aTiles, 2, 2, 3, 3, 1);
  fillRect(aTiles, 2, 9, 3, 10, 1);
  fillRect(aTiles, 12, 2, 13, 3, 1);
  fillRect(aTiles, 12, 9, 13, 10, 1);
  // Horizontal blocker
  fillRect(aTiles, 8, 8, 11, 8, 1);

  const lobby: ChamberConfig = {
    id: 'subagents-lobby',
    level: 'subagents',
    name: 'Mission Lobby',
    width: aW,
    height: aH,
    tiles: aTiles,
    spawnX: 1,
    spawnY: 6,
    items: [],
    doors: [
      {
        id: 'back-to-mcp',
        x: 0,
        y: 6,
        target: { kind: 'chamber', chamber: 'mcp-integration' },
        spawnX: 14,
        spawnY: 6,
        locked: false,
      },
      {
        id: 'to-pool',
        x: 8,
        y: 0,
        target: { kind: 'chamber', chamber: 'subagents-pool' },
        spawnX: 8,
        spawnY: 10,
        locked: false,
      },
    ],
    npcs: [
      {
        id: 'scout-bot',
        x: 5,
        y: 6,
        color: '#3FB950',
        name: 'Scout-bot',
        dialog: [],
      },
      {
        id: 'planner-bot',
        x: 11,
        y: 6,
        color: '#6BA8DD',
        name: 'Planner-bot',
        dialog: [],
      },
    ],
    decorations: [],
  };

  // ----- Chamber B: Agent Pool (16×12) -----
  // South entry from Lobby; east exit to Briefing. Reviewer + Debugger man
  // the upper pods. A vertical pillar at col 6 rows 5-7 splits the central
  // walkway between them.
  const pW = 16, pH = 12;
  const pTiles = blankTileMap(pW, pH);
  // South entry door (back to Lobby)
  pTiles[pH - 1][8] = 2;
  // East exit door to Briefing
  pTiles[6][pW - 1] = 2;
  // Corner crates
  fillRect(pTiles, 2, 2, 3, 3, 1);
  fillRect(pTiles, 2, 9, 3, 10, 1);
  fillRect(pTiles, 12, 2, 13, 3, 1);
  fillRect(pTiles, 12, 9, 13, 10, 1);
  // Vertical pillar
  fillRect(pTiles, 6, 5, 6, 7, 1);

  const pool: ChamberConfig = {
    id: 'subagents-pool',
    level: 'subagents',
    name: 'Agent Pool',
    width: pW,
    height: pH,
    tiles: pTiles,
    spawnX: 8,
    spawnY: 10,
    items: [],
    doors: [
      {
        id: 'back',
        x: 8,
        y: pH - 1,
        target: { kind: 'chamber', chamber: 'subagents-lobby' },
        spawnX: 8,
        spawnY: 1,
        locked: false,
      },
      {
        id: 'to-briefing',
        x: pW - 1,
        y: 6,
        target: { kind: 'chamber', chamber: 'subagents-briefing' },
        spawnX: 8,
        spawnY: 1,
        locked: false,
      },
    ],
    npcs: [
      {
        id: 'reviewer-bot',
        x: 3,
        y: 5,
        color: '#F0C040',
        name: 'Reviewer-bot',
        dialog: [],
      },
      {
        id: 'debugger-bot',
        x: 10,
        y: 5,
        color: '#FF6B8A',
        name: 'Debugger-bot',
        dialog: [],
      },
    ],
    decorations: [],
  };

  // ----- Chamber C: Briefing Room (16×12) -----
  // North entry from Pool's east-bridge corridor; east locked exit to the
  // final boss throne. Skeleton (LICH QUORUM) altar at (8, 6).
  const bW = 16, bH = 12;
  const bTiles = blankTileMap(bW, bH);
  // North entry door (from Pool)
  bTiles[0][8] = 2;
  // East locked exit door to Throne
  bTiles[6][bW - 1] = 2;
  // Corner crates
  fillRect(bTiles, 2, 2, 3, 3, 1);
  fillRect(bTiles, 2, 9, 3, 10, 1);
  fillRect(bTiles, 12, 2, 13, 3, 1);
  fillRect(bTiles, 12, 9, 13, 10, 1);
  // Vertical pillar
  fillRect(bTiles, 6, 5, 6, 7, 1);

  const briefing: ChamberConfig = {
    id: 'subagents-briefing',
    level: 'subagents',
    name: 'Briefing Room',
    width: bW,
    height: bH,
    tiles: bTiles,
    spawnX: 8,
    spawnY: 1,
    items: [
      // LICH QUORUM boss — bestiary skeleton sprite.
      { id: 'terminal', type: 'challenge', x: 8, y: 6, sprite: 'skeleton_a' },
    ],
    doors: [
      {
        id: 'back',
        x: 8,
        y: 0,
        target: { kind: 'chamber', chamber: 'subagents-pool' },
        spawnX: pW - 2,
        spawnY: 6,
        locked: false,
      },
      {
        id: 'exit',
        x: bW - 1,
        y: 6,
        target: { kind: 'level', level: 'final-boss', chamber: 'final-boss-throne' },
        spawnX: 1,
        spawnY: 8,
        locked: true,
        requiresLevelKey: true,
      },
    ],
    npcs: [],
    decorations: [],
    keySpawn: { x: 8, y: 9 },
  };

  return {
    id: 'subagents',
    number: 5,
    title: 'SUBAGENTS',
    subtitle: 'You are not alone',
    theme: THEME_PINK,
    chambers: {
      [lobby.id]: lobby,
      [pool.id]: pool,
      [briefing.id]: briefing,
    },
    startingChamber: lobby.id,
    challengeChamber: briefing.id,
  };
}

// ============================================================================
// Level 06: Final Boss — single walkable throne room
// ============================================================================

function buildFinalBossLevel(): LevelConfig {
  // ----- Throne Room (28×16) — the ceremonial approach. -----
  // Single bespoke chamber. The player enters west at (0, 8), walks the
  // straight sacred aisle east past 4 colonnade pillar pairs at cols 5/9/13/17,
  // crosses the dais opening at col 22, and reaches the OVERLORD altar at
  // (18, 9) with the dragon sprite waiting on the throne dais.
  const tW = 28, tH = 16;
  const tTiles = blankTileMap(tW, tH);
  // West entry door (from subagents-briefing)
  tTiles[8][0] = 2;
  // East end-game door (locked until dragon falls)
  tTiles[8][tW - 1] = 2;
  // Colonnade pillars — 4 pairs flanking the central aisle.
  fillRect(tTiles, 5, 3, 5, 4, 1);
  fillRect(tTiles, 9, 3, 9, 4, 1);
  fillRect(tTiles, 13, 3, 13, 4, 1);
  fillRect(tTiles, 17, 3, 17, 4, 1);
  fillRect(tTiles, 5, 11, 5, 12, 1);
  fillRect(tTiles, 9, 11, 9, 12, 1);
  fillRect(tTiles, 13, 11, 13, 12, 1);
  fillRect(tTiles, 17, 11, 17, 12, 1);
  // Throne dais endcap walls at col 22 (single-tile walls at top + bottom).
  fillRect(tTiles, 22, 2, 22, 2, 1);
  fillRect(tTiles, 22, 13, 22, 13, 1);

  const throne: ChamberConfig = {
    id: 'final-boss-throne',
    level: 'final-boss',
    name: 'Throne Room',
    width: tW,
    height: tH,
    tiles: tTiles,
    spawnX: 1,
    spawnY: 8,
    items: [
      // OVERLORD altar — bestiary dragon sprite (largest in the set).
      // Interact to start the final boss fight.
      { id: 'overlord-altar', type: 'challenge', x: 18, y: 9, sprite: 'dragon_a' },
    ],
    doors: [
      {
        id: 'back',
        x: 0,
        y: 8,
        target: { kind: 'chamber', chamber: 'subagents-briefing' },
        spawnX: 14,
        spawnY: 6,
        locked: false,
      },
      {
        id: 'exit',
        x: tW - 1,
        y: 8,
        target: { kind: 'end' },
        spawnX: 0,
        spawnY: 0,
        locked: true,
        requiresLevelKey: true,
      },
    ],
    npcs: [],
    decorations: [],
    keySpawn: { x: 20, y: 9 },
  };

  return {
    id: 'final-boss',
    number: 6,
    title: 'THE THRONE',
    subtitle: 'final confrontation',
    theme: THEME_CRIMSON,
    chambers: {
      [throne.id]: throne,
    },
    startingChamber: throne.id,
    challengeChamber: throne.id,
  };
}

// ============================================================================
// Export
// ============================================================================

/** Pull the editable subset out of a full ChamberConfig (deep-copied). */
export function serializeChamber(c: ChamberConfig): SerializedChamber {
  return JSON.parse(JSON.stringify({
    width: c.width,
    height: c.height,
    tiles: c.tiles,
    items: c.items,
    doors: c.doors,
    npcs: c.npcs,
    decorations: c.decorations,
    spawnX: c.spawnX,
    spawnY: c.spawnY,
    keySpawn: c.keySpawn,
  }));
}

/** If a committed override exists for this chamber, replace its editable
 *  fields (deep-copied so callers can't mutate the override constant). */
function applyOverride(c: ChamberConfig): ChamberConfig {
  const o = LAYOUT_OVERRIDES[c.id];
  if (!o) return c;
  return { ...c, ...(JSON.parse(JSON.stringify(o)) as SerializedChamber) };
}

function withOverrides(level: LevelConfig): LevelConfig {
  const chambers: Record<ChamberId, ChamberConfig> = {};
  for (const [id, ch] of Object.entries(level.chambers)) {
    chambers[id] = applyOverride(ch);
  }
  return { ...level, chambers };
}

// ============================================================================
// TWiC — "This Week in Claude" template floor
//
// Three geometrically IDENTICAL chambers, one per level. Mount points are
// hard-coded at fixed positions and reused every week. Content (intro, NPC
// lesson, 2 lore books, practice, door challenge) is swapped weekly by a
// later-built routine. See plan / spec for the mount contract.
// ============================================================================

const TWIC_ROOM_W = 16;
const TWIC_ROOM_H = 12;

/** Fixed mount-point coordinates — IDENTICAL across all three TWiC rooms. */
const TWIC_MOUNTS = {
  spawnX: 1,
  spawnY: 6,
  npcX: 8,
  npcY: 5,
  lore1X: 5, lore1Y: 3,
  lore2X: 11, lore2Y: 3,
  practiceX: 8, practiceY: 8,
  /** Challenge terminal — tile-adjacent to the locked exit door. */
  terminalX: 13, terminalY: 6,
  keySpawnX: 13, keySpawnY: 7,
  /** Exit door on east wall. */
  exitX: 15, exitY: 6,
} as const;

interface TwicRoomInputs {
  levelId: 'twic-1' | 'twic-2' | 'twic-3';
  chamberId: string;
  name: string;
  /** id of the NPC sprite that mounts the conversation. */
  npcId: string;
  /** display name for the NPC sprite. */
  npcName: string;
  /** ids of the two lore books in this room (Book 1 = core, Book 2 = why). */
  loreIds: [string, string];
  /** id of the practice item — matches PracticeContent.id. */
  practiceId: string;
  /** Where the exit door leads. Room-3 sends the player to `{kind:'end'}`. */
  exitTarget: DoorTarget;
}

/** Build one identical TWiC chamber. All three rooms call this. */
function buildTwicRoom(inputs: TwicRoomInputs): ChamberConfig {
  const tiles = blankTileMap(TWIC_ROOM_W, TWIC_ROOM_H);
  // Open exit door tile on east wall.
  tiles[TWIC_MOUNTS.exitY][TWIC_MOUNTS.exitX] = 2;
  return {
    id: inputs.chamberId,
    level: inputs.levelId,
    name: inputs.name,
    width: TWIC_ROOM_W,
    height: TWIC_ROOM_H,
    tiles,
    items: [
      // Visible boss sprite (slime, matching the battle's `spriteKey: 'slime'`)
      // so the player sees something that obviously needs fighting — not a
      // benign-looking CRT terminal they'd walk past. The challenge item's
      // INTERACTION behavior is unchanged; only the in-room sprite swaps.
      { id: 'terminal', type: 'challenge', x: TWIC_MOUNTS.terminalX, y: TWIC_MOUNTS.terminalY, sprite: 'slime_a' },
      { id: inputs.loreIds[0], type: 'lore', x: TWIC_MOUNTS.lore1X, y: TWIC_MOUNTS.lore1Y, sprite: 'paper' },
      { id: inputs.loreIds[1], type: 'lore', x: TWIC_MOUNTS.lore2X, y: TWIC_MOUNTS.lore2Y, sprite: 'paper' },
      { id: inputs.practiceId, type: 'practice', x: TWIC_MOUNTS.practiceX, y: TWIC_MOUNTS.practiceY, sprite: 'hint_token' },
    ],
    doors: [
      {
        id: 'exit',
        x: TWIC_MOUNTS.exitX,
        y: TWIC_MOUNTS.exitY,
        target: inputs.exitTarget,
        spawnX: 1,
        spawnY: 6,
        locked: true,
        requiresLevelKey: true,
      },
    ],
    npcs: [
      {
        id: inputs.npcId,
        x: TWIC_MOUNTS.npcX,
        y: TWIC_MOUNTS.npcY,
        color: THEME_NEWSROOM.accentColor,
        name: inputs.npcName,
        dialog: [],
      },
    ],
    decorations: [],
    spawnX: TWIC_MOUNTS.spawnX,
    spawnY: TWIC_MOUNTS.spawnY,
    keySpawn: { x: TWIC_MOUNTS.keySpawnX, y: TWIC_MOUNTS.keySpawnY },
  };
}

function buildTwic1Level(): LevelConfig {
  const chamber = buildTwicRoom({
    levelId: 'twic-1',
    chamberId: 'twic-room-1',
    name: 'This Week · Room 1',
    npcId: 'twic-npc-1',
    npcName: 'Beat Reporter',
    loreIds: ['twic-1-lore-a', 'twic-1-lore-b'],
    practiceId: 'twic-1-practice',
    exitTarget: { kind: 'level', level: 'twic-2', chamber: 'twic-room-2' },
  });
  return {
    id: 'twic-1',
    number: 7,
    title: 'TWiC · Feature A',
    subtitle: 'This week in Claude',
    theme: THEME_NEWSROOM,
    chambers: { [chamber.id]: chamber },
    startingChamber: chamber.id,
    challengeChamber: chamber.id,
    track: 'twic',
  };
}

function buildTwic2Level(): LevelConfig {
  const chamber = buildTwicRoom({
    levelId: 'twic-2',
    chamberId: 'twic-room-2',
    name: 'This Week · Room 2',
    npcId: 'twic-npc-2',
    npcName: 'Beat Reporter',
    loreIds: ['twic-2-lore-a', 'twic-2-lore-b'],
    practiceId: 'twic-2-practice',
    exitTarget: { kind: 'level', level: 'twic-3', chamber: 'twic-room-3' },
  });
  return {
    id: 'twic-2',
    number: 8,
    title: 'TWiC · Feature B',
    subtitle: 'This week in Claude',
    theme: THEME_NEWSROOM,
    chambers: { [chamber.id]: chamber },
    startingChamber: chamber.id,
    challengeChamber: chamber.id,
    track: 'twic',
  };
}

function buildTwic3Level(): LevelConfig {
  const chamber = buildTwicRoom({
    levelId: 'twic-3',
    chamberId: 'twic-room-3',
    name: 'This Week · Room 3',
    npcId: 'twic-npc-3',
    npcName: 'Beat Reporter',
    loreIds: ['twic-3-lore-a', 'twic-3-lore-b'],
    practiceId: 'twic-3-practice',
    // Final room: exit drops the player into the completion stamp screen
    // (GAME_OVER → TwicStampScreen via the currentTrack switch in App.tsx).
    exitTarget: { kind: 'end' },
  });
  return {
    id: 'twic-3',
    number: 9,
    title: 'TWiC · Feature C',
    subtitle: 'This week in Claude',
    theme: THEME_NEWSROOM,
    chambers: { [chamber.id]: chamber },
    startingChamber: chamber.id,
    challengeChamber: chamber.id,
    track: 'twic',
  };
}

/** Hand-authored levels BEFORE any layout overrides — used by getBaseChamber()
 *  so Layout Mode's "Reset to source" can restore the builder geometry. */
const BASE_LEVEL_CONFIGS: Record<LevelId, LevelConfig> = {
  orientation: buildOrientationLevel(),
  welcome: buildWelcomeLevel(),
  claudemd: buildClaudemdLevel(),
  slash: buildSlashLevel(),
  mcp: buildMcpLevel(),
  subagents: buildSubagentsLevel(),
  'final-boss': buildFinalBossLevel(),
  'twic-1': buildTwic1Level(),
  'twic-2': buildTwic2Level(),
  'twic-3': buildTwic3Level(),
};

export const LEVEL_CONFIGS: Record<LevelId, LevelConfig> = {
  orientation: withOverrides(BASE_LEVEL_CONFIGS.orientation),
  welcome: withOverrides(BASE_LEVEL_CONFIGS.welcome),
  claudemd: withOverrides(BASE_LEVEL_CONFIGS.claudemd),
  slash: withOverrides(BASE_LEVEL_CONFIGS.slash),
  mcp: withOverrides(BASE_LEVEL_CONFIGS.mcp),
  subagents: withOverrides(BASE_LEVEL_CONFIGS.subagents),
  'final-boss': withOverrides(BASE_LEVEL_CONFIGS['final-boss']),
  'twic-1': withOverrides(BASE_LEVEL_CONFIGS['twic-1']),
  'twic-2': withOverrides(BASE_LEVEL_CONFIGS['twic-2']),
  'twic-3': withOverrides(BASE_LEVEL_CONFIGS['twic-3']),
};

/** Convenience: lookup a chamber by ID across all levels. */
export function getChamber(chamberId: ChamberId): ChamberConfig | null {
  for (const level of Object.values(LEVEL_CONFIGS)) {
    if (level.chambers[chamberId]) return level.chambers[chamberId];
  }
  return null;
}

/** The hand-authored (pre-override) chamber, for Layout Mode "Reset to source". */
export function getBaseChamber(chamberId: ChamberId): ChamberConfig | null {
  for (const level of Object.values(BASE_LEVEL_CONFIGS)) {
    if (level.chambers[chamberId]) return level.chambers[chamberId];
  }
  return null;
}

/** All chamber IDs (used to seed per-chamber state). */
export const ALL_CHAMBER_IDS: ChamberId[] = Object.values(LEVEL_CONFIGS).flatMap(
  l => Object.keys(l.chambers),
);
