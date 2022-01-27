const { initializeApp, cert, getApps, getApp, applicationDefault } = require("firebase-admin/app");
// import { initializeApp, cert } from "firebase-admin";
// import { getFirestore } from "firebase-admin/firestore";
// import { getAuth } from "firebase-admin/auth";
// import { getStorage } from "firebase-admin/storage";

// const firebaseAdmin = initializeApp({
//   credential: process.env.NEXT_PUBLIC_SA,
//   databaseURL: process.env.NEXT_PUBLIC_URL,
// });

if (!getApps().length) {
  // initializeApp({
  //   credential: process.env.NEXT_PUBLIC_SERVER,
  //   // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
  // });
  // const firebaseAdmin = initializeApp({
  //   credential: process.env.NEXT_PUBLIC_SA,
  //   databaseURL: process.env.NEXT_PUBLIC_URL,
  // });
  // initializeApp({
  //   credential: cert({
  //     type: "service_account",
  //     project_id: process.env.NEXT_PUBLIC_ID,
  //     private_key_id: process.env.NEXT_PUBLIC_API,
  //     private_key: process.env.NEXT_PUBLIC_KEY.replace(/\\n/g, "\n"),
  //     clientEmail: process.env.NEXT_PUBLIC_MAIL,
  //   }),
  //   storageBucket: process.env.NEXT_PUBLIC_STOR,
  //   databaseURL: process.env.NEXT_PUBLIC_URL,
  // });
}

console.log("getApp().options");

//         projectId: process.env.NEXT_PUBLIC_ID,
//         clientEmail: process.env.NEXT_PUBLIC_MAIL,
//         privateKey: process.env.NEXT_PUBLIC_KEY.replace(/\\n/g, "\n"),

// const firebaseAdmin = initializeApp({
//   credential: firebaseAdmin.credential.cert(process.env.NEXT_PUBLIC_SA),
//   // credential: applicationDefault(),
// });

// // Initialize Firebase with a "default" Firebase project
// const firebaseAdmin = initializeApp(
//   cert(
//     // projectId: process.env.NEXT_PUBLIC_ID,
//     // clientEmail: process.env.NEXT_PUBLIC_MAIL,
//     // privateKey: process.env.NEXT_PUBLIC_KEY.replace(/\\n/g, "\n"),
//     // }),
//     // credential: cert(process.env.NEXT_PUBLIC_SA),
//     process.env.NEXT_PUBLIC_SA
//     // storageBucket: process.env.NEXT_PUBLIC_STOR,
//     // databaseURL: process.env.NEXT_PUBLIC_URL,
//   )
// );

// console.log("firebaseAdmin");

// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// const auth = getAuth();

// const auth = getAuth(),
//   firestore = getFirestore(),
//   bucket = getStorage().bucket();

// export { bucket, auth, firestore, firebaseAdmin as default };

export default "firebaseAdmin";

// import admin from "firebase-admin";

// const firebaseAdminFunc = () => {
//   if (!admin.apps.length) {
//     admin.initializeApp({
//       credential: admin.credential.cert({
//         projectId: process.env.NEXT_PUBLIC_ID,
//         clientEmail: process.env.NEXT_PUBLIC_MAIL,
//         privateKey: process.env.NEXT_PUBLIC_KEY.replace(/\\n/g, "\n"),
//       }),
//       storageBucket: process.env.NEXT_PUBLIC_STOR,
//       databaseURL: process.env.NEXT_PUBLIC_URL,
//     });
//   }
//   return admin;
// };

// const firebaseAdmin = firebaseAdminFunc(),
//   bucket = firebaseAdmin.storage().bucket();

// export { bucket, firebaseAdmin as default };
