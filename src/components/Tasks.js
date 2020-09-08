import React, { Component } from "react";
import ReactDOM from "react-dom";
import TaskModal from "./Modals/TaskModal";

class Tasks extends Component {
  createTaskModal = (task) => {
    ReactDOM.render(
      <TaskModal
        task={task}
        taskDOM={document.getElementById(`task-${task.id}`)}
        deleteTaskFromState={this.props.deleteTaskFromState}
        updateTaskInState={this.props.updateTaskInState}
        checkTaskInState={this.props.checkTaskInState}
        removeTaskModal={this.props.removeTaskModal}
      />,
      document.getElementById("modal")
    );
  };

  onMouseDown = (e, task) => {
    const taskDOM = e.target;
    taskDOM.style.zIndex = "999";
    const taskCoordinates = taskDOM.getBoundingClientRect();
    taskDOM.style.cursor = "grabbing";

    const onMouseMove = (e) => {
      taskDOM.style.top =
        e.clientY - taskCoordinates.y - taskDOM.offsetHeight / 2 + "px";
      taskDOM.style.left =
        e.clientX - taskCoordinates.x - taskDOM.offsetWidth / 2 + "px";
    };
    document.addEventListener("mousemove", onMouseMove);

    const onMouseUp = (e) => {
      taskDOM.style.visibility = "hidden";
      const oldBoardId = task.board_id;
      const elFromPoint = document.elementFromPoint(e.clientX, e.clientY);

      if (elFromPoint.classList.contains("task")) {
        task.board_id = elFromPoint.parentElement.id;
        fetch("http://app-react/api/task/changeBoard", {
          method: "POST",
          body: JSON.stringify(task),
        });
        this.props.changeTaskBoardInState(task, oldBoardId, elFromPoint);
      }

      taskDOM.style.visibility = "visible";
      taskDOM.style.top = "";
      taskDOM.style.left = "";
      taskDOM.style.zIndex = "";
      taskDOM.removeAttribute("style");

      taskDOM.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
    };
    taskDOM.addEventListener("mouseup", onMouseUp);
  };

  render() {
    const { board } = this.props;
    return (
      <div id={board.id}>
        {board.tasks
          ? board.tasks.map((task) => (
              <div
                onMouseDown={(e) => this.onMouseDown(e, task)}
                id={`task-${task.id}`}
                key={task.id}
                className={task.done === "1" ? "task task-done" : "task"}
              >
                <div className="task-description">{task.description}</div>
                <button
                  className="task-btn"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={() => this.createTaskModal(task)}
                ></button>
              </div>
            ))
          : false}
      </div>
    );
  }
}

export default Tasks;
