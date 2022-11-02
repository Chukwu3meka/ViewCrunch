import { profileRef } from "@utils/firebaseServer";

const updateSeen = ({ myID, messageID }) => {
  return profileRef
    .doc(myID)
    .update({
      [`notification.${messageID}.seen`]: true,
    })
    .catch((error) => {
      throw error;
    });
};

export default async (req, res) => {
  try {
    const { myID, messageID } = req.body;
    await updateSeen({ myID, messageID });
    return res.status(200).send(true);
  } catch (error) {
    return res.status(401).send(false);
  }
};
