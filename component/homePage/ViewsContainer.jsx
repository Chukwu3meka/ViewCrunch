import { SecBody } from "./";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { sleep } from "@utils/clientFunctions";
import { getViewAction, resetViewAction } from "@store/actions";
import { useState, useEffect, useRef } from "react";

import Fade from "react-reveal/Fade";
import { Loading, Avatar } from "@component/others";
import { Grid, Paper, Typography } from "@material-ui/core";
import { shortNumber, trimString, toId } from "@utils/clientFunctions";
import Link from "next/link";
import Image from "next/image";
import { viewsStyles } from ".";

// import BookmarkAddIcon from "@material-ui/icons/BookmarkAdd";
import BookmarkAddIcon from "@material-ui/icons/FavoriteBorderTwoTone";

const ViewsContainer = (props) => {
  const { crunch, deviceWidth, getViewAction, myHandle } = props,
    scrollRef = useRef(null),
    { enqueueSnackbar } = useSnackbar(),
    [loading, setLoading] = useState(false),
    [online, setOnline] = useState(props?.online),
    [fetchFailed, setFetchFailed] = useState(true),
    [views, setViews] = useState([]),
    [blacklist, setBlacklist] = useState([]),
    [ready, setReady] = useState(false),
    [lastVisible, setLastVisible] = useState();

  useEffect(() => {
    getMorePost();
    setReady(true);
  }, []);

  useEffect(() => {
    // if (!props?.online) stopFetching();
    if (ready) setOnline(props?.online);
  }, [props.online]);

  // useEffect(() => {
  //   if (props?.userAtBottom) getMorePost();
  // }, [props.userAtBottom]);

  // useEffect(() => {
  //   let x = true;
  //   if (x && loading) stopFetching();

  //   return () => (x = false);
  // }, [loading]);

  useEffect(() => {
    if (ready && props.views?.length) {
      // setLoading(false);
      // setFetchFailed(false);
      setViews([...views, ...props.views]);
    }
  }, [props.views]);

  // useEffect(() => {
  //   if (props.blacklist) setBlacklist(props.blacklist);
  // }, [props.blacklist]);

  // useEffect(() => {
  //   if (props.lastVisible) setLastVisible(props.lastVisible);
  // }, [props.lastVisible]);

  const getMorePost = () => {
    if (lastVisible === "last view") {
      // setLoading(false);
      // setFetchFailed(false);
      // enqueueSnackbar("You've gotten to the last View", { variant: "info" });
    } else {
      // if (!online || !views.length) {
      //   enqueueSnackbar(!views.length ? "Unable to fetch view" : "Network Connectivity issue", { variant: "info" });
      //   return stopFetching();
      // }

      // if (!lastVisible) {
      //   setLoading(false);
      //   setFetchFailed(false);
      //   return enqueueSnackbar(`No more view.`, { variant: "info" });
      // }

      if (!loading && online) {
        // setLoading(true);
        // setFetchFailed(false);
        getViewAction({ myHandle, reduxBlacklist: blacklist, reduxLastVisible: lastVisible });
      }
    }
  };

  // const stopFetching = async () => {
  //   await sleep(15);
  //   setFetchFailed(true);
  //   setLoading(false);
  //   // scrollRef?.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  // };

  // return views.length ? <SecBody {...{ views, deviceWidth, loading, getMorePost, fetchFailed, scrollRef }} /> : "";

  // crunch, content, title, pryImage, displayName, profilePicture, upvote, path

  return (
    <div className={viewsStyles.views}>
      <Typography variant="h2">Recent Views from Great Authors</Typography>
      {views?.map(
        ({ displayName, profilePicture, profileLink, crunchLink, crunch, title, image, content, date, readTime, keyword, path }) => (
          <Fade bottom key={path}>
            <Paper className={viewsStyles.view}>
              <div>
                <div>
                  <div>
                    <Image src={profilePicture} layout="fill" alt={displayName} />
                  </div>
                  <Typography variant="body1">
                    <Link href={profileLink}>
                      <a>{displayName}</a>
                    </Link>
                    &nbsp;in&nbsp;
                    <Link href={crunchLink}>
                      <a>{crunch}</a>
                    </Link>
                  </Typography>
                </div>
                <Typography variant="h5" component="h3">
                  {title}
                </Typography>
                <Typography variant="body2">{content.replace(/<[^>]+>/g, "")}</Typography>
                <div>
                  <Typography variant="body2">{`${date} · ${readTime} ☆ ${keyword}`}</Typography>
                  <BookmarkAddIcon fontSize="small" />
                </div>
              </div>
              <Image src={image} width={140} height={130} alt={title} />
            </Paper>
          </Fade>
        )
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
    myHandle: state.profile?.myHandle,
    online: state.device?.online,
    views: state.view?.views,
    blacklist: state.view?.blacklist,
    lastVisible: state.view?.lastVisible,
    deviceWidth: state.device?.deviceWidth,
    userAtBottom: state.device?.userAtBottom,
  }),
  mapDispatchToProps = { getViewAction, resetViewAction };

export default connect(mapStateToProps, mapDispatchToProps)(ViewsContainer);
