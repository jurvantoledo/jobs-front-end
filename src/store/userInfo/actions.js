import axios from "axios";
import { apiUrl } from "../../config/constants";
import { getUserWithStoredToken } from "../user/actions";
import { selectToken } from "../user/selectors";

export const USER_DETAILS_FETCHED = "USER_DETAILS_FETCHED";
export const WEAPON_DELETE_SUCCESS = "WEAPON_DELETE_SUCCESS"
export const FILTER_WEAPONS = "FILTER_WEAPONS"

const userDetailsFetched = user => ({
    type: USER_DETAILS_FETCHED,
    payload: user
  });

  export const filterWeapons = weapons => ({
    type: FILTER_WEAPONS,
    weapons
  });

  export const weaponDeleteSuccess = userId => ({
    type: WEAPON_DELETE_SUCCESS,
    payload: userId
  });

  export const fetchUserById = id => {
    return async (dispatch, getState) => {
      const response = await axios.get(
        `${apiUrl}/user/${id}`
        );
      console.log(response);
      dispatch(userDetailsFetched(response.data.user));
    };
  };

  export const deleteWeapon = (id) => {
    return async (dispatch, getState) => {
      const token = selectToken(getState());
  
      if (token === null) return;
      try {
        const response = await axios.delete(`${apiUrl}/weapon/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("this is response", response);
        dispatch(getUserWithStoredToken());
      } catch (error) {
        if (error.response) {
          console.log(error.response.message);
        } else {
          console.log(error);
        }
      }
    };
  };