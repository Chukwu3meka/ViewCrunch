import { fetchAuthorData } from "@utils/firestoreFetch";
import firebaseAdmin, { verifyIdToken } from "@utils/firebaseServer";

const rateArticle = async ({ myAuthorID, articleId, articleRating }) => {
  const { roles } = await fetchAuthorData(myAuthorID);
  if (!roles.includes("rate")) throw new TypeError("rate priviledge is missing");

  await firebaseAdmin
    .firestore()
    .collection("article")
    .doc(articleId)
    .get()
    .then(async (snapshot) => {
      if (snapshot.exists) {
        const {
          rating: { data: ratingData },
        } = snapshot.data();
        ratingData[myAuthorID] = articleRating;
        const ratingNumber = await Object.keys(ratingData).map((key) => ratingData[key]),
          newAverage = (await ratingNumber.reduce((total, value) => total + value, 0)) / ratingNumber.length;
        await firebaseAdmin
          .firestore()
          .collection("article")
          .doc(articleId)
          .update({
            [`rating.data.${myAuthorID}`]: articleRating,
            // "view.data": firebase.firestore.FieldValue.arrayUnion(myAuthorID),
            "rating.length": ratingNumber.length,
            "rating.average": Math.round(newAverage),
          })
          .then(() => {})
          .catch((err) => {
            throw new TypeError("failed to update rating");
          });
      }
    })
    .catch((err) => {
      throw new TypeError("failed to retive data");
    });
  return "success";
};

export default async (req, res) => {
  try {
    const { token, articleId, articleRating } = req.body;
    const myAuthorID = await verifyIdToken(token);
    if (!myAuthorID) throw new TypeError("security issue");
    const result = await rateArticle({ myAuthorID, articleId, myAuthorID, articleRating });
    if (result !== "success") throw new TypeError("error updating");
    return res.status(200).json({ status: "success" });
  } catch (error) {
    return res.status(401).json({ status: "failed" });
  }
};
