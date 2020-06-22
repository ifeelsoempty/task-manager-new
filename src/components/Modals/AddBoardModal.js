import React, { Component } from "react";

class AddBoardModal extends Component {
  state = {
    newBoardName: ''
  }

  componentDidMount() {
    const addBoardInputDOM = document.getElementsByClassName(
      "add-board-input"
    )[0];
    addBoardInputDOM.focus();
  }

  addBoard = () => {
    const newBoard = {
      name: this.state.newBoardName
    }
    fetch("http://app-react/api/boards/create", {
      method: "POST",
      body: JSON.stringify(newBoard),
    }).then(this.props.removeModal);
  }

  render() {
    const { getBoards, removeModal } = this.props;
    const addBoardButtonDOM = document.getElementsByClassName(
      "add-board-btn"
    )[0];
    const btnCoordinates = addBoardButtonDOM.getBoundingClientRect();
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
          onChange={(e) => this.setState({newBoardName: e.target.value})}
        ></textarea>
        <button
          className="accept-board-btn accept-btn"
          style={{
            left: `${btnCoordinates.x}px`,
            top: `${btnCoordinates.y + 55}px`,
            width: `${btnCoordinates.width}px`,
          }}
          onMouseDown={this.addBoard}
        >
          Add board
        </button>
      </div>
    );
  }
}

export default AddBoardModal;
