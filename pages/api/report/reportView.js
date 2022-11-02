import { firestore } from "@utils/firebaseServer";
import { Timestamp } from "firebase-admin/firestore";

const handler = async ({ myID, viewID, report }) => {
  try {
    await firestore.collection("report").add({
      subject: "view",
      details: report,
      persecutor: myID,
      subjectID: viewID,
      timestamp: Timestamp.now(),
    });
  } catch (error) {
    throw error;
  }
};

export default async (req, res) => {
  try {
    const { myID, viewID, report } = req.body;

    await handler({ myID, viewID, report });
    return res.status(200).json(true);
  } catch (error) {
    process.env.NODE_ENV !== "production" && console.log(error);
    return res.status(401).json(false);
  }
};
