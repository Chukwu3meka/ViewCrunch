import { addError, removeError } from "./error";

export const setProfileAction = ({
  myProfilePicture,
  myCoverPicture,
  myHandle,
  myDisplayName,
  myToken,
  myProfession,
  myNotification,
  myRefresh,
}) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "SET_PROFILE",
        payload: { myProfilePicture, myCoverPicture, myHandle, myDisplayName, myToken, myProfession, myNotification, myRefresh },
      });
      dispatch(removeError("author not valid"));
    } catch {
      dispatch(addError("author not valid"));
    }
  };
};

// export const setTheme = (data) => async (dispatch) => dispatch({ type: "THEME", payload: data });
