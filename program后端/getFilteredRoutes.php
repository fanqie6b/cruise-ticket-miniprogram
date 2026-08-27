<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "cruise";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}
$conn->set_charset("utf8mb4");

$date = $_GET['date'] ?? '';
$cruise = $_GET['cruise'] ?? '';
$port = $_GET['port'] ?? '';
$dest = $_GET['dest'] ?? '';


$where = [];
if (!empty($date)) $where[] = "date = '$date'";
if (!empty($cruise)) $where[] = "title LIKE '%$cruise%'";
if (!empty($port)) $where[] = "port = '$port'";
if (!empty($dest)) $where[] = "title LIKE '%$dest%'";

$sql = "SELECT * FROM routes" . (empty($where) ? "" : " WHERE " . implode(" AND ", $where));

$result = $conn->query($sql);
$routes = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $routes[] = [
            "id" => $row['id'],
            "title" => $row['title'],
            "port" => $row['port'],
            "imageUrl" => $row['imageUrl'],
            "subtitle" => $row['subtitle'],
            "date" => $row['date'],
            "price" => $row['price'],
            "tags" => explode(',', $row['tags'])
        ];
    }
}

header("Content-Type: application/json; charset=utf-8");
echo json_encode($routes, JSON_UNESCAPED_UNICODE);
$conn->close();
?>