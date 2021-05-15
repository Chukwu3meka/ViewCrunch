import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import Grid from "@material-ui/core/Grid";
import { Story, StoryNav, styles } from "/";
import { SocialShare } from "@component/others";
import { fetcher } from "@utils/clientFunctions";
import { useEffect, useRef, useState } from "react";

const StoryContainer = (props) => {
  const scrollRef = useRef(null),
    { view, profile, advert } = props,
    { enqueueSnackbar } = useSnackbar(),
    [online, setOnline] = useState(props.online),
    [reportView, setReportView] = useState(false),
    [moreActions, setMoreActions] = useState(false),
    [totalUpvote, setTotalUpvote] = useState(view.upvote),
    [upvoted, setUpvoted] = useState(!!view.upvote.includes(profile?.myHandle)),
    [viewInFavourite, setViewInFavourite] = useState(view.viewer.viewInFavourite),
    [viewInBlacklist, setViewInBlacklist] = useState(view.viewer.viewInBlacklist),
    [downvoted, setDownvoted] = useState(!!view.downvote.includes(profile?.myHandle));

  useEffect(() => {
    setOnline(props.online);
  }, [props.online]);

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const reportHandler = async (report) => {
    const status = await fetcher(
      "/api/crunch/report",
      JSON.stringify({ myHandle: profile.myHandle, id: view.id, report, section: "view" })
    );
    enqueueSnackbar(status ? "success" : "failed", { variant: status ? "success" : "error" });
    setReportView(false);
  };

  const favouriteHandler = async () => {
    const mode = !viewInFavourite;
    const status = await fetcher("/api/crunch/favourite", JSON.stringify({ view: view.id, myHandle: profile.myHandle, mode }));
    enqueueSnackbar(status ? "success" : "failed", { variant: status ? "success" : "error" });
    setViewInFavourite(status);
  };

  const blacklistHandler = async () => {
    const mode = !viewInBlacklist;
    const status = await fetcher("/api/crunch/blacklist", JSON.stringify({ view: view.id, myHandle: profile.myHandle, mode }));
    enqueueSnackbar(status ? "success" : "failed", { variant: status ? "success" : "error" });
    setViewInBlacklist(status);
  };

  const moreActionsHandler = () => {
    if (online) {
      setMoreActions([
        { label: viewInBlacklist ? "Whitelist" : "Blacklist", handler: blacklistHandler },
        { label: viewInFavourite ? "Remove from favourite" : "Add to favourite", handler: favouriteHandler },
        { label: "Report view to Moderators and ViewCrunch", handler: () => setReportView(true) },
        {
          jsx: (
            <SocialShare
              share
              {...{
                viewHref: `/${view?.author}/${view.id}`,
                title: view?.title,
                author: view?.author,
              }}
            />
          ),
        },
      ]);
    } else {
      enqueueSnackbar(`No network connection`, { variant: "warning" });
    }
  };

  const voteHandler = (vote) => async () => {
    const status = await fetcher("/api/crunch/voteView", JSON.stringify({ viewId: view.id, myHandle: profile.myHandle, vote }));

    if (status) {
      if (vote) {
        setTotalUpvote(
          totalUpvote.includes(profile?.myHandle)
            ? totalUpvote.filter((x) => x !== profile?.myHandle)
            : [...totalUpvote, profile?.myHandle]
        );
        setUpvoted(!upvoted);
        setDownvoted(false);
      } else {
        setDownvoted(!downvoted);
        setUpvoted(false);
      }
    } else {
      enqueueSnackbar("Network Connectivity issue", { variant: status ? "success" : "warning" });
    }
  };

  return (
    <Grid container spacing={2} className={styles.story}>
      <span ref={scrollRef} />
      <Story
        {...{
          ...view,
          profile,
          moreActionsHandler,
          online,
          moreActions,
          setMoreActions,
          reportHandler,
          totalUpvote,
          reportView,
          setReportView,
          voteHandler,
          upvoted,
          downvoted,
        }}
      />
      <StoryNav {...{ ...view.author, ...view.post, advert, profile }} />
    </Grid>
  );
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    online: state?.device?.online,
    deviceWidth: state.device?.deviceWidth,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(StoryContainer);
