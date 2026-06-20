import { createContext, useContext, useEffect, useReducer, type Dispatch } from 'react';
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
  | 'wrapUp'
  | 'certification'
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
  /** Firestore doc id for the current run. Null until recordRunStart resolves. */
  runId: string | null;
  /** Date.now() ms epoch when SELECT_TRACK fired. Null before a run starts. */
  runStartedAt: number | null;
  /** Date.now() ms when the most-recent pause began. Null when not paused. */
  runPausedAt: number | null;
  /** Cumulative paused ms across the run. Subtracted from elapsed at finish. */
  runPausedElapsedMs: number;
  /** Per-level completion timestamps (Date.now() ms). Stamped on level exit. */
  levelsCompletedAt: Partial<Record<LevelId, number>>;
  /** Per-prize unlock timestamps (Date.now() ms), keyed by prize id. */
  prizesUnlockedAt: Record<string, number>;
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

const startLevel: LevelId = 'orientation';
const startLevelCfg = LEVEL_CONFIGS[startLevel];
const startChamber: ChamberId = startLevelCfg.startingChamber;
const startChamberCfg = startLevelCfg.chambers[startChamber];

type SavedRun = Partial<{
  runId: string | null;
  runStartedAt: number | null;
  /** Wall-clock ms at the moment of pause, if a pause was active when the
   *  player last refreshed. Folded into runPausedElapsedMs at boot so a paused
   *  refresh doesn't count the in-flight pause as run time. */
  runPausedAt: number | null;
  runPausedElapsedMs: number;
  levelsCompletedAt: Partial<Record<LevelId, number>>;
  prizesUnlockedAt: Record<string, number>;
}>;

const savedRun: SavedRun = (() => {
  try {
    const raw = localStorage.getItem('ccq-run');
    if (raw) return JSON.parse(raw) as SavedRun;
  } catch { /* ignore */ }
  return {};
})();

function persistRun(state: GameState): void {
  try {
    localStorage.setItem('ccq-run', JSON.stringify({
      runId: state.runId,
      runStartedAt: state.runStartedAt,
      runPausedAt: state.runPausedAt,
      runPausedElapsedMs: state.runPausedElapsedMs,
      levelsCompletedAt: state.levelsCompletedAt,
      prizesUnlockedAt: state.prizesUnlockedAt,
    }));
  } catch { /* ignore */ }
}

// ===========================================================================
// Level-resume persistence — `ccq-game` holds the slice of state needed to
// drop the player back into the room/level they were on after a refresh.
// Saved only during real-run phases so a refresh on customize/splash doesn't
// trap them on those screens. Versioned so future schema changes can be
// rejected gracefully rather than silently rehydrating broken state.
// ===========================================================================

const SAVED_GAME_VERSION = 1;

const PERSISTABLE_PHASES: ReadonlySet<GamePhase> = new Set([
  'origin', 'playing', 'wrapUp', 'certification', 'gameOver',
]);

type SavedGame = Partial<{
  v: number;
  gamePhase: GamePhase;
  currentLevel: LevelId;
  currentChamber: ChamberId;
  bot: { x: number; y: number; facing: Direction };
  chambers: Record<ChamberId, ChamberState>;
  levels: Record<LevelId, LevelState>;
  currentTrack: Track;
  twicIssueShown: boolean;
}>;

const savedGame: SavedGame = (() => {
  try {
    const raw = localStorage.getItem('ccq-game');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && parsed.v === SAVED_GAME_VERSION) {
        return parsed as SavedGame;
      }
    }
  } catch { /* ignore */ }
  return {};
})();

function persistGame(state: GameState): void {
  if (!PERSISTABLE_PHASES.has(state.gamePhase)) return;
  try {
    const payload: Required<Omit<SavedGame, 'v'>> & { v: number } = {
      v: SAVED_GAME_VERSION,
      gamePhase: state.gamePhase,
      currentLevel: state.currentLevel,
      currentChamber: state.currentChamber,
      bot: { x: state.bot.x, y: state.bot.y, facing: state.bot.facing },
      chambers: state.chambers,
      levels: state.levels,
      currentTrack: state.currentTrack,
      twicIssueShown: state.twicIssueShown,
    };
    localStorage.setItem('ccq-game', JSON.stringify(payload));
  } catch { /* ignore */ }
}

// Derive the restored slice once at module load. Validates every saved field
// against the live config (LEVEL_CONFIGS / LevelId / ChamberId) so a saved
// game from a build where a level was renamed/removed cleanly falls back to
// the start instead of crashing.
const restoredPhase: GamePhase =
  savedGame.gamePhase && PERSISTABLE_PHASES.has(savedGame.gamePhase)
    ? savedGame.gamePhase
    : 'boot';
