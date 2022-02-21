import { addError, removeError } from "./error";
import { fetchViews } from "@utils/firestoreFetch";

export const getViewsAction = ({ reduxMyID, reduxLastVisible, reduxBlacklist, initialFetch = false }) => {
  return async (dispatch) => {
    try {
      const { lastVisible, views, blacklist, bookmarks } = await fetchViews({
        initialFetch,
        myID: reduxMyID,
        blacklist: reduxBlacklist,
        lastVisible: reduxLastVisible,
      });

      dispatch({ type: "VIEWS", payload: { views, blacklist, lastVisible, bookmarks } });
      dispatch(removeError("error fetching view"));
    } catch (error) {
      dispatch(addError("error fetching articles"));
    }
  };
};
