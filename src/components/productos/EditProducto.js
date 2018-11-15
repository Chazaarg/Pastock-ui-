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
  updateProducto,
  deleteProducto
} from "../../actions/productosActions";
import React, { Component } from "react";
import ProductoDefault from "./ProductoDefault";
import ProductoIndividual from "./ProductoIndividual";
import ProductoVariantes from "./ProductoVariantes";
import { createLoadingSelector } from "../../helpers/CreateLoadingSelector";
import Loader from "react-loader";

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
  //TODO: Que se reinicie el estado de loading, al menos FETCH_PRODUCTO.
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
      if (document.getElementById("collapseOne")) {
        document.getElementById("collapseOne").classList.add("show");
      }
    } else {
      this.setState({
        tieneVariante: true,
        varianteTipoId: this.state.variantes
          ? this.state.variantes[0]
          : null
          ? this.state.variantes[0].variante_tipo.id
          : null
      });
      //Si tiene variantes le agrega la clase 'show' al collapse
      if (document.getElementById("collapseTwo")) {
        document.getElementById("collapseTwo").classList.add("show");
      }
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
        marca: marca.id ? marca.id : marca,
        categoria: categoria.id ? categoria.id : categoria,
        sub_categoria: sub_categoria.id ? sub_categoria.id : sub_categoria,
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
        marca: marca.id ? marca.id : marca,
        categoria: categoria.id ? categoria.id : categoria,
        sub_categoria: sub_categoria.id ? sub_categoria.id : sub_categoria,
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
    this.props.history.push("/producto");
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
  onDeleteClick = id => {
    this.props.deleteProducto(id);
    this.props.history.push("/producto");
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
      variantes,
      varianteTipoId
    } = this.state;
    const { id } = this.props.match.params;
    const {
      categorias,
      marcas,
      subcategorias,
      varianteTipos,
      isFetching
    } = this.props;

    return (
      <div>
        <div className="row">
          <div className="col-9">
            <h1>Editar producto</h1>
          </div>
          <div className="col-3 float-right">
            <button
              type="button"
              className="btn btn-danger float-right mb-0"
              onClick={this.onDeleteClick.bind(this, id)}
            >
              Eliminar
            </button>
          </div>
        </div>

        <Loader loaded={isFetching}>
          <form onSubmit={this.onSubmit}>
            <ProductoDefault
              nombre={nombre}
              marca={marca}
              categoria={categoria}
              sub_categoria={sub_categoria}
              descripcion={descripcion}
              categorias={categorias}
              marcas={marcas}
              subcategorias={subcategorias}
              onChange={this.onChange.bind(this)}
            />

            <div id="accordion">
              <ProductoIndividual
                cantidad={cantidad}
                precio={precio}
                codigo_de_barras={codigo_de_barras}
                toggle={this.toggle.bind(this)}
                onChange={this.onChange.bind(this)}
              />
              <ProductoVariantes
                variantes={variantes}
                varianteTipos={varianteTipos}
                varianteTipoId={varianteTipoId}
                toggle={this.toggle.bind(this)}
                varianteTipoOnChange={this.varianteTipoOnChange.bind(this)}
                varianteOnChange={this.varianteOnChange.bind(this)}
                handleRemoveVariante={this.handleRemoveVariante.bind(this)}
                handleAddVariante={this.handleAddVariante.bind(this)}
              />
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
        </Loader>
      </div>
    );
  }
}

const loadingSelector = createLoadingSelector(["FETCH_SUBCATEGORIAS"]);

EditProducto.propTypes = {
  producto: PropTypes.object.isRequired,
  getProducto: PropTypes.func.isRequired,
  updateProducto: PropTypes.func.isRequired,
  categorias: PropTypes.array.isRequired,
  marcas: PropTypes.array.isRequired,
  subcategorias: PropTypes.array.isRequired,
  varianteTipos: PropTypes.array.isRequired,
  addProducto: PropTypes.func.isRequired,
  deleteProducto: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  producto: state.producto.producto,
  categorias: state.producto.categorias,
  marcas: state.producto.marcas,
  subcategorias: state.producto.subcategorias,
  varianteTipos: state.producto.varianteTipos,
  loading: state.loading,
  isFetching: loadingSelector(state)
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
    updateProducto,
    deleteProducto
  }
)(EditProducto);
