const device = (state = {}, { type, payload }) => {
  switch (type) {
    case "USER_AT_BOTTOM":
      return { ...state, bottomScroll: payload };
    case "DISPLAY_HEADER":
      return { ...state, headerDisplay: payload };
    case "DEVICE_WIDTH":
      return { ...state, deviceWidth: payload };
    case "ONLINE_STATUS":
      return { ...state, online: payload };
    case "THEME":
      return { ...state, theme: payload };
    default:
      return state;
  }
};

export default device;
