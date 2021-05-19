import { addError, removeError } from "./error";
import { fetchViews } from "@utils/firestoreFetch";

export const getMoreArticlesAction = async ({ navTag, lastVisible, articlesRead }) => {
  return async (dispatch) => {
    try {
      const { articles, propsArticlesRead, propsLastVisible } = await fetchViews({
        navTag,
        lastVisible,
        articlesRead,
      });
      dispatch(removeError("error fetching articles"));
      dispatch({ type: "LAST_VISIBLE", payload: propsLastVisible });
      dispatch({ type: "MORE_ARTICLES_FETCHED", payload: articles });
      dispatch({ type: "ARTICLES_READ", payload: propsArticlesRead });
    } catch (err) {
      dispatch(addError("error fetching articles"));
    }
  };
};
