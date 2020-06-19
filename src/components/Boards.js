import React, { Component } from "react";
import Tasks from "./Tasks";
import Axios from "axios";

class Boards extends Component {
  state = {
    boards: [],
  };

  componentDidMount() {
    Axios.post("http://app-react/api/boards/list").then((res) => {
      const boards = res.data;
      this.setState({ boards });
    });
  }

  render() {
    return (
      <div className="boards">
        {this.state.boards.map((board) => (
          <div className="board" key={board.id}>
            <h1 className="top">{board.name}</h1>
            <Tasks boardId={board.id} />
          </div>
        ))}
      </div>
    );
  }
}

export default Boards;
