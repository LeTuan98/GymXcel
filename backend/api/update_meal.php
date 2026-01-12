<?php
session_start();
require_once __DIR__ . '/../config/database.php';

if (!isset($_SESSION['user_id'])) {
  http_response_code(401);
  exit;
}

$id = $_POST['id'] ?? null;
$amount = $_POST['amount'] ?? null;

if (!$id || !$amount) {
  http_response_code(400);
  exit;
}

$stmt = $pdo->prepare("
  UPDATE meals
  SET amount = :amount
  WHERE id = :id AND user_id = :user_id
");

$stmt->execute([
  'amount' => $amount,
  'id' => $id,
  'user_id' => $_SESSION['user_id']
]);

echo json_encode(['success' => true]);
