<?php

class BoardsService
{

    public static function createBoard($board)
    {
        $db = Db::getConnection();

        $board = $db->query("INSERT INTO `boards` (`id`, `name`, `user_id`) VALUES (" . $board->id . ", '" . $board->name . "', '" . $board->userId . "');");

        return $board;
    }

    public static function getBoards($user)
    {
        $db = Db::getConnection();

        $boards = array();

        $userId = $db->query('SELECT id FROM users WHERE username="' . $user->username . '" AND password = "' . $user->password . '"')->fetch();

        $result = $db->query('SELECT * FROM boards WHERE user_id = "' . $userId['id'] . '" LIMIT 10');

        $i = 0;
        while ($row = $result->fetch()) {
            $boards[$i]['id'] = $row['id'];
            $boards[$i]['name'] = $row['name'];
            $boards[$i]['user_id'] = $row['user_id'];
            $tasks = $db->query('SELECT * FROM tasks WHERE board_id = ' . $row['id'] . '');
            $y = 0;
            while ($row = $tasks->fetch()) {
                $task[$y]['id'] = $row['id'];
                $task[$y]['description'] = $row['description'];
                $task[$y]['board_id'] = $row['board_id'];
                $task[$y]['done'] = $row['done'];
                $boards[$i]['tasks'][$y] = $task[$y];
                $y++;
            }
            $i++;
        }

        return $boards;
    }

    public static function updateBoard($board)
    {
        $db = Db::getConnection();
        printf($board->name);
        $board = $db->query("UPDATE `boards` SET name = '" . $board->name . "' WHERE `id` = " . $board->id . " ");

        return $board;
    }

    public static function deleteBoard($board)
    {
        $db = Db::getConnection();
        printf($board->name);
        $board = $db->query("DELETE FROM `boards` WHERE `boards`.`id` = " . $board->id . " ");

        return $board;
    }

    public static function getTasksByBoardId($id)
    {


        if ($id) {
            $db = Db::getConnection();

            $result = $db->query('SELECT * FROM tasks WHERE board_id = ' . $id . ' ORDER BY done ASC');

            $result->setFetchMode(PDO::FETCH_ASSOC);

            $taskById = $result->fetchAll();

            return $taskById;
        }
    }
}
