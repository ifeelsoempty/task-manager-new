import React, { Component } from "react";
import Login from "./components/Login";
import "./index";

class App extends Component {
  render() {
    return <Login />;
  }
}

export default App;

if (module.hot) {
  module.hot.accept();
}
