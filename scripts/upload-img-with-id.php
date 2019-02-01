<?php
$imgFile = $_FILES["img_file"];
$data = base64_decode(explode(",", $data)[1]);
include 'db.php';
$imgFileName = $_POST["id"];
if (!file_exists("../userdata/imgs")) {
    mkdir("../userdata/imgs", 0777, true);
}
$imgPath = "../userdata/imgs/" . $imgFileName;
move_uploaded_file($imgFile["tmp_name"], $imgPath);
echo $imgFileName;