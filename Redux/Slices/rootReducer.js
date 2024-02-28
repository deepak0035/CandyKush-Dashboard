// rootReducer.js
import { combineReducers } from "redux";
import dashboardSlice from "./dashboardSlice";
// Add other reducers as needed

export default combineReducers({
  dashboard: dashboardSlice,
});
