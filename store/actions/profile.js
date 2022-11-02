import { addError, removeError } from "./error";

export const setProfileAction = (profile) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "SET_PROFILE",
        payload: profile,
      });
      dispatch(removeError("profile not valid"));
    } catch {
      dispatch(addError("profile not valid"));
    }
  };
};

export const setNotificationAction = (notification) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "SET_NOTIFICATIONS",
        payload: notification,
      });
      dispatch(removeError("notification error"));
    } catch {
      dispatch(addError("notification error"));
    }
  };
};

// export const setTheme = (data) => async (dispatch) => dispatch({ type: "THEME", payload: data });
