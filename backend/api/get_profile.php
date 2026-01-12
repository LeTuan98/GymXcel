<?php
session_start();
header('Content-Type: application/json');

require '../config/database.php';

if (!isset($_SESSION['user_id'])) {
  echo json_encode(null);
  exit;
}

$user_id = $_SESSION['user_id'];

$sql = "
  SELECT
    height,
    weight,
    age,
    gender,
    neck,
    waist,
    hip,
    activity_level,
    goal
  FROM user_profiles
  WHERE user_id = :user_id
";

$stmt = $pdo->prepare($sql);

$stmt->execute([
  ':user_id' => $user_id
]);

$profile = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($profile ?: null);

