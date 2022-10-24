import firebaseConfig from "./env";
import { initializeApp, getApp } from "firebase/app"; 

import type { FirebaseApp } from "firebase/app";
import firebase from "firebase/compat/app"

export function initFirebase() {
  let fb: FirebaseApp
  try {
    fb = getApp();
  } catch {
    fb = firebase.initializeApp(firebaseConfig)
  }
  return fb
}
