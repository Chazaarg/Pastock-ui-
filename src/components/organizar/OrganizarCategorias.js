import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { createLoadingSelector } from "../../helpers/CreateLoadingSelector";
import Loader from "react-loader";

import { getCategorias } from "../../actions/productosActions";
import Categorias from "./Categorias";

class OrganizarCategorias extends Component {
  state = {
    sideNav: false
  };
  componentDidMount() {
    this.props.getCategorias();
  }
  static getDerivedStateFromProps(props, state) {
    const { loading } = props;
    //Cuando se sale, le asigno false a FETCH_PRODUCTOS, para que vuelva a cargar la página al volver.
    if (loading.FETCH_CATEGORIAS) {
      return (loading["FETCH_CATEGORIAS"] = false);
    }
    return state;
  }

  closeNav = () => {
    this.setState({
      sideNav: false
    });
  };
  openNav = e => {
    //Primero se calculan distancias entre el botón "administrar subcategorias" con el pie y header de la tabla.
    //Esto es para mostrar a un costado del botón las subcategorias.

    //El contenedor del sideNav.
    const sideNavContainer = document.getElementById("sideNavContainer");

    //El boton.
    const btn = e.target.parentElement;

    //Y = Distancia entre el botón y el header.
    const pageYTop = btn.offsetTop;

    //Y = Distancia entre el botón y el pie:

    const elYmaselH = pageYTop + btn.offsetHeight; //Y = Distancia del botón al header más la altura del botón.

    const pageYBottom = -elYmaselH + sideNavContainer.offsetHeight; //Finalmente, Y = distancia del botón al pie de la tabla.

    //Altura de la tabla.
    const tablaHeight =
      btn.parentElement.parentElement.parentElement.offsetHeight;

    //Se setea la distancia del contenedor dependiendo si:
    //la posición del botón + la altura del contenedor <= Altura de la tabla.
    if (pageYTop + sideNavContainer.offsetHeight <= tablaHeight) {
      sideNavContainer.style.bottom = "";
      sideNavContainer.style.top = pageYTop + "px";
    } else {
      sideNavContainer.style.top = "";
      sideNavContainer.style.bottom = pageYBottom + "px";
    }

    this.setState({
      sideNav: true //Se muestra el sideNav
    });
  };
  render() {
    const { sideNav } = this.state;
    const { categorias } = this.props;

    const sideNavElement = document.getElementById("sideNav");
    if (sideNavElement) {
      if (sideNav) {
        sideNavElement.style.width = "100%";
      } else {
        sideNavElement.style.width = "0";
      }
    }

    return (
      <React.Fragment>
        {/* Heading */}
        <div className="row pt-4 pb-2 altura">
          <div className="col-md-10">
            <h2>Organizar Categorias</h2>
          </div>
        </div>

        <div className="row">
          <Loader loaded={this.props.isFetching}>
            {/* Categorias */}

            <Categorias
              categorias={categorias}
              openNav={this.openNav.bind(this)}
            />
          </Loader>
        </div>
      </React.Fragment>
    );
  }
}
const loadingSelector = createLoadingSelector(["FETCH_CATEGORIAS"]);

OrganizarCategorias.propTypes = {
  getCategorias: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  categorias: state.producto.categorias,
  isFetching: loadingSelector(state),
  loading: state.loading
});

export default connect(
  mapStateToProps,
  { getCategorias }
)(OrganizarCategorias);
