import firebaseAdmin from "@utils/firebaseServer";
import { uploadToFirestorage } from "@utils/serverFunctions";
import { uploadImages, saveTempImage, deleteTempImage } from "@utils/serverFunctions";

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
  const imagePath = {
    profilePicture: images.profilePicture
      ? await uploadToFirestorage({
          image: profilePicture,
          imageTitle: "profilePicture.png",
          myHandle,
        })
      : oldImages.profilePicture,
    coverPicture: images.coverPicture
      ? await uploadToFirestorage({
          image: coverPicture,
          imageTitle: "coverPicture.png",
          myHandle,
        })
      : oldImages.coverPicture,
  };

  return await firebaseAdmin
    .firestore()
    .collection("profile")
    .doc(myHandle)
    .update({
      profilePicture: imagePath.profilePicture,
      coverPicture: imagePath.coverPicture,
    })
    .then(() => true)
    .catch((error) => {
      throw new TypeError(error);
    });
};

export default async (req, res) => {
  try {
    const {
      myHandle,
      about,
      website,
      profession,
      displayName,
      twitterHandle,
      linkedinHandle,
      facebookHandle,
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
