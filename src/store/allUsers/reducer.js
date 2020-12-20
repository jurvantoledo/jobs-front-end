import {  USERS_FETCHED } from "./actions";
  
  const initialState = []
  
  export default (state = initialState, action) => {
    switch (action.type) {
        case USERS_FETCHED:
          return [ ...state, ...action.payload ];
  
      default:
        return state;
    }
  };
  