import { useGame } from '../engine/GameContext';
import { BotIdle, BotWalk } from './PixelSprite';

interface BotProps {
  tileSize: number;
}

export function Bot({ tileSize }: BotProps) {
  const { bot, player } = useGame();

  const spriteScale = 3;
  const spriteW = 16 * spriteScale;
  const spriteH = 14 * spriteScale;

  const offsetX = (tileSize - spriteW) / 2;
  const offsetY = tileSize - spriteH;

  const flipX = bot.facing === 'left';

  return (
    <div
      className="absolute z-10 pointer-events-none"
      style={{
        left: bot.x * tileSize + offsetX,
        top: bot.y * tileSize + offsetY,
        transform: flipX ? 'scaleX(-1)' : undefined,
        transition: 'left 0.1s ease-out, top 0.1s ease-out',
      }}
    >
      {bot.animation === 'walk' ? (
        <BotWalk scale={spriteScale} primaryColor={player.botColor} />
      ) : (
        <BotIdle scale={spriteScale} primaryColor={player.botColor} />
      )}
    </div>
  );
}
