import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";

import { fetcher } from "@utils/clientFunctions";

import { Views } from ".";
import { getViewsAction } from "@store/actions";

const ViewsContainer = (props) => {
  const { getViewsAction } = props,
    [mobile, setMobile] = useState(),
    { enqueueSnackbar } = useSnackbar(),
    [ready, setReady] = useState(0),
    [uiViews, setUiViews] = useState([]),
    [myID, setMyID] = useState(props.myID),
    [loading, setLoading] = useState(true),
    [bookmarks, setBookmarks] = useState([]),
    [blacklist, setBlacklist] = useState(null),
    [online, setOnline] = useState(props?.online),
    [lastVisible, setLastVisible] = useState(null),
    [fetchFailed, setFetchFailed] = useState(false);

  useEffect(() => {
    setMyID(props.myID);

    // to fetch views whether user is not logged in or not
    if (ready === 0) setReady(props.myID ? 1 : 2);
  }, [props.myID]);

  useEffect(() => {
    setOnline(props.online);
    if (!props?.online) stopFetching();
  }, [props.online]);

  useEffect(() => {
    // get views only when app is ready
    if ([1, 2].includes(ready)) {
      if (ready === 1) getViews({ fetchType: "initial", reduxMyID: props.myID, appIsOnline: props.online });
      if (ready === 2) getViews({ fetchType: "initial", reduxMyID: null, appIsOnline: props.online });
      setReady(3);
    }
  }, [ready]);

  useEffect(() => {
    setMobile(props.deviceWidth <= 400 ? true : false);
  }, [props.deviceWidth]);

  useEffect(() => {
    if (ready === 3 && lastVisible && props?.userAtBottom) getViews({ fetchType: "more" });
  }, [props.userAtBottom]);

  useEffect(() => {
    if (ready === 3 && props.views) {
      setLoading(false);
      const { views, bookmarks, blacklist, lastVisible } = props.views;
      setBlacklist(blacklist);
      setLastVisible(lastVisible);
      if (bookmarks) setBookmarks(bookmarks);
      // if (bookmarks) console.log(bookmarks);

      if (lastVisible === "last view") {
        stopFetching(); // to prevent unwanted error
        setFetchFailed(false);
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
        getViewsAction({ reduxMyID });
      } else if (["retry", "more"].includes(fetchType) && !loading) {
        setLoading(true);
        setFetchFailed(false);
        getViewsAction({ reduxMyID, reduxBlacklist: blacklist, reduxLastVisible: lastVisible });
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
  mapDispatchToProps = { getViewsAction };

export default connect(mapStateToProps, mapDispatchToProps)(ViewsContainer);
