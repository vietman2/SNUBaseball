import { configureStore } from "@reduxjs/toolkit";

import { users } from "@data/users";

import authReducer, { login, logout } from "./authSlice";

const createStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
  });
};

describe("authSlice", () => {
  it("should handle initial state", () => {
    expect(authReducer(undefined, { type: "unknown" })).toEqual({
      token: "",
      user: null,
    });
  });

  it("should handle login", async () => {
    const store = createStore();
    const access = "user-token";
    const refresh = "user-refresh-token";
    const user = users[0];

    await store.dispatch(login({ access, refresh, user }));

    const state = store.getState().auth;
    expect(state.token).toEqual(access);
  });

  it("should handle logout", async () => {
    const store = createStore();

    await store.dispatch(logout());

    const state = store.getState().auth;
    expect(state.token).toEqual("");
  });
});
