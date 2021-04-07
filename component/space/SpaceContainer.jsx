import { FixedIcon } from "@component/others";
import { connect } from "react-redux";
import Link from "next/link";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { shortNumber } from "@utils/clientFunctions";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { LineText } from "@component/others";
import { SocialShare } from "@component/others";
import { styles } from "/";
import { fetcher, trimString } from "@utils/clientFunctions";
import Grid from "@material-ui/core/Grid";
import { Dialog, Drawer } from "@component/others";
import { MembersContainer } from "/";
import { SecBodyContainer } from "@component/homePage";
import { Space } from "/";

const ViewscapeContainer = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const {
      spaceDetails,
      views,
      space,
      myFollowing,
      author: { handle, token },
    } = props,
    [online, setOnline] = useState(props.online),
    [forceRefresh, setForceRefresh] = useState(0),
    [moreActions, setMoreActions] = useState(false),
    [displayShare, setDisplayShare] = useState(false),
    [displayReport, setDisplayReport] = useState(false),
    [displayMembers, setDisplayMembers] = useState(false),
    [follow, setFollow] = useState(spaceDetails?.followers?.includes(handle)),
    [confirmUnfollow, setConfirmUnfollow] = useState(false);

  useEffect(() => {
    setOnline(props.online);
  }, [props.online]);

  const { about, coverPicture, dateCreated, followers, id, members, moderators, primaryPicture, title } = spaceDetails;

  const closeDialog = () => {
    setDisplayReport(false);
    setConfirmUnfollow(false);
  };

  const unfollowConfirmationHandler = () => {
    if (["lifehack", "career-101", "justnow"].includes(id)) return enqueueSnackbar(`You can't unfollow ${title}`, { variant: "error" });
    setConfirmUnfollow(true);
  };

  const unfollowHandler = async () => {
    if (token && online) {
      const { status, followStat } = await fetcher("/api/space/unfollowViewscape", JSON.stringify({ id, token, follow }));

      if (status === "success") {
        setFollow(followStat ? true : false);
        enqueueSnackbar(`Successful.`, { variant: "primary" });
      } else {
        enqueueSnackbar(`Please, Try again. Server unable to handle request.`, { variant: "error" });
      }
    } else {
      enqueueSnackbar(`Network connectivity issue.`, { variant: "warning" });
    }
    closeDialog();
  };

  const reportHandler = async (feedback) => {
    if (token && online) {
      const { status } = await fetcher("/api/space/reportViewscape", JSON.stringify({ id, token, feedback }));
      if (status === "success") {
        enqueueSnackbar(`Suit filed against ${title}`, { variant: "success" });
      } else {
        enqueueSnackbar(`Please, Try again. Error occured.`, { variant: "error" });
      }
    } else {
      enqueueSnackbar(`Network connectivity issue.`, { variant: "warning" });
    }
    closeDialog();
  };

  const moreActionsHandler = () => {
    setForceRefresh(Math.random() * 1000);
    setMoreActions(spaceDetails);
  };

  return (
    <Space
      {...{
        displayShare,
        moreActions,
        setDisplayShare,
        displayMembers,
        setDisplayMembers,
        closeDialog,
        title,
        reportHandler,
        displayReport,
        setDisplayReport,
        forceRefresh,
        id,
        about,
        views,
        unfollowHandler,
        confirmUnfollow,
        moreActionsHandler,
        unfollowConfirmationHandler,
        coverPicture,
        primaryPicture,
        members,
        dateCreated,
        space,
      }}
    />
  );
};

const mapStateToProps = (state) => ({
    author: state?.profile,
    online: state?.device?.online,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ViewscapeContainer);
