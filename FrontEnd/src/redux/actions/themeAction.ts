// File: themeActions.ts (Actions)

// Define action types
export enum ThemeActionTypes {
	SET_THEME_DARK = 'SET_THEME_DARK',
	SET_THEME_LIGHT = 'SET_THEME_LIGHT'
  };
  
  // Define action creators
  export const setThemeDark = () => ({
	type: ThemeActionTypes.SET_THEME_DARK
  });
  
  export const setThemeLight = () => ({
	type: ThemeActionTypes.SET_THEME_LIGHT
  });
  
  