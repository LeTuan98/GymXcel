<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GymExcel - Hồ sơ & Mục tiêu</title>
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
        <a href="index.php" class="nav-link">Bảng điều khiển</a>
        <a href="profile.php" class="nav-link active">Cá nhân</a>
        <a href="foods.php" class="nav-link">Thực phẩm</a>
        <a href="../backend/auth/logout.php" class="nav-link">Đăng xuất</a>
      </nav>
    </div>
  </header>

  <div class="container">
    <div class="profile-container">
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Thông tin cá nhân</h2>
          <p class="card-subtitle">Nhập thông tin để tính toán chỉ số cơ thể</p>
        </div>

        <div class="input-group">
          <label class="input-label">Chiều cao (cm)</label>
          <input type="number" class="input-field" id="height" placeholder="170" min="100" max="250">
        </div>

        <div class="input-group">
          <label class="input-label">Cân nặng (kg)</label>
          <input type="number" class="input-field" id="weight" placeholder="70" min="30" max="300">
        </div>

        <div class="input-group">
          <label class="input-label">Tuổi</label>
          <input type="number" class="input-field" id="age" placeholder="25" min="15" max="100">
        </div>

        <div class="input-group">
          <label class="input-label">Vòng cổ (cm)</label>
          <input type="number" class="input-field" id="neck" placeholder="38" min="15" max="300">
        </div>

        <div class="input-group">
          <label class="input-label">Vòng eo (cm)</label>
          <input type="number" class="input-field" id="waist" placeholder="82" min="15" max="500">
        </div>
  
        <div class="input-group">
          <label class="input-label">Giới tính</label>
          <select class="select-field" id="gender">
            <option value="">Chọn giới tính...</option>
            <option value="M">Nam</option>
            <option value="F">Nữ</option>
          </select>
        </div>

        <div class="input-group" id="hipGroup">
          <label class="input-label">Vòng hông (cm)</label>
          <input type="number" class="input-field" id="hip" placeholder="95" min="15" max="500">
        </div>
        
        <div class="input-group">
          <label class="input-label">Mức độ vận động</label>
          <select class="select-field" id="activityLevel">
            <option value="">Chọn mức độ vận động...</option>
            <option value="1.2">Ít vận động (hầu như không tập)</option>
            <option value="1.375">Vận động nhẹ (1–3 buổi/tuần)</option>
            <option value="1.55">Vận động vừa (3–5 buổi/tuần)</option>
            <option value="1.725">Vận động nhiều (6–7 buổi/tuần)</option>
            <option value="1.9">Rất nhiều (vận động viên)</option>
          </select>
        </div>

        <button class="btn btn-primary" onclick="saveProfile()" style="width: 100%;">
          Lưu thông tin cơ thể
        </button>
      </div>

      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Chỉ số sức khỏe</h2>
          <p class="card-subtitle">Được tính toán dựa trên thông tin của bạn</p>
        </div>

        <div class="stats-grid">
          <div class="stat-result">
            <div class="stat-result-label">BMI</div>
            <div class="stat-result-value" id="bmiValue">--</div>
            <div class="stat-result-description" id="bmiCategory">Chưa tính</div>
          </div>

          <div class="stat-result">
            <div class="stat-result-label">BMR</div>
            <div class="stat-result-value" id="bmrValue">--</div>
            <div class="stat-result-description">kcal/ngày</div>
          </div>

          <div class="stat-result">
            <div class="stat-result-label">TDEE</div>
            <div class="stat-result-value" id="tdeeValue">--</div>
            <div class="stat-result-description">kcal/ngày</div>
          </div>

          <div class="stat-result">
            <div class="stat-result-label">Mỡ cơ thể</div>
            <div class="stat-result-value" id="bfpValue">--</div>
            <div class="stat-result-description">Ước tính %</div>
          </div>
        </div>
      </div>

      <div class="card goals-section">
        <div class="card-header">
          <h2 class="card-title">Chọn mục tiêu</h2>
          <p class="card-subtitle">Chọn một mục tiêu để cá nhân hóa chế độ dinh dưỡng</p>
        </div>

        <div class="goals-grid">
          <div class="goal-card" data-goal="muscle-gain" onclick="selectGoal('muscle-gain')">
            <div class="goal-title">Tăng cơ</div>
            <div class="goal-description">Phát triển cơ nạc với lượng calo dư</div>
          </div>

          <div class="goal-card" data-goal="fat-loss" onclick="selectGoal('fat-loss')">
            <div class="goal-title">Giảm mỡ</div>
            <div class="goal-description">Giảm mỡ nhưng vẫn giữ cơ</div>
          </div>

          <div class="goal-card" data-goal="weight-gain" onclick="selectGoal('weight-gain')">
            <div class="goal-title">Tăng cân</div>
            <div class="goal-description">Tăng trọng lượng cơ thể với lượng calo dư</div>
          </div>

          <div class="goal-card" data-goal="weight-loss" onclick="selectGoal('weight-loss')">
            <div class="goal-title">Giảm cân</div>
            <div class="goal-description">Giảm trọng lượng với lượng calo thiếu</div>
          </div>
        </div>
      </div>

      <div class="card macros-card" id="macrosCard" style="display: none;">
        <div class="card-header" style="border-color: rgba(255, 255, 255, 0.2);">
          <h2 class="card-title" style="color: white;">Macros mỗi ngày</h2>
          <p class="card-subtitle" style="color: rgba(255, 255, 255, 0.85);">
            Phân bổ dinh dưỡng đề xuất cho mục tiêu: <span id="selectedGoalText">mục tiêu của bạn</span>
          </p>
        </div>

        <div class="macros-grid">
          <div class="macro-item">
            <div class="macro-label">Calo mỗi ngày</div>
            <div class="macro-value" id="goalCalories">--</div>
            <div class="macro-percentage">kcal/ngày</div>
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
            <div class="macro-label">Tinh bột</div>
            <div class="macro-value" id="carbsValue">--</div>
            <div class="macro-bar">
              <div class="macro-bar-fill carbs" id="carbsBar" style="width: 0%"></div>
            </div>
            <div class="macro-percentage" id="carbsPercent">--</div>
          </div>

          <div class="macro-item">
            <div class="macro-label">Chất béo</div>
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
