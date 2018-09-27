import React, { Component } from "react";
import { Link } from "react-router-dom";

class AppNavbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            paStock
          </Link>
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <Link to="/producto" className="nav-link">
                Stock
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default AppNavbar;
