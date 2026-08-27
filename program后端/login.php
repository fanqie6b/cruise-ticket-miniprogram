<?php
header("Content-Type: application/json; charset=utf8");

// 仅允许POST请求
if ($_SERVER['REQUEST_METHOD']!== 'POST') {
    die(json_encode(['code' => 405, 'message' => '请通过POST方式提交']));
}

// 获取参数（去空格，与注册时保持一致）
$username = trim($_POST['username'] ?? '');
$password = trim($_POST['password'] ?? '');

// 基础验证
if (empty($username) || empty($password)) {
    die(json_encode(['code' => 400, 'message' => '用户名或密码不能为空']));
}

// 连接数据库
$conn = new mysqli('localhost', 'root', '', 'cruise');
if ($conn->connect_error) {
    die(json_encode(['code' => 500, 'message' => '数据库连接失败：' . $conn->connect_error]));
}
$conn->set_charset('utf8mb4');

// 查询用户并验证（明文直接对比）
$stmt = $conn->prepare("SELECT id, username, password FROM tb_user WHERE username = ? LIMIT 1");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    // 直接对比明文密码
    if ($password === $user['password']) {
        echo json_encode([
            'code' => 200,
           'message' => '登录成功',
            'user' => [
                'id' => $user['id'],
                'username' => $user['username']
            ]
        ]);
    } else {
        echo json_encode(['code' => 401, 'message' => '密码错误']);
    }
} else {
    echo json_encode(['code' => 401, 'message' => '用户名不存在']);
}

$stmt->close();
$conn->close();
?>