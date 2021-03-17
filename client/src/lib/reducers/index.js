import { combineReducers } from "redux";
import contract from "./contract";
import storage from "./storage";

export default combineReducers({
  storage,
  contract,
  /* additional reducers here */
});
