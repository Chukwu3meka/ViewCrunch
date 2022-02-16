import { profileRef, firestore } from "@utils/firebaseServer";
import { FieldValue } from "firebase-admin/firestore";

const updateSeen = ({ myID, message }) => {
  const profileRefDoc = profileRef.doc(myID);

  await firestore.runTransaction(async (t) => {
    const initialDoc = await t.get(profileRefDoc);
    const {
      notification: { messages, unread },
    } = initialDoc.data();

    if (vote) {
      if (upvote.includes(myID)) {
        t.update(viewRefDoc, {
          "votes.total": FieldValue.increment(-1),
          "votes.upvote": FieldValue.arrayRemove(myID),
        });
      } else {
        t.update(viewRefDoc, {
          "votes.total": FieldValue.increment(1),
          "votes.upvote": FieldValue.arrayUnion(myID),
          "votes.downvote": FieldValue.arrayRemove(myID),
        });
      }


  console.log({ myID, message });

  // return profileRef
  //   .doc(myID)
  //   .update({
  //     "details.theme": myTheme,
  //   })
  //   .catch((error) => {
  //     throw new TypeError(error);
  //   });
};

export default async (req, res) => {
  try {
    const { myID, message } = req.body;
    await updateSeen({ myID, message });
    return res.status(200).send(true);
  } catch (error) {
    console.log(error);
    return res.status(401).send(false);
  }
};
