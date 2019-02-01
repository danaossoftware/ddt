<?php
include 'db.php';
$results = $c->query("SELECT * FROM bab");
if (!$results) {
    echo -1;
    return;
}
if ($results->num_rows > 0) {
    $chapters = [];
    while ($row = $results->fetch_assoc()) {
        array_push($chapters, $row);
    }
    echo json_encode($chapters);
} else {
    echo -2;
}