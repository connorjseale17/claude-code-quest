import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  Timestamp,
  where,
  type QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db, ensureAnonAuth } from './firebase';

const RUNS = 'runs';
const FEEDBACK = 'feedback';
const META_GLOBAL = doc(db, 'meta', 'global');

export type LeaderboardRow = {
  runId: string;
  handle: string;
  colorIdx: number;
  elapsed_ms: number;
  prizes_total: number;
  uid: string;
};

export async function recordRunStart(input: {
  handle: string;
  colorIdx: number;
}): Promise<string | null> {
  try {
    const uid = await ensureAnonAuth();
    const ref = await addDoc(collection(db, RUNS), {
      uid,
      handle: input.handle,
      colorIdx: input.colorIdx,
      started_at: serverTimestamp(),
      finished: false,
      levels: [],
      prizes: [],
      prizes_total: 0,
    });
    return ref.id;
  } catch (err) {
    console.warn('[tracking] recordRunStart failed', err);
    return null;
  }
}

export async function recordRunFinish(input: {
  runId: string;
  elapsed_ms: number;
  levels: Array<{ id: string; completed_at: number }>;
  prizes: Array<{ id: string; unlocked_at: number }>;
}): Promise<void> {
  try {
    const runRef = doc(db, RUNS, input.runId);
    const levels = input.levels.map(l => ({
      id: l.id,
      completed_at: Timestamp.fromMillis(l.completed_at),
    }));
    const prizes = input.prizes.map(p => ({
      id: p.id,
      unlocked_at: Timestamp.fromMillis(p.unlocked_at),
    }));
    await runTransaction(db, async tx => {
      tx.set(
        runRef,
        {
          finished_at: serverTimestamp(),
          finished: true,
          elapsed_ms: input.elapsed_ms,
          levels,
          prizes,
          prizes_total: prizes.length,
        },
        { merge: true },
      );
      tx.set(META_GLOBAL, { completions: increment(1) }, { merge: true });
    });
  } catch (err) {
    console.warn('[tracking] recordRunFinish failed', err);
  }
}

/**
 * Write one feedback submission to the `feedback` collection. Fire-and-forget
 * from the caller's perspective — resolves `true` on success, `false` on any
 * failure (never throws), so the UI can show a thank-you or a retry without a
 * crash path. Read these back in the Firebase console; there's no in-app read.
 *
 * Field caps (comment 2000, ua 300) are enforced here AND mirrored in
 * firestore.rules so a hand-rolled client can't bloat a doc.
 */
export async function recordFeedback(input: {
  rating: number;
  comment: string;
  source: string;
  track?: string | null;
  handle?: string | null;
  runId?: string | null;
  level?: string | null;
}): Promise<boolean> {
  try {
    const uid = await ensureAnonAuth();
    const rating = Math.max(1, Math.min(5, Math.round(input.rating)));
    await addDoc(collection(db, FEEDBACK), {
      uid,
      rating,
      comment: (input.comment ?? '').trim().slice(0, 2000),
      source: input.source,
      track: input.track ?? null,
      handle: input.handle ?? null,
      runId: input.runId ?? null,
      level: input.level ?? null,
      ua: typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 300) : null,
      created_at: serverTimestamp(),
    });
    return true;
  } catch (err) {
    console.warn('[tracking] recordFeedback failed', err);
    return false;
  }
}

function rowFromSnap(snap: QueryDocumentSnapshot): LeaderboardRow {
  const d = snap.data();
  return {
    runId: snap.id,
    handle: typeof d.handle === 'string' ? d.handle : '',
    colorIdx: typeof d.colorIdx === 'number' ? d.colorIdx : 0,
    elapsed_ms: typeof d.elapsed_ms === 'number' ? d.elapsed_ms : 0,
    prizes_total: typeof d.prizes_total === 'number' ? d.prizes_total : 0,
    uid: typeof d.uid === 'string' ? d.uid : '',
  };
}

export async function fetchLeaderboards(): Promise<{
  fastest: LeaderboardRow[];
  mostPrizes: LeaderboardRow[];
  totalCompletions: number;
}> {
  try {
    const runsCol = collection(db, RUNS);
    const fastestQ = query(
      runsCol,
      where('finished', '==', true),
      orderBy('elapsed_ms', 'asc'),
      limit(7),
    );
    const mostPrizesQ = query(
      runsCol,
      where('finished', '==', true),
      orderBy('prizes_total', 'desc'),
      orderBy('elapsed_ms', 'asc'),
      limit(7),
    );

    const [fastestSnap, mostPrizesSnap, metaSnap] = await Promise.all([
      getDocs(fastestQ),
      getDocs(mostPrizesQ),
      getDoc(META_GLOBAL),
    ]);

    const metaData = metaSnap.data();
    const totalCompletions =
      typeof metaData?.completions === 'number' ? metaData.completions : 0;

    return {
      fastest: fastestSnap.docs.map(rowFromSnap),
      mostPrizes: mostPrizesSnap.docs.map(rowFromSnap),
      totalCompletions,
    };
  } catch (err) {
    console.warn('[tracking] fetchLeaderboards failed', err);
    return { fastest: [], mostPrizes: [], totalCompletions: 0 };
  }
}

/**
 * Cheap rank lookup for a finished run: counts how many finished runs beat it
 * on each axis (faster time / more prizes) and adds 1. Uses server-side count
 * aggregation so it's a couple of metadata reads, not a full scan. Returns
 * null on failure so callers just hide the rank.
 */
export async function fetchRunRank(run: {
  elapsed_ms: number;
  prizes_total: number;
}): Promise<{ speedRank: number; prizesRank: number } | null> {
  try {
    const runsCol = collection(db, RUNS);
    const fasterQ = query(
      runsCol,
      where('finished', '==', true),
      where('elapsed_ms', '<', run.elapsed_ms),
    );
    const morePrizesQ = query(
      runsCol,
      where('finished', '==', true),
      where('prizes_total', '>', run.prizes_total),
    );
    const [fasterSnap, morePrizesSnap] = await Promise.all([
      getCountFromServer(fasterQ),
      getCountFromServer(morePrizesQ),
    ]);
    return {
      speedRank: fasterSnap.data().count + 1,
      prizesRank: morePrizesSnap.data().count + 1,
    };
  } catch (err) {
    console.warn('[tracking] fetchRunRank failed', err);
    return null;
  }
}
