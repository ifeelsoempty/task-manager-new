import React from "react";

const CheckButton = ({ task, taskCoordinates, checkTaskInState }) => {
  function checkTask() {
    task.done === '1' ? task.done = '0': task.done = '1';
    console.log(task.done)
    fetch("http://app-react/api/task/update", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    }).then(() => checkTaskInState(task));
  }

  return (
    <button
      style={{
        left: `${taskCoordinates.x + (taskCoordinates.width / 100) * 89 - 5}px`,
        top: `${taskCoordinates.y}px`,
      }}
      className="task-edit-btns task-check-btn"
      onClick={checkTask}
    >
      {task.done === '0' ? '✓' : '↑'}
    </button>
  );
};

export default CheckButton;
