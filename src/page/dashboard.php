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
    <title>会員ダッシュボード - GymXcel</title>
    <link rel="stylesheet" href="../../styles.css">
    <link rel="stylesheet" href="../styles/dashboard-styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <!-- ナビゲーション -->
    <nav class="navbar dashboard-nav">
        <div class="nav-container">
            <div class="nav-logo">
                <a href="../../index.php">
                    <span class="logo-elite">Gym</span><span class="logo-gym">Xcel</span>
                </a>
            </div>
            
            <div class="nav-menu" id="nav-menu">
                <a href="./dashboard.php" class="nav-link active">ダッシュボード</a>
                <a href="#workouts" class="nav-link ">マイワークアウト</a>
                <a href="./my-class.php" class="nav-link">クラス</a>
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

    <!-- ダッシュボードヘッダー -->
    <section class="dashboard-header">
        <div class="container">
            <div class="welcome-section">
                <div class="welcome-content">
                    <h1 class="welcome-title">おかえりなさい, <span class="highlight"><?php echo $name ?>!</span></h1>
                    <p class="welcome-subtitle">今日もフィットネス目標を達成しましょう!</p>
                    <div class="quick-stats">
                        <div class="stat-item">
                            <i class="fas fa-fire"></i>
                            <div class="stat-info">
                                <span class="stat-number">847</span>
                                <span class="stat-label">今日の消費カロリー</span>
                            </div>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-dumbbell"></i>
                            <div class="stat-info">
                                <span class="stat-number">12</span>
                                <span class="stat-label">今月のワークアウト</span>
                            </div>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-trophy"></i>
                            <div class="stat-info">
                                <span class="stat-number">85%</span>
                                <span class="stat-label">目標達成率</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="membership-card">
                    <div class="card-header">
                        <h3>エリート会員</h3>
                        <div class="membership-status active">有効</div>
                    </div>
                    <div class="card-content">
                        <div class="membership-info">
                            <div class="info-item">
                                <span class="label">入会日:</span>
                                <span class="value">2024年1月</span>
                            </div>
                            <div class="info-item">
                                <span class="label">次回請求日:</span>
                                <span class="value">2025年1月15日</span>
                            </div>
                            <div class="info-item">
                                <span class="label">プラン:</span>
                                <span class="value">エリート年間</span>
                            </div>
                        </div>
                        <div class="qr-code">
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=ELITE-MEMBER-12345" alt="会員QRコード">
                            <span>ジム入場用QRコード</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ダッシュボードコンテンツ -->
    <section class="dashboard-content">
        <div class="container">
            <div class="dashboard-grid">
                <!-- 今日のスケジュール -->
                <div class="dashboard-widget schedule-widget">
                    <div class="widget-header">
                        <h3><i class="fas fa-calendar-day"></i> 今日のスケジュール</h3>
                        <button class="widget-action">すべて表示</button>
                    </div>
                    <div class="widget-content">
                        <div class="schedule-item upcoming">
                            <div class="schedule-time">
                                <span class="time">14:00</span>
                                <span class="duration">60 分</span>
                            </div>
                            <div class="schedule-details">
                                <h4>HIITカーディオ</h4>
                                <p><i class="fas fa-map-marker-alt"></i> スタジオA</p>
                                <p><i class="fas fa-user"></i> トレーナー: 田中 健太</p>
                            </div>
                            <div class="schedule-status">
                                <span class="status-badge booked">予約済</span>
                            </div>
                        </div>
                        <div class="schedule-item">
                            <div class="schedule-time">
                                <span class="time">16:30</span>
                                <span class="duration">45 分</span>
                            </div>
                            <div class="schedule-details">
                                <h4>パーソナルトレーニング</h4>
                                <p><i class="fas fa-map-marker-alt"></i> トレーニングゾーン</p>
                                <p><i class="fas fa-user"></i> トレーナー: 鈴木 美咲</p>
                            </div>
                            <div class="schedule-status">
                                <span class="status-badge confirmed">確定</span>
                            </div>
                        </div>
                        <div class="schedule-item available">
                            <div class="schedule-time">
                                <span class="time">18:00</span>
                                <span class="duration">50 分</span>
                            </div>
                            <div class="schedule-details">
                                <h4>ヨガフロー</h4>
                                <p><i class="fas fa-map-marker-alt"></i> ウェルネススタジオ</p>
                                <p><i class="fas fa-users"></i> 空き3名</p>
                            </div>
                            <div class="schedule-status">
                                <button class="book-btn">今すぐ予約</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ワークアウト進捗 -->
                <div class="dashboard-widget progress-widget">
                    <div class="widget-header">
                        <h3><i class="fas fa-chart-line"></i> ワークアウト進捗</h3>
                        <select class="time-filter">
                            <option>今週</option>
                            <option>今月</option>
                            <option>今年</option>
                        </select>
                    </div>
                    <div class="widget-content">
                        <div class="progress-chart">
                            <canvas id="workoutChart" width="400" height="200"></canvas>
                        </div>
                        <div class="progress-summary">
                            <div class="summary-item">
                                <span class="summary-label">総ワークアウト数</span>
                                <span class="summary-value">24</span>
                            </div>
                            <div class="summary-item">
                                <span class="summary-label">平均時間</span>
                                <span class="summary-value">52 分</span>
                            </div>
                            <div class="summary-item">
                                <span class="summary-label">消費カロリー</span>
                                <span class="summary-value">8,420</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- クイックアクション -->
                <div class="dashboard-widget actions-widget">
                    <div class="widget-header">
                        <h3><i class="fas fa-bolt"></i> クイックアクション</h3>
                    </div>
                    <div class="widget-content">
                        <div class="action-grid">
                            <button class="action-btn">
                                <i class="fas fa-play"></i>
                                <span>ワークアウト開始</span>
                            </button>
                            <button class="action-btn">
                                <i class="fas fa-calendar-plus"></i>
                                <span>クラス予約</span>
                            </button>
                            <button class="action-btn">
                                <i class="fas fa-user-plus"></i>
                                <span>トレーナー予約</span>
                            </button>
                            <button class="action-btn">
                                <i class="fas fa-utensils"></i>
                                <span>食事プラン</span>
                            </button>
                            <button class="action-btn">
                                <i class="fas fa-camera"></i>
                                <span>進捗写真</span>
                            </button>
                            <button class="action-btn">
                                <i class="fas fa-comments"></i>
                                <span>コミュニティ</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 最近のアクティビティ -->
                <div class="dashboard-widget activity-widget">
                    <div class="widget-header">
                        <h3><i class="fas fa-history"></i> 最近のアクティビティ</h3>
                        <button class="widget-action">すべて表示</button>
                    </div>
                    <div class="widget-content">
                        <div class="activity-list">
                            <div class="activity-item">
                                <div class="activity-icon workout">
                                    <i class="fas fa-dumbbell"></i>
                                </div>
                                <div class="activity-details">
                                    <h4>上半身トレーニング完了</h4>
                                    <p>420カロリー消費 • 55分</p>
                                    <span class="activity-time">2時間前</span>
                                </div>
                                <div class="activity-badge">
                                    <i class="fas fa-fire"></i>
                                </div>
                            </div>
                            <div class="activity-item">
                                <div class="activity-icon class">
                                    <i class="fas fa-users"></i>
                                </div>
                                <div class="activity-details">
                                    <h4>HIITカーディオ参加</h4>
                                    <p>トレーナー: 田中 健太</p>
                                    <span class="activity-time">昨日</span>
                                </div>
                                <div class="activity-badge">
                                    <i class="fas fa-star"></i>
                                </div>
                            </div>
                            <div class="activity-item">
                                <div class="activity-icon achievement">
                                    <i class="fas fa-trophy"></i>
                                </div>
                                <div class="activity-details">
                                    <h4>実績解除!</h4>
                                    <p>今月10回のワークアウト</p>
                                    <span class="activity-time">2日前</span>
                                </div>
                                <div class="activity-badge">
                                    <i class="fas fa-medal"></i>
                                </div>
                            </div>
                            <div class="activity-item">
                                <div class="activity-icon nutrition">
                                    <i class="fas fa-apple-alt"></i>
                                </div>
                                <div class="activity-details">
                                    <h4>栄養目標達成</h4>
                                    <p>1日のタンパク質目標達成</p>
                                    <span class="activity-time">3日前</span>
                                </div>
                                <div class="activity-badge">
                                    <i class="fas fa-check"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 栄養トラッキング -->
                <div class="dashboard-widget nutrition-widget">
                    <div class="widget-header">
                        <h3><i class="fas fa-apple-alt"></i> 今日の栄養</h3>
                        <button class="widget-action">食事追加</button>
                    </div>
                    <div class="widget-content">
                        <div class="nutrition-overview">
                            <div class="calorie-circle">
                                <div class="circle-progress" data-progress="68">
                                    <span class="calories-consumed">1,360</span>
                                    <span class="calories-total">/ 2,000 カロリー</span>
                                </div>
                            </div>
                            <div class="macro-breakdown">
                                <div class="macro-item">
                                    <div class="macro-bar">
                                        <div class="macro-fill protein" style="width: 75%"></div>
                                    </div>
                                    <span class="macro-label">タンパク質: 120g / 160g</span>
                                </div>
                                <div class="macro-item">
                                    <div class="macro-bar">
                                        <div class="macro-fill carbs" style="width: 60%"></div>
                                    </div>
                                    <span class="macro-label">炭水化物: 150g / 250g</span>
                                </div>
                                <div class="macro-item">
                                    <div class="macro-bar">
                                        <div class="macro-fill fats" style="width: 45%"></div>
                                    </div>
                                    <span class="macro-label">脂質: 32g / 70g</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 目標と実績 -->
                <div class="dashboard-widget goals-widget">
                    <div class="widget-header">
                        <h3><i class="fas fa-target"></i> 目標と実績</h3>
                        <button class="widget-action">目標設定</button>
                    </div>
                    <div class="widget-content">
                        <div class="goal-item">
                            <div class="goal-info">
                                <h4>月間ワークアウト目標</h4>
                                <p>今月20回のワークアウトを完了</p>
                            </div>
                            <div class="goal-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 60%"></div>
                                </div>
                                <span class="progress-text">12 / 20</span>
                            </div>
                        </div>
                        <div class="goal-item">
                            <div class="goal-info">
                                <h4>減量目標</h4>
                                <p>2025年3月までに4.5kg減量</p>
                            </div>
                            <div class="goal-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 40%"></div>
                                </div>
                                <span class="progress-text">1.8 / 4.5 kg</span>
                            </div>
                        </div>
                        <div class="achievements-preview">
                            <h4>最近の実績</h4>
                            <div class="achievement-badges">
                                <div class="badge-item">
                                    <i class="fas fa-fire"></i>
                                    <span>7日連続</span>
                                </div>
                                <div class="badge-item">
                                    <i class="fas fa-dumbbell"></i>
                                    <span>筋力戦士</span>
                                </div>
                                <div class="badge-item">
                                    <i class="fas fa-heart"></i>
                                    <span>カーディオ王者</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- フローティングアクションボタン -->
    <div class="floating-actions">
        <button class="fab-main" id="fab-main">
            <i class="fas fa-plus"></i>
        </button>
        <div class="fab-menu" id="fab-menu">
            <button class="fab-item" data-action="workout">
                <i class="fas fa-play"></i>
                <span>ワークアウト開始</span>
            </button>
            <button class="fab-item" data-action="class">
                <i class="fas fa-calendar-plus"></i>
                <span>クラス予約</span>
            </button>
            <button class="fab-item" data-action="meal">
                <i class="fas fa-utensils"></i>
                <span>食事記録</span>
            </button>
            <button class="fab-item" data-action="progress">
                <i class="fas fa-camera"></i>
                <span>進捗写真</span>
            </button>
        </div>
    </div>
    <script src="../script/dashboard-script.js"></script>
</body>
</html>