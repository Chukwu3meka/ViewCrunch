import { Preview } from "/";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { fetcher } from "@utils/clientFunctions";
import { useSnackbar } from "notistack";

const PreviewContainer = ({ setPreview, content, title, profile, articleId, formerImagesUrl, description, keywords, space }) => {
  const scrollRef = useRef(null);

  const router = useRouter(),
    [forceRefresh, setForceRefresh] = useState(0),
    [publishFailed, setPublishFailed] = useState(false),
    { enqueueSnackbar } = useSnackbar(),
    [publishing, setPublishing] = useState(false);

  const [scrollPosition, setScrollPosition] = useState(true);

  const view = content
    .map((x) => {
      if (typeof x === "string") return x;
      if (typeof x === "object") return `<Image src='${x.image}' alt='${title}' />`;
    })
    .flat(Infinity)
    .join("");

  const publishHandler = async () => {
    if (profile.myRefresh && profile.myHandle && title && content?.length) {
      enqueueSnackbar("Please wait, Your view is being published", { variant: "info" });

      const publishStatus = await fetcher(
        articleId ? "/api/space/retouchView" : "/api/space/publishView",
        JSON.stringify({ description, profile, title, content, keywords, space })
      );

      console.log("publishHandler", publishStatus);

      if (publishStatus) {
        enqueueSnackbar(`Succesful`, { variant: "success" });
        //       router.push(`/${publishStatus}`);
      } else {
        enqueueSnackbar("Unable to publish view now; make sure you're connected and try again.", { variant: "error" });
      }
    }
    setPublishing(false);
  };

  return (
    <Preview
      {...{
        setPreview,
        title,
        view,
        setPublishing,
        profile,
        publishFailed,
        forceRefresh,
        publishing,
        articleId,
        description,
        scrollRef,
        scrollPosition,
        setScrollPosition,
        publishHandler,
      }}
    />
  );
};

export default PreviewContainer;