const isRestoring = restoredPhase !== 'boot';

const restoredLevel: LevelId =
  isRestoring && savedGame.currentLevel && savedGame.currentLevel in LEVEL_CONFIGS
    ? savedGame.currentLevel
    : startLevel;
const restoredLevelCfg = LEVEL_CONFIGS[restoredLevel];

const restoredChamber: ChamberId =
  isRestoring && savedGame.currentChamber && restoredLevelCfg.chambers[savedGame.currentChamber]
    ? savedGame.currentChamber
    : restoredLevelCfg.startingChamber;
const restoredChamberCfg = restoredLevelCfg.chambers[restoredChamber];

const restoredBot =
  isRestoring && savedGame.bot &&
  typeof savedGame.bot.x === 'number' &&
  typeof savedGame.bot.y === 'number'
    ? {
        x: savedGame.bot.x,
        y: savedGame.bot.y,
        facing: (savedGame.bot.facing ?? 'right') as Direction,
        animation: 'idle' as const,
      }
    : {
        x: restoredChamberCfg.spawnX,
        y: restoredChamberCfg.spawnY,
        facing: 'right' as Direction,
        animation: 'idle' as const,
      };

const seededChambers = seedChamberStates();
const restoredChambers: Record<ChamberId, ChamberState> =
  isRestoring && savedGame.chambers && typeof savedGame.chambers === 'object'
    ? { ...seededChambers, ...savedGame.chambers }
    : { ...seededChambers, [restoredChamber]: { ...initialChamberState, visited: true } };

const seededLevels = seedLevelStates();
const restoredLevels: Record<LevelId, LevelState> =
  isRestoring && savedGame.levels && typeof savedGame.levels === 'object'
    ? { ...seededLevels, ...savedGame.levels }
    : seededLevels;

