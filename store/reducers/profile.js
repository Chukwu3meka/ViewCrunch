const profile = (state = {}, { type, payload }) => {
  switch (type) {
    case "SET_PROFILE":
      return payload;
    default:
      return state;
  }
};

export default profile;
