<?php
$email = $_GET["email"];
$password = $_GET["password"];
include 'db.php';
$results = $c->query("SELECT * FROM admins WHERE email='" . $email . "' AND password='" . $password . "'");
if (!$results) {
    echo -3;
    return;
}
if ($results->num_rows > 0) {
    $userId = $results->fetch_assoc()["id"];
    session_start();
    $_SESSION["user_id"] = $userId;
    $_SESSION["email"] = $email;
    $_SESSION["password"] = $password;
    echo 0;
} else {
    echo -4;
}