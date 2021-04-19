import firebaseAdmin from "@utils/firebaseServer";

const upvoteHandler = async ({ view, myHandle, upvote, removeVote }) => {
  await firebaseAdmin
    .firestore()
    .collection("view")
    .doc(view)
    .update({
      [upvote ? "upvote" : "downvote"]: firebaseAdmin.firestore.FieldValue[removeVote ? "arrayRemove" : "arrayUnion"](view),
    })
    .then(async () => {
      await firebaseAdmin
        .firestore()
        .collection("profile")
        .doc(myHandle)
        .update({
          [upvote ? "published.upvote" : "published.downvote"]: firebaseAdmin.firestore.FieldValue.increment(removeVote ? -1 : 1),
        })
        .catch((error) => {
          throw new TypeError(error);
        });
    })
    .catch((error) => {
      throw new TypeError(error);
    });
};
export default async (req, res) => {
  try {
    const { view, myHandle, upvote, removeVote } = req.body;
    // await upvoteHandler({ view, myHandle, upvote, removeVote });
    return res.status(200).send(true);
  } catch (error) {
    console.log(error);
    return res.status(401).send(false);
  }
};
