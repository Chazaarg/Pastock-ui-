import React, { Component } from "react";
import { login } from "../../actions/usuarioActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  onSubmit = e => {
    e.preventDefault();

    const { username, password } = this.state;

    this.props.login({ username, password }).catch(err => alert(err));
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card">
              <div className="card-body">
                <h1 className="text-center pb-4 pt-3">Ingresar</h1>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="username">Usuario</label>
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      required
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
                      required
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Login"
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

Login.propTypes = {
  login: PropTypes.func.isRequired
};

export default connect(
  null,
  { login }
)(Login);
