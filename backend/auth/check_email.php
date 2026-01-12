<?php
require_once '../config/database.php';
header('Content-Type: application/json');

$email = trim($_POST['email'] ?? '');

if ($email === '') {
    echo json_encode(['exists' => false]);
    exit;
}

$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ? LIMIT 1");
$stmt->execute([$email]);

echo json_encode([
    'exists' => $stmt->fetch() ? true : false
]);
