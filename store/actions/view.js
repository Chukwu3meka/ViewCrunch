import { addError, removeError } from "./error";
import { fetchViews } from "@utils/firestoreFetch";

export const getViewAction = ({ handle, reduxLastVisible }) => {
  return async (dispatch) => {
    try {
      const { lastVisible, views, blacklist } = await fetchViews({
        handle,
        blacklist,
        lastVisible: reduxLastVisible,
      });

      dispatch({ type: "VIEWS", payload: views });
      dispatch({ type: "BLACKLIST", payload: blacklist });
      dispatch({ type: "LAST_VISIBLE", payload: lastVisible });
      dispatch(removeError("error fetching view"));
    } catch (error) {
      console.log(error);
      dispatch(addError("error fetching articles"));
    }
  };
};

export const getMoreViewAction = ({ crunch, reduxBlacklist, reduxLastVisible }) => {
  return async (dispatch) => {
    try {
      const { lastVisible, secondary, blacklist } = await fetchViews({
        crunch,
        blacklist: reduxBlacklist,
        lastVisible: reduxLastVisible,
      });

      dispatch({ type: "SECONDARY", payload: secondary });
      dispatch({ type: "BLACKLIST", payload: blacklist });
      dispatch({ type: "LAST_VISIBLE", payload: lastVisible });
      dispatch(removeError("error fetching view"));
    } catch (error) {
      dispatch(addError("error fetching articles"));
    }
  };
};

export const resetViewAction = () => async (dispatch) => dispatch({ type: "SECONDARY", payload: [] });
