<?php
session_start();
require_once '../../config/db_connect.php';

// Khởi tạo biến session
$_SESSION['mess'] = '';
$_SESSION['email'] = '';

// Xử lý đăng nhập
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = trim($_POST['email'] ?? '');
    $passwork = $_POST['passwork'] ?? '';
    
    
    // Kiểm tra dữ liệu đầu vào
    if (empty($username) || empty($passwork)) {
        $_SESSION['mess'] = "完全にユーザー名とパスワードを入力してください";
        $_SESSION['email'] = $username;
        header("Location: ../page/login.php");
        exit();
    }

    try {
        // Truy vấn database
        $stmt = $conn->prepare("SELECT * FROM users WHERE email = :username LIMIT 1");
        $stmt->bindParam(':username', $username);
        $stmt->execute();
        
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        // Xác minh mật khẩu

        if ( $user && ($passwork == $user['passwork'])) {
            // Lưu thông tin user vào session
            $_SESSION['id'] = $user['id'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['role'] = $user['role'];
            $_SESSION['logged_in'] = true;
            $_SESSION['remember'] = $_POST['remember'];
            
            // Cập nhật trạng thái đăng nhập
            $updateStmt = $conn->prepare("UPDATE users SET logged = 1, last_login = NOW() WHERE id = :userId");
            $updateStmt->bindParam(':userId', $user['id'], PDO::PARAM_INT);
            $updateStmt->execute();

            // Chuyển hướng theo role
            if ($user['role'] == 'admin') {
                header("Location: ../admin/maneger.php");
            } else {
                header("Location: ../page/dashboard.php");
            }
            exit();
        } else {
            $_SESSION['mess'] = "ユーザー名またはパスワードが間違っています";
            $_SESSION['email'] = $username;
            header("Location: ../page/login.php");
            exit();
        }
    } catch (PDOException $e) {
        $_SESSION['mess'] = "データベースエラーが発生しました: " . $e->getMessage();
        header("Location: ../page/login.php");
        exit();
    }
} else {
    $_SESSION['mess'] = "無効なリクエストです";
    header("Location: ../page/login.php");
    exit();
}
?>