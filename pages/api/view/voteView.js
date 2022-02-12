import { viewRef, firestore } from "@utils/firebaseServer";
import { FieldValue } from "firebase-admin/firestore";

const handler = async ({ myID, vote, viewID }) => {
  try {
    const viewRefDoc = viewRef.doc(viewID);

    await firestore.runTransaction(async (t) => {
      const initialDoc = await t.get(viewRefDoc);
      const {
        votes: { downvote, upvote },
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
      } else {
        if (downvote.includes(myID)) {
          t.update(viewRefDoc, { "votes.downvote": FieldValue.arrayRemove(myID) });
        } else {
          t.update(viewRefDoc, { "votes.downvote": FieldValue.arrayUnion(myID) });

          // if user has upvoted prviously before downvote is clicked, reduce total
          if (upvote.includes(myID)) {
            t.update(viewRefDoc, {
              "votes.total": FieldValue.increment(-1),
              "votes.upvote": FieldValue.arrayRemove(myID),
            });
          }
        }
      }
    });

    const currentDoc = await viewRefDoc.get();
    const { votes } = currentDoc.data();

    return {
      downvoted: votes.downvote.includes(myID),
      upvoted: votes.upvote.includes(myID),
      total: votes.total,
    };
  } catch (error) {
    throw error;
  }
};

export default async (req, res) => {
  try {
    const { myID, vote, viewID } = req.body;
    const votesResult = await handler({ myID, vote, viewID });
    return res.status(200).json(votesResult);
  } catch (error) {
    process.env.NODE_ENV !== "production" && console.log(error);
    return res.status(401).json(false);
  }
};
