import firebaseAdmin from "@utils/firebaseServer";
import { fetchView } from "@utils/firestoreFetch";
import { deleteImages } from "@utils/serverFunctions";

const deleteViewHandler = async ({ ref, myHandle, title }) => {
  const [, , view] = ref.split("@");
  const { view: viewData } = await fetchView({ author: myHandle, view });

  if (!viewData) throw new TypeError("View does not exist");

  await deleteImages({ content: viewData?.content, myHandle, title });
  await firebaseAdmin
    .firestore()
    .collection("profile")
    .doc(myHandle)
    .update({
      [`published.${ref}`]: firebaseAdmin.firestore.FieldValue.delete(),
    })
    .then(async () => {
      await firebaseAdmin.firestore().collection("view").doc(ref).delete();
    })
    .catch((err) => {
      throw new TypeError(err);
    });

  return true;
};

export default async (req, res) => {
  try {
    const { ref, title, myHandle } = req.body;
    await deleteViewHandler({ ref, myHandle, title });
    return res.status(200).send(true);
  } catch (err) {
    // console.log(err);
    return res.status(401).send(false);
  }
};
