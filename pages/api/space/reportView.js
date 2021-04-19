import firebaseAdmin from "@utils/firebaseServer";

const reportSpaceHandler = ({ view, myHandle, report }) => {
  firebaseAdmin
    .firestore()
    .collection("report")
    .add({
      view,
      reporter: myHandle,
      report,
      date: firebaseAdmin.firestore.Timestamp.now(),
    })
    .catch((error) => {
      throw new TypeError(error);
    });
};

export default async (req, res) => {
  try {
    const { view, myHandle, report } = req.body;
    await reportSpaceHandler({ view, myHandle, report });
    return res.status(200).send(true);
  } catch (error) {
    console.log(error);
    return res.status(401).send(false);
  }
};
