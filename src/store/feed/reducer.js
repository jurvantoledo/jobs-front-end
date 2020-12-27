import { 
    START_LOADING, 
    USERS_FETCHED 
  } from "./actions";
  
  const initialState = {
      loading: false,
      users: [],
    };
    
    export default (state = initialState, action) => {
      switch (action.type) {
        case START_LOADING: {
          return {
            ...state,
            loading: true,
          };
        }
        case USERS_FETCHED: {
          return {
            loading: false,
            users: [...state.users, ...action.payload],
          };
        }
  
        default: {
          return state;
        }
      }
    }