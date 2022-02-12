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

  const shareHandler = () => {
    if (navigator) navigator.share({ title: view.title, text: "dfasd", url });
  };

  const actions = [
    { icon: <BlacklistIcon />, name: "Blacklist" },
    { icon: <BookmarkIcon />, name: "Bookmark" },
    { icon: <ReportIcon />, name: "Report" },
    { icon: <ShareIcon />, name: "Share", handler: shareHandler },
  ];

  const reportHandler = async (report) => {
    // if (online && profile.myHandle) {
    //   const status = await fetcher(
    //     "/api/crunch/report",
    //     JSON.stringify({ myHandle: profile.myHandle, id: view.id, report, section: "view" })
    //   );
    //   enqueueSnackbar(status ? "success" : "failed", { variant: status ? "success" : "error" });
    //   setReportView(false);
    // } else {
    //   enqueueSnackbar("Network or Authentication error", { variant: "warning" });
    // }
  };

  const favouriteHandler = async (list, append) => {
    // if (online && profile.myHandle) {
    //   const { status, favourite, blacklist } = await fetcher(
    //     "/api/profile/favourite",
    //     JSON.stringify({ url: view.path, title: view.title, myHandle: profile.myHandle, list, append })
    //   );
    //   if (status) {
    //     setViewInFavourite(favourite.find((x) => x.url === view.path) ? true : false);
    //     setViewInBlacklist(blacklist.find((x) => x.url === view.path) ? true : false);
    //     enqueueSnackbar("Successful", { variant: "success" });
    //   } else {
    //     enqueueSnackbar("Error occured", { variant: "error" });
    //   }
    // } else {
    //   enqueueSnackbar("Network or Authentication error", { variant: "error" });
    // }
  };

  const moreActionsHandler = () => {
    setMoreActions([
      { label: viewInBlacklist ? "Whitelist" : "Blacklist", handler: () => favouriteHandler("blacklist", !viewInBlacklist) },
      {
        label: viewInFavourite ? "Remove from favourite" : "Add to favourite",
        handler: () => favouriteHandler("favourite", !viewInFavourite),
      },
      {
        label: "Report view to Moderators and ViewCrunch",
        handler: () => {
          if (online && profile.myHandle) {
            setReportView(true);
          } else {
            enqueueSnackbar("Network or Authentication error", { variant: "error" });
          }
        },
      },
      {
        jsx: (
          <SocialShare
            share
            {...{
              viewHref: `/${view.id}`,
              title: view?.title,
              author: view?.author?.author,
            }}
          />
        ),
      },
    ]);
  };

  const voteHandler = (vote) => async () => {
    if (online) {
      if (profile.myID) {
        if (vote) {
          // upvote
          if (!upvoted) setVotes(upvoted ? votes + 1 : votes);
          setUpvoted(!upvoted);
          setDownvoted(false);
        } else {
          // downvote
          setDownvoted(!downvoted);
          if (upvoted) setUpvoted(false);
        }

        const res = await fetcher("/api/view/voteView", JSON.stringify({ myID: profile.myID, vote, viewID }));

        if (res) {
          const { downvoted, total, upvoted } = res;
          console.log({ downvoted, total, upvoted });
          setVotes(total);
          setUpvoted(upvoted);
          setDownvoted(downvoted);
        }
      } else {
        enqueueSnackbar("Kindly signin at bottom of the page", { variant: "warning" });
      }
    } else {
      enqueueSnackbar("Network", { variant: "warning" });
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
            shareHandler,
            actions,
            upvoted,
            downvoted,
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
