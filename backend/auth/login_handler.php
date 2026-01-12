<?php
session_start();
require_once '../config/database.php';

header('Content-Type: application/json');

$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';

if ($email === '' || $password === '') {
    echo json_encode(['error' => 'Email and password are required']);
    exit;
}

$stmt = $pdo->prepare("SELECT id, name, password FROM users WHERE email = ? LIMIT 1");
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user) {
    echo json_encode(['error' => 'Invalid email or password']);
    exit;
}

if (!password_verify($password, $user['password'])) {
    echo json_encode(['error' => 'Invalid email or password']);
    exit;
}

// ✅ LOGIN SUCCESS → SAVE SESSION
$_SESSION['user_id'] = $user['id'];
$_SESSION['user_name'] = $user['name'];

echo json_encode([
    'success' => true,
    'user' => [
        'id' => $user['id'],
        'name' => $user['name']
    ]
]);
