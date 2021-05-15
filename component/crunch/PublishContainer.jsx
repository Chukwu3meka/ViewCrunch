import { Publish } from "/";
import { useState, useRef } from "react";
import { useSnackbar } from "notistack";
import validate from "@utils/validator";
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
    { viewToBeModified = {}, crunch, published } = props,
    [title, setTitle] = useState(viewToBeModified.title || ""),
    [keywords, setKeywords] = useState(viewToBeModified.keywords || ""),
    [contentArray, setContentArray] = useState(viewToBeModified.content || []),
    [description, setDescription] = useState(viewToBeModified.description || "");

  const titleHandler = (value) => {
    const error1 =
        "Title can only have letters and special characters such as '-', ':' '(' and ')'. Also make sure title is within the range of 3 to 20 words and 13 to 150 characters",
      error2 = "You already have a view with the same title",
      errorHandler = (errorNo) => {
        enqueueSnackbar(errorNo, { variant: "error" });
        return true;
      };

    if (!viewToBeModified.title) {
      setTitle(value);
      if (!validate("title", value)) return errorHandler(error1);
      if (published.includes(value)) return errorHandler(error2);
    } else {
      enqueueSnackbar("Title cannot be modified when retouching view", { variant: "error" });
    }
    return false;
  };

  const descriptionHandler = (value) => {
    setDescription(value);
    if (!validate("description", value)) {
      enqueueSnackbar("Description can only contain 50 to 200 letters and special characters  '-', ':', '(', ')', ',', and ';'", {
        variant: "error",
      });
      return true;
    }
    return false;
  };

  const keywordsHandler = (value) => {
    setKeywords(value);
    if (!validate("keywords", value)) {
      enqueueSnackbar("Keywords used in view separated by comma. eg 'gadets, phones, ball, schools'", { variant: "error" });
      return true;
    }
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

    // if (
    //   !(
    //     (fullArticleWord?.join(" ")?.split(" ")?.length >= 100 &&
    //       fullArticleWord?.join(" ")?.split(" ")?.length <= 10000 &&
    //       fullArticleWord.join(" ").length >= 1000 &&
    //       fullArticleWord.join(" ").length <= 1000000) ||
    //     (fullArticleImage?.length >= 10 && fullArticleImage?.length <= 30)
    //   )
    // )
    //   return enqueueSnackbar(`Article should have at least 100 words or 10 images and at most 10,000 words or 30MB`, {
    //     variant: "error",
    //   });

    // if (titleHandler(title) || descriptionHandler(description) || keywordsHandler(keywords)) return;

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
        keywordsHandler,
      }}
    />
  );
};

export default PublishContainer;
