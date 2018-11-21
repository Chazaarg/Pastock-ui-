import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addMarca } from "../../actions/productosActions";
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

class MarcaModal extends Component {
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

    const newMarca = {
      nombre: this.state.nombre
    };

    //Añadir marca

    this.props.addMarca(newMarca).then(
      //Espera a que la marca se añada al DOM y luego la busca para setearla al state.
      setTimeout(() => {
        this.props.newProp("marca");
      }, 1000)
    );
    this.setState({
      nombre: ""
    });
    this.toggle();
  };

  render() {
    return (
      <div>
        <button
          type="button"
          className="text-secondary btn btn-link float-right"
          onClick={this.toggle}
        >
          <small>Añadir nueva marca</small>
        </button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Añadir nueva marca</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="marca">Marca</Label>
                <Input
                  type="text"
                  name="nombre"
                  id="marca"
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
                  Añadir Marca
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
MarcaModal.propTypes = {
  addMarca: PropTypes.func.isRequired
};
export default connect(
  null,
  { addMarca }
)(MarcaModal);
