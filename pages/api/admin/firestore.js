import firebaseAdmin from "@utils/firebaseServer";

export default async (req, res) => {
  try {
    if (process.env.NODE_ENV !== "development") throw new TypeError("authentication failed");

    await firebaseAdmin
      .firestore()
      .collection("view")
      // .doc("@maduekwepedro@introduction-to-client-side-rendering(csr)-and-server-side-rendering-in-react-with-focus-on-next.js")
      .get()
      .then(async (snapshot) => {
        for (const doc of snapshot.docs) {
          const {
            title,
            content,
            stat: { keywords },
          } = doc.data();

          //  const title = "40 Life hacks";

          // console.log(image);

          // const link = content.split('<Image src="')[0] || null;
          // console.log(link ? link?.split(" />")[0] : "null;dsdfd");
          // readTime
          await firebaseAdmin.firestore().collection("view").doc(doc.id).update({
            "stat.keyword": "viewcrunch",
            // "stat.author": `@maduekwepedro`,
            // {
            //   author: "chukwuemeka@maduekwe",
            //   date: firebaseAdmin.firestore.Timestamp.now(),
            //   path: `${title}-${doc.id}`.replace(/ /g, "-").toLowerCase(),
            //   image: `${title}@0.png`,
            //   keywords: "",
            //   description: "",
            //   crunch: "universal",
            // },
          });
        }
        // console.log(snapshot.docs[0].data().title.data);
        // await firebaseAdmin
        //   .firestore()
        //   .collection("view")
        //   .doc("@maduekwepedro@introduction-to-client-side-rendering(csr)-and-server-side-rendering-in-react-with-focus-on-nextjs")
        //   .set(d.data());
      })
      .catch((error) => {
        throw error;
      });

    return res.status(200).send(true);
  } catch (error) {
    console.log(error);
    return res.status(401).send(false);
  }
};
