import { firestore } from "@utils/firebaseServer";
import { Timestamp } from "firebase-admin/firestore";

const handler = async ({ name, email, comment, section }) =>
  await firestore
    .collection("contactus")
    .add({
      name,
      email,
      comment,
      section,
      date: Timestamp.now(),
    })
    .then((doc) => true)
    .catch((error) => {
      throw error;
    });

export default async (req, res) => {
  try {
    const { name, email, comment, section } = req.body;
    await handler({ name, email, comment, section });
    return res.status(200).send(true);
  } catch (error) {
    console.log(error);
    return res.status(401).send(false);
  }
};
