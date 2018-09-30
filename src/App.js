import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import AppNavbar from "./components/layout/AppNavbar";
import Stock from "./components/layout/Stock";
import ShowProducto from "./components/productos/ShowProducto";

import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <div className="container">
              <Switch>
                <Route exact path="/producto" component={Stock} />
                <Route exact path="/producto/:id" component={ShowProducto} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
