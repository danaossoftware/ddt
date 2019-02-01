<?php
include 'db.php';
$results = $c->query("SELECT * FROM users");
if (!$results || $results->num_rows <= 0) {
    echo -1;
    return;
}
$response = "[";
while ($row = $results->fetch_assoc()) {
    $response .= ("{\"id\": \"" . $row["id"] . "\", \"name\": \"" . $row["name"] . "\", \"email\": \"" . $row["email"] . "\", \"password\": \"" . $row["password"] . "\", \"phone\": \"" . $row["phone"] . "\"}, ");
}
$response = substr($response, 0, strlen($response)-2);
$response .= "]";
echo $response;