const { initializeApp, cert, getApps } = require("firebase-admin/app");
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";

if (!getApps().length) {
  initializeApp({
    databaseURL: process.env.NEXT_PUBLIC_DBURL,
    credential: cert(JSON.parse(process.env.NEXT_PUBLIC_SERVER)),
    storageBucket: JSON.parse(process.env.NEXT_PUBLIC_SERVER).storageBucket,
  });
}

const auth = getAuth(),
  firestore = getFirestore(),
  bucket = getStorage().bucket();

export { bucket, auth, firestore };
