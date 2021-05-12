import firebaseAdmin from "@utils/firebaseServer";

const handler = async ({ myHandle, title, link, listType, remove }) => {
  await firebaseAdmin
    .firestore()
    .collection("profile")
    .doc(myHandle)
    .update({
      [listType === "Favourite" ? "favourite" : "blacklist"]: firebaseAdmin.firestore.FieldValue[remove ? "arrayRemove" : "arrayUnion"]({
        title,
        link,
      }),
    })
    .then()
    .catch((error) => {
      throw new TypeError(error);
    });
};

export default async (req, res) => {
  try {
    const { myHandle, title, link, listType, remove = "true" } = req.body;
    await handler({ myHandle, title, link, listType, remove });
    return res.status(200).send(true);
  } catch (error) {
    // console.log(error);
    return res.status(401).send(false);
  }
};
