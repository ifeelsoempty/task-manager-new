import React, { Component } from "react";
import ReactDOM from "react-dom";
import CreateTask from "./CreateTask";
import TaskModal from "./Modals/TaskModal";
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
      <TaskModal
        task={task}
        taskDOM={document.getElementById(`task-${task.id}`)}
        removeModal={this.removeModal}
      />,
      document.getElementById("modal")
    );
  };

  removeModal = (e) => {
    ReactDOM.unmountComponentAtNode(
      document.getElementById("modal"),
      document.getElementById("task-modal")[0]
    );
    this.getTasks();
  };

  onMouseDown = (e, task) => {
    const taskDOM = e.target;
    taskDOM.style.zIndex = "999";
    const taskCoordinates = taskDOM.getBoundingClientRect();

    const onMouseMove = (e) => {
      taskDOM.style.top =
        e.clientY - taskCoordinates.y - taskDOM.offsetHeight / 2 + "px";
      taskDOM.style.left =
        e.clientX - taskCoordinates.x - taskDOM.offsetWidth / 2 + "px";
    };

    document.addEventListener("mousemove", onMouseMove);

    taskDOM.addEventListener("mouseup", (e) => {
      taskDOM.hidden = true;
      const elFromPoint = document.elementFromPoint(e.clientX, e.clientY); 
      //elFromPoint - Таска из доски на которую "приземляется" перемещаемая таска

      if (elFromPoint.classList.contains("task")) {
        task.board_id = elFromPoint.parentElement.id;//Сам запрос выполняется корректно и в базе данных все меняется

        fetch("http://app-react/api/task/changeBoard", {
          method: "POST",
          body: JSON.stringify(task),
        });
        //Не знаю как после этого запроса обновить ту доску на которую должна переместится таска
      }

      taskDOM.hidden = false;
      taskDOM.style.top = "";
      taskDOM.style.left = "";
      taskDOM.style.zIndex = "";
      taskDOM.removeAttribute("style");
      document.removeEventListener("mousemove", onMouseMove);
    });
  };

  render() {
    const { boardId } = this.props;
    return (
      <div>
        <div id={boardId}>
          {this.state.tasks.map((task) => (
            <div
              onMouseDown={(e) => this.onMouseDown(e, task)}
              id={`task-${task.id}`}
              key={task.id}
              className={task.done === "1" ? "task task-done" : "task"}
            >
              <div
                className={
                  task.done === "1"
                    ? "task-description line-through"
                    : "task-description"
                }
              >
                {task.description}
              </div>
              <button
                className="task-btn"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={() => this.createModal(task)}
              >
                <img
                  src="https://img.icons8.com/windows/20/000000/edit.png"
                  className="task-btn-image"
                />
              </button>
            </div>
          ))}
        </div>
        <CreateTask getTasks={this.getTasks} boardId={boardId} />
      </div>
    );
  }
}

export default Tasks;
