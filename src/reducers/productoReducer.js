import {
  FETCH_PRODUCTOS,
  FETCH_PRODUCTO,
  FETCH_MARCAS,
  FETCH_CATEGORIAS
} from "../actions/types.js";

const initState = {
  productos: [],
  producto: {},
  marcas: [],
  categorias: []
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

    default:
      return state;
  }
}
