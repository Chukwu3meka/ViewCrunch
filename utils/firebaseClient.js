import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
// import "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API,
  authDomain: process.env.NEXT_PUBLIC_AUTH,
  databaseURL: process.env.NEXT_PUBLIC_URL,
  projectId: process.env.NEXT_PUBLIC_ID,
  storageBucket: process.env.NEXT_PUBLIC_STOR,
  messagingSenderId: process.env.NEXT_PUBLIC_MSG,
  appId: process.env.NEXT_PUBLIC_APP,
  measurementId: process.env.NEXT_PUBLIC_MEA,
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  // firebase.auth.Auth.Persistence.LOCAL;
  // firebase
  //   .firestore()
  //   .enablePersistence()
  //   .catch((err) => console.log(err));
}

const firestore = firebase.firestore(),
  storage = firebase.storage();

export { firestore, storage, firebase as default };
