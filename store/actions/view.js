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

      dispatch({ type: "SECONDARY", payload: secondary });
      dispatch({ type: "BLACKLIST", payload: blacklist });
      dispatch({ type: "LAST_VISIBLE", payload: lastVisible });
      dispatch(removeError("error fetching view"));

      console.log(lastVisible);
    } catch (error) {
      dispatch(addError("error fetching articles"));
    }
  };
};

export const resetViewAction = () => async (dispatch) => dispatch({ type: "SECONDARY", payload: [] });
