import React, { Component } from "react";

class CreateTask extends Component {
  state = {
    description: "",
  };

  addDescriptionToState = (event) => {
    this.setState({ description: event.target.value });
  };

  createTask = () => {
    //Алгоритм поиска таски с наибольшем Id в массиве boards
    if (this.state.description.trim() !== "") {
      let taskId = 0;
      this.props.boards.map((boardItem) => {
        let maxId = 0;
        if (boardItem.tasks)
          boardItem.tasks.map((taskItem) =>
            +taskItem.id > maxId ? (maxId = +taskItem.id) : false
          );
        if (maxId > taskId) taskId = maxId;
      });

      const task = {
        id: String(taskId + 1),
        description: this.state.description,
        board_id: this.props.boardId,
        done: "0",
      };

      fetch("http://app-react/api/task/create", {
        method: "POST",
        body: JSON.stringify(task),
      }).then(() => this.props.createTaskInState(task));
      this.setState({ description: "" });
    }
  };

  render() {
    return (
      <div className="create-task">
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

export default CreateTask;
