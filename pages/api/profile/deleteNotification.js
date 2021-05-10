import firebaseAdmin from "@utils/firebaseServer";

const Handler = async ({ myHandle, title, body, link }) => {
  await firebaseAdmin
    .firestore()
    .collection("profile")
    .doc(myHandle)
    .update({
      notification: firebaseAdmin.firestore.FieldValue.arrayRemove({ title, body, link }),
    })
    .then()
    .catch((error) => {
      throw new TypeError(error);
    });
};

export default async (req, res) => {
  try {
    const { myHandle, title, body, link } = req.body;
    await Handler({ myHandle, title, body, link });
    return res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ status: "failed" });
  }
};
