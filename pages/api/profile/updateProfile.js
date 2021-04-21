import validate from "@utils/validator";
import firebaseAdmin from "@utils/firebaseServer";
import { uploadImages, deleteImages, saveTempImage, deleteTempImage } from "@utils/serverFunctions";

const updateProfileFunc = async ({ image, handle, aboutMe, oldImage, myAuthorID }) => {
  let tempLocation, cloudURL;
  if (image) {
    tempLocation = await saveTempImage(image, `${myAuthorID}-profilePicture.png`);
    await uploadImages({
      tempLocation,
      myAuthorID,
      title: `profilePicture`,
    })
      .then((url) => {
        cloudURL = url;
        deleteTempImage(tempLocation);
      })
      .catch(() => {});
  }

  await firebaseAdmin
    .firestore()
    .collection("profile")
    .doc(myAuthorID)
    .update({
      handle,
      profilePicture: cloudURL || oldImage,
      aboutMe,
    })
    .then(async () => {
      if (cloudURL && oldImage.replace("https://", "").split(".")[0] === "firebasestorage") {
        await deleteImages({ downloadUrl: oldImage });
      }
    })
    .catch((error) => {
      throw new TypeError(error);
    });
  return "success";
};

export default async (req, res) => {
  try {
    const { image, handle, aboutMe, oldImage, token } = req.body;
    const myAuthorID = "await verifyIdToken(token)";
    if (!myAuthorID && validate("handle", handle) && validate("text", aboutMe) && oldImage) throw new TypeError("security issue");
    const result = await updateProfileFunc({ image, handle, aboutMe, oldImage, myAuthorID });
    if (result !== "success") throw new TypeError("error uploading");
    return res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ status: "failed" });
  }
};
