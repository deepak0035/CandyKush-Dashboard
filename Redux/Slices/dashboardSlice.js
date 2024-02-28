// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentFilter: '',
  toggleSidebar: true,
};

export const cartSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setToggleSidebar: (state) => {
      state.toggleSidebar = !state.toggleSidebar;
    },
    setPaymentFilter: (state, action) => {
      state.paymentFilter = action.payload;
    },
 
  },
});

export const {
  setToggleSidebar,
  setPaymentFilter,
} = cartSlice.actions;

// Selector
export const selectPaymentFilter = (state) => state.dashboard.paymentFilter;
export const isSidebarOpen = (state) => state.dashboard.toggleSidebar;


export default cartSlice.reducer;
