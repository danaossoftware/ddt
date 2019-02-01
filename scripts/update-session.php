<?php
session_start();
$password = $_GET["password"];
$_SESSION["password"] = $password;