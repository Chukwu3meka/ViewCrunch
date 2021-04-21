import firebaseAdmin from "@utils/firebaseServer";

const voteHandler = async ({ view, myHandle, vote }) => {
  await firebaseAdmin
    .firestore()
    .collection("view")
    .doc(view)
    .update({
      [vote ? "upvote" : "downvote"]: firebaseAdmin.firestore.FieldValue[vote ? "arrayUnion" : "arrayRemove"](myHandle),
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
    // view: "id of view",  vote: "upvote or downvote"
    const { view, myHandle, vote } = req.body;
    await voteHandler({ view, myHandle, vote });
    return res.status(200).send(true);
  } catch (error) {
    console.log(error);
    return res.status(401).send(false);
  }
};
