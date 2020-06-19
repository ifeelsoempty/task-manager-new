import React, { Component } from "react";

class TaskInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskData: {
        description: "",
        board_id: "",
      },
    };
  }

  addValueToState = (event) => {
    this.setState({
      taskData: {
        description: event.target.value,
        board_id: this.props.boardId,
      },
    });
  };

  submitTask = (e) => {
    fetch("http://app-react/api/task/create", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.taskData),
    }).then(() => {
      this.props.renderTasks();
    });
    const input = document.querySelectorAll(".task-input input")[
      this.props.boardId - 1
    ];
    input.value = "";
  };

  render() {
    return (
      <div className="task-input">
        <input onChange={this.addValueToState} className="input"></input>
        <button onClick={this.submitTask} className="button">
          Add
        </button>
      </div>
    );
  }
}

export default TaskInput;
