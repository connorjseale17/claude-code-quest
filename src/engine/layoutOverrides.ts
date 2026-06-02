import type { SerializedChamber } from './roomConfigs';

// ============================================================================
// Layout overrides — committed, deployed-default chamber layouts produced by
// Layout Mode. A chamber id here REPLACES the hand-authored builder geometry
// at module load. Delete an entry to revert that chamber to its builder layout.
//
// Level 01 (welcome)     authored 2026-06-01
// Level 02 (claudemd)    authored 2026-06-01
// Level 03 (slash)       authored 2026-06-01
// Level 04 (mcp)         authored 2026-06-01
// Level 05 (subagents)   authored 2026-06-01
// Level 06 (final-boss)  authored 2026-06-01  — GAME COMPLETE
// TWiC Room 1            authored 2026-06-02  ── BASE STANDARD, LOCKED
// TWiC Room 2            authored 2026-06-02  ── BASE STANDARD, LOCKED
// TWiC Room 3            authored 2026-06-02  ── BASE STANDARD, LOCKED  (ISSUE COMPLETE)
//
// ─────────────────────────────────────────────────────────────────────────────
// TWiC BASE STANDARDS — DO NOT MODIFY
// ─────────────────────────────────────────────────────────────────────────────
// The three twic-room-* entries below define the CANONICAL ROOM STRUCTURE for
// the TWiC floor: tile maps, item positions (terminal/lore/practice), NPC
// placement, key spawn, door target, and decorations. These are user-authored
// in LayoutEditor and frozen for every future TWiC issue.
//
// The weekly /twic routine writes ONLY content prose to the four files at
// src/content/twic-{1,2,3,issue}.ts. It must NEVER:
//   - edit this file (layoutOverrides.ts) for any TWiC entry
//   - edit src/engine/roomConfigs.ts (the chamber builders and LevelId union)
//   - move items, NPCs, doors, walls, decorations, or key spawns
//   - rename ids (chamber, item, NPC, prize) — content references them
//
// If the user explicitly hands over a new LayoutEditor export for a TWiC room,
// that's the ONE path to update these — and it gets locked again afterward.
// ─────────────────────────────────────────────────────────────────────────────
// ============================================================================

