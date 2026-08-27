<?php
header('Content-Type: application/json');
$conn = new mysqli("127.0.0.1", "root", "", "cruises");
if ($conn->connect_error) {
  die(json_encode(["code" => 500, "message" => "数据库连接失败"]));
}

$order_id = $_POST['order_id'] ?? 0;
$status = $_POST['status'] ?? 0;

if (!$order_id || !in_array($status, [0,1,2,3])) {
  die(json_encode(["code" => 400, "message" => "参数无效"]));
}

// 更新订单状态为已支付
$sql = "UPDATE orders SET status = ?, paid_time = NOW() WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $status, $order_id);

if ($stmt->execute()) {
  echo json_encode(["code" => 200, "message" => "支付成功"]);
} else {
  echo json_encode(["code" => 500, "message" => "更新失败: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>