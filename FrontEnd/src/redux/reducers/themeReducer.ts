// File: themeReducer.ts (Reducer)
import { ThemeActionTypes } from "../actions/themeAction.ts";

// Define initial state
const initialState = {
  darkMode: false,
};

// Define reducer
const themeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ThemeActionTypes.SET_THEME_DARK:
      return {
        ...state,
        darkMode: true,
      };
    case ThemeActionTypes.SET_THEME_LIGHT:
      return {
        ...state,
        darkMode: false,
      };
    default:
      return state;
  }
};

export default themeReducer;
