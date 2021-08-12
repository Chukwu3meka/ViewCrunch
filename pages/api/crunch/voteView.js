import firebaseAdmin from "@utils/firebaseServer";

const handler = async ({ viewId, myHandle, vote, author }) => {
  try {
    // console.log({ viewId, myHandle, vote, author });

    const viewRef = firebaseAdmin.firestore().collection("view").doc(viewId);
    const profileRef = firebaseAdmin.firestore().collection("profile").doc(author);

    return await firebaseAdmin.firestore().runTransaction(async (t) => {
      const doc = await t.get(viewRef);
      const { upvote, downvote } = doc.data();

      const newUpvote = vote
        ? upvote.includes(myHandle)
          ? upvote.filter((x) => x !== myHandle)
          : [...upvote, myHandle]
        : upvote.filter((x) => x !== myHandle);
      const newDownvote = !vote
        ? downvote.includes(myHandle)
          ? downvote.filter((x) => x !== myHandle)
          : [...downvote, myHandle]
        : downvote.filter((x) => x !== myHandle);

      t.update(viewRef, { upvote: newUpvote, downvote: newDownvote });

      await profileRef
        .update({
          [`published.${viewId}.upvote`]: newUpvote.length,
          [`published.${viewId}.downvote`]: newDownvote.length,
        })
        .catch((error) => {
          throw new TypeError(error);
        });

      return { newTotalUpvote: newUpvote.length, status: true };
    });
  } catch (error) {
    throw new TypeError(error);
  }
};

export default async (req, res) => {
  try {
    // view: "id of view",  vote: "true or false"
    const { viewId, myHandle, vote, author } = req.body;
    const result = await handler({ viewId, myHandle, vote, author });
    return res.status(200).json(result);
  } catch (error) {
    // console.log(error);
    return res.status(401).json({ status: false });
  }
};
