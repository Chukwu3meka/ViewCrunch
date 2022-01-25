import admin from "firebase-admin";

const firebaseAdminFunc = () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_ID,
        clientEmail: process.env.NEXT_PUBLIC_MAIL,
        privateKey: process.env.NEXT_PUBLIC_KEY.replace(/\\n/g, "\n"),
      }),
      storageBucket: process.env.NEXT_PUBLIC_STOR,
      databaseURL: process.env.NEXT_PUBLIC_URL,
    });
  }
  return admin;
};

const firebaseAdmin = firebaseAdminFunc(),
  bucket = firebaseAdmin.storage().bucket();

export { bucket, firebaseAdmin as default };
