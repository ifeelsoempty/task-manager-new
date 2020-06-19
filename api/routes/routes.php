<?php
    return array(
        'boards/([0-9]+)/tasks' => 'Boards/TasksByBoardId/$1', // BoardsController/TasksByBoardId/BoardId
        'boards/list' => 'Boards/Boards',
        'task/update' => 'Task/UpdateTask',
        'task/delete' => 'Task/DeleteTask',
        'task/create' => 'Task/CreateTask'
    );