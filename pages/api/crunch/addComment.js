import { fetchProfile } from "@utils/firestoreFetch";
import firebaseAdmin, { verifyIdToken } from "@utils/firebaseServer";

const addComment = async ({ myAuthorID, newComment, articleId }) => {
  const { roles } = await fetchProfile(myAuthorID);
  if (!roles.includes("comment")) throw new TypeError("comment priviledge is missing");
  return firebaseAdmin
    .firestore()
    .collection("article")
    .doc(articleId)
    .update({
      comments: firebaseAdmin.firestore.FieldValue.arrayUnion({
        authorId: myAuthorID,
        date: firebaseAdmin.firestore.Timestamp.now(),
        comment: newComment,
      }),
    })
    .then(() => "success")
    .catch((error) => {
      throw new TypeError(error);
    });
};

export default async (req, res) => {
  try {
    const { token, newComment, articleId } = req.body;
    const myAuthorID = await verifyIdToken(token);
    if (!myAuthorID) throw new TypeError("security issue");
    const result = await addComment({ myAuthorID, newComment, articleId });
    if (result !== "success") throw new TypeError("error updating");
    return res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ status: "failed" });
  }
};