export const LAYOUT_OVERRIDES: Record<string, SerializedChamber> = {
  "welcome-antechamber": {
    "width": 19,
    "height": 12,
    "tiles": [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1],
      [1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    "items": [
      {
        "id": "manual",
        "type": "lore",
        "x": 6,
        "y": 4,
        "sprite": "paper"
      },
      {
        "id": "sticky-note",
        "type": "lore",
        "x": 15,
        "y": 5,
        "sprite": "paper"
      },
      {
        "id": "cli-primer",
        "type": "lore",
        "x": 3,
        "y": 7,
        "sprite": "paper"
      }
    ],
    "doors": [
      {
        "id": "to-sanctum",
        "x": 18,
        "y": 6,
        "target": {
          "kind": "chamber",
          "chamber": "welcome-sanctum"
        },
        "spawnX": 1,
        "spawnY": 6,
        "locked": false
      }
    ],
    "npcs": [
      {
        "id": "guide-bot",
        "x": 12,
        "y": 3,
        "color": "#3FB950",
        "name": "Guide-bot",
        "dialog": [
          "Hey. Fresh session? Good. Let's set you up before you wreck something.",
          "The terminal is text-mode chat with your computer. `cd`, `ls`, `git status` — those are the keys. Claude Code lives in there, and it can text the computer too.",
          "Four permission modes. Default confirms every action. Accept Edits writes, you review the diff after. Plan reads and proposes but changes nothing. Auto decides per-action with a safety check. Shift+Tab cycles them live.",
          "Brief me like a new hire: name the deliverable, the client, the stack. And share by sensitivity — a live link for demos, a sealed zip for anything client-confidential."
        ]
      }
    ],
    "decorations": [
      {
        "x": 6,
        "y": 2,
        "sprite": "barrel"
      },
      {
        "x": 16,
        "y": 9,
        "sprite": "mana_crystal"
      },
      {
        "x": 16,
        "y": 1,
        "sprite": "banner"
      },
      {
        "x": 3,
        "y": 6,
        "sprite": "bones"
      },
      {
        "x": 2,
        "y": 8,
        "sprite": "puddle"
      },
      {
        "x": 8,
        "y": 5,
        "sprite": "brazier"
      },
      {
        "x": 8,
        "y": 10,
        "sprite": "wall_runes"
      },
      {
        "x": 10,
        "y": 1,
        "sprite": "wall_runes"
      },
      {
        "x": 8,
        "y": 2,
        "sprite": "brazier"
      }
    ],
    "spawnX": 2,
    "spawnY": 5
  },
  "welcome-sanctum": {
    "width": 19,
    "height": 12,
    "tiles": [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1],
      [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1],
      [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    "items": [
      {
        "id": "terminal",
        "type": "challenge",
        "x": 14,
        "y": 6,
        "sprite": "slime_a"
      },
      {
        "id": "proposal-architect-practice",
        "type": "practice",
        "x": 8,
        "y": 2,
        "sprite": "hint_token"
      },
      {
        "id": "side-note",
        "type": "lore",
        "x": 2,
        "y": 3,
        "sprite": "paper"
      },
      {
        "id": "from-gpts",
        "type": "lore",
        "x": 10,
        "y": 4,
        "sprite": "paper"
      }
    ],
    "doors": [
      {
        "id": "back",
        "x": 0,
        "y": 6,
        "target": {
          "kind": "chamber",
          "chamber": "welcome-antechamber"
        },
        "spawnX": 17,
        "spawnY": 6,
        "locked": false
      },
      {
        "id": "exit",
        "x": 18,
        "y": 6,
        "target": {
          "kind": "level",
          "level": "claudemd",
          "chamber": "claudemd-archives"
        },
        "spawnX": 1,
        "spawnY": 6,
        "locked": true,
        "requiresLevelKey": true
      }
    ],
    "npcs": [],
    "decorations": [
      {
        "x": 6,
        "y": 10,
        "sprite": "sconce"
      },
      {
        "x": 10,
        "y": 10,
        "sprite": "sconce"
      },
      {
        "x": 15,
        "y": 10,
        "sprite": "treasure_chest"
      },
      {
        "x": 11,
        "y": 1,
        "sprite": "cobweb"
      },
      {
        "x": 17,
        "y": 1,
        "sprite": "chains"
      },
      {
        "x": 9,
        "y": 9,
        "sprite": "bones"
      },
      {
        "x": 5,
        "y": 1,
        "sprite": "cobweb"
      },
      {
        "x": 10,
        "y": 1,
        "sprite": "bookshelf"
      },
      {
        "x": 7,
        "y": 1,
        "sprite": "bookshelf"
      },
      {
        "x": 8,
        "y": 1,
        "sprite": "bookshelf"
      },
      {
        "x": 9,
        "y": 1,
        "sprite": "bookshelf"
      },
      {
        "x": 6,
        "y": 1,
        "sprite": "bookshelf"
      },
      {
        "x": 1,
        "y": 10,
        "sprite": "weapon_rack"
      },
      {
        "x": 2,
        "y": 10,
        "sprite": "anvil"
      },
      {
        "x": 8,
        "y": 10,
        "sprite": "sconce"
      },
      {
        "x": 2,
        "y": 1,
        "sprite": "cursor_beacon"
      },
      {
        "x": 1,
        "y": 1,
        "sprite": "floor_lever"
      },
      {
        "x": 16,
        "y": 8,
        "sprite": "bones"
      },
      {
        "x": 16,
        "y": 9,
        "sprite": "rubble"
      }
    ],
    "spawnX": 1,
    "spawnY": 6,
    "keySpawn": {
      "x": 16,
      "y": 3
    }
  },
  "claudemd-archives": {
    "width": 16,
    "height": 12,
    "tiles": [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    "items": [
      {
        "id": "old-note",
        "type": "lore",
        "x": 5,
        "y": 6,
        "sprite": "paper"
      },
      {
        "id": "log",
        "type": "lore",
        "x": 7,
        "y": 9,
        "sprite": "paper"
      },
      {
        "id": "formula",
        "type": "lore",
        "x": 8,
        "y": 4,
        "sprite": "paper"
      }
    ],
    "doors": [
      {
        "id": "back-to-welcome",
        "x": 0,
        "y": 6,
        "target": {
          "kind": "chamber",
          "chamber": "welcome-sanctum"
        },
        "spawnX": 17,
        "spawnY": 6,
        "locked": false
      },
      {
        "id": "to-stacks",
        "x": 15,
        "y": 6,
        "target": {
          "kind": "chamber",
          "chamber": "claudemd-stacks"
        },
        "spawnX": 1,
        "spawnY": 6,
        "locked": false
      }
    ],
    "npcs": [
      {
        "id": "archivist-bot",
        "x": 12,
        "y": 6,
        "sprite": "owl",
        "color": "#D94DFF",
        "name": "Archivist Owl",
        "dialog": [
          "Hoo. The Archives. Every engagement lives or dies by the contract in here.",
          "CLAUDE.md answers three questions. WHY: project purpose. WHAT: stack and key files. HOW: build, test, lint commands.",
          "Loading hierarchy: managed-policy → user-global → parent → project root → subdir → .claude/rules/. Most specific wins. Don't write contradictions.",
          "/compact when the window fills. /clear between unrelated tasks. Auto-memory? Review with /memory. A wrong note is worse than no note."
        ]
      }
    ],
    "decorations": [
      {
        "x": 6,
        "y": 2,
        "sprite": "bones"
      },
      {
        "x": 9,
        "y": 8,
        "sprite": "bones"
      },
      {
        "x": 2,
        "y": 8,
        "sprite": "chains"
      },
      {
        "x": 2,
        "y": 4,
        "sprite": "cobweb"
      },
      {
        "x": 13,
        "y": 4,
        "sprite": "puddle"
      },
      {
        "x": 6,
        "y": 10,
        "sprite": "server_stack"
      },
      {
        "x": 7,
        "y": 10,
        "sprite": "server_stack"
      },
      {
        "x": 8,
        "y": 10,
        "sprite": "server_stack"
      }
    ],
    "spawnX": 1,
    "spawnY": 6
  },
  "claudemd-stacks": {
    "width": 16,
    "height": 12,
    "tiles": [
      [1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1],
      [1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    "items": [
      {
        "id": "fragment-b",
        "type": "lore",
        "x": 9,
        "y": 2,
        "sprite": "paper"
      },
      {
        "id": "fragment-a",
        "type": "lore",
        "x": 3,
        "y": 6,
        "sprite": "paper"
      },
      {
        "id": "auto-memory-warn",
        "type": "lore",
        "x": 7,
        "y": 7,
        "sprite": "paper"
      },
      {
        "id": "local-file",
        "type": "lore",
        "x": 5,
        "y": 8,
        "sprite": "paper"
      }
    ],
    "doors": [
      {
        "id": "back",
        "x": 0,
        "y": 6,
        "target": {
          "kind": "chamber",
          "chamber": "claudemd-archives"
        },
        "spawnX": 14,
        "spawnY": 6,
        "locked": false
      },
      {
        "id": "to-vault",
        "x": 8,
        "y": 0,
        "target": {
          "kind": "chamber",
          "chamber": "claudemd-vault"
        },
        "spawnX": 8,
        "spawnY": 10,
        "locked": false
      }
    ],
    "npcs": [],
    "decorations": [
      {
        "x": 8,
        "y": 8,
        "sprite": "bones"
      },
      {
        "x": 13,
        "y": 4,
        "sprite": "bones"
      },
      {
        "x": 1,
        "y": 4,
        "sprite": "cable_run"
      },
      {
        "x": 6,
        "y": 1,
        "sprite": "banner"
      },
      {
        "x": 1,
        "y": 8,
        "sprite": "sconce"
      }
    ],
    "spawnX": 1,
    "spawnY": 6
  },
  "claudemd-vault": {
    "width": 16,
    "height": 12,
    "tiles": [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1]
    ],
    "items": [
      {
        "id": "scroll",
        "type": "challenge",
        "x": 12,
        "y": 6,
        "sprite": "warlock_a"
      },
      {
        "id": "contract-auditor-practice",
        "type": "practice",
        "x": 7,
        "y": 2,
        "sprite": "hint_token"
      },
      {
        "id": "fragment-c",
        "type": "lore",
        "x": 3,
        "y": 5,
        "sprite": "paper"
      }
    ],
    "doors": [
      {
        "id": "back",
        "x": 8,
        "y": 11,
        "target": {
          "kind": "chamber",
          "chamber": "claudemd-stacks"
        },
        "spawnX": 8,
        "spawnY": 1,
        "locked": false
      },
      {
        "id": "exit",
        "x": 15,
        "y": 6,
        "target": {
          "kind": "level",
          "level": "slash",
          "chamber": "slash-foyer"
        },
        "spawnX": 1,
        "spawnY": 5,
        "locked": true,
        "requiresLevelKey": true
      }
    ],
    "npcs": [],
    "decorations": [
      {
        "x": 13,
        "y": 9,
        "sprite": "mana_crystal"
      },
      {
        "x": 1,
        "y": 3,
        "sprite": "cobweb"
      },
      {
        "x": 1,
        "y": 9,
        "sprite": "cobweb"
      },
      {
        "x": 11,
        "y": 9,
        "sprite": "bones"
      },
      {
        "x": 6,
        "y": 1,
        "sprite": "bookshelf"
      },
      {
        "x": 7,
        "y": 1,
        "sprite": "bookshelf"
      },
      {
        "x": 8,
        "y": 1,
        "sprite": "bookshelf"
      }
    ],
    "spawnX": 8,
    "spawnY": 10,
    "keySpawn": {
      "x": 8,
      "y": 7
    }
  },
  "slash-foyer": {
    "width": 16,
    "height": 12,
    "tiles": [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
      [1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1]
    ],
    "items": [
      {
        "id": "command-sheet",
        "type": "lore",
        "x": 9,
        "y": 4,
        "sprite": "paper"
      },
      {
        "id": "index",
        "type": "lore",
        "x": 10,
        "y": 9,
        "sprite": "paper"
      },
      {
        "id": "hooks-intro",
        "type": "lore",
        "x": 7,
        "y": 7,
        "sprite": "paper"
      }
    ],
    "doors": [
      {
        "id": "back-to-claudemd",
        "x": 0,
        "y": 6,
        "target": {
          "kind": "chamber",
          "chamber": "claudemd-vault"
        },
        "spawnX": 14,
        "spawnY": 6,
        "locked": false
      },
      {
        "id": "to-registry",
        "x": 8,
        "y": 11,
        "target": {
          "kind": "chamber",
          "chamber": "slash-registry"
        },
        "spawnX": 8,
        "spawnY": 1,
        "locked": false
      }
    ],
    "npcs": [
      {
        "id": "clerk-bot",
        "x": 5,
        "y": 6,
        "sprite": "cat",
        "color": "#3FB950",
        "name": "Clerk Cat",
        "dialog": [
          "Mrrow. Welcome to the Registry. Three drawers: commands, skills, hooks.",
          "Slash commands and skills live as markdown files. Commands you summon by typing. Skills auto-invoke when the description matches the task.",
          "Hooks fire on lifecycle events — PreToolUse (can BLOCK), PostToolUse (format/lint after), SessionStart/End. Shell commands. No AI judgment.",
          "The hierarchy: CLAUDE.md is ADVICE. Skill is a RECIPE. Hook is LAW. Pick by how non-negotiable the rule is."
        ]
      }
    ],
    "decorations": [],
    "spawnX": 1,
    "spawnY": 6
  },
  "slash-registry": {
    "width": 16,
    "height": 12,
    "tiles": [
      [1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    "items": [
      {
        "id": "card-a",
        "type": "lore",
        "x": 6,
        "y": 2,
        "sprite": "paper"
      },
      {
        "id": "card-b",
        "type": "lore",
        "x": 12,
        "y": 6,
        "sprite": "paper"
      },
      {
        "id": "hierarchy",
        "type": "lore",
        "x": 6,
        "y": 7,
        "sprite": "paper"
      },
      {
        "id": "command-architect-practice",
        "type": "practice",
        "x": 5,
        "y": 9,
        "sprite": "hint_token"
      }
    ],
    "doors": [
      {
        "id": "back",
        "x": 8,
        "y": 0,
        "target": {
          "kind": "chamber",
          "chamber": "slash-foyer"
        },
        "spawnX": 8,
        "spawnY": 10,
        "locked": false
      },
      {
        "id": "to-execution",
        "x": 15,
        "y": 6,
        "target": {
          "kind": "chamber",
          "chamber": "slash-execution"
        },
        "spawnX": 1,
        "spawnY": 6,
        "locked": false
      }
    ],
    "npcs": [],
    "decorations": [
      {
        "x": 6,
        "y": 10,
        "sprite": "bookshelf"
      },
      {
        "x": 5,
        "y": 10,
        "sprite": "bookshelf"
      },
      {
        "x": 4,
        "y": 10,
        "sprite": "bookshelf"
      },
      {
        "x": 2,
        "y": 3,
        "sprite": "summoning_circle"
      },
      {
        "x": 13,
        "y": 10,
        "sprite": "wall_runes"
      },
      {
        "x": 12,
        "y": 10,
        "sprite": "wall_runes"
      },
      {
        "x": 1,
        "y": 6,
        "sprite": "wall_runes"
      },
      {
        "x": 2,
        "y": 1,
        "sprite": "wall_runes"
      },
      {
        "x": 14,
        "y": 9,
        "sprite": "wall_runes"
      },
      {
        "x": 14,
        "y": 8,
        "sprite": "wall_runes"
      },
      {
        "x": 13,
        "y": 9,
        "sprite": "wall_runes"
      },
      {
        "x": 14,
        "y": 1,
        "sprite": "wall_runes"
      },
      {
        "x": 14,
        "y": 10,
        "sprite": "wall_runes"
      }
    ],
    "spawnX": 8,
    "spawnY": 1
  },
  "slash-execution": {
    "width": 16,
    "height": 12,
    "tiles": [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    "items": [
      {
        "id": "terminal",
        "type": "challenge",
        "x": 11,
        "y": 6,
        "sprite": "goblin_a"
      },
      {
        "id": "card-c",
        "type": "lore",
        "x": 8,
        "y": 8,
        "sprite": "paper"
      },
      {
        "id": "defense-in-depth",
        "type": "lore",
        "x": 4,
        "y": 5,
        "sprite": "paper"
      }
    ],
    "doors": [
      {
        "id": "back",
        "x": 0,
        "y": 6,
        "target": {
          "kind": "chamber",
          "chamber": "slash-registry"
        },
        "spawnX": 14,
        "spawnY": 6,
        "locked": false
      },
      {
        "id": "exit",
        "x": 15,
        "y": 6,
        "target": {
          "kind": "level",
          "level": "mcp",
          "chamber": "mcp-hub"
        },
        "spawnX": 8,
        "spawnY": 1,
        "locked": true,
        "requiresLevelKey": true
      }
    ],
    "npcs": [],
    "decorations": [
      {
        "x": 12,
        "y": 9,
        "sprite": "wall_runes"
      },
      {
        "x": 2,
        "y": 1,
        "sprite": "summoning_circle"
      },
      {
        "x": 1,
        "y": 3,
        "sprite": "cable_run"
      },
      {
        "x": 4,
        "y": 9,
        "sprite": "cable_run"
      },
      {
        "x": 13,
        "y": 10,
        "sprite": "wall_runes"
      },
      {
        "x": 12,
        "y": 10,
        "sprite": "wall_runes"
      },
      {
        "x": 7,
        "y": 1,
        "sprite": "bones"
      },
      {
        "x": 9,
        "y": 10,
        "sprite": "brazier"
      },
      {
        "x": 14,
        "y": 1,
        "sprite": "cracked_bricks"
      }
    ],
    "spawnX": 1,
    "spawnY": 6,
    "keySpawn": {
      "x": 13,
      "y": 6
    }
  },
  "mcp-hub": {
    "width": 16,
    "height": 12,
    "tiles": [
      [1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1],
      [1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    "items": [
      {
        "id": "broadcast",
        "type": "lore",
        "x": 10,
        "y": 6,
        "sprite": "paper"
      },
      {
        "id": "connection-log",
        "type": "lore",
        "x": 5,
        "y": 9,
        "sprite": "paper"
      },
      {
        "id": "essential-stack",
        "type": "lore",
        "x": 6,
        "y": 7,
        "sprite": "paper"
      }
    ],
    "doors": [
      {
        "id": "back-to-slash",
        "x": 8,
        "y": 0,
        "target": {
          "kind": "chamber",
          "chamber": "slash-execution"
        },
        "spawnX": 14,
        "spawnY": 6,
        "locked": false
      },
      {
        "id": "to-rack",
        "x": 4,
        "y": 11,
        "target": {
          "kind": "chamber",
          "chamber": "mcp-rack"
        },
        "spawnX": 8,
        "spawnY": 1,
        "locked": false
      }
    ],
    "npcs": [
      {
        "id": "connector-bot",
        "x": 7,
        "y": 4,
        "sprite": "duck",
        "color": "#00D4AA",
        "name": "Connector Duck",
        "dialog": [
          "Quack. Welcome to the Hub. We trade in connections.",
          "MCP — Model Context Protocol — open standard. Write the integration once, every AI client speaks to it.",
          "Essential stack to start: GitHub, Context7 (current docs), Playwright (browser), Filesystem. Four servers cover most daily work.",
          "#1 mistake: installing every cool server. Each one bloats context. Start lean. Add by need, not FOMO.",
          "Every tool call sees what the AUTH TOKEN sees. Default-deny in /permissions. Auto-approve specific tools, never whole servers."
        ]
      }
    ],
    "decorations": [
      {
        "x": 13,
        "y": 8,
        "sprite": "mana_crystal"
      },
      {
        "x": 8,
        "y": 7,
        "sprite": "floor_lever"
      },
      {
        "x": 2,
        "y": 6,
        "sprite": "anvil"
      }
    ],
    "spawnX": 8,
    "spawnY": 1
  },
  "mcp-rack": {
    "width": 16,
    "height": 12,
    "tiles": [
      [1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    "items": [
      {
        "id": "rack-a",
        "type": "lore",
        "x": 6,
        "y": 2,
        "sprite": "paper"
      },
      {
        "id": "rack-b",
        "type": "lore",
        "x": 5,
        "y": 9,
        "sprite": "paper"
      },
      {
        "id": "mcp-mistake",
        "type": "lore",
        "x": 8,
        "y": 1,
        "sprite": "paper"
      },
      {
        "id": "integrations-engineer-practice",
        "type": "practice",
        "x": 3,
        "y": 6,
        "sprite": "hint_token"
      }
    ],
    "doors": [
      {
        "id": "back",
        "x": 8,
        "y": 0,
        "target": {
          "kind": "chamber",
          "chamber": "mcp-hub"
        },
        "spawnX": 4,
        "spawnY": 10,
        "locked": false
      },
      {
        "id": "to-integration",
        "x": 15,
        "y": 8,
        "target": {
          "kind": "chamber",
          "chamber": "mcp-integration"
        },
        "spawnX": 1,
        "spawnY": 8,
        "locked": false
      }
    ],
    "npcs": [],
    "decorations": [
      {
        "x": 2,
        "y": 5,
        "sprite": "bookshelf"
      },
      {
        "x": 2,
        "y": 6,
        "sprite": "bookshelf"
      },
      {
        "x": 2,
        "y": 7,
        "sprite": "bookshelf"
      },
      {
        "x": 1,
        "y": 1,
        "sprite": "hanging_lantern"
      },
      {
        "x": 1,
        "y": 10,
        "sprite": "brazier"
      },
      {
        "x": 1,
        "y": 3,
        "sprite": "chains"
      },
      {
        "x": 11,
        "y": 10,
        "sprite": "cobweb"
      },
      {
        "x": 2,
        "y": 3,
        "sprite": "cable_run"
      },
      {
        "x": 10,
        "y": 10,
        "sprite": "cable_run"
      },
      {
        "x": 12,
        "y": 5,
        "sprite": "cable_run"
      }
    ],
    "spawnX": 8,
    "spawnY": 1
  },
  "mcp-integration": {
    "width": 16,
    "height": 12,
    "tiles": [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1],
      [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1],
      [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
      [2, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
      [1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
      [1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    "items": [
      {
        "id": "terminal",
        "type": "challenge",
        "x": 11,
        "y": 6,
        "sprite": "ghost_a"
      },
      {
        "id": "rack-c",
        "type": "lore",
        "x": 3,
        "y": 8,
        "sprite": "paper"
      },
      {
        "id": "hooks-mcp-pair",
        "type": "lore",
        "x": 5,
        "y": 5,
        "sprite": "paper"
      }
    ],
    "doors": [
      {
        "id": "back",
        "x": 0,
        "y": 8,
        "target": {
          "kind": "chamber",
          "chamber": "mcp-rack"
        },
        "spawnX": 14,
        "spawnY": 8,
        "locked": false
      },
      {
        "id": "exit",
        "x": 15,
        "y": 6,
        "target": {
          "kind": "level",
          "level": "subagents",
          "chamber": "subagents-lobby"
        },
        "spawnX": 1,
        "spawnY": 6,
        "locked": true,
        "requiresLevelKey": true
      }
    ],
    "npcs": [],
    "decorations": [
      {
        "x": 4,
        "y": 2,
        "sprite": "floor_lever"
      },
      {
        "x": 9,
        "y": 8,
        "sprite": "brazier"
      },
      {
        "x": 8,
        "y": 1,
        "sprite": "treasure_chest"
      },
      {
        "x": 11,
        "y": 10,
        "sprite": "crt_terminal"
      },
      {
        "x": 2,
        "y": 10,
        "sprite": "server_stack"
      },
      {
        "x": 12,
        "y": 1,
        "sprite": "chains"
      },
      {
        "x": 14,
        "y": 10,
        "sprite": "cobweb"
      },
      {
        "x": 1,
        "y": 1,
        "sprite": "bones"
      },
      {
        "x": 9,
        "y": 1,
        "sprite": "hanging_lantern"
      }
    ],
    "spawnX": 1,
    "spawnY": 8,
    "keySpawn": {
      "x": 13,
      "y": 6
    }
  },
  "subagents-lobby": {
    "width": 16,
    "height": 12,
    "tiles": [
      [1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
      [1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
      [1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    "items": [
      {
        "id": "roster",
        "type": "lore",
        "x": 10,
        "y": 6,
        "sprite": "paper"
      },
      {
        "id": "agent-taxonomy",
        "type": "lore",
        "x": 4,
        "y": 4,
        "sprite": "paper"
      }
    ],
    "doors": [
      {
        "id": "back-to-mcp",
        "x": 0,
        "y": 6,
        "target": {
          "kind": "chamber",
          "chamber": "mcp-integration"
        },
        "spawnX": 14,
        "spawnY": 6,
        "locked": false
      },
      {
        "id": "to-pool",
        "x": 8,
        "y": 0,
        "target": {
          "kind": "chamber",
          "chamber": "subagents-pool"
        },
        "spawnX": 8,
        "spawnY": 10,
        "locked": false
      }
    ],
    "npcs": [
      {
        "id": "scout-bot",
        "x": 12,
        "y": 2,
        "color": "#3FB950",
        "name": "Scout-bot",
        "dialog": [
          "I run the Explore lane. Read-only — I never touch anything.",
          "Send me into a 500-file repo with 'find every place we touch client billing'. I come back with paths and line numbers."
        ]
      },
      {
        "id": "planner-bot",
        "x": 5,
        "y": 7,
        "color": "#6BA8DD",
        "name": "Planner-bot",
        "dialog": [
          "I plan. Architecture, file structure, deliverable outlines. The boring-but-load-bearing part.",
          "Hand me a goal and the constraints. I come back with steps. Use me before any big build — saves you the rewrite."
        ]
      }
    ],
    "decorations": [
      {
        "x": 1,
        "y": 1,
        "sprite": "sconce"
      },
      {
        "x": 9,
        "y": 10,
        "sprite": "treasure_chest"
      },
      {
        "x": 8,
        "y": 6,
        "sprite": "puddle"
      },
      {
        "x": 12,
        "y": 8,
        "sprite": "puddle"
      },
      {
        "x": 4,
        "y": 10,
        "sprite": "puddle"
      },
      {
        "x": 1,
        "y": 10,
        "sprite": "cobweb"
      },
      {
        "x": 4,
        "y": 1,
        "sprite": "chains"
      },
      {
        "x": 7,
        "y": 2,
        "sprite": "rubble"
      },
      {
        "x": 13,
        "y": 8,
        "sprite": "bones"
      },
      {
        "x": 13,
        "y": 4,
        "sprite": "weapon_rack"
      },
      {
        "x": 12,
        "y": 4,
        "sprite": "anvil"
      }
    ],
    "spawnX": 1,
    "spawnY": 6
  },
  "subagents-pool": {
    "width": 16,
    "height": 12,
    "tiles": [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 2],
      [1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1]
    ],
    "items": [
      {
        "id": "mission-brief",
        "type": "lore",
        "x": 4,
        "y": 8,
        "sprite": "paper"
      },
      {
        "id": "git-shared-vs-local",
        "type": "lore",
        "x": 7,
        "y": 3,
        "sprite": "paper"
      }
    ],
    "doors": [
      {
        "id": "back",
        "x": 8,
        "y": 11,
        "target": {
          "kind": "chamber",
          "chamber": "subagents-lobby"
        },
        "spawnX": 8,
        "spawnY": 1,
        "locked": false
      },
      {
        "id": "to-briefing",
        "x": 15,
        "y": 6,
        "target": {
          "kind": "chamber",
          "chamber": "subagents-briefing"
        },
        "spawnX": 8,
        "spawnY": 1,
        "locked": false
      }
    ],
    "npcs": [
      {
        "id": "reviewer-bot",
        "x": 4,
        "y": 5,
        "color": "#F0C040",
        "name": "Reviewer-bot",
        "dialog": [
          "Code reviewer. Independent second-opinion energy. Fresh eyes — no conversation context.",
          "Hand me a diff. I'll tell you what's shaky. I see what your main agent missed."
        ]
      },
      {
        "id": "debugger-bot",
        "x": 9,
        "y": 5,
        "color": "#FF6B8A",
        "name": "Debugger-bot",
        "dialog": [
          "I chase bugs through stack traces. Scientific method only — hypothesize, instrument, verify.",
          "Hand me a repro, I bring back the root cause. No band-aids."
        ]
      }
    ],
    "decorations": [
      {
        "x": 1,
        "y": 5,
        "sprite": "treasure_chest"
      },
      {
        "x": 12,
        "y": 10,
        "sprite": "summoning_circle"
      },
      {
        "x": 7,
        "y": 1,
        "sprite": "cable_run"
      },
      {
        "x": 1,
        "y": 1,
        "sprite": "rubble"
      },
      {
        "x": 2,
        "y": 8,
        "sprite": "puddle"
      },
      {
        "x": 7,
        "y": 1,
        "sprite": "wall_runes"
      },
      {
        "x": 10,
        "y": 1,
        "sprite": "barrel"
      },
      {
        "x": 4,
        "y": 10,
        "sprite": "weapon_rack"
      },
      {
        "x": 14,
        "y": 1,
        "sprite": "banner"
      }
    ],
    "spawnX": 8,
    "spawnY": 10
  },
  "subagents-briefing": {
    "width": 16,
    "height": 12,
    "tiles": [
      [1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1],
      [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    "items": [
      {
        "id": "terminal",
        "type": "challenge",
        "x": 12,
        "y": 7,
        "sprite": "skeleton_a"
      },
      {
        "id": "routines",
        "type": "lore",
        "x": 2,
        "y": 6,
        "sprite": "paper"
      },
      {
        "id": "plugin",
        "type": "lore",
        "x": 7,
        "y": 4,
        "sprite": "paper"
      },
      {
        "id": "orchestrator-practice",
        "type": "practice",
        "x": 2,
        "y": 2,
        "sprite": "hint_token"
      }
    ],
    "doors": [
      {
        "id": "back",
        "x": 8,
        "y": 0,
        "target": {
          "kind": "chamber",
          "chamber": "subagents-pool"
        },
        "spawnX": 14,
        "spawnY": 6,
        "locked": false
      },
      {
        "id": "exit",
        "x": 15,
        "y": 6,
        "target": {
          "kind": "level",
          "level": "final-boss",
          "chamber": "final-boss-throne"
        },
        "spawnX": 1,
        "spawnY": 8,
        "locked": true,
        "requiresLevelKey": true
      }
    ],
    "npcs": [],
    "decorations": [
      {
        "x": 6,
        "y": 9,
        "sprite": "mana_crystal"
      },
      {
        "x": 5,
        "y": 3,
        "sprite": "sconce"
      },
      {
        "x": 12,
        "y": 1,
        "sprite": "cursor_beacon"
      },
      {
        "x": 2,
        "y": 1,
        "sprite": "bookshelf"
      },
      {
        "x": 3,
        "y": 1,
        "sprite": "bookshelf"
      },
      {
        "x": 1,
        "y": 1,
        "sprite": "bookshelf"
      },
      {
        "x": 9,
        "y": 10,
        "sprite": "chains"
      },
      {
        "x": 4,
        "y": 10,
        "sprite": "bones"
      },
      {
        "x": 13,
        "y": 4,
        "sprite": "cable_run"
      },
      {
        "x": 1,
        "y": 9,
        "sprite": "rubble"
      }
    ],
    "spawnX": 8,
    "spawnY": 1,
    "keySpawn": {
      "x": 13,
      "y": 9
    }
  },
  "final-boss-throne": {
    "width": 28,
    "height": 16,
    "tiles": [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    "items": [
      {
        "id": "overlord-altar",
        "type": "challenge",
        "x": 22,
        "y": 7,
        "sprite": "dragon_a"
      },
      {
        "id": "complexity-maxim",
        "type": "lore",
        "x": 12,
        "y": 8,
        "sprite": "paper"
      },
      {
        "id": "the-loop",
        "type": "lore",
        "x": 17,
        "y": 8,
        "sprite": "paper"
      }
    ],
    "doors": [
      {
        "id": "back",
        "x": 0,
        "y": 8,
        "target": {
          "kind": "chamber",
          "chamber": "subagents-briefing"
        },
        "spawnX": 14,
        "spawnY": 6,
        "locked": false
      },
      {
        "id": "exit",
        "x": 27,
        "y": 8,
        "target": {
          "kind": "end"
        },
        "spawnX": 0,
        "spawnY": 0,
        "locked": true,
        "requiresLevelKey": true
      }
    ],
    "npcs": [],
    "decorations": [
      {
        "x": 3,
        "y": 12,
        "sprite": "brazier"
      },
      {
        "x": 3,
        "y": 3,
        "sprite": "brazier"
      },
      {
        "x": 7,
        "y": 4,
        "sprite": "hanging_lantern"
      },
      {
        "x": 10,
        "y": 11,
        "sprite": "hanging_lantern"
      },
      {
        "x": 7,
        "y": 11,
        "sprite": "hanging_lantern"
      },
      {
        "x": 19,
        "y": 4,
        "sprite": "hanging_lantern"
      },
      {
        "x": 16,
        "y": 4,
        "sprite": "hanging_lantern"
      },
      {
        "x": 13,
        "y": 4,
        "sprite": "hanging_lantern"
      },
      {
        "x": 10,
        "y": 4,
        "sprite": "hanging_lantern"
      },
      {
        "x": 19,
        "y": 11,
        "sprite": "hanging_lantern"
      },
      {
        "x": 16,
        "y": 11,
        "sprite": "hanging_lantern"
      },
      {
        "x": 13,
        "y": 11,
        "sprite": "hanging_lantern"
      },
      {
        "x": 25,
        "y": 5,
        "sprite": "bones"
      },
      {
        "x": 24,
        "y": 2,
        "sprite": "bones"
      },
      {
        "x": 10,
        "y": 6,
        "sprite": "bones"
      },
      {
        "x": 24,
        "y": 13,
        "sprite": "bones"
      },
      {
        "x": 4,
        "y": 10,
        "sprite": "bones"
      },
      {
        "x": 20,
        "y": 13,
        "sprite": "bones"
      },
      {
        "x": 11,
        "y": 14,
        "sprite": "cobweb"
      },
      {
        "x": 5,
        "y": 14,
        "sprite": "cobweb"
      },
      {
        "x": 8,
        "y": 1,
        "sprite": "cobweb"
      },
      {
        "x": 20,
        "y": 1,
        "sprite": "cobweb"
      },
      {
        "x": 18,
        "y": 1,
        "sprite": "chains"
      },
      {
        "x": 16,
        "y": 8,
        "sprite": "bones"
      },
      {
        "x": 16,
        "y": 9,
        "sprite": "rubble"
      },
      {
        "x": 5,
        "y": 2,
        "sprite": "rubble"
      },
      {
        "x": 20,
        "y": 14,
        "sprite": "rubble"
      },
      {
        "x": 1,
        "y": 14,
        "sprite": "banner"
      },
      {
        "x": 1,
        "y": 1,
        "sprite": "banner"
      },
      {
        "x": 26,
        "y": 12,
        "sprite": "banner"
      },
      {
        "x": 26,
        "y": 10,
        "sprite": "banner"
      },
      {
        "x": 26,
        "y": 5,
        "sprite": "banner"
      },
      {
        "x": 26,
        "y": 3,
        "sprite": "banner"
      },
      {
        "x": 12,
        "y": 1,
        "sprite": "cable_run"
      }
    ],
    "spawnX": 1,
    "spawnY": 8,
    "keySpawn": {
      "x": 25,
      "y": 8
    }
  },
  "twic-room-1": {
    "width": 16,
    "height": 12,
    "tiles": [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    "items": [
      // Boss sprite is the visible monster in the room and matches the
      // battle UI's spriteKey. Room 1 = skeleton, room 2 = ghost, room 3 =
      // dragon (per user direction — variety across the three TWiC rooms).
      // Rendered at scaleOverride=2 in Room.tsx for TWiC → 32px inside the
      // 40px tile, fits 1×1 with margin.
      { "id": "terminal", "type": "challenge", "x": 13, "y": 6, "sprite": "skeleton_a" },
      { "id": "twic-1-lore-a", "type": "lore", "x": 10, "y": 2, "sprite": "paper" },
      { "id": "twic-1-lore-b", "type": "lore", "x": 10, "y": 9, "sprite": "paper" },
      { "id": "twic-1-practice", "type": "practice", "x": 14, "y": 2, "sprite": "hint_token" }
    ],
    "doors": [
      {
        "id": "exit",
        "x": 15,
        "y": 6,
        "target": { "kind": "level", "level": "twic-2", "chamber": "twic-room-2" },
        "spawnX": 1,
        "spawnY": 6,
        "locked": true,
        "requiresLevelKey": true
      }
    ],
    "npcs": [
      {
        "id": "twic-npc-1",
        "x": 4,
        "y": 6,
        "color": "#6EAAEF",
        "name": "Beat Reporter",
        "dialog": []
      }
    ],
    "decorations": [
      { "x": 8, "y": 8, "sprite": "bookshelf" },
      { "x": 8, "y": 9, "sprite": "bookshelf" },
      { "x": 8, "y": 10, "sprite": "bookshelf" },
      { "x": 12, "y": 1, "sprite": "bookshelf" },
      { "x": 12, "y": 10, "sprite": "bookshelf" },
      { "x": 12, "y": 9, "sprite": "bookshelf" },
      { "x": 12, "y": 8, "sprite": "bookshelf" },
      { "x": 12, "y": 2, "sprite": "bookshelf" },
      { "x": 12, "y": 3, "sprite": "bookshelf" },
      { "x": 8, "y": 1, "sprite": "bookshelf" },
      { "x": 8, "y": 3, "sprite": "bookshelf" },
      { "x": 8, "y": 2, "sprite": "bookshelf" },
      { "x": 6, "y": 4, "sprite": "brazier" },
      { "x": 6, "y": 7, "sprite": "brazier" },
      { "x": 2, "y": 1, "sprite": "banner" },
      { "x": 5, "y": 1, "sprite": "banner" },
      { "x": 4, "y": 10, "sprite": "mana_crystal" },
      { "x": 2, "y": 10, "sprite": "anvil" },
      { "x": 3, "y": 10, "sprite": "weapon_rack" },
      { "x": 4, "y": 1, "sprite": "server_stack" },
      { "x": 3, "y": 1, "sprite": "server_stack" },
      { "x": 5, "y": 10, "sprite": "barrel" }
    ],
    "spawnX": 2,
    "spawnY": 6,
    "keySpawn": { "x": 14, "y": 8 }
  },
  "twic-room-2": {
    "width": 16,
    "height": 12,
    "tiles": [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2],
      [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    "items": [
      // Room 2 boss = ghost (per user direction). Renders 1×1 via Room.tsx's
      // scaleOverride for level.track === 'twic'.
      { "id": "terminal", "type": "challenge", "x": 11, "y": 8, "sprite": "ghost_a" },
      { "id": "twic-2-lore-a", "type": "lore", "x": 6, "y": 2, "sprite": "paper" },
      { "id": "twic-2-lore-b", "type": "lore", "x": 6, "y": 9, "sprite": "paper" },
      { "id": "twic-2-practice", "type": "practice", "x": 12, "y": 2, "sprite": "hint_token" }
    ],
    "doors": [
      {
        "id": "exit",
        "x": 15,
        "y": 6,
        "target": { "kind": "level", "level": "twic-3", "chamber": "twic-room-3" },
        "spawnX": 1,
        "spawnY": 6,
        "locked": true,
        "requiresLevelKey": true
      }
    ],
    "npcs": [
      {
        "id": "twic-npc-2",
        "x": 2,
        "y": 9,
        "color": "#6EAAEF",
        "name": "Beat Reporter",
        "dialog": []
      }
    ],
    "decorations": [
      { "x": 10, "y": 4, "sprite": "brazier" },
      { "x": 13, "y": 4, "sprite": "brazier" },
      { "x": 13, "y": 10, "sprite": "bookshelf" },
      { "x": 10, "y": 10, "sprite": "bookshelf" },
      { "x": 9, "y": 10, "sprite": "bookshelf" },
      { "x": 11, "y": 10, "sprite": "bookshelf" },
      { "x": 12, "y": 10, "sprite": "bookshelf" },
      { "x": 14, "y": 10, "sprite": "bookshelf" },
      { "x": 1, "y": 8, "sprite": "bookshelf" },
      { "x": 1, "y": 9, "sprite": "bookshelf" },
      { "x": 2, "y": 10, "sprite": "bookshelf" },
      { "x": 1, "y": 10, "sprite": "bookshelf" },
      { "x": 3, "y": 10, "sprite": "bookshelf" },
      { "x": 13, "y": 1, "sprite": "server_stack" },
      { "x": 12, "y": 1, "sprite": "server_stack" },
      { "x": 11, "y": 1, "sprite": "server_stack" }
    ],
    "spawnX": 2,
    "spawnY": 2,
    "keySpawn": { "x": 14, "y": 6 }
  },
  "twic-room-3": {
    "width": 16,
    "height": 12,
    "tiles": [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 2],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    "items": [
      // Room 3 (final) boss = dragon (per user direction — climactic final
      // boss). Even the dragon renders 1×1 via scaleOverride=2; its natural
      // BESTIARY scale of 7 (112px) would normally span 3 tiles.
      { "id": "terminal", "type": "challenge", "x": 12, "y": 7, "sprite": "dragon_a" },
      { "id": "twic-3-lore-a", "type": "lore", "x": 2, "y": 4, "sprite": "paper" },
      { "id": "twic-3-lore-b", "type": "lore", "x": 3, "y": 9, "sprite": "paper" },
      { "id": "twic-3-practice", "type": "practice", "x": 11, "y": 10, "sprite": "hint_token" }
    ],
    "doors": [
      {
        "id": "exit",
        "x": 15,
        "y": 6,
        "target": { "kind": "end" },
        "spawnX": 1,
        "spawnY": 6,
        "locked": true,
        "requiresLevelKey": true
      }
    ],
    "npcs": [
      {
        "id": "twic-npc-3",
        "x": 6,
        "y": 2,
        "color": "#6EAAEF",
        "name": "Beat Reporter",
        "dialog": []
      }
    ],
    "decorations": [
      { "x": 7, "y": 5, "sprite": "hanging_lantern" },
      { "x": 4, "y": 3, "sprite": "floor_lever" },
      { "x": 2, "y": 2, "sprite": "hanging_lantern" },
      { "x": 11, "y": 5, "sprite": "bookshelf" },
      { "x": 12, "y": 5, "sprite": "bookshelf" },
      { "x": 14, "y": 5, "sprite": "bookshelf" },
      { "x": 13, "y": 5, "sprite": "bookshelf" },
      { "x": 14, "y": 8, "sprite": "bones" },
      { "x": 8, "y": 6, "sprite": "cobweb" },
      { "x": 10, "y": 10, "sprite": "crt_terminal" },
      { "x": 12, "y": 10, "sprite": "server_stack" },
      { "x": 3, "y": 10, "sprite": "anvil" },
      { "x": 2, "y": 10, "sprite": "weapon_rack" },
      { "x": 4, "y": 10, "sprite": "treasure_chest" }
    ],
    "spawnX": 13,
    "spawnY": 2,
    "keySpawn": { "x": 14, "y": 6 }
  }
};
