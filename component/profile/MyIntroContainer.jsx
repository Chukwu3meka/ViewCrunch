import { useState } from "react";
import { styles, MyIntro } from "/";
import { fetcher, noOfWord, imageObject, dateCalculator } from "@utils/clientFunctions";
import validate from "@utils/validator";

const MyIntroContainer = ({ online, myProfile, viewerData, myHandle, enqueueSnackbar }) => {
  const [profilePicture, setProfilePicture] = useState(viewerData.profilePicture),
    [coverPicture, setCoverPicture] = useState(viewerData.coverPicture),
    [forceRefresh, setForceRefresh] = useState(0),
    [updateFailed, setUpdateFailed] = useState(false),
    [handle, setHandle] = useState(viewerData?.handle),
    [updateSuccess, setUpdateSuccess] = useState(false),
    [updateEnabled, setUpdateEnabled] = useState(false),
    [imageEnabled, setImageEnabled] = useState(false),
    [preview, setPreview] = useState(viewerData?.profilePicture),
    [safeInput, setSafeInput] = useState({
      about: false,
      website: false,
      profession: false,
      displayName: false,
      twitterHandle: false,
      linkedinHandle: false,
      facebookHandle: false,
    }),
    [oldImages, setOldImages] = useState({
      profilePicture: viewerData.profilePicture,
      coverPicture: viewerData.coverPicture,
    }),
    [viewerInput, setViewerInput] = useState({
      ...viewerData.social,
      about: viewerData.about,
      profession: viewerData.profession,
      displayName: viewerData.displayName,
    });

  const [images, setImages] = useState({
    profilePicture: false,
    coverPicture: false,
  });

  const viewerInputHandler = (slot, value = "") => {
    if (myProfile) {
      if (!updateEnabled) setUpdateEnabled(true);
      setViewerInput({ ...viewerInput, [slot]: value });
      setSafeInput({ ...safeInput, [slot]: validate(slot, value) ? false : true });
      if (!validate(slot, value)) enqueueSnackbar("Invalid input", { variant: "error" });
    }
  };

  const updateHandler = async () => {
    if (online && myHandle) {
      // check length of value
      for (const [key, value] of Object.entries(viewerInput)) {
        if (!value.length) return enqueueSnackbar("Empty input detected", { variant: "error" });
      }

      // check if value is valid
      for (const [key, value] of Object.entries(safeInput)) {
        if (value) return enqueueSnackbar("Invalid input detected", { variant: "error" });
      }

      const status = await fetcher("/api/profile/updateProfile", JSON.stringify({ ...viewerInput, myHandle }));

      if (status) {
        setUpdateEnabled(false);
        enqueueSnackbar("Successfully updated", { variant: "success" });
      } else {
        enqueueSnackbar("Failed to update", { variant: "error" });
      }
    } else {
      enqueueSnackbar("Network/Authentication Issue", { variant: "error" });
    }
  };

  const imageHandler = async (e, picture) => {
    if (e.target.files[0]) {
      if (!imageEnabled) setImageEnabled(true);
      if (picture === "profilePicture") {
        setImages({ ...images, profilePicture: true });
        setProfilePicture(await imageObject(e.target.files[0]));
      }
      if (picture === "coverPicture") {
        setImages({ ...images, coverPicture: true });
        setCoverPicture(await imageObject(e.target.files[0]));
      }
    }
  };

  const uploadHandler = async () => {
    if (online && myHandle) {
      const status = await fetcher(
        "/api/profile/updateProfile",
        JSON.stringify({ image: true, myHandle, profilePicture, coverPicture, oldImages, images })
      );

      if (status) {
        setImageEnabled(false);
        setOldImages({ profilePicture, coverPicture });
        enqueueSnackbar("Success", { variant: "success" });
      } else {
        enqueueSnackbar("Error uploading image", { variant: "error" });
      }
    } else {
      enqueueSnackbar("Network/Authentication issue", { variant: "error" });
    }
  };

  return (
    <>
      <MyIntro
        {...{
          handle,
          styles,
          preview,

          setHandle,
          myProfile,
          viewerData,
          updateHandler,
          forceRefresh,
          updateFailed,
          updateEnabled,
          updateSuccess,
          setUpdateEnabled,
          imageHandler,

          profilePicture,
          uploadHandler,
          coverPicture,
          viewerInput,
          safeInput,
          setViewerInput,
          imageEnabled,
          viewerInputHandler,
        }}
      />
    </>
  );
};

export default MyIntroContainer;
