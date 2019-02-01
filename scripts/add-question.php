<?php
$question = $_POST["question"];
$courseName = $_POST["course_name"];
$babName = $_POST["bab_name"];
$answers = $_POST["answers"];
$reason = $_POST["reason"];
$correctAnswer = $_POST["correct_answer"];
$imageURL = $_POST["image_url"];
$videoURL = $_POST["video_url"];
$audioURL = $_POST["audio_url"];
$type = $_POST["type"];
include 'db.php';
$courseId = $c->query("SELECT * FROM courses WHERE name='" . $courseName . "'")->fetch_assoc()["id"];
$babId = $c->query("SELECT * FROM bab WHERE name='" . $babName . "'")->fetch_assoc()["id"];
if ($c->query("INSERT INTO questions (id, question, course_id, bab_id, type, answers, reason, correct_answer, picture_url, video_url, audio_url) VALUES ('" . uniqid() . "', '" . $question . "', '" . $courseId . "', '" . $babId . "', '" . $type . "', '" . $answers . "', '" . $reason . "', '" . $correctAnswer . "', '" . $imageURL . "', '" . $videoURL . "', '" . $audioURL . "')")) {
    echo 0;
} else {
    echo -1;
}