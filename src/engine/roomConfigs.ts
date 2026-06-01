// ============================================================================
// Level / Chamber data model
//
// A "level" is a themed unit of curriculum (e.g. "Welcome", "Claude.md").
// A level contains one or more "chambers" — discrete rooms connected by doors.
// The player navigates between chambers within a level, and between levels
// once they collect the level key and pass through the locked exit door.
// ============================================================================

export type LevelId =
  | 'welcome'
  | 'claudemd'
  | 'slash'
  | 'mcp'
  | 'subagents'
  | 'final-boss';

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

const THEME_ORANGE: Theme = {
  wallColor: '#E8633D',
  wallShadow: '#B84A28',
  floorColor: '#3A3A3A',
  floorDot: '#3FB950',
  accentColor: '#E8633D',
};

const THEME_PURPLE: Theme = {
  wallColor: '#D94DFF',
  wallShadow: '#7A2A99',
  floorColor: '#2A1A33',
  floorDot: '#FFE066',
  accentColor: '#FFE066',
};

const THEME_GREEN: Theme = {
  wallColor: '#3FB950',
  wallShadow: '#1F7028',
  floorColor: '#152A1A',
  floorDot: '#E8E8E8',
  accentColor: '#E8E8E8',
};

const THEME_TEAL: Theme = {
  wallColor: '#00D4AA',
  wallShadow: '#007A5F',
  floorColor: '#0F2A28',
  floorDot: '#F0C040',
  accentColor: '#F0C040',
};

const THEME_PINK: Theme = {
  wallColor: '#FF6B8A',
  wallShadow: '#A03050',
  floorColor: '#2A1218',
  floorDot: '#00D4AA',
  accentColor: '#00D4AA',
};

