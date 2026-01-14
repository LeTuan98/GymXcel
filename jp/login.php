<?php
session_start();

if (isset($_SESSION['user_id'])) {
    header('Location: index.php');
    exit;
}

if (!isset($_SESSION['lang'])) {
    $_SESSION['lang'] = 'ja'; // ngôn ngữ mặc định
}

?>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ログイン - GymExcel</title>
    <link rel="stylesheet" href="../styles.css">
</head>
<body class="login-page">
    <div class="container">
        <div class="auth-card">
            <div class="logo-section">
                <div class="logo-icon">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 24H16M32 24H40M16 14V34M32 14V34M12 18H20M28 18H36M12 30H20M28 30H36" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                    </svg>
                </div>
                <h1 class="app-name">GymExcel</h1>
                <p class="tagline">おかえりなさい！目標達成の準備はできましたか？</p>
            </div>

            <form class="auth-form" id="loginForm">
                <div class="form-group">
                    <label for="email">メールアドレス</label>
                    <input type="email" id="email" name="email" placeholder="you@example.com" required>
                </div>

                <div class="form-group">
                    <label for="password">パスワード</label>
                    <input type="password" id="password" name="password" placeholder="••••••••" required>
                </div>

                <div class="form-options">
                    <label class="checkbox-label">
                        <input type="checkbox" name="remember">
                        <span>ログイン状態を保持する</span>
                    </label>
                    <a href="forgot-password.php" class="text-link">パスワードをお忘れですか？</a>
                </div>

                <button type="submit" class="btn btn-primary">ログイン</button>
            </form>

            <div class="auth-footer">
                <p>アカウントをお持ちでない方は <a href="register.php" class="text-link">新規登録</a></p>
                <div>
                    <p>🌐 <a href="../login.php" class="text-link">English</a> <a href="../vn/login.php" class="text-link">Tiếng Việt</a></p>               
                </div>
            </div>
        </div>
    </div>

    <script src="./js/auth.js"></script>
</body>
</html>
