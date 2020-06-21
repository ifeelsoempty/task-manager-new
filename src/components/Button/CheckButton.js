import React from "react";

const CheckButton = ({ task, getTasks, className, children }) => {
  function checkTask() {
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
    <button className={className} onClick={checkTask}>
      {children}
    </button>
  );
};

export default CheckButton;
