import { useState } from "react";
import { styles, MyIntro } from "/";
import { fetcher, noOfWord, imageObject, dateCalculator } from "@utils/clientFunctions";
import validate from "@utils/validator";

const MyIntroContainer = ({ online, myProfile, viewerData, myHandle }) => {
  const [profilePicture, setProfilePicture] = useState(viewerData.profilePicture),
    [coverPicture, setCoverPicture] = useState(viewerData.coverPicture),
    [forceRefresh, setForceRefresh] = useState(0),
    [updateFailed, setUpdateFailed] = useState(false),
    [handle, setHandle] = useState(viewerData?.handle),
    [updateSuccess, setUpdateSuccess] = useState(false),
    [updateEnabled, setUpdateEnabled] = useState(false),
    [imageEnabled, setImageEnabled] = useState(false),
    [about, setAbout] = useState(viewerData?.about),
    [preview, setPreview] = useState(viewerData?.profilePicture),
    [safeInput, setSafeInput] = useState({ linkedinHandle: false, twitterHandle: false, facebookHandle: false, website: false }),
    [oldImages, setOldImages] = useState({
      profilePicture: viewerData.profilePicture,
      coverPicture: viewerData.coverPicture,
    }),
    [viewerLink, setViewerLink] = useState(viewerData.social);

  const viewerLinkHandler = (slot, value = "") => {
    setViewerLink({ ...viewerLink, [slot]: value });
    if (!updateEnabled) setUpdateEnabled(true);
    return validate("otherHandle", value) ? false : true;
  };

  const handleSave = async () => {
    return console.log("saving");
    if (noOfWord(about.toString()) <= 50 && handle.toString().length <= 30 && myProfile && online) {
      setUpdateEnabled(false);
      setUpdateFailed(false);
      const { status } = await fetcher(
        "/api/updateProfile",
        JSON.stringify({ image, handle, about, oldImage: viewerData?.profilePicture, myHandle })
      );
      if (status === "success") {
        setUpdateSuccess(true);
        setUpdateFailed(false);
      }
      if (status === "failed") {
        setUpdateSuccess(false);
        setUpdateFailed(true);
      }
    } else {
      setUpdateFailed(true);
      setUpdateSuccess(false);
      setUpdateEnabled(false);
    }
    setForceRefresh(Math.random() * 1000);
  };

  const handleImageChange = async (e, picture) => {
    if (e.target.files[0]) {
      if (picture === "profilePicture") setProfilePicture(await imageObject(e.target.files[0]));
      if (picture === "coverPicture") setCoverPicture(await imageObject(e.target.files[0]));
      if (!imageEnabled) setImageEnabled(true);
    }
  };

  const uploadImageHandler = async (image) => {
    if (online && myHandle) {
      if (image || safeInput)
        if (noOfWord(about.toString()) <= 50 && handle.toString().length <= 30 && myProfile && online) {
          const status = await fetcher(
            "/api/updateProfile",
            JSON.stringify(
              image
                ? { myHandle, coverPicture, profilePicture, image }
                : { image, handle, about, oldImage: viewerData?.profilePicture, myHandle }
            )
          );

          console.log(coverPicture, profilePicture, myHandle, "uploadImageHandler");

          if (status) {
            if (!image) setSafeInput(false);
            image ? setImageEnabled(false) : setUpdateEnabled(false);
            enqueueSnackbar("Success", { variant: "success" });
          } else {
            enqueueSnackbar("Error occured", { variant: "error" });
          }
        } else {
          enqueueSnackbar(image ? "Error uploading image" : "Error updating profile", { variant: "error" });
        }
    }
  };

  return (
    <>
      <MyIntro
        {...{
          handle,
          styles,
          about,
          preview,

          setAbout,
          setHandle,
          myProfile,
          viewerData,
          handleSave,
          forceRefresh,
          updateFailed,
          updateEnabled,
          updateSuccess,
          setUpdateEnabled,
          handleImageChange,

          profilePicture,
          uploadImageHandler,
          coverPicture,
          viewerLink,
          safeInput,
          setViewerLink,
          imageEnabled,
          viewerLinkHandler,
        }}
      />
    </>
  );
};

export default MyIntroContainer;
