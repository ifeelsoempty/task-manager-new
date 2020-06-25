import React, { Component } from "react";
import ReactDOM from "react-dom";
import TaskInput from "./TaskInput";
import UpdateTaskModal from "./Modals/UpdateTaskModal";
import Axios from "axios";

class Tasks extends Component {
  state = {
    tasks: [],
  };

  componentDidMount() {
    this.getTasks();
  }

  getTasks = () => {
    Axios.post(`http://app-react/api/boards/${this.props.boardId}/tasks`)
      .then((res) => {
        const tasks = res.data;
        this.setState({ tasks });
      })
      .catch(() => this.setState({ tasks: [] }));
  };

  createModal = (task) => {
    ReactDOM.render(
      <UpdateTaskModal
        task={task}
        taskDOM={document.getElementById(`${task.id}`)}
        removeModal={this.removeModal}
      />,
      document.getElementById("modal")
    );
  };

  removeModal = (e) => {
    ReactDOM.unmountComponentAtNode(
      document.getElementById("modal"),
      document.getElementById("update-task-modal")[0]
    );
    this.getTasks();
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
