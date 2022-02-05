import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

if (!getApps().length) {
  initializeApp(JSON.parse(process.env.NEXT_PUBLIC_CLIENT));
}

const firestore = getFirestore();
const auth = getAuth();

export { firestore, auth };
