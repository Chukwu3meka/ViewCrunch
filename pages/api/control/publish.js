import firebaseAdmin from "@utils/firebaseServer";

export default async (req, res) => {
  try {
    const { status, body } = req.body;

    const date =
      req.body.date ??
      `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, 0)}-${String(new Date().getDate()).padStart(2, 0)}`;

    if (status !== "72373746Jr") throw new TypeError("wrong status");
    if (!body) throw new TypeError("bad body");

    await firebaseAdmin
      .firestore()
      .collection("news")
      .doc(date)
      .set({
        date: date ? firebaseAdmin.firestore.Timestamp.fromDate(new Date(date)) : firebaseAdmin.firestore.Timestamp.now(),
        flash: body,
      })
      .then()
      .catch((error) => {
        throw new TypeError(error);
      });

    return res.status(200).send(true);
  } catch (error) {
    // console.log(error);
    return res.status(401).send(false);
  }
};
