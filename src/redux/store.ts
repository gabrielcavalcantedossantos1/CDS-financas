import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import themeSlice from "./slice/themeSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
