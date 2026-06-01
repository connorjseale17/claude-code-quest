import { useEffect, useRef } from 'react';
import { useGame, useGameDispatch, type Direction } from './GameContext';
import { LEVEL_CONFIGS } from './roomConfigs';
import { canMoveTo, getInteractableAt, getDoorAt, isOnKey } from './collision';

const KEY_MAP: Record<string, { dx: number; dy: number; facing: Direction }> = {
  ArrowUp:    { dx: 0, dy: -1, facing: 'up' },
  ArrowDown:  { dx: 0, dy: 1,  facing: 'down' },
  ArrowLeft:  { dx: -1, dy: 0, facing: 'left' },
  ArrowRight: { dx: 1,  dy: 0, facing: 'right' },
  w: { dx: 0, dy: -1, facing: 'up' },
  W: { dx: 0, dy: -1, facing: 'up' },
  s: { dx: 0, dy: 1,  facing: 'down' },
  S: { dx: 0, dy: 1,  facing: 'down' },
  a: { dx: -1, dy: 0, facing: 'left' },
  A: { dx: -1, dy: 0, facing: 'left' },
  d: { dx: 1,  dy: 0, facing: 'right' },
  D: { dx: 1,  dy: 0, facing: 'right' },
};

// Custom key-repeat timing.
// - INITIAL_REPEAT_DELAY: how long a key must be held before auto-repeat kicks in.
//   Larger = easier to tap a single tile without overshooting.
// - REPEAT_INTERVAL: time between repeated moves while holding.
//   Larger = slower continuous movement = more controllable.
const INITIAL_REPEAT_DELAY_MS = 220;
const REPEAT_INTERVAL_MS = 100;
const WALK_ANIM_MS = 200;

export function useMovement() {
  const state = useGame();
  const dispatch = useGameDispatch();

  // Mirror latest state into a ref so the (mount-once) effect can read it
  // without re-binding listeners on every state change.
  const stateRef = useRef(state);
  stateRef.current = state;

  const heldKeyRef = useRef<string | null>(null);
  const initialDelayTimerRef = useRef<number | null>(null);
  const repeatIntervalRef = useRef<number | null>(null);
  const walkTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const stopRepeat = () => {
      heldKeyRef.current = null;
      if (initialDelayTimerRef.current !== null) {
        clearTimeout(initialDelayTimerRef.current);
        initialDelayTimerRef.current = null;
      }
      if (repeatIntervalRef.current !== null) {
        clearInterval(repeatIntervalRef.current);
        repeatIntervalRef.current = null;
      }
    };

    const tryMove = (key: string): boolean => {
      const move = KEY_MAP[key];
      if (!move) return false;
      const s = stateRef.current;
      if (s.activePanel || s.paused || s.gameOver) return false;

      const levelCfg = LEVEL_CONFIGS[s.currentLevel];
      const chamber = levelCfg.chambers[s.currentChamber];
      const levelState = s.levels[s.currentLevel];

      const newX = s.bot.x + move.dx;
      const newY = s.bot.y + move.dy;

      if (!canMoveTo(newX, newY, chamber, levelState)) return false;

      dispatch({ type: 'MOVE', dx: move.dx, dy: move.dy, facing: move.facing });

      // Key pickup at new position
      if (isOnKey(newX, newY, chamber, levelState)) {
        dispatch({ type: 'COLLECT_KEY' });
      }

      // Door transition at new position
      const door = getDoorAt(newX, newY, chamber);
      if (door) {
        if (door.target.kind === 'end') {
          dispatch({ type: 'GAME_OVER' });
          stopRepeat();
        } else if (door.target.kind === 'level') {
          dispatch({
            type: 'START_LEVEL_TRANSITION',
            transition: {
              levelId: door.target.level,
              chamberId: door.target.chamber,
              spawnX: door.spawnX,
              spawnY: door.spawnY,
            },
          });
          // GameScreen unmounts during 'loading' phase, so the effect cleanup
          // runs stopRepeat automatically — no explicit stop needed here.
        } else if (door.target.kind === 'chamber') {
          dispatch({
            type: 'TRANSITION_CHAMBER',
            chamberId: door.target.chamber,
            spawnX: door.spawnX,
            spawnY: door.spawnY,
          });
          // Intentionally do NOT stopRepeat — let the held key keep
          // generating moves in the new chamber so the player can walk
          // through a doorway without releasing the key.
        }
      }

      if (walkTimeoutRef.current !== null) clearTimeout(walkTimeoutRef.current);
      walkTimeoutRef.current = window.setTimeout(() => {
        dispatch({ type: 'STOP_WALK' });
      }, WALK_ANIM_MS);

      return true;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const s = stateRef.current;
      if (s.gameOver) return;

      // Escape toggles pause when no panel is open (panels manage their own Esc)
      if (e.key === 'Escape' && !s.activePanel) {
        e.preventDefault();
        dispatch({ type: 'TOGGLE_PAUSE' });
        return;
      }

      if (s.activePanel || s.paused) return;

      // Interact (E / Space / Enter)
      if (e.key === 'e' || e.key === 'E' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        const chamber = LEVEL_CONFIGS[s.currentLevel].chambers[s.currentChamber];
        const chamberState = s.chambers[s.currentChamber];
        const levelState = s.levels[s.currentLevel];
        const interactable = getInteractableAt(s.bot.x, s.bot.y, chamber);
        if (!interactable) return;
        if (interactable.kind === 'npc') {
          dispatch({ type: 'OPEN_PANEL', panelType: 'npc', itemId: interactable.npcId });
          if (!chamberState.npcSeen.includes(interactable.npcId)) {
            dispatch({ type: 'MARK_NPC_SEEN', chamberId: chamber.id, npcId: interactable.npcId });
          }
        } else if (interactable.type === 'challenge' && !levelState.challengePassed) {
          dispatch({ type: 'OPEN_PANEL', panelType: 'challenge', itemId: interactable.itemId });
        } else if (interactable.type === 'lore') {
          dispatch({ type: 'OPEN_PANEL', panelType: 'lore', itemId: interactable.itemId });
          if (!chamberState.loreSeen.includes(interactable.itemId)) {
            dispatch({ type: 'MARK_LORE_SEEN', chamberId: chamber.id, loreId: interactable.itemId });
          }
        } else if (interactable.type === 'practice') {
          dispatch({ type: 'OPEN_PANEL', panelType: 'practice', itemId: interactable.itemId });
        }
        return;
      }

      // Movement keys
      if (!KEY_MAP[e.key]) return;
      e.preventDefault();

      // Ignore browser/OS auto-repeat; we run our own faster repeat loop
      if (e.repeat) return;

      // If a different direction key was held, cancel its repeat
      if (heldKeyRef.current && heldKeyRef.current !== e.key) {
        stopRepeat();
      }

      heldKeyRef.current = e.key;
      tryMove(e.key);

      // Schedule custom repeat after a short initial delay
      initialDelayTimerRef.current = window.setTimeout(() => {
        initialDelayTimerRef.current = null;
        repeatIntervalRef.current = window.setInterval(() => {
          const key = heldKeyRef.current;
          if (key) tryMove(key);
        }, REPEAT_INTERVAL_MS);
      }, INITIAL_REPEAT_DELAY_MS);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (heldKeyRef.current === e.key) {
        stopRepeat();
      }
    };

    const handleBlur = () => {
      // Window lost focus — release any held keys to avoid stuck movement
      stopRepeat();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
      stopRepeat();
      if (walkTimeoutRef.current !== null) {
        clearTimeout(walkTimeoutRef.current);
        walkTimeoutRef.current = null;
      }
    };
  }, [dispatch]);
}
