<?php
header("Content-Type: application/json; charset=utf8");
$type = $_GET['type'] ?? '';

$conn = mysqli_connect('localhost', 'root', '', 'purchaseinfo'); 
if (!$conn) {
  die(json_encode(['code' => 500, 'message' => '数据库连接失败']));
}
mysqli_set_charset($conn, 'utf8mb4');

$sql = "SELECT * FROM tb_activity" . ($type ? " WHERE type='$type'" : "");
$result = mysqli_query($conn, $sql);

$activities = [];
if ($result) {
  while ($row = mysqli_fetch_assoc($result)) {
    $activities[] = $row;
  }
} else {
  die(json_encode(['code' => 500, 'message' => '查询失败：' . mysqli_error($conn)]));
}

echo json_encode([
  'code' => 200,
  'data' => $activities
]);
mysqli_close($conn);
?>