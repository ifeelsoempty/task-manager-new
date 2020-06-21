import React from "react";
import DeleteButton from "./DeleteButton";
import CheckButton from "./CheckButton";

const TaskButton = ({ task, getTasks, className }) => {
  return (
    <div>
      {task.done === "0" ? (
        <CheckButton task={task} getTasks={getTasks} className={className}>
          ✓
        </CheckButton>
      ) : (
        <DeleteButton task={task} getTasks={getTasks} className={className}>
          ✗
        </DeleteButton>
      )}
    </div>
  );
};

export default TaskButton;
