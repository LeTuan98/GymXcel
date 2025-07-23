<?php
session_start();

// Kiểm tra đăng nhập

if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {  
    header("Location: ../../index.php");
    exit(); 
}
require_once '../../config/db_connect.php';
require_once '../sever/common.php';
$users = get_name($conn,$_SESSION['id']);
$name=$users['name'];



?>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GymExcel - クラス管理</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="../../styles.css">
    <link rel="stylesheet" href="../styles/my-class.css">   
    <link rel="stylesheet" href="../styles/dashboard-styles.css">   
</head>
<body>
    <!-- ナビゲーションバー -->
    <nav class="navbar dashboard-nav">
        <div class="nav-container">
            <div class="nav-logo">
                <a href="../../index.php">
                    <span class="logo-elite">Gym</span><span class="logo-gym">Xcel</span>
                </a>
            </div>
            
            <div class="nav-menu" id="nav-menu">
                <a href="./dashboard.php" class="nav-link">ダッシュボード</a>
                <a href="#workouts" class="nav-link ">マイワークアウト</a>
                <a href="./my-class.php" class="nav-link active">クラス</a>
                <a href="./nutrition.php" class="nav-link">栄養</a>
                <a href="./progress.php" class="nav-link">進捗</a>
                <a href="./blog-port.html" class="nav-link">コミュニティ</a>
            </div>
            
            <div class="nav-actions">
                <div class="member-profile" id="member-profile">
                    <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop" alt="会員" class="profile-avatar">
                    <span class="profile-name"><?php echo $name ?></span>
                    <i class="fas fa-chevron-down"></i>
                    <div class="profile-dropdown" id="profile-dropdown">
                        <a href="#profile"><i class="fas fa-user"></i> マイプロフィール</a>
                        <a href="#settings"><i class="fas fa-cog"></i> 設定</a>
                        <a href="#billing"><i class="fas fa-credit-card"></i> 請求</a>
                        <a href="#support"><i class="fas fa-headset"></i> サポート</a>
                        <hr>
                        <a href="../sever/ctrl_longout.php" class="logout-btn"><i class="fas fa-sign-out-alt"></i> ログアウト</a>
                    </div>
                </div>
                <div class="mobile-menu-toggle" id="mobile-menu-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </nav>

    <!-- メインコンテンツ -->
    <main class="class-management">
        <div class="container">
            <div class="class-header">
                <h1 class="class-title">クラス <span class="highlight">管理</span></h1>
                
                <div class="class-controls">
                    <div class="class-filter">
                        <select id="filter-class">
                            <option value="all">すべてのクラス</option>
                            <option value="yoga">ヨガ</option>
                            <option value="cardio">カーディオ</option>
                            <option value="strength">筋トレ</option>
                            <option value="hiit">HIIT</option>
                        </select>
                    </div>
                    <button class="btn-primary" id="add-class-btn">
                        <i class="fas fa-plus"></i> 新規追加
                    </button>
                </div>
            </div>

            <div class="class-grid">
                <!-- クラスカード 1 -->
                <div class="class-card">
                    <div class="class-card-header">
                        <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                             alt="ヨガクラス" class="class-image">
                        <span class="class-category">ヨガ</span>
                    </div>
                    <div class="class-card-body">
                        <h3 class="class-name">基本ヨガ</h3>
                        <div class="class-trainer">
                            <i class="fas fa-user"></i>
                            <span>山田 花子</span>
                        </div>
                        
                        <div class="class-schedule">
                            <span class="schedule-badge">月曜 6:00 - 7:00</span>
                            <span class="schedule-badge">水曜 6:00 - 7:00</span>
                        </div>
                        
                        <div class="class-info">
                            <div class="class-capacity">
                                <i class="fas fa-users"></i>
                                <span>15/20 名</span>
                            </div>
                            <div class="class-duration">
                                <i class="fas fa-clock"></i>
                                <span>60 分</span>
                            </div>
                        </div>
                        
                        <div class="class-actions">
                            <button class="btn-secondary">
                                <i class="fas fa-edit"></i> 編集
                            </button>
                            <button class="btn-dark">
                                <i class="fas fa-info-circle"></i> 詳細
                            </button>
                        </div>
                    </div>
                </div>

                <!-- クラスカード 2 -->
                <div class="class-card">
                    <div class="class-card-header">
                        <img src="https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                             alt="HIITクラス" class="class-image">
                        <span class="class-category">HIIT</span>
                    </div>
                    <div class="class-card-body">
                        <h3 class="class-name">上級HIIT</h3>
                        <div class="class-trainer">
                            <i class="fas fa-user"></i>
                            <span>田中 健太</span>
                        </div>
                        
                        <div class="class-schedule">
                            <span class="schedule-badge">火曜 18:00 - 19:00</span>
                            <span class="schedule-badge">木曜 18:00 - 19:00</span>
                        </div>
                        
                        <div class="class-info">
                            <div class="class-capacity">
                                <i class="fas fa-users"></i>
                                <span>12/15 名</span>
                            </div>
                            <div class="class-duration">
                                <i class="fas fa-clock"></i>
                                <span>45 分</span>
                            </div>
                        </div>
                        
                        <div class="class-actions">
                            <button class="btn-secondary">
                                <i class="fas fa-edit"></i> 編集
                            </button>
                            <button class="btn-dark">
                                <i class="fas fa-info-circle"></i> 詳細
                            </button>
                        </div>
                    </div>
                </div>

                <!-- クラスカード 3 -->
                <div class="class-card">
                    <div class="class-card-header">
                        <img src="https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                             alt="筋トレクラス" class="class-image">
                        <span class="class-category">筋トレ</span>
                    </div>
                    <div class="class-card-body">
                        <h3 class="class-name">基本ウェイト</h3>
                        <div class="class-trainer">
                            <i class="fas fa-user"></i>
                            <span>佐藤 大輔</span>
                        </div>
                        
                        <div class="class-schedule">
                            <span class="schedule-badge">月曜 19:00 - 20:30</span>
                            <span class="schedule-badge">金曜 19:00 - 20:30</span>
                        </div>
                        
                        <div class="class-info">
                            <div class="class-capacity">
                                <i class="fas fa-users"></i>
                                <span>8/10 名</span>
                            </div>
                            <div class="class-duration">
                                <i class="fas fa-clock"></i>
                                <span>90 分</span>
                            </div>
                        </div>
                        
                        <div class="class-actions">
                            <button class="btn-secondary">
                                <i class="fas fa-edit"></i> 編集
                            </button>
                            <button class="btn-dark">
                                <i class="fas fa-info-circle"></i> 詳細
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- フッター -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <div class="footer-logo">
                        <span class="logo-elite">Gym</span><span class="logo-gym">Excel</span>
                    </div>
                    <p class="footer-description">
                        最高のフィットネス体験を提供するプレミアムジム
                    </p>
                    <div class="footer-contact">
                        <div class="contact-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>東京都渋谷区1-2-3</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-phone"></i>
                            <span>03-1234-5678</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-envelope"></i>
                            <span>info@gymexcel.jp</span>
                        </div>
                    </div>
                </div>
                
                <div class="footer-links">
                    <h3>クイックリンク</h3>
                    <ul>
                        <li><a href="#">ホーム</a></li>
                        <li><a href="#">クラス</a></li>
                        <li><a href="#">トレーナー</a></li>
                        <li><a href="#">料金</a></li>
                        <li><a href="#">施設紹介</a></li>
                    </ul>
                </div>
                
                <div class="footer-support">
                    <h3>サポート</h3>
                    <ul>
                        <li><a href="#">よくある質問</a></li>
                        <li><a href="#">プライバシーポリシー</a></li>
                        <li><a href="#">利用規約</a></li>
                        <li><a href="#">お問い合わせ</a></li>
                    </ul>
                </div>
                
                <div class="footer-hours">
                    <h3>営業時間</h3>
                    <div class="hours-info">
                        <div class="hours-header">
                            <i class="fas fa-clock"></i>
                            <span>月曜日 - 日曜日</span>
                        </div>
                        <div class="hours-list">
                            <div class="hours-item">
                                <span>平日</span>
                                <span>6:00 - 23:00</span>
                            </div>
                            <div class="hours-item">
                                <span>土日祝</span>
                                <span>8:00 - 21:00</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="social-links">
                        <h4>SNSでフォロー</h4>
                        <div class="social-icons">
                            <a href="#"><i class="fab fa-twitter"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
                            <a href="#"><i class="fab fa-facebook-f"></i></a>
                            <a href="#"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="footer-map">
                <h3>アクセスマップ</h3>
                <div class="map-container">
                    <!-- ここにGoogleマップなどを埋め込む -->
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.747798533309!2d139.7432442152582!3d35.65858498019963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188bbd9009ec09%3A0x481a93f0d2a409dd!2sShibuya%20Station!5e0!3m2!1sen!2sjp!4v1620000000000!5m2!1sen!2sjp" 
                            width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                </div>
            </div>
            
            <div class="footer-bottom">
                <div class="footer-copyright">
                    &copy; 2023 GymExcel. All Rights Reserved.
                </div>
                <div class="footer-legal">
                    <a href="#">プライバシーポリシー</a>
                    <a href="#">利用規約</a>
                    <a href="#">クッキーポリシー</a>
                </div>
            </div>
        </div>
    </footer>
    <script src="./my-class.js"></script>                   
</body>
</html>