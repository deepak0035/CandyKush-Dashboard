"use client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "@/Redux/Slices/rootReducer";
const store = configureStore({ reducer });

const reduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default reduxProvider;
