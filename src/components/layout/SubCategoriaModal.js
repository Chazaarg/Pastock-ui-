import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSubCategoria, getCategorias } from "../../actions/productosActions";
import {
  Modal,
  ModalHeader,
  Button,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

class SubCategoriaModal extends Component {
  componentDidMount() {
    this.props.getCategorias();
  }
  state = {
    modal: false,
    nombre: "",
    categoria: ""
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { nombre, categoria } = this.state;
    const { addSubCategoria, newProp } = this.props;
    const newSubCategoria = {
      nombre,
      categoria
    };

    //Añadir subCategoria

    addSubCategoria(newSubCategoria).then(() => {
      if (this.props.notify.messageType === "success") {
        //Espera a que la subcategoria se añada al DOM y luego la busca para setearla al state.
        newProp("categoria", categoria);
        setTimeout(() => {
          this.props.newProp("sub_categoria");
        }, 1000);

        this.setState({
          nombre: "",
          categoria: ""
        });
        this.toggle();
      }
    });
  };

  render() {
    const { categorias } = this.props;

    return (
      <div>
        <button
          type="button"
          className="text-secondary btn btn-link"
          onClick={this.toggle}
        >
          <small>Añadir nueva subCategoria</small>
        </button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Añadir nueva subCategoria
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="categoriaPerteneciente">
                  Categoria de la que es anidada
                </Label>
                <Input
                  type="select"
                  name="categoria"
                  id="categoriaPerteneciente"
                  onChange={this.onChange}
                  value={
                    this.state.categoria === ""
                      ? this.props.categoria.id
                        ? this.props.categoria.id
                        : this.props.categoria
                      : this.state.categoria
                  }
                  className="modalInput"
                >
                  <option>Elige una categoría...</option>
                  {categorias.map(categoria => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nombre}
                    </option>
                  ))}
                </Input>

                <hr className="mt-2 mb-2" />
                <Label for="subCategoria">SubCategoria</Label>
                <Input
                  className="modalInput"
                  type="text"
                  name="nombre"
                  id="subCategoria"
                  placeholder="Nombre..."
                  onChange={this.onChange}
                />

                <Button
                  type="button"
                  onClick={this.onSubmit}
                  color="dark"
                  style={{ marginTop: "2rem" }}
                  block
                >
                  Añadir subCategoria
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
SubCategoriaModal.propTypes = {
  categorias: PropTypes.array.isRequired,
  addSubCategoria: PropTypes.func.isRequired,
  getCategorias: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  categorias: state.producto.categorias
});

export default connect(
  mapStateToProps,
  { addSubCategoria, getCategorias }
)(SubCategoriaModal);
