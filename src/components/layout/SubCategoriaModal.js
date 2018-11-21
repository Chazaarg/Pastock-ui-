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
    console.log(categoria);
    const newSubCategoria = {
      nombre,
      categoria
    };

    //Añadir subCategoria

    this.props.addSubCategoria(newSubCategoria).then(
      () => {
        this.props.newProp("categoria", categoria);
        setTimeout(() => {
          this.props.newProp("sub_categoria");
        }, 1000);
      }
      //Espera a que la marca se añada al DOM y luego la busca para setearla al state.
    );
    this.setState({
      nombre: "",
      categoria: ""
    });
    this.toggle();
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
                  value={this.state.categoria}
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
  categorias: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  subCategoria: state.subCategoria,
  categorias: state.producto.categorias
});

export default connect(
  mapStateToProps,
  { addSubCategoria, getCategorias }
)(SubCategoriaModal);
