export const setUserAtBottom = (data) => async (dispatch) => dispatch({ type: "USER_AT_BOTTOM", payload: data });

export const setDisplayHeader = (data) => async (dispatch) => dispatch({ type: "DISPLAY_HEADER", payload: data });

export const setDeviceWidth = (data) => async (dispatch) => dispatch({ type: "DEVICE_WIDTH", payload: data });

export const setOnlineAction = (data) => async (dispatch) => dispatch({ type: "ONLINE_STATUS", payload: data });

export const setTheme = (data) => async (dispatch) => dispatch({ type: "THEME", payload: data });
