<?php
include 'db.php';
$data = $_POST["data"];
$website = $_POST["website"];
$dbUser = $_POST["db-user"];
$dbPass = $_POST["db-pass"];
$dbName = $_POST["db-name"];
$rules = $_POST["rules"];
$email = $_POST["email"];
$address = $_POST["address"];
$phone = $_POST["phone"];
$twitterURL = $_POST["twitter-url"];
$facebookURL = $_POST["facebook-url"];
$instagramURL = $_POST["instagram-url"];
$googlePlusURL = $_POST["google-plus-url"];
$linkedInURL = $_POST["linked-in-url"];
$settings = simplexml_load_file("../systemdata/settings.xml");
$settings->rules = $rules;
$settings->links->twitter = $twitterURL;
$settings->links->instagram = $instagramURL;
$settings->links->googlePlus = $googlePlusURL;
$settings->links->linkedIn = $linkedInURL;
$settings->links->facebook = $facebookURL;
$admin = $settings->admin;
$admin->email = $email;
$admin->address = $address;
$admin->phone = $phone;
$mysql = $settings->mysql;
$previousWebsite = $mysql->website;
$scriptsFolder = opendir("../scripts");
if ($scriptsFolder) {
    while (($scriptFile = readdir($scriptsFolder)) !== false) {
        if ($scriptFile != '.' && $scriptFile != '..') {
            $f = fopen("../scripts/" . $scriptFile, "r");
            $size = fstat($f)["size"];
            if ($size > 0) {
                $data = fread($f, $size);
                $data = str_replace($previousWebsite, $website, $data);
                fclose($f);
                $f = fopen("../scripts/" . $scriptFile, "w");
                fwrite($f, $data);
                fflush($f);
            }
            fclose($f);
        }
    }
}
$mysql->website = $website;
$mysql->dbuser = $dbUser;
$mysql->dbpass = $dbPass;
$mysql->dbname = $dbName;
file_put_contents("../systemdata/settings.xml", $settings->asXML());