import React, { Component } from "react";
import Boards from "./components/Boards";
import "./index";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Boards />
      </div>
    );
  }
}

export default App;


if (module.hot) {
  module.hot.accept();
}
