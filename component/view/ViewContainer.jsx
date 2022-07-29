import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import Grid from "@mui/material/Grid";
import { View, ViewNav, styles } from "/";
import { SocialShare } from "@component/others";
import { fetcher } from "@utils/clientFunctions";
import { useEffect, useRef, useState } from "react";

import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import BlacklistIcon from "@mui/icons-material/VisibilityOff";
import BookmarkIcon from "@mui/icons-material/BookmarkAddRounded";
import ReportIcon from "@mui/icons-material/FlagRounded";
import { Footer } from "@component/layout";

const StoryContainer = (props) => {
  const { view, author, url, viewID } = props,
    scrollRef = useRef(null),
    [mobile, setMobile] = useState(true),
    { enqueueSnackbar } = useSnackbar(),
    [online, setOnline] = useState(props.online),
    [reportView, setReportView] = useState(false),
    [profile, setProfile] = useState({}),
    { myHandle, myID, myDisplayName } = profile,
    [moreActions, setMoreActions] = useState(false),
    [votes, setVotes] = useState(view.votes.total),
    [viewInFavourite, setViewInFavourite] = useState(view.viewInFavourite),
    [viewInBlacklist, setViewInBlacklist] = useState(view.viewInBlacklist),
    [upvoted, setUpvoted] = useState(false),
    [report, setReport] = useState(false),
    [downvoted, setDownvoted] = useState(false);

  useEffect(() => {
    setOnline(props.online);
  }, [props.online]);

  useEffect(() => {
    setProfile(props.profile);
    setUpvoted(view.votes.upvote.includes(props.profile.myID));
    setDownvoted(view.votes.downvote.includes(props.profile.myID));
  }, [props.profile]);

  useEffect(() => {
    setMobile(props.deviceWidth < 900 ? true : false);
  }, [props.deviceWidth]);

  const reportHandler = async (report) => {
    const reprtSent = await fetcher("/api/report/reportView", { myID: profile.myID, viewID, report });

    if (reprtSent) enqueueSnackbar("Report sent successfully, We'll get back to you soon", { variant: "success" });
  };

  const actionsHandler = async (name) => {
    try {


      if (name ===  "share") {
        if (navigator) navigator.share({ title: view.title, text: view.description, url });
        break;
      }


      // case "share": {
      //   if (navigator) navigator.share({ title: view.title, text: view.description, url });
      //   break;
      // }



      if (!online) return enqueueSnackbar("You're not Connected to the internet", { variant: "warning" });
      if (!profile.myID) return enqueueSnackbar("Kindly signin at bottom of the page", { variant: "warning" });

      switch (name) {
        case "blacklist": {
          if (author.author === profile.myID) return enqueueSnackbar(`You can't blacklist yourself`, { variant: "error" });

          const blacklisted = await fetcher("/api/profile/blacklist", { myID: profile.myID, author: author.author });

          enqueueSnackbar(
            `${author.displayName}, has been ${blacklisted ? "added to" : "removed from"} blacklist. ${
              blacklisted ? `You won't see views, published by ${author.displayName}` : ""
            }`,
            { variant: "success" }
          );

          break;
        }

        case "bookmark": {
          const bookmarked = await fetcher("/api/profile/bookmark", { myID: profile.myID, viewID });

          enqueueSnackbar(`${view.title}, has been ${bookmarked ? "added to" : "removed from"} bookmark.`, { variant: "success" });

          break;
        }

        case "report": {
          if (author.author === profile.myID) return enqueueSnackbar(`You can't report a view written by you`, { variant: "error" });

          setReport(true);
        }

        default:
          throw "No action specified";
      }
    } catch (error) {
      process.env.NODE_ENV !== "production" && console.log(error);
    }
  };

  const actions = [
    { icon: <BlacklistIcon />, name: "Blacklist", handler: () => actionsHandler("blacklist") },
    { icon: <BookmarkIcon />, name: "Bookmark", handler: () => actionsHandler("bookmark") },
    { icon: <ReportIcon />, name: "Report", handler: () => actionsHandler("report") },
    { icon: <ShareIcon />, name: "Share", handler: () => actionsHandler("share") },
  ];

  const voteHandler = (vote) => async () => {
    if (online) {
      if (profile.myID) {
        if (vote) {
          if (!upvoted) setVotes(upvoted ? votes + 1 : votes);
          setUpvoted(!upvoted);
          setDownvoted(false);
        } else {
          setDownvoted(!downvoted);
          if (upvoted) setUpvoted(false);
        }

        const res = await fetcher("/api/view/voteView", { myID: profile.myID, vote, viewID });

        if (res) {
          const { downvoted, total, upvoted } = res;
          setVotes(total);
          setUpvoted(upvoted);
          setDownvoted(downvoted);
        }
      } else {
        enqueueSnackbar("Kindly signin at bottom of the page", { variant: "warning" });
      }
    } else {
      enqueueSnackbar("You're not Connected to the internet", { variant: "warning" });
    }
  };

  return (
    <Grid container style={{ maxWidth: "1200px", margin: "auto" }}>
      <ViewNav {...{ ...author, myDisplayName: profile.myDisplayName, mobile }} />
      <Grid item xs={12} sm={12} md={8}>
        <View
          {...{
            profile,
            ...view,
            ...author,
            votes,
            voteHandler,
            moreActions,
            setMoreActions,
            // shareHandler,
            actions,
            upvoted,
            downvoted,
            report,
            setReport,
            reportHandler,
          }}
        />
        <Footer />
      </Grid>
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
