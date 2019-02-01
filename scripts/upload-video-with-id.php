<?php
$data = $_POST["video_data"]; //Base64 video data
$data = base64_decode(explode(",", $data)[1]);
include 'db.php';
$videoFileName = $_POST["id"];
if (!file_exists("../userdata/videos")) {
    mkdir("../userdata/videos", 0777, true);
}
$videoPath = "../userdata/videos/" . $videoFileName;
$f = fopen($videoPath, "wb");
fwrite($f, $data, strlen($data));
fclose($f);
echo $videoFileName;