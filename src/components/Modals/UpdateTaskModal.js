import React, { Component } from "react";
import DeleteButton from "../Buttons/DeleteButton";
import CheckButton from "../Buttons/CheckButton";

class UpdateModal extends Component {
  state = {
    updatedValue: {},
  };
  componentDidMount() {
    const UpdateTaskInputDOM = document.getElementsByClassName(
      "update-task-input"
    )[0];
    UpdateTaskInputDOM.select();
  }

  updateTask = () => {
    const updatedTask = this.props.task;
    updatedTask.description = this.state.updatedValue;
    fetch("http://app-react/api/task/update", {
      method: "POST",
      body: JSON.stringify(updatedTask),
    }).then(this.props.removeModal);
  };

  render() {
    const { task, removeModal } = this.props;
    const taskDOM = document.getElementById(`${task.id}`);
    const taskCoordinates = taskDOM.getBoundingClientRect();
    return (
      <div
        id="update-task-modal"
        className="modal"
        onMouseDown={(e) =>
          e.target.className === "modal" ? removeModal() : false
        }
        styles={{backgroundColor: "rgb(0,0,0, 0.5)"}}
      >
        <textarea
          onChange={(e) => this.setState({ updatedValue: e.target.value })}
          className="update-task-input"
          defaultValue={task.description}
          style={{
            width: `${(taskCoordinates.width / 100) * 86}px`,
            height: `${taskCoordinates.height}px`,
            top: `${taskCoordinates.y}px`,
            left: `${taskCoordinates.x}px`,
          }}
        >
        </textarea>
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
