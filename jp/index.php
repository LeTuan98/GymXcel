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
  <title>GymExcel - ダッシュボード</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/global.css">
  <link rel="stylesheet" href="../css/dashboard.css">
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
        <a href="index.php" class="nav-link active">ダッシュボード</a>
        <a href="profile.php" class="nav-link">マイページ</a>
        <a href="foods.php" class="nav-link">食品</a>
        <a href="../backend/auth/logout.php" class="nav-link">ログアウト</a>
      </nav>
    </div>
  </header>

  <div class="container">
    <div class="date-navigation">
      <button class="date-nav-btn" id="prevDay" aria-label="前の日">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="current-date" id="currentDate">今日</div>
      <button class="date-nav-btn" id="nextDay" aria-label="次の日">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <div class="calorie-overview">
      <div class="overview-card target">
        <div class="overview-label">目標カロリー</div>
        <div class="overview-value" id="targetCalories">2000</div>
        <div class="overview-subtitle">kcal</div>
      </div>
      <div class="overview-card consumed">
        <div class="overview-label">摂取カロリー</div>
        <div class="overview-value" id="consumedCalories">0</div>
        <div class="overview-subtitle">kcal</div>
      </div>
      <div class="overview-card remaining">
        <div class="overview-label">残りカロリー</div>
        <div class="overview-value" id="remainingCalories">2000</div>
        <div class="overview-subtitle">kcal</div>
      </div>
    </div>

    <div class="card mb-3">
      <div class="progress-section">
        <div class="progress-info">
          <span>1日の進捗</span>
          <span id="progressPercent">0%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" id="progressFill" style="width: 0%"></div>
        </div>
      </div>
    </div>

    <div class="meals-section">
      <div class="meal-card">
        <div class="meal-header">
          <div class="meal-title">
            <svg class="meal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2M7 21v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2M3 10h18M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            朝食
          </div>
          <div class="meal-total">合計: <span id="breakfastTotal">0 kcal</span></div>
        </div>
        <div class="food-selector">
          <select class="select-field" id="breakfastFood">
            <option value="">食品を選択...</option>
          </select>
          <input type="number" class="input-field" id="breakfastAmount" placeholder="量 (g)" min="1" value="100">
          <button class="btn btn-primary" onclick="addFood('breakfast')">追加</button>
        </div>
        <div id="breakfastList"></div>
      </div>

      <div class="meal-card">
        <div class="meal-header">
          <div class="meal-title">
            <svg class="meal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2" stroke-linecap="round"/>
            </svg>
            昼食
          </div>
          <div class="meal-total">合計: <span id="lunchTotal">0 kcal</span></div>
        </div>
        <div class="food-selector">
          <select class="select-field" id="lunchFood">
            <option value="">食品を選択...</option>
          </select>
          <input type="number" class="input-field" id="lunchAmount" placeholder="量 (g)" min="1" value="100">
          <button class="btn btn-primary" onclick="addFood('lunch')">追加</button>
        </div>
        <div id="lunchList"></div>
      </div>

      <div class="meal-card">
        <div class="meal-header">
          <div class="meal-title">
            <svg class="meal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M2 12h20M2 7h20M2 17h20" stroke-linecap="round"/>
            </svg>
            夕食
          </div>
          <div class="meal-total">合計: <span id="dinnerTotal">0 kcal</span></div>
        </div>
        <div class="food-selector">
          <select class="select-field" id="dinnerFood">
            <option value="">食品を選択...</option>
          </select>
          <input type="number" class="input-field" id="dinnerAmount" placeholder="量 (g)" min="1" value="100">
          <button class="btn btn-primary" onclick="addFood('dinner')">追加</button>
        </div>
        <div id="dinnerList"></div>
      </div>
    </div>

    <div class="card macros-card" id="macrosCard">
        <div class="card-header" style="border-color: rgba(255, 255, 255, 0.2);">
          <h2 class="card-title" style="color: white;">1日の合計</h2>
        </div>

        <div class="macros-grid">
          <div class="macro-item">
            <div class="macro-label">総カロリー</div>
            <div class="macro-value" id="goalCalories">--</div>
            <div class="macro-percentage">kcal</div>
          </div>

          <div class="macro-item">
            <div class="macro-label">タンパク質</div>
            <div class="macro-value"><span id="proteinValue">--</span> / <span id="proteinGoal">--</span></div>
            <div class="macro-bar">
              <div class="progress-fill protein" id="proteinBar" style="width: 0%"></div>
            </div>
            <div class="macro-percentage" id="proteinPercent">--</div>
          </div>

          <div class="macro-item">
            <div class="macro-label">炭水化物</div>
            <div class="macro-value"><span id="carbsValue">--</span> / <span id="carbsGoal">--</span></div>
            <div class="macro-bar">
              <div class="progress-fill carbs" id="carbsBar" style="width: 0%"></div>
            </div>
            <div class="macro-percentage" id="carbsPercent">--</div>
          </div>

          <div class="macro-item">
            <div class="macro-label">脂質</div>
            <div class="macro-value"><span id="fatValue">--</span> / <span id="fatGoal">--</span></div>
            <div class="macro-bar">
              <div class="progress-fill fat" id="fatBar" style="width: 0%"></div>
            </div>
            <div class="macro-percentage" id="fatPercent">--</div>
          </div>
        </div>
      </div>
  </div>

  <script src="js/data.js"></script>
  <script src="js/app.js"></script>
  <script src="js/dashboard.js"></script>
</body>
</html>
