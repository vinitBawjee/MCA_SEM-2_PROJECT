import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import buyerReducer from "../features/buyer/buyerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    buyer: buyerReducer,   // 🔥 MUST EXIST
  },
});