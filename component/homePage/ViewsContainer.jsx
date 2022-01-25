import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useState, useEffect, useRef } from "react";

import { Views } from ".";
import { sleep } from "@utils/clientFunctions";
import { getViewAction, resetViewAction } from "@store/actions";

const ViewsContainer = (props) => {
  const { enqueueSnackbar } = useSnackbar(),
    scrollRef = useRef(null),
    lastElement = useRef(null),
    { getViewAction } = props,
    [ready, setReady] = useState(false),
    [uiViews, setUiViews] = useState([]),
    [loading, setLoading] = useState(false),
    [blacklist, setBlacklist] = useState(null),
    [atBotttom, setAtBotttom] = useState(false),
    [handle, setHandle] = useState(props.handle),
    [online, setOnline] = useState(props?.online),
    [lastVisible, setLastVisible] = useState(null),
    [fetchFailed, setFetchFailed] = useState(true);

  useEffect(() => {
    if (!ready) {
      setReady(true);
      getViews("initial");
    }
  }, []);

  useEffect(() => setHandle(props.handle), [props.handle]);

  useEffect(() => {
    if (ready) {
      setOnline(props?.online);
      if (!props?.online) stopFetching();
    }
  }, [props.online]);

  useEffect(() => {
    if (ready && lastVisible && props?.userAtBottom) {
      getViews("more");
      // console.log("atBotttom, setAtBotttom");
      // atBotttom, setAtBotttom
    }
  }, [props.userAtBottom]);

  useEffect(() => {
    if (ready && props.views) {
      setLoading(false);
      const { views, blacklist, lastVisible } = props.views;
      setBlacklist(blacklist);
      setLastVisible(lastVisible);
      if (lastVisible === "last view") {
        stopFetching(); // to prevent unwanted error
        setFetchFailed(false);
      } else if (!views.length) {
        console.log("no view");
        // setFetchFailed(true);
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
    console.log(fetchType);
    if (online) {
      if (lastVisible === "last view") {
        setLoading(false);
        setFetchFailed(false);
        enqueueSnackbar("You've gotten to the last View", { variant: "info" });
      } else if (fetchType === "initial") {
        setLoading(true);
        setFetchFailed(false);
        getViewAction({ handle, blacklist });
      } else if (fetchType === "more" && !loading) {
        console.log("loaddding ");
        setLoading(true);
        setFetchFailed(false);
        getViewAction({ handle, reduxBlacklist: blacklist, reduxLastVisible: lastVisible });
      } else if (fetchType === "retry" && !loading) {
        console.log("retry ");
        // setLoading(true);
        // setFetchFailed(false);
        // getViewAction({ handle, reduxBlacklist: blacklist, reduxLastVisible: lastVisible });
      } else {
        stopFetching();
        // getViewAction({ handle, blacklist, reduxLastVisible: lastVisible });
        // setLoading(true);
        // setFetchFailed(false);
        console.log("issue here");
        // return enqueueSnackbar("Something went wrong", { variant: "warning" });
      }
    }
  };

  const stopFetching = () => {
    setLoading(false);
    setFetchFailed(true);
    // scrollRef?.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
  };

  return <Views {...{ views: uiViews, loading, fetchFailed, scrollRef, getViews }} />;
};

const mapStateToProps = (state) => ({
    handle: state.profile?.myHandle,
    online: state.device.online,
    views: state.view?.views,
    deviceWidth: state.device.deviceWidth,
    userAtBottom: state.device.userAtBottom,
  }),
  mapDispatchToProps = { getViewAction, resetViewAction };

export default connect(mapStateToProps, mapDispatchToProps)(ViewsContainer);
