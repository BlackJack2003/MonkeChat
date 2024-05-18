// File: sessionReducer.ts (Reducer)
import { SessionActionTypes } from "../actions/sessionAction.ts";

// Define initial state
const initialState = {};

// Define reducer
const sessionReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SessionActionTypes.SET_IMAGE:
      return {
        ...state,
        image: action.payload,
      };
    case SessionActionTypes.SET_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case SessionActionTypes.SET_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    case SessionActionTypes.SET_PUBLIC_KEY:
      return {
        ...state,
        publicKey: action.payload,
      };
    case SessionActionTypes.SET_PRIVATE_KEY:
      return {
        ...state,
        privateKey: action.payload,
      };
    default:
      return state;
  }
};

export default sessionReducer;
