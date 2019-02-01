<?php
include 'db.php';
$userId = $_GET["id"];
$password = $_GET["password"];
$c->query("UPDATE admins SET password='" . $password . "' WHERE id='" . $userId . "'");