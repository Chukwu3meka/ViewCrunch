const profile = (state = {}, { type, payload }) => {
  switch (type) {
    case "SET_PROFILE":
      return payload;
    case "SET_NOTIFICATIONS":
      return { ...state, myNotification: payload };

    default:
      return state;
  }
};

export default profile;
