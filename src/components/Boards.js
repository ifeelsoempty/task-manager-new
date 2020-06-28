import React, { Component } from "react";
import ReactDOM from "react-dom";
import Tasks from "./Tasks";
import CreateTask from "./CreateTask";
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
    Axios.post("http://app-react/api/boards/get").then((res) => {
      const boards = res.data;
      this.setState({ boards });
    });
  };

  removeBoardModal = () => {
    ReactDOM.unmountComponentAtNode(
      document.getElementById("modal"),
      document.getElementById("board-modal")
    );
    this.getBoards();
  };

  createBoardModal = (e, boardId) => {
    ReactDOM.render(
      <BoardModal
        boardId={boardId}
        boardDOM={e.target}
        removeBoardModal={this.removeBoardModal}
      />,
      document.getElementById("modal")
    );
  };

  render() {
    return (
      <div className="boards">
        {this.state.boards.map((board) => (
          <div className="board" key={board.id}>
            <div
              className="board-top edit-board-btn"
              onClick={(e) => this.createBoardModal(e, board.id)}
            >
              {board.name}
            </div>
            <Tasks getBoards={this.getBoards} board={board} />
            <CreateTask getBoards={this.getBoards} boardId={board.id} />
          </div>
        ))}
        <button
          className="board-top create-board-btn"
          onClick={(e) => this.createBoardModal(e)}
        >
          +Board
        </button>
      </div>
    );
  }
}

export default Boards;
