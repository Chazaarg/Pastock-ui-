import { FETCH_PRODUCTOS } from "./types";
import axios from "axios";

export const getProductos = () => async dispatch => {
  const res = await axios.get("http://127.0.0.1:8000/producto");

  dispatch({
    type: FETCH_PRODUCTOS,
    payload: res.data
  });
};
