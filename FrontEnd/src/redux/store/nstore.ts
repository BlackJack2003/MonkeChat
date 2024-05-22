// //nstore.ts
// import { configureStore } from "@reduxjs/toolkit";
// import themeReducer from "../reducers/themeReducer";
// import sessionReducer from "../reducers/sessionReducer";

// export const makeStore = () => {
//   var store = configureStore({
//     reducer: {
//       theme: themeReducer,
//       session: sessionReducer,
//     },
//   });

//   return store;
// };

// Infer the type of makeStore
// export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = AppStore["dispatch"];

import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session"; // Use sessionStorage instead of localStorage
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../reducers/themeReducer";
import sessionReducer from "../reducers/sessionReducer";

// Combine reducers
const rootReducer = combineReducers({
  theme: themeReducer,
  session: sessionReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["theme", "session"],
};

// Create a persisted reducer
//@ts-ignore
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
  });
};

// Infer the types for the store
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// Persistor
export const persistor = persistStore(makeStore());
