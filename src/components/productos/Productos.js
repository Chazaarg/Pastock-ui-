import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProductos } from "../../actions/productosActions";
import { createLoadingSelector } from "../../helpers/CreateLoadingSelector";
import Loader from "react-loader";

class Productos extends Component {
  state = {};
  componentDidMount() {
    this.props.getProductos();
  }

  static getDerivedStateFromProps(props, state) {
    const { loading } = props;
    //Cuando se sale, le asigno false a FETCH_PRODUCTOS, para que vuelva a cargar la página al volver.
    if (loading.FETCH_PRODUCTOS) {
      return (loading["FETCH_PRODUCTOS"] = false);
    }
    return state;
  }

  render() {
    const { productos, isFetching } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <h2>Productos</h2>
        </div>

        <Loader loaded={isFetching}>
          <table className="table table-stripped">
            <thead className="thead-inverse">
              <tr>
                <th>Nombre</th>
                <th>Marca</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Variante</th>
                <th>Categoria</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {productos
                ? productos.map(producto => (
                    <tr key={producto.id}>
                      <td>{producto.nombre}</td>
                      <td>{producto.marca ? producto.marca.nombre : null}</td>
                      {producto.variantes ? (
                        <React.Fragment>
                          <td>
                            {producto.variantes.map(variante => (
                              <table key={variante.id}>
                                <tbody>
                                  <tr>
                                    <td>
                                      ${parseFloat(variante.precio).toFixed(2)}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            ))}
                          </td>
                          <td>
                            {producto.variantes.map(variante => (
                              <table key={variante.id}>
                                <tbody>
                                  <tr>
                                    <td>{variante.cantidad}</td>
                                  </tr>
                                </tbody>
                              </table>
                            ))}
                          </td>
                          <td>
                            {producto.variantes.map(variante => (
                              <table key={variante.id}>
                                <tbody>
                                  <tr>
                                    <td>{variante.nombre}</td>
                                  </tr>
                                </tbody>
                              </table>
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
                        {producto.categoria ? producto.categoria.nombre : null}{" "}
                        {producto.sub_categoria
                          ? "> " + producto.sub_categoria.nombre
                          : null}
                      </td>
                      <td>
                        <Link
                          to={`/producto/${producto.id}/show`}
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
                  ))
                : null}
            </tbody>
          </table>
        </Loader>
      </div>
    );
  }
}

const loadingSelector = createLoadingSelector(["FETCH_PRODUCTOS"]);

Productos.propTypes = {
  productos: PropTypes.array.isRequired,
  getProductos: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  productos: state.producto.productos,
  isFetching: loadingSelector(state),
  loading: state.loading
});

export default connect(
  mapStateToProps,
  { getProductos }
)(Productos);
