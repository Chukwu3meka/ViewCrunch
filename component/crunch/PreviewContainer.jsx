import { Preview } from "/";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { fetcher } from "@utils/clientFunctions";
import { useState, useEffect, useRef } from "react";

const PreviewContainer = (props) => {
  const { setPreview, content, title, articleId, oldContent, description, keywords, crunch, profile, moderator } = props,
    router = useRouter(),
    scrollRef = useRef(null),
    { enqueueSnackbar } = useSnackbar(),
    [online, setOnline] = useState(props.online),
    [publishing, setPublishing] = useState(false),
    [scrollPosition, setScrollPosition] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setOnline(props.online);
    }
    () => (mounted = false);
  }, [props.online]);

  const view = content
    .map((x) => {
      if (typeof x === "string") return x;
      if (typeof x === "object") return `<Image src='${x.image}' alt='${title}' layout="fill" />`;
    })
    .flat(Infinity)
    .join("");

  const publishHandler = async () => {
    if (publishing) {
      enqueueSnackbar("Please wait, Your view is being published", { variant: "info" });
    } else {
      setPublishing(true);

      if (profile.myHandle && title && content?.length && online) {
        enqueueSnackbar("Please wait, Your view is being published", { variant: "info" });

        const { link } = await fetcher(
          oldContent ? "/api/crunch/retouchView" : "/api/crunch/publishView",
          JSON.stringify({ description, profile, title, content, keywords, crunch, moderator, oldContent: oldContent || false })
        );

        if (link) {
          enqueueSnackbar(`${oldContent ? "Modified" : "Published"} succesfully`, { variant: "success" });
          setPublishing(false);
          router.push(link);
        } else {
          setPublishing(false);
          enqueueSnackbar("Unable to publish view now; make sure you're connected and try again.", { variant: "error" });
        }
      } else {
        enqueueSnackbar("Make sure you're connected and logged in, then try again.", { variant: "error" });
        setPublishing(false);
      }
    }
  };

  return (
    <Preview
      {...{
        view,
        title,
        profile,
        articleId,
        scrollRef,
        publishing,
        setPreview,
        description,
        scrollPosition,
        publishHandler,
        setScrollPosition,
      }}
    />
  );
};

const mapStateToProps = (state) => ({
    profile: state?.profile,
    online: state?.device?.online,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewContainer);
