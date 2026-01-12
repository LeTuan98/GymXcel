<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

require_once __DIR__ . '/../config/database.php';

$userId   = $_SESSION['user_id'];
$foodId  = $_POST['food_id'] ?? null;
$amount  = $_POST['amount'] ?? null;
$meal    = $_POST['meal_type'] ?? null;
$date    = $_POST['meal_date'] ?? date('Y-m-d');

if (!$foodId || !$amount || !$meal) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing data']);
    exit;
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO meals (user_id, food_id, meal_type, amount, meal_date)
        VALUES (:user_id, :food_id, :meal_type, :amount, :meal_date)
    ");
    $stmt->execute([
        ':user_id' => $userId,
        ':food_id' => $foodId,
        ':meal_type' => $meal,
        ':amount' => $amount,
        ':meal_date' => $date
    ]);

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to add meal']);
}
