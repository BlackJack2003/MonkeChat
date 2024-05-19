// File: sessionReducer.ts (Reducer)
import {
  SessionActionTypes,
  sessionInterface,
} from "../actions/sessionAction.ts";

// Define initial session state
const initialState: sessionInterface = {
  image: "",
  password: "",
  email: "",
  username: "",
  public_key: "",
  private_key: "",
};

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
        public_key: action.payload,
      };
    case SessionActionTypes.SET_PRIVATE_KEY:
      return {
        ...state,
        private_key: action.payload,
      };
    case SessionActionTypes.SET_SESSION:
      var rv: sessionInterface = action.payload;
      return rv;
    default:
      return state;
  }
};

export default sessionReducer;
