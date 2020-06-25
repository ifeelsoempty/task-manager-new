import React, { Component } from "react";
import ReactDOM from "react-dom";

class BoardModal extends Component {
  state = {
    boardName:
      this.props.boardDOM.classList.contains("update-board-btn")
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
      };

      fetch(`http://app-react/api/boards/${operation}`, {
        method: "POST",
        body: JSON.stringify(board),
      }).then(this.props.removeModal);
    }
  };

  render() {
    const { boardDOM, removeModal } = this.props;
    const boardCoordinates = boardDOM.getBoundingClientRect();
    boardDOM.style.color = "transparent";
    return (
      <div
        onMouseDown={(e) =>
          e.target.id === "board-modal"
            ? boardDOM.classList.contains("update-board-btn")
              ? this.submitBoard("update")
              : removeModal()
            : false
        }
        id="board-modal"
        className="modal"
        style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
      >
        <textarea
          className="board-input"
          spellcheck="false"
          value={this.state.boardName}
          style={{
            left: `${boardCoordinates.x}px`,
            top: `${boardCoordinates.y}px`,
            width: `${boardCoordinates.width}px`,
            height: `${boardCoordinates.height}px`,
          }}
          onChange={(e) => {
            this.setState({ boardName: e.target.value });
            if (boardDOM.classList.contains("update-board-btn")) {
              boardDOM.innerText = e.target.value;
            }
          }}
        ></textarea>
        {boardDOM.classList.contains("top create-board-btn") ? (
          <button
            className="accept-board-btn"
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
            className="delete-board-btn"
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
