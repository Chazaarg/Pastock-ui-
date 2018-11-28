import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCategoria } from "../../actions/productosActions";
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

class CategoriaModal extends Component {
  state = {
    modal: false,
    nombre: ""
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

    const { addCategoria, newProp } = this.props;

    const newCategoria = {
      nombre: this.state.nombre
    };

    //Añadir categoria

    addCategoria(newCategoria).then(() => {
      if (this.props.notify.messageType === "success") {
        //Espera a que la marca se añada al DOM y luego la busca para setearla al state.
        setTimeout(newProp("categoria"), 1000);

        this.setState({
          nombre: ""
        });
        this.toggle();
      }
    });
  };

  render() {
    return (
      <div>
        <button
          type="button"
          className="text-secondary btn btn-link"
          onClick={this.toggle}
        >
          <small>Añadir nueva categoria</small>
        </button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Añadir nueva categoria</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="categoria">Categoria</Label>
                <Input
                  className="modalInput"
                  type="text"
                  name="nombre"
                  id="categoria"
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
                  Añadir categoria
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
CategoriaModal.propTypes = {
  addCategoria: PropTypes.func.isRequired
};
export default connect(
  null,
  { addCategoria }
)(CategoriaModal);
