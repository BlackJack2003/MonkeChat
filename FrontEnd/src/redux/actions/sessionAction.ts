// File: sessionActions.ts (Actions)

// Define action types

export interface sessionInterface {
  image?: string;
  password?: string;
  username?: string;
  email?: string;
  public_key?: string;
  private_key?: string;
}

export enum SessionActionTypes {
  SET_IMAGE = "SET_IMAGE",
  SET_USERNAME = "SET_USERNAME",
  SET_PASSWORD = "SET_PASSWORD",
  SET_PUBLIC_KEY = "SET_PUBLIC_KEY",
  SET_PRIVATE_KEY = "SET_PRIVATE_KEY",
  SET_SESSION = "SET_SESSION",
  SET_EMAIL = "SET_EMAIL",
  SIGN_OUT = "SIGN_OUT",
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

export const setEmail = (payload: string) => ({
  type: SessionActionTypes.SET_EMAIL,
  payload: payload,
});

export const setSession = (payload: sessionInterface) => ({
  type: SessionActionTypes.SET_SESSION,
  payload: payload,
});

export const setSignOut = () => ({
  type: SessionActionTypes.SIGN_OUT,
});
