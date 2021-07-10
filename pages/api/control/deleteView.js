import firebaseAdmin from "@utils/firebaseServer";

export default async (req, res) => {
  try {
    throw new TypeError("authentication failed");

    const handle = "@maduekwepedro";
    for (const id of ["aaa", "Aa1"]) {
      await firebaseAdmin
        .firestore()
        .collection("profile")
        .doc(key)
        .set({
          date: firebaseAdmin.firestore.Timestamp.now(),
          flash: value,
        })
        .then()
        .catch((error) => {
          throw new TypeError(error);
        });
    }

    return res.status(200).send(true);
  } catch (error) {
    // console.log(error);
    return res.status(401).send(false);
  }
};
