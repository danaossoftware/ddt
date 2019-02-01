<?php
include 'db.php';
$results = $c->query("SELECT * FROM courses");
if (!$results) {
    echo -1;
    return;
}
if ($results->num_rows > 0) {
    $response = "[";
    $i = 0;
    while ($row = $results->fetch_assoc()) {
        $response .= ("{\"id\": \"" . $row["id"] . "\", \"name\": \"" . $row["name"] . "\", \"lecturer\": \"" . $row["lecturer"] . "\", \"bab\": ");
        $results2 = $c->query("SELECT * FROM bab WHERE course_id='" . $row["id"] . "'");
        $response2 = "[";
        if ($results2 && $results2->num_rows > 0) {
            $j = 0;
            while ($row2 = $results2->fetch_assoc()) {
                $response2 .= ("{\"id\": \"" . $row2["id"] . "\", \"name\": \"" . $row2["name"] . "\", \"course_id\": \"" . $row2["course_id"] . "\", \"img_url\": \"" . $row2["img_url"] . "\", \"questions\": ");
                $results3 = $c->query("SELECT * FROM questions WHERE course_id='" . $row["id"] . "' AND bab_id='" . $row2["id"] . "'");
                $response3 = "[";
                if ($results3 && $results3->num_rows > 0) {
                    $k = 0;
                    while ($row3 = $results3->fetch_assoc()) {
                        $response3 .= ("{\"id\": \"" . $row3["id"] . "\", \"question\": \"" . $row3["question"] . "\", \"course_id\": \"" . $row3["course_id"] . "\", \"bab_id\": \"" . $row3["bab_id"] . "\", \"type\": \"" . $row3["type"] . "\", \"answers\": \"" . $row3["answers"] . "\", \"correct_answer\": \"" . $row3["correct_answer"] . "\", \"reason\": \"" . $row3["reason"] . "\", \"picture_url\": \"" . $row3["picture_url"] . "\", \"video_url\": \"" . $row3["video_url"] . "\", \"audio_url\": \"" . $row3["audio_url"] . "\"}, ");
                        $k++;
                    }
                }
                if (strlen($response3) > 1) {
                    $response3 = substr($response3, 0, strlen($response3)-2);
                }
                $response3 .= "]";
                $response2 .= $response3;
                $response2 .= "}, ";
                $j++;
            }
        }
        if (strlen($response2) > 1) {
            $response2 = substr($response2, 0, strlen($response2) - 2);
        }
        $response2 .= "]";
        $response .= $response2;
        $response .= "}, ";
        $i++;
    }
    $response = substr($response, 0, strlen($response)-2);
    $response .= "]";
    //$response = str_replace("\n", "\\n", $response);
    $response = utf8_encode($response);
    $response = preg_replace('/[\x00-\x1F\x7F]/', '', $response);
    echo $response;
} else {
    echo -2;
}