import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import Grid from "@mui/material/Grid";
import { View, ViewNav, styles } from "/";
import { SocialShare } from "@component/others";
import { fetcher } from "@utils/clientFunctions";
import { useEffect, useRef, useState } from "react";

const StoryContainer = (props) => {
  const scrollRef = useRef(null),
    [mobile, setMobile] = useState(),
    { view, profile, author } = props,
    { enqueueSnackbar } = useSnackbar(),
    [online, setOnline] = useState(props.online),
    [reportView, setReportView] = useState(false),
    { myHandle, myID, myDisplayName } = profile,
    [moreActions, setMoreActions] = useState(false),
    [votes, setVotes] = useState(view.votes.total),
    [viewInFavourite, setViewInFavourite] = useState(view.viewInFavourite),
    [viewInBlacklist, setViewInBlacklist] = useState(view.viewInBlacklist),
    [upvoted, setUpvoted] = useState(!!view.votes.upvote.includes(myID)),
    [downvoted, setDownvoted] = useState(!!view.votes.downvote.includes(myID));

  // console.log({ v: view.votes.total });

  useEffect(() => {
    setOnline(props.online);
  }, [props.online]);

  useEffect(() => {
    setMobile(props.deviceWidth < 900 ? true : false);
  }, [props.deviceWidth]);

  console.log(author);

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
    // enqueueSnackbar("Please wait");
    // if (online && profile.myHandle) {
    //   const { status, newTotalUpvote } = await fetcher(
    //     "/api/crunch/voteView",
    //     JSON.stringify({ viewId: view.id, myHandle: profile.myHandle, vote, author: view?.author?.author })
    //   );
    //   if (status) {
    //     if (vote) {
    //       setTotalUpvote(newTotalUpvote);
    //       // totalUpvote.includes(profile?.myHandle)
    //       //   ? totalUpvote.filter((x) => x !== profile?.myHandle)
    //       //   : [...totalUpvote, profile?.myHandle]
    //       setUpvoted(!upvoted);
    //       setDownvoted(false);
    //     } else {
    //       setDownvoted(!downvoted);
    //       setUpvoted(false);
    //     }
    //   } else {
    //     enqueueSnackbar("Error occured", { variant: "warning" });
    //   }
    // } else {
    //   enqueueSnackbar("Network or Authentication error", { variant: "warning" });
    // }
  };

  return (
    <Grid container style={{ maxWidth: "1200px", margin: "auto" }}>
      <ViewNav {...{ ...author, myDisplayName, mobile }} />
      <Grid item xs={12} sm={12} md={8}>
        <View
          {...{
            profile,
            ...view,
            ...author,
            votes,
            voteHandler,
          }}
        />
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
