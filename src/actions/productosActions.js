import {
  FETCH_PRODUCTOS,
  FETCH_PRODUCTO,
  ADD_PRODUCTO,
  FETCH_MARCAS,
  ADD_MARCA,
  FETCH_CATEGORIAS,
  FETCH_SUBCATEGORIAS
} from "./types";
import axios from "axios";

export const getProductos = () => async dispatch => {
  const res = await axios.get("/producto");

  dispatch({
    type: FETCH_PRODUCTOS,
    payload: res.data
  });
};

export const addProducto = producto => async dispatch => {
  const res = await axios.post("/producto/new", producto);
  dispatch({
    type: ADD_PRODUCTO,
    payload: res.data
  });
};

export const getCategorias = () => async dispatch => {
  const res = await axios.get("/categoria");

  dispatch({
    type: FETCH_CATEGORIAS,
    payload: res.data
  });
};
export const getSubcategorias = () => async dispatch => {
  const res = await axios.get("/subcategoria");

  dispatch({
    type: FETCH_SUBCATEGORIAS,
    payload: res.data
  });
};

export const addMarca = marca => async dispatch => {
  const res = await axios.post("/marca/new", marca);
  dispatch({
    type: ADD_MARCA,
    payload: res.data
  });
};

export const getMarcas = () => async dispatch => {
  const res = await axios.get("/marca");

  dispatch({
    type: FETCH_MARCAS,
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
