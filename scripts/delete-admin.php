<?php
include 'db.php';
$id = $_GET["id"];
$c->query("DELETE FROM admins WHERE id='" . $id . "'");