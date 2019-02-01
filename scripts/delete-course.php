<?php
$name = $_GET["name"];
include 'db.php';
$c->query("DELETE FROM courses WHERE name='" . $name . "'");