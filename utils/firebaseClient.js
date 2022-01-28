import { initializeApp, cert, getApps, getApp, applicationDefault } from "firebase/app";
import { getFirestore } from "firebase/firestore";

if (!getApps().length) {
  initializeApp(JSON.parse(process.env.NEXT_PUBLIC_CLIENT));
}

const firestore = getFirestore();

export { firestore };
