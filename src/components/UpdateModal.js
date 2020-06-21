import React, { Component } from "react";
import DeleteButton from "./Button/DeleteButton";
import CheckButton from "./Button/CheckButton";

class UpdateModal extends Component {
  state = {
    updatedValue: {},
  };
  render() {
    const { task, removeModal, updateTask, getTasks } = this.props;
    const taskDOM = document.getElementById(`${task.id}`);
    const taskCoordinates = taskDOM.getBoundingClientRect();
    return (
      <div
        className="modal"
        onClick={(e) =>
          e.target.className === "modal" ? removeModal() : false
        }
      >
        <textarea
          onChange={(e) => this.setState({ updatedValue: e.target.value })}
          className="update-input"
          style={{
            width: `${(taskCoordinates.width / 100) * 86}px`,
            height: `${taskCoordinates.height}px`,
            marginTop: `${taskCoordinates.y}px`,
            marginLeft: `${taskCoordinates.x}px`,
          }}
        >
          {task.description}
        </textarea>
        <button
          style={{ left: `${taskCoordinates.x}px`, width: `${taskCoordinates.width / 100 * 86}px`}}
          className="update-btns save-btn"
          onClick={() => updateTask(this.state.updatedValue, task)}
        >
          Save
        </button>
        <DeleteButton taskCoordinates={taskCoordinates} removeModal={removeModal} task={task} getTasks={getTasks}>
          ✗
        </DeleteButton>
        <CheckButton taskCoordinates={taskCoordinates} removeModal={removeModal} task={task} getTasks={getTasks}>
          ✓
        </CheckButton>
      </div>
    );
  }
}

export default UpdateModal;
