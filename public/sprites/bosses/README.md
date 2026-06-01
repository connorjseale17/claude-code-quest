# Boss sprite art — drop-in slot

The boss battle renders real PNG art when a boss's content sets an `art` field.
Until a PNG is present, the boss falls back to its (rough) palette-grid sprite,
so the game stays playable.

## How to add art

1. Drop a PNG here named after the boss, e.g. `emberling.png`.
2. In the matching content file, set the `art` field on the `battle`:

   ```ts
   battle: {
     name: 'EMBERLING',
     spriteKey: 'emberling',          // grid fallback (unchanged)
     art: { src: '/sprites/bosses/emberling.png', width: 180 },
     // ...rest unchanged
   }
   ```

`width` is the displayed width in game px (height auto). Art renders pixelated
with CSS state effects (idle bob, attack lunge, hurt flash, defeat topple) — one
static PNG per boss is enough; no multi-frame sheet required.

## Files expected (one per boss)

| File | Boss | Theme | Suggested subject |
|------|------|-------|-------------------|
| `emberling.png` | Emberling (L1) | orange | small fire imp / whelp |
| `mordrang.png`  | Mordrang (L2)  | purple | robed sorcerer / wizard |
| `grist.png`     | Grist (L3)     | green  | stone golem |
| `vorthex.png`   | Vorthex (L4)   | teal   | winged dragon |
| `lich.png`      | Lich Quorum (L5) | pink | floating lich / skull |
| `overlord.png`  | The Overlord (final) | crimson | towering demon overlord |

Player bot upgrade (optional): `../bot_back.png` for a high-quality Claude robot,
wired the same way once provided.

## Licensing — REQUIRED

This is a public, deployed app. Only use art that is **CC0 / public domain** or
that you own. **Do not** use sprites ripped from commercial games (Nintendo,
Undertale, etc.) — that's copyright infringement.

### Vetted CC0 starting points (download on a machine with normal network)

- OpenGameArt CC0 collections: https://opengameart.org/content/cc0-resources
- "Bosses Pixel Art Sprite Sheet": https://opengameart.org/content/bosses-pixel-art-sprite-sheet
- 0x72 DungeonTileset II (CC0, has demon/ogre/etc.): https://0x72.itch.io/dungeontileset-ii
- Kenney (all CC0): https://kenney.nl/assets — incl. a Robot Pack for the bot

Record the source + license of each file you add in `CREDITS.md` alongside it
(CC0 doesn't require attribution, but provenance keeps us honest).
