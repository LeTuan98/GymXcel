<?php
session_start();
header('Content-Type: application/json');
require '../config/database.php';

if (!isset($_SESSION['user_id'])) {
  echo json_encode(['success' => false, 'error' => 'unauthorized']);
  exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
  echo json_encode(['success' => false, 'error' => 'invalid_input']);
  exit;
}

$user_id = $_SESSION['user_id'];

$sql = "
  INSERT INTO user_profiles
    (user_id, height, weight, age, gender, activity_level, neck, waist, hip, goal)
  VALUES
    (:user_id, :height, :weight, :age, :gender, :activity_level, :neck, :waist, :hip, :goal)
  ON DUPLICATE KEY UPDATE
    height = VALUES(height),
    weight = VALUES(weight),
    age = VALUES(age),
    gender = VALUES(gender),
    activity_level = VALUES(activity_level),
    neck = VALUES(neck),
    waist = VALUES(waist),
    hip = VALUES(hip),
    goal = VALUES(goal)
";

$stmt = $pdo->prepare($sql);
$stmt->execute([
  ':user_id'        => $user_id,
  ':height'         => $input['height'],
  ':weight'         => $input['weight'],
  ':age'            => $input['age'],
  ':gender'         => $input['gender'],
  ':activity_level' => $input['activity_level'],
  ':neck'           => $input['neck'],
  ':waist'          => $input['waist'],
  ':hip'            => $input['hip'],
  ':goal'           => $input['goal']
]);

echo json_encode(['success' => true]);

