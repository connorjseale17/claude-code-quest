import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.warn('[firebase] VITE_FIREBASE_* env vars are missing; auth/firestore will fail.');
}

const app = initializeApp(firebaseConfig);

// The Firestore instance on this project is a NAMED database ("ccqdatabase"),
// not the unnamed "(default)" one. getFirestore(app) with no id targets
// "(default)", which doesn't exist here — so the id must be passed explicitly
// or every read/write fails. Mirror this in firebase.json so rules deploy to
// the same database.
const FIRESTORE_DATABASE_ID = 'ccqdatabase';

export const auth = getAuth(app);
export const db = getFirestore(app, FIRESTORE_DATABASE_ID);

let signInPromise: Promise<string> | null = null;

export function ensureAnonAuth(): Promise<string> {
  if (auth.currentUser) return Promise.resolve(auth.currentUser.uid);
  if (signInPromise) return signInPromise;

  signInPromise = new Promise<string>((resolve, reject) => {
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

  return signInPromise;
}

export function currentUid(): string | null {
  return auth.currentUser?.uid ?? null;
}
