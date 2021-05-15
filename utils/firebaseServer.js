import admin from "firebase-admin";

const firebaseAdminFunc = () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      databaseURL: process.env.FIREBASE_DB_URL,
    });
  }
  return admin;
};

const firebaseAdmin = firebaseAdminFunc(),
  bucket = firebaseAdmin.storage().bucket();

export { bucket, firebaseAdmin as default };
