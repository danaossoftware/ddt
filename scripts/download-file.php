<?php
$filename = $_GET["filename"];
$downloadFileName = $_GET["download_file_name"];
header("Content-disposition: attachment; filename=" . $downloadFileName);
header("Content-type: application/json:");
readfile($filename);