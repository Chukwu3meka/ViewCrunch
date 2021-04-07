import firebaseAdmin, { verifyIdToken } from "@utils/firebaseServer";

const reportSpaceHandler = ({ id, myHandle, report }) => {
  firebaseAdmin
    .firestore()
    .collection("report")
    .add({
      id,
      reporter: myHandle,
      report,
      date: firebaseAdmin.firestore.Timestamp.now(),
    })
    .catch();
};

export default async (req, res) => {
  try {
    const { myRefresh, myHandle, id, report } = req.body;
    await verifyIdToken({ myRefresh });
    await reportSpaceHandler({ myHandle, id, report });
    return res.status(200).send(true);
  } catch (error) {
    return res.status(401).send(false);
  }
};
