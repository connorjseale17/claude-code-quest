import { useEffect, useState } from 'react';
import { PixelSprite } from './PixelSprite';
import { FRAMES } from '../assets/sprites';

interface ItemProps {
  x: number;
  y: number;
  type: 'challenge' | 'lore' | 'practice';
  sprite: string;
  tileSize: number;
  /** Optional tint applied to palette '1' for theming */
  tint?: string;
}

// Bestiary altars (slime, ghost, etc.) render larger than items so they read
// as boss encounters rather than collectibles.
const BIG_SPRITES = new Set(['slime_a', 'ghost_a', 'goblin_a', 'skeleton_a', 'warlock_a', 'dragon_a', 'warlock_a']);

/** If `sprite` ends in `_a` and a `_b` variant exists, return the pair. */
function getAnimationPair(sprite: string): [string, string] | null {
  if (!sprite.endsWith('_a')) return null;
  const b = sprite.slice(0, -2) + '_b';
  if (FRAMES[b]) return [sprite, b];
  return null;
}

export function Item({ x, y, sprite, tileSize, tint }: ItemProps) {
  const pair = getAnimationPair(sprite);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!pair) return;
    const id = window.setInterval(() => setPhase(p => p ^ 1), 480);
    return () => clearInterval(id);
  }, [pair]);

  const frame = pair ? pair[phase] : sprite;
  const scale = BIG_SPRITES.has(sprite) ? 4 : 3;

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
      <PixelSprite frame={frame} scale={scale} primaryColor={tint} />
    </div>
  );
}
