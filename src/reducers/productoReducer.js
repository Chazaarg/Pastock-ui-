import { FETCH_PRODUCTOS } from "../actions/types.js";

const initState = {
  productos: []
};

export default function(state = initState, action) {
  switch (action.type) {
    case FETCH_PRODUCTOS:
      return {
        ...state,
        productos: action.payload
      };

    default:
      return state;
  }
}
