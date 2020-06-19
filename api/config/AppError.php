<?php

class AppError
{
    public $message;
    public $status;
    function __construct($inputMessage,$inputStatus) {
        $this->message = $inputMessage;
        $this->status = $inputStatus;
    }
}

