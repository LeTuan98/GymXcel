<?php
// backend/auth/register_handler.php

session_start();
require_once '../config/database.php';

header('Content-Type: application/json');

// Chỉ cho phép POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Lấy dữ liệu từ form
$name     = trim($_POST['fullname'] ?? '');
$email    = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';
$confirm  = $_POST['confirmPassword'] ?? '';

// =======================
// VALIDATE DỮ LIỆU
// =======================
if ($name === '' || $email === '' || $password === '' || $confirm === '') {
    echo json_encode(['error' => 'Please fill in all fields']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['error' => 'Invalid email format']);
    exit;
}

if (strlen($password) < 6) {
    echo json_encode(['error' => 'Password must be at least 6 characters']);
    exit;
}

if ($password !== $confirm) {
    echo json_encode(['error' => 'Passwords do not match']);
    exit;
}

// =======================
// CHECK EMAIL TRÙNG
// =======================
$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ? LIMIT 1");
$stmt->execute([$email]);

if ($stmt->fetch()) {
    echo json_encode(['error' => 'Email already exists']);
    exit;
}

// =======================
// HASH PASSWORD
// =======================
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// =======================
// INSERT USER
// =======================
$stmt = $pdo->prepare(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"
);

try {
    $stmt->execute([$name, $email, $hashedPassword]);
} catch (Exception $e) {
    echo json_encode(['error' => 'Failed to create account']);
    exit;
}

$userId = $pdo->lastInsertId();

// =======================
// CREATE USER PROFILE
// =======================
$stmt = $pdo->prepare(
    "INSERT INTO user_profiles (user_id) VALUES (?)"
);
$stmt->execute([$userId]);

// (OPTIONAL) auto login sau khi đăng ký
$_SESSION['user_id'] = $userId;
$_SESSION['user_name'] = $name;

// =======================
// RESPONSE
// =======================
echo json_encode([
    'success' => true,
    'message' => 'Registration successful'
]);
