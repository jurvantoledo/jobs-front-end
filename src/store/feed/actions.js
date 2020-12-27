import { apiUrl, DEFAULT_PAGINATION_LIMIT } from "../../config/constants";
import axios from "axios";
import { appDoneLoading } from "../appState/actions";

export const START_LOADING = "START_LOADING"
export const USERS_FETCHED = "USERS_FETCHED"

export function startLoading() {
  return {
    type: START_LOADING,
  };
}

export function storesFetched(users) {
  return {
    type: USERS_FETCHED,
    payload: users,
  };
}

export const fetchNext5Stores = (users) => {
    return async (dispatch, getState) => {
      dispatch(startLoading);
      const response = await axios.get(
        `${apiUrl}/user?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${users.length}`
      );
        
      const moreUsers = response.data.users;
  
      dispatch(storesFetched(moreUsers));
      dispatch(appDoneLoading)
      console.log("More USERS", moreUsers);
    };
};