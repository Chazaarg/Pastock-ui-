import React, { Component } from "react";
import { Link } from "react-router-dom";

class Productos extends Component {
  render() {
    const productos = [
      {
        id: 123,
        nombre: "Better Than Sex",
        marca: "Too Faced",
        precio: 100,
        cantidad: 6
      },
      {
        id: 123,
        nombre: "Lipstick",
        marca: "MAC",
        precio: 100,
        cantidad: 6,
        variantes: [
          {
            nombre: "Pink",
            cantidad: 2,
            precio: 200
          },
          {
            nombre: "Chick",
            cantidad: 3,
            precio: 250
          },
          {
            nombre: "Buba",
            cantidad: 2,
            precio: 200
          }
        ]
      }
    ];

    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h2>Productos</h2>
          </div>

          <table className="table table-stripped">
            <thead className="thead-inverse">
              <tr>
                <th>Nombre</th>
                <th>Marca</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Variante</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {productos.map(producto => (
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  <td>{producto.marca}</td>
                  {producto.variantes ? (
                    <React.Fragment>
                      <td>
                        {producto.variantes.map(variante => (
                          <React.Fragment>
                            <tr>
                              <td>${parseFloat(variante.precio).toFixed(2)}</td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </td>
                      <td>
                        {producto.variantes.map(variante => (
                          <React.Fragment>
                            <tr>
                              <td>{variante.cantidad}</td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </td>
                      <td>
                        {producto.variantes.map(variante => (
                          <React.Fragment>
                            <tr>
                              <td>{variante.nombre}</td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </td>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <td>${parseFloat(producto.precio).toFixed(2)}</td>
                      <td>{producto.cantidad}</td>
                      <td />
                    </React.Fragment>
                  )}
                  <td>
                    <Link
                      to={`/producto/${producto.id}`}
                      className="btn btn-secondary"
                    >
                      Detalles
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/producto/${producto.id}/edit`}
                      className="btn btn-secondary"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Productos;
