// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// import firebase from "firebase/app";
// import {} from "firebase/firestore";
// import "firebase/auth";
// import "firebase/storage";
// import "firebase/analytics";

// // v9 compat packages are API compatible with v8 code
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// import "firebase/compat/storage";
// // import "firebase/analytics";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_API,
//   authDomain: process.env.NEXT_PUBLIC_AUTH,
//   projectId: process.env.NEXT_PUBLIC_ID,
//   storageBucket: process.env.NEXT_PUBLIC_STOR,
//   messagingSenderId: process.env.NEXT_PUBLIC_MSG,
//   appId: process.env.NEXT_PUBLIC_APP,
//   databaseURL: process.env.NEXT_PUBLIC_URL,
//   measurementId: process.env.NEXT_PUBLIC_MEA,
// };

// Initialize Firebase with a "default" Firebase project
// const firebase = initializeApp(firebaseConfig);
// const firebase = initializeApp(process.env.NEXT_PUBLIC_CLIENT);

// console.log(process.env.NEXT_PUBLIC_MEA);

// initializeApp({ ...process.env.NEXT_PUBLIC_CLIENT });

// const storage = getStorage();
// const firestore = getFirestore();

// // Initialize Firebase
// if (!firebase?.apps?.length) {

//   firebase.initializeApp(firebaseConfig);
//   // firebase.auth.Auth.Persistence.LOCAL;
//   // firebase
//   //   .firestore()
//   //   .enablePersistence()
//   //   .catch((err) => console.log(err));
// }

// const firestore = firebase.firestore(),
//   storage = firebase.storage();
// const firestore = getFirestore(app);
// storage = firebase.storage();

// export { firestore=[], storage=[] };

const firestore = [];

export { firestore };
