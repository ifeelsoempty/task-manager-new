<?php

    include_once ROOT . '/services/BoardsService.php';

    class BoardsController {

        public function Boards() {
            $boards = array();
            $boards = BoardsService::getBoards();

            echo json_encode($boards);

            return true;
        }

        public function TasksByBoardId($id) {
            $tasksById = array();
            $tasksById = BoardsService::getTasksByBoardId($id);

            if($tasksById == false){
                getResponse404Error('Board not Found');
            }else{
                echo json_encode($tasksById);
            }

            return true;
        }
    }