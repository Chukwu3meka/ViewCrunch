import firebaseAdmin from "@utils/firebaseServer";

export default async (req, res) => {
  try {
    if (process.env.NODE_ENV !== "development") throw new TypeError("authentication failed");
    await firebaseAdmin
      .firestore()
      .collection("view")
      .doc("@maduekwepedro@introduction-to-client-side-rendering(csr)-and-server-side-rendering-in-react-with-focus-on-next.js")
      .get()
      .then(async (d) => {
        await firebaseAdmin
          .firestore()
          .collection("view")
          .doc("@maduekwepedro@introduction-to-client-side-rendering(csr)-and-server-side-rendering-in-react-with-focus-on-nextjs")
          .set(d.data());
      })
      .catch((error) => {
        throw new TypeError(error);
      });

    console.log(doc);

    // return res.status(200).send(true);
  } catch (error) {
    console.log(error);
    return res.status(401).send(false);
  }
};
