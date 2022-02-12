import { toId } from "@utils/clientFunctions";
import { firestore } from "@utils/firebaseServer";

import { FieldValue, Timestamp } from "firebase-admin/firestore";

export default async (req, res) => {
  try {
    if (process.env.NODE_ENV !== "development") throw new TypeError("authentication failed");

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

    // for (const title of ["Lifehack", "Universal", "Career 101", "Finance", "Cyber Security", "Developers"]) {
    //   await firestore
    //     .collection("crunch")
    //     .doc(toId(title))
    //     .set({
    //       about: `${title} about`,
    //       picture: "/images/ViewCrunch-cover.webp",
    //       date: Timestamp.now(),
    //       follower: ["nT2S72k44CT6oBWcqnCp8vMgR1e2"],
    //       admin: ["nT2S72k44CT6oBWcqnCp8vMgR1e2"],
    //       moderator: [],
    //       title,
    //       suspended: false,
    //     });
    // }

    return res.status(200).send(true);
  } catch (error) {
    console.log(error);
    return res.status(401).send(false);
  }
};
