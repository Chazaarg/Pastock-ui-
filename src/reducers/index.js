import { combineReducers } from "redux";
import productoReducer from "./productoReducer.js";
import usuarioReducer from "./usuarioReducer.js";

export default combineReducers({
  producto: productoReducer,
  usuario: usuarioReducer
});
