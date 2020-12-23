import axios from "axios";
import { apiUrl } from "../../config/constants";

export const WEAPONS_FETCHED = "WEAPONS_FETCHED"

const weaponFetched = weapon => ({
    type: WEAPONS_FETCHED,
    payload: weapon
  });
  
  export const fetchWeaponById = id => {
    return async (dispatch, getState) => {
      const response = await axios.get(`${apiUrl}/weapon/${id}`);
      console.log(response);
      dispatch(weaponFetched(response.data.weapon));
    };
  };