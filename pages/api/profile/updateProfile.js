import firebaseAdmin from "@utils/firebaseServer";
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
  const tempLocation = {
    profilePicture: images.profilePicture
      ? await saveTempImage({ image: profilePicture, location: `${myHandle}/profilePicture.png`, handle: myHandle, api: "profile" })
      : null,
    coverPicture: images.coverPicture
      ? await saveTempImage({ image: coverPicture, location: `${myHandle}/coverPicture.png`, handle: myHandle, api: "profile" })
      : null,
  };

  const cloudURL = { profilePicture: "", coverPicture: "" };

  const uploadeHandler = async (x) => {
    if (tempLocation[x]) {
      await uploadImages({
        tempLocation: tempLocation[x],
        myHandle,
        title: x,
      })
        .then((url) => {
          cloudURL[x] = url;
          deleteTempImage({ location: `${myHandle}/${x}.png`, api: "profile" });
        })
        .catch((error) => {
          throw new TypeError(error);
        });
    }
  };

  await uploadeHandler("profilePicture");
  await uploadeHandler("coverPicture");

  return await firebaseAdmin
    .firestore()
    .collection("profile")
    .doc(myHandle)
    .update({
      profilePicture: cloudURL.profilePicture || oldImages.profilePicture,
      coverPicture: cloudURL.coverPicture || oldImages.coverPicture,
    })
    .then(async () => {
      // const deleteHandler = async (x) => {
      //   if (cloudURL[x] && oldImages[x].replace("https://", "").split(".")[0] === "firebasestorage") {
      //     // await deleteImages({ downloadUrl: oldImages[x], api: "profile" });
      //   }
      // };
      // deleteHandler("profilePicture");
      // deleteHandler("coverPicture");
      return true;
    })
    .catch((error) => {
      throw new TypeError(error);
    });
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
    // console.log(error);
    return res.status(401).send(false);
  }
};
