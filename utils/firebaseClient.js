import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

if (!getApps().length) {
  initializeApp(JSON.parse(process.env.NEXT_PUBLIC_CLIENT));
}

const firestore = getFirestore();

// const viewCollection = collection(firestore, "view");
// const crunchCollection = collection(firestore, "crunch");
// const profileCollection = collection(firestore, "profile");

// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";

// // import { initializeApp, SDK_VERSION } from "firebase/app";
// // // import { getFirestore } from "firebase/firestore/lite";

// // // let firebase;
// // // if (!getApps().length) {
// // // firebase = initializeApp(JSON.parse(process.env.NEXT_PUBLIC_CLIENT));
// // // }

// // const firebase = initializeApp(JSON.parse(process.env.NEXT_PUBLIC_CLIENT));
// // console.log(firebase, SDK_VERSION);

// // // const firestore = getFirestore(firebase);
// // // const firestore = "Dfsfds";

// // export { firebase as default };

// // Initialize Cloud Firestore through Firebase

// const initializeApp(JSON.parse(process.env.NEXT_PUBLIC_CLIENT));

// const firestore = getFirestore(firebase);

// console.log({ s: firestore.app });

export { firestore };
