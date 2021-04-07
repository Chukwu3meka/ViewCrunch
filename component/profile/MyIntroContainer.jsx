import { useState } from "react";
import { styles, MyIntro } from "/";
import { makeStyles } from "@material-ui/core/styles";
import { fetcher, noOfWord, imageObject, dateCalculator } from "@utils/clientFunctions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

const MyIntroContainer = ({ online, myProfile, viewerData, viewerHistory, token }) => {
  const classes = useStyles(),
    [image, setImage] = useState(null),
    [forceRefresh, setForceRefresh] = useState(0),
    [updateFailed, setUpdateFailed] = useState(false),
    [handle, setHandle] = useState(viewerData?.handle),
    [updateSuccess, setUpdateSuccess] = useState(false),
    [updateEnabled, setUpdateEnabled] = useState(false),
    [about, setAbout] = useState(viewerData?.about),
    [preview, setPreview] = useState(viewerData?.profilePicture);

  const handleSave = async () => {
      if (noOfWord(about.toString()) <= 50 && handle.toString().length <= 30 && myProfile && online) {
        setUpdateEnabled(false);
        setUpdateFailed(false);
        const { status } = await fetcher(
          "/api/updateProfile",
          JSON.stringify({ image, handle, about, oldImage: viewerData?.profilePicture, token })
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
    },
    handleImageChange = async (e) => {
      if (e.target.files[0]) {
        setImage(await imageObject(e.target.files[0]));
        setPreview(await imageObject(e.target.files[0]));
        if (!updateEnabled) setUpdateEnabled(true);
      }
    };

  return (
    <>
      <MyIntro
        {...{
          handle,
          styles,
          classes,
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
        }}
      />
    </>
  );
};

export default MyIntroContainer;
