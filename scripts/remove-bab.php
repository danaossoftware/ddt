<?php
include 'db.php';
$id = $_GET["id"];
$c->query("DELETE FROM bab WHERE id='" . $id . "'");