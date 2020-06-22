import React, { Component } from "react";
import DeleteButton from "./Button/DeleteButton";
import CheckButton from "./Button/CheckButton";

class UpdateModal extends Component {
  state = {
    updatedValue: {},
  };

  componentWillUnmount(){
    this.props.getTasks();
  }
  render() {
    const { task, removeModal, updateTask} = this.props;
    const taskDOM = document.getElementById(`${task.id}`);
    const taskCoordinates = taskDOM.getBoundingClientRect();
    return (
      <div
        className="modal"
        onMouseDown={(e) =>
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
          style={{
            left: `${taskCoordinates.x}px`,
            width: `${(taskCoordinates.width / 100) * 86}px`,
          }}
          className="update-btns save-btn"
          onClick={() => updateTask(this.state.updatedValue, task)}
        >
          Save
        </button>
        <DeleteButton
          taskCoordinates={taskCoordinates}
          removeModal={removeModal}
          task={task}
        >
          ✗
        </DeleteButton>
        <CheckButton
          taskCoordinates={taskCoordinates}
          removeModal={removeModal}
          task={task}
        >
          ✓
        </CheckButton>
      </div>
    );
  }
}

export default UpdateModal;
