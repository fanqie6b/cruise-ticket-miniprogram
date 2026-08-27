<?php
header('Content-Type: application/json');
$conn = new mysqli("127.0.0.1", "root", "", "cruise_orders");
if ($conn->connect_error) {
  die(json_encode(["code" => 500, "message" => "数据库连接失败"]));
}

$order_id = $_POST['order_id'];
$status = $_POST['status'];

$sql = "UPDATE orders SET status =? WHERE id =?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $status, $order_id);

if ($stmt->execute()) {
  echo json_encode(["code" => 200, "message" => "取消成功"]);
} else {
  echo json_encode(["code" => 500, "message" => "更新失败: ". $stmt->error]);
}
$stmt->close();
$conn->close();
?>