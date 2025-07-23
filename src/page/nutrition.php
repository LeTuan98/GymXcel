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
    <link rel="stylesheet" href="../styles/nutrition.css">
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
                <a href="./dashboard.php" class="nav-link">ダッシュボード</a>
                <a href="#workouts" class="nav-link ">マイワークアウト</a>
                <a href="./my-class.php" class="nav-link">クラス</a>
                <a href="./nutrition.php" class="nav-link active">栄養</a>
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

   
    <section class="comparison-section">
        <div class="container">
            
            <div class="comparison-table">
                <h2 class="section-title">
                    朝:<span class="title-highlight">栄養</span>
                </h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>量</th>
                            <th>カロリー</th>
                            <th>Protein</th>
                            <th>Carb</th>
                            <th>Fat</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>施設利用時間</td>
                            <td>平日 9:00-21:00</td>
                            <td>全日 7:00-23:00</td>
                            <td>24時間</td>
                        </tr>
                        <tr>
                            <td>グループクラス</td>
                            <td>週2回</td>
                            <td>無制限</td>
                            <td>無制限</td>
                        </tr>
                        <tr>
                            <td>プライベートトレーニング</td>
                            <td>-</td>
                            <td>月2回</td>
                            <td>無制限</td>
                        </tr>
                        <tr>
                            <td>栄養コンサルティング</td>
                            <td>-</td>
                            <td>月1回</td>
                            <td>個別プラン</td>
                        </tr>
                        <tr>
                            <td>プロテインサービス</td>
                            <td>-</td>
                            <td>利用可</td>
                            <td>プレミアムサービス</td>
                        </tr>
                        <tr>
                            <td>ゲスト招待</td>
                            <td>-</td>
                            <td>-</td>
                            <td>月2回</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
  
    <script src="../script/dashboard-script.js"></script>
    <script src="../script/nutrition.js"></script>
</body>
</html>