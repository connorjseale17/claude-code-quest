import { PixelSprite } from './PixelSprite';

interface DoorProps {
  x: number;
  y: number;
  unlocked: boolean;
  tileSize: number;
  /** True if this door's target is `{kind: 'end'}` — the door that ends the
   *  whole game. Unlocked end-doors get a dramatic gold treatment so the
   *  player can spot the final exit from across the chamber. Locked end-
   *  doors look like every other locked door (gray + padlock) — the gold
   *  reveal is itself part of the payoff for beating the final boss. */
  isEnd?: boolean;
}

const GOLD = '#FFD700';
const GOLD_BRIGHT = '#FFE970';
const GOLD_DEEP = '#C99A0F';

export function Door({ x, y, unlocked, tileSize, isEnd }: DoorProps) {
  if (isEnd && unlocked) {
    return (
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: x * tileSize,
          top: y * tileSize,
          width: tileSize,
          height: tileSize,
          background: `linear-gradient(135deg, ${GOLD_BRIGHT} 0%, ${GOLD} 55%, ${GOLD_DEEP} 100%)`,
          border: `2px solid ${GOLD}`,
          boxShadow: '0 0 24px rgba(255, 215, 0, 0.85), inset 0 0 12px rgba(255, 234, 100, 0.6)',
        }}
      >
        <div
          style={{
            color: '#1A1A1A',
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: '0.12em',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          EXIT
        </div>
      </div>
    );
  }

  // Default: regular level-to-level door (locked = gray + padlock; unlocked =
  // green with chevron). Unchanged from prior behavior.
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
