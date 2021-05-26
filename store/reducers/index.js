import { combineReducers } from "redux";

import device from "./device";
import view from "./view";
import profile from "./profile";
import error from "./error";

export default combineReducers({
  device,
  view,
  profile,
  error,
});
