import React from "react";

const ActionButton = ({ task, getTasks, className } ) => {
  function doneTask() {
    task.done = 1;
    fetch("http://app-react/api/task/update", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    }).then(() => {
      getTasks();
    });
  }

  return (
    <button onClick={doneTask} className={className}>
      <div>{task.done === "1" ? "✗" : "✓"}</div>
    </button>
  );
};

export default ActionButton;
