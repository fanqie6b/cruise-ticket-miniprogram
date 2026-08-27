<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "cruise";
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("连接失败: " . $conn->connect_error);
}

$activityId = $_GET['id'];

$sql = "SELECT * FROM hot_activities WHERE id = $activityId";
$result = $conn->query($sql);

$activity = [];
if ($result->num_rows > 0) {
  $activity = $result->fetch_assoc(); 
}

header('Content-Type: application/json');
echo json_encode($activity);

$conn->close();
?>