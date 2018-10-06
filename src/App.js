import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import AppNavbar from "./components/layout/AppNavbar";
import Stock from "./components/layout/Stock";
import ShowProducto from "./components/productos/ShowProducto";
import NewProducto from "./components/productos/NewProducto";
import NotFound from "./components/pages/NotFound";

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
                <Route
                  exact
                  path="/producto/:id/show" //El /show no tendría que estar.
                  component={ShowProducto}
                />
                <Route exact path="/producto/new" component={NewProducto} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
