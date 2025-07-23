
<?php
session_start();

// Kiểm tra đăng nhập

if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    if (isset($_SESSION['mess'])){
        $mess=$_SESSION['mess'];
        $email=$_SESSION['email'];
        $check=true;
    }else{
        $mess="";
        $email="";
        $check=false;
    }   
}else{
    header("Location: ../index.php");
    exit(); 
}
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GymXcel - 会員ログイン</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="../styles/login_style.css">
</head>
<body>
    <div class="login-container">
        <div class="login-image"></div>
        
        <div class="login-content">
            <div class="login-header">
                <a href="../../index.php" class="logo">
                    <i class="fas fa-dumbbell logo-icon"></i>
                    <div class="logo-text">Gym<span>Xcel</span></div>
                </a>
                
                <h1 class="login-title">会員ログイン</h1>
                <?php
                    if (!$check){
                        echo '<p class="login-subtitle" >';
                        echo "アカウントにアクセスするにはログインしてください";
                        }else{
                        echo '<p class="login-subtitle" style="color: red;" >';
                        echo $mess;
                        }
                ?>
                </p>
            </div>
            
            <form class="login-form" id="loginForm" method="POST" action="../sever/ctrl_login.php">
                <div class="form-group">
                    <label for="email" class="form-label">メールアドレス</label>
                    <input type="email" id="email" class="form-input" placeholder="メールアドレスを入力" name="email" required
                    <?php 
                    if ($check) {
                        echo 'value="' . $email . '"'; 
                    }
                    ?>
                    >
                    <i class="fas fa-envelope input-icon"></i>
                </div>
                
                <div class="form-group">
                    <label for="password" class="form-label">パスワード</label>
                    <input type="password" id="password" class="form-input" placeholder="パスワードを入力" name="passwork" required>
                    <i class="fas fa-lock input-icon"></i>
                </div>
                
                <div class="remember-forgot">
                    <div class="remember-me">
                        <input type="checkbox" id="remember" name="remember">
                        <label for="remember">ログイン状態を保持</label>
                    </div>
                    <a href="#" class="forgot-password">パスワードをお忘れですか？</a>
                </div>
                
                <button type="submit" class="login-button">ログイン</button>
                
                <div class="social-login">
                    <div class="social-divider">または次の方法でログイン</div>
                    
                    <div class="social-icons">
                        <a href="#" class="social-icon">
                            <i class="fab fa-google"></i>
                        </a>
                        <a href="#" class="social-icon">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="social-icon">
                            <i class="fab fa-apple"></i>
                        </a>
                    </div>
                </div>
                
                <div class="register-link">
                    アカウントをお持ちでないですか？ <a href="./register.php">今すぐ登録</a>
                </div>
            </form>
        </div>
    </div>
</body>
</html>