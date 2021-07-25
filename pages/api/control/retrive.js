import firebaseAdmin from "@utils/firebaseServer";

export default async (req, res) => {
  try {
    if (process.env.NODE_ENV !== "development") throw new TypeError("authentication failed");

    const docs = await firebaseAdmin
      .firestore()
      .collection("view")
      .get()
      .then((documentSnapshots) => {
        const docLength = documentSnapshots?.docs?.length,
          docs = [];

        if (documentSnapshots?.docs?.length) {
          for (const doc of documentSnapshots.docs) {
            const {
              title: { data: title, path },
            } = doc.data();

            docs.push(title);
          }
        }

        return { docs: docs.sort(), docLength };
      })
      .catch((error) => {
        throw new TypeError(error);
      });

    return res.status(200).json(docs);
  } catch (error) {
    console.log(error);
    return res.status(401).send(false);
  }
};
