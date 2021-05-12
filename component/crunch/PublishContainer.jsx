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
  const { viewToBeModified = {}, crunch, published } = props,
    classes = useStyles(),
    scrollRef = useRef(null),
    { enqueueSnackbar } = useSnackbar(),
    [loading, setLoading] = useState(false),
    [preview, setPreview] = useState(false),
    [contentText, setContentText] = useState(""),
    [titleError, setTitleError] = useState(false),
    [keywordsError, setKeywordsError] = useState(false),
    [descriptionError, setDescriptionError] = useState(false),
    [title, setTitle] = useState(viewToBeModified.title || "Title of view"),
    [contentArray, setContentArray] = useState(viewToBeModified.content || []),
    [description, setDescription] = useState(
      viewToBeModified.description ||
        "Describe what view is about, and how it should appear in search engines. Description should be between 50 to 200 letters "
    ),
    [keywords, setKeywords] = useState(
      viewToBeModified.keywords || "All Keywords used in view separated by comma. Characters should be within 4 to 110"
    );

  const titleHandler = async (value) => {
    if (!viewToBeModified.title) {
      setTitle(value);
      setTitleError(!validate("title", value));
      if (title === "Title of view") setTitleError(true);
      if (published.includes(title)) {
        setTitleError(true);
        enqueueSnackbar(`Duplicate title`, { variant: "error" });
      }
    } else {
      enqueueSnackbar(`Title cannot be changed`, { variant: "warning" });
    }
  };

  const descriptionHandler = async (value) => {
    setDescription(value);
    setDescriptionError(!validate("description", value));
  };

  const keywordsHandler = async (value) => {
    setKeywords(value);
    setKeywordsError(!validate("keywords", value));
  };

  const previewHandler = async () => {
    setLoading(true);
    const fullArticleWord = [contentText];
    const fullArticleImage = [];
    contentArray.forEach((x) => {
      if (typeof x === "string") return fullArticleWord.push(x.replace(/\s+/g, " "));
      if (typeof x === "object") return fullArticleImage.push(x);
    });

    let viewError = false;

    const viewErrorHandler = (error) => {
      viewError = true;
      enqueueSnackbar(error, { variant: "error" });
    };

    // if (!title?.length && titleError)
    //   viewErrorHandler(
    //     "Make sure title is not taken and within the range of 3 to 20 words, 13 to 150 letters and special characters [ - : ( ) ]."
    //   );
    // if (!description?.length || descriptionError || description.includes("Describe what view is about"))
    //   viewErrorHandler("Description can only contain 50 to 200 letters and special characters [ - : ( ) , ; ].");
    // if (!keywords?.length || keywordsError || keywords.includes("Keywords used in view separated by comma"))
    //   viewErrorHandler("Keywords can only contain letters within 4 to 100 characters separated by comma and special characters [ , ].");
    // if (
    //   !(
    //     (fullArticleWord?.join(" ")?.split(" ")?.length >= 100 &&
    //       fullArticleWord?.join(" ")?.split(" ")?.length <= 10000 &&
    //       fullArticleWord.join(" ").length >= 1000 &&
    //       fullArticleWord.join(" ").length <= 1000000) ||
    //     (fullArticleImage?.length >= 10 && fullArticleImage?.length <= 30)
    //   )
    // )
    //   viewErrorHandler(`Article should have at least 100 words or 10 images and at most 10,000 words or 30MB`);

    await sleep(1);
    setLoading(false);
    if (!viewError) setPreview(true);
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
        titleError,
        contentText,
        description,
        imageHandler,
        contentArray,
        setContentText,
        descriptionError,
        previewHandler,
        setContentArray,
        viewToBeModified,
        titleHandler,
        descriptionHandler,
        formatContentArray,
        keywords,
        crunch,
        keywordsError,
        keywordsHandler,
      }}
    />
  );
};

export default PublishContainer;
