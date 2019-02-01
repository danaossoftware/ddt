<?php
include 'db.php';
$name = $_GET["name"];
$email = $_GET["email"];
$password = $_GET["password"];
$phone = $_GET["phone"];
$results = $c->query("SELECT * FROM users WHERE email='" . $email . "'");
if ($results && $results->num_rows > 0) {
    echo -1;
    return;
}
$results = $c->query("SELECT * FROM users WHERE phone='" . $phone . "'");
if ($results && $results->num_rows > 0) {
    echo -1;
    return;
}
$c->query("INSERT INTO users (id, name, email, password, phone) VALUES ('" . uniqid() . "', '" . $name . "', '" . $email . "', '" . $password . "', '" . $phone . "')");
echo 0;