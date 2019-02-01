<?php
session_start();
$userId = $_SESSION["user_id"];
$email = $_SESSION["email"];
$password = $_SESSION["password"];
echo "{\"user_id\": \"" . $userId . "\", \"email\": \"" . $email . "\", \"password\": \"" . $password . "\"}";