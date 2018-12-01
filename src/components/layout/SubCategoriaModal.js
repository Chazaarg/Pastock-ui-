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
import Select from "react-select";

class SubCategoriaModal extends Component {
  componentDidMount() {
    this.props.getCategorias();
  }
  state = {
    modal: false,
    nombre: "",
    categoria: { id: undefined, label: undefined }
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    if (e.nombre === "categoria") {
      this.setState({ categoria: { id: e.value, label: e.label } });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const { nombre, categoria } = this.state;
    const { addSubCategoria, newProp } = this.props;
    const newSubCategoria = {
      nombre,
      categoria: categoria.id
    };

    //Añadir subCategoria

    addSubCategoria(newSubCategoria).then(() => {
      if (this.props.notify.messageType === "success") {
        //Selecciona la categoria de la nueva subcategoria.
        newProp("categoria", categoria);
        //Selecciona la nueva sub_categoria en el DOM.
        this.props.newProp("sub_categoria");

        this.setState({
          nombre: "",
          categoria: ""
        });
        this.toggle();
      }
    });
  };

  render() {
    const { optionsCategoria } = this.props;

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
                <Label for="categoria">Categoria de la que es anidada</Label>

                <Select
                  name="categoria"
                  value={
                    this.state.categoria.id === undefined
                      ? null
                      : {
                          label: this.state.categoria.label,
                          value: this.state.categoria.id
                        }
                  }
                  onChange={this.onChange}
                  options={optionsCategoria}
                  placeholder="Seleccione una categoria..."
                />

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
