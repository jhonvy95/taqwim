import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Status = "checking" | "authenticated" | "not-authenticated";

type User = {
  name?: string;
  uid?: string;
};
interface AuthState {
  status: Status;
  user: User;
  errorMessage: string | undefined;
}

const initialState: AuthState = {
  status: "checking",
  user: {},
  errorMessage: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }: PayloadAction<User>) => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }: PayloadAction<string | undefined>) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;

export default authSlice.reducer;
