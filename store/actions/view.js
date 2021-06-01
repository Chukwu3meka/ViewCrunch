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
      dispatch({ type: "SECONDARY", payload: secondary });
      dispatch({ type: "LAST_VISIBLE", payload: lastVisible });
      dispatch({ type: "BLACKLIST", payload: blacklist });
    } catch (error) {
      console.log(error);
      dispatch(addError("error fetching articles"));
    }
  };
};
