import { createContext, useContext, useReducer, type Dispatch } from 'react';
import {
  LEVEL_CONFIGS,
  ALL_CHAMBER_IDS,
  type LevelId,
  type ChamberId,
} from './roomConfigs';

export type Direction = 'left' | 'right' | 'up' | 'down';
export type PanelType = 'challenge' | 'lore' | 'npc' | 'practice';
export type GamePhase =
  | 'boot'
  | 'splash'
  | 'instructions'
  | 'customize'
  | 'pathSelect'
  | 'origin'
  | 'playing'
  | 'loading'
  | 'gameOver';
export type Track = 'quest' | 'twic';

export type PendingLevelTransition = {
  levelId: LevelId;
  chamberId: ChamberId;
  spawnX: number;
  spawnY: number;
};

export type ChamberState = {
  visited: boolean;
  loreSeen: string[];
  npcSeen: string[];
};

export type LevelState = {
  challengePassed: boolean;
  keyCollected: boolean;
};

export type GameState = {
  gamePhase: GamePhase;
  currentLevel: LevelId;
  currentChamber: ChamberId;
  gameOver: boolean;
  bot: {
    x: number;
    y: number;
    facing: Direction;
    animation: 'idle' | 'walk';
  };
  chambers: Record<ChamberId, ChamberState>;
  levels: Record<LevelId, LevelState>;
  activePanel: null | { type: PanelType; itemId: string };
  showIntro: boolean;
  paused: boolean;
  pendingLevelTransition: PendingLevelTransition | null;
  player: { name: string; botColor: string };
  prizesUnlocked: string[];
  lessonsCompleted: string[];
  /** Which learning path the player is currently in. Defaults to 'quest'. */
  currentTrack: Track;
  /** One-shot flag for the TWiC floor-level Issue Intro overlay (room-1 entry). */
  twicIssueShown: boolean;
  /** Sticky flag: has the player ever seen the Origin Splash? Persisted to
   *  localStorage so returning Quest players skip straight to gameplay. */
  originSeen: boolean;
};

const initialChamberState: ChamberState = {
  visited: false,
  loreSeen: [],
  npcSeen: [],
};

const initialLevelState: LevelState = {
  challengePassed: false,
  keyCollected: false,
};

function seedChamberStates(): Record<ChamberId, ChamberState> {
  return Object.fromEntries(
    ALL_CHAMBER_IDS.map(id => [id, { ...initialChamberState, loreSeen: [], npcSeen: [] }]),
  );
}

function seedLevelStates(): Record<LevelId, LevelState> {
  return Object.fromEntries(
    (Object.keys(LEVEL_CONFIGS) as LevelId[]).map(id => [id, { ...initialLevelState }]),
  ) as Record<LevelId, LevelState>;
}

const startLevel: LevelId = 'welcome';
const startLevelCfg = LEVEL_CONFIGS[startLevel];
const startChamber: ChamberId = startLevelCfg.startingChamber;
const startChamberCfg = startLevelCfg.chambers[startChamber];

