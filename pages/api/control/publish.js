import firebaseAdmin from "@utils/firebaseServer";

export default async (req, res) => {
  try {
    const { status, body } = req.body;

    if (status !== "@1998Pio") throw new TypeError("wrong status");
    if (!body) throw new TypeError("bad body");

    const date =
      req.body.date ??
      `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, 0)}-${String(new Date().getDate()).padStart(2, 0)}`;
    const newsRef = firebaseAdmin.firestore().collection("news").doc(date);

    await firebaseAdmin
      .firestore()
      .runTransaction(async (t) => {
        const doc = await t.get(newsRef);

        if (doc.exists && !!doc.data()?.flash.trim()) {
          t.update(newsRef, {
            flash: `${doc.data()?.flash}@@@${body.trim()}`,
          });
        }
        return !doc.exists || !doc.data()?.flash.trim();
      })
      .then(async (dateNotFound) => {
        if (dateNotFound) {
          await newsRef
            .set({
              date: req.body.date ? firebaseAdmin.firestore.Timestamp.fromDate(new Date(date)) : firebaseAdmin.firestore.Timestamp.now(),
              flash: body.trim(),
            })
            .then()
            .catch((error) => {
              throw new TypeError(error);
            });
        }
      })
      .catch((error) => {
        throw new TypeError(error);
      });

    return res.status(200).send(true);
  } catch (error) {
    // console.log(error);
    return res.status(401).send(false);
  }
};
