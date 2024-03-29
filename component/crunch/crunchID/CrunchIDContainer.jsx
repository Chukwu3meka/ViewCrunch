import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";

import { CrunchID } from "/";
import { fetcher } from "@utils/clientFunctions";
import { setNotificationAction, getViewsAction } from "@store/actions";

const CrunchesContainer = (props) => {
  const { enqueueSnackbar } = useSnackbar(),
    [ready, setReady] = useState(0),
    [mobile, setMobile] = useState(),
    { getViewsAction } = props,
    [uiViews, setUiViews] = useState([]),
    [myID, setMyID] = useState(props.myID),
    [loading, setLoading] = useState(true),
    [bookmarks, setBookmarks] = useState([]),
    [blacklist, setBlacklist] = useState(null),
    [online, setOnline] = useState(props?.online),
    [lastVisible, setLastVisible] = useState(null),
    [fetchFailed, setFetchFailed] = useState(false),
    [myCrunches, setMyCrunches] = useState(props.myCrunches || []),
    [otherCrunches, setOtherCrunches] = useState(props.otherCrunches || []),
    [recentCrunches, setRecentCrunches] = useState(props.recentCrunches || []);

  useEffect(() => {
    if (ready === 0) setReady(1);
    if (ready >= 1) {
      setOnline(props.online);
      if (!props?.online) stopFetching();
    }
  }, [props.online]);

  useEffect(() => {
    if (ready === 1) {
      if (props.myID) {
        getViews({ fetchType: "initial", reduxMyID: props.myID, appIsOnline: props.online });
      } else {
        getViews({ fetchType: "initial", reduxMyID: null, appIsOnline: props.online });
      }
      setReady(2);
    }
    setMyID(props.myID);
  }, [props.myID]);

  useEffect(() => {
    setMobile(props.deviceWidth <= 400 ? true : false);
  }, [props.deviceWidth]);

  useEffect(() => {
    if (ready === 2 && lastVisible && props.userAtBottom) getViews({ fetchType: "more" });
  }, [props.userAtBottom]);

  useEffect(() => {
    if (ready === 2 && props.views) {
      setLoading(false);
      const { views, bookmarks: propsBookmarks, blacklist, lastVisible } = props.views;
      setBlacklist(blacklist);
      setLastVisible(lastVisible);
      if (!bookmarks.length && propsBookmarks) setBookmarks(propsBookmarks);
      if (lastVisible === "last view") {
        stopFetching(); // to prevent unwanted error
        setFetchFailed(false);
        enqueueSnackbar("No View Found, ", { variant: "info" });
      } else if (!views?.length) {
        setFetchFailed(true);
        enqueueSnackbar("No View Found, ", { variant: "info" });
      } else if (views?.length) {
        setFetchFailed(false);
        setUiViews([...uiViews, ...views]);
      } else {
        enqueueSnackbar("Something went wrong, ", { variant: "error" });
      }
    }
  }, [props.views]);

  const getViews = ({ fetchType, reduxMyID = myID, appIsOnline = online }) => {
    if (appIsOnline) {
      if (lastVisible === "last view") {
        setLoading(false);
        setFetchFailed(false);
        enqueueSnackbar("You've gotten to the last View", { variant: "info" });
      } else if (fetchType === "initial") {
        setLoading(true);
        setFetchFailed(false);
        getViewsAction({ crunch: props.crunchDetails?.crunchID, reduxMyID });
      } else if (["retry", "more"].includes(fetchType) && !loading) {
        setLoading(true);
        setFetchFailed(false);
        getViewsAction({
          reduxMyID,
          reduxBlacklist: blacklist,
          reduxLastVisible: lastVisible,
          crunch: props.crunchDetails?.crunchID,
        });
      } else {
        stopFetching();
      }
    } else {
      stopFetching();
      enqueueSnackbar("You're not connected to the internet", { variant: "info" });
    }
  };

  const stopFetching = () => {
    setLoading(false);
    setFetchFailed(true);
  };

  const bookmarkHandler =
    ({ title, viewID }) =>
    async () => {
      if (!myID) return enqueueSnackbar("You're not authenticated, signin at the bottom of any page", { variant: "error" });

      setBookmarks(bookmarks.includes(viewID) ? bookmarks.filter((x) => x !== viewID) : [...bookmarks, viewID]);

      const bookmarked = await fetcher("/api/profile/bookmark", { myID, viewID });

      enqueueSnackbar(`${title}, has been ${bookmarked ? "added to" : "removed from"} bookmark.`, { variant: "success" });
    };

  return (
    <CrunchID
      crunchDetails={{ ...props.crunchDetails }}
      crunchViews={{
        views: uiViews,
        loading,
        fetchFailed,
        getViews,
        mobile,
        bookmarkHandler,
        bookmarks,
      }}
    />
  );
};

const mapStateToProps = (state) => ({
    views: state.view?.views,
    myID: state.profile?.myID,
    online: state.device.online,
    deviceWidth: state.device.deviceWidth,
    userAtBottom: state.device.userAtBottom,
  }),
  mapDispatchToProps = { setNotificationAction, getViewsAction };

export default connect(mapStateToProps, mapDispatchToProps)(CrunchesContainer);
