import { initializeApp, cert, getApps, getApp, applicationDefault } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

if (!getApps().length) {
  initializeApp(JSON.parse(process.env.NEXT_PUBLIC_CLIENT));
}

const storage = getStorage();
const firestore = getFirestore();

export { firestore, storage };
