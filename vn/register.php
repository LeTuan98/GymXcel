<?php
session_start();

if (isset($_SESSION['user_id'])) {
    header('Location: index.php');
    exit;
}

if (!isset($_SESSION['lang'])) {
    $_SESSION['lang'] = 'vi'; // ngôn ngữ mặc định
}

?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng ký - GymExcel</title>
    <link rel="stylesheet" href="../styles.css">
</head>
<body class="register-page">
    <div class="container">
        <div class="auth-card">
            <div class="logo-section">
                <div class="logo-icon">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 24H16M32 24H40M16 14V34M32 14V34M12 18H20M28 18H36M12 30H20M28 30H36" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                    </svg>
                </div>
                <h1 class="app-name">GymExcel</h1>
                <p class="tagline">Bắt đầu hành trình tập luyện của bạn ngay hôm nay</p>
            </div>

            <form class="auth-form" id="registerForm">
                <div class="form-group">
                    <label for="fullname">Họ và tên</label>
                    <input type="text" id="fullname" name="fullname" placeholder="Nguyễn Văn A" required>
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="you@example.com" required>
                </div>

                <div class="form-group">
                    <label for="password">Mật khẩu</label>
                    <input type="password" id="password" name="password" placeholder="••••••••" required>
                </div>

                <div class="form-group">
                    <label for="confirmPassword">Xác nhận mật khẩu</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" placeholder="••••••••" required>
                </div>

                <label class="checkbox-label checkbox-centered">
                    <input type="checkbox" name="terms" required>
                    <span>Tôi đồng ý với <a href="#" class="text-link">Điều khoản & Điều kiện</a></span>
                </label>

                <button type="submit" class="btn btn-primary">Tạo tài khoản</button>
            </form>

            <div class="auth-footer">
                <p>Đã có tài khoản? <a href="login.php" class="text-link">Đăng nhập</a></p>
                <div>
                    <p>🌐 <a href="../jp/register.php" class="text-link">日本語</a> <a href="../register.php" class="text-link">English</a></p>             
                </div>
            </div>
        </div>
    </div>

    <script src="./js/auth.js"></script>
</body>
</html>
