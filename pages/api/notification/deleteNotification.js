import { fetchArticle } from "@utils/firestoreFetch";
import { deleteImages } from "@utils/serverFunctions";
// import { extractMarkdownImages } from "@utils/clientFunctions";
import firebaseAdmin, { verifyIdToken } from "@utils/firebaseServer";

const Handler = async ({ id, a }) => {
  console.log("hey");
};

export default async (req, res) => {
  try {
    const { id, token } = req.body;
    // const authorId = await verifyIdToken(token);
    // if (!authorId) throw new TypeError("invalid user");
    // const result = await Handler({ id, authorId });
    // if (result !== "success") throw new TypeError("Issue resolving request");
    return res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ status: "failed" });
  }
};
