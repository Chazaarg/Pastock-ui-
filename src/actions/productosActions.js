import { FETCH_PRODUCTOS } from "./types";
import axios from "axios";

export const getProductos = () => async dispatch => {
  const res = await axios.get("/producto");

  dispatch({
    type: FETCH_PRODUCTOS,
    payload: res.data
  });
};
