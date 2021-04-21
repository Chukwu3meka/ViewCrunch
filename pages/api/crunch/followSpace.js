import firebaseAdmin from "@utils/firebaseServer";

const followCrunchHandler = ({ title, myHandle, follow }) => {
  firebaseAdmin
    .firestore()
    .collection("profile")
    .doc(myHandle)
    .update({
      [`crunches.${title}`]: follow
        ? { title, roles: ["publish", "delete", "modify", "share", "moderate"] }
        : firebaseAdmin.firestore.FieldValue.delete(),
    })
    .then()
    .catch((error) => {
      throw new TypeError(error);
    });
};

export default async (req, res) => {
  try {
    const { myRefresh, myHandle, title, follow } = req.body;
    console.log({ myRefresh, myHandle, title, follow });
    // await verifyIdToken({ myRefresh });
    // await followCrunchHandler({ myHandle, title, follow });
    return res.status(200).send(true);
  } catch (error) {
    console.log(error);
    return res.status(401).send(false);
  }
};
