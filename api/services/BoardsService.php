<?php

    class BoardsService {
            public static function getBoards() {
                $db = Db::getConnection();

                $boards = array();

                $result = $db->query('SELECT id, name '
                    . 'FROM  boards '
                    . 'LIMIT 10');

                $i = 0;
                while($row = $result->fetch()){
                    $boards[$i]['id'] = $row['id'];
                    $boards[$i]['name'] = $row['name'];
                    $i++;
                }

                return $boards;
            }

            public static function getTasksByBoardId($id) {


                if($id){
                    $db = Db::getConnection();

                    $result = $db->query('SELECT * FROM tasks WHERE board_id = '. $id .' ORDER BY done ASC');

                    $result->setFetchMode(PDO::FETCH_ASSOC);

                    $taskById = $result->fetchAll();

                    return $taskById;
                }
            }
        }
