import React, { Component } from "react";
import ReactDOM from "react-dom";
import TaskInput from "./TaskInput";
import UpdateModal from "./UpdateModal";
import Axios from "axios";

class Tasks extends Component {
  state = {
    tasks: [],
  };

  componentWillMount() {
    this.getTasks();
  }

  getTasks = () => {
    Axios.post(`http://app-react/api/boards/${this.props.boardId}/tasks`).then(
      (res) => {
        const tasks = res.data;
        this.setState({ tasks });
      }
    );
  };

  updateTask = (updatedValue, task) => {
    const updatedTask = task;
    updatedTask.description = updatedValue;
    console.log(updatedTask);
    fetch("http://app-react/api/task/update", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    }).then(this.removeModal);
  };

  createModal = (task) => {
    ReactDOM.render(
      <UpdateModal
        updateTask={this.updateTask}
        task={task}
        removeModal={this.removeModal}
        getTasks={this.getTasks}
      />,
      document.getElementById("modal-container")
    );
  };

  removeModal = (e) => {
    ReactDOM.unmountComponentAtNode(
      document.getElementById("modal-container"),
      document.getElementsByClassName("modal")[0]
    );
  };

  render() {
    const { boardId } = this.props;
    return (
      <div>
        {this.state.tasks.map((task) => {
          return (
            <div
              id={task.id}
              key={task.id}
              className={task.done === "1" ? "task task-done" : "task"}
            >
              <div
                className={
                  task.done === "1"
                    ? "task-description task-done-line"
                    : "task-description"
                }
              >
                {task.description}
              </div>
              <button
                className="task-btn"
                onClick={() => this.createModal(task)}
              >
                <img
                  src="https://img.icons8.com/windows/20/000000/edit.png"
                  className="task-btn-image"
                />
              </button>
            </div>
          );
        })}
        <TaskInput getTasks={this.getTasks} boardId={boardId} />
      </div>
    );
  }
}

export default Tasks;
