import React, { Component } from "react";

class CreateTaskForm extends Component {
  state = {
    description: "",
  };

  addDescriptionToState = (event) => {
    this.setState({ description: event.target.value });
  };

  createTask = () => {
    const task = {
      description: this.state.description,
      board_id: this.props.boardId,
      done: "0",
    };

    fetch("http://app-react/api/task/create", {
      method: "POST",
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((res) => this.props.createTaskInState(res));
    this.setState({ description: "" });
  };

  render() {
    return (
      <div className="task-create-form">
        <input
          onKeyDown={(e) => (e.keyCode === 13 ? this.createTask() : false)}
          onChange={this.addDescriptionToState}
          value={this.state.description}
        />
        <button onClick={this.createTask}>Add</button>
      </div>
    );
  }
}

export default CreateTaskForm;
