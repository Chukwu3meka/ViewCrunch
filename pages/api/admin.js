import { toId } from "@utils/clientFunctions";
import { firestore } from "@utils/firebaseServer";

import { FieldValue, Timestamp } from "firebase-admin/firestore";

export default async (req, res) => {
  try {
    if (process.env.NODE_ENV !== "development") throw new TypeError("authentication failed");

    // keywords / description;

    await firestore
      .collection("view")
      .get()
      .then(async (snap) => {
        for (const doc of snap.docs) {
          await firestore.collection("view").doc(doc.id).update({
            "status.moderator": "zqWXUjfcFXPGKzgN3HCvoFuOz043",
            "stat.author": "zqWXUjfcFXPGKzgN3HCvoFuOz043",
          });
        }
      });

    // await firestore
    //   .collection("profile")
    //   .doc("zqWXUjfcFXPGKzgN3HCvoFuOz043")
    //   .get()
    //   .then(async (snap) => {
    //     const doc = snap.data();

    //     await firestore.collection("profile").doc(snap.id).update({
    //       // moderation: FieldValue.delete(),
    //       // status: doc.moderation,
    //       // bookmarks: [],
    //     });
    //   });

    return res.status(200).send(true);
  } catch (error) {
    console.log(error);
    return res.status(401).send(false);
  }
};
