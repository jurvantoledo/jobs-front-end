import axios from "axios";
import { apiUrl } from "../../config/constants";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage
} from "../appState/actions";
import { getUserWithStoredToken } from "../user/actions";
import { selectToken } from "../user/selectors";
import { selectWeapons } from "./selectors";

export const WEAPONS_FETCHED = "WEAPONS_FETCHED"
export const ELEMENT_POST_SUCCESS = "ELEMENT_POST_SUCCESS";
export const ELEMENT_DELETE_SUCCESS = "ELEMENT_DELETE_SUCCESS";

const weaponFetched = weapon => ({
    type: WEAPONS_FETCHED,
    payload: weapon
  });

  export const elementPostSuccess = weapon => ({
    type: ELEMENT_POST_SUCCESS,
    payload: weapon
  });

  export const elementDeleteSuccess = weaponId => ({
    type: ELEMENT_DELETE_SUCCESS,
    payload: weaponId
  });

  
  export const fetchWeaponById = id => {
    return async (dispatch, getState) => {
      const response = await axios.get(`${apiUrl}weapon/${id}`);
      console.log(response);
      dispatch(weaponFetched(response.data.weapon));
    };
  };

  export const addElement = (name) => {
    return async (dispatch, getState) => {
      const { id } = selectWeapons(getState());
      console.log(id)
      dispatch(appLoading());
      try {
        const response = await axios.post(
          `${apiUrl}/weapon/${id}`, {
          name,
        });
  
        dispatch(elementPostSuccess(response.data));
        dispatch(showMessageWithTimeout("success", true, "element created"));
        dispatch(appDoneLoading());
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
          dispatch(setMessage("danger", true, error.response.data.message));
        } else {
          console.log(error.message);
          dispatch(setMessage("danger", true, error.message));
        }
        dispatch(appDoneLoading());
      }
    };
  };

  export const deleteElement = (id) => {
    return async (dispatch, getState) => {
      const token = selectToken(getState());
  
      if (token === null) return;
      try {
        const response = await axios.delete(`${apiUrl}element/${id}`, {
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