<?php
include 'db.php';
$id = $_GET["id"];
$name = $_GET["name"];
$accessCode = $_GET["access_code"];
$timeLimit = $_GET["time-limit"];
$c->query("UPDATE bab SET name='" . $name . "', access_code='" . $accessCode . "', time_limit=" . $timeLimit . " WHERE id='" . $id . "'");