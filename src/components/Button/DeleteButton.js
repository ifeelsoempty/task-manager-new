import React from "react";

const DeleteButton = ({ removeModal, task, children, taskCoordinates }) => {
  function deleteTask() {
    fetch("http://app-react/api/task/delete", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    }).then(removeModal);
  }

  return (
    <button
      style={{
        left: `${taskCoordinates.x + (taskCoordinates.width / 100) * 89}px`,
        top: `-${taskCoordinates.height + 47}px`,
      }}
      className="update-btns delete-btn"
      onClick={deleteTask}
    >
      {children}
    </button>
  );
};

export default DeleteButton;
