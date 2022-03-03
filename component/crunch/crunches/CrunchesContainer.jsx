import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

import { fetcher } from "@utils/clientFunctions";
import { setNotificationAction } from "@store/actions";
import { Bookmarks } from ".";

const BookmarksContainer = (props) => {
  const [mobile, setMobile] = useState(),
    { enqueueSnackbar } = useSnackbar(),
    [uiViews, setUiViews] = useState(props.bookmarks || []),
    [myID, setMyID] = useState(props.myID),
    [bookmarks, setBookmarks] = useState((props.bookmarks || []).map(({ viewID }) => viewID));

  useEffect(() => {
    setMyID(props.myID);
  }, [props.myID]);

  useEffect(() => {
    setMobile(props.deviceWidth <= 400 ? true : false);
  }, [props.deviceWidth]);

  const bookmarkHandler =
    ({ title, viewID }) =>
    async () => {
      if (!myID) return enqueueSnackbar("You're not authenticated, signin at the bottom of any page", { variant: "error" });

      setBookmarks(bookmarks.includes(viewID) ? bookmarks.filter((x) => x !== viewID) : [...bookmarks, viewID]);

      const bookmarked = await fetcher("/api/profile/bookmark", JSON.stringify({ myID, viewID }));

      enqueueSnackbar(`${title}, has been ${bookmarked ? "added to" : "removed from"} bookmark.`, { variant: "success" });
    };

  return "CrunchesContainer";
  // return <Bookmarks {...{ uiViews, mobile, bookmarkHandler, bookmarks }} />;
};

const mapStateToProps = (state) => ({ myID: state.profile?.myID }),
  mapDispatchToProps = { setNotificationAction };

export default connect(mapStateToProps, mapDispatchToProps)(BookmarksContainer);
