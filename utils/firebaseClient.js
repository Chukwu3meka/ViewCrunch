const { initializeApp, cert, getApps } = require("firebase-admin/app");
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";

// check if server has been initialized
if (!getApps().length) {
  initializeApp({
    // not passing env.key(NEXT_PUBLIC_SERVER) to cert will not work
    credential: cert(JSON.parse(process.env.NEXT_PUBLIC_SERVER)),
    // databaseURL && storageBucket are not included in  the Server key and we don't have to include it since we're following the DRY principle, what we can do is detructure the CLient env key to get it
    databaseURL: JSON.parse(process.env.NEXT_PUBLIC_CLIENT).databaseURL,
    storageBucket: JSON.parse(process.env.NEXT_PUBLIC_CLIENT).storageBucket,
  });
}

const auth = getAuth(), // auth instance
  firestore = getFirestore(), // firestore instance
  bucket = getStorage().bucket(); // storage instance

const newsRef = firestore.collection("news"),
  viewRef = firestore.collection("view"),
  crunchRef = firestore.collection("crunch"),
  profileRef = firestore.collection("profile");

export { bucket, auth, firestore, viewRef, profileRef, crunchRef, newsRef };