export const initialState: GameState = {
  gamePhase: restoredPhase,
  currentLevel: restoredLevel,
  currentChamber: restoredChamber,
  // Recompute from phase so a restored end-screen has the flag set.
  gameOver:
    restoredPhase === 'wrapUp' ||
    restoredPhase === 'certification' ||
    restoredPhase === 'gameOver',
  bot: restoredBot,
  chambers: restoredChambers,
  levels: restoredLevels,
  activePanel: null,
  // Skip the chamber-intro bubble on restored runs — the player has been here.
  showIntro: !isRestoring,
  paused: false,
  pendingLevelTransition: null,
  player: (() => {
    try {
      const saved = localStorage.getItem('ccq-player');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Shape-guard the rehydrated player. A tampered/legacy value could be
        // a number, an array, or an object missing the keys we render — fall
        // back to defaults rather than propagating garbage into the UI.
        if (
          parsed !== null &&
          typeof parsed === 'object' &&
          typeof parsed.name === 'string' &&
          typeof parsed.botColor === 'string'
        ) {
          return { name: parsed.name.slice(0, 12), botColor: parsed.botColor };
        }
      }
    } catch { /* ignore */ }
    return { name: '', botColor: '#E8633D' };
  })(),
  prizesUnlocked: (() => {
    try {
      const saved = localStorage.getItem('ccq-prizes');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch { /* ignore */ }
    return [];
  })(),
  lessonsCompleted: (() => {
    try {
      const saved = localStorage.getItem('ccq-lessons');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch { /* ignore */ }
    return [];
  })(),
  currentTrack: isRestoring && savedGame.currentTrack ? savedGame.currentTrack : 'quest',
  twicIssueShown: isRestoring ? Boolean(savedGame.twicIssueShown) : false,
  originSeen: (() => {
    try {
      return localStorage.getItem('ccq-origin-seen') === '1';
    } catch {
      return false;
    }
  })(),
  runId: savedRun.runId ?? null,
  runStartedAt: savedRun.runStartedAt ?? null,
  runPausedAt: null,
  // If a pause was active when the player last refreshed, fold the
  // wall-clock interval since runPausedAt into the elapsed-pause counter so
  // the run timer doesn't count it as play time. The game resumes unpaused
  // (we don't try to restore the PauseMenu mid-render).
  runPausedElapsedMs: (() => {
    const base = savedRun.runPausedElapsedMs ?? 0;
    const pausedAt = savedRun.runPausedAt;
    if (typeof pausedAt === 'number') {
      return base + Math.max(0, Date.now() - pausedAt);
    }
    return base;
  })(),
  levelsCompletedAt: savedRun.levelsCompletedAt ?? {},
  prizesUnlockedAt: savedRun.prizesUnlockedAt ?? {},
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
  | { type: 'DISMISS_ORIGIN' }
  | { type: 'DISMISS_WRAP_UP' }
  | { type: 'SET_RUN_ID'; runId: string }
  | { type: 'RESTART_RUN' }
  | { type: 'FULL_RESET' };

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
    case 'GAME_OVER': {
      // Quest path → wrap-up + certification flow. TWiC path → stamp screen
      // (handled by gameOver in App.tsx via currentTrack switch).
      const finalLvl = state.levels[state.currentLevel];
      const levelsCompletedAt = finalLvl.challengePassed && !state.levelsCompletedAt[state.currentLevel]
        ? { ...state.levelsCompletedAt, [state.currentLevel]: Date.now() }
        : state.levelsCompletedAt;
      const next: GameState = state.currentTrack === 'quest'
        ? { ...state, gameOver: true, gamePhase: 'wrapUp', levelsCompletedAt }
        : { ...state, gameOver: true, gamePhase: 'gameOver', levelsCompletedAt };
      if (levelsCompletedAt !== state.levelsCompletedAt) persistRun(next);
      return next;
    }
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
    case 'TOGGLE_PAUSE': {
      const now = Date.now();
      if (state.paused) {
        const pausedFor = state.runPausedAt ? now - state.runPausedAt : 0;
        const next: GameState = {
          ...state,
          paused: false,
          runPausedAt: null,
          runPausedElapsedMs: state.runPausedElapsedMs + pausedFor,
        };
        persistRun(next);
        return next;
      }
      const next: GameState = { ...state, paused: true, runPausedAt: now };
      persistRun(next);
      return next;
    }
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
      // Route through the Origin Splash before Level 0 gameplay begins —
      // Quest track only, first-time players only. Returning players (those
      // with the ccq-origin-seen localStorage flag) skip straight to playing.
      // DISMISS_ORIGIN flips gamePhase → 'playing' and arms showIntro.
      const showOrigin =
        t.levelId === 'orientation' &&
        state.currentTrack === 'quest' &&
        !state.originSeen;
      // Stamp the level we're leaving as completed if both flags are true
      // and we haven't already stamped it (idempotent for replays).
      const leavingLevel = state.currentLevel;
      const leavingLvl = state.levels[leavingLevel];
      const isLeavingComplete = leavingLvl.challengePassed && leavingLvl.keyCollected;
      const levelsCompletedAt = isLeavingComplete && !state.levelsCompletedAt[leavingLevel]
        ? { ...state.levelsCompletedAt, [leavingLevel]: Date.now() }
        : state.levelsCompletedAt;
      // Arm the run clock when the player actually lands in 'playing' for the
      // first time this run — returning Quest players who skipped Origin
      // Splash get their clock started here. First-time players go through
      // 'origin' first and arm in DISMISS_ORIGIN.
      const willPlay = !showOrigin;
      const runStartedAt = willPlay && state.runStartedAt === null
        ? Date.now()
        : state.runStartedAt;
      const next: GameState = {
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
        levelsCompletedAt,
        runStartedAt,
      };
      if (
        levelsCompletedAt !== state.levelsCompletedAt ||
        runStartedAt !== state.runStartedAt
      ) persistRun(next);
      return next;
    }
    case 'SET_PLAYER': {
      const player = { name: action.name, botColor: action.botColor };
      try { localStorage.setItem('ccq-player', JSON.stringify(player)); } catch { /* ignore */ }
      return { ...state, player };
    }
    case 'UNLOCK_PRIZE': {
      if (state.prizesUnlocked.includes(action.prizeId)) return state;
      const prizesUnlocked = [...state.prizesUnlocked, action.prizeId];
      const prizesUnlockedAt = { ...state.prizesUnlockedAt, [action.prizeId]: Date.now() };
      try { localStorage.setItem('ccq-prizes', JSON.stringify(prizesUnlocked)); } catch { /* ignore */ }
      const next: GameState = { ...state, prizesUnlocked, prizesUnlockedAt };
      persistRun(next);
      return next;
    }
    case 'MARK_LESSON_COMPLETED': {
      if (state.lessonsCompleted.includes(action.npcId)) return state;
      const lessonsCompleted = [...state.lessonsCompleted, action.npcId];
      try { localStorage.setItem('ccq-lessons', JSON.stringify(lessonsCompleted)); } catch { /* ignore */ }
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
      // track-specific UI (Issue Intro overlay, stamp screen). The run clock
      // is RESET here (cleared to null) but does NOT start ticking yet — it's
      // armed when the player actually reaches the 'playing' phase, so the
      // loading screen + Origin Splash don't count as run time.
      const next: GameState = {
        ...state,
        gamePhase: 'loading',
        currentTrack: action.track,
        runId: null,
        runStartedAt: null,
        runPausedAt: null,
        runPausedElapsedMs: 0,
        levelsCompletedAt: {},
        prizesUnlockedAt: {},
        pendingLevelTransition: {
          levelId: action.levelId,
          chamberId: action.chamberId,
          spawnX: action.spawnX,
          spawnY: action.spawnY,
        },
      };
      persistRun(next);
      return next;
    }
    case 'SET_RUN_ID': {
      const next: GameState = { ...state, runId: action.runId };
      persistRun(next);
      return next;
    }
    case 'DISMISS_TWIC_ISSUE_INTRO':
      return { ...state, twicIssueShown: false };
    case 'DISMISS_ORIGIN': {
      // Origin Splash finished (either by walking the six sections or by
      // hitting Skip). Persist the seen flag so returning players bypass it,
      // flip the phase into gameplay, and arm the in-game IntroOverlay.
      // ALSO arm the run clock now — first-time Quest players hit gameplay
      // through this path, and we don't want the typewriter splash time to
      // count toward their leaderboard run.
      try { localStorage.setItem('ccq-origin-seen', '1'); } catch { /* ignore */ }
      const runStartedAt = state.runStartedAt === null ? Date.now() : state.runStartedAt;
      const next: GameState = {
        ...state,
        gamePhase: 'playing',
        showIntro: true,
        originSeen: true,
        runStartedAt,
      };
      if (runStartedAt !== state.runStartedAt) persistRun(next);
      return next;
    }
    case 'DISMISS_WRAP_UP': {
      // Final beat of the Wrap-Up Splash was clicked through (or skipped).
      // Advance into the Certification Page where the player enters their
      // name and downloads the PDF.
      return { ...state, gamePhase: 'certification' };
    }
    case 'RESTART_RUN': {
      // "Play again" from the certification / stamp / end screen. Wipe run
      // progress (prizes, lessons, levels, timing, level-resume save) but KEEP
      // the player's identity (name + color) and the originSeen flag, then
      // drop them back at the path-select screen for a fresh run.
      try {
        localStorage.removeItem('ccq-prizes');
        localStorage.removeItem('ccq-lessons');
        localStorage.removeItem('ccq-run');
        localStorage.removeItem('ccq-game');
      } catch { /* ignore */ }
      return {
        ...state,
        gamePhase: 'pathSelect',
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
        prizesUnlocked: [],
        lessonsCompleted: [],
        currentTrack: 'quest',
        twicIssueShown: false,
        runId: null,
        runStartedAt: null,
        runPausedAt: null,
        runPausedElapsedMs: 0,
        levelsCompletedAt: {},
        prizesUnlockedAt: {},
        // player + originSeen intentionally preserved.
      };
    }
    case 'FULL_RESET': {
      try {
        localStorage.removeItem('ccq-prizes');
        localStorage.removeItem('ccq-lessons');
        localStorage.removeItem('ccq-run');
        localStorage.removeItem('ccq-game');
        localStorage.removeItem('ccq-player');
        localStorage.removeItem('ccq-origin-seen');
      } catch { /* ignore */ }
      return {
        ...state,
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
        player: { name: '', botColor: '#E8633D' },
        prizesUnlocked: [],
        lessonsCompleted: [],
        currentTrack: 'quest',
        twicIssueShown: false,
        originSeen: false,
        runId: null,
        runStartedAt: null,
        runPausedAt: null,
        runPausedElapsedMs: 0,
        levelsCompletedAt: {},
        prizesUnlockedAt: {},
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
  // Persist the level-resume slice whenever any of these fields changes. The
  // useEffect deps capture the exact slice persistGame reads; persistGame
  // itself early-returns for non-real-run phases (boot/splash/customize/…)
  // so a refresh on a pre-game screen won't lock the player there.
  useEffect(() => {
    persistGame(state);
  }, [
    state.gamePhase,
    state.currentLevel,
    state.currentChamber,
    state.bot.x,
    state.bot.y,
    state.bot.facing,
    state.chambers,
    state.levels,
    state.currentTrack,
    state.twicIssueShown,
  ]);
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
