<?php
$audioFileName = $_POST["audio_file_name"];
move_uploaded_file($_FILES["audio_file"]["tmp_name"], "../userdata/audios/" . $audioFileName);
echo $_FILES["audio_file"]["tmp_name"];