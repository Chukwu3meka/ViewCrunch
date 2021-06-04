const view = (state = {}, { type, payload }) => {
  switch (type) {
    case "SECONDARY":
      return { ...state, secondary: payload };
    case "BLACKLIST":
      return { ...state, blacklist: payload };
    case "LAST_VISIBLE":
      return { ...state, lastVisible: payload };
    default:
      return state;
  }
};

export default view;
