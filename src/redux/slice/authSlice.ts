import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../@types/Auth";

interface AuthState {
  user: User | null;
  authToken: string | null;
  AuthStatus: "authenticated" | "not_authenticated" | "not_verified";
}

const initialState: AuthState = {
  user: null,
  authToken: null,
  AuthStatus: "not_verified",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState["user"]>) => {
      state.user = action.payload;
    },
    setAuthToken: (state, action: PayloadAction<AuthState["authToken"]>) => {
      state.authToken = action.payload;
    },
    setAuthStatus: (state, action: PayloadAction<AuthState["AuthStatus"]>) => {
      state.AuthStatus = action.payload;
    },
  },
});

export const { setUser, setAuthToken, setAuthStatus } = authSlice.actions;

export default authSlice.reducer;
