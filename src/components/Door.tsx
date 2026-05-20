import { PixelSprite } from './PixelSprite';

interface DoorProps {
  x: number;
  y: number;
  unlocked: boolean;
  tileSize: number;
}

export function Door({ x, y, unlocked, tileSize }: DoorProps) {
  return (
    <div
      className="absolute flex items-center justify-center"
      style={{
        left: x * tileSize,
        top: y * tileSize,
        width: tileSize,
        height: tileSize,
        background: unlocked ? '#3FB950' : '#7D7D7D',
        border: `2px solid ${unlocked ? '#3FB950' : '#3A3A3A'}`,
      }}
    >
      {!unlocked && <PixelSprite frame="padlock" scale={2} />}
      {unlocked && (
        <div style={{ color: '#1A1A1A', fontSize: 18, fontWeight: 700 }}>
          {'>>'}
        </div>
      )}
    </div>
  );
}
