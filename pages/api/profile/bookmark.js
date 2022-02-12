import { profileRef, firestore } from "@utils/firebaseServer";
import { FieldValue } from "firebase-admin/firestore";

const handler = async ({ myID, viewID }) => {
  try {
    const profileRefDoc = profileRef.doc(myID);

    return await firestore.runTransaction(async (t) => {
      const initialDoc = await t.get(profileRefDoc);

      const { bookmarks } = initialDoc.data();

      t.update(profileRefDoc, {
        bookmarks: bookmarks.includes(viewID) ? FieldValue.arrayRemove(viewID) : FieldValue.arrayUnion(viewID),
      });

      return !bookmarks.includes(viewID);
    });
  } catch (error) {
    throw error;
  }
};

export default async (req, res) => {
  try {
    const { myID, viewID } = req.body;
    const bookmarked = await handler({ myID, viewID });
    return res.status(200).json(bookmarked);
  } catch (error) {
    process.env.NODE_ENV !== "production" && console.log(error);
    return res.status(401).json(false);
  }
};
