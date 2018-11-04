import {
  FETCH_USER,
  LOG_OUT,
  LOG_IN,
  NOTIFY_USER,
  REGISTER_USER
} from "../actions/types.js";
import axios from "axios";

export const login = user => async dispatch => {
  try {
    const res = await axios.post("/login", user);
    dispatch({
      type: LOG_IN,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: NOTIFY_USER,
      message: error.response.data.error,
      messageType: "error"
    });
  }
};

export const logOut = () => async dispatch => {
  const res = await axios.get("/logout");

  dispatch({
    type: LOG_OUT,
    payload: res.data
  });
};

export const registerUser = user => async dispatch => {
  try {
    const res = await axios.post("/registration", user);
    dispatch({
      type: REGISTER_USER,
      payload: res.data.user
    });
    dispatch({
      type: NOTIFY_USER,
      message: res.data.message,
      messageType: res.data.messageType
    });
  } catch (error) {
    dispatch({
      type: NOTIFY_USER,
      message: "Error al registrarse.",
      messageType: "error"
    });
  }
};

export const getUsuario = () => async dispatch => {
  const res = await axios.get("/user");

  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};
