<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GymXcel - 会員登録</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="login_style.css">
</head>
<body>
    <div class="login-container">
        <div class="login-image"></div>
        
        <div class="login-content">
            <div class="login-header">
                <a href="../../index.html" class="logo">
                    <i class="fas fa-dumbbell logo-icon"></i>
                    <div class="logo-text">Gym<span>Xcel</span></div>
                </a>
                
                <h1 class="login-title">会員登録</h1>
                <p class="login-subtitle">GymXcelのメンバーになる</p>
            </div>
            
            <form class="login-form" id="registerForm">
                <div class="form-group">
                    <label for="fullname" class="form-label">氏名</label>
                    <input type="text" id="fullname" class="form-input" placeholder="氏名を入力" required>
                    <i class="fas fa-user input-icon"></i>
                </div>
                
                <div class="form-group">
                    <label for="email" class="form-label">メールアドレス</label>
                    <input type="email" id="email" class="form-input" placeholder="メールアドレスを入力" required>
                    <i class="fas fa-envelope input-icon"></i>
                </div>
                
                <div class="form-group">
                    <label for="phone" class="form-label">電話番号</label>
                    <input type="tel" id="phone" class="form-input" placeholder="電話番号を入力" required>
                    <i class="fas fa-phone input-icon"></i>
                </div>
                
                <div class="form-group">
                    <label for="password" class="form-label">パスワード</label>
                    <input type="password" id="password" class="form-input" placeholder="パスワードを入力（8文字以上）" required>
                    <i class="fas fa-lock input-icon"></i>
                </div>
                
                <div class="form-group">
                    <label for="confirm-password" class="form-label">パスワード確認</label>
                    <input type="password" id="confirm-password" class="form-input" placeholder="パスワードを再入力" required>
                    <i class="fas fa-lock input-icon"></i>
                </div>
                
                <div class="form-group">
                    <label for="membership" class="form-label">会員プラン</label>
                    <select id="membership" class="form-input" required>
                        <option value="">プランを選択</option>
                        <option value="basic">ベーシック会員</option>
                        <option value="premium">プレミアム会員</option>
                        <option value="elite">エリート会員</option>
                    </select>
                    <i class="fas fa-chevron-down input-icon"></i>
                </div>
                
                <div class="terms-agreement">
                    <input type="checkbox" id="terms" required>
                    <label for="terms"><a href="terms.html">利用規約</a>と<a href="privacy.html">プライバシーポリシー</a>に同意します</label>
                </div>
                
                <button type="submit" class="login-button">登録する</button>
                
                <div class="register-link">
                    すでにアカウントをお持ちですか？ <a href="login.html">ログイン</a>
                </div>
            </form>
        </div>
    </div>

    <script>
        document.getElementById('registerForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate password match
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if(password !== confirmPassword) {
                alert('パスワードが一致しません');
                return;
            }
            
            // Form is valid, proceed with registration
            window.location.href = 'registration-success.html'; // Redirect after successful registration
        });
    </script>
</body>
</html>