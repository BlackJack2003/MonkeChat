//StroeProvider.tsx
//Needs to be chnged a
"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../store/nstore";
import { setThemeDark, setThemeLight } from "../actions/themeAction";
import { setSession } from "../actions/sessionAction";

const loadState = () => {
  try {
    // Load the data saved in localStorage, against the key 'app_state'
    if (typeof window !== undefined && window !== undefined) {
      const serialisedState = window.localStorage.getItem("app_state");

      // Passing undefined to createStore will result in our app getting the default state
      // If no data is saved, return undefined
      if (!serialisedState) return undefined;

      // De-serialise the saved state, and return it.
      return JSON.parse(serialisedState);
    }
    return undefined;
  } catch (err: any) {
    // Return undefined if localStorage is not available,
    // or data could not be de-serialised,
    // or there was some other error
    console.error(err);
    return undefined;
  }
};

const saveState = (state: any) => {
  try {
    // Convert the state to a JSON string
    const serialisedState = JSON.stringify(state);

    // Save the serialised state to localStorage against the key 'app_state'
    if (typeof window !== undefined && window != undefined)
      window.localStorage.setItem("app_state", serialisedState);
  } catch (err: any) {
    // Log errors here, or ignore
    console.error(err);
  }
};

export default function StoreProvider({
  darkMode,
  session,
  children,
}: {
  darkMode?: boolean;
  session?: any;
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
    if (oldState != undefined)
      if (oldState.session && oldState.session.password) {
        storeRef.current.dispatch(setSession(oldState.session));
      }
    storeRef.current.subscribe(() => saveState(storeRef.current!.getState()));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

persistor.subscribe(() => {
  /* Hydrate React components when persistor has synced with redux store */
  const { bootstrapped } = persistor.getState();

  if (bootstrapped) {
    const rootElement = document.getElementById("root");
    if (rootElement) {
      hydrateRoot(rootElement, <Main />);
    }
  }
});
