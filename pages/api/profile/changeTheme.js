import firebaseAdmin from "@utils/firebaseServer";

const changeTheme = ({ myHandle, myTheme }) => {
  return firebaseAdmin
    .firestore()
    .collection("profile")
    .doc(myHandle)
    .update({
      "stat.theme": myTheme,
    })
    .catch((error) => {
      throw new TypeError(error);
    });
};

export default async (req, res) => {
  try {
    const { myHandle, myTheme } = req.body;
    await changeTheme({ myHandle, myTheme });
    return res.status(200).send(true);
  } catch (error) {
    // console.log(error);
    return res.status(401).send(false);
  }
};
