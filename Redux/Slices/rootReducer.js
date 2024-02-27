// rootReducer.js
import { combineReducers } from "redux";
import cartSlice from "./cartSlice";
// Add other reducers as needed

export default combineReducers({
  cart: cartSlice,
});
