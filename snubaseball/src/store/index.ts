import {
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";

import authReducer from "./auth/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
