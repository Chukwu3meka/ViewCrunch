import firebaseAdmin from "@utils/firebaseServer";

const handler = async ({ name, email, comment, section }) => {
  await firebaseAdmin
    .firestore()
    .collection("contactus")
    .add({
      name,
      email,
      comment,
      section,
      date: firebaseAdmin.firestore.Timestamp.now(),
    })
    .then()
    .catch((error) => {
      throw new TypeError(error);
    });
};

export default async (req, res) => {
  try {
    const { name, email, comment, section } = req.body;
    await handler({ name, email, comment, section });
    return res.status(200).send(true);
  } catch (error) {
    // console.log(error)
    return res.status(401).send(false);
  }
};
