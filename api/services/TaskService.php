<?php


    class TaskService{
        public static function updateTask($task){
            $db = Db::getConnection();
            printf($task->done);
            $task = $db->query("UPDATE tasks SET description = '". $task->description ."', done ='". $task->done ."' WHERE tasks.id = ".$task->id." ");

            return $task;
        }

        public static function deleteTask($task){
            $db = Db::getConnection();

            $task = $db->query("DELETE FROM tasks WHERE tasks.id = ".$task->id." ");

            return $task;
        }

        public static function createTask($task){
            $db = Db::getConnection();

            $task = $db->query("INSERT INTO tasks (id, description, board_id, done) VALUES (NULL,'".$task->description."',".$task->board_id.",0)");

            return $task;
        }
    }