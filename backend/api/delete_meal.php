<?php
session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/../config/database.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

$userId = $_SESSION['user_id'];
$mealId = $_POST['meal_id'] ?? null;

if (!$mealId) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Meal ID required']);
    exit;
}

try {
    $stmt = $pdo->prepare("
        DELETE FROM meals 
        WHERE id = :id AND user_id = :user_id
    ");

    $stmt->execute([
        ':id' => $mealId,
        ':user_id' => $userId
    ]);

    echo json_encode(['success' => true]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to delete meal'
    ]);
}
