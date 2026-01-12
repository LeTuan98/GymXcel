<?php
session_start();
require_once '../config/database.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request'
    ]);
    exit;
}

$email = trim($_POST['email'] ?? '');

if (empty($email)) {
    echo json_encode([
        'success' => false,
        'message' => 'Email is required'
    ]);
    exit;
}

// Check email tồn tại
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode([
        'success' => false,
        'message' => 'Email does not exist'
    ]);
    exit;
}

$user = $result->fetch_assoc();
$user_id = $user['id'];

// Tạo token
$token = bin2hex(random_bytes(32));
$expires_at = date('Y-m-d H:i:s', strtotime('+15 minutes'));

// Lưu token
$stmt = $conn->prepare("
    INSERT INTO password_resets (user_id, token, expires_at)
    VALUES (?, ?, ?)
");
$stmt->bind_param("iss", $user_id, $token, $expires_at);
$stmt->execute();

// DEMO: trả token về để test
echo json_encode([
    'success' => true,
    'message' => 'Reset link has been sent',
    'token' => $token
]);
