import React, { Component } from "react";
import Boards from "./components/Boards";
import "./index";

class App extends Component {
  render() {
    return (
      <div id="app">
        <Boards />
        <div id="modal"></div>
      </div>
    );
  }
}

export default App;


if (module.hot) {
  module.hot.accept();
}
