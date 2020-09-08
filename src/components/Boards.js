import React, { Component } from "react";
import ReactDOM from "react-dom";
import Tasks from "./Tasks";
import CreateTaskForm from "./CreateTaskForm";
import BoardModal from "./Modals/BoardModal";

class Boards extends Component {
  state = {
    boards: [],
  };

  componentDidMount() {
    this.setState({ boards: this.props.boards });
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

  changeTaskBoardInState = (task, oldBoardId, elFromPoint) => {
    const updatedBoards = this.state.boards;

    updatedBoards.map((boardItem) => {
      if (!boardItem.tasks) boardItem.tasks = [];

      //Мб проблема тут
      if (boardItem.id === oldBoardId) {
        boardItem.tasks = boardItem.tasks.filter((taskItem) =>
          taskItem.id === task.id ? false : true
        );
      }

      //Сначала удаляет, а потом ставит, соответственно индекс смещается на +1 из за того что elfrompoint равен следующему значению
      //Нужно как то удалять предыдущую таску
      if (boardItem.id === task.board_id) {
        let index = 0;

        boardItem.tasks.map((taskItem) => {
          if (`task-${taskItem.id}` === elFromPoint.id) {
            index = boardItem.tasks.indexOf(taskItem);
          }
        });
        boardItem.tasks.splice(index + 1, 0, task);
      }
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
              className="board-top board-edit-btn"
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
            <CreateTaskForm
              boards={this.state.boards}
              boardId={board.id}
              createTaskInState={this.createTaskInState}
            />
          </div>
        ))}
        <button
          className="board-top board-create-btn"
          onClick={(e) => this.createBoardModal(e)}
        >
          Add Board +
        </button>
      </div>
    );
  }
}

export default Boards;
