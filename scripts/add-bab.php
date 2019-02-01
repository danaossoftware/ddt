<?php
$name = $_GET["name"];
$course_name = $_GET["course_name"];
$imgURL = $_GET["img_url"];
$accessCode = $_GET["access-code"];
$timeLimit = $_GET["time-limit"];
include 'db.php';
$results = $c->query("SELECT * FROM courses WHERE name='" . $course_name . "'");
if (!$results || $results->num_rows == 0) {
    echo -5;
    return;
}
$course_id = $results->fetch_assoc()["id"];
$results = $c->query("SELECT * FROM bab WHERE name='" . $name . "' AND course_id='" . $course_id . "'");
if (!$results) {
    echo -1;
    return;
}
if ($results->num_rows > 0) {
    // Bab already added
    echo -2;
} else {
    $results = $c->query("SELECT * FROM courses WHERE name='" . $course_name . "'");
    if (!$results) {
        echo -3;
        return;
    }
    if ($results->num_rows > 0) {
        $row = $results->fetch_assoc();
        $id = $row["id"];
        $c->query("INSERT INTO bab (id, name, course_id, access_code, img_url, time_limit) VALUES ('" . uniqid() . "', '" . $name . "', '" . $id . "', '" . $accessCode . "', '" . $imgURL . "', " . $timeLimit . ")");
        echo 0;
    } else {
        echo -4;
    }
}