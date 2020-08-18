<?php
function getResponse404Error($errorMessage)
{
    header($_SERVER["SERVER_PROTOCOL"] . " 404 Not Found");
    $error = new AppError($errorMessage, 404);
    echo json_encode($error);
}
