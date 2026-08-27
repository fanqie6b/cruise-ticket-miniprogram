<?php
require 'connectt.php';
header("Content-Type: application/json; charset=utf8");

$orderId = isset($_GET['orderId']) ? intval($_GET['orderId']) : 0;

if ($orderId <= 0) {
    die(json_encode(['code' => 400, 'message' => '无效订单ID']));
}

$sql = "SELECT * FROM checkin_orders WHERE id = ?";
$stmt = $con->prepare($sql);
$stmt->bind_param("i", $orderId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    die(json_encode(['code' => 404, 'message' => '未找到订单']));
}

$data = $result->fetch_assoc();
echo json_encode(['code' => 200, 'data' => [
    'cruiseName' => $data['cruise_name'],
    'sailingDate' => $data['sailing_date'],
    'orderNo' => $data['order_number'],
    'passengerName' => $data['passenger_lastname'], 
    'birthDate' => $data['passenger_birthdate'],
    'nationality' => '中国',
    'departurePort' => '上海吴淞口国际邮轮港',
    'departureTime' => $data['sailing_date'] . ' 16:00',
    'arrivalPort' => '日本横滨港',
    'arrivalTime' => date('Y-m-d', strtotime($data['sailing_date'] . ' +1 day')) . ' 09:00',
    'days' => 5
]]);