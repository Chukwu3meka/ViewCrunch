const view = (state = {}, { type, payload }) => {
  switch (type) {
    case "VIEWS":
      return { ...state, views: payload };
    default:
      return state;
  }
};

export default view;
