import { profileRef, firestore } from "@utils/firebaseServer";
import { FieldValue } from "firebase-admin/firestore";

const handler = async ({ myID, author }) => {
  try {
    const profileRefDoc = profileRef.doc(myID);

    return await firestore.runTransaction(async (t) => {
      const initialDoc = await t.get(profileRefDoc);

      const { blacklist } = initialDoc.data();

      t.update(profileRefDoc, {
        blacklist: blacklist.includes(author) ? FieldValue.arrayRemove(author) : FieldValue.arrayUnion(author),
      });

      return !blacklist.includes(author);
    });
  } catch (error) {
    throw error;
  }
};

export default async (req, res) => {
  try {
    const { myID, author } = req.body;
    const blacklisted = await handler({ myID, author });
    return res.status(200).json(blacklisted);
  } catch (error) {
    process.env.NODE_ENV !== "production" && console.log(error);
    return res.status(401).json(false);
  }
};
