import { Footer } from "@component/layout";
import { imageObject } from "@utils/clientFunctions";
import Joi from "joi";
import { useSnackbar } from "notistack";
import { useState } from "react";

import { PreviewContainer, Publish } from ".";

const PublishContainer = (props) => {
  const [title, setTitle] = useState("");

  const [displayPreview, setDisplayPreview] = useState(false);

  const titleChangeHandler = (e) => setTitle(e.target.value);

  const { viewToBeModified = {}, crunch, published, moderator, crunches, displayName } = props,
    { enqueueSnackbar } = useSnackbar(),
    [loading, setLoading] = useState(false),
    [preview, setPreview] = useState(false),
    [contentText, setContentText] = useState(""),
    // [title, setTitle] = useState(viewToBeModified.title || ""),
    [keywords, setKeywords] = useState(viewToBeModified.keywords || ""),
    [description, setDescription] = useState(viewToBeModified.description || ""),
    [retouchWarning, setRetouchWarning] = useState(viewToBeModified.title ? true : false),
    [contentArray, setContentArray] = useState(viewToBeModified.content ? [viewToBeModified.content] : []);

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
        const imageSplit = image?.name?.split(".");
        if (!["png", "jpg", "jpeg"].includes(imageSplit[imageSplit.length - 1])) return;
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

  const previewHandler = () => {
    setLoading(true);
    // console.log("publish");
    setDisplayPreview(true);
    setLoading(false);
  };

  return (
    <>
      <Publish
        //

        {...{
          // title,
          // crunch,
          // classes,
          // loading,
          // preview,

          // contentArray,contentText,setContentText

          // keywords,
          // scrollRef,
          // moderator,
          // setPreview,
          // scroll2Ref,
          contentText,
          // description,
          imageHandler,
          // titleHandler,
          contentArray,
          // retouchWarning,
          setContentText,
          // previewHandler,
          setContentArray,
          // keywordsHandler,
          // setRetouchWarning,
          previewHandler,
          loading,
          // descriptionHandler,
          formatContentArray,

          setKeywords,
          keywords,

          // oldContent: viewToBeModified.content,
        }}
        titleChangeHandler={titleChangeHandler}
        title={title}
        // content={content}
      />
      <PreviewContainer
        displayPreview={displayPreview}
        setDisplayPreview={setDisplayPreview}
        crunches={crunches}
        displayName={displayName}
        view={{
          title,
          keywords,

          content: [...contentArray, contentText],
        }}
      />
    </>
  );
};

export default PublishContainer;
