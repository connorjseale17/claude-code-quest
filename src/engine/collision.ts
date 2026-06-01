import type { ChamberConfig, DoorConfig } from './roomConfigs';
import type { LevelState } from './GameContext';

/** Is the door at (x, y) currently passable? */
export function isDoorPassable(door: DoorConfig, levelState: LevelState): boolean {
  if (!door.locked) return true;
  if (door.requiresLevelKey && levelState.keyCollected) return true;
  return false;
}

/** Find the door at a tile, if any. */
export function getDoorAt(
  x: number,
  y: number,
  chamber: ChamberConfig,
): DoorConfig | null {
  return chamber.doors.find(d => d.x === x && d.y === y) ?? null;
}

export function canMoveTo(
  x: number,
  y: number,
  chamber: ChamberConfig,
  levelState: LevelState,
): boolean {
  if (x < 0 || y < 0 || x >= chamber.width || y >= chamber.height) {
    return false;
  }

  const tile = chamber.tiles[y][x];

  // Solid wall
  if (tile === 1) return false;

  // NPCs block their tile
  if (chamber.npcs.some(n => n.x === x && n.y === y)) return false;

  // Door tile — only passable if door is passable
  const door = getDoorAt(x, y, chamber);
  if (door) return isDoorPassable(door, levelState);

  return true;
}

/** Returns an interactable item adjacent to the bot (within 1 tile), if any. */
export function getInteractableAt(
  botX: number,
  botY: number,
  chamber: ChamberConfig,
): { kind: 'item'; type: 'challenge' | 'lore' | 'practice'; itemId: string } | { kind: 'npc'; npcId: string } | null {
  // NPCs take priority — they don't sit on door tiles
  for (const npc of chamber.npcs) {
    const dx = Math.abs(botX - npc.x);
    const dy = Math.abs(botY - npc.y);
    if (dx <= 1 && dy <= 1) {
      return { kind: 'npc', npcId: npc.id };
    }
  }
  for (const item of chamber.items) {
    const dx = Math.abs(botX - item.x);
    const dy = Math.abs(botY - item.y);
    if (dx <= 1 && dy <= 1) {
      return { kind: 'item', type: item.type, itemId: item.id };
    }
  }
  return null;
}

/** True if the bot is standing on the key spawn point and the key is collectable. */
export function isOnKey(
  botX: number,
  botY: number,
  chamber: ChamberConfig,
  levelState: LevelState,
): boolean {
  if (!chamber.keySpawn) return false;
  if (!levelState.challengePassed || levelState.keyCollected) return false;
  return botX === chamber.keySpawn.x && botY === chamber.keySpawn.y;
}
