import { useEffect, useState } from 'react';
import { fetchLeaderboards, fetchRunRank, type LeaderboardRow } from '../lib/tracking';

type State = {
  fastest: LeaderboardRow[];
  mostPrizes: LeaderboardRow[];
  totalCompletions: number;
  /** Current run's rank, when rank params are passed. null until resolved. */
  speedRank: number | null;
  prizesRank: number | null;
  loading: boolean;
  error: boolean;
};

const INITIAL: State = {
  fastest: [],
  mostPrizes: [],
  totalCompletions: 0,
  speedRank: null,
  prizesRank: null,
  loading: true,
  error: false,
};

/**
 * One-shot leaderboard fetch on mount. Pass the current run's finished
 * `elapsedMs` + `prizesTotal` (stable primitives — compute once with useMemo
 * on the end screen) to ALSO fetch this run's rank on each axis. Omit them to
 * skip the rank queries.
 */
export function useLeaderboard(rankElapsedMs?: number, rankPrizesTotal?: number): State {
  const [state, setState] = useState<State>(INITIAL);

  useEffect(() => {
    let cancelled = false;

    const wantRank =
      typeof rankElapsedMs === 'number' && typeof rankPrizesTotal === 'number';

    Promise.all([
      fetchLeaderboards(),
      wantRank
        ? fetchRunRank({ elapsed_ms: rankElapsedMs, prizes_total: rankPrizesTotal })
        : Promise.resolve(null),
    ])
      .then(([board, rank]) => {
        if (cancelled) return;
        setState({
          fastest: board.fastest,
          mostPrizes: board.mostPrizes,
          totalCompletions: board.totalCompletions,
          speedRank: rank?.speedRank ?? null,
          prizesRank: rank?.prizesRank ?? null,
          loading: false,
          error: false,
        });
      })
      .catch(() => {
        if (cancelled) return;
        setState({
          fastest: [],
          mostPrizes: [],
          totalCompletions: 0,
          speedRank: null,
          prizesRank: null,
          loading: false,
          error: true,
        });
      });

    return () => {
      cancelled = true;
    };
  }, [rankElapsedMs, rankPrizesTotal]);

  return state;
}
