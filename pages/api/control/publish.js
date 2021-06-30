import firebaseAdmin from "@utils/firebaseServer";

export default async (req, res) => {
  try {
    const { status, body, date } = req.body;

    if (status !== "72373746Jr") throw new TypeError("wrong status");
    if (!body) throw new TypeError("bad body");

    await firebaseAdmin
      .firestore()
      .collection("news")
      .doc(
        date ||
          `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, 0)}-${String(new Date().getDate()).padStart(
            2,
            0
          )}`
      )
      .set({
        date: firebaseAdmin.firestore.Timestamp.now(),
        flash: body,
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
