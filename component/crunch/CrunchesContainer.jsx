import dynamic from "next/dynamic";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import validate from "@utils/validator";
import { useState, useEffect } from "react";
import { fetcher } from "@utils/clientFunctions";
import { Crunches, MyCrunchesContainer } from "/";
import { chunkArray } from "@utils/clientFunctions";

const SocialShare = dynamic(() => import("@component/others/SocialShare"));

const ViewscapeContainer = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const {
      crunches: propsActiveViewscape,
      myFollowing,
      profile: { myHandle },
    } = props,
    [online, setOnline] = useState(props.online),
    [activeCrunch, setActiveCrunch] = useState({}),
    [moreActions, setMoreActions] = useState(false),
    [displayReport, setDisplayReport] = useState(false),
    [displayMembers, setDisplayMembers] = useState(false),
    [confirmUnfollow, setConfirmUnfollow] = useState(false),
    [deviceWidth, setDeviceWidth] = useState(props.deviceWidth),
    [activeViewscape, setActiveViewscape] = useState(propsActiveViewscape),
    activeViewscapeChunk = chunkArray({ array: activeViewscape, chunkSize: Math.ceil(activeViewscape.length / deviceWidth) });

  useEffect(() => {
    setOnline(props.online);
  }, [props.online]);

  useEffect(() => {
    setDeviceWidth(props.deviceWidth);
  }, [props.deviceWidth]);

  const activeCrunchHandler = ({ id, title, moderators, followers, more }) => () => {
    if (more) {
      setActiveCrunch({
        title,
        list: [
          {
            label: `Report ${title} Crunch`,
            handler: () => setDisplayReport(true),
          },
          { label: `Subscribers`, handler: () => setDisplayMembers("followers") },
          { label: "Admin and Moderators", handler: () => setDisplayMembers("moderators") },
          { jsx: <SocialShare crunch={id} />, handler: "link" },
        ],
        id,
        followers,
        moderators,
        myFollowing,
      });
      setMoreActions(true);
    } else {
      setActiveCrunch({ id, title, moderators, followers });
      if ("universal" === id) return enqueueSnackbar(`You can't unfollow Universal Crunch`, { variant: "warning" });
      setConfirmUnfollow(true);
    }
  };

  const unfollowHandler = async () => {
    return enqueueSnackbar(`Unfollow disabled.`, { variant: "info" });

    if (myHandle && online) {
      const status = await fetcher("/api/crunch/followCrunch", JSON.stringify({ id: activeCrunch.id, myHandle, follow: false }));
      if (status) {
        setActiveViewscape(activeViewscape.filter((x) => x.id !== activeCrunch.id));
      } else {
        enqueueSnackbar(`Please, Try again. Server unable to handle request.`, { variant: "error" });
      }
    } else {
      enqueueSnackbar(`User not logged in or Network connectivity issue.`, { variant: "info" });
    }
    setActiveCrunch(false);
  };

  const reportHandler = async (feedback) => {
    if (myHandle && online) {
      const report = validate("text", feedback);
      if (report) {
        const status = await fetcher(
          "/api/crunch/reportCrunch",
          JSON.stringify({ report, link: activeCrunch.id, section: "crunch", myHandle })
        );
        if (status) {
          enqueueSnackbar(`We'll review your report`, { variant: "success" });
        } else {
          enqueueSnackbar(`Unable to reach server`, { variant: "error" });
        }
      } else {
        enqueueSnackbar(`Invalid report: Seems your exceeded 200 characters, or includes characters other than alphabet`, {
          variant: "warning",
        });
      }
    } else {
      enqueueSnackbar(`Please, make sure you have a stable connection and your'e logged in`, { variant: "warning" });
    }
  };

  return (
    <>
      <MyCrunchesContainer />
      <Crunches
        {...{
          myHandle,
          moreActions,
          activeCrunch,
          reportHandler,
          displayReport,
          setMoreActions,
          displayMembers,
          setActiveCrunch,
          confirmUnfollow,
          unfollowHandler,
          setDisplayReport,
          setDisplayMembers,
          setConfirmUnfollow,
          activeCrunchHandler,
          activeViewscapeChunk,
        }}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    online: state.device?.online,
    deviceWidth: state.device?.deviceWidth,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ViewscapeContainer);
