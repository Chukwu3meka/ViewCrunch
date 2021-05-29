import { addError, removeError } from "./error";
import { fetchViews } from "@utils/firestoreFetch";

export const getMoreViewAction = ({ crunch, blacklist: propsBlacklist, lastVisible: propLastVisible }) => {
  return async (dispatch) => {
    try {
      const { lastVisible, secondary, blacklist } = await fetchViews({
        crunch,
        blacklist: propsBlacklist,
        lastVisible: propLastVisible,
      });

      console.log("redux fetch", lastVisible.data().title.path);

      dispatch(removeError("error fetching view"));
      dispatch({ type: "MORE_VIEW", payload: secondary });
      dispatch({ type: "LAST_VISIBLE", payload: lastVisible });
      dispatch({ type: "BLACKLIST", payload: blacklist });
    } catch (err) {
      dispatch(addError("error fetching articles"));
    }
  };
};
