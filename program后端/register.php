<?php
header('Content-Type: application/json; charset=utf-8');

// 获取参数并去空格
$username = trim($_POST['username'] ?? '');
$password = trim($_POST['password'] ?? '');
$idNumber = trim($_POST['idNumber'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$email = trim($_POST['email'] ?? '');

// 基础验证
if (empty($username) || empty($password) || empty($idNumber) || empty($phone) || empty($email)) {
    echo json_encode(['code' => 400, 'message' => '请填写完整信息']);
    exit;
}

// 连接数据库
$conn = new mysqli('localhost', 'root', '', 'cruise');
if ($conn->connect_error) {
    die(json_encode(['code' => 500, 'message' => '数据库连接失败：' . $conn->connect_error]));
}
$conn->set_charset('utf8mb4');

// 检查用户名是否已存在
$checkStmt = $conn->prepare("SELECT id FROM tb_user WHERE username = ?");
$checkStmt->bind_param("s", $username);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();
if ($checkResult->num_rows > 0) {
    $checkStmt->close();
    $conn->close();
    echo json_encode(['code' => 400, 'message' => '用户名已存在']);
    exit;
}
$checkStmt->close();

// 直接存储明文密码（仅测试用）
$insertStmt = $conn->prepare("INSERT INTO tb_user (username, password, idNumber, phone, email, created_at) VALUES (?, ?, ?, ?, ?, NOW())");
$insertStmt->bind_param("sssss", $username, $password, $idNumber, $phone, $email);

if ($insertStmt->execute()) {
    echo json_encode([
        'code' => 200,
       'message' => '注册成功，可直接登录',
        'data' => ['username' => $username]
    ]);
} else {
    echo json_encode(['code' => 500, 'message' => '注册失败：' . $insertStmt->error]);
}

$insertStmt->close();
$conn->close();
?>