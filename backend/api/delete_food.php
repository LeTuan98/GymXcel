<?php
session_start();
require '../config/database.php';

$id = $_POST['id'];

$stmt = $pdo->prepare("DELETE FROM foods WHERE id = ? AND user_id = ?");
$stmt->execute([$id, $_SESSION['user_id']]);

echo json_encode(['success' => true]);
