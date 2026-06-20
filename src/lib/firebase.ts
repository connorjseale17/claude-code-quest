import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// The Firestore instance on this project is a NAMED database ("ccqdatabase"),
// not the unnamed "(default)" one. getFirestore(app) with no id targets
// "(default)", which doesn't exist here — so the id must be passed explicitly
// or every read/write fails. Mirror this in firebase.json so rules deploy to
// the same database.
const FIRESTORE_DATABASE_ID = 'ccqdatabase';

type FirebaseBundle = { auth: Auth; db: Firestore };

let bundlePromise: Promise<FirebaseBundle> | null = null;
// Mirror of the live Auth instance once the SDK has loaded, so currentUid()
// can stay synchronous for render-time callers. Null until first load.
let authInstance: Auth | null = null;

/**
 * Lazily import + initialize the Firebase SDK. The firebase/app, /auth and
 * /firestore modules are ~300KB minified; importing them dynamically keeps
 * them out of the main bundle and in a separate chunk that only downloads the
 * first time anything touches auth or Firestore (i.e. when a run starts or a
 * leaderboard is shown — never on the boot/splash/instructions screens).
 * Cached after the first call: one app, one auth, one db for the session.
 */
function loadFirebase(): Promise<FirebaseBundle> {
  if (bundlePromise) return bundlePromise;
  bundlePromise = (async () => {
    const [{ initializeApp }, { getAuth }, { getFirestore }] = await Promise.all([
      import('firebase/app'),
      import('firebase/auth'),
      import('firebase/firestore'),
    ]);
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
      console.warn('[firebase] VITE_FIREBASE_* env vars are missing; auth/firestore will fail.');
    }
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app, FIRESTORE_DATABASE_ID);
    authInstance = auth;
    return { auth, db };
  })();
  return bundlePromise;
}

/** Resolve the Firestore instance, loading the SDK on first use. */
export async function getDb(): Promise<Firestore> {
  return (await loadFirebase()).db;
}

let signInPromise: Promise<string> | null = null;

export function ensureAnonAuth(): Promise<string> {
  if (signInPromise) return signInPromise;

  signInPromise = (async () => {
    const { auth } = await loadFirebase();
    if (auth.currentUser) return auth.currentUser.uid;
    const { signInAnonymously, onAuthStateChanged } = await import('firebase/auth');
    return new Promise<string>((resolve, reject) => {
      const unsub = onAuthStateChanged(
        auth,
        user => {
          if (user) {
            unsub();
            resolve(user.uid);
          }
        },
        err => {
          unsub();
          signInPromise = null;
          reject(err);
        },
      );
      signInAnonymously(auth).catch(err => {
        unsub();
        signInPromise = null;
        reject(err);
      });
    });
  })();

  return signInPromise;
}

export function currentUid(): string | null {
  return authInstance?.currentUser?.uid ?? null;
}
