import { combineReducers } from "redux";
import contract from "./contract";
import storage from "./storage";
import greeting from "./greeting";

export default combineReducers({
  storage,
  contract,
  greeting,
  /* additional reducers here */
});
