<?php
header('Content-Type: application/json'); // 新增响应类型头
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "cruise";
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["code" => 500, "message" => "数据库连接失败"]));
}

$user_id = $_GET['user_id'] ?? 0;
$status = $_GET['status'] ?? '';

// 验证用户ID
if (!$user_id) {
    die(json_encode(["code" => 400, "message" => "缺少用户ID"]));
}

// 根据状态码筛选订单（0:待支付, 1:已支付, 2:售后中）
if ($status !== '') {
    $sql = "SELECT * FROM orders WHERE user_id = ? AND status = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $user_id, $status);
    $stmt->execute();
    $result = $stmt->get_result();
} else {
    $sql = "SELECT * FROM orders WHERE user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
}

$orders = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }
}

echo json_encode([
    "code" => 200,
    "message" => $orders ? "订单列表获取成功" : "没有找到相关订单",
    "data" => $orders
]);

$stmt->close();
$conn->close();
?>