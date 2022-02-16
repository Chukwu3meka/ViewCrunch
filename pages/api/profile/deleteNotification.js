import { profileRef, firestore } from "@utils/firebaseServer";
import { FieldValue } from "firebase-admin/firestore";

const deleteNotif = ({ myID, messageID }) => {
  return profileRef
    .doc(myID)
    .update({
      [`notification.${messageID}`]: FieldValue.delete(),
    })
    .catch((error) => {
      throw error;
    });
};

export default async (req, res) => {
  try {
    const { myID, messageID } = req.body;
    await deleteNotif({ myID, messageID });
    return res.status(200).send(true);
  } catch (error) {
    return res.status(401).send(false);
  }
};
