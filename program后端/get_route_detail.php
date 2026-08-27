<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

// 数据库连接
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "cruise"; // 确保与你的数据库名一致
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode([
        "code" => 500,
        "message" => "数据库连接失败: " . $conn->connect_error
    ]));
}

// 获取并验证航线ID
$routeId = isset($_GET['id']) ? intval($_GET['id']) : 0; // 强制转换为整数
if ($routeId <= 0) {
    die(json_encode([
        "code" => 400,
        "message" => "无效的航线ID"
    ]));
}

// 查询航线详情（假设航线表为tb_routes，根据实际表名修改）
$sql = "SELECT * FROM routes WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $routeId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $routeInfo = $result->fetch_assoc();
    echo json_encode([
        "code" => 200,
        "data" => [
            "routeInfo" => $routeInfo
        ]
    ]);
} else {
    echo json_encode([
        "code" => 404,
        "message" => "未找到该航线信息"
    ]);
}

$stmt->close();
$conn->close();
?>