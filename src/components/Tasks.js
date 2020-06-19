import React, { Component } from "react";
import TaskInput from "./TaskInput";
import Axios from "axios";

class Tasks extends Component {
  state = {
    tasks: [],
  };

  componentDidMount() {
    this.renderTasks();
  }

  renderTasks = () => {
    Axios.post(`http://app-react/api/boards/${this.props.boardId}/tasks`).then(
      (res) => {
        const tasks = res.data;
        this.setState({ tasks });
      }
    );
  };

  render() {
    return (
      <div>
        {this.state.tasks.map((task) => {
          return (
            <div key={task.id} className="task">
              {task.description}
            </div>
          );
        })}
        <TaskInput
          renderTasks={this.renderTasks}
          boardId={this.props.boardId}
        />
      </div>
    );
  }
}

export default Tasks;
