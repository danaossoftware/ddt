<?php
$data = file_get_contents("php://input");
$data = base64_decode(explode(",", $data)[1]);
file_put_contents("vid.mp4", $data, FILE_APPEND|LOCK_EX);