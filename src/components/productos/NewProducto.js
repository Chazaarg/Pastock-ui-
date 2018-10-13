import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getMarcas,
  getCategorias,
  getSubcategorias,
  getVarianteTipos,
  addProducto
} from "../../actions/productosActions";
import React, { Component } from "react";
import MarcaModal from "../layout/MarcaModal";
import CategoriaModal from "../layout/CategoriaModal";
import SubCategoriaModal from "../layout/SubCategoriaModal";

class NewProducto extends Component {
  componentDidMount() {
    this.props.getMarcas();
    this.props.getVarianteTipos();
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
    precio_real: "",
    variantes: [],
    //Este valor se lo tengo que agregar a NewProducto, en el caso de que tenga variantes
    varianteTipoId: "",
    tieneVariante: false
  };

  onSubmit = e => {
    e.preventDefault();

    const {
      nombre,
      descripcion,
      marca,
      categoria,
      sub_categoria,
      precio,
      codigo_de_barras,
      cantidad,
      precio_compra,
      precio_real,
      tieneVariante,
      variantes
    } = this.state;

    let nuevoProducto = {};

    if (tieneVariante) {
      nuevoProducto = {
        nombre,
        descripcion,
        marca,
        categoria,
        sub_categoria,
        precio_compra,
        precio_real,
        variantes: variantes
      };
    } else {
      nuevoProducto = {
        nombre,
        descripcion,
        marca,
        categoria,
        sub_categoria,
        precio: precio,
        codigo_de_barras: codigo_de_barras,
        cantidad: cantidad,
        precio_compra,
        precio_real
      };
    }

    this.props.addProducto(nuevoProducto);

    // Clear State
    /*
    this.setState({
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
    });
    */
  };

  varianteOnChange = idx => e => {
    const newVariante = this.state.variantes.map((variante, sidx) => {
      if (idx !== sidx) return variante;
      return { ...variante, [e.target.name]: e.target.value };
    });

    this.setState({ variantes: newVariante });
  };

  varianteTipoOnChange = e => {
    this.setState({ varianteTipoId: e.target.value });
    if (this.state.variantes.length === 0) {
      this.handleAddVariante();
    }
  };

  handleAddVariante = () => {
    this.setState({
      variantes: this.state.variantes.concat([
        {
          nombre: "",
          precio: "",
          cantidad: "",
          codigo_de_barras: ""
          //variante_tipo cuando se haga el submit, varianteTipo tiene que ser igual a this.state.varianteTipoId
        }
      ])
    });
  };

  handleRemoveVariante = idx => () => {
    this.setState({
      variantes: this.state.variantes.filter((s, sidx) => idx !== sidx)
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  toggle = b => {
    this.setState({
      tieneVariante: b
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
      sub_categoria,
      variantes
    } = this.state;

    const { categorias, marcas, subcategorias, varianteTipos } = this.props;

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
                  <MarcaModal />
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
                  <CategoriaModal />
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
                  <SubCategoriaModal />
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
                    onClick={this.toggle.bind(this, false)}
                  >
                    Producto individual
                  </button>
                </h5>
              </div>

              <div
                id="collapseOne"
                className="collapse show"
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
                    onClick={this.toggle.bind(this, true)}
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
                  <div className="form-group col-md-4">
                    <select
                      name="varianteTipo"
                      className="form-control"
                      onChange={this.varianteTipoOnChange}
                    >
                      <option>Elige el tipo de variante:</option>
                      {varianteTipos.map(varianteTipo => (
                        <option key={varianteTipo.id} value={varianteTipo.id}>
                          {varianteTipo.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  {variantes.map((variante, idx) => (
                    <div key={idx} className="variante">
                      <hr />
                      <h5 className="card-title p-2 p-2">
                        Variante #{idx + 1}
                      </h5>
                      <div className="form-group row">
                        <label
                          htmlFor="nombre"
                          className="col-sm-2 col-form-label"
                        >
                          Nombre
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            name="nombre"
                            placeholder="Nombre"
                            value={variante.nombre}
                            onChange={this.varianteOnChange(idx)}
                          />
                        </div>
                      </div>
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
                            value={variante.cantidad}
                            onChange={this.varianteOnChange(idx)}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="precio"
                          className="col-sm-2 col-form-label"
                        >
                          Precio
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            name="precio"
                            placeholder="Precio"
                            value={variante.precio}
                            onChange={this.varianteOnChange(idx)}
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
                            value={variante.codigo_de_barras}
                            onChange={this.varianteOnChange(idx)}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <button
                          type="button"
                          onClick={this.handleRemoveVariante(idx)}
                          className="btn btn-danger float-right m-3"
                        >
                          Eliminar variante
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={this.handleAddVariante}
                    className="btn btn-success m-3 float-right"
                  >
                    Añadir variante
                  </button>
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
  subcategorias: PropTypes.array.isRequired,
  varianteTipos: PropTypes.array.isRequired,
  addProducto: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  categorias: state.producto.categorias,
  marcas: state.producto.marcas,
  subcategorias: state.producto.subcategorias,
  varianteTipos: state.producto.varianteTipos
});

export default connect(
  mapStateToProps,
  { getMarcas, getCategorias, getSubcategorias, addProducto, getVarianteTipos }
)(NewProducto);
