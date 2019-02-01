<?php
$categoryName = $_GET["name"];
$lecturer = $_GET["lecturer"];
include 'db.php';
$results = $c->query("SELECT * FROM courses WHERE name='" . $categoryName . "'");
if ($results && $results->num_rows > 0) {
    echo -1;
    return;
}
$c->query("INSERT INTO courses (id, name, lecturer) VALUES ('" . uniqid() . "', '" . $categoryName . "', '" . $lecturer . "')");
echo 0;