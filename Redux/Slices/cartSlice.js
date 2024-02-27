// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  productName: "",
  productType: "",
  productQuality: "",
    lang: "",
  toggleSidebar: true,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setToggleSidebar: (state) => {
      state.toggleSidebar = !state.toggleSidebar;
    },

    addToCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    setProductName: (state, action) => {
      state.productName = action.payload;
    },
    setLang: (state, action) => {
      state.lang = action.payload;
    },
    setProductType: (state, action) => {
      state.productType = action.payload;
    },
    setProductQuality: (state, action) => {
      state.productQuality = action.payload;
    },
    incrementQuantity: (state, action) => {
      const productIndex = state.items.findIndex(
        (item) => item.productId === action.payload
      );
      if (productIndex !== -1) {
        state.items[productIndex].productQuantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const productIndex = state.items.findIndex(
        (item) => item.productId === action.payload
      );
      if (productIndex !== -1) {
        state.items[productIndex].productQuantity -= 1;
      }
    },

    removeFromCart: (state, action) => {
      const index = state.items.findIndex(
        (cartItem) => cartItem.productId === action.payload
      );
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.payload.id}), because it's not available`
        );
      }
    },
    clearCart: (state) => {
      // Reset the cart state to its initial values
      state.items = [];
      state.productName = "";
      state.productType = "";
      state.productQuality = "";
    },
  },
});

export const {
  setToggleSidebar,
  addToCart,
  setLang,
  removeFromCart,
  clearCart,
  setProductName,
  setProductType,
  setProductQuality,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

// Selector
export const selectCartItems = (state) => state.cart.items;
export const selectProductName = (state) => state.cart.productName;
export const selectLang = (state) => state.cart.lang;
export const isSidebarOpen = (state) => state.cart.toggleSidebar;

export const selectProductType = (state) => state.cart.productType;
export const selectedProductQuality = (state) => state.cart.productQuality;
export const selectTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.productPrice, 0);

export default cartSlice.reducer;
