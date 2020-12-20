import { 
  LOG_OUT, 
  LOGIN_SUCCESS, 
  TOKEN_STILL_VALID, 
  USER_DETAILS_FETCHED
} from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  weapons: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload, };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

      case USER_DETAILS_FETCHED:
        return {
          ...state,
          weapons: {
            ...state, 
            ...action.payload
          }
        };

    default:
      return state;
  }
};
