import React, { Component } from "react";

class AddBoardModal extends Component {
  state = {
    boardName: "",
  };

  componentDidMount() {
    const addBoardInputDOM = document.getElementsByClassName(
      "add-board-input"
    )[0];
    addBoardInputDOM.focus();
  }

  submitBoard = () => {
    const board = { name: this.state.boardName };

    if (this.state.boardName.trim() !== "") {
      fetch("http://app-react/api/boards/create", {
        method: "POST",
        body: JSON.stringify(board),
      }).then(this.props.removeModal);
    }
  };

  render() {
    const { removeModal } = this.props;
    const addBoardBtnDOM = document.getElementsByClassName(
      "add-board-btn"
    )[0];
    const btnCoordinates = addBoardBtnDOM.getBoundingClientRect();
    return (
      <div
        onMouseDown={(e) =>
          e.target.id === "add-board-modal" ? removeModal() : false
        }
        id="add-board-modal"
        className="modal"
        style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
      >
        <textarea
          className="add-board-input"
          style={{
            left: `${btnCoordinates.x + 5}px`,
            top: `${btnCoordinates.y + 5}px`,
            width: `${btnCoordinates.width - 10}px`,
            height: `${btnCoordinates.height - 10}px`,
          }}
          onChange={(e) => this.setState({ boardName: e.target.value })}
        ></textarea>
        <button
          className="accept-board-btn accept-btn"
          style={{
            left: `${btnCoordinates.x}px`,
            top: `${btnCoordinates.y + 55}px`,
            width: `${btnCoordinates.width}px`,
          }}
          onClick={this.submitBoard}
        >
          Add board
        </button>
      </div>
    );
  }
}

export default AddBoardModal;
