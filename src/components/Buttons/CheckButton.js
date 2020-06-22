import React from "react";

const CheckButton = ({ removeModal, task, taskCoordinates }) => {
  function checkTask() {
    task.done = 1;
    fetch("http://app-react/api/task/update", {
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
        left: `${taskCoordinates.x + (taskCoordinates.width / 100) * 89 - 5}px`,
        top: `${taskCoordinates.y - taskCoordinates.height - 47}px`,
      }}
      className="update-btns check-btn"
      onClick={checkTask}
    >
      ✓
    </button>
  );
};

export default CheckButton;
