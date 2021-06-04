import { Publish } from "/";
import { useSnackbar } from "notistack";
import validate from "@utils/validator";
import { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { imageObject, sleep } from "@utils/clientFunctions";

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
  const { enqueueSnackbar } = useSnackbar(),
    classes = useStyles(),
    scrollRef = useRef(null),
    [loading, setLoading] = useState(false),
    [preview, setPreview] = useState(false),
    [contentText, setContentText] = useState(""),
    { viewToBeModified = {}, crunch, published, moderator } = props,
    [title, setTitle] = useState(viewToBeModified.title || ""),
    [keywords, setKeywords] = useState(viewToBeModified.keywords || ""),
    [contentArray, setContentArray] = useState(viewToBeModified.content || []),
    [description, setDescription] = useState(viewToBeModified.description || "");

  const titleHandler = (value) => {
    const error1 = "Title should be within the range of 3 to 20 words and 13 to 150 characters at most",
      error2 = "Title can only have letters and special characters such as '-', ':', '(' and ')'",
      error3 = "You already have a view with the same title",
      errorHandler = (errorNo) => {
        enqueueSnackbar(errorNo, { variant: "error" });
        return true;
      };

    if (!viewToBeModified.title) {
      setTitle(value);

      if (value.length < 13 || value.length > 150 || value.split(" ").length < 3 || value.split(" ").length > 20)
        return errorHandler(error1);
      if (!validate("title", value)) return errorHandler(error2);
      if (published.includes(value)) return errorHandler(error3);
    } else {
      enqueueSnackbar("Title cannot be modified when retouching view", { variant: "error" });
    }
    return false;
  };

  const descriptionHandler = (value) => {
    const error1 = "Description can have between 50 to 200 letters",
      error2 = "Description must be between 3 - 70 words",
      error3 =
        "Invalid characters; Only Letters, Numbers and special characters like '-', ':', '(', ')', ',', ''', '?',  and ';' are valid",
      errorHandler = (errorNo) => {
        enqueueSnackbar(errorNo, { variant: "error" });
        return true;
      };

    setDescription(value);
    if (value.length < 50 || value.length > 213) return errorHandler(error1);
    if (value.split(" ").length < 3 || value.split(" ").length > 70) return errorHandler(error2);
    if (!validate("description", value)) return errorHandler(error3);

    return false;
  };

  const keywordsHandler = (value) => {
    const error1 = "Keywords can only contain 3 to 100 letters",
      error2 = "Keywords must be between 1 - 5 words seapareted by comma",
      error3 = "only ',' and Alphanumeric characters allowed. Example: 'Gadets 2018, Smart Phones, ball, schools'",
      errorHandler = (errorNo) => {
        enqueueSnackbar(errorNo, { variant: "error" });
        return true;
      };

    setKeywords(value);
    if (value.length < 3 || value.length > 100) return errorHandler(error1);
    if (value.split(",").length < 1 || value.split(",").length > 5) return errorHandler(error2);
    if (!validate("keywords", value)) return errorHandler(error3);
    return false;
  };

  const previewHandler = async () => {
    setLoading(true);
    setPreview(false);
    const fullArticleImage = [],
      fullArticleWord = [contentText];
    contentArray.forEach((x) => {
      if (typeof x === "string") return fullArticleWord.push(x.replace(/\s+/g, " "));
      if (typeof x === "object") return fullArticleImage.push(x);
    });

    await sleep(1.5);
    setLoading(false);

    if (
      !(
        (fullArticleWord?.join(" ")?.split(" ")?.length >= 100 &&
          fullArticleWord?.join(" ")?.split(" ")?.length <= 10000 &&
          fullArticleWord.join(" ").length >= 1000 &&
          fullArticleWord.join(" ").length <= 1000000) ||
        (fullArticleImage?.length >= 10 && fullArticleImage?.length <= 30)
      )
    )
      return enqueueSnackbar(`Article should have at least 100 words or 10 images and at most 10,000 words or 30MB`, {
        variant: "error",
      });

    if (titleHandler(title) || descriptionHandler(description) || keywordsHandler(keywords)) return;

    setPreview(true);
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
        classes,
        loading,
        preview,
        scrollRef,
        setPreview,
        scroll2Ref,
        contentText,
        description,
        imageHandler,
        contentArray,
        setContentText,
        previewHandler,
        setContentArray,
        viewToBeModified,
        titleHandler,
        descriptionHandler,
        formatContentArray,
        keywords,
        crunch,
        moderator,
        keywordsHandler,
      }}
    />
  );
};

export default PublishContainer;
