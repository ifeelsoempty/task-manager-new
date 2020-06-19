<?php


    class TaskService{
        public static function updateTask($task){
            $db = Db::getConnection();

            $task = $db->query("UPDATE tasks SET description = '". $task->description ."' WHERE tasks.id = ".$task->id." ");

            return $task;
        }

        public static function deleteTask($task){
            $db = Db::getConnection();

            $task = $db->query("DELETE FROM tasks WHERE tasks.id = ".$task->id." ");

            return $task;
        }

        public static function createTask($task){
            $db = Db::getConnection();

            $task = $db->query("INSERT INTO tasks (id, description, board_id) VALUES (NULL,'".$task->description."',".$task->board_id.")");

            return $task;
        }
    }