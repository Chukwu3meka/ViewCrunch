import { Publish } from "/";
import { connect } from "react-redux";
import { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { imageObject } from "@utils/clientFunctions";
import { isTitleTaken } from "@utils/firestoreFetch";
import validate from "@utils/validator";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "relative",
    margin: theme.spacing(1),
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const PublishContainer = (props) => {
  const classes = useStyles(),
    scrollRef = useRef(null),
    { profile, retouch = {}, space } = props,
    { enqueueSnackbar } = useSnackbar(),
    [loading, setLoading] = useState(false),
    [preview, setPreview] = useState(false),
    [viewError, setViewError] = useState(false),
    [contentText, setContentText] = useState(""),
    [titleError, setTitleError] = useState(false),
    [title, setTitle] = useState(retouch.title || "fake temporary title"),
    [contentArray, setContentArray] = useState(retouch.contentArray || []),
    [description, setDescription] = useState("View Description goes here");
  const [keywords, setKeywords] = useState("Keywords separated by comma");

  const formerImagesUrl = retouch.contentArray
    ?.filter((x) => typeof x === "object")
    .map(({ image }) => image)
    .join(" ")
    ?.match(/\bhttps?:\/\/\S+/gi);

  const titleErrorHandler = async (value) => {
    const title = validate("text", value) || " ";
    setTitleError(title.length < 13 || title.length > 200 || title.split(" ").length < 3 || title.split(" ").length > 50);
    const titleTaken = await isTitleTaken(title);
    if (titleTaken) {
      setTitleError(true);
      enqueueSnackbar(`Duplicate title`, { variant: "error" });
    }
  };

  const previewHandler = async () => {
    setLoading(true);
    const fullArticleWord = [contentText];
    const fullArticleImage = [];
    contentArray.forEach((x) => {
      if (typeof x === "string") return fullArticleWord.push(x.replace(/\s+/g, " "));
      if (typeof x === "object") return fullArticleImage.push(x);
    });
    if (titleError) {
      setViewError(true);
      enqueueSnackbar(`Title error`, { variant: "error" });
    } else if (
      !(
        (fullArticleWord?.join(" ")?.split(" ")?.length >= 100 &&
          fullArticleWord?.join(" ")?.split(" ")?.length <= 10000 &&
          fullArticleWord.join(" ").length >= 1000 &&
          fullArticleWord.join(" ").length <= 1000000) ||
        (fullArticleImage?.length >= 10 && fullArticleImage?.length <= 30)
      )
    ) {
      setViewError(true);
      enqueueSnackbar(`Article should have at least 100 words or 10 images and at most 10,000 words or 30MB`, { variant: "error" });
    } else if (!validate("text", description)) {
      setViewError(true);
      enqueueSnackbar(`Description should contain only text, and must be less than 180 characters`, { variant: "error" });
    } else {
      setPreview(true);
    }
    setViewError(false);
    setLoading(false);
  };

  const formatContentArray = () => {
    const newContentArray = [];
    [...contentArray]?.forEach((value, index, loopArr) => {
      if (typeof value === "object") {
        newContentArray.push(value);
      } else {
        if (typeof newContentArray[newContentArray.length - 1] === "object" || index === 0) {
          newContentArray.push(value);
        } else {
          newContentArray[newContentArray.length - 1] = `${newContentArray[newContentArray.length - 1]}\n${value}`;
        }
      }
    });
    () => setContentArray(newContentArray);
    return newContentArray;
  };

  const imageHandler = async (e) => {
    const contentImagesArray = e.target.files;
    const contentImages = [];
    if (contentImagesArray?.length) {
      for (const image of contentImagesArray) {
        contentImages.push({ image: await imageObject(image) });
      }
      if (contentText) {
        contentArray?.length
          ? setContentArray([...contentArray, contentText, ...contentImages])
          : setContentArray([contentText, ...contentImages]);
        setContentText("");
      } else {
        contentArray?.length ? setContentArray([...contentArray, ...contentImages]) : setContentArray([...contentImages]);
      }
    }
  };

  const scroll2Ref = (block) => scrollRef.current.scrollIntoView({ behavior: "smooth", block });

  return (
    <Publish
      {...{
        title,
        profile,
        classes,
        loading,
        preview,
        setTitle,
        viewError,
        scrollRef,
        setPreview,
        scroll2Ref,
        titleError,
        contentText,
        description,
        imageHandler,
        contentArray,
        setDescription,
        setContentText,
        previewHandler,
        setContentArray,
        formerImagesUrl,
        titleErrorHandler,
        formatContentArray,
        keywords,
        space,
      }}
    />
  );
};

const mapStateToProps = (state) => ({
    profile: state?.profile,
    online: state?.device?.online,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PublishContainer);
