import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";

import { fetcher } from "@utils/clientFunctions";

import { Views } from ".";
import { getViewsAction, resetViewAction } from "@store/actions";

const ViewsContainer = (props) => {
  const { getViewsAction } = props,
    [mobile, setMobile] = useState(),
    { enqueueSnackbar } = useSnackbar(),
    [ready, setReady] = useState(0),
    [uiViews, setUiViews] = useState([]),
    [myID, setMyID] = useState(props.myID),
    [loading, setLoading] = useState(false),
    [bookmarks, setBookmarks] = useState([]),
    [blacklist, setBlacklist] = useState(null),
    [online, setOnline] = useState(props?.online),
    [lastVisible, setLastVisible] = useState(null),
    [fetchFailed, setFetchFailed] = useState(true);

  useEffect(() => {
    setMyID(props.myID);
    setReady(1);
    // console.log({ myID, p: props.myID });

    if (ready === 1) {
      console.log(myID, props.myID, ready);
      setReady(2);
      // getViews("initial");
    }
  }, [props.myID]);

  useEffect(() => {
    if (ready == "2") {
      setOnline(props?.online);
      if (!props?.online) stopFetching();
    }
  }, [props.online]);

  useEffect(() => {
    if (ready == "2") setMobile(props.deviceWidth <= 400 ? true : false);
  }, [props.deviceWidth]);

  useEffect(() => {
    if (ready == "2" && lastVisible && props?.userAtBottom) getViews("more");
  }, [props.userAtBottom]);

  useEffect(() => {
    if (ready == "2" && props.views) {
      setLoading(false);
      const { views, bookmarks, blacklist, lastVisible } = props.views;
      setBlacklist(blacklist);
      setLastVisible(lastVisible);
      if (bookmarks) setBookmarks(bookmarks);
      if (lastVisible === "last view") {
        stopFetching(); // to prevent unwanted error
        setFetchFailed(false);
      } else if (!views.length) {
        setFetchFailed(true);
        enqueueSnackbar("No View Found, ", { variant: "info" });
      } else if (views.length) {
        setFetchFailed(false);
        setUiViews([...uiViews, ...views]);
      } else {
        enqueueSnackbar("Something went wrong, ", { variant: "error" });
      }
    }
  }, [props.views]);

  const getViews = (fetchType) => {
    if (online) {
      if (lastVisible === "last view") {
        setLoading(false);
        setFetchFailed(false);
        enqueueSnackbar("You've gotten to the last View", { variant: "info" });
      } else if (fetchType === "initial") {
        setLoading(true);
        setFetchFailed(false);
        // bookmarks
        console.log(myID, props.myID);
        // getViewsAction({ myID, initialFetch: true });
      } else if (["retry", "more"].includes(fetchType) && !loading) {
        setLoading(true);
        setFetchFailed(false);
        getViewsAction({ myID, reduxBlacklist: blacklist, reduxLastVisible: lastVisible });
      } else {
        stopFetching();
      }
    }
  };

  const stopFetching = () => {
    setLoading(false);
    setFetchFailed(true);
  };

  const bookmarkHandler =
    ({ title, viewID }) =>
    async () => {
      setBookmarks(bookmarks.includes(viewID) ? bookmarks.filter((x) => x !== viewID) : [...bookmarks, viewID]);

      const bookmarked = await fetcher("/api/profile/bookmark", JSON.stringify({ myID, viewID }));

      enqueueSnackbar(`${title}, has been ${bookmarked ? "added to" : "removed from"} bookmark.`, { variant: "success" });
    };

  return <Views {...{ views: uiViews, loading, fetchFailed, getViews, mobile, bookmarkHandler, bookmarks }} />;
};

const mapStateToProps = (state) => ({
    views: state.view?.views,
    myID: state.profile?.myID,
    online: state.device.online,
    deviceWidth: state.device.deviceWidth,
    userAtBottom: state.device.userAtBottom,
  }),
  mapDispatchToProps = { getViewsAction, resetViewAction };

export default connect(mapStateToProps, mapDispatchToProps)(ViewsContainer);
