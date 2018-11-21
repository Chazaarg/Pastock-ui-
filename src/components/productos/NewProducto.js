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
import ProductoDefault from "./ProductoDefault";
import ProductoIndividual from "./ProductoIndividual";
import ProductoVariantes from "./ProductoVariantes";
import { createLoadingSelector } from "../../helpers/CreateLoadingSelector";
import Loader from "react-loader";

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
    precio: 0,
    codigo_de_barras: "",
    cantidad: 0,
    precio_compra: "",
    precio_real: "",
    variantes: [],
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
      varianteTipoId,
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

      nuevoProducto.variantes.forEach(function(obj) {
        obj.variante_tipo = varianteTipoId;
      });
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
    if (this.state.variantes.length === 0) {
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
  newProp = (val, categoriaId) => {
    let select;
    document.querySelectorAll("select.form-control").forEach(element => {
      if (element.name === val) {
        select = element;
      }
      return select;
    });

    let values = [];
    select.querySelectorAll("option").forEach(element => {
      values.push(Number(element.value));
    });
    values.shift();
    values.sort((x, y) => {
      return y - x;
    });
    switch (val) {
      case "marca":
        this.setState({ marca: { id: values[0] } });
        break;
      case "categoria":
        if (categoriaId) {
          this.setState({ categoria: { id: categoriaId } });
        } else {
          this.setState({ categoria: { id: values[0] } });
        }
        break;
      case "sub_categoria":
        this.setState({ sub_categoria: values[0] });
        break;
      default:
        break;
    }
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

    const {
      categorias,
      marcas,
      subcategorias,
      varianteTipos,
      isFetching
    } = this.props;

    return (
      <div>
        <h1>Nuevo Producto</h1>
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
              newProp={this.newProp.bind(this)}
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
                newProp={this.newProp.bind(this)}
              />
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
        </Loader>
      </div>
    );
  }
}
const loadingSelector = createLoadingSelector(["FETCH_CATEGORIAS"]);

NewProducto.propTypes = {
  categorias: PropTypes.array.isRequired,
  marcas: PropTypes.array.isRequired,
  subcategorias: PropTypes.array.isRequired,
  varianteTipos: PropTypes.array.isRequired,
  addProducto: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  categorias: state.producto.categorias,
  marcas: state.producto.marcas,
  subcategorias: state.producto.subcategorias,
  varianteTipos: state.producto.varianteTipos,
  loading: state.loading,
  isFetching: loadingSelector(state)
});

export default connect(
  mapStateToProps,
  { getMarcas, getCategorias, getSubcategorias, addProducto, getVarianteTipos }
)(NewProducto);
