import { addError, removeError } from "./error";
import { fetchViews } from "@utils/firestoreFetch";

export const getMoreViewAction = ({ crunch, reduxBlacklist, reduxLastVisible }) => {
  return async (dispatch) => {
    try {
      const { lastVisible, secondary, blacklist } = await fetchViews({
        crunch,
        blacklist: reduxBlacklist,
        lastVisible: reduxLastVisible,
      });

      dispatch(removeError("error fetching view"));
      dispatch({ type: "BLACKLIST", payload: blacklist });
      dispatch({ type: "LAST_VISIBLE", payload: lastVisible });
      dispatch({ type: "SECONDARY", payload: !secondary.length && lastVisible === "no other view" ? "no other view" : secondary });
    } catch (error) {
      dispatch(addError("error fetching articles"));
    }
  };
};

export const resetViewAction = () => async (dispatch) => dispatch({ type: "SECONDARY", payload: [] });
