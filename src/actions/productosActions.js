import { FETCH_PRODUCTOS } from "./types";

export const getProductos = () => {
  return {
    type: FETCH_PRODUCTOS
  };
};
