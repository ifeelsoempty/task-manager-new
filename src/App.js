import React, { Component } from "react";
import Boards from "./components/Boards";
import "./index";

class App extends Component {
  render() {
    return (
      <div id="app">
        <Boards />
        <div id="update-task-modal-container"></div>
        <div id="add-board-modal-container"></div>
      </div>
    );
  }
}

export default App;


if (module.hot) {
  module.hot.accept();
}
