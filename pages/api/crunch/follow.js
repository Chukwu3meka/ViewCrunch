import { crunchRef, profileRef } from "@utils/firebaseServer";
import { FieldValue } from "firebase-admin/firestore";

const handler = async ({ follower, id, myID, title }) => {
  try {
    await crunchRef.doc(id).update({
      followers: follower ? FieldValue.arrayRemove(myID) : FieldValue.arrayUnion(myID),
      "stat.totalFollowers": FieldValue.increment(follower ? -1 : 1),
    });
    await profileRef.doc(myID).update({
      crunches: follower ? FieldValue.arrayRemove(title) : FieldValue.arrayUnion(title),
    });
    return true;
  } catch (error) {
    throw error;
  }
};

export default async (req, res) => {
  try {
    const { follower, id, myID, title } = req.body;
    await handler({ follower, id, myID, title });
    return res.status(200).json(true);
  } catch (error) {
    process.env.NODE_ENV !== "production" && console.log(error);
    return res.status(401).json(null);
  }
};
