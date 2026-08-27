<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "purchaseinfo";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    header('Content-Type: application/json');
    echo json_encode([
        'code' => 500,
       'message' => '数据库连接失败: '. $conn->connect_error,
        'data' => []
    ]);
    exit;
}

$sql = "SELECT * FROM features WHERE status = 1 ORDER BY sort ASC";
$result = $conn->query($sql);

$features = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $features[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode([
    'code' => 200,
   'message' =>'success',
    'data' => $features
]);

$conn->close();
?>