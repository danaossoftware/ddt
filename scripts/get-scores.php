<?php
include 'db.php';
$userId = $_GET["user-id"];
$results = $c->query("SELECT * FROM question_data WHERE user_id='" . $userId . "'");
if ($results && $results->num_rows > 0) {
    $scores = [];
    while ($row = $results->fetch_assoc()) {
        array_push($scores, $row);
    }
    echo json_encode($scores);
} else {
    echo -1;
}