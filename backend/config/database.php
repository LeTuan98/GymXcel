<?php
// config/database.php

// $DB_HOST = 'localhost';
// $DB_NAME = 'gymxcel';
// $DB_USER = 'gymxcel';
// $DB_PASS = 'letuan1998'; 
// $DB_CHARSET = 'utf8mb4';
$DB_HOST = 'localhost';
$DB_NAME = 'gxcel';
$DB_USER = 'root';
$DB_PASS = ''; // XAMPP mặc định không có password
$DB_CHARSET = 'utf8mb4';

try {
    $dsn = "mysql:host=$DB_HOST;dbname=$DB_NAME;charset=$DB_CHARSET";

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    $pdo = new PDO($dsn, $DB_USER, $DB_PASS, $options);

} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}