const THEME_CRIMSON: Theme = {
  wallColor: '#A0142F',
  wallShadow: '#5A0A1A',
  floorColor: '#1A0A0F',
  floorDot: '#F85149',
  accentColor: '#F85149',
};

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
        dialog: [
          "Hey, operator. Fresh session? Good. Let's set you up before you wreck something.",
          'Four permission modes. PLAN — read-only, drafts an approach. ACCEPT-EDITS — writes for you, review by diff. AUTO — runs free, a classifier watches. ASK — confirms each step.',
          "Shift+Tab cycles them. Default to PLAN when you're walking into unfamiliar code. ACCEPT-EDITS when you're iterating. AUTO for long boring loops you trust the direction on.",
          "Building a one-pager for a client? Describe what you want in English. Review the plan. Approve. Vercel hosts it for free. Same as briefing a junior consultant — except this one types.",
        ],
      },
    ],
    decorations: [],
  };

  // ----- Chamber B: Sanctum (18×12) -----
  const bW = 18, bH = 12;
  const bTiles = blankTileMap(bW, bH);
  // West door (unlocked, back to antechamber)
  bTiles[6][0] = 2;
  // East door (locked, to next level)
  bTiles[6][bW - 1] = 2;
  // Interior wall columns forming an L-path
  fillRect(bTiles, 7, 2, 7, 7, 1);   // vertical wall col 7 rows 2-7
  fillRect(bTiles, 8, 7, 11, 7, 1);  // horizontal wall row 7 cols 8-11
  fillRect(bTiles, 12, 3, 12, 6, 1); // vertical wall col 12 rows 3-6 — creates dead-end pocket

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
      { id: 'terminal', type: 'challenge', x: 14, y: 3, sprite: 'crt_monitor' },
      { id: 'side-note', type: 'lore', x: 14, y: 9, sprite: 'paper' },
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
  // ----- Chamber A: Archives (22×12) -----
  const aW = 22, aH = 12;
  const aTiles = blankTileMap(aW, aH);
  // North door (open) to Stacks
  aTiles[0][11] = 2;
  // Library carrels: 8 desk pillars create aisles toward Archivist Owl + N door.
  // Lore old-note (5,3) in NW alcove; log (17,4) in NE alcove. Owl on spine.
  fillRect(aTiles, 4, 1, 4, 4, 1);
  fillRect(aTiles, 8, 1, 8, 4, 1);
  fillRect(aTiles, 13, 1, 13, 4, 1);
  fillRect(aTiles, 18, 1, 18, 4, 1);
  fillRect(aTiles, 4, 7, 4, 10, 1);
  fillRect(aTiles, 8, 7, 8, 10, 1);
  fillRect(aTiles, 13, 7, 13, 10, 1);
  fillRect(aTiles, 18, 7, 18, 10, 1);
  // East door (closed corridor to nowhere — purely decorative break)

  const archives: ChamberConfig = {
    id: 'claudemd-archives',
    level: 'claudemd',
    name: 'Archives',
    width: aW,
    height: aH,
    tiles: aTiles,
    spawnX: 2,
    spawnY: 6,
    items: [
      { id: 'old-note', type: 'lore', x: 5, y: 3, sprite: 'paper' },
      { id: 'log', type: 'lore', x: 17, y: 4, sprite: 'scroll' },
    ],
    doors: [
      {
        id: 'to-stacks',
        x: 11,
        y: 0,
        target: { kind: 'chamber', chamber: 'claudemd-stacks' },
        spawnX: 9,
        spawnY: 12,
        locked: false,
      },
    ],
    npcs: [
      {
        id: 'archivist-bot',
        x: 11,
        y: 8,
        sprite: 'owl',
        color: '#D94DFF',
        name: 'Archivist Owl',
        dialog: [
          'Hoo. The Archives. Every engagement lives or dies by the contract in here.',
          'CLAUDE.md is the contract. Build commands. Test commands. Naming. Repository etiquette. The non-obvious things a new consultant on the project would need on day one.',
          "Keep it tight. Bloated CLAUDE.md gets ignored — important rules get lost in the noise. Prune like it's your billable hours.",
          '/compact when the window fills. /clear between unrelated tasks. /rewind if Claude wandered. Tools are sharp, operator. Use them.',
        ],
      },
    ],
    decorations: [],
  };

  // ----- Chamber B: The Stacks (16×14) — maze -----
  const sW = 16, sH = 14;
  const sTiles = blankTileMap(sW, sH);
  // South door back to archives
  sTiles[sH - 1][7] = 2;
  // East door to vault
  sTiles[7][sW - 1] = 2;
  // Bookshelf columns forming a maze
  fillRect(sTiles, 3, 2, 3, 5, 1);   // shelf
  fillRect(sTiles, 3, 8, 3, 11, 1);  // shelf
  fillRect(sTiles, 6, 4, 6, 9, 1);   // shelf
  fillRect(sTiles, 9, 2, 9, 5, 1);   // shelf
  fillRect(sTiles, 9, 8, 9, 11, 1);  // shelf
  fillRect(sTiles, 12, 4, 12, 9, 1); // shelf

  const stacks: ChamberConfig = {
    id: 'claudemd-stacks',
    level: 'claudemd',
    name: 'The Stacks',
    width: sW,
    height: sH,
    tiles: sTiles,
    spawnX: 7,
    spawnY: 12,
    items: [
      { id: 'fragment-a', type: 'lore', x: 1, y: 1, sprite: 'book' },
      { id: 'fragment-b', type: 'lore', x: 14, y: 1, sprite: 'book' },
      { id: 'fragment-c', type: 'lore', x: 1, y: 12, sprite: 'paper' },
      { id: 'contract-auditor-practice', type: 'practice', x: 14, y: 12, sprite: 'hint_token' },
    ],
    doors: [
      {
        id: 'back',
        x: 7,
        y: sH - 1,
        target: { kind: 'chamber', chamber: 'claudemd-archives' },
        spawnX: 11,
        spawnY: 1,
        locked: false,
      },
      {
        id: 'to-vault',
        x: sW - 1,
        y: 7,
        target: { kind: 'chamber', chamber: 'claudemd-vault' },
        spawnX: 1,
        spawnY: 6,
        locked: false,
      },
    ],
    npcs: [],
    decorations: [],
  };

  // ----- Chamber C: Vault (16×11) -----
  const vW = 16, vH = 11;
  const vTiles = blankTileMap(vW, vH);
  // West door back to stacks
  vTiles[6][0] = 2;
  // East door to next level
  vTiles[6][vW - 1] = 2;
  // Ceremonial vault: flanking colonnades + small north alcove.
  // South colonnades at rows 7-9 (off spine, which lives on row 6).
  fillRect(vTiles, 4, 2, 4, 4, 1);
  fillRect(vTiles, 4, 7, 4, 9, 1);
  fillRect(vTiles, 8, 2, 8, 3, 1);
  fillRect(vTiles, 13, 2, 13, 4, 1);
  fillRect(vTiles, 13, 7, 13, 9, 1);

  const vault: ChamberConfig = {
    id: 'claudemd-vault',
    level: 'claudemd',
    name: 'Vault',
    width: vW,
    height: vH,
    tiles: vTiles,
    spawnX: 1,
    spawnY: 6,
    items: [
      { id: 'scroll', type: 'challenge', x: 11, y: 4, sprite: 'scroll' },
    ],
    doors: [
      {
        id: 'back',
        x: 0,
        y: 6,
        target: { kind: 'chamber', chamber: 'claudemd-stacks' },
        spawnX: sW - 2,
        spawnY: 7,
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
  // ----- Chamber A: Prompt Foyer (18×11) -----
  const aW = 18, aH = 11;
  const aTiles = blankTileMap(aW, aH);
  aTiles[5][aW - 1] = 2; // east door to registry
  // Queue-stanchion switchback: N alcove holds command-sheet, S alcove holds index.
  // Critical path along row 5 past Clerk Cat.
  fillRect(aTiles, 4, 1, 4, 3, 1);
  fillRect(aTiles, 8, 1, 8, 3, 1);
  fillRect(aTiles, 11, 1, 11, 3, 1);
  fillRect(aTiles, 14, 1, 14, 3, 1);
  fillRect(aTiles, 4, 7, 4, 9, 1);
  fillRect(aTiles, 7, 7, 7, 9, 1);
  fillRect(aTiles, 10, 7, 10, 9, 1);
  fillRect(aTiles, 14, 7, 14, 9, 1);

  const foyer: ChamberConfig = {
    id: 'slash-foyer',
    level: 'slash',
    name: 'Prompt Foyer',
    width: aW,
    height: aH,
    tiles: aTiles,
    spawnX: 2,
    spawnY: 5,
    items: [
      { id: 'command-sheet', type: 'lore', x: 6, y: 3, sprite: 'paper' },
      { id: 'index', type: 'lore', x: 12, y: 7, sprite: 'scroll' },
    ],
    doors: [
      {
        id: 'to-registry',
        x: aW - 1,
        y: 5,
        target: { kind: 'chamber', chamber: 'slash-registry' },
        spawnX: 1,
        spawnY: 5,
        locked: false,
      },
    ],
    npcs: [
      {
        id: 'clerk-bot',
        x: 9,
        y: 5,
        sprite: 'cat',
        color: '#3FB950',
        name: 'Clerk Cat',
        dialog: [
          'Mrrow. Welcome to the Registry. Three drawers: commands, skills, hooks.',
          "Type a slash, get a recipe. /review-pr expands into your full review brief. No more 'remind me what we check for race conditions?'",
          'Hooks fire automatically. Format on save. Lint before commit. Block writes to /client-data. Set once. Trust always.',
          'Most useful for a firm? Bottle the deliverables. One skill per: /draft-proposal, /summarize-call, /qbr-deck. Your library of moves, executable on demand.',
        ],
      },
    ],
    decorations: [],
  };

  // ----- Chamber B: The Registry (18×13) — filing cabinets -----
  const rW = 18, rH = 13;
  const rTiles = blankTileMap(rW, rH);
  rTiles[6][0] = 2;           // west back to foyer
  rTiles[6][rW - 1] = 2;      // east to execution
  // Filing-cabinet wall columns
  fillRect(rTiles, 4, 2, 4, 4, 1);
  fillRect(rTiles, 4, 8, 4, 10, 1);
  fillRect(rTiles, 8, 2, 8, 4, 1);
  fillRect(rTiles, 8, 8, 8, 10, 1);
  fillRect(rTiles, 12, 2, 12, 4, 1);
  fillRect(rTiles, 12, 8, 12, 10, 1);

  const registry: ChamberConfig = {
    id: 'slash-registry',
    level: 'slash',
    name: 'Registry',
    width: rW,
    height: rH,
    tiles: rTiles,
    spawnX: 1,
    spawnY: 6,
    items: [
      { id: 'card-a', type: 'lore', x: 6, y: 3, sprite: 'database' },
      { id: 'card-b', type: 'lore', x: 10, y: 11, sprite: 'database' },
      { id: 'card-c', type: 'lore', x: 14, y: 3, sprite: 'database' },
      { id: 'command-architect-practice', type: 'practice', x: 2, y: 11, sprite: 'hint_token' },
    ],
    doors: [
      {
        id: 'back',
        x: 0,
        y: 6,
        target: { kind: 'chamber', chamber: 'slash-foyer' },
        spawnX: aW - 2,
        spawnY: 5,
        locked: false,
      },
      {
        id: 'to-execution',
        x: rW - 1,
        y: 6,
        target: { kind: 'chamber', chamber: 'slash-execution' },
        spawnX: 1,
        spawnY: 5,
        locked: false,
      },
    ],
    npcs: [],
    decorations: [],
  };

  // ----- Chamber C: Execution (16×11) -----
  const eW = 16, eH = 11;
  const eTiles = blankTileMap(eW, eH);
  eTiles[5][0] = 2;
  eTiles[5][eW - 1] = 2;
  // Stage approach: flanking control booths frame a central aisle.
  fillRect(eTiles, 4, 1, 4, 3, 1);
  fillRect(eTiles, 4, 7, 4, 9, 1);
  fillRect(eTiles, 7, 7, 7, 9, 1);
  fillRect(eTiles, 13, 1, 13, 3, 1);
  fillRect(eTiles, 13, 7, 13, 9, 1);

  const execution: ChamberConfig = {
    id: 'slash-execution',
    level: 'slash',
    name: 'Execution',
    width: eW,
    height: eH,
    tiles: eTiles,
    spawnX: 1,
    spawnY: 5,
    items: [
      { id: 'terminal', type: 'challenge', x: 11, y: 4, sprite: 'crt_monitor' },
    ],
    doors: [
      {
        id: 'back',
        x: 0,
        y: 5,
        target: { kind: 'chamber', chamber: 'slash-registry' },
        spawnX: rW - 2,
        spawnY: 6,
        locked: false,
      },
      {
        id: 'exit',
        x: eW - 1,
        y: 5,
        target: { kind: 'level', level: 'mcp', chamber: 'mcp-hub' },
        spawnX: 1,
        spawnY: 6,
        locked: true,
        requiresLevelKey: true,
      },
    ],
    npcs: [],
    decorations: [],
    keySpawn: { x: 8, y: 7 },
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
  // ----- Chamber A: Hub (22×12) -----
  const aW = 22, aH = 12;
  const aTiles = blankTileMap(aW, aH);
  aTiles[6][aW - 1] = 2;
  // Patch-panel switchboard: equipment racks carve a serpentine path past Duck.
  // NW alcove holds broadcast, SE alcove holds connection-log.
  fillRect(aTiles, 4, 1, 4, 4, 1);
  fillRect(aTiles, 4, 8, 4, 10, 1);
  fillRect(aTiles, 8, 1, 8, 3, 1);
  fillRect(aTiles, 8, 7, 8, 10, 1);
  fillRect(aTiles, 13, 1, 13, 4, 1);
  fillRect(aTiles, 13, 8, 13, 10, 1);
  fillRect(aTiles, 17, 1, 17, 3, 1);
  fillRect(aTiles, 17, 7, 17, 10, 1);

  const hub: ChamberConfig = {
    id: 'mcp-hub',
    level: 'mcp',
    name: 'Hub',
    width: aW,
    height: aH,
    tiles: aTiles,
    spawnX: 2,
    spawnY: 6,
    items: [
      { id: 'broadcast', type: 'lore', x: 6, y: 3, sprite: 'database' },
      { id: 'connection-log', type: 'lore', x: 16, y: 8, sprite: 'paper' },
    ],
    doors: [
      {
        id: 'to-rack',
        x: aW - 1,
        y: 6,
        target: { kind: 'chamber', chamber: 'mcp-rack' },
        spawnX: 1,
        spawnY: 7,
        locked: false,
      },
    ],
    npcs: [
      {
        id: 'connector-bot',
        x: 11,
        y: 6,
        sprite: 'duck',
        color: '#00D4AA',
        name: 'Connector Duck',
        dialog: [
          'Quack. Welcome to the Hub. We trade in connections.',
          'MCP — Model Context Protocol — is how Claude reaches anything outside its own walls.',
          'Slack. GitHub. Google Drive. Your CRM. Your warehouse. Any of them. All of them.',
          "Add with `claude mcp add <name>`. Authorize once. Use forever. Yes — I'm a debugging duck. Why do you ask?",
          "But — every server is a new attack surface. Default-deny. Audit the source. Don't ship the kingdom keys to a server you found in someone's gist.",
        ],
      },
    ],
    decorations: [],
  };

  // ----- Chamber B: Server Rack (16×14) — maze -----
  const rW = 16, rH = 14;
  const rTiles = blankTileMap(rW, rH);
  rTiles[7][0] = 2;
  rTiles[7][rW - 1] = 2;
  // Rack columns
  fillRect(rTiles, 3, 1, 3, 5, 1);
  fillRect(rTiles, 3, 9, 3, 12, 1);
  fillRect(rTiles, 6, 3, 6, 10, 1);
  fillRect(rTiles, 9, 1, 9, 5, 1);
  fillRect(rTiles, 9, 9, 9, 12, 1);
  fillRect(rTiles, 12, 3, 12, 10, 1);

  const rack: ChamberConfig = {
    id: 'mcp-rack',
    level: 'mcp',
    name: 'Server Rack',
    width: rW,
    height: rH,
    tiles: rTiles,
    spawnX: 1,
    spawnY: 7,
    items: [
      { id: 'rack-a', type: 'lore', x: 1, y: 1, sprite: 'hint_token' },
      { id: 'rack-b', type: 'lore', x: 14, y: 1, sprite: 'hint_token' },
      { id: 'rack-c', type: 'lore', x: 14, y: 12, sprite: 'hint_token' },
      { id: 'integrations-engineer-practice', type: 'practice', x: 8, y: 12, sprite: 'database' },
    ],
    doors: [
      {
        id: 'back',
        x: 0,
        y: 7,
        target: { kind: 'chamber', chamber: 'mcp-hub' },
        spawnX: aW - 2,
        spawnY: 6,
        locked: false,
      },
      {
        id: 'to-integration',
        x: rW - 1,
        y: 7,
        target: { kind: 'chamber', chamber: 'mcp-integration' },
        spawnX: 1,
        spawnY: 5,
        locked: false,
      },
    ],
    npcs: [],
    decorations: [],
  };

  // ----- Chamber C: Integration (16×11) -----
  const iW = 16, iH = 11;
  const iTiles = blankTileMap(iW, iH);
  iTiles[5][0] = 2;
  iTiles[5][iW - 1] = 2;
  // Twin server cabinets framing the integration aisle.
  fillRect(iTiles, 4, 1, 4, 3, 1);
  fillRect(iTiles, 4, 7, 4, 9, 1);
  fillRect(iTiles, 7, 1, 7, 3, 1);
  fillRect(iTiles, 9, 1, 9, 3, 1);
  fillRect(iTiles, 7, 7, 7, 9, 1);
  fillRect(iTiles, 13, 1, 13, 3, 1);
  fillRect(iTiles, 13, 7, 13, 9, 1);

  const integration: ChamberConfig = {
    id: 'mcp-integration',
    level: 'mcp',
    name: 'Integration',
    width: iW,
    height: iH,
    tiles: iTiles,
    spawnX: 1,
    spawnY: 5,
    items: [
      { id: 'terminal', type: 'challenge', x: 11, y: 4, sprite: 'crt_monitor' },
    ],
    doors: [
      {
        id: 'back',
        x: 0,
        y: 5,
        target: { kind: 'chamber', chamber: 'mcp-rack' },
        spawnX: rW - 2,
        spawnY: 7,
        locked: false,
      },
      {
        id: 'exit',
        x: iW - 1,
        y: 5,
        target: { kind: 'level', level: 'subagents', chamber: 'subagents-lobby' },
        spawnX: 1,
        spawnY: 6,
        locked: true,
        requiresLevelKey: true,
      },
    ],
    npcs: [],
    decorations: [],
    keySpawn: { x: 8, y: 7 },
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
  // ----- Chamber A: Mission Lobby (20×12) -----
  const aW = 20, aH = 12;
  const aTiles = blankTileMap(aW, aH);
  aTiles[6][aW - 1] = 2;
  // Cubicle dividers: N alcove holds roster, S alcove holds mission-brief.
  // Scout and Planner sit between dividers; critical path threads past them.
  fillRect(aTiles, 4, 1, 4, 3, 1);
  fillRect(aTiles, 4, 8, 4, 10, 1);
  fillRect(aTiles, 8, 1, 8, 3, 1);
  fillRect(aTiles, 11, 1, 11, 3, 1);
  fillRect(aTiles, 13, 7, 13, 10, 1);
  fillRect(aTiles, 16, 1, 16, 3, 1);
  fillRect(aTiles, 16, 7, 16, 10, 1);

  const lobby: ChamberConfig = {
    id: 'subagents-lobby',
    level: 'subagents',
    name: 'Mission Lobby',
    width: aW,
    height: aH,
    tiles: aTiles,
    spawnX: 2,
    spawnY: 6,
    items: [
      { id: 'roster', type: 'lore', x: 6, y: 3, sprite: 'paper' },
      { id: 'mission-brief', type: 'lore', x: 14, y: 8, sprite: 'scroll' },
    ],
    doors: [
      {
        id: 'to-pool',
        x: aW - 1,
        y: 6,
        target: { kind: 'chamber', chamber: 'subagents-pool' },
        spawnX: 1,
        spawnY: 6,
        locked: false,
      },
    ],
    npcs: [
      {
        id: 'scout-bot',
        x: 8,
        y: 5,
        color: '#3FB950',
        name: 'Scout-bot',
        dialog: [
          'I run the Explore lane. Read-only — I never touch anything.',
          "Send me into a 500-file repo with 'find every place we touch client billing'. I come back with paths and line numbers.",
        ],
      },
      {
        id: 'planner-bot',
        x: 10,
        y: 7,
        color: '#6BA8DD',
        name: 'Planner-bot',
        dialog: [
          'I plan. Architecture, file structure, deliverable outlines. The boring-but-load-bearing part.',
          'Hand me a goal and the constraints. I come back with steps. Use me before any big build — saves you the rewrite.',
        ],
      },
    ],
    decorations: [],
  };

  // ----- Chamber B: Agent Pool (18×14) -----
  const pW = 18, pH = 14;
  const pTiles = blankTileMap(pW, pH);
  pTiles[7][0] = 2;
  pTiles[7][pW - 1] = 2;
  // Workstation pods: corner alcoves hold fragment-x (NW), fragment-y (SE),
  // practice (S-center). A spine block forces a north detour past Reviewer + Debugger.
  fillRect(pTiles, 2, 3, 5, 3, 1);     // NW alcove S boundary (fragment-x at 4,2)
  fillRect(pTiles, 12, 3, 15, 3, 1);   // NE alcove S boundary
  fillRect(pTiles, 5, 10, 5, 12, 1);   // practice alcove W boundary
  fillRect(pTiles, 7, 10, 11, 10, 1);  // practice alcove N boundary (open at col 6)
  fillRect(pTiles, 12, 9, 15, 9, 1);   // SE alcove N boundary (entry via col 16; fragment-y at 14,11)
  fillRect(pTiles, 12, 10, 12, 12, 1); // SE alcove W boundary
  fillRect(pTiles, 8, 6, 9, 8, 1);     // spine pinch — forces detour north past bots

  const pool: ChamberConfig = {
    id: 'subagents-pool',
    level: 'subagents',
    name: 'Agent Pool',
    width: pW,
    height: pH,
    tiles: pTiles,
    spawnX: 1,
    spawnY: 7,
    items: [
      { id: 'fragment-x', type: 'lore', x: 4, y: 2, sprite: 'paper' },
      { id: 'fragment-y', type: 'lore', x: 14, y: 11, sprite: 'paper' },
      { id: 'orchestrator-practice', type: 'practice', x: 8, y: 11, sprite: 'hint_token' },
    ],
    doors: [
      {
        id: 'back',
        x: 0,
        y: 7,
        target: { kind: 'chamber', chamber: 'subagents-lobby' },
        spawnX: aW - 2,
        spawnY: 6,
        locked: false,
      },
      {
        id: 'to-briefing',
        x: pW - 1,
        y: 7,
        target: { kind: 'chamber', chamber: 'subagents-briefing' },
        spawnX: 1,
        spawnY: 5,
        locked: false,
      },
    ],
    npcs: [
      {
        id: 'reviewer-bot',
        x: 6,
        y: 4,
        color: '#F0C040',
        name: 'Reviewer-bot',
        dialog: [
          'Code reviewer. Independent second-opinion energy. Fresh eyes — no conversation context.',
          "Hand me a diff. I'll tell you what's shaky. I see what your main agent missed.",
        ],
      },
      {
        id: 'debugger-bot',
        x: 11,
        y: 4,
        color: '#FF6B8A',
        name: 'Debugger-bot',
        dialog: [
          'I chase bugs through stack traces. Scientific method only — hypothesize, instrument, verify.',
          'Hand me a repro, I bring back the root cause. No band-aids.',
        ],
      },
    ],
    decorations: [],
  };

  // ----- Chamber C: Briefing Room (16×11) -----
  const bW = 16, bH = 11;
  const bTiles = blankTileMap(bW, bH);
  bTiles[5][0] = 2;
  bTiles[5][bW - 1] = 2;
  // Ops room — single inner ring with openings at row 5 (W + E spine).
  // Terminal sits in the N inner alcove, key in the S inner alcove.
  fillRect(bTiles, 3, 2, 3, 4, 1);   // W wall upper
  fillRect(bTiles, 3, 6, 3, 7, 1);   // W wall lower
  fillRect(bTiles, 4, 2, 12, 2, 1);  // N wall
  fillRect(bTiles, 12, 3, 12, 4, 1); // E wall upper
  fillRect(bTiles, 12, 6, 12, 7, 1); // E wall lower
  fillRect(bTiles, 4, 8, 12, 8, 1);  // S wall

  const briefing: ChamberConfig = {
    id: 'subagents-briefing',
    level: 'subagents',
    name: 'Briefing Room',
    width: bW,
    height: bH,
    tiles: bTiles,
    spawnX: 1,
    spawnY: 5,
    items: [
      { id: 'terminal', type: 'challenge', x: 11, y: 4, sprite: 'crt_monitor' },
    ],
    doors: [
      {
        id: 'back',
        x: 0,
        y: 5,
        target: { kind: 'chamber', chamber: 'subagents-pool' },
        spawnX: pW - 2,
        spawnY: 7,
        locked: false,
      },
      {
        id: 'exit',
        x: bW - 1,
        y: 5,
        target: { kind: 'level', level: 'final-boss', chamber: 'final-boss-throne' },
        spawnX: 1,
        spawnY: 6,
        locked: true,
        requiresLevelKey: true,
      },
    ],
    npcs: [],
    decorations: [],
    keySpawn: { x: 8, y: 7 },
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
  const tW = 22, tH = 13;
  const tTiles = blankTileMap(tW, tH);
  // West door (entry from subagents-briefing)
  tTiles[6][0] = 2;
  // Extra colonnade pillars for ceremonial approach.
  fillRect(tTiles, 10, 4, 10, 5, 1);
  fillRect(tTiles, 10, 8, 10, 9, 1);
  // East door (game end, locked until boss falls)
  tTiles[6][tW - 1] = 2;
  // Throne platform — two columns of "pillar" walls flanking center
  fillRect(tTiles, 5, 2, 5, 3, 1);
  fillRect(tTiles, tW - 6, 2, tW - 6, 3, 1);
  fillRect(tTiles, 5, tH - 4, 5, tH - 3, 1);
  fillRect(tTiles, tW - 6, tH - 4, tW - 6, tH - 3, 1);

  const throne: ChamberConfig = {
    id: 'final-boss-throne',
    level: 'final-boss',
    name: 'Throne Room',
    width: tW,
    height: tH,
    tiles: tTiles,
    spawnX: 1,
    spawnY: 6,
    items: [
      // The "challenge" item triggers the final battle.
      { id: 'overlord-altar', type: 'challenge', x: tW - 5, y: 6, sprite: 'crt_monitor' },
    ],
    doors: [
      {
        id: 'back',
        x: 0,
        y: 6,
        target: { kind: 'chamber', chamber: 'subagents-briefing' },
        spawnX: 1,
        spawnY: 5,
        locked: false,
      },
      {
        id: 'exit',
        x: tW - 1,
        y: 6,
        target: { kind: 'end' },
        spawnX: 0,
        spawnY: 0,
        locked: true,
        requiresLevelKey: true,
      },
    ],
    npcs: [],
    decorations: [],
    keySpawn: { x: tW - 5, y: 9 },
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

export const LEVEL_CONFIGS: Record<LevelId, LevelConfig> = {
  welcome: buildWelcomeLevel(),
  claudemd: buildClaudemdLevel(),
  slash: buildSlashLevel(),
  mcp: buildMcpLevel(),
  subagents: buildSubagentsLevel(),
  'final-boss': buildFinalBossLevel(),
};

/** Convenience: lookup a chamber by ID across all levels. */
export function getChamber(chamberId: ChamberId): ChamberConfig | null {
  for (const level of Object.values(LEVEL_CONFIGS)) {
    if (level.chambers[chamberId]) return level.chambers[chamberId];
  }
  return null;
}

/** All chamber IDs (used to seed per-chamber state). */
export const ALL_CHAMBER_IDS: ChamberId[] = Object.values(LEVEL_CONFIGS).flatMap(
  l => Object.keys(l.chambers),
);
