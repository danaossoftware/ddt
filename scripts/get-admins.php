<?php
include 'db.php';
$results = $c->query("SELECT * FROM admins;");
if (!$results) {
    echo -1;
    return;
}
if ($results->num_rows > 0) {
    $response = "[";
    while ($row = $results->fetch_assoc()) {
        $response .= ("{\"id\": \"" . $row["id"] . "\", \"email\": \"" . $row["email"] . "\", \"password\": \"" . $row["password"] . "\"}, ");
    }
    $response = substr($response, 0, strlen($response)-2);
    $response .= "]";
    echo $response;
} else {
    echo -2;
}