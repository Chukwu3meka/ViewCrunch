const article = (state = {}, { type, payload }) => {
  switch (type) {
    case "MORE_ARTICLES_FETCHED":
      return { ...state, moreArticles: payload };
    case "ARTICLES_READ":
      return { ...state, articlesRead: payload };
    case "LAST_VISIBLE":
      return { ...state, lastVisible: payload };
    default:
      return state;
  }
};

export default article;
