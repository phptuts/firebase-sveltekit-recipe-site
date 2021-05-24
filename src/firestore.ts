import firebaseConfig from "./env";
import type firebase from "firebase/app";

let db: firebase.firestore.Firestore = null;
let called = false;

export async function initFirebase() {
  // can only be called once.
  if (called) {
    return;
  }
  called = true;
  if (typeof window !== "undefined") {
    const fb: any = (await import("firebase/app")).default;
    await import("firebase/auth");
    await import("firebase/firestore");
    fb.initializeApp(firebaseConfig);
    return;
  }

  const fb: any = await import("firebase");
  if (fb.apps.length == 0) {
    let app = fb.initializeApp(firebaseConfig);
    return app.firestore() as firebase.firestore.Firestore;
  }
}

export async function firestore(): Promise<firebase.firestore.Firestore> {
  if (db) {
    return db;
  }

  if (typeof window !== "undefined") {
    await import("firebase/auth");
    await import("firebase/firestore");

    const fb: any = (await import("firebase/app")).default;

    db = fb.firestore();
    return db;
  }

  const fb: any = await import("firebase");
  return fb.apps[0].firestore() as firebase.firestore.Firestore;
}
