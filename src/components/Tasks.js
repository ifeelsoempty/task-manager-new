import React, { Component } from "react";
import TaskInput from "./TaskInput";
import TaskButton from "./Button/TaskButton";
import Axios from "axios";

class Tasks extends Component {
  state = {
    tasks: [],
  };

  componentDidMount() {
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

  render() {
    const { boardId } = this.props;
    return (
      <div>
        {this.state.tasks.map((task) => {
          return (
            <div key={task.id} className={task.done === "1" ? "task task-done" : "task"}>
              <div className={task.done === "1" ? "description task-done-line" : "description"}>{task.description}</div>
              <TaskButton
                task={task}
                getTasks={this.getTasks}
                className="check-btn"
              />
            </div>
          );
        })}
        <TaskInput getTasks={this.getTasks} boardId={boardId} />
      </div>
    );
  }
}

export default Tasks;
