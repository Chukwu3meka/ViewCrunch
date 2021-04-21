import firebaseAdmin from "@utils/firebaseServer";

const followHandler = ({ myHandle, follow, viewer }) => {
  return firebaseAdmin
    .firestore()
    .collection("profile")
    .doc(myHandle)
    .update({
      "chat.following": firebaseAdmin.firestore.FieldValue[follow ? arrayUnion : arrayRemove](viewer),
    })
    .catch((error) => {
      throw new TypeError(error);
    });
};

export default async (req, res) => {
  try {
    const { myRefresh, myHandle, follow, viewer } = req.body;
    // await verifyIdToken({ myRefresh });
    // await followHandler({ myHandle, follow, viewer });
    return res.status(200).send(true);
  } catch (error) {
    console.log(error);
    return res.status(401).send(false);
  }
};
