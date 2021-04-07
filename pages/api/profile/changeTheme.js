import firebaseAdmin, { verifyIdToken } from "@utils/firebaseServer";

const changeTheme = ({ myHandle, myTheme }) => {
  return firebaseAdmin
    .firestore()
    .collection("profile")
    .doc(myHandle)
    .set({
      "stat.theme": myTheme,
    })
    .catch((err) => {
      // console.log(err)
    });
};

export default async (req, res) => {
  try {
    const { myRefresh, myHandle, myTheme } = req.body;
    await verifyIdToken({ myRefresh });
    await changeTheme({ myHandle, myTheme });
    return res.status(200).json({});
  } catch (error) {
    return res.status(401).json({});
  }
};
