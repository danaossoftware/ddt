<?php
$videoFileName = $_POST["video_file_name"];
move_uploaded_file($_FILES["video_file"]["tmp_name"], "../userdata/videos/" . $videoFileName);