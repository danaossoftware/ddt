<?php
$data = $_POST["img_data"]; //Base64 image data
$data = base64_decode(explode(",", $data)[1]);
include 'db.php';
$imgFileName = uniqid();
if (!file_exists("../userdata/imgs")) {
    mkdir("../userdata/imgs", 0777, true);
}
$imgPath = "../userdata/imgs/" . $imgFileName;
$f = fopen($imgPath, "wb");
fwrite($f, $data, strlen($data));
fclose($f);
echo $imgFileName;