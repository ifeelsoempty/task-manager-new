import React, { Component } from "react";
import DeleteButton from "../Buttons/DeleteButton";
import CheckButton from "../Buttons/CheckButton";

class UpdateModal extends Component {
  state = {
    description: this.props.taskDOM.innerText,
  };

  componentDidMount() {
    const UpdateTaskInputDOM = document.getElementsByClassName(
      "update-task-input"
    )[0];
    UpdateTaskInputDOM.select();
  }

  updateTask = () => {
    if (this.state.description.trim() !== "") {
      const updatedTask = this.props.task;
      updatedTask.description = this.state.description;

      fetch("http://app-react/api/task/update", {
        method: "POST",
        body: JSON.stringify(updatedTask),
      }).then(this.props.removeModal);
    }
  };

  render() {
    const { task, taskDOM, removeModal } = this.props;
    const taskCoordinates = taskDOM.getBoundingClientRect();
    return (
      <div
        id="update-task-modal"
        className="modal"
        onMouseDown={(e) =>
          e.target.classList.contains("modal") ? removeModal() : false
        }
      >
        <textarea
          onKeyDown={(e) => (e.keyCode === 13 ? this.updateTask() : false)}
          onChange={(e) => this.setState({ description: e.target.value })}
          className="update-task-input"
          value={this.state.description}
          style={{
            width: `${(taskCoordinates.width / 100) * 86}px`,
            height: `${taskCoordinates.height}px`,
            top: `${taskCoordinates.y}px`,
            left: `${taskCoordinates.x}px`,
          }}
        ></textarea>
        <button
          style={{
            left: `${taskCoordinates.x}px`,
            width: `${(taskCoordinates.width / 100) * 86}px`,
            top: `${taskCoordinates.y}px`,
          }}
          className="update-btns update-btn"
          onClick={this.updateTask}
        >
          Save
        </button>
        <CheckButton
          taskCoordinates={taskCoordinates}
          removeModal={removeModal}
          task={task}
        />
        <DeleteButton
          taskCoordinates={taskCoordinates}
          removeModal={removeModal}
          task={task}
        />
      </div>
    );
  }
}

export default UpdateModal;
