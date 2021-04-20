import firebaseAdmin from "@utils/firebaseServer";

export default async (req, res) => {
  try {
    const { uid, handle, photoURL } = req.body;

    await firebaseAdmin
      .auth()
      .updateUser(uid, {
        displayName: handle,
        photoURL: photoURL,
      })
      .then()
      .catch((error) => {
        throw new TypeError(error);
      });

    return res.status(200).send(true);
  } catch (error) {
    console.log(error);
    return res.status(401).send(false);
  }
};
