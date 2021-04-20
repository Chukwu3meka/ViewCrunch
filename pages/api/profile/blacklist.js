import firebaseAdmin from "@utils/firebaseServer";

const blacklistHandler = async ({ myHandle, view, mode }) => {
  const connection = await firebaseAdmin.database().ref("profile").on;
  console.log(connection, "connection");

  await firebaseAdmin
    .firestore()
    .collection("view")
    .doc(myHandle)
    .set({
      blacklist: mode ? firebaseAdmin.firestore.FieldValue.arrayUnion(view) : firebaseAdmin.firestore.FieldValue.arrayRemove(view),
    })
    .catch((error) => {
      throw new TypeError(error);
    });
};

export default async (req, res) => {
  try {
    const { myHandle, view, mode } = req.body;
    await blacklistHandler({ myHandle, view, mode });
    return res.status(200).send(true);
  } catch (error) {
    console.log(error);
    return res.status(401).send(false);
  }
};
