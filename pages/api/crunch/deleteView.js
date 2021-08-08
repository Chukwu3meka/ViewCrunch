import firebaseAdmin from "@utils/firebaseServer";
import { fetchView } from "@utils/firestoreFetch";
import { deleteImages, extractStorageLinks } from "@utils/serverFunctions";

const deleteViewHandler = async ({ ref, myHandle }) => {
  const [, , view] = ref.split("@");
  const view = await fetchView({ author: myHandle, view });

  if (!view) throw new TypeError("View does not exist");

  const imageLinks = extractStorageLinks({ content: view?.content, myHandle });

  if (imageLinks) {
    for (const downloadUrl of imageLinks) {
      deleteImages(downloadUrl);
    }
  }

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
    const { ref, myHandle } = req.body;
    await deleteViewHandler({ ref, myHandle });
    return res.status(200).send(true);
  } catch (err) {
    // console.log(err);
    return res.status(401).send(false);
  }
};
