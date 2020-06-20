import React, { Component } from "react";

class TaskInput extends Component {
  state = {
    taskData: {
      description: "",
      board_id: this.props.boardId,
    },
  };

  addValueToState = (event) => {
    this.setState({
      taskData: {
        description: event.target.value,
        board_id: this.props.boardId,
      },
    });
  };

  submitTask = () => {
    if (this.state.taskData.description.trim() !== "") {
      fetch("http://app-react/api/task/create", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.taskData),
      }).then(() => {
        this.props.getTasks();
      });
      this.setState({ taskData: { description: "" } });
    }
  };

  render() {
    return (
      <div className="task-input">
        <input
          onChange={this.addValueToState}
          className="input"
          value={this.state.taskData.description}
        />
        <button onClick={this.submitTask} className="button">
          Add
        </button>
      </div>
    );
  }
}

export default TaskInput;
