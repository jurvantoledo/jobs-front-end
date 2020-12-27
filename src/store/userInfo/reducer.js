import { 
    USER_DETAILS_FETCHED,
    FILTER_WEAPONS
  } from "./actions";
  
  const initialState = []
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {  
      case USER_DETAILS_FETCHED:
      let index = state.findIndex(u => u.u_id === payload.u_id);
  
      if(index === -1)
        return [
          ...state, 
          {...payload}
        ];

      case FILTER_WEAPONS:
      return {
        ...state,
        weapons: payload.weapons
      };
  
      default:
        return state;
    }
  };