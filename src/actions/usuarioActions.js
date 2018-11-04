import { FETCH_USER, LOG_OUT, LOG_IN } from "../actions/types.js";
import axios from "axios";

export const login = user => async dispatch => {
  const res = await axios.post("/login", user);
  dispatch({
    type: LOG_IN,
    payload: res.data
  });
};

export const logOut = () => async dispatch => {
  const res = await axios.get("/logout");

  dispatch({
    type: LOG_OUT,
    payload: res.data
  });
};

export const getUsuario = () => async dispatch => {
  const res = await axios.get("/user");

  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};
