import {
  addDoc,
  collection,
  doc,
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
      limit(5),
    );
    const mostPrizesQ = query(
      runsCol,
      where('finished', '==', true),
      orderBy('prizes_total', 'desc'),
      orderBy('elapsed_ms', 'asc'),
      limit(5),
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
