import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import MainPage from "./Pages/MainPage";
import AuthPage from "./Pages/AuthPage";
import RegPage from "./Pages/RegPage";
import DashBoard from "./Pages/DashBoard";
import store from "./Store/store";
import "./styles/reset.css";
import "./styles/main.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={MainPage} />
            <Route path="/authorize" component={AuthPage} />
            <Route path="/registration" component={RegPage} />
            <Route path="/dashboard/:nickname" component={DashBoard} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
