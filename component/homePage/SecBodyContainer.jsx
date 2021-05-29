import { SecBody } from "./";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { sleep } from "@utils/clientFunctions";
import { getMoreViewAction } from "@store/actions";
import { useState, useEffect, useRef } from "react";

const NavPageContainer = (props) => {
  const { crunch, deviceWidth, getMoreViewAction } = props,
    scrollRef = useRef(null),
    { enqueueSnackbar } = useSnackbar(),
    [loading, setLoading] = useState(false),
    [online, setOnline] = useState(props?.online),
    [fetchFailed, setFetchFailed] = useState(true),
    [secondary, setSecondary] = useState(props.secondary),
    [blacklist, setBlacklist] = useState(props.serverBlacklist),
    [lastVisible, setLastVisible] = useState(props.serverLastVisible);

  useEffect(() => {
    setOnline(props?.online);
  }, [props?.online]);

  useEffect(() => {
    if (props?.bottomScroll) getMorePost();
  }, [props?.bottomScroll]);

  useEffect(() => {
    if (loading) stopFetching();
  }, [loading]);

  useEffect(() => {
    if (online) {
      if (props.moreView?.length || props.lastVisible === "no other view") {
        setFetchFailed(false);
        setBlacklist(props.blacklist);
        setLastVisible(props.lastVisible);
        props.lastVisible !== "no other view" && setSecondary([...secondary, ...props.moreView]);
      } else {
        setFetchFailed(true);
      }
    }
    setLoading(false);
  }, [props.moreView]);

  const stopFetching = async () => {
    await sleep(20);
    setFetchFailed(true);
    setLoading(false);
    scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  const getMorePost = async () => {
    if (lastVisible === "no other view") {
      enqueueSnackbar(`No more view.`, { variant: "info" });
    }
    if (!loading) {
      setLoading(true);
      setFetchFailed(false);
      if (online) return getMoreViewAction({ crunch, blacklist, lastVisible });
      setFetchFailed(true);
    }
  };

  return secondary.length ? <SecBody {...{ secondary, deviceWidth, loading, getMorePost, fetchFailed, scrollRef }} /> : "";
};

const mapStateToProps = (state) => ({
    online: state?.device?.online,
    moreView: state?.view?.moreView,
    blacklist: state?.view?.blacklist,
    lastVisible: state?.view?.lastVisible,
    deviceWidth: state.device?.deviceWidth,
    bottomScroll: state.device?.bottomScroll,
  }),
  mapDispatchToProps = { getMoreViewAction };

export default connect(mapStateToProps, mapDispatchToProps)(NavPageContainer);
