const view = (state = {}, { type, payload }) => {
  switch (type) {
    case "VIEWS":
      return { ...state, views: payload };
    case "BLACKLIST":
      return { ...state, blacklist: payload };
    case "LAST_VISIBLE":
      return { ...state, lastVisible: payload };
    default:
      return state;
  }
};

export default view;
