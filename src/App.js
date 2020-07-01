import React, { Component } from "react";
import Boards from "./components/Boards";
import Login from "./components/Login";
import "./index";

class App extends Component {
  render() {
    return (
      <div id="app">
        <Login />
        {/* <Boards /> */}
      </div>
    );
  }
}

export default App;


if (module.hot) {
  module.hot.accept();
}
