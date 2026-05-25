import { createContext, useContext, useReducer, type Dispatch } from 'react';
import {
  LEVEL_CONFIGS,
  ALL_CHAMBER_IDS,
  type LevelId,
  type ChamberId,
} from './roomConfigs';

export type Direction = 'left' | 'right' | 'up' | 'down';
export type PanelType = 'challenge' | 'lore' | 'npc' | 'practice';
export type GamePhase = 'boot' | 'splash' | 'instructions' | 'customize' | 'playing' | 'loading' | 'gameOver';

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
  | { type: 'MARK_LESSON_COMPLETED'; npcId: string };

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
      return {
        ...state,
        gamePhase: 'playing',
        currentLevel: t.levelId,
        currentChamber: t.chamberId,
        bot: { x: t.spawnX, y: t.spawnY, facing: 'right', animation: 'idle' },
        chambers: {
          ...state.chambers,
          [t.chamberId]: { ...ch, visited: true },
        },
        pendingLevelTransition: null,
        showIntro: true,
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
      // Customize → loading screen first, then Level 01 via COMPLETE_LEVEL_TRANSITION
      if (state.gamePhase === 'customize') {
        const startLevelId: LevelId = 'welcome';
        const startCfg = LEVEL_CONFIGS[startLevelId];
        const startChamberId = startCfg.startingChamber;
        const startChamber = startCfg.chambers[startChamberId];
        return {
          ...state,
          gamePhase: 'loading',
          pendingLevelTransition: {
            levelId: startLevelId,
            chamberId: startChamberId,
            spawnX: startChamber.spawnX,
            spawnY: startChamber.spawnY,
          },
        };
      }
      const transitions: Record<string, GamePhase> = {
        boot: 'splash',
        splash: 'instructions',
        instructions: 'customize',
      };
      const next = transitions[state.gamePhase];
      return next ? { ...state, gamePhase: next } : state;
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
