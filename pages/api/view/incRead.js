import firebaseAdmin, { verifyIdToken } from "@utils/firebaseServer";

const incrementRead = async ({ myAuthorID, articleId }) => {
  await firebaseAdmin
    .firestore()
    .collection("profile")
    .doc(myAuthorID)
    .update({ articlesRead: firebaseAdmin.firestore.FieldValue.arrayUnion(articleId) })
    .then(async () => {
      await firebaseAdmin
        .firestore()
        .collection("article")
        .doc(articleId)
        .update({
          "view.data": firebaseAdmin.firestore.FieldValue.arrayUnion(myAuthorID),
          "view.length": firebaseAdmin.firestore.FieldValue.increment(1),
        })
        .catch((err) => {
          throw new TypeError("failed to increment read in article");
        });
    })
    .catch((err) => {
      throw new TypeError("failed to add to articles read");
    });
  return "success";
};

export default async (req, res) => {
  try {
    const { token, articleId } = req.body;
    const myAuthorID = await verifyIdToken(token);
    if (!myAuthorID) throw new TypeError("security issue");
    const result = await incrementRead({ myAuthorID, articleId });
    if (result !== "success") throw new TypeError("error updating");
    return res.status(200).json({ status: "success" });
  } catch (error) {
    return res.status(401).json({ status: "failed" });
  }
};
