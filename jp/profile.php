<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GymExcel - プロフィール＆目標</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/global.css">
  <link rel="stylesheet" href="../css/profile.css">
</head>
<body>
  <header>
    <div class="header-content">
      <a href="index.php" class="logo">
        <svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6.5 6.5h.01M6.5 17.5h.01M17.5 6.5h.01M17.5 17.5h.01M19 12h.01M5 12h.01M12 2v4m0 12v4M8 4h8M8 20h8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        GymExcel
      </a>
      <nav>
        <a href="index.php" class="nav-link">ダッシュボード</a>
        <a href="profile.php" class="nav-link active">マイページ</a>
        <a href="foods.php" class="nav-link">食品</a>
        <a href="../backend/auth/logout.php" class="nav-link">ログアウト</a>
      </nav>
    </div>
  </header>

  <div class="container">
    <div class="profile-container">
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">基本情報</h2>
          <p class="card-subtitle">数値を入力して身体データを計算します</p>
        </div>

        <div class="input-group">
          <label class="input-label">身長 (cm)</label>
          <input type="number" class="input-field" id="height" placeholder="170" min="100" max="250">
        </div>

        <div class="input-group">
          <label class="input-label">体重 (kg)</label>
          <input type="number" class="input-field" id="weight" placeholder="70" min="30" max="300">
        </div>

        <div class="input-group">
          <label class="input-label">年齢</label>
          <input type="number" class="input-field" id="age" placeholder="25" min="15" max="100">
        </div>

        <div class="input-group">
          <label class="input-label">首囲 (cm)</label>
          <input type="number" class="input-field" id="neck" placeholder="38" min="15" max="300">
        </div>

        <div class="input-group">
          <label class="input-label">ウエスト (cm)</label>
          <input type="number" class="input-field" id="waist" placeholder="82" min="15" max="500">
        </div>
  
        <div class="input-group">
          <label class="input-label">性別</label>
          <select class="select-field" id="gender">
            <option value="">性別を選択...</option>
            <option value="M">男性</option>
            <option value="F">女性</option>
          </select>
        </div>

        <div class="input-group" id="hipGroup">
          <label class="input-label">ヒップ (cm)</label>
          <input type="number" class="input-field" id="hip" placeholder="95" min="15" max="500">
        </div>
        
        <div class="input-group">
          <label class="input-label">活動レベル</label>
          <select class="select-field" id="activityLevel">
            <option value="">活動レベルを選択...</option>
            <option value="1.2">ほぼ運動しない</option>
            <option value="1.375">軽い運動（週1〜3日）</option>
            <option value="1.55">中程度の運動（週3〜5日）</option>
            <option value="1.725">高強度の運動（週6〜7日）</option>
            <option value="1.9">アスリートレベル</option>
          </select>
        </div>

        <button class="btn btn-primary" onclick="saveProfile()" style="width: 100%;">
          データを保存
        </button>
      </div>

      <div class="card">
        <div class="card-header">
          <h2 class="card-title">健康指標</h2>
          <p class="card-subtitle">入力データから自動計算されます</p>
        </div>

        <div class="stats-grid">
          <div class="stat-result">
            <div class="stat-result-label">BMI</div>
            <div class="stat-result-value" id="bmiValue">--</div>
            <div class="stat-result-description" id="bmiCategory">未計算</div>
          </div>

          <div class="stat-result">
            <div class="stat-result-label">BMR</div>
            <div class="stat-result-value" id="bmrValue">--</div>
            <div class="stat-result-description">kcal / 日</div>
          </div>

          <div class="stat-result">
            <div class="stat-result-label">TDEE</div>
            <div class="stat-result-value" id="tdeeValue">--</div>
            <div class="stat-result-description">kcal / 日</div>
          </div>

          <div class="stat-result">
            <div class="stat-result-label">体脂肪率</div>
            <div class="stat-result-value" id="bfpValue">--</div>
            <div class="stat-result-description">推定 (%)</div>
          </div>
        </div>
      </div>

      <div class="card goals-section">
        <div class="card-header">
          <h2 class="card-title">目標を選択</h2>
          <p class="card-subtitle">目標に合わせて栄養プランを最適化します</p>
        </div>

        <div class="goals-grid">
          <div class="goal-card" data-goal="muscle-gain" onclick="selectGoal('muscle-gain')">
            <div class="goal-title">筋肥大</div>
            <div class="goal-description">余剰カロリーで筋肉量を増やす</div>
          </div>

          <div class="goal-card" data-goal="fat-loss" onclick="selectGoal('fat-loss')">
            <div class="goal-title">体脂肪減少</div>
            <div class="goal-description">筋肉を維持しながら脂肪を落とす</div>
          </div>

          <div class="goal-card" data-goal="weight-gain" onclick="selectGoal('weight-gain')">
            <div class="goal-title">体重増加</div>
            <div class="goal-description">全体的な体重を増やす</div>
          </div>

          <div class="goal-card" data-goal="weight-loss" onclick="selectGoal('weight-loss')">
            <div class="goal-title">体重減少</div>
            <div class="goal-description">カロリー制限で体重を減らす</div>
          </div>
        </div>
      </div>

      <div class="card macros-card" id="macrosCard" style="display: none;">
        <div class="card-header" style="border-color: rgba(255, 255, 255, 0.2);">
          <h2 class="card-title" style="color: white;">1日のマクロ栄養素</h2>
          <p class="card-subtitle" style="color: rgba(255, 255, 255, 0.85);">
            目標：<span id="selectedGoalText">---</span>
          </p>
        </div>

        <div class="macros-grid">
          <div class="macro-item">
            <div class="macro-label">1日の摂取カロリー</div>
            <div class="macro-value" id="goalCalories">--</div>
            <div class="macro-percentage">kcal / 日</div>
          </div>

          <div class="macro-item">
            <div class="macro-label">タンパク質</div>
            <div class="macro-value" id="proteinValue">--</div>
            <div class="macro-bar">
              <div class="macro-bar-fill protein" id="proteinBar" style="width: 0%"></div>
            </div>
            <div class="macro-percentage" id="proteinPercent">--</div>
          </div>

          <div class="macro-item">
            <div class="macro-label">炭水化物</div>
            <div class="macro-value" id="carbsValue">--</div>
            <div class="macro-bar">
              <div class="macro-bar-fill carbs" id="carbsBar" style="width: 0%"></div>
            </div>
            <div class="macro-percentage" id="carbsPercent">--</div>
          </div>

          <div class="macro-item">
            <div class="macro-label">脂質</div>
            <div class="macro-value" id="fatValue">--</div>
            <div class="macro-bar">
              <div class="macro-bar-fill fat" id="fatBar" style="width: 0%"></div>
            </div>
            <div class="macro-percentage" id="fatPercent">--</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script src="js/profile.js"></script>
</body>
</html>
