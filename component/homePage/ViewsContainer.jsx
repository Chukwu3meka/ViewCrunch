import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { sleep } from "@utils/clientFunctions";
import { getViewAction, resetViewAction } from "@store/actions";
import { useState, useEffect, useRef } from "react";

import { Views } from ".";

const ViewsContainer = (props) => {
  const { enqueueSnackbar } = useSnackbar(),
    scrollRef = useRef(null),
    { getViewAction } = props,
    [views, setViews] = useState([]),
    [ready, setReady] = useState(false),
    [loading, setLoading] = useState(false),
    [lastVisible, setLastVisible] = useState(),
    [handle, setHandle] = useState(props.handle),
    [online, setOnline] = useState(props?.online),
    [fetchFailed, setFetchFailed] = useState(true);

  useEffect(() => {
    setReady(true);
    getViews("initial");
  }, []);

  useEffect(() => setHandle(props.handle), [props.handle]);

  useEffect(() => {
    if (ready) {
      setOnline(props?.online);
      if (!props?.online) stopFetching();
    }
  }, [props.online]);

  useEffect(() => {
    if (ready && props?.userAtBottom) getViews("more");
  }, [props.userAtBottom]);

  useEffect(() => {
    if (ready && props.views?.length) {
      setLoading(false);
      if (!props.views.length) {
        setFetchFailed(true);
        enqueueSnackbar("No View Found, ", { variant: "info" });
      } else {
        setLoading(false);
        setFetchFailed(false);
        setViews([...views, ...props.views]);
      }
    }
  }, [props.views]);

  // get new lastVisible
  useEffect(() => {
    if (ready && props.lastVisible) {
      stopFetching(); // to prevent unwanted error
      setLastVisible(props.lastVisible);
    }
  }, [props.lastVisible]);

  const getViews = (fetchType) => {
    if (lastVisible === "last view") {
      setLoading(false);
      setFetchFailed(false);
      enqueueSnackbar("You've gotten to the last View", { variant: "info" });
    } else {
      if (online) {
        switch (fetchType) {
          case "initial": {
            setLoading(true);
            setFetchFailed(false);
            getViewAction({ handle, blacklist: props.blacklist });
            break;
          }
          case "more": {
            if (!loading) {
              setLoading(true);
              setFetchFailed(false);
              getViewAction({ handle, blacklist: props.blacklist, reduxLastVisible: lastVisible });
              break;
            }
          }
          default: {
            stopFetching();
            getViewAction({ handle, blacklist: props.blacklist, reduxLastVisible: lastVisible });
            setLoading(true);
            setFetchFailed(false);
            // return enqueueSnackbar("Something went wrong", { variant: "warning" });
          }
        }
      }
    }
  };

  const stopFetching = async () => {
    await sleep(15);
    setFetchFailed(true);
    setLoading(false);
    scrollRef?.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
  };

  return <Views {...{ views, loading, fetchFailed, scrollRef, getViews }} />;
};

const mapStateToProps = (state) => ({
    handle: state.profile?.myHandle,
    online: state.device.online,
    views: state.view?.views,
    blacklist: state.view?.blacklist,
    lastVisible: state.view?.lastVisible,
    deviceWidth: state.device.deviceWidth,
    userAtBottom: state.device.userAtBottom,
  }),
  mapDispatchToProps = { getViewAction, resetViewAction };

export default connect(mapStateToProps, mapDispatchToProps)(ViewsContainer);
