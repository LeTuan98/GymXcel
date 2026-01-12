<?php
session_start();
require '../config/database.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($_SESSION['user_id'])) {
  echo json_encode(['success' => false]);
  exit;
}

$stmt = $pdo->prepare("
  UPDATE foods SET
    name = ?,
    category = ?,
    standard_amount = ?,
    calo = ?,
    protein = ?,
    carb = ?,
    fat = ?
  WHERE id = ? AND user_id = ?
");

$stmt->execute([
  $data['name'],
  $data['category'],
  $data['serving'],
  $data['calories'],
  $data['protein'],
  $data['carbs'],
  $data['fat'],
  $data['id'],
  $_SESSION['user_id']
]);

echo json_encode([
  'success' => true,
  'data' => $data
]);
