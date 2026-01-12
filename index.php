<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GymExcel - Dashboard</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/global.css">
  <link rel="stylesheet" href="css/dashboard.css">
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
        <a href="index.php" class="nav-link active">Dashboard</a>
        <a href="profile.php" class="nav-link">Profile & Goals</a>
        <a href="foods.php" class="nav-link">Foods</a>
        <a href="./backend/auth/logout.php" class="nav-link">Logout</a>
      </nav>
    </div>
  </header>

  <div class="container">
    <div class="date-navigation">
      <button class="date-nav-btn" id="prevDay" aria-label="Previous day">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="current-date" id="currentDate">Today</div>
      <button class="date-nav-btn" id="nextDay" aria-label="Next day">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <div class="calorie-overview">
      <div class="overview-card target">
        <div class="overview-label">Daily Target</div>
        <div class="overview-value" id="targetCalories">2000</div>
        <div class="overview-subtitle">kcal</div>
      </div>
      <div class="overview-card consumed">
        <div class="overview-label">Consumed</div>
        <div class="overview-value" id="consumedCalories">0</div>
        <div class="overview-subtitle">kcal</div>
      </div>
      <div class="overview-card remaining">
        <div class="overview-label">Remaining</div>
        <div class="overview-value" id="remainingCalories">2000</div>
        <div class="overview-subtitle">kcal</div>
      </div>
    </div>

    <div class="card mb-3">
      <div class="progress-section">
        <div class="progress-info">
          <span>Daily Progress</span>
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
            Breakfast
          </div>
          <div class="meal-total">Total: <span id="breakfastTotal">0 kcal</span></div>
        </div>
        <div class="food-selector">
          <select class="select-field" id="breakfastFood">
            <option value="">Select food...</option>
          </select>
          <input type="number" class="input-field" id="breakfastAmount" placeholder="Amount (g)" min="1" value="100">
          <button class="btn btn-primary" onclick="addFood('breakfast')">Add</button>
        </div>
        <div id="breakfastList"></div>
      </div>

      <div class="meal-card">
        <div class="meal-header">
          <div class="meal-title">
            <svg class="meal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2" stroke-linecap="round"/>
            </svg>
            Lunch
          </div>
          <div class="meal-total">Total: <span id="lunchTotal">0 kcal</span></div>
        </div>
        <div class="food-selector">
          <select class="select-field" id="lunchFood">
            <option value="">Select food...</option>
          </select>
          <input type="number" class="input-field" id="lunchAmount" placeholder="Amount (g)" min="1" value="100">
          <button class="btn btn-primary" onclick="addFood('lunch')">Add</button>
        </div>
        <div id="lunchList"></div>
      </div>

      <div class="meal-card">
        <div class="meal-header">
          <div class="meal-title">
            <svg class="meal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M2 12h20M2 7h20M2 17h20" stroke-linecap="round"/>
            </svg>
            Dinner
          </div>
          <div class="meal-total">Total: <span id="dinnerTotal">0 kcal</span></div>
        </div>
        <div class="food-selector">
          <select class="select-field" id="dinnerFood">
            <option value="">Select food...</option>
          </select>
          <input type="number" class="input-field" id="dinnerAmount" placeholder="Amount (g)" min="1" value="100">
          <button class="btn btn-primary" onclick="addFood('dinner')">Add</button>
        </div>
        <div id="dinnerList"></div>
      </div>
    </div>

    <div class="totals-card">
      <h2 class="card-title mb-3" style="color: white;">Daily Totals</h2>
      <div class="totals-grid">
        <div class="total-item">
          <div class="total-label">Calories</div>
          <div class="total-value" id="totalCalories">0<span class="total-unit">kcal</span></div>
        </div>
        <div class="total-item">
          <div class="total-label">Protein</div>
          <div class="total-value" id="totalProtein">0<span class="total-unit">g</span></div>
        </div>
        <div class="total-item">
          <div class="total-label">Carbs</div>
          <div class="total-value" id="totalCarbs">0<span class="total-unit">g</span></div>
        </div>
        <div class="total-item">
          <div class="total-label">Fat</div>
          <div class="total-value" id="totalFat">0<span class="total-unit">g</span></div>
        </div>
      </div>
    </div>
  </div>

  <script src="js/data.js"></script>
  <script src="js/app.js"></script>
  <script src="js/dashboard.js"></script>
</body>
</html>
