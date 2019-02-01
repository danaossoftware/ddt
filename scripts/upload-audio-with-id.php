<?php
$data = $_POST["audio_data"]; //Base64 audio data
$data = base64_decode(explode(",", $data)[1]);
include 'db.php';
$audioFileName = $_POST["id"];
if (!file_exists("../userdata/audios")) {
    mkdir("../userdata/audios", 0777, true);
}
$audioPath = "../userdata/audios/" . $audioFileName;
$f = fopen($audioPath, "wb");
fwrite($f, $data, strlen($data));
fclose($f);
echo $audioFileName;