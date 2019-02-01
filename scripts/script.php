<?php
session_start();
$_SESSION["name"] = "Dana";
$_SESSION["address"] = "Sukodono";
sleep(5);
header("Location: scrip2.php");