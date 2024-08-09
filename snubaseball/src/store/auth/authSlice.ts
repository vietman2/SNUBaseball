import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthUser } from "@type/user";

const initialState: {
  user: AuthUser | null;
  token: string;
} = {
  user: null,
  token: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (data: { access: string; refresh: string; user: AuthUser }) => {
    return data;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  return null;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      login.fulfilled,
      (
        state,
        action: PayloadAction<{
          access: string;
          refresh: string;
          user: AuthUser;
        }>
      ) => {
        state.user = action.payload.user;
        state.token = action.payload.access;
      }
    );
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.token = "";
    });
  },
});

export default authSlice.reducer;
