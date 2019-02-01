<?php
$data = file_get_contents("php://input");
$type = $_GET["type"];
$data = base64_decode(explode(",", $data)[1]);
$mediaFileName = $_GET["filename"];
$folderName = "imgs";
if ($type == "video") {
    $folderName = "videos";
}
if (!file_exists("../userdata/" . $folderName)) {
    mkdir("../userdata/" . $folderName, 0777, true);
}
file_put_contents("../userdata/" . $folderName . "/" . $mediaFileName, $data, FILE_APPEND|LOCK_EX);