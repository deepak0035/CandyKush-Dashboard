import { configureStore } from "@reduxjs/toolkit";
import dashboardSlice from "../Slices/dashboardSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice,
  },
});
