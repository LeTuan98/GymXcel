<?php
session_start();
header('Content-Type: application/json');
require '../config/database.php';

if (!isset($_SESSION['user_id'])) {
  http_response_code(401);
  echo json_encode(['success' => false, 'message' => 'Unauthorized']);
  exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$stmt = $pdo->prepare("
  INSERT INTO foods (user_id, name, category, standard_amount, calo, protein, carb, fat)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
");

$stmt->execute([
  $_SESSION['user_id'],
  $data['name'],
  $data['category'],
  $data['serving'],
  $data['calories'],
  $data['protein'],
  $data['carbs'],
  $data['fat']
]);

$data['id'] = (int) $pdo->lastInsertId();

echo json_encode([
  'success' => true,
  'data' => $data
]);

