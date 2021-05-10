import firebaseAdmin from "@utils/firebaseServer";

const handler = async ({ myHandle, title, link, listType }) => {
  await firebaseAdmin
    .firestore()
    .collection("profile")
    .doc(myHandle)
    .update({
      [listType === "Favourite" ? "favourite" : "blacklist"]: firebaseAdmin.firestore.FieldValue.arrayRemove({ title, link }),
    })
    .then()
    .catch((error) => {
      throw new TypeError(error);
    });
};

export default async (req, res) => {
  try {
    const { myHandle, title, link, listType } = req.body;
    await handler({ myHandle, title, link, listType });
    return res.status(200).send(true);
  } catch (error) {
    console.log(error);
    return res.status(401).send(false);
  }
};
