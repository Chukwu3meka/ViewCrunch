const view = (state = {}, { type, payload }) => {
  switch (type) {
    case "MORE_VIEW":
      return { ...state, moreView: payload };
    case "LAST_VISIBLE":
      return { ...state, lastVisible: payload };
    case "BLACKLIST":
      return { ...state, blacklist: payload };
    default:
      return state;
  }
};

export default view;
