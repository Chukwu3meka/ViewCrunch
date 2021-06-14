import { SecBody } from "./";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { sleep } from "@utils/clientFunctions";
import { getMoreViewAction, resetViewAction } from "@store/actions";
import { useState, useEffect, useRef } from "react";

const NavPageContainer = (props) => {
  const { crunch, deviceWidth, getMoreViewAction } = props,
    scrollRef = useRef(null),
    { enqueueSnackbar } = useSnackbar(),
    [loading, setLoading] = useState(false),
    [online, setOnline] = useState(props?.online),
    [fetchFailed, setFetchFailed] = useState(true),
    [secondary, setSecondary] = useState(props.serverSecondary),
    [blacklist, setBlacklist] = useState(props.serverBlacklist),
    [lastVisible, setLastVisible] = useState(props.serverLastVisible);

  useEffect(() => {
    setOnline(props?.online);
    if (!props?.online) stopFetching();
  }, [props?.online]);

  useEffect(() => {
    if (props?.userAtBottom) getMorePost();
  }, [props.userAtBottom]);

  useEffect(() => {
    let x = true;
    if (x && loading) stopFetching();

    return () => (x = false);
  }, [loading]);

  useEffect(() => {
    if (props.secondary?.length) {
      setLoading(false);
      setFetchFailed(false);
      setSecondary([...secondary, ...props.secondary]);
    }
  }, [props.secondary]);

  useEffect(() => {
    if (props.blacklist) setBlacklist(props.blacklist);
  }, [props.blacklist]);

  useEffect(() => {
    if (props.lastVisible) setLastVisible(props.lastVisible);
  }, [props.lastVisible]);

  const getMorePost = () => {
    if (lastVisible === "last view") {
      setLoading(false);
      setFetchFailed(false);
      enqueueSnackbar("You've gotten to the last View", { variant: "info" });
    } else {
      if (!online || !secondary.length) {
        enqueueSnackbar(!secondary.length ? "Unable to fetch view" : "Network Connectivity issue", { variant: "info" });
        return stopFetching();
      }

      if (!lastVisible) {
        setLoading(false);
        setFetchFailed(false);
        return enqueueSnackbar(`No more view.`, { variant: "info" });
      }

      if (!loading && online) {
        setLoading(true);
        setFetchFailed(false);
        getMoreViewAction({ crunch, reduxBlacklist: blacklist, reduxLastVisible: lastVisible });
      }
    }
  };

  const stopFetching = async () => {
    await sleep(15);
    setFetchFailed(true);
    setLoading(false);
    scrollRef?.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  return secondary.length ? <SecBody {...{ secondary, deviceWidth, loading, getMorePost, fetchFailed, scrollRef }} /> : "";
};

const mapStateToProps = (state) => ({
    online: state?.device?.online,
    secondary: state?.view?.secondary,
    blacklist: state?.view?.blacklist,
    lastVisible: state?.view?.lastVisible,
    deviceWidth: state.device?.deviceWidth,
    userAtBottom: state.device?.userAtBottom,
  }),
  mapDispatchToProps = { getMoreViewAction, resetViewAction };

export default connect(mapStateToProps, mapDispatchToProps)(NavPageContainer);
