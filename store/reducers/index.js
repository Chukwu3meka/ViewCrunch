import { combineReducers } from "redux";

import device from "./device";
import article from "./article";
import profile from "./profile";
import error from "./error";

export default combineReducers({
  device,
  article,
  profile,
  error,
});
