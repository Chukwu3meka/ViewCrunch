import { SecBody } from "./";
import { connect } from "react-redux";
import { sleep } from "@utils/clientFunctions";
import { useState, useEffect, useRef } from "react";
import { getMoreViewAction } from "@store/actions";

const NavPageContainer = (props) => {
  const { crunch, blacklist, deviceWidth, getMoreViewAction } = props,
    scrollRef = useRef(null),
    [loading, setLoading] = useState(false),
    [online, setOnline] = useState(props?.online),
    [fetchFailed, setFetchFailed] = useState(true),
    [secondary, setSecondary] = useState(props.secondary),
    [lastVisible, setLastVisible] = useState(props.lastVisible);

  useEffect(() => {
    setOnline(props?.online);
  }, [props?.online]);

  useEffect(() => {
    if (props?.bottomScroll && lastVisible !== "no other view" && !loading) getMorePost();
  }, [props?.bottomScroll]);

  useEffect(() => {
    if (loading) stopFetching();
  }, [loading]);

  // useEffect(() => {
  //   if (online) {
  //     if (props.moreView?.length) {
  //       setFetchFailed(false);
  //       setLastVisible(props.lastVisible);
  //       setSecondary([...secondary, ...props.moreView]);
  //     } else {
  //       setFetchFailed(true);
  //     }
  //   }
  //   setLoading(false);
  // }, [props?.moreView]);

  // useEffect(() => {
  //   if (fetchFailed) hideJSX(setFetchFailed);
  // }, [fetchFailed]);

  const stopFetching = async () => {
    await sleep(30);
    setFetchFailed(true);
    setLoading(false);
    scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  const getMorePost = async () => {
    setLoading(true);
    setFetchFailed(false);
    console.log("getMorePost started");
    // if (online) return getMoreViewAction({ crunch, blacklist, lastVisible });
    // setFetchFailed(true);
  };

  // const hideJSX = async (setter) => {
  // await sleep(3);
  // await sleep(1);
  // setter(false);
  // };

  // return <SecBody {...{ navTag, content, loading, deviceWidth, getMorePost, fetchFailed, mySeen, secondary }} />;
  return secondary.length ? <SecBody {...{ secondary, deviceWidth, loading, getMorePost, fetchFailed, scrollRef }} /> : "";
};

const mapStateToProps = (state) => ({
    online: state?.device?.online,
    moreView: state?.view?.moreView || [],
    lastVisible: state?.view?.lastVisible,
    deviceWidth: state.device?.deviceWidth,
    bottomScroll: state.device?.bottomScroll,
  }),
  mapDispatchToProps = { getMoreViewAction };

export default connect(mapStateToProps, mapDispatchToProps)(NavPageContainer);
