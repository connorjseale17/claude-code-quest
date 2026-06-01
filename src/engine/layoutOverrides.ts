import type { SerializedChamber } from './roomConfigs';

// ============================================================================
// Layout overrides — committed, deployed-default chamber layouts produced by
// Layout Mode. A chamber id here REPLACES the hand-authored builder geometry
// at module load. Delete an entry to revert that chamber to its builder layout.
//
// Level 01 (welcome)   authored 2026-06-01
// Level 02 (claudemd)  authored 2026-06-01
// ============================================================================

export const LAYOUT_OVERRIDES: Record<string, SerializedChamber> = {
  "welcome-antechamber": {
    "width": 19,
    "height": 12,
    "tiles": [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
      [1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1],
      [1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    "items": [
      {
        "id": "manual",
        "type": "lore",
        "x": 7,
        "y": 6,
        "sprite": "paper"
      },
      {
        "id": "sticky-note",
        "type": "lore",
        "x": 16,
        "y": 4,
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
        "y": 5,
        "color": "#3FB950",
        "name": "Guide-bot",
        "dialog": [
          "Hey, operator. Fresh session? Good. Let's set you up before you wreck something.",
          "Four permission modes. PLAN — read-only, drafts an approach. ACCEPT-EDITS — writes for you, review by diff. AUTO — runs free, a classifier watches. ASK — confirms each step.",
          "Shift+Tab cycles them. Default to PLAN when you're walking into unfamiliar code. ACCEPT-EDITS when you're iterating. AUTO for long boring loops you trust the direction on.",
          "Building a one-pager for a client? Describe what you want in English. Review the plan. Approve. Vercel hosts it for free. Same as briefing a junior consultant — except this one types."
        ]
      }
    ],
    "decorations": [
      {
        "x": 7,
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
        "x": 7,
        "y": 9,
        "sprite": "bones"
      },
      {
        "x": 2,
        "y": 2,
        "sprite": "puddle"
      },
      {
        "x": 1,
        "y": 10,
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
        "x": 2,
        "y": 6,
        "sprite": "summoning_circle"
      }
    ],
    "spawnX": 2,
    "spawnY": 6
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
        "y": 4,
        "sprite": "hint_token"
      },
      {
        "id": "side-note",
        "type": "lore",
        "x": 3,
        "y": 6,
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
        "x": 8,
        "y": 4,
        "sprite": "crt_terminal"
      },
      {
        "x": 1,
        "y": 1,
        "sprite": "cobweb"
      },
      {
        "x": 17,
        "y": 1,
        "sprite": "chains"
      },
      {
        "x": 8,
        "y": 9,
        "sprite": "bones"
      },
      {
        "x": 17,
        "y": 10,
        "sprite": "cobweb"
      },
      {
        "x": 8,
        "y": 5,
        "sprite": "table"
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
        "x": 14,
        "y": 7,
        "sprite": "summoning_circle"
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
          "CLAUDE.md is the contract. Build commands. Test commands. Naming. Repository etiquette. The non-obvious things a new consultant on the project would need on day one.",
          "Keep it tight. Bloated CLAUDE.md gets ignored — important rules get lost in the noise. Prune like it's your billable hours.",
          "/compact when the window fills. /clear between unrelated tasks. /rewind if Claude wandered. Tools are sharp, operator. Use them."
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
        "id": "fragment-b",
        "type": "lore",
        "x": 5,
        "y": 9,
        "sprite": "paper"
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
  }
};
