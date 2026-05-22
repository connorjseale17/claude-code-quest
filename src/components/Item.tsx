import { PixelSprite } from './PixelSprite';

interface ItemProps {
  x: number;
  y: number;
  type: 'challenge' | 'lore' | 'practice';
  sprite: string;
  tileSize: number;
  /** Optional tint applied to palette '1' for theming */
  tint?: string;
}

export function Item({ x, y, sprite, tileSize, tint }: ItemProps) {
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
      <PixelSprite frame={sprite} scale={3} primaryColor={tint} />
    </div>
  );
}
