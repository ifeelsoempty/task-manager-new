<?php


class TaskService
{
    public static function createTask($task)
    {
        $db = Db::getConnection();
        $link = mysqli_connect("localhost", "root", "", "tk_man");

        $query = "INSERT INTO tasks (description, board_id, done) VALUES ('" . $task->description . "'," . $task->board_id . ",0)";
        mysqli_query($link, $query);

        $created_id = mysqli_insert_id($link);
        $created = $db->query("SELECT * FROM tasks WHERE id = " . $created_id)->fetch();

        return $created;
    }

    public static function updateTask($task)
    {
        $db = Db::getConnection();

        $db->query("UPDATE tasks SET description = '" . $task->description . "', done ='" . $task->done . "' WHERE tasks.id = " . $task->id);

        return $task;
    }

    public static function deleteTask($task)
    {
        $db = Db::getConnection();

        $db->query("DELETE FROM tasks WHERE tasks.id = " . $task->id . " ");

        return $task;
    }

    public static function changeTaskBoard($task)
    {
        $db = Db::getConnection();

        $db->query("UPDATE tasks SET board_id = '" . $task->board_id . "' WHERE tasks.id = " . $task->id . " ");

        return $task;
    }
}
