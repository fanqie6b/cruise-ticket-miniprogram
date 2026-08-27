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

$selectedPort = isset($_GET['selectedPort']) ? $_GET['selectedPort'] : "全部港口";

if ($selectedPort === "全部港口") {
    $sql = "SELECT * FROM routes";
    $result = $conn->query($sql); 
} else {
    $stmt = $conn->prepare("SELECT * FROM routes WHERE port = ?");
    $stmt->bind_param("s", $selectedPort);
    $stmt->execute();
    $result = $stmt->get_result();
}

$routes = array();
if ($result && $result->num_rows > 0) { 
    while ($row = $result->fetch_assoc()) {
        $routes[] = array(
            "id" => $row['id'],
            "title" => $row['title'],
            "port" => $row['port'], 
            "imageUrl" => $row['imageUrl'],
            "subtitle" => $row['subtitle'],
            "date" => $row['date'],
            "price" => $row['price'],
            "tags" => explode(',', $row['tags'])
        );
    }
}

header("Content-Type: application/json; charset=utf-8");
echo json_encode($routes, JSON_UNESCAPED_UNICODE);

$conn->close();
?>