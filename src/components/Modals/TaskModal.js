import React, { Component } from "react";
import DeleteButton from "../Buttons/DeleteButton";
import CheckButton from "../Buttons/CheckButton";

class TaskModal extends Component {
  state = {
    description: this.props.taskDOM.innerText,
  };

  componentDidMount() {
    const editTaskInputDOM = document.getElementsByClassName(
      "edit-task-input"
    )[0];
    editTaskInputDOM.select();
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
        id="task-modal"
        className="modal"
        onMouseDown={(e) =>
          e.target.classList.contains("modal") ? removeModal() : false
        }
      >
        <textarea
          onKeyDown={(e) => (e.keyCode === 13 ? this.updateTask() : false)}
          onChange={(e) => this.setState({ description: e.target.value })}
          className="edit-task-input"
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
          className="edit-btns accept-task-btn"
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

export default TaskModal;
