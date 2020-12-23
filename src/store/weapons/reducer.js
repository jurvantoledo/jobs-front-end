import { WEAPONS_FETCHED } from "./actions";

const initialState = { }; 

export default (state = initialState, { type, payload }) => {
  switch (type) {  
    case WEAPONS_FETCHED:
      return { ...state, ...payload };

    default:
      return state;
  }
};