import {
  FETCH_PRODUCTOS,
  FETCH_PRODUCTO,
  ADD_PRODUCTO,
  FETCH_MARCAS,
  ADD_MARCA,
  FETCH_CATEGORIAS,
  FETCH_SUBCATEGORIAS
} from "../actions/types.js";

const initState = {
  productos: [],
  producto: {},
  marcas: [],
  categorias: [],
  subcategorias: []
};

export default function(state = initState, action) {
  switch (action.type) {
    case FETCH_PRODUCTOS:
      return {
        ...state,
        productos: action.payload
      };
    case FETCH_PRODUCTO:
      return {
        ...state,
        producto: action.payload
      };
    case ADD_PRODUCTO:
      return {
        ...state,
        productos: [action.payload, ...state.productos]
      };
    case ADD_MARCA:
      return {
        ...state,
        marcas: [action.payload, ...state.marcas]
      };
    case FETCH_MARCAS:
      return {
        ...state,
        marcas: action.payload
      };
    case FETCH_CATEGORIAS:
      return {
        ...state,
        categorias: action.payload
      };
    case FETCH_SUBCATEGORIAS:
      return {
        ...state,
        subcategorias: action.payload
      };

    default:
      return state;
  }
}
