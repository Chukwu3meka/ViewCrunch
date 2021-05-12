import firebaseAdmin from "@utils/firebaseServer";

const handler = async ({ id, myHandle, follow }) => {
  await firebaseAdmin
    .firestore()
    .collection("profile")
    .doc(myHandle)
    .update({
      [`crunches.${id}`]: follow ? { publish: true, retouch: true, moderate: false } : firebaseAdmin.firestore.FieldValue.delete(),
    })
    .then()
    .catch((error) => {
      throw new TypeError(error);
    });
};

export default async (req, res) => {
  try {
    const { myHandle, id, follow } = req.body;
    await handler({ myHandle, id, follow });
    return res.status(200).send(true);
  } catch (error) {
    console.log(error);
    return res.status(401).send(false);
  }
};
