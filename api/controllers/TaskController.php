<?php

include_once ROOT . '/services/TaskService.php';

class TaskController
{
    public function CreateTask()
    {
        $json_str = file_get_contents('php://input');
        $task = json_decode($json_str);

        $created = TaskService::createTask($task);

        echo json_encode($created);
        return true;
    }

    public function UpdateTask()
    {
        $json_str = file_get_contents('php://input');
        $task = json_decode($json_str);

        $updated = TaskService::updateTask($task);

        echo json_encode($updated);
        return true;
    }

    public function ChangeTaskBoard()
    {
        $json_str = file_get_contents('php://input');
        $task = json_decode($json_str);

        $updated = TaskService::changeTaskBoard($task);

        echo json_encode($updated);
        return true;
    }

    public function DeleteTask()
    {
        $json_str = file_get_contents('php://input');
        $task = json_decode($json_str);

        $deleted = TaskService::deleteTask($task);

        echo json_encode($deleted);
        return true;
    }
}
