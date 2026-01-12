<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

require_once __DIR__ . '/../config/database.php';

$userId = $_SESSION['user_id'];
$date = $_GET['date'] ?? date('Y-m-d');

try {
    $stmt = $pdo->prepare("
        SELECT 
            m.id,
            m.meal_type,
            m.amount,
            f.id AS food_id,
            f.name,
            f.standard_amount AS serving,
            f.calo AS calories,
            f.protein,
            f.carb AS carbs,
            f.fat
        FROM meals m
        JOIN foods f ON m.food_id = f.id
        WHERE m.user_id = :user_id AND m.meal_date = :meal_date
        ORDER BY m.id ASC
    ");
    $stmt->execute([
        ':user_id' => $userId,
        ':meal_date' => $date
    ]);

    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $result = [
        'breakfast' => [],
        'lunch' => [],
        'dinner' => []
    ];

    foreach ($rows as $row) {
        $result[$row['meal_type']][] = [
            'id' => $row['id'],
            'amount' => (int)$row['amount'],
            'food' => [
                'id' => $row['food_id'],
                'name' => $row['name'],
                'serving' => $row['serving'],
                'calories' => $row['calories'],
                'protein' => $row['protein'],
                'carbs' => $row['carbs'],
                'fat' => $row['fat'],
            ]
        ];
    }

    echo json_encode(['success' => true, 'data' => $result]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error']);
}
