<?php
header("Content-Type: application/json; charset=utf8");

$conn = mysqli_connect('localhost', 'root', '', 'purchaseinfo');
if (!$conn) {
  die(json_encode(['code' => 500, 'message' => '数据库连接失败：' . mysqli_connect_error()]));
}
mysqli_set_charset($conn, 'utf8mb4');

$sql = "SELECT * FROM tb_food ORDER BY id ASC";
$result = mysqli_query($conn, $sql);
$foodList = [];

if (mysqli_num_rows($result) > 0) {
  while ($row = mysqli_fetch_assoc($result)) {
    $foodList[] = $row;
  }
  echo json_encode([
    'code' => 200,
    'data' => $foodList
  ]);
} else {
  echo json_encode(['code' => 404, 'message' => '暂无餐饮数据']);
}

mysqli_close($conn);
?>