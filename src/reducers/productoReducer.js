import { FETCH_PRODUCTOS, FETCH_PRODUCTO } from "../actions/types.js";

const initState = {
  productos: [],
  producto: {}
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

    default:
      return state;
  }
}
