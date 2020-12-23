import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import allUsers from "./allUsers/reducer"
import userInfo from "./userInfo/reducer"
import weapon from "./weapons/reducer"

export default combineReducers({
  appState,
  user,
  allUsers,
  userInfo,
  weapon
});
