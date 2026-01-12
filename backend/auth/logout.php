<?php
session_start();

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
header('Location: ../../login.php');
exit;
