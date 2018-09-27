import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import AppNavbar from "./components/layout/AppNavbar";
import Stock from "./components/layout/Stock";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <AppNavbar />
          <div className="container">
            <Switch>
              <Route exact path="/producto" component={Stock} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
