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
  <title>GymExcel - Profile & Goals</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/global.css">
  <link rel="stylesheet" href="css/profile.css">
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
        <a href="index.php" class="nav-link">Dashboard</a>
        <a href="profile.php" class="nav-link active">Profile & Goals</a>
        <a href="foods.php" class="nav-link">Foods</a>
        <a href="./backend/auth/logout.php" class="nav-link">Logout</a>
      </nav>
    </div>
  </header>

  <div class="container">
    <div class="profile-container">
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Personal Information</h2>
          <p class="card-subtitle">Enter your details to calculate your metrics</p>
        </div>

        <div class="input-group">
          <label class="input-label">Height (cm)</label>
          <input type="number" class="input-field" id="height" placeholder="170" min="100" max="250">
        </div>

        <div class="input-group">
          <label class="input-label">Weight (kg)</label>
          <input type="number" class="input-field" id="weight" placeholder="70" min="30" max="300">
        </div>

        <div class="input-group">
          <label class="input-label">Age (years)</label>
          <input type="number" class="input-field" id="age" placeholder="25" min="15" max="100">
        </div>

        <div class="input-group">
          <label class="input-label">Gender</label>
          <select class="select-field" id="gender">
            <option value="">Select gender...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div class="input-group">
          <label class="input-label">Activity Level</label>
          <select class="select-field" id="activityLevel">
            <option value="">Select activity level...</option>
            <option value="1.2">Sedentary (little or no exercise)</option>
            <option value="1.375">Lightly active (1-3 days/week)</option>
            <option value="1.55">Moderately active (3-5 days/week)</option>
            <option value="1.725">Very active (6-7 days/week)</option>
            <option value="1.9">Extra active (athlete)</option>
          </select>
        </div>

        <button class="btn btn-primary" onclick="calculateMetrics()" style="width: 100%;">
          Calculate Metrics
        </button>
      </div>

      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Your Health Metrics</h2>
          <p class="card-subtitle">Calculated based on your information</p>
        </div>

        <div class="stats-grid">
          <div class="stat-result">
            <div class="stat-result-label">BMI</div>
            <div class="stat-result-value" id="bmiValue">--</div>
            <div class="stat-result-description" id="bmiCategory">Not calculated</div>
          </div>

          <div class="stat-result">
            <div class="stat-result-label">BMR</div>
            <div class="stat-result-value" id="bmrValue">--</div>
            <div class="stat-result-description">kcal/day</div>
          </div>

          <div class="stat-result">
            <div class="stat-result-label">TDEE</div>
            <div class="stat-result-value" id="tdeeValue">--</div>
            <div class="stat-result-description">kcal/day</div>
          </div>

          <div class="stat-result">
            <div class="stat-result-label">Body Fat</div>
            <div class="stat-result-value" id="bfpValue">--</div>
            <div class="stat-result-description">Estimated %</div>
          </div>
        </div>
      </div>

      <div class="card goals-section">
        <div class="card-header">
          <h2 class="card-title">Select Your Goal</h2>
          <p class="card-subtitle">Choose one goal to customize your nutrition plan</p>
        </div>

        <div class="goals-grid">
          <div class="goal-card" data-goal="muscle-gain" onclick="selectGoal('muscle-gain')">
            <svg class="goal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14.5 2H9.5L4 7.5V16.5L9.5 22H14.5L20 16.5V7.5L14.5 2Z" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 8v8M8 12h8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div class="goal-title">Muscle Gain</div>
            <div class="goal-description">Build lean muscle mass with a caloric surplus</div>
          </div>

          <div class="goal-card" data-goal="fat-loss" onclick="selectGoal('fat-loss')">
            <svg class="goal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9.17 14.83l5.66-5.66M14.83 14.83L9.17 9.17" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div class="goal-title">Fat Loss</div>
            <div class="goal-description">Reduce body fat while preserving muscle mass</div>
          </div>

          <div class="goal-card" data-goal="weight-gain" onclick="selectGoal('weight-gain')">
            <svg class="goal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M5 12h14" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div class="goal-title">Weight Gain</div>
            <div class="goal-description">Increase overall body weight with caloric surplus</div>
          </div>

          <div class="goal-card" data-goal="weight-loss" onclick="selectGoal('weight-loss')">
            <svg class="goal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div class="goal-title">Weight Loss</div>
            <div class="goal-description">Decrease body weight with caloric deficit</div>
          </div>
        </div>
      </div>

      <div class="card macros-card" id="macrosCard" style="display: none;">
        <div class="card-header" style="border-color: rgba(255, 255, 255, 0.2);">
          <h2 class="card-title" style="color: white;">Your Daily Macros</h2>
          <p class="card-subtitle" style="color: rgba(255, 255, 255, 0.85);">Recommended macro distribution for <span id="selectedGoalText">your goal</span></p>
        </div>

        <div class="macros-grid">
          <div class="macro-item">
            <div class="macro-label">Daily Calories</div>
            <div class="macro-value" id="goalCalories">--</div>
            <div class="macro-percentage">kcal/day</div>
          </div>

          <div class="macro-item">
            <div class="macro-label">Protein</div>
            <div class="macro-value" id="proteinValue">--</div>
            <div class="macro-bar">
              <div class="macro-bar-fill protein" id="proteinBar" style="width: 0%"></div>
            </div>
            <div class="macro-percentage" id="proteinPercent">--</div>
          </div>

          <div class="macro-item">
            <div class="macro-label">Carbs</div>
            <div class="macro-value" id="carbsValue">--</div>
            <div class="macro-bar">
              <div class="macro-bar-fill carbs" id="carbsBar" style="width: 0%"></div>
            </div>
            <div class="macro-percentage" id="carbsPercent">--</div>
          </div>

          <div class="macro-item">
            <div class="macro-label">Fat</div>
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

  <script src="js/data.js"></script>
  <script src="js/app.js"></script>
  <script src="js/profile.js"></script>
</body>
</html>
