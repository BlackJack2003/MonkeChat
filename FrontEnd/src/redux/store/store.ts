// store.ts
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../reducers/themeReducer';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    // other reducers can be added here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;