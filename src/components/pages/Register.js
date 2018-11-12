import React, { Component } from "react";
import { registerUser } from "../../actions/usuarioActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Alert from "../layout/Alert";
import { notifyUser } from "../../actions/notifyActions";

class Register extends Component {
  state = {
    username: "",
    password: "",
    email: ""
  };

  componentWillUnmount() {
    //Esto hace un clear a notify cada vez que cambie de ruta.
    const { message } = this.props.notify;
    const { notifyUser } = this.props;

    message && notifyUser(null, null, null);
  }

  onSubmit = e => {
    e.preventDefault();

    const { username, password, email } = this.state;
    const { registerUser } = this.props;

    registerUser({ username, password, email });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    const { message, messageType, errors } = this.props.notify;

    return (
      <div>
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card">
              <div className="card-body">
                {//Si hay un mensaje, entonces lo muestro en la alerta.
                message ? (
                  <Alert
                    message={message}
                    messageType={messageType}
                    errors={errors}
                  />
                ) : null}
                <h1 className="text-center pb-4 pt-3">Registrarse</h1>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="username">Usuario</label>
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      value={this.state.username}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Registrarse"
                    className="btn btn-dark btn-block"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  notifyUser: PropTypes.func.isRequired
};

export default connect(
  (state, props) => ({
    notify: state.notify
  }),
  {
    registerUser,
    notifyUser
  }
)(Register);
