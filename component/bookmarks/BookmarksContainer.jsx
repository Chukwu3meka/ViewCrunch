import Grid from "@mui/material/Grid";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

import { fetcher } from "@utils/clientFunctions";
import { setNotificationAction } from "@store/actions";
import { Footer, NavContainer } from "@component/layout";
import { Bookmarks, BookmarksDialog, styles } from ".";
import { Views } from "@component/home";

const BookmarksContainer = (props) => {
  const [mobile, setMobile] = useState(),
    { enqueueSnackbar } = useSnackbar(),
    [ready, setReady] = useState(0),
    [uiViews, setUiViews] = useState(props.bookmarks || []),
    [myID, setMyID] = useState(props.myID),
    [loading, setLoading] = useState(false),
    [bookmarks, setBookmarks] = useState((props.bookmarks || []).map(({ viewID }) => viewID)),
    [blacklist, setBlacklist] = useState(null),
    [online, setOnline] = useState(props?.online),
    [lastVisible, setLastVisible] = useState(null),
    [fetchFailed, setFetchFailed] = useState(false);

  useEffect(() => {
    setMobile(props.deviceWidth <= 400 ? true : false);
  }, [props.deviceWidth]);

  const getViews = () => {
    "Afa";
  };

  const bookmarkHandler =
    ({ title, viewID }) =>
    async () => {
      if (!myID) return enqueueSnackbar("You're not authenticated, signin at the bottom of any page", { variant: "error" });

      setBookmarks(bookmarks.includes(viewID) ? bookmarks.filter((x) => x !== viewID) : [...bookmarks, viewID]);

      const bookmarked = await fetcher("/api/profile/bookmark", JSON.stringify({ myID, viewID }));

      enqueueSnackbar(`${title}, has been ${bookmarked ? "added to" : "removed from"} bookmark.`, { variant: "success" });
    };

  // const {
  //     setNotificationAction,
  //     notification: { messages: propsMessages, unseen: propsUnseen },
  //   } = props,
  //   [myID, setMyID] = useState(null),
  //   { enqueueSnackbar } = useSnackbar(),
  //   [unseen, setUnseen] = useState(propsUnseen),
  //   [openMessage, setOpenMessage] = useState({}),
  //   [messages, setMessages] = useState(propsMessages);

  // useEffect(() => {
  //   setMyID(props.myID);
  // }, [props.myID]);

  // const deleteMessageHandler = (index) => async () => {
  //   const { message, seen } = messages[index];
  //   const res = await fetcher("/api/profile/deleteNotification", JSON.stringify({ myID, messageID: message }));

  //   setMessages(messages.filter((x) => x.message !== message));
  //   if (!seen) {
  //     setUnseen(unseen - 1);
  //     setNotificationAction(unseen - 1);
  //   }
  //   if (!res) enqueueSnackbar("Something went wrong", { variant: "error" });
  // };

  // const openMessageHandler = (index) => async () => {
  //   if (index >= 0) {
  //     const { seen, message } = messages[index];
  //     setOpenMessage(messages[index]);

  //     if (!seen) {
  //       let items = [...messages];
  //       let item = { ...messages[index] };
  //       item.seen = true;
  //       items[index] = item;
  //       setMessages(items);
  //       setUnseen(unseen - 1);
  //       setNotificationAction(unseen - 1);

  //       await fetcher("/api/profile/notificationOpened", JSON.stringify({ myID, messageID: message }));
  //     }
  //   }
  // };

  // const closeMessageHandler = () => setOpenMessage({});

  return (
    <Grid container style={{ maxWidth: "1200px", margin: "auto" }}>
      <NavContainer>
        <div className={styles.nav}>
          <Typography variant="h4">Bookmarks</Typography>
          <hr />
          <Typography fontSize={15}>Here you get a list of views you have bookmarked.</Typography>
          {/* {unseen ? (
            <Typography fontSize={12} color="aqua">
              You have {unseen} unread {unseen > 1 ? "messages" : "messages"}
            </Typography>
          ) : null}{" "} */}
        </div>
      </NavContainer>
      <Grid item xs={12} sm={12} md={8}>
        <Views {...{ label: "Bookmarks", views: uiViews, loading, fetchFailed, getViews, mobile, bookmarkHandler, bookmarks }} />
        {/* <Bookmarks
          messages={messages}
          openMessage={openMessage}
          openMessageHandler={openMessageHandler}
          deleteMessageHandler={deleteMessageHandler}
        /> */}
        <Footer />
        {/* <BookmarksDialog
          messages={messages}
          openMessage={openMessage}
          openMessageHandler={openMessageHandler}
          closeMessageHandler={closeMessageHandler}
        /> */}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({ myID: state.profile?.myID }),
  mapDispatchToProps = { setNotificationAction };

export default connect(mapStateToProps, mapDispatchToProps)(BookmarksContainer);
