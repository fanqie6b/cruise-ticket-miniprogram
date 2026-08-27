<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "cruise";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}

$order_id = $_POST['order_id'];

$sql = "UPDATE orders SET status = 0 WHERE id = '$order_id'";

if ($conn->query($sql) === TRUE) {
    $response = array(
        "code" => 200,
        "message" => "订单退票成功"
    );
} else {
    $response = array(
        "code" => 500,
        "message" => "订单退票失败: " . $conn->error
    );
}

header('Content-Type: application/json');
echo json_encode($response);

$conn->close();
?>