import { apiUrl } from "../../config/constants";
import axios from "axios";

export const USERS_FETCHED = "USERS_FETCHED"

export const usersFetched = users => ({
    type: USERS_FETCHED,
    payload: users
  });

export const fetchAllUsers = () => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.get(`${apiUrl}/user`);
  
        dispatch(usersFetched(response.data.users.rows));
      } catch (error) {
        if (error.response) {
          console.log(error.response.message);
        } else {
          console.log(error);
        }
      }
    };
  };