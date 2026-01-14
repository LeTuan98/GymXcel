<?php
session_start();

if (isset($_SESSION['user_id'])) {
    header('Location: index.php');
    exit;
}

if (!isset($_SESSION['lang'])) {
    $_SESSION['lang'] = 'jp'; // ngôn ngữ mặc định
}

?>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>パスワード再設定 - GymExcel</title>
    <link rel="stylesheet" href="../styles.css">
</head>
<body class="forgot-page">
    <div class="container">
        <div class="auth-card">
            <div class="logo-section">
                <div class="logo-icon">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 24H16M32 24H40M16 14V34M32 14V34M12 18H20M28 18H36M12 30H20M28 30H36" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                    </svg>
                </div>
                <h1 class="app-name">GymExcel</h1>
                <p class="tagline">パスワードを再設定</p>
            </div>

            <div class="info-message">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                    <path d="M12 8V12M12 16H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <p>ご登録のメールアドレスを入力してください。パスワード再設定用の案内をお送りします。</p>
            </div>

            <form class="auth-form" id="forgotPasswordForm">
                <div class="form-group">
                    <label for="email">メールアドレス</label>
                    <input type="email" id="email" name="email" placeholder="you@example.com" required>
                </div>

                <button type="submit" class="btn btn-primary">再設定リンクを送信</button>

                <a href="login.php" class="btn btn-secondary">ログイン画面に戻る</a>
            </form>

            <div class="auth-footer">
                <p>パスワードを思い出しましたか？ <a href="login.php" class="text-link">ログイン</a></p>
                <div>
                    <p>🌐 <a href="../forgot-password.php" class="text-link">English</a> <a href="../vn/forgot-password.php" class="text-link">Tiếng Việt</a></p>              
                </div>
            </div>
        </div>
    </div>

    <script src="./js/auth.js"></script>
</body>
</html>
