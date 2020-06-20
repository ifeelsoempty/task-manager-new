import React, { Component } from "react";
import TaskInput from "./TaskInput";
import ActionButton from "./ActionButton";
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
              <ActionButton
                task={task}
                getTasks={this.getTasks}
                className="action-btn"
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
