import React, { Component } from "react";

class CreateTask extends Component {
  state = {
    taskData: {
      description: "",
      board_id: this.props.boardId,
    },
  };

  addDescriptionToState = (event) => {
    this.setState({
      taskData: {
        description: event.target.value,
        board_id: this.props.boardId,
      },
    });
  };

  createTask = () => {
    if (this.state.taskData.description.trim() !== "") {
      fetch("http://app-react/api/task/create", {
        method: "POST",
        body: JSON.stringify(this.state.taskData),
      }).then(() => {
        this.props.getTasks();
      });
      this.setState({ taskData: { description: "" } });
    }
  };

  render() {
    return (
      <div className="create-task">
        <input
          onKeyDown={(e) => (e.keyCode === 13 ? this.createTask() : false)}
          onChange={this.addDescriptionToState}
          value={this.state.taskData.description}
        />
        <button onClick={this.createTask}>Add</button>
      </div>
    );
  }
}

export default CreateTask;
