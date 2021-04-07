import { fetchArticle } from "@utils/firestoreFetch";
import { deleteImages } from "@utils/serverFunctions";
// import { extractMarkdownImages } from "@utils/clientFunctions";
import firebaseAdmin, { verifyIdToken } from "@utils/firebaseServer";

// const unfollowViewscapeHandler = async ({ id, a }) => {
//   const { content } = await fetchArticle({ articleId });
//   if (!content.markdown) throw new TypeError("invalid content id");

//   const images = (await extractMarkdownImages({ markdown: content.markdown })) || [];
//   if (images?.length) {
//     for (const image of images) {
//       await deleteImages({ downloadUrl: image });
//     }
//   }

//   return firebaseAdmin
//     .firestore()
//     .collection("article")
//     .doc(articleId)
//     .delete()
//     .then(() => "success")
//     .catch(() => "failed");
// };

export default async (req, res) => {
  try {
    const { id, token } = req.body;
    // const authorId = await verifyIdToken(token);
    // if (!authorId) throw new TypeError("invalid user");
    // const result = await unfollowViewscapeHandler({ id, authorId });
    // if (result !== "success") throw new TypeError("Issue resolving request");
    return res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ status: "failed" });
  }
};
