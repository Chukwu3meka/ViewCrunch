import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";

import { Views } from ".";
import { getViewAction, resetViewAction } from "@store/actions";

const ViewsContainer = (props) => {
  const { getViewAction } = props,
    { enqueueSnackbar } = useSnackbar(),
    [ready, setReady] = useState(false),
    [uiViews, setUiViews] = useState([]),
    [loading, setLoading] = useState(false),
    [blacklist, setBlacklist] = useState(null),
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
    if (ready && lastVisible && props?.userAtBottom) getViews("more");
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
        getViewAction({ handle, blacklist });
      } else if (["retry", "more"].includes(fetchType) && !loading) {
        setLoading(true);
        setFetchFailed(false);
        getViewAction({ handle, reduxBlacklist: blacklist, reduxLastVisible: lastVisible });
      } else {
        stopFetching();
      }
    }
  };

  const stopFetching = () => {
    setLoading(false);
    setFetchFailed(true);
  };

  return <Views {...{ views: uiViews, loading, fetchFailed, getViews }} />;
};

const mapStateToProps = (state) => ({
    views: state.view?.views,
    online: state.device.online,
    handle: state.profile?.myHandle,
    userAtBottom: state.device.userAtBottom,
  }),
  mapDispatchToProps = { getViewAction, resetViewAction };

export default connect(mapStateToProps, mapDispatchToProps)(ViewsContainer);
