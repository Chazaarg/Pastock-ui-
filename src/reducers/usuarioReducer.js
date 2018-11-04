import { FETCH_USER, LOG_OUT, LOG_IN } from "../actions/types.js";

const initState = {
  usuario: {}
};

export default function(state = initState, action) {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        usuario: action.payload
      };
    case LOG_OUT:
      return {
        ...state,
        usuario: { user: "anonymous" }
      };
    case FETCH_USER:
      return {
        ...state,
        usuario: action.payload
      };

    default:
      return state;
  }
}
