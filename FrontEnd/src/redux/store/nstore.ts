import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../reducers/themeReducer";
import sessionReducer from "../reducers/sessionReducer";

export const makeStore = () => {
  var store = configureStore({
    reducer: {
      theme: themeReducer,
      session: sessionReducer,
    },
  });

  return store;
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
