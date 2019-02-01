<?php
include 'db.php';
$id = $_GET["id"];
$c->query("DELETE FROM questions WHERE id='" . $id . "'");