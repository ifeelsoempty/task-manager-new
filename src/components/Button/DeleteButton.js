import React from "react";

const DeleteButton = ({ task, getTasks, className, children }) => {
  function deleteTask() {
    fetch("http://app-react/api/task/delete", {
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
    <button className={className} onClick={deleteTask}>
      {children}
    </button>
  );
};

export default DeleteButton;
