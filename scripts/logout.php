<?php
session_start();
$_SESSION["user_id"] = "";
$_SESSION["email"] = "";
$_SESSION["password"] = "";
unset($_SESSION["user_id"]);
unset($_SESSION["email"]);
unset($_SESSION["password"]);