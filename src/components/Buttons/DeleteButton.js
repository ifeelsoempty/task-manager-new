import React from "react";

const DeleteButton = ({ task, taskCoordinates, deleteTaskFromState }) => {
  function deleteTask() {
    fetch("http://app-react/api/task/delete", {
      method: "POST",
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((res) => deleteTaskFromState(res));
  }

  return (
    <button
      style={{
        left: `${taskCoordinates.x + (taskCoordinates.width / 100) * 89 - 5}px`,
        top: `${taskCoordinates.y + 46}px`,
      }}
      className="task-edit-btns task-delete-btn"
      onClick={deleteTask}
    >
      ✗
    </button>
  );
};

export default DeleteButton;
