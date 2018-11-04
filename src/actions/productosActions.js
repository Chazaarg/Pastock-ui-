import {
  FETCH_PRODUCTOS,
  FETCH_PRODUCTO,
  ADD_PRODUCTO,
  FETCH_MARCAS,
  ADD_MARCA,
  FETCH_CATEGORIAS,
  ADD_CATEGORIA,
  FETCH_SUBCATEGORIAS,
  ADD_SUBCATEGORIA,
  FETCH_VARIANTETIPOS,
  UPDATE_PRODUCTO,
  DELETE_PRODUCTO,
  LOG_IN,
  FETCH_USER,
  LOG_OUT
} from "./types";
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

export const getProductos = () => async dispatch => {
  const res = await axios.get("/producto");

  dispatch({
    type: FETCH_PRODUCTOS,
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

export const deleteProducto = id => async dispatch => {
  await axios.delete(`/producto/${id}/delete`);
  dispatch({
    type: DELETE_PRODUCTO,
    payload: id
  });
};

export const addProducto = producto => async dispatch => {
  const res = await axios.post("/producto/new", producto);
  dispatch({
    type: ADD_PRODUCTO,
    payload: res.data
  });
};

export const updateProducto = producto => async dispatch => {
  const res = await axios.put(`/producto/${producto.id}/edit`, producto);
  dispatch({
    type: UPDATE_PRODUCTO,
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
export const addCategoria = categoria => async dispatch => {
  const res = await axios.post("/categoria/new", categoria);
  dispatch({
    type: ADD_CATEGORIA,
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

export const addSubCategoria = subCategoria => async dispatch => {
  const res = await axios.post("/subcategoria/new", subCategoria);
  dispatch({
    type: ADD_SUBCATEGORIA,
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
export const getVarianteTipos = () => async dispatch => {
  const res = await axios.get("/variante-tipo");

  dispatch({
    type: FETCH_VARIANTETIPOS,
    payload: res.data
  });
};
