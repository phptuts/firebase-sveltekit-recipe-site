import firebaseConfig from "./env";

export async function initFirebase() {
  if (typeof window !== "undefined") {
    // You need to use firebase/app for the client side
    const fb: any = (await import("firebase/app")).default;
    await import("firebase/auth");
    await import("firebase/firestore");
    fb.initializeApp(firebaseConfig);
    return;
  }

  const fb: any = await import("firebase");
  if (fb.apps.length == 0) {
    fb.initializeApp(firebaseConfig);
    return;
  }
}
