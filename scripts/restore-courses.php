<?php
include 'db.php';
$jsonData = $_POST["data"];
$courses = json_decode($jsonData, true);
$c->query("DELETE FROM courses");
foreach ($courses as $course) {
    $id = $course["id"];
    $name = $course["name"];
    $lecturer = $course["lecturer"];
    $c->query("INSERT INTO courses (id, name, lecturer) VALUES ('" . $id . "', '" . $name . "', '" . $lecturer . "')");
}
echo 0;