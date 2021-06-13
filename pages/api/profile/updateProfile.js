import validate from "@utils/validator";
import firebaseAdmin from "@utils/firebaseServer";
import { uploadImages, deleteImages, saveTempImage, deleteTempImage } from "@utils/serverFunctions";

const updateHandler = async ({ about, website, profession, displayName, twitterHandle, linkedinHandle, facebookHandle, myHandle }) => {
  return await firebaseAdmin
    .firestore()
    .collection("profile")
    .doc(myHandle)
    .update({
      about,
      profession,
      displayName,
      social: {
        website,
        twitterHandle,
        linkedinHandle,
        facebookHandle,
      },
    })
    .then(() => true)
    .catch((error) => {
      throw new TypeError(error);
    });
};

const uploadHandler = async ({ profilePicture, coverPicture, oldImages, myHandle, images }) => {
  const tempLocation = {
    profilePicture:
      profilePicture.startsWith("platform-lookaside.fbsbx.com") ||
      profilePicture.startsWith("firebasestorage.googleapis.com") ||
      !!profilePicture
        ? null
        : await saveTempImage({ image: profilePicture, location: `${myHandle}/profilePicture.png`, handle: myHandle, api: "profile" }),
    coverPicture:
      coverPicture.startsWith("platform-lookaside.fbsbx.com") ||
      coverPicture.startsWith("firebasestorage.googleapis.com") ||
      !!coverPicture
        ? null
        : await saveTempImage({ image: coverPicture, location: `${myHandle}/coverPicture.png`, handle: myHandle, api: "profile" }),
  };

  const cloudURL = { profilePicture: "", coverPicture: "" };

  console.log({ oldImages, myHandle, images, a: !profilePicture, b: !coverPicture });

  //   await uploadImages({
  //     tempLocation,
  //     myAuthorID,
  //     title: `profilePicture`,
  //   })
  //     .then((url) => {
  //       cloudURL = url;
  //       deleteTempImage(tempLocation);
  //     })
  //     .catch(() => {});
  // }

  return;

  // image, handle, aboutMe, oldImage, myAuthorID
  console.log({ myHandle });

  return false;

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
    const {
      // auth
      myHandle,
      // update
      about,
      website,
      profession,
      displayName,
      twitterHandle,
      linkedinHandle,
      facebookHandle,
      //upload
      image,
      profilePicture,
      coverPicture,
      oldImages,
      images,
    } = req.body;
    if (!myHandle) throw new TypeError("user not authenticated");

    const handlerResult = image
      ? await uploadHandler({ profilePicture, coverPicture, oldImages, myHandle, images })
      : await updateHandler({ about, website, profession, displayName, twitterHandle, linkedinHandle, facebookHandle, myHandle });

    if (!handlerResult) throw new TypeError("Server error");
    return res.status(200).send(true);
  } catch (error) {
    console.log(error);
    return res.status(401).send(false);
  }
};
