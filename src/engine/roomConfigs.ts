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
  | 'subagents';

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
  type: 'challenge' | 'lore';
  x: number;
  y: number;
  sprite: string;
  /** For lore items: the text shown when interacted with */
  loreText?: string;
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

// ============================================================================
// Level 01: Welcome — 2 chambers (Antechamber + Sanctum)
// ============================================================================

function buildWelcomeLevel(): LevelConfig {
  // ----- Chamber A: Antechamber (20×12) -----
  const aW = 20, aH = 12;
  const aTiles = blankTileMap(aW, aH);
  // East door opens (unlocked) to Sanctum
  aTiles[6][aW - 1] = 2;

  const antechamber: ChamberConfig = {
    id: 'welcome-antechamber',
    level: 'welcome',
    name: 'Antechamber',
    width: aW,
    height: aH,
    tiles: aTiles,
    spawnX: 2,
    spawnY: 6,
    items: [
      {
        id: 'manual',
        type: 'lore',
        x: 6,
        y: 3,
        sprite: 'book',
        loreText: '[PLACEHOLDER LORE] The manual reads: "If you\'re reading this, you\'ve already started. Good."',
      },
      {
        id: 'sticky-note',
        type: 'lore',
        x: 14,
        y: 4,
        sprite: 'paper',
        loreText: '[PLACEHOLDER LORE] A sticky note pinned to the wall: "Read first. Ask second. Edit third."',
      },
    ],
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
        x: 10,
        y: 6,
        color: '#3FB950',
        name: 'Guide-bot',
        dialog: [
          'Hey. New here?',
          'This is the antechamber. Just orientation.',
          'Through the east door is the sanctum. Glowing terminal in there has your first challenge.',
          'Read the lore on the way. Some of it actually matters.',
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
      {
        id: 'side-note',
        type: 'lore',
        x: 14,
        y: 9,
        sprite: 'paper',
        loreText: '[PLACEHOLDER LORE] Pinned beneath the terminal: "When in doubt, just ask the bot. Out loud helps."',
      },
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
      {
        id: 'old-note',
        type: 'lore',
        x: 5,
        y: 3,
        sprite: 'paper',
        loreText: '[PLACEHOLDER LORE] Scrawled on the note: "I once shipped without a CLAUDE.md. Never again."',
      },
      {
        id: 'log',
        type: 'lore',
        x: 17,
        y: 4,
        sprite: 'scroll',
        loreText: '[PLACEHOLDER LORE] Audit log: "Project context lives in CLAUDE.md. Treat it like a treaty."',
      },
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
          'Hoo. The Archives. Everything we know lives here.',
          'A CLAUDE.md is a contract. You tell Claude how to behave in your repo; it reads it before every task.',
          'Through the north door — the Stacks. Mind the maze.',
          'The Vault holds today\'s challenge. Bring the key when you find it.',
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
      {
        id: 'fragment-a',
        type: 'lore',
        x: 1,
        y: 1,
        sprite: 'book',
        loreText: '[PLACEHOLDER LORE] Fragment: "Good CLAUDE.md describes intent, not implementation."',
      },
      {
        id: 'fragment-b',
        type: 'lore',
        x: 14,
        y: 1,
        sprite: 'book',
        loreText: '[PLACEHOLDER LORE] Fragment: "List the commands you actually use. Skip the ones you don\'t."',
      },
      {
        id: 'fragment-c',
        type: 'lore',
        x: 1,
        y: 12,
        sprite: 'paper',
        loreText: '[PLACEHOLDER LORE] Fragment: "If your README is the front porch, CLAUDE.md is the kitchen."',
      },
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
      {
        id: 'command-sheet',
        type: 'lore',
        x: 6,
        y: 3,
        sprite: 'paper',
        loreText: '[PLACEHOLDER LORE] A slash command is a custom prompt. Write once, summon many times.',
      },
      {
        id: 'index',
        type: 'lore',
        x: 12,
        y: 7,
        sprite: 'scroll',
        loreText: '[PLACEHOLDER LORE] Commands live in `.claude/commands/*.md`. Markdown is the spec.',
      },
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
          'Mrrow. Slash command country. Welcome.',
          'These let you bottle a prompt. You type `/review` and it expands into your full review brief.',
          'Registry next door if you want to see them filed.',
          'Execution chamber past that. Boss terminal lives there.',
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
      {
        id: 'card-a',
        type: 'lore',
        x: 6,
        y: 3,
        sprite: 'database',
        loreText: '[PLACEHOLDER LORE] Card #001: /review — runs a full code review pass on the staged diff.',
      },
      {
        id: 'card-b',
        type: 'lore',
        x: 10,
        y: 11,
        sprite: 'database',
        loreText: '[PLACEHOLDER LORE] Card #027: /commit — writes a conventional-commit message from the diff.',
      },
      {
        id: 'card-c',
        type: 'lore',
        x: 14,
        y: 3,
        sprite: 'database',
        loreText: '[PLACEHOLDER LORE] Card #054: /ship — runs checks, opens PR, and pings the reviewer.',
      },
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
      {
        id: 'broadcast',
        type: 'lore',
        x: 6,
        y: 3,
        sprite: 'database',
        loreText: '[PLACEHOLDER LORE] Broadcast log: "An MCP server exposes tools, resources, and prompts over a standard protocol."',
      },
      {
        id: 'connection-log',
        type: 'lore',
        x: 16,
        y: 8,
        sprite: 'paper',
        loreText: '[PLACEHOLDER LORE] Connection log: "stdio transport for local; HTTP for remote. Pick your shape."',
      },
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
          'MCP — Model Context Protocol — is how Claude reaches anywhere outside its own walls.',
          'Filesystem, GitHub, your custom API, your database. Any of them. All of them.',
          'Yes, I\'m a debugging duck. Why do you ask?',
          'Through the racks, into Integration. The terminal awaits.',
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
      {
        id: 'rack-a',
        type: 'lore',
        x: 1,
        y: 1,
        sprite: 'hint_token',
        loreText: '[PLACEHOLDER LORE] Token A: "Tools are functions Claude can call. Each one returns structured data."',
      },
      {
        id: 'rack-b',
        type: 'lore',
        x: 14,
        y: 1,
        sprite: 'hint_token',
        loreText: '[PLACEHOLDER LORE] Token B: "Resources are read-only. Prompts are reusable templates."',
      },
      {
        id: 'rack-c',
        type: 'lore',
        x: 14,
        y: 12,
        sprite: 'hint_token',
        loreText: '[PLACEHOLDER LORE] Token C: "Auth via OAuth. Permissions per resource. Default-deny."',
      },
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
      {
        id: 'roster',
        type: 'lore',
        x: 6,
        y: 3,
        sprite: 'paper',
        loreText: '[PLACEHOLDER LORE] Roster: "Spawn a subagent when you can hand off the whole task with a self-contained prompt."',
      },
      {
        id: 'mission-brief',
        type: 'lore',
        x: 14,
        y: 8,
        sprite: 'scroll',
        loreText: '[PLACEHOLDER LORE] Briefing: "Independent work in parallel. The orchestrator keeps the plot."',
      },
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
          'I run the explore lane. Big repos, fuzzy questions. Read-only.',
          'When the parent agent doesn\'t know where something is — they spawn me.',
        ],
      },
      {
        id: 'planner-bot',
        x: 10,
        y: 7,
        color: '#6BA8DD',
        name: 'Planner-bot',
        dialog: [
          'I plan. Architecture, file structure, the boring part.',
          'Send me ahead with a goal and constraints. I come back with steps.',
        ],
      },
      {
        id: 'reviewer-bot',
        x: 12,
        y: 5,
        color: '#F0C040',
        name: 'Reviewer-bot',
        dialog: [
          'Code reviewer. Independent second-opinion energy.',
          'Hand me a diff and I\'ll tell you what\'s shaky. No conversation context — fresh eyes.',
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
      {
        id: 'fragment-x',
        type: 'lore',
        x: 4,
        y: 2,
        sprite: 'paper',
        loreText: '[PLACEHOLDER LORE] "Subagents start fresh. No memory of the parent conversation. Brief them like a stranger."',
      },
      {
        id: 'fragment-y',
        type: 'lore',
        x: 14,
        y: 11,
        sprite: 'paper',
        loreText: '[PLACEHOLDER LORE] "Parallelism is real. Spawn N agents in one message; they run concurrently."',
      },
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
        id: 'doc-bot',
        x: 6,
        y: 4,
        color: '#D94DFF',
        name: 'Doc-bot',
        dialog: [
          'I write docs and walkthroughs. Long-form is my specialty.',
          'Hand me a feature, I come back with the README.',
        ],
      },
      {
        id: 'debugger-bot',
        x: 11,
        y: 4,
        color: '#FF6B8A',
        name: 'Debugger-bot',
        dialog: [
          'I chase bugs through stack traces. Scientific method only.',
          'Hand me a repro, I bring back the root cause.',
        ],
      },
      {
        id: 'security-bot',
        x: 6,
        y: 10,
        color: '#00D4AA',
        name: 'Security-bot',
        dialog: [
          'Threat models. Vulnerability sweeps. Default suspicious.',
          'I scan diffs for secrets, injection, and footguns.',
        ],
      },
      {
        id: 'tester-bot',
        x: 11,
        y: 10,
        color: '#FFE066',
        name: 'Tester-bot',
        dialog: [
          'I write tests. Edge cases especially.',
          'If it can break, I will find the input that breaks it.',
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
        target: { kind: 'end' },
        spawnX: 0,
        spawnY: 0,
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
// Export
// ============================================================================

export const LEVEL_CONFIGS: Record<LevelId, LevelConfig> = {
  welcome: buildWelcomeLevel(),
  claudemd: buildClaudemdLevel(),
  slash: buildSlashLevel(),
  mcp: buildMcpLevel(),
  subagents: buildSubagentsLevel(),
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
