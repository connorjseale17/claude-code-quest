import { useGame } from '../engine/GameContext';
import { LEVEL_CONFIGS } from '../engine/roomConfigs';
import { Bot } from './Bot';
import { Item } from './Item';
import { Door } from './Door';
import { PixelSprite, PropSprite } from './PixelSprite';
import { PROP_FRAMES } from '../assets/sprites';
import { DPad } from './DPad';

const TILE_SIZE = 40;

type ActiveObjective =
  | { kind: 'item'; itemId: string }
  | { kind: 'key' }
  | { kind: 'door'; doorId: string }
  | null;

export function Room() {
  const state = useGame();
  const level = LEVEL_CONFIGS[state.currentLevel];
  const chamber = level.chambers[state.currentChamber];
  const levelState = state.levels[state.currentLevel];

  const theme = level.theme;

  const totalWidth = chamber.width * TILE_SIZE;
  const totalHeight = chamber.height * TILE_SIZE;

  // Determine which thing should glow as the active objective.
  const challengeItem = chamber.items.find(i => i.type === 'challenge');
  const isChallengeChamber = chamber.id === level.challengeChamber;

  let activeObjective: ActiveObjective = null;
  if (!levelState.challengePassed && challengeItem) {
    activeObjective = { kind: 'item', itemId: challengeItem.id };
  } else if (levelState.challengePassed && !levelState.keyCollected && chamber.keySpawn && isChallengeChamber) {
    activeObjective = { kind: 'key' };
  } else if (levelState.keyCollected) {
    // Glow the exit door if it's in this chamber
    const exitDoor = chamber.doors.find(
      d => d.requiresLevelKey && (d.target.kind === 'level' || d.target.kind === 'end'),
    );
    if (exitDoor) activeObjective = { kind: 'door', doorId: exitDoor.id };
  }

  return (
    <div
      className="relative mx-auto"
      style={{
        width: totalWidth,
        height: totalHeight,
      }}
    >
      {/* Floor and walls — walls render as void-black; floor tiles adjacent
          to walls get a 3px orange edge strip on each wall-facing side
          (bright on top/left, dark on bottom/right). Matches the design
          file aesthetic. */}
      {chamber.tiles.map((row, y) =>
        row.map((tile, x) => {
          const isWall = tile === 1;
          const isDoorTile = chamber.doors.some(d => d.x === x && d.y === y);
          if (isDoorTile) return null;

          // For floor tiles only, check each neighbor for wall adjacency.
          const isWallTile = (nx: number, ny: number) => {
            if (nx < 0 || ny < 0 || nx >= chamber.width || ny >= chamber.height) return true;
            return chamber.tiles[ny][nx] === 1;
          };
          const wallNorth = !isWall && isWallTile(x, y - 1);
          const wallSouth = !isWall && isWallTile(x, y + 1);
          const wallWest = !isWall && isWallTile(x - 1, y);
          const wallEast = !isWall && isWallTile(x + 1, y);

          const isFloorDot =
            !isWall &&
            x % 5 === 2 &&
            y % 5 === 2 &&
            x > 0 && y > 0 &&
            x < chamber.width - 1 &&
            y < chamber.height - 1;

          const edgeLight = theme.accentColor;
          const edgeDark = theme.wallShadow ?? theme.accentColor;
          const stripT = 3;

          return (
            <div
              key={`${x}-${y}`}
              className="absolute"
              style={{
                left: x * TILE_SIZE,
                top: y * TILE_SIZE,
                width: TILE_SIZE,
                height: TILE_SIZE,
                background: isWall ? '#0C0B0A' : theme.floorColor,
              }}
            >
              {wallNorth && (
                <div className="absolute" style={{ left: 0, top: 0, width: TILE_SIZE, height: stripT, background: edgeLight }} />
              )}
              {wallWest && (
                <div className="absolute" style={{ left: 0, top: 0, width: stripT, height: TILE_SIZE, background: edgeLight }} />
              )}
              {wallSouth && (
                <div className="absolute" style={{ left: 0, top: TILE_SIZE - stripT, width: TILE_SIZE, height: stripT, background: edgeDark }} />
              )}
              {wallEast && (
                <div className="absolute" style={{ left: TILE_SIZE - stripT, top: 0, width: stripT, height: TILE_SIZE, background: edgeDark }} />
              )}
              {isFloorDot && (
                <div
                  className="absolute"
                  style={{
                    width: 4,
                    height: 4,
                    background: theme.floorDot,
                    opacity: 0.4,
                    left: TILE_SIZE / 2 - 2,
                    top: TILE_SIZE / 2 - 2,
                  }}
                />
              )}
            </div>
          );
        }),
      )}

      {/* Decorations (non-interactive flavor sprites). Props use their own
          palette + frame table; other sprites fall back to the global FRAMES. */}
      {chamber.decorations.map((dec, i) => {
        const isProp = Boolean(PROP_FRAMES[dec.sprite]);
        return (
          <div
            key={`dec-${i}`}
            className="absolute pointer-events-none"
            style={{
              left: dec.x * TILE_SIZE,
              top: dec.y * TILE_SIZE,
              width: TILE_SIZE,
              height: TILE_SIZE,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.85,
            }}
          >
            {isProp ? (
              <PropSprite name={dec.sprite} scale={TILE_SIZE / Math.max(PROP_FRAMES[dec.sprite][0]?.length || 12, PROP_FRAMES[dec.sprite].length || 12)} />
            ) : (
              <PixelSprite
                frame={dec.sprite}
                scale={2}
                primaryColor={dec.tint}
              />
            )}
          </div>
        );
      })}

      {/* Doors */}
      {chamber.doors.map(door => {
        const passable = !door.locked || Boolean(door.requiresLevelKey && levelState.keyCollected);
        const glowing = activeObjective?.kind === 'door' && activeObjective.doorId === door.id;
        return (
          <div
            key={door.id}
            className={glowing ? 'cc-active-objective' : undefined}
            style={{
              ['--glow-color' as string]: theme.accentColor,
            } as React.CSSProperties}
          >
            <Door
              x={door.x}
              y={door.y}
              unlocked={passable}
              tileSize={TILE_SIZE}
            />
          </div>
        );
      })}

      {/* Items */}
      {chamber.items.map(item => {
        if (item.type === 'challenge' && levelState.challengePassed) return null;
        const glowing = activeObjective?.kind === 'item' && activeObjective.itemId === item.id;
        return (
          <div
            key={item.id}
            className={glowing ? 'cc-active-objective' : 'cc-guide-glow'}
            style={{
              ['--glow-color' as string]: theme.accentColor,
            } as React.CSSProperties}
          >
            <Item
              x={item.x}
              y={item.y}
              type={item.type}
              sprite={item.sprite}
              tileSize={TILE_SIZE}
              tint={item.type === 'lore' || item.type === 'practice' ? theme.accentColor : undefined}
            />
          </div>
        );
      })}

      {/* NPCs */}
      {chamber.npcs.map(npc => (
        <div
          key={npc.id}
          className="absolute pointer-events-none cc-guide-glow"
          style={{
            left: npc.x * TILE_SIZE,
            top: npc.y * TILE_SIZE,
            width: TILE_SIZE,
            height: TILE_SIZE,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            ['--glow-color' as string]: npc.color,
          } as React.CSSProperties}
        >
          <PixelSprite frame={npc.sprite ?? 'idle_a'} scale={2.4} primaryColor={npc.color} />
        </div>
      ))}

      {/* Key (appears after challenge pass, before collection) */}
      {chamber.keySpawn && levelState.challengePassed && !levelState.keyCollected && isChallengeChamber && (
        <div
          className="absolute cc-active-objective"
          style={{
            left: chamber.keySpawn.x * TILE_SIZE,
            top: chamber.keySpawn.y * TILE_SIZE,
            width: TILE_SIZE,
            height: TILE_SIZE,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ['--glow-color' as string]: theme.accentColor,
          } as React.CSSProperties}
        >
          <PixelSprite frame="key" scale={3} />
        </div>
      )}

      {/* Bot */}
      <Bot tileSize={TILE_SIZE} />

      {/* D-Pad indicator */}
      <DPad />
    </div>
  );
}
