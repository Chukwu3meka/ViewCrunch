// import { range, time2read } from "@utils/clientFunctions";
// import firebaseAdmin from "@utils/firebaseServer";

export default async (req, res) => {
  try {
    if (process.env.NODE_ENV !== "development") throw new TypeError("authentication failed");

    // console.log(process.env.NEXT_PUBLIC_CLIENT);

    // await firebaseAdmin
    //   .firestore()
    //   .collection("view")
    //   .get()
    //   .then(async (snapshot) => {
    //     for (const doc of snapshot.docs) {
    //       const { comments, content, title, stat, moderation } = doc.data();

    //       //  const title = "40 Life hacks";

    //       // console.log(image);

    //       // const link = content.split('<Image src="')[0] || null;
    //       // console.log(link ? link?.split(" />")[0] : "null;dsdfd");
    //       // readTime
    //       await firebaseAdmin
    //         .firestore()
    //         .collection("view")
    //         .add({
    //           title,
    //           content,
    //           comments,
    //           stat,
    //           moderation,
    //           votes: { total: range(50, 300), upvote: [], downvote: [] },
    //         });

    //       await firebaseAdmin.firestore().collection("view").doc(doc.id).delete();
    //     }

    //     // console.log(snapshot.docs[0].data().title.data);
    //     // await firebaseAdmin
    //     //   .firestore()
    //     //   .collection("view")
    //     //   .doc("@maduekwepedro@introduction-to-client-side-rendering(csr)-and-server-side-rendering-in-react-with-focus-on-nextjs")
    //     //   .set(d.data());
    //   })
    //   .catch((error) => {
    //     throw error;
    //   });

    return res.status(200).send(true);
  } catch (error) {
    console.log(error);
    return res.status(401).send(false);
  }
};
