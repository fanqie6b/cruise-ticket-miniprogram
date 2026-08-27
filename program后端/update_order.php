<?php
header('Content-Type: application/json');
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "cruise";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["code" => 500, "message" => "数据库连接失败: ". $conn->connect_error]));
}
$order_id = $_POST['order_id'];
$status = $_POST['status'];
$sql = "UPDATE orders SET status =? WHERE id =?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $status, $order_id);
if ($stmt->execute()) {
    $response = [
        "code" => 200,
        "message" => "订单状态更新成功"
    ];
} else {
    $response = [
        "code" => 500,
        "message" => "订单状态更新失败: ". $stmt->error
    ];
}
$stmt->close();
$conn->close();
echo json_encode($response);
?>