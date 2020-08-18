import React, { Component } from "react";

class BoardModal extends Component {
  state = {
    boardName: this.props.boardDOM.classList.contains("board-edit-btn")
      ? this.props.boardDOM.innerText
      : "",
  };

  componentDidMount() {
    const createBoardInputDOM = document.getElementsByClassName(
      "board-input"
    )[0];
    createBoardInputDOM.select();
  }

  componentWillUnmount() {
    this.props.boardDOM.style.color = "#ffffff";
  }

  submitBoard = (operation) => {
    if (this.state.boardName.trim() !== "") {
      const board = {
        id: this.props.boardId,
        name: this.state.boardName,
        userId: String(
          +this.props.boards[this.props.boards.length - 1].user_id
        ),
      };
      fetch(`http://app-react/api/boards/${operation}`, {
        method: "POST",
        body: JSON.stringify(board),
      })
        .then((res) => res.json())
        .then((res) => this.props.changeBoardState(operation, res));
    }
  };

  render() {
    const { boardDOM, removeBoardModal } = this.props;
    const boardCoordinates = boardDOM.getBoundingClientRect();
    boardDOM.style.color = "transparent";
    return (
      <div
        onMouseDown={(e) =>
          e.target.id === "board-modal"
            ? boardDOM.classList.contains("board-edit-btn")
              ? this.submitBoard("update")
              : removeBoardModal()
            : false
        }
        id="board-modal"
        className="modal"
        style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
      >
        <textarea
          className="board-input"
          spellCheck="false"
          value={this.state.boardName}
          style={{
            left: `${boardCoordinates.x}px`,
            top: `${boardCoordinates.y}px`,
            width: `${boardCoordinates.width}px`,
            height: `${boardCoordinates.height}px`,
          }}
          onKeyDown={(e) =>
            e.keyCode === 13
              ? boardDOM.classList.contains("board-edit-btn")
                ? this.submitBoard("update")
                : this.submitBoard("create")
              : false
          }
          onChange={(e) => {
            this.setState({ boardName: e.target.value });
            if (boardDOM.classList.contains("board-edit-btn")) {
              boardDOM.innerText = e.target.value;
            }
          }}
        ></textarea>
        {boardDOM.classList.contains("board-create-btn") ? (
          <button
            className="board-edit-btns board-accept-btn"
            style={{
              left: `${boardCoordinates.x}px`,
              top: `${boardCoordinates.y + boardCoordinates.height}px`,
              width: `${boardCoordinates.width}px`,
            }}
            onClick={() => this.submitBoard("create")}
          >
            Create
          </button>
        ) : (
          <button
            className="board-edit-btns board-delete-btn"
            style={{
              left: `${boardCoordinates.x}px`,
              top: `${boardCoordinates.y + boardCoordinates.height}px`,
              width: `${boardCoordinates.width}px`,
            }}
            onClick={() => this.submitBoard("delete")}
          >
            Delete
          </button>
        )}
      </div>
    );
  }
}

export default BoardModal;
