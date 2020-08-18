<?php

class Router
{
    private  $routes;

    public function __construct()
    {
        $routesPath = ROOT . '/routes/routes.php';
        $this->routes = include($routesPath);
    }

    private function getURI()
    {
        if (!empty($_SERVER['REQUEST_URI'])) {
            return trim($_SERVER['REQUEST_URI'], '/');
        }
    }

    public function run()
    {
        //Получение строки запроса
        $uri = $this->getURI();
        $uri = preg_replace("/\?.+/", "", $uri);
        $routFoundFlag = false;
        header('Content-Type: application/json');
        //Проверка наличия запроса в routes.php
        foreach ($this->routes as $uriPattern => $path) {

            //Сравнение $urlPattern и $uri
            if (preg_match("~$uriPattern~", $uri)) {

                $routFoundFlag = true;
                //Получаем внутренний путь из внешнего согласно правилу
                $internalRoute = preg_replace("~$uriPattern~", $path, $uri);


                // вырезать /api/boards
                //Определение контроллера, action, и параметров
                $segments = explode('/', $internalRoute);
                // remove API prefix
                array_shift($segments);
                $controllerName = array_shift($segments) . 'Controller';

                // Получение имени метода класса BoardsController
                $methodName = array_shift($segments);

                $parameters = $segments;

                //Подключение файла класса-контроллера
                $controllerFile = ROOT . '\controllers\\' .
                    $controllerName . '.php';

                if (file_exists($controllerFile)) {
                    include_once($controllerFile);
                }
                //REST сервис отдаeт JSON мы должны дать браузеру об это знать

                //Создание объекта, вызов метода класса
                $controllerObject = new $controllerName;
                $result = call_user_func_array(array($controllerObject, $methodName), $parameters); // calling boards service

                if ($result != null) {
                    break;
                }
            }
        }
        if ($routFoundFlag == false) {
            getResponse404Error('Resouce not Found');
        };
    }
}
