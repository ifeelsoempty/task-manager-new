import React, { Component } from "react";
import ReactDOM from "react-dom";

class BoardModal extends Component {
  state = {
    boardName:
      this.props.element.className === "top update-board-btn"
        ? this.props.element.innerText
        : "",
  };

  componentDidMount() {
    const createBoardInputDOM = document.getElementsByClassName(
      "board-input"
    )[0];
    createBoardInputDOM.select();
  }

  componentWillUnmount() {
    this.props.element.style.color = "#ffffff";
  }

  submitBoard = (operation) => {
    const board = { id: this.props.boardId, name: this.state.boardName };

    if (this.state.boardName.trim() !== "") {
      fetch(`http://app-react/api/boards/${operation}`, {
        method: "POST",
        body: JSON.stringify(board),
      }).then(this.props.removeModal);
    }
  };

  deleteBoard = (operation) => {
    const board = { id: this.props.boardId, name: this.state.boardName };

    if (this.state.boardName.trim() !== "") {
      fetch(`http://app-react/api/boards/delete`, {
        method: "POST",
        body: JSON.stringify(board),
      }).then(this.props.removeModal);
    }
  };

  render() {
    const { element, removeModal } = this.props;
    const elCoordinates = element.getBoundingClientRect();
    element.style.color = "transparent";
    return (
      <div
        onMouseDown={(e) =>
          e.target.id === "board-modal"
            ? element.className === "top update-board-btn"
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
            left: `${elCoordinates.x}px`,
            top: `${elCoordinates.y}px`,
            width: `${elCoordinates.width}px`,
            height: `${elCoordinates.height}px`,
          }}
          onChange={(e) => {
            this.setState({ boardName: e.target.value });
            if (element.className === "top update-board-btn") {
              element.innerText = e.target.value;
            }
          }}
        ></textarea>
        {element.className === "top create-board-btn" ? (
          <button
            className="accept-board-btn"
            style={{
              left: `${elCoordinates.x}px`,
              top: `${elCoordinates.y + elCoordinates.height}px`,
              width: `${elCoordinates.width}px`,
            }}
            onClick={() => this.submitBoard("create")}
          >
            Create
          </button>
        ) : (
          <button
            className="delete-board-btn"
            style={{
              left: `${elCoordinates.x}px`,
              top: `${elCoordinates.y + elCoordinates.height}px`,
              width: `${elCoordinates.width}px`,
            }}
            onClick={() => this.deleteBoard("delete")}
          >
            Delete
          </button>
        )}
      </div>
    );
  }
}

export default BoardModal;
