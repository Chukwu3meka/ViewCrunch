const { initializeApp, cert, getApps } = require("firebase-admin/app");
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";

if (!getApps().length) {
  initializeApp({
    credential: cert(JSON.parse(process.env.NEXT_PUBLIC_SERVER)),
    databaseURL: JSON.parse(process.env.NEXT_PUBLIC_CLIENT).databaseURL,
    storageBucket: JSON.parse(process.env.NEXT_PUBLIC_CLIENT).storageBucket,
  });
}

const auth = getAuth(),
  firestore = getFirestore(),
  bucket = getStorage().bucket();

export { bucket, auth, firestore };
