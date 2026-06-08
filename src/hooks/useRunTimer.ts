import { useEffect, useState } from 'react';
import { useGame } from '../engine/GameContext';

/** Returns the live elapsed-ms for the current run, ticking every 500ms while
 *  unpaused. Returns 0 if no run is in progress (runStartedAt is null). When
 *  paused, returns the frozen value at the moment of pause — does NOT advance.
 *  Matches the math used by recordRunFinish so the HUD and the leaderboard
 *  read the same numbers. */
export function useRunTimer(): number {
  const state = useGame();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (state.paused || state.runStartedAt === null) return;
    const id = window.setInterval(() => setTick(t => t + 1), 500);
    return () => window.clearInterval(id);
  }, [state.paused, state.runStartedAt]);

  if (state.runStartedAt === null) return 0;
  const pauseSlice = state.paused && state.runPausedAt
    ? Date.now() - state.runPausedAt
    : 0;
  const elapsed = Date.now() - state.runStartedAt - state.runPausedElapsedMs - pauseSlice;
  // tick is referenced so React re-renders on each interval — eslint would
  // otherwise flag the dep as unused.
  void tick;
  return Math.max(0, elapsed);
}

export function formatRunTime(ms: number): string {
  const mins = Math.floor(ms / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
