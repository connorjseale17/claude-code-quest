import { useEffect, useState } from 'react';
import { fetchLeaderboards, type LeaderboardRow } from '../lib/tracking';

type State = {
  fastest: LeaderboardRow[];
  mostPrizes: LeaderboardRow[];
  totalCompletions: number;
  loading: boolean;
  error: boolean;
};

const INITIAL: State = {
  fastest: [],
  mostPrizes: [],
  totalCompletions: 0,
  loading: true,
  error: false,
};

export function useLeaderboard(): State {
  const [state, setState] = useState<State>(INITIAL);

  useEffect(() => {
    let cancelled = false;
    fetchLeaderboards()
      .then(res => {
        if (cancelled) return;
        setState({
          fastest: res.fastest,
          mostPrizes: res.mostPrizes,
          totalCompletions: res.totalCompletions,
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
          loading: false,
          error: true,
        });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
