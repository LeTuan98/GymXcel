<?php
session_start();
require_once '../../config/db_connect.php';
$updateStmt = $conn->prepare("UPDATE users SET logged = 0, last_login = NOW() WHERE id = :userId");
$updateStmt->bindParam(':userId', $_SESSION['id'], PDO::PARAM_INT);
$updateStmt->execute();
$_SESSION= array();
header("Location: ../../index.php");
exit();
?>
