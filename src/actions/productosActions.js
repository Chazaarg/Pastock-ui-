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
  DELETE_SUBCATEGORIA,
  FETCH_VARIANTETIPOS,
  UPDATE_PRODUCTO,
  DELETE_PRODUCTO,
  ADD_VARIANTETIPO,
  NOTIFY_USER,
  DELETE_CATEGORIA
} from "./types";
import axios from "axios";

export const getProductos = () => async dispatch => {
  const res = await axios.get("/producto");

  dispatch({
    type: FETCH_PRODUCTOS,
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
  try {
    const res = await axios.post("/producto/new", producto);
    dispatch({
      type: ADD_PRODUCTO,
      payload: res.data.producto
    });
    //Success
    dispatch({
      type: NOTIFY_USER,
      errors: null,
      message: res.data.message,
      messageType: res.data.messageType
    });
  } catch (error) {
    dispatch({
      type: NOTIFY_USER,
      message: error.response.data.message,
      messageType: error.response.data.messageType,
      errors: error.response.data.errors
    });
  }
};

export const updateProducto = producto => async dispatch => {
  try {
    const res = await axios.put(`/producto/${producto.id}/edit`, producto);
    dispatch({
      type: UPDATE_PRODUCTO,
      payload: res.data.producto
    });
    //Success
    dispatch({
      type: NOTIFY_USER,
      errors: null,
      message: res.data.message,
      messageType: res.data.messageType
    });
  } catch (error) {
    dispatch({
      type: NOTIFY_USER,
      message: error.response.data.message,
      messageType: error.response.data.messageType,
      errors: error.response.data.errors
    });
  }
};

export const getCategorias = () => async dispatch => {
  const res = await axios.get("/categoria");

  dispatch({
    type: FETCH_CATEGORIAS,
    payload: res.data
  });
};
export const addCategoria = categoria => async dispatch => {
  try {
    const res = await axios.post("/categoria/new", categoria);
    dispatch({
      type: ADD_CATEGORIA,
      payload: res.data.categoria
    });
    //Success
    dispatch({
      type: NOTIFY_USER,
      errors: null,
      message: res.data.message,
      messageType: res.data.messageType
    });
  } catch (error) {
    dispatch({
      type: NOTIFY_USER,
      message: error.response.data.message,
      messageType: error.response.data.messageType,
      errors: error.response.data.errors
    });
  }
};
export const deleteCategoria = id => async dispatch => {
  await axios.delete(`/categoria/${id}`);
  dispatch({
    type: DELETE_CATEGORIA,
    payload: id
  });
};

export const getSubcategorias = () => async dispatch => {
  const res = await axios.get("/subcategoria");

  dispatch({
    type: FETCH_SUBCATEGORIAS,
    payload: res.data
  });
};

export const deleteSubcategoria = id => async dispatch => {
  await axios.delete(`/subcategoria/${id}`);
  dispatch({
    type: DELETE_SUBCATEGORIA,
    payload: id
  });
};

export const addSubCategoria = subCategoria => async dispatch => {
  try {
    const res = await axios.post("/subcategoria/new", subCategoria);
    dispatch({
      type: ADD_SUBCATEGORIA,
      payload: res.data.subcategoria
    });
    //Success
    dispatch({
      type: NOTIFY_USER,
      errors: null,
      message: res.data.message,
      messageType: res.data.messageType
    });
  } catch (error) {
    dispatch({
      type: NOTIFY_USER,
      message: error.response.data.message,
      messageType: error.response.data.messageType,
      errors: error.response.data.errors
    });
  }
};

export const addMarca = marca => async dispatch => {
  try {
    const res = await axios.post("/marca/new", marca);
    dispatch({
      type: ADD_MARCA,
      payload: res.data.marca
    });
    //Success
    dispatch({
      type: NOTIFY_USER,
      errors: null,
      message: res.data.message,
      messageType: res.data.messageType
    });
  } catch (error) {
    dispatch({
      type: NOTIFY_USER,
      message: error.response.data.message,
      messageType: error.response.data.messageType,
      errors: error.response.data.errors
    });
  }
};

export const addVarianteTipo = varianteTipo => async dispatch => {
  try {
    const res = await axios.post("/variante-tipo/new", varianteTipo);
    dispatch({
      type: ADD_VARIANTETIPO,
      payload: res.data.varianteTipo
    });
    //Success
    dispatch({
      type: NOTIFY_USER,
      errors: null,
      message: res.data.message,
      messageType: res.data.messageType
    });
  } catch (error) {
    dispatch({
      type: NOTIFY_USER,
      message: error.response.data.message,
      messageType: error.response.data.messageType,
      errors: error.response.data.errors
    });
  }
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
