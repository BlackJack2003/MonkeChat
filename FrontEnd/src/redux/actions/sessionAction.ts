// File: sessionActions.ts (Actions)

// Define action types
export enum SessionActionTypes {
  SET_IMAGE = "SET_IMAGE",
  SET_USERNAME = "SET_USERNAME",
  SET_PASSWORD = "SET_PASSWORD",
  SET_PUBLIC_KEY = "SET_PUBLIC_KEY",
  SET_PRIVATE_KEY = "SET_PRIVATE_KEY",
}

// Define action creators
export const setImage = (payload: string) => ({
  type: SessionActionTypes.SET_IMAGE,
  payload: payload,
});

export const setUsername = (payload: string) => ({
  type: SessionActionTypes.SET_USERNAME,
  payload: payload,
});

export const setPassword = (payload: string) => ({
  type: SessionActionTypes.SET_PASSWORD,
  payload: payload,
});

export const setPublicKey = (payload: string) => ({
  type: SessionActionTypes.SET_PUBLIC_KEY,
  payload: payload,
});

export const setPrivateKey = (payload: string) => ({
  type: SessionActionTypes.SET_PRIVATE_KEY,
  payload: payload,
});
