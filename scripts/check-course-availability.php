<?php
$name = $_GET["name"];
include 'db.php';
$results = $c->query("SELECT * FROM categories WHERE name='" . $name . "'");
if (!$results) {
    echo 0;
    return;
}
if ($results->num_rows > 0) {
    echo -1;
} else {
    echo 0;
}