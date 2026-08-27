<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "cruise";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$cruiseId = $_GET['cruiseId'];

$sql = "SELECT * FROM cruise_activities WHERE cruise_id = $cruiseId";
$result = $conn->query($sql);

$activities = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $activities[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($activities);

$conn->close();
?>