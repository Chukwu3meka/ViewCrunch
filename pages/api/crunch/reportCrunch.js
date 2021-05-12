import firebaseAdmin from "@utils/firebaseServer";

const handler = async ({ link, myHandle, report, section }) => {
  await firebaseAdmin
    .firestore()
    .collection("report")
    .add({
      link,
      section,
      reporter: myHandle,
      report,
      date: firebaseAdmin.firestore.Timestamp.now(),
    })
    .then()
    .catch((error) => {
      throw new TypeError(error);
    });
};

export default async (req, res) => {
  try {
    // link: "profile, view or crunch link", report: "reason for reporting", section:"view, crunch or profile"
    const { myHandle, report, link, section } = req.body;
    await handler({ myHandle, link, report, section });
    return res.status(200).send(true);
  } catch (error) {
    console.log(error);
    return res.status(401).send(false);
  }
};
