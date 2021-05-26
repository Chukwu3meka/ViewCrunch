import { addError, removeError } from "./error";
import { fetchViews } from "@utils/firestoreFetch";

export const getMoreViewAction = ({ crunch, blacklist, lastVisible: propLastVisible }) => {
  return async (dispatch) => {
    try {
      const { lastVisible, secondary } = await fetchViews({ lastVisible: propLastVisible, crunch, blacklist });
      dispatch(removeError("error fetching view"));
      dispatch({ type: "MORE_VIEW", payload: secondary });
      dispatch({ type: "LAST_VISIBLE", payload: lastVisible });
    } catch (err) {
      dispatch(addError("error fetching articles"));
    }
  };
};
