import { FETCH_PRODUCTOS, FETCH_PRODUCTO } from "./types";
import axios from "axios";

export const getProductos = () => async dispatch => {
  const res = await axios.get("/producto");

  dispatch({
    type: FETCH_PRODUCTOS,
    payload: res.data
  });
};

export const getProducto = id => async dispatch => {
  const res = await axios.get(`/producto/${id}`);

  dispatch({
    type: FETCH_PRODUCTO,
    payload: res.data
  });
};
