/* Создавать базу данных отдельно
CREATE DATABASE IF NOT EXISTS tk_man
*/

CREATE TABLE tasks(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    board_id INTEGER,
    FOREIGN KEY (board_id) REFERENCES board(id)
);

CREATE TABLE board(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

REPLACE INTO board(id, name)
    VALUES (1, 'Board one');
REPLACE INTO board(id, name)
    VALUES (2, 'Board two');
REPLACE INTO board(id, name)
    VALUES (3, 'Board three');

REPLACE INTO tasks(id, name, description, board_id)
    VALUES (1, 'b1_task1', '', 1);
REPLACE INTO tasks(id, name, description, board_id)
    VALUES (2, 'b2_task1', '', 2);
REPLACE INTO tasks(id, name, description, board_id)
    VALUES (3, 'b3_task1', '', 3);