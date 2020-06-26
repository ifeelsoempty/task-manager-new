import React, { Component } from "react";
import ReactDOM from "react-dom";
import Tasks from "./Tasks";
import BoardModal from "./Modals/BoardModal";
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

  removeModal = () => {
    ReactDOM.unmountComponentAtNode(
      document.getElementById("modal"),
      document.getElementById("board-modal")
    );
    this.getBoards();
  };

  createModal(e, boardId) {
    ReactDOM.render(
      <BoardModal
        boardId={boardId}
        boardDOM={e.target}
        removeModal={this.removeModal}
      />,
      document.getElementById("modal")
    );
  }

  render() {
    return (
      <div className="boards">
        {this.state.boards.map((board) => (
          <div className="board" key={board.id}>
            <div
              className="board-top edit-board-btn"
              onClick={(e) => this.createModal(e, board.id)}
            >
              {board.name}
            </div>
            <Tasks boardId={board.id} />
          </div>
        ))}
        <button
          className="board-top create-board-btn"
          onClick={(e) => this.createModal(e)}
        >
          +Board
        </button>
      </div>
    );
  }
}

export default Boards;
