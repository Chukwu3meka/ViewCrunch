import firebaseAdmin from "@utils/firebaseServer";

const incrementRead = async ({ myHandle, view }) => {
  await firebaseAdmin
    .firestore()
    .collection("view")
    .doc(view)
    .update({
      viewers: firebaseAdmin.firestore.FieldValue.arrayUnion(myHandle),
    })
    .catch((error) => {
      throw new TypeError(error);
    });
  return "success";
};

export default async (req, res) => {
  try {
    const { view, myHandle } = req.body;
    await incrementRead({ view, myHandle });
    return res.status(200).send(true);
  } catch (error) {
    return res.status(401).send(false);
  }
};
