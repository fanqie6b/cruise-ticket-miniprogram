<?php
header('Content-Type: application/json');
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "cruise";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode([
        "code" => 500, 
        "message" => "数据库连接失败: " . $conn->connect_error
    ]));
} 

$postData = $_POST;
$required = ['route_id', 'user_id', 'contact_name', 'contact_phone', 'passenger_count', 'status', 'price'];
$missing = [];
foreach ($required as $param) {
    if (!isset($postData[$param]) || empty(trim($postData[$param]))) {
        $missing[] = $param;
    }
} 
if (!empty($missing)) {
    die(json_encode([
        "code" => 400, 
        "message" => "缺少必要参数: " . implode(', ', $missing)
    ]));
} 

$route_id = intval($postData['route_id']);
$user_id = intval($postData['user_id']);
$contact_name = trim($postData['contact_name']);
$contact_phone = trim($postData['contact_phone']);
$passenger_count = intval($postData['passenger_count']);
$status = intval($postData['status']);
$price = floatval($postData['price']);
$created_at = date('Y-m-d H:i:s');

if (!preg_match('/^1[3-9]\d{9}$/', $contact_phone)) {
    die(json_encode([
        "code" => 400,
        "message" => "手机号格式不正确"
    ]));
} 

if ($passenger_count < 1) {
    die(json_encode([
        "code" => 400,
        "message" => "乘客数量不能少于1人"
    ]));
} 

$sql = "INSERT INTO orders (
    route_id, user_id, contact_name, contact_phone, 
    passenger_count, status, price, created_at
) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    die(json_encode([
        "code" => 500,
        "message" => "SQL准备失败: " . $conn->error
    ]));
} 

$stmt->bind_param(
    "iissidss",  
    $route_id, $user_id, $contact_name, $contact_phone,
    $passenger_count, $status, $price, $created_at
);

if ($stmt->execute()) {
    $order_id = $conn->insert_id;
    echo json_encode([
        "code" => 200,
        "message" => "订单创建成功",
        "data" => ["order_id" => $order_id]
    ]);
} else {
    echo json_encode([
        "code" => 500,
        "message" => "订单创建失败: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>