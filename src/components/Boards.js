import React, { Component } from "react";
import ReactDOM from "react-dom";
import Tasks from "./Tasks";
import AddBoardModal from "./Modals/AddBoardModal";
import Axios from "axios";

class Boards extends Component {
  state = {
    boards: [],
  };

  componentDidMount() {
    this.getBoards();
  }

  getBoards = () => {
    Axios.post("http://app-react/api/boards/list").then((res) => {
      const boards = res.data;
      this.setState({ boards });
    });
  };

  createModal = () => {
    ReactDOM.render(
      <AddBoardModal removeModal={this.removeModal} />,
      document.getElementById("modal")
    );
  };

  removeModal = () => {
    ReactDOM.unmountComponentAtNode(
      document.getElementById("modal"),
      document.getElementById("add-board-modal")
    );
    this.getBoards();
  };

  render() {
    return (
      <div className="boards">
        {this.state.boards.map((board) => (
          <div className="board" key={board.id}>
            <h1 className="top">{board.name}</h1>
            <Tasks boardId={board.id} />
          </div>
        ))}
        <button className="board add-board-btn" onClick={this.createModal}>
          +Board
        </button>
      </div>
    );
  }
}

export default Boards;
