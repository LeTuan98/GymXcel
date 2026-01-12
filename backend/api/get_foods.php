<?php
session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/../config/database.php';

//  Check login
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode([
        'success' => false,
        'message' => 'Unauthorized'
    ]);
    exit;
}

$userId = $_SESSION['user_id'];

try {
    $stmt = $pdo->prepare("
        SELECT 
            id,
            name,
            standard_amount AS serving,
            calo AS calories,
            protein,
            carb AS carbs,
            fat
        FROM foods
        WHERE user_id = :user_id
        ORDER BY name ASC
    ");

    // ✅ BIND PARAM
    $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
    $stmt->execute();

    $foods = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'data' => $foods
    ]);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to fetch foods'
    ]);
}
