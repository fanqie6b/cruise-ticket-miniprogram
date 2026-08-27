<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "cruise";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$destinationName = $_GET['destinationName'];

$sql = "SELECT id, destination_name, attraction_name, attraction_description, guide, attraction_image 
        FROM destination_attractions 
        WHERE destination_name = '$destinationName'";
$result = $conn->query($sql);

$attractions = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $attractions[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($attractions);

$conn->close();
?>