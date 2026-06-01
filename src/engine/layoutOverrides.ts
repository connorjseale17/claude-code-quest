import type { SerializedChamber } from './roomConfigs';

// ============================================================================
// Layout overrides — committed, deployed-default chamber layouts produced by
// Layout Mode. A chamber id here REPLACES the hand-authored builder geometry
// at module load. Delete an entry to revert that chamber to its builder layout.
//
// Level 01 (welcome) authored in Layout Mode on 2026-06-01.
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
  }
};
