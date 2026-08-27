<?php
header('Content-Type: application/json');
$conn = new mysqli("127.0.0.1", "root", "", "cruise");
if ($conn->connect_error) {
  die(json_encode(["code" => 500, "message" => "数据库连接失败"]));
}
$order_id = $_GET['order_id'] ?? 0;
if (!$order_id) {
  die(json_encode(["code" => 400, "message" => "缺少订单ID"]));
}
$sql = "SELECT o.*, r.depart_date, r.depart_time, r.departure_port, r.arrival_port, r.price 
        FROM orders o 
        LEFT JOIN tb_routes r ON o.route_id = r.id 
        WHERE o.id = ? AND o.status = 1";  
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $order_id);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows > 0) {
  echo json_encode([
    "code" => 200,
    "data" => $result->fetch_assoc()
  ]);
} else {
  echo json_encode(["code" => 404, "message" => "已支付订单不存在"]);
}
$stmt->close();
$conn->close();
?>