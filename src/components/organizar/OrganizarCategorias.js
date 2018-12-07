import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { createLoadingSelector } from "../../helpers/CreateLoadingSelector";
import Loader from "react-loader";

import CategoriaModal from "../layout/CategoriaModal";
import { notifyUser } from "../../actions/notifyActions";

import { getCategorias } from "../../actions/productosActions";
import { getSubcategorias } from "../../actions/productosActions";
import Categorias from "./Categorias";
import ProductoAlert from "../layout/ProductoAlert";

class OrganizarCategorias extends Component {
  state = {
    sideNav: false,
    categoria: { id: undefined, nombre: undefined }
  };
  componentDidMount() {
    this.props.getCategorias();
    this.props.getSubcategorias();
  }

  componentWillUnmount() {
    //Esto hace un clear a notify cada vez que cambie de ruta.
    const { message } = this.props.notify;
    const { notifyUser } = this.props;

    message && notifyUser(null, null, null);
  }

  static getDerivedStateFromProps(props, state) {
    const { loading } = props;
    //Cuando se sale, le asigno false a FETCH_PRODUCTOS, para que vuelva a cargar la página al volver.
    if (loading.FETCH_CATEGORIAS) {
      return (loading["NOTIFY_USER"] = false);
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
    //O la altura del contenedor >= a la distancia del boton con el header
    if (
      pageYTop + sideNavContainer.offsetHeight <= tablaHeight ||
      sideNavContainer.offsetHeight >= pageYTop
    ) {
      sideNavContainer.style.bottom = "";
      sideNavContainer.style.top = pageYTop + "px";
      sideNavContainer.children[0].children[0].style.borderBottom = "";
      sideNavContainer.children[0].children[0].style.borderTop =
        "1px solid #dee2e6";
    } else {
      sideNavContainer.style.top = "";
      sideNavContainer.style.bottom = pageYBottom + "px";

      sideNavContainer.children[0].children[0].style.borderTop = "";
      sideNavContainer.children[0].children[0].style.borderBottom =
        "1px solid #dee2e6";
    }

    this.setState({
      sideNav: true //Se muestra el sideNav
    });
  };

  subcategoriasClick = cell => {
    this.setState({ categoria: { id: cell.id, nombre: cell.nombre } });
  };

  newProp = () => {
    //Luego de unos segundos borro el mensaje
    setTimeout(() => {
      this.props.notifyUser(null, null, null);
    }, 10000);
  };

  render() {
    const { sideNav, categoria } = this.state;
    const { categorias, subcategorias, notify } = this.props;
    const sideNavContainerChildren = document.querySelector(
      "#sideNavContainer div"
    );
    if (sideNavContainerChildren) {
      if (sideNav) {
        sideNavContainerChildren.style.display = "block";
      } else {
        sideNavContainerChildren.style.display = "none";
      }
    }

    return (
      <React.Fragment>
        {/* Heading */}
        <div className="row pt-4 pb-2 d-flex justify-content-start">
          <div className="col-md-6 pr-0">
            <h2>Organizar Categorias</h2>
          </div>

          {notify.message ? (
            <div className="col-md-4">
              <ProductoAlert
                message={notify.message}
                messageType={notify.messageType}
                errors={notify.errors}
              />
            </div>
          ) : null}
        </div>

        <div className="row d-flex justify-content-end">
          <div className="col-md-6">
            <CategoriaModal
              newProp={this.newProp.bind(this)}
              notify={notify}
              btnClass="btn btn-success text-dark"
            />
          </div>
        </div>

        <div className="row">
          <Loader loaded={this.props.isFetching}>
            {/* Categorias */}

            <Categorias
              categorias={categorias}
              subcategorias={subcategorias}
              openNav={this.openNav.bind(this)}
              closeNav={this.closeNav.bind(this)}
              subcategoriasClick={this.subcategoriasClick.bind(this)}
              categoria={categoria}
              newProp={this.newProp.bind(this)}
              notify={notify}
            />
          </Loader>
        </div>
      </React.Fragment>
    );
  }
}
const loadingSelector = createLoadingSelector([
  "FETCH_SUBCATEGORIAS",
  "NOTIFY_USER"
]);

OrganizarCategorias.propTypes = {
  getCategorias: PropTypes.func.isRequired,
  getSubcategorias: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  notifyUser: PropTypes.func.isRequired,
  notify: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  notify: state.notify,
  categorias: state.producto.categorias,
  subcategorias: state.producto.subcategorias,
  isFetching: loadingSelector(state),
  loading: state.loading
});

export default connect(
  mapStateToProps,
  { getCategorias, notifyUser, getSubcategorias }
)(OrganizarCategorias);
