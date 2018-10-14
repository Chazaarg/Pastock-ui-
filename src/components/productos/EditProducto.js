import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getMarcas,
  getCategorias,
  getSubcategorias,
  getVarianteTipos,
  getProducto,
  addProducto,
  updateProducto
} from "../../actions/productosActions";
import React, { Component } from "react";
import MarcaModal from "../layout/MarcaModal";
import CategoriaModal from "../layout/CategoriaModal";
import SubCategoriaModal from "../layout/SubCategoriaModal";

class EditProducto extends Component {
  state = {
    nombre: "",
    descripcion: "",
    marca: "",
    categoria: "",
    sub_categoria: "",
    precio: 0,
    codigo_de_barras: "",
    cantidad: 0,
    precio_compra: "",
    precio_real: "",
    variantes: [],
    varianteTipoId: "",
    tieneVariante: false
  };
  componentWillReceiveProps(nextProps, nextState) {
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
      variantes
    } = nextProps.producto;

    this.setState({
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
      variantes
    });

    if (!variantes) {
      this.setState({
        variantes: []
      });
      //Si no tiene variantes le agrega la clase 'show' al collapse
      document.getElementById("collapseOne").classList.add("show");
    } else {
      this.setState({
        tieneVariante: true,
        varianteTipoId: this.state.variantes[0]
          ? this.state.variantes[0].variante_tipo.id
          : null
      });
      //Si tiene variantes le agrega la clase 'show' al collapse
      document.getElementById("collapseTwo").classList.add("show");
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProducto(id);
    this.props.getMarcas();
    this.props.getVarianteTipos();
    this.props.getCategorias();
    this.props.getSubcategorias();
  }

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
      varianteTipoId,
      variantes
    } = this.state;

    const { id } = this.props.match.params;

    let editProducto = {};

    if (tieneVariante) {
      editProducto = {
        id,
        nombre,
        descripcion,
        marca: marca.id,
        categoria: categoria.id,
        sub_categoria: sub_categoria.id,
        precio_compra,
        precio_real,
        variantes: variantes
      };

      editProducto.variantes.forEach(function(obj) {
        obj.variante_tipo = parseInt(varianteTipoId, 0);
      });
    } else {
      editProducto = {
        id,
        nombre,
        descripcion,
        marca: marca,
        categoria: categoria.id,
        sub_categoria: sub_categoria.id,
        precio: precio,
        codigo_de_barras: codigo_de_barras,
        cantidad: cantidad,
        precio_compra,
        precio_real
      };
    }
    this.props.updateProducto(editProducto);

    //Clear state

    this.setState({
      nombre: "",
      descripcion: "",
      marca: "",
      categoria: "",
      sub_categoria: "",
      precio: 0,
      codigo_de_barras: "",
      cantidad: 0,
      precio_compra: "",
      precio_real: "",
      variantes: []
    });
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
    if (this.state.variantes.length === 0 || this.state.variantes === null) {
      this.handleAddVariante();
    }
  };

  handleAddVariante = () => {
    this.setState({
      variantes: this.state.variantes.concat([
        {
          nombre: "",
          precio: 0,
          cantidad: 0,
          codigo_de_barras: ""
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
        <h1>Editar Producto</h1>
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
                    value={marca ? marca.id : null}
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
                    value={categoria ? categoria.id : null}
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
                    value={sub_categoria ? sub_categoria.id : null}
                    className="form-control"
                    onChange={this.onChange}
                  >
                    <option>Elige una sub categoría...</option>
                    {categoria !== ""
                      ? subcategorias
                          .filter(
                            subcategoria =>
                              subcategoria.categoria ===
                              parseInt(categoria.id, 0)
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
                    aria-expanded="false"
                    aria-controls="collapseOne"
                    onClick={this.toggle.bind(this, false)}
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
                        type="number"
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
                        type="number"
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
                      value={this.state.varianteTipoId}
                    >
                      <option>Elige el tipo de variante:</option>
                      {varianteTipos.map(varianteTipo => (
                        <option key={varianteTipo.id} value={varianteTipo.id}>
                          {varianteTipo.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  {variantes
                    ? variantes.map((variante, idx) => (
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
                                type="number"
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
                                type="number"
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
                      ))
                    : null}

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
              Editar Producto
            </button>
          </div>
        </form>
      </div>
    );
  }
}

EditProducto.propTypes = {
  producto: PropTypes.object.isRequired,
  getProducto: PropTypes.func.isRequired,
  updateProducto: PropTypes.func.isRequired,
  categorias: PropTypes.array.isRequired,
  marcas: PropTypes.array.isRequired,
  subcategorias: PropTypes.array.isRequired,
  varianteTipos: PropTypes.array.isRequired,
  addProducto: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  producto: state.producto.producto,
  categorias: state.producto.categorias,
  marcas: state.producto.marcas,
  subcategorias: state.producto.subcategorias,
  varianteTipos: state.producto.varianteTipos
});

export default connect(
  mapStateToProps,
  {
    getMarcas,
    getCategorias,
    getSubcategorias,
    addProducto,
    getVarianteTipos,
    getProducto,
    updateProducto
  }
)(EditProducto);
