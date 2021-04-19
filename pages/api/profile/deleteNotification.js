import firebaseAdmin from "@utils/firebaseServer";

const Handler = async ({ id, myHandle }) => {
  await firebaseAdmin
    .firestore()
    .collection("profile")
    .doc(myHandle)
    .update({ [`notification.${id}`]: firebaseAdmin.firestore.FieldValue.delete() })
    .catch((error) => {
      throw new TypeError(error);
    });
};

export default async (req, res) => {
  try {
    const { id, myHandle } = req.body;
    await Handler({ id, myHandle });
    return res.status(200).send(true);
  } catch (error) {
    console.log(error);
    return res.status(401).send(false);
  }
};
