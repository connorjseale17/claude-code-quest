import type { QueryDocumentSnapshot } from 'firebase/firestore';
import { ensureAnonAuth, getDb } from './firebase';

// The Firestore SDK is imported dynamically inside each function (via
// `import('firebase/firestore')`, the same chunk firebase.ts loads) so it stays
// out of the main bundle. Every function also awaits ensureAnonAuth() first:
// it guarantees the anonymous session exists before any read/write (the
// security rules require it) and triggers the one-time SDK load.

const RUNS = 'runs';
const FEEDBACK = 'feedback';

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
    const [uid, db, fs] = await Promise.all([
      ensureAnonAuth(),
      getDb(),
      import('firebase/firestore'),
    ]);
    const ref = await fs.addDoc(fs.collection(db, RUNS), {
      uid,
      handle: input.handle,
      colorIdx: input.colorIdx,
      started_at: fs.serverTimestamp(),
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
    const [, db, fs] = await Promise.all([
      ensureAnonAuth(),
      getDb(),
      import('firebase/firestore'),
    ]);
    const runRef = fs.doc(db, RUNS, input.runId);
    const metaGlobal = fs.doc(db, 'meta', 'global');
    const levels = input.levels.map(l => ({
      id: l.id,
      completed_at: fs.Timestamp.fromMillis(l.completed_at),
    }));
    const prizes = input.prizes.map(p => ({
      id: p.id,
      unlocked_at: fs.Timestamp.fromMillis(p.unlocked_at),
    }));
    await fs.runTransaction(db, async tx => {
      tx.set(
        runRef,
        {
          finished_at: fs.serverTimestamp(),
          finished: true,
          elapsed_ms: input.elapsed_ms,
          levels,
          prizes,
          prizes_total: prizes.length,
        },
        { merge: true },
      );
      tx.set(metaGlobal, { completions: fs.increment(1) }, { merge: true });
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
    const [uid, db, fs] = await Promise.all([
      ensureAnonAuth(),
      getDb(),
      import('firebase/firestore'),
    ]);
    const rating = Math.max(1, Math.min(5, Math.round(input.rating)));
    await fs.addDoc(fs.collection(db, FEEDBACK), {
      uid,
      rating,
      comment: (input.comment ?? '').trim().slice(0, 2000),
      source: input.source,
      track: input.track ?? null,
      handle: input.handle ?? null,
      runId: input.runId ?? null,
      level: input.level ?? null,
      ua: typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 300) : null,
      created_at: fs.serverTimestamp(),
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
    const [, db, fs] = await Promise.all([
      ensureAnonAuth(),
      getDb(),
      import('firebase/firestore'),
    ]);
    const runsCol = fs.collection(db, RUNS);
    const metaGlobal = fs.doc(db, 'meta', 'global');
    const fastestQ = fs.query(
      runsCol,
      fs.where('finished', '==', true),
      fs.orderBy('elapsed_ms', 'asc'),
      fs.limit(7),
    );
    const mostPrizesQ = fs.query(
      runsCol,
      fs.where('finished', '==', true),
      fs.orderBy('prizes_total', 'desc'),
      fs.orderBy('elapsed_ms', 'asc'),
      fs.limit(7),
    );

    const [fastestSnap, mostPrizesSnap, metaSnap] = await Promise.all([
      fs.getDocs(fastestQ),
      fs.getDocs(mostPrizesQ),
      fs.getDoc(metaGlobal),
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
    const [, db, fs] = await Promise.all([
      ensureAnonAuth(),
      getDb(),
      import('firebase/firestore'),
    ]);
    const runsCol = fs.collection(db, RUNS);
    const fasterQ = fs.query(
      runsCol,
      fs.where('finished', '==', true),
      fs.where('elapsed_ms', '<', run.elapsed_ms),
    );
    const morePrizesQ = fs.query(
      runsCol,
      fs.where('finished', '==', true),
      fs.where('prizes_total', '>', run.prizes_total),
    );
    const [fasterSnap, morePrizesSnap] = await Promise.all([
      fs.getCountFromServer(fasterQ),
      fs.getCountFromServer(morePrizesQ),
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
