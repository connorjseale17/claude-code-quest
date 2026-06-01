import { useEffect, useState } from 'react';
import { PixelSprite } from './PixelSprite';
import { FRAMES, IMAGE_FRAMES } from '../assets/sprites';

interface ItemProps {
  x: number;
  y: number;
  type: 'challenge' | 'lore' | 'practice';
  sprite: string;
  tileSize: number;
  /** Optional tint applied to palette '1' for theming */
  tint?: string;
}

// Per-sprite scale overrides for bestiary altars. The design specifies
// fit:[2,2] for standard enemies (~80px = scale 5 at our 40px tile size)
// and fit:[5,5] for the dragon (~200px = scale 7). Any sprite not in this
// map uses the default 3.
const BESTIARY_SCALES: Record<string, number> = {
  slime_a: 5,
  ghost_a: 5,
  goblin_a: 5,
  skeleton_a: 5,
  warlock_a: 5,
  dragon_a: 7,
};

/** If `sprite` ends in `_a` and a `_b` variant exists, return the pair. */
function getAnimationPair(sprite: string): [string, string] | null {
  if (!sprite.endsWith('_a')) return null;
  const b = sprite.slice(0, -2) + '_b';
  if (FRAMES[b]) return [sprite, b];
  return null;
}

// Sprite names that should render as a real image (PNG) instead of a
// palette-grid frame. Used for hand-authored item art that doesn't fit the
// 16-wide pixel-grid format we use for everything else. Reuses
// IMAGE_FRAMES from sprites.ts so we get the refined, bundled asset.
export const IMAGE_SPRITES: Record<string, string> = {
  paper: IMAGE_FRAMES.book, // Minecraft-style book — used for every lore item
};

export function Item({ x, y, sprite, tileSize, tint }: ItemProps) {
  const pair = getAnimationPair(sprite);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!pair) return;
    const id = window.setInterval(() => setPhase(p => p ^ 1), 480);
    return () => clearInterval(id);
  }, [pair]);

  const frame = pair ? pair[phase] : sprite;
  const scale = BESTIARY_SCALES[sprite] ?? 3;
  const imgSrc = IMAGE_SPRITES[sprite];

  return (
    <div
      className="absolute flex items-center justify-center"
      style={{
        left: x * tileSize,
        top: y * tileSize,
        width: tileSize,
        height: tileSize,
      }}
    >
      {imgSrc ? (
        <img
          src={imgSrc}
          alt=""
          draggable={false}
          style={{
            width: tileSize * 0.85,
            height: tileSize * 0.85,
            imageRendering: 'pixelated',
            pointerEvents: 'none',
          }}
        />
      ) : (
        <PixelSprite frame={frame} scale={scale} primaryColor={tint} />
      )}
    </div>
  );
}
