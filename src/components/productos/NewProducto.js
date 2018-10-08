import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getMarcas,
  getCategorias,
  getSubcategorias
} from "../../actions/productosActions";
import React, { Component } from "react";

class NewProducto extends Component {
  componentDidMount() {
    this.props.getMarcas();
    this.props.getCategorias();
    this.props.getSubcategorias();
  }

  state = {
    nombre: "",
    descripcion: "",
    marca: "",
    categoria: "",
    sub_categoria: "",
    precio: "",
    codigo_de_barras: "",
    cantidad: "",
    precio_compra: "",
    precio_real: ""
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const {
      nombre,
      cantidad,
      precio,
      codigo_de_barras,
      descripcion,
      marca,
      categoria,
      sub_categoria
    } = this.state;

    const { categorias, marcas, subcategorias } = this.props;

    return (
      <div>
        <h1>Nuevo Producto</h1>
        <form onSubmit={this.onSubmit}>
          <div className="card border-light mt-5">
            <div className="card-header">Nombre y Marca</div>
            <div className="card-body">
              <div className="form-row d-flex justify-content-between">
                <div className="form-group col-md-8">
                  <input
                    type="text"
                    placeholder="Nombre..."
                    name="nombre"
                    className="form-control"
                    value={nombre}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group col-md-4">
                  <select
                    name="marca"
                    value={marca}
                    className="form-control"
                    onChange={this.onChange}
                  >
                    <option>Elige una marca...</option>
                    {marcas.map(marca => (
                      <option key={marca.id} value={marca.id}>
                        {marca.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="card border-light mt-5">
            <div className="card-header">Categoria</div>
            <div className="card-body">
              <div className="form-row d-flex justify-content-between mt-3">
                <div className="form-group col-md-6">
                  <select
                    name="categoria"
                    value={categoria}
                    className="form-control"
                    onChange={this.onChange}
                  >
                    <option>Elige una categoría...</option>
                    {categorias.map(categoria => (
                      <option key={categoria.id} value={categoria.id}>
                        {categoria.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-md-4">
                  <select
                    name="sub_categoria"
                    value={sub_categoria}
                    className="form-control"
                    onChange={this.onChange}
                  >
                    <option>Elige una sub categoría...</option>
                    {categoria !== ""
                      ? subcategorias
                          .filter(
                            subcategoria =>
                              subcategoria.categoria === parseInt(categoria, 0)
                          )
                          .map(subcategoria => (
                            <option
                              key={subcategoria.id}
                              value={subcategoria.id}
                            >
                              {subcategoria.nombre}
                            </option>
                          ))
                      : null}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-light mt-5">
            <div className="card-header">
              <label htmlFor="descripcion">Descripción</label>
            </div>
            <div className="card-body">
              <div className="form-group">
                <textarea
                  className="form-control"
                  name="descripcion"
                  rows="3"
                  value={descripcion}
                  onChange={this.onChange}
                />
              </div>
            </div>
          </div>

          <div id="accordion">
            <div className="card">
              <div className="card-header" id="headingOne">
                <h5 className="mb-0">
                  <button
                    type="button"
                    className="btn btn-link"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Producto individual
                  </button>
                </h5>
              </div>

              <div
                id="collapseOne"
                className="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordion"
              >
                <div className="card-body">
                  <div className="form-group row">
                    <label
                      htmlFor="cantidad"
                      className="col-sm-2 col-form-label"
                    >
                      Cantidad
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        name="cantidad"
                        placeholder="Cantidad"
                        value={cantidad}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="precio" className="col-sm-2 col-form-label">
                      Precio
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        name="precio"
                        placeholder="Precio"
                        value={precio}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="codigo_de_barras"
                      className="col-sm-2 col-form-label"
                    >
                      Código de barras
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        name="codigo_de_barras"
                        placeholder="Código de barras"
                        value={codigo_de_barras}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingTwo">
                <h5 className="mb-0">
                  <button
                    type="button"
                    className="btn btn-link collapsed"
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Producto con variantes
                  </button>
                </h5>
              </div>
              <div
                id="collapseTwo"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordion"
              >
                <div className="card-body">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. 3 wolf moon officia aute,
                  non cupidatat skateboard dolor brunch. Food truck quinoa
                  nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                  aliqua put a bird on it squid single-origin coffee nulla
                  assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft
                  beer labore wes anderson cred nesciunt sapiente ea proident.
                  Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                  beer farm-to-table, raw denim aesthetic synth nesciunt you
                  probably haven't heard of them accusamus labore sustainable
                  VHS.
                </div>
              </div>
            </div>
          </div>
          <div className="row-12 mt-5 pt-5 pb-5 mb-5">
            <hr />
            <Link to={`/producto`} className="btn btn-secondary">
              Volver
            </Link>
            <button type="submit" className="btn btn-success float-right">
              Agregar producto
            </button>
          </div>
        </form>
      </div>
    );
  }
}

NewProducto.propTypes = {
  categorias: PropTypes.array.isRequired,
  marcas: PropTypes.array.isRequired,
  subcategorias: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  categorias: state.producto.categorias,
  marcas: state.producto.marcas,
  subcategorias: state.producto.subcategorias
});

export default connect(
  mapStateToProps,
  { getMarcas, getCategorias, getSubcategorias }
)(NewProducto);
