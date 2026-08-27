<?php
require 'connectt.php';
header("Content-Type: application/json; charset=utf8");
$con->set_charset("utf8");

// 仅允许POST请求
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode(['code' => 405, 'message' => '仅支持POST请求']));
}

// 获取并验证参数
$orderNo = isset($_POST['orderNo']) ? trim($_POST['orderNo']) : '';
$lastNamePinyin = isset($_POST['lastNamePinyin']) ? trim($_POST['lastNamePinyin']) : '';
$birthDate = isset($_POST['birthDate']) ? trim($_POST['birthDate']) : '';
$cruiseName = isset($_POST['cruiseName']) ? trim($_POST['cruiseName']) : '';
$sailingDate = isset($_POST['sailingDate']) ? trim($_POST['sailingDate']) : '';

// 检查参数完整性
if (empty($orderNo) || empty($lastNamePinyin) || empty($birthDate) || empty($cruiseName) || empty($sailingDate)) {
    http_response_code(400);
    die(json_encode(['code' => 400, 'message' => '请填写完整信息']));
}

// 验证日期格式
if (!DateTime::createFromFormat('Y-m-d', $sailingDate) || !DateTime::createFromFormat('Y-m-d', $birthDate)) {
    http_response_code(400);
    die(json_encode(['code' => 400, 'message' => '日期格式不正确，请使用 Y-m-d 格式']));
}

// 查询订单（与数据库字段完全匹配）
$checkSql = "SELECT id FROM checkin_orders 
             WHERE order_number = ? 
               AND cruise_name = ? 
               AND sailing_date = ? 
               AND passenger_lastname = ? 
               AND passenger_birthdate = ?";

// 准备SQL语句
$checkStmt = $con->prepare($checkSql);
if (!$checkStmt) {
    http_response_code(500);
    die(json_encode(['code' => 500, 'message' => '数据库查询失败：' . $con->error]));
}

// 绑定参数并执行（参数顺序与SQL条件一致）
$checkStmt->bind_param("sssss", $orderNo, $cruiseName, $sailingDate, $lastNamePinyin, $birthDate);
$checkStmt->execute();
$result = $checkStmt->get_result();

// 处理查询结果
if ($result->num_rows === 0) {
    http_response_code(404);
    die(json_encode(['code' => 404, 'message' => '该订单不存在，值船失败']));
} else {
    $data = $result->fetch_assoc();
    echo json_encode([
        "code" => 200,
        "data" => [
            "id" => (string)$data['id']
        ]
    ]);
}

// 关闭连接
$checkStmt->close();
$con->close();
?>