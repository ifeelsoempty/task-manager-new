<?php

include_once ROOT . '/services/BoardsService.php';

class BoardsController
{
    public function GetUserId()
    {
        $user = array(
            "username" => $_GET['username'],
            "password" => $_GET['password']
        );

        $userId = BoardsService::getUserId($user);

        echo json_encode($userId);

        return true;
    }

    public function CreateBoard()
    {
        $json_str = file_get_contents('php://input');
        $board = json_decode($json_str);

        $created = BoardsService::createBoard($board);

        echo json_encode($created);
        return true;
    }

    public function GetBoards()
    {
        $boards = array();
        $boards = BoardsService::getBoards();

        echo json_encode($boards);

        return true;
    }

    public function UpdateBoard()
    {
        $json_str = file_get_contents('php://input');
        $board = json_decode($json_str);

        $updated = BoardsService::updateBoard($board);

        echo json_encode($updated);
        return true;
    }

    public function DeleteBoard()
    {
        $json_str = file_get_contents('php://input');
        $board = json_decode($json_str);

        $deleted = BoardsService::deleteBoard($board);

        echo json_encode($deleted);
        return true;
    }

    public function TasksByBoardId($id)
    {
        $tasksById = array();
        $tasksById = BoardsService::getTasksByBoardId($id);

        if ($tasksById == false) {
            getResponse404Error('Board not Found');
        } else {
            echo json_encode($tasksById);
        }

        return true;
    }
}
