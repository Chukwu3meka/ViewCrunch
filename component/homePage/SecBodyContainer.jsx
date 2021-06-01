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
    [secondary, setSecondary] = useState(props.serverSecondary),
    [blacklist, setBlacklist] = useState(props.serverBlacklist),
    [lastVisible, setLastVisible] = useState(props.serverLastVisible);

  useEffect(() => {
    setOnline(props?.online);
  }, [props?.online]);

  useEffect(() => {
    if (props?.bottomScroll) getMorePost();
  }, [props?.bottomScroll]);

  useEffect(() => {
    if (loading) {
      const stopFetching = async () => {
        await sleep(10);
        setFetchFailed(true);
        setLoading(false);
        scrollRef?.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      };
      stopFetching();
    }
    return () => {
      setFetchFailed(false);
      setLoading(true);
    };
  }, [loading]);

  useEffect(() => {
    if (online) {
      if (props.secondary?.length || props.lastVisible === "no other view") {
        setFetchFailed(false);
        props.blacklist && setBlacklist(props.blacklist);
        props.lastVisible && setLastVisible(props.lastVisible);
        props.lastVisible !== "no other view" && setSecondary([...secondary, ...props.secondary]);
      } else {
        setFetchFailed(true);
      }
    }
    setLoading(false);
  }, [props.secondary]);

  const getMorePost = async () => {
    if (lastVisible === "no other view") {
      enqueueSnackbar(`No more view.`, { variant: "info" });
    }
    if (!loading) {
      setLoading(true);
      setFetchFailed(false);
      if (online) return getMoreViewAction({ crunch, reduxBlacklist: blacklist, reduxLastVisible: lastVisible });
      setFetchFailed(true);
    }
  };

  return secondary.length ? <SecBody {...{ secondary, deviceWidth, loading, getMorePost, fetchFailed, scrollRef }} /> : "";
};

const mapStateToProps = (state) => ({
    online: state?.device?.online,
    secondary: state?.view?.secondary,
    blacklist: state?.view?.blacklist,
    lastVisible: state?.view?.lastVisible,
    deviceWidth: state.device?.deviceWidth,
    bottomScroll: state.device?.bottomScroll,
  }),
  mapDispatchToProps = { getMoreViewAction };

export default connect(mapStateToProps, mapDispatchToProps)(NavPageContainer);
