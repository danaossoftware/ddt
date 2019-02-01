<?php
$filename = $_GET["filename"];
include 'db.php';
$results = $c->query("SELECT * FROM courses");
if ($results->num_rows > 0) {
    $response = "[";
    while ($row = $results->fetch_assoc()) {
        $response .= "{\"id\": \"" . $row["id"] . "\", \"name\": \"" . $row["name"] . "\", \"lecturer\": \"" . $row["lecturer"] . "\"}, ";
    }
    $response = substr($response, 0, strlen($response)-2);
    $response .= "]";
    $f = fopen($filename, "w");
    fwrite($f, $response, strlen($response));
    fclose($f);
    echo 0;
}