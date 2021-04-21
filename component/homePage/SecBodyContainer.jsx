import { SecBody } from "./";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { sleep } from "@utils/clientFunctions";
import { getMoreArticlesAction } from "@store/actions";

const NavPageContainer = (props) => {
  const { articles, propsLastVisible, propsArticlesRead, navTag, deviceWidth, getMoreArticlesAction, mySeen } = props,
    [loading, setLoading] = useState(false),
    [content, setContent] = useState(articles),
    [online, setOnline] = useState(props?.online),
    [fetchFailed, setFetchFailed] = useState(false),
    [lastVisible, setLastVisible] = useState(propsLastVisible),
    [articlesRead, setArticlesRead] = useState(propsArticlesRead);

  useEffect(() => {
    if (props?.bottomScroll) getMorePost();

    // if (props?.bottomScroll && lastVisible !== "no other article") getMorePost();
  }, [props?.bottomScroll]);

  useEffect(() => {
    if (loading) hideJSX(setLoading);
  }, [loading]);

  // useEffect(() => {
  //   if (online) {
  //     if (props?.moreArticles?.length) {
  //       setFetchFailed(false);
  //       setLastVisible(props.lastVisible);
  //       setArticlesRead(props.articlesRead);
  //       setContent([...content, ...props.moreArticles]);
  //     } else {
  //       setFetchFailed(true);
  //     }
  //   }
  //   setLoading(false);
  // }, [props?.moreArticles]);

  // useEffect(() => {
  //   setOnline(props?.online);
  // }, [props?.online]);

  // useEffect(() => {
  //   if (fetchFailed) hideJSX(setFetchFailed);
  // }, [fetchFailed]);

  const getMorePost = async () => {
    setLoading(true);
    setFetchFailed(false);
    // setLoading(true);
    // if (online) return getMoreArticlesAction({ navTag, lastVisible, articlesRead });
    // setFetchFailed(true);
  };

  const hideJSX = async (setter) => {
    await sleep(60);
    setter(false);
  };

  return <SecBody {...{ navTag, content, loading, deviceWidth, getMorePost, fetchFailed, mySeen }} />;
};

const mapStateToProps = (state) => ({
    online: state?.device?.online,
    deviceWidth: state.device?.deviceWidth,
    lastVisible: state?.article?.lastVisible,
    mySeen: state.profile?.mySeen || [],
    bottomScroll: state.device?.bottomScroll,
    articlesRead: state?.article?.articlesRead || [],
    moreArticles: state?.article?.moreArticles || [],
  }),
  mapDispatchToProps = { getMoreArticlesAction };

export default connect(mapStateToProps, mapDispatchToProps)(NavPageContainer);
