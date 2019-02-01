<?php
$questionId = $_POST["question_id"];
$question = $_POST["question"];
$courseId = $_POST["course_id"];
$babId = $_POST["bab_id"];
$answers = $_POST["answers"];
$correctAnswer = $_POST["correct_answer"];
$imageURL = $_POST["image_url"];
$videoURL = $_POST["video_url"];
$audioURL = $_POST["audio_url"];
$type = $_POST["type"];
include 'db.php';
if ($c->query("UPDATE questions SET question='" . $question . "', course_id='" . $courseId . "', bab_id='" . $babId . "', type='" . $type . "', answers='" . $answers . "', correct_answer='" . $correctAnswer . "', picture_url='" . $imageURL . "', video_url='" . $videoURL . "', audio_url='" . $audioURL . "' WHERE id='" . $questionId . "'")) {
    echo 0;
} else {
    echo -1;
}