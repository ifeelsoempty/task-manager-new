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
    Axios.post("http://app-react/api/boards/get").then((res) => {
      const boards = res.data;
      this.setState({ boards });
    });
  }

  changeBoardState = (operation, board) => {
    switch (operation) {
      case "create":
        this.createBoardInState(board);
        break;
      case "update":
        this.updateBoardInState(board);
        break;
      case "delete":
        this.deleteBoardFromState(board);
        break;
    }
    this.removeBoardModal();
  };

  createBoardInState = (board) => {
    this.setState({ boards: [...this.state.boards, board] });
  };

  updateBoardInState = (board) => {
    const updatedBoards = this.state.boards;
    updatedBoards.map((item) => {
      if (item.id === board.id) item.name = board.name;
    });
    this.setState({ boards: updatedBoards });
  };

  deleteBoardFromState = (board) => {
    const updatedBoards = this.state.boards.filter((item) =>
      item.id === board.id ? false : true
    );
    console.log(board.id);

    this.setState({ boards: updatedBoards });
  };

  createTaskInState = (task) => {
    const updatedBoards = this.state.boards;
    updatedBoards.map((boardItem) => {
      if (!boardItem.tasks) boardItem.tasks = [];
      if (boardItem.id === task.board_id) boardItem.tasks.push(task);
    });

    this.setState({ updatedBoards });
  };

  updateTaskInState = (task) => {
    const updatedBoards = this.state.boards;
    updatedBoards.map((boardItem) => {
      if (!boardItem.tasks) boardItem.tasks = [];
      if (boardItem.id === task.board_id) {
        boardItem.tasks.map((taskItem) => {
          if (taskItem.id === task.id) taskItem.description = task.description;
        });
      }
    });

    this.setState({ updatedBoards });
    this.removeTaskModal();
  };

  deleteTaskFromState = (task) => {
    const updatedBoards = this.state.boards;
    updatedBoards.map((boardItem) => {
      if (!boardItem.tasks) boardItem.tasks = [];
      if (boardItem.id === task.board_id) {
        boardItem.tasks = boardItem.tasks.filter((taskItem) =>
          taskItem.id === task.id ? false : true
        );
      }
    });

    this.setState({ updatedBoards });
    this.removeTaskModal();
  };

  checkTaskInState = (task) => {
    const updatedBoards = this.state.boards;
    updatedBoards.map((boardItem) => {
      if (!boardItem.tasks) boardItem.tasks = [];
      if (boardItem.id === task.board_id) {
        boardItem.tasks.map((taskItem) => {
          if (taskItem.id === task.id) taskItem.done = task.done;
        });
      }
    });

    this.setState({ updatedBoards });
    this.removeTaskModal();
  };

  changeTaskBoardInState = (task, oldBoard) => {
    const updatedBoards = this.state.boards;
    updatedBoards.map((boardItem) => {
      if (!boardItem.tasks) boardItem.tasks = [];
      if (boardItem.id === oldBoard) {
        boardItem.tasks = boardItem.tasks.filter((taskItem) =>
          taskItem.id === task.id ? false : true
        );
      } else if (boardItem.id === task.board_id) boardItem.tasks.push(task);
    });

    this.setState({ updatedBoards });
  };

  removeTaskModal = () => {
    ReactDOM.unmountComponentAtNode(
      document.getElementById("modal"),
      document.getElementById("task-modal")[0]
    );
  };

  removeBoardModal = () => {
    ReactDOM.unmountComponentAtNode(
      document.getElementById("modal"),
      document.getElementById("board-modal")
    );
  };

  createBoardModal = (e, boardId) => {
    ReactDOM.render(
      <BoardModal
        changeBoardState={this.changeBoardState}
        boards={this.state.boards}
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
            <Tasks
              board={board}
              deleteTaskFromState={this.deleteTaskFromState}
              updateTaskInState={this.updateTaskInState}
              checkTaskInState={this.checkTaskInState}
              changeTaskBoardInState={this.changeTaskBoardInState}
              removeTaskModal={this.removeTaskModal}
            />
            <CreateTask
              boards={this.state.boards}
              boardId={board.id}
              createTaskInState={this.createTaskInState}
            />
          </div>
        ))}
        <button
          className="board-top create-board-btn"
          onClick={(e) => this.createBoardModal(e)}
        >
          Add Board +
        </button>
      </div>
    );
  }
}

export default Boards;
