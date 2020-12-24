import { 
  WEAPONS_FETCHED, 
  ELEMENT_POST_SUCCESS 
} from "./actions";

const initialState = { }; 

export default (state = initialState, { type, payload }) => {
  switch (type) {  
    case WEAPONS_FETCHED:
      return { ...state, ...payload };

      case ELEMENT_POST_SUCCESS:
        return {
          ...state,
          weapon: {
            ...state.weapon, 
            ...payload
          }
        };

    default:
      return state;
  }
};