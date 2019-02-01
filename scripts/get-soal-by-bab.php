<?php
$babId = $_GET["bab_id"];
include 'db.php';
$results = $c->query("SELECT * FROM questions WHERE bab_id='" . $babId . "'");
if (!$results) {
    echo -1;
    return;
}
if ($results->num_rows > 0) {
    $response = "[";
    while ($row = $results->fetch_assoc()) {
        $id = $row["id"];
        $content = $row["content"];
        $babId = $row["bab_id"];
        $answers = $row["answers"];
        $correctAnswer = $row["correct_answer"]; //0 = A, 1 = B, 2 = C, 3 = D
        $response .= ("{\"id\": \"" . $id . "\", \"content\": \"" . $content . "\", \"bab_id\": \"" . $babId . "\", \"answers\": \"" . $answers . "\", \"correct_answer\": \"" . $correctAnswer . "\"}, ");
    }
    $response = substr($response, 0, strlen($response)-2);
    $response .= "]";
    echo $response;
} else {
    echo -2;
}