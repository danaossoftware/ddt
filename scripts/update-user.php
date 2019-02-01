<?php
include 'db.php';
$id = $_GET["id"];
$name = $_GET["name"];
$password = $_GET["password"];
$phone = $_GET["phone"];
$c->query("UPDATE users SET name='" . $name . "', password='" . $password . "', phone='" . $phone . "' WHERE id='" . $id . "'");