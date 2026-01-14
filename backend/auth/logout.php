<?php
session_start();

$lang = 'vi';

if (isset($_SESSION['lang']) && in_array($_SESSION['lang'], ['vi', 'en', 'ja'])) {
    $lang = $_SESSION['lang'];
}

// Xoá toàn bộ session
$_SESSION = [];

// Huỷ session
session_destroy();

// (Optional) xoá cookie session nếu có
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(
        session_name(),
        '',
        time() - 42000,
        $params["path"],
        $params["domain"],
        $params["secure"],
        $params["httponly"]
    );
}

// Quay về trang login
if ($lang === 'vi') {
    header('Location: ../../vi/login.php');
    exit;
} elseif ($lang === 'ja') {
    header('Location: ../../jp/login.php');
    exit;
} else {
    header('Location: ../../login.php');
    exit;
}
