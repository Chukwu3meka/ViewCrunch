import { fetchView } from "@utils/firestoreFetch";
import { deleteImages } from "@utils/serverFunctions";
// import { extractMarkdownImages } from "@utils/clientFunctions";
import firebaseAdmin from "@utils/firebaseServer";

// const deleteArticle = async ({ articleId }) => {
//   const { content } = await fetchView({ articleId });
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
    const { articleId, token } = req.body;
    // console.log(token);
    const authorId = "await verifyIdToken(token)";
    if (!authorId) throw new TypeError("invalid user");
    // const deleted = await deleteArticle({ articleId });
    // if (deleted !== "success") throw new TypeError("Unable to delete article");
    return res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ status: "failed" });
  }
};
