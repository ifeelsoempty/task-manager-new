<?php
    return array(
        'boards/([0-9]+)/tasks' => 'Boards/TasksByBoardId/$1',
        'boards/get' => 'Boards/getBoards',
        'boards/create' => 'Boards/CreateBoard',
        'boards/update' => 'Boards/UpdateBoard',
        'boards/delete' => 'Boards/DeleteBoard',
        'task/create' => 'Task/CreateTask',
        'task/update' => 'Task/UpdateTask',
        'task/delete' => 'Task/DeleteTask',
        'task/changeBoard' => 'Task/ChangeTaskBoard',
    );