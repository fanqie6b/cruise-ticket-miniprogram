<?php
$db_host = "127.0.0.1";
$db_user = "root";
$db_pwd = "【此处改为自己的数据库密码】"; 
$db_name = "cruise";

$con = new mysqli($db_host, $db_user, $db_pwd, $db_name);

if ($con->connect_error) {
    die("数据库连接失败: " . $con->connect_error);
}

$con->set_charset("utf8");
?>