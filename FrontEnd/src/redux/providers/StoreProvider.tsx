"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../store/nstore";
import { setThemeDark, setThemeLight } from "../actions/themeAction";

const loadState = () => {
  try {
    // Load the data saved in localStorage, against the key 'app_state'
    const serialisedState = window.localStorage.getItem("app_state");

    // Passing undefined to createStore will result in our app getting the default state
    // If no data is saved, return undefined
    if (!serialisedState) return undefined;

    // De-serialise the saved state, and return it.
    return JSON.parse(serialisedState);
  } catch (err) {
    // Return undefined if localStorage is not available,
    // or data could not be de-serialised,
    // or there was some other error
    return undefined;
  }
};

const saveState = (state: any) => {
  try {
    // Convert the state to a JSON string
    const serialisedState = JSON.stringify(state);

    // Save the serialised state to localStorage against the key 'app_state'
    window.localStorage.setItem("app_state", serialisedState);
  } catch (err) {
    // Log errors here, or ignore
  }
};

export default function StoreProvider({
  darkMode,
  children,
}: {
  darkMode: boolean;
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    const oldState = loadState();

    if (oldState != undefined && oldState.theme.darkMode) {
      storeRef.current.dispatch(setThemeDark());
    } else {
      storeRef.current.dispatch(setThemeLight());
    }
    storeRef.current.subscribe(() => saveState(storeRef.current!.getState()));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
