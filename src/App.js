import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import MainPage from "./Pages/MainPage";
import AuthPage from "./Pages/AuthPage";
import RegPage from "./Pages/RegPage";
import store from "./Store/store";
import "./styles/reset.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={MainPage} />
            <Route path="/authorize" component={AuthPage} />
            <Route path="/registration" component={RegPage} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
