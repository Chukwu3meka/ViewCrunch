import dynamic from "next/dynamic";

import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import validate from "@utils/validator";

import { Crunches } from "/";
import { chunkArray } from "@utils/clientFunctions";
import { fetcher, trimString } from "@utils/clientFunctions";

const SocialShare = dynamic(() => import("@component/others/SocialShare"));

const ViewscapeContainer = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const {
      crunches: propsActiveViewscape,
      myFollowing,
      author: { handle, myHandle, myRefresh },
    } = props,
    [online, setOnline] = useState(props.online),
    [deviceWidth, setDeviceWidth] = useState(props.deviceWidth),
    [forceRefresh, setForceRefresh] = useState(0),
    [moreActions, setMoreActions] = useState(false),
    [viewscapeData, setViewscapeData] = useState({}),
    [displayShare, setDisplayShare] = useState(false),
    [displayReport, setDisplayReport] = useState(false),
    [displayMembers, setDisplayMembers] = useState(false),
    [confirmUnfollow, setConfirmUnfollow] = useState(false),
    [activeCrunch, setActiveCrunch] = useState({}),
    [activeViewscape, setActiveViewscape] = useState(propsActiveViewscape),
    activeViewscapeChunk = chunkArray({ array: activeViewscape, chunkSize: Math.ceil(activeViewscape.length / deviceWidth) });

  useEffect(() => {
    setOnline(props.online);
  }, [props.online]);

  useEffect(() => {
    setDeviceWidth(props.deviceWidth);
  }, [props.deviceWidth]);

  const cancelHandler = () => {
    setActiveCrunch({});
    setDisplayReport(false);
    setConfirmUnfollow(false);
  };

  const activeCrunchHandler = ({ id, title, moderators, followers, more }) => () => {
    if (more) {
      setActiveCrunch({
        title,
        list: [
          {
            label: `Report ${title} Crunch`,
            handler: () => {
              setDisplayReport(true);
              setViewscapeData({ id, title, moderators });
            },
          },
          { label: `Subscribers`, handler: () => setDisplayMembers("followers") },
          { label: "Admin and Moderators", handler: () => setDisplayMembers("moderators") },
          { jsx: <SocialShare crunch={id} />, handler: "link" },
        ],
        id,
        title,
        followers,
        moderators,
        myFollowing,
      });
      setMoreActions(true);
    } else {
      enqueueSnackbar(`Currently disabled`, { variant: "info" });
      // setActiveCrunch({ id, title, moderators, followers });
      // if ("universal" === id) return enqueueSnackbar(`You can't unfollow Universal crunch`, { variant: "warning" });
      // setConfirmUnfollow(true);
    }
  };

  const unfollowHandler = async () => {
    if (myHandle && myRefresh && online) {
      const status = await fetcher(
        "/api/crunch/followCrunch",
        JSON.stringify({ title: activeCrunch.title, myHandle, myRefresh, follow: false })
      );
      if (status) {
        setActiveViewscape(activeViewscape.filter((x) => x.id !== activeCrunch.id));
      } else {
        enqueueSnackbar(`Please, Try again. Server unable to handle request.`, { variant: "error" });
      }
    } else {
      enqueueSnackbar(`Network connectivity issue.`, { variant: "info" });
    }
    setActiveCrunch(false);
  };

  const reportHandler = async (feedback) => {
    const validated = validate("text", feedback);
    if (validated) {
      const status = await fetcher(
        "/api/crunch/reportCrunch",
        JSON.stringify({ report: validated, id: activeCrunch.id, myHandle, myRefresh })
      );
      if (status) {
        enqueueSnackbar(`We'll review your report`, { variant: "success" });
      } else {
        enqueueSnackbar(`Unable to reach server`, { variant: "error" });
      }
    } else {
      enqueueSnackbar(
        `Unable to validate report. Please, make sure you have a stable connection and your report did not exceed 200 characters, and include only alphabet`,
        { variant: "warning" }
      );
    }
    // if (token && online) {
    //   if (status === "success") {
    //   } else {
    //     enqueueSnackbar(`Please, Try again. Error occured.`, { variant: "error" });
    //   }
    // } else {
    //   enqueueSnackbar(`Network connectivity issue.`, { variant: "warning" });
    // }
    // cancelHandler();
  };

  return (
    <Crunches
      {...{
        activeCrunchHandler,
        activeCrunch,
        setActiveCrunch,
        activeViewscape,
        confirmUnfollow,
        unfollowHandler,
        viewscapeData,
        cancelHandler,
        reportHandler,
        handle,
        moreActions,
        setMoreActions,
        forceRefresh,
        setConfirmUnfollow,
        displayMembers,
        setDisplayMembers,
        setDisplayShare,
        displayShare,
        enqueueSnackbar,
        setDisplayReport,
        displayReport,
        activeViewscapeChunk,
      }}
    />
  );
};

const mapStateToProps = (state) => ({
    author: state?.profile,
    online: state?.device?.online,
    deviceWidth: state.device?.deviceWidth,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ViewscapeContainer);
