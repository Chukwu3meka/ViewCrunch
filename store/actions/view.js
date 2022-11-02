import { addError, removeError } from "./error";
import { fetchViews } from "@utils/clientFbQuery";

export const getViewsAction = ({ crunch, reduxMyID, reduxLastVisible, reduxBlacklist }) => {
  return async (dispatch) => {
    try {
      const { lastVisible, views, blacklist, bookmarks } = await fetchViews({
        crunch,
        myID: reduxMyID,
        blacklist: reduxBlacklist,
        lastVisible: reduxLastVisible,
      });

      dispatch({ type: "VIEWS", payload: { views, blacklist, lastVisible, bookmarks } });
      dispatch(removeError("error fetching views"));
    } catch (error) {
      dispatch(addError("error fetching views"));
    }
  };
};
