import { FETCH_PRODUCTOS } from "../actions/types";

const initState = {
  productos: [
    {
      id: 123,
      nombre: "Better Than Sex",
      marca: "Too Faced",
      precio: 100,
      cantidad: 6,
      categoria: "Rostro"
    },
    {
      id: 1234,
      nombre: "Lipstick",
      marca: "MAC",
      precio: 100,
      cantidad: 6,
      variantes: [
        {
          id: 333,
          nombre: "Pink",
          cantidad: 2,
          precio: 200
        },
        {
          id: 334,
          nombre: "Chicksssssszzz",
          cantidad: 3,
          precio: 250
        },
        {
          id: 335,
          nombre: "Buba",
          cantidad: 2,
          precio: 200
        }
      ],
      categoria: "Labios"
    }
  ]
};

export default function(state = initState, action) {
  switch (action.type) {
    case FETCH_PRODUCTOS:
      return {
        ...state
      };

    default:
      return state;
  }
}
