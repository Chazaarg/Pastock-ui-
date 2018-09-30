import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProducto } from "../../actions/productosActions";

class ShowProducto extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProducto(id);
  }

  render() {
    return (
      <div>
        <h1>Producto</h1>
      </div>
    );
  }
}

ShowProducto.propTypes = {
  producto: PropTypes.object.isRequired,
  getProducto: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  producto: state.producto.producto
});

export default connect(
  mapStateToProps,
  { getProducto }
)(ShowProducto);