export const initialState: GameState = {
  gamePhase: 'boot',
  currentLevel: startLevel,
  currentChamber: startChamber,
  gameOver: false,
  bot: {
    x: startChamberCfg.spawnX,
    y: startChamberCfg.spawnY,
    facing: 'right',
    animation: 'idle',
  },
  chambers: {
    ...seedChamberStates(),
    [startChamber]: { ...initialChamberState, visited: true },
  },
  levels: seedLevelStates(),
  activePanel: null,
  showIntro: true,
  paused: false,
  pendingLevelTransition: null,
  player: (() => {
    try {
      const saved = localStorage.getItem('ccq-player');
      if (saved) return JSON.parse(saved);
    } catch {}
    return { name: '', botColor: '#E8633D' };
  })(),
  prizesUnlocked: (() => {
    try {
      const saved = localStorage.getItem('ccq-prizes');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [];
  })(),
  lessonsCompleted: (() => {
    try {
      const saved = localStorage.getItem('ccq-lessons');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [];
  })(),
  currentTrack: 'quest',
  twicIssueShown: false,
  originSeen: (() => {
    try {
      return localStorage.getItem('ccq-origin-seen') === '1';
    } catch {
      return false;
    }
  })(),
};

export type GameAction =
  | { type: 'MOVE'; dx: number; dy: number; facing: Direction }
  | { type: 'STOP_WALK' }
  | { type: 'OPEN_PANEL'; panelType: PanelType; itemId: string }
  | { type: 'CLOSE_PANEL' }
  | { type: 'PASS_CHALLENGE' }
  | { type: 'COLLECT_KEY' }
  | { type: 'MARK_LORE_SEEN'; chamberId: ChamberId; loreId: string }
  | { type: 'MARK_NPC_SEEN'; chamberId: ChamberId; npcId: string }
  | { type: 'TRANSITION_CHAMBER'; chamberId: ChamberId; spawnX: number; spawnY: number }
  | { type: 'TRANSITION_LEVEL'; levelId: LevelId; chamberId: ChamberId; spawnX: number; spawnY: number }
  | { type: 'DISMISS_INTRO' }
  | { type: 'GAME_OVER' }
  | { type: 'ADVANCE_PHASE' }
  | { type: 'TOGGLE_PAUSE' }
  | { type: 'START_LEVEL_TRANSITION'; transition: PendingLevelTransition }
  | { type: 'COMPLETE_LEVEL_TRANSITION' }
  | { type: 'SET_PLAYER'; name: string; botColor: string }
  | { type: 'UNLOCK_PRIZE'; prizeId: string }
  | { type: 'MARK_LESSON_COMPLETED'; npcId: string }
  | { type: 'DEV_WARP_LEVEL'; levelId: LevelId }
  | { type: 'DEV_UNLOCK_CURRENT' }
  | { type: 'SELECT_TRACK'; track: Track; levelId: LevelId; chamberId: ChamberId; spawnX: number; spawnY: number }
  | { type: 'DISMISS_TWIC_ISSUE_INTRO' }
  | { type: 'DISMISS_ORIGIN' };

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'MOVE': {
      // Movement is now a pure position update; transitions and key-pickup are
      // dispatched as separate actions by the movement hook for clarity.
      const newX = state.bot.x + action.dx;
      const newY = state.bot.y + action.dy;
      return {
        ...state,
        showIntro: false,
        bot: { ...state.bot, x: newX, y: newY, facing: action.facing, animation: 'walk' },
      };
    }
    case 'STOP_WALK':
      return { ...state, bot: { ...state.bot, animation: 'idle' } };
    case 'OPEN_PANEL':
      return {
        ...state,
        activePanel: { type: action.panelType, itemId: action.itemId },
      };
    case 'CLOSE_PANEL':
      return { ...state, activePanel: null };
    case 'PASS_CHALLENGE': {
      const lvl = state.levels[state.currentLevel];
      return {
        ...state,
        activePanel: null,
        levels: {
          ...state.levels,
          [state.currentLevel]: { ...lvl, challengePassed: true },
        },
      };
    }
    case 'COLLECT_KEY': {
      const lvl = state.levels[state.currentLevel];
      return {
        ...state,
        levels: {
          ...state.levels,
          [state.currentLevel]: { ...lvl, keyCollected: true },
        },
      };
    }
    case 'MARK_LORE_SEEN': {
      const ch = state.chambers[action.chamberId];
      if (!ch || ch.loreSeen.includes(action.loreId)) return state;
      return {
        ...state,
        chambers: {
          ...state.chambers,
          [action.chamberId]: { ...ch, loreSeen: [...ch.loreSeen, action.loreId] },
        },
      };
    }
    case 'MARK_NPC_SEEN': {
      const ch = state.chambers[action.chamberId];
      if (!ch || ch.npcSeen.includes(action.npcId)) return state;
      return {
        ...state,
        chambers: {
          ...state.chambers,
          [action.chamberId]: { ...ch, npcSeen: [...ch.npcSeen, action.npcId] },
        },
      };
    }
    case 'TRANSITION_CHAMBER': {
      const ch = state.chambers[action.chamberId] ?? { ...initialChamberState };
      return {
        ...state,
        currentChamber: action.chamberId,
        bot: { x: action.spawnX, y: action.spawnY, facing: 'right', animation: 'idle' },
        chambers: {
          ...state.chambers,
          [action.chamberId]: { ...ch, visited: true },
        },
        showIntro: false,
      };
    }
    case 'TRANSITION_LEVEL': {
      const ch = state.chambers[action.chamberId] ?? { ...initialChamberState };
      return {
        ...state,
        currentLevel: action.levelId,
        currentChamber: action.chamberId,
        bot: { x: action.spawnX, y: action.spawnY, facing: 'right', animation: 'idle' },
        chambers: {
          ...state.chambers,
          [action.chamberId]: { ...ch, visited: true },
        },
        showIntro: true,
      };
    }
    case 'DISMISS_INTRO':
      return { ...state, showIntro: false };
    case 'GAME_OVER':
      return { ...state, gameOver: true, gamePhase: 'gameOver' };
    case 'DEV_WARP_LEVEL': {
      const cfg = LEVEL_CONFIGS[action.levelId];
      const chamberId = cfg.startingChamber;
      const chamber = cfg.chambers[chamberId];
      const ch = state.chambers[chamberId] ?? { ...initialChamberState };
      // Keep currentTrack in sync with the warp target so the TWiC stamp /
      // Quest end-screen routing stays correct after a dev jump.
      const track: Track = cfg.track ?? 'quest';
      return {
        ...state,
        gamePhase: 'playing',
        gameOver: false,
        currentLevel: action.levelId,
        currentChamber: chamberId,
        currentTrack: track,
        bot: { x: chamber.spawnX, y: chamber.spawnY, facing: 'right', animation: 'idle' },
        chambers: { ...state.chambers, [chamberId]: { ...ch, visited: true } },
        activePanel: null,
        paused: false,
        pendingLevelTransition: null,
        showIntro: false,
      };
    }
    case 'DEV_UNLOCK_CURRENT': {
      const lvl = state.levels[state.currentLevel];
      return {
        ...state,
        levels: {
          ...state.levels,
          [state.currentLevel]: { ...lvl, challengePassed: true, keyCollected: true },
        },
        activePanel: null,
      };
    }
    case 'TOGGLE_PAUSE':
      return { ...state, paused: !state.paused };
    case 'START_LEVEL_TRANSITION':
      return {
        ...state,
        gamePhase: 'loading',
        pendingLevelTransition: action.transition,
      };
    case 'COMPLETE_LEVEL_TRANSITION': {
      const t = state.pendingLevelTransition;
      if (!t) return state;
      const ch = state.chambers[t.chamberId] ?? { ...initialChamberState };
      // Fire the one-shot TWiC Issue Intro overlay when the player first enters twic-1.
      const showTwicIssue = t.levelId === 'twic-1';
      // Route through the Origin Splash before Level 1 gameplay begins —
      // Quest track only, first-time players only. Returning players (those
      // with the ccq-origin-seen localStorage flag) skip straight to playing.
      // DISMISS_ORIGIN flips gamePhase → 'playing' and arms showIntro.
      const showOrigin =
        t.levelId === 'welcome' &&
        state.currentTrack === 'quest' &&
        !state.originSeen;
      return {
        ...state,
        gamePhase: showOrigin ? 'origin' : 'playing',
        currentLevel: t.levelId,
        currentChamber: t.chamberId,
        bot: { x: t.spawnX, y: t.spawnY, facing: 'right', animation: 'idle' },
        chambers: {
          ...state.chambers,
          [t.chamberId]: { ...ch, visited: true },
        },
        pendingLevelTransition: null,
        // Defer the in-game IntroOverlay until origin dismisses; otherwise
        // arm it immediately as before.
        showIntro: !showOrigin,
        twicIssueShown: showTwicIssue || state.twicIssueShown,
      };
    }
    case 'SET_PLAYER': {
      const player = { name: action.name, botColor: action.botColor };
      try { localStorage.setItem('ccq-player', JSON.stringify(player)); } catch {}
      return { ...state, player };
    }
    case 'UNLOCK_PRIZE': {
      if (state.prizesUnlocked.includes(action.prizeId)) return state;
      const prizesUnlocked = [...state.prizesUnlocked, action.prizeId];
      try { localStorage.setItem('ccq-prizes', JSON.stringify(prizesUnlocked)); } catch {}
      return { ...state, prizesUnlocked };
    }
    case 'MARK_LESSON_COMPLETED': {
      if (state.lessonsCompleted.includes(action.npcId)) return state;
      const lessonsCompleted = [...state.lessonsCompleted, action.npcId];
      try { localStorage.setItem('ccq-lessons', JSON.stringify(lessonsCompleted)); } catch {}
      return { ...state, lessonsCompleted };
    }
    case 'ADVANCE_PHASE': {
      // Customize → PATH SELECT screen. Track + start level are chosen there.
      const transitions: Record<string, GamePhase> = {
        boot: 'splash',
        splash: 'instructions',
        instructions: 'customize',
        customize: 'pathSelect',
      };
      const next = transitions[state.gamePhase];
      return next ? { ...state, gamePhase: next } : state;
    }
    case 'SELECT_TRACK': {
      // Path-select screen dispatches this to queue the chosen track's loading
      // transition. The track flag governs end-screen routing and any
      // track-specific UI (Issue Intro overlay, stamp screen).
      return {
        ...state,
        gamePhase: 'loading',
        currentTrack: action.track,
        pendingLevelTransition: {
          levelId: action.levelId,
          chamberId: action.chamberId,
          spawnX: action.spawnX,
          spawnY: action.spawnY,
        },
      };
    }
    case 'DISMISS_TWIC_ISSUE_INTRO':
      return { ...state, twicIssueShown: false };
    case 'DISMISS_ORIGIN': {
      // Origin Splash finished (either by walking the six sections or by
      // hitting Skip). Persist the seen flag so returning players bypass it,
      // flip the phase into gameplay, and arm the in-game IntroOverlay.
      try { localStorage.setItem('ccq-origin-seen', '1'); } catch { /* ignore */ }
      return {
        ...state,
        gamePhase: 'playing',
        showIntro: true,
        originSeen: true,
      };
    }
    default:
      return state;
  }
}

const GameContext = createContext<GameState>(initialState);
const GameDispatchContext = createContext<Dispatch<GameAction>>(() => {});

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return (
    <GameContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}

export function useGameDispatch() {
  return useContext(GameDispatchContext);
}
