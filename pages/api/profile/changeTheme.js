import { firestore } from "@utils/firebaseServer";

const changeTheme = ({ myID, myTheme }) => {
  return firestore
    .collection("profile")
    .doc(myID)
    .update({
      "details.theme": myTheme,
    })
    .catch((error) => {
      throw new TypeError(error);
    });
};

export default async (req, res) => {
  try {
    const { myID, myTheme } = req.body;
    await changeTheme({ myID, myTheme });
    return res.status(200).send(true);
  } catch (error) {
    console.log(error);
    return res.status(401).send(false);
  }
};
