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
  }, [props?.online]);

  useEffect(() => {
    if (props?.userAtBottom) getMorePost();
  }, [props.userAtBottom]);

  useEffect(() => {
    if (loading) stopFetching();
  }, [loading]);

  useEffect(() => {
    setLoading(false);
    if (props.secondary?.length || props.secondary === "no other view") {
      setFetchFailed(false);
      if (props.secondary?.length) setSecondary([...secondary, ...props.secondary]);
    } else {
      setFetchFailed(true);
    }
  }, [props.secondary]);

  useEffect(() => {
    if (props.lastVisible || props.lastVisible === "no other view") setLastVisible(props.lastVisible);
  }, [props.lastVisible]);

  useEffect(() => {
    if (props.blacklist) setBlacklist(props.blacklist);
  }, [props.blacklist]);

  const getMorePost = () => {
    if (lastVisible === "no other view") {
      enqueueSnackbar(`No more view.`, { variant: "info" });
    } else {
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
