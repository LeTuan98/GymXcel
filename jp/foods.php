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
  <title>GymExcel - 食品</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/global.css">
  <link rel="stylesheet" href="../css/foods.css">
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
        <a href="profile.php" class="nav-link">マイページ</a>
        <a href="foods.php" class="nav-link active">食品</a>
        <a href="../backend/auth/logout.php" class="nav-link">ログアウト</a>
      </nav>
    </div>
  </header>

  <div class="container">
    <div class="card mb-3">
      <h1 style="font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem;">食品データベース</h1>
      <p style="color: var(--text-secondary);">栄養データベースを検索・閲覧できます</p>
    </div>

    <div class="filters-section">
      <input
        type="text"
        class="search-input"
        id="searchInput"
        placeholder="食品を検索..."
        onkeyup="filterFoods()"
      >
      <div class="filter-buttons">
        <button class="filter-btn active" data-filter="all" onclick="setFilter('all')">すべて</button>
        <button class="filter-btn" data-filter="protein" onclick="setFilter('protein')">タンパク質</button>
        <button class="filter-btn" data-filter="carbs" onclick="setFilter('carbs')">炭水化物</button>
        <button class="filter-btn" data-filter="fat" onclick="setFilter('fat')">脂質</button>
        <button class="btn btn-primary" onclick="openAddFood()">＋ 食品を追加</button>
      </div>
    </div>

    <div class="foods-grid" id="foodsGrid">
    </div>

    <div class="empty-state hidden" id="emptyState">
      <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
      <div class="empty-state-title">食品が見つかりません</div>
      <div class="empty-state-description">検索条件やフィルターを変更してみてください</div>
    </div>
  </div>

  <div class="modal hidden" id="addFoodModal">
    <div class="modal-content">
      <h2>食品を追加</h2>
      <form id="addFoodForm">
        <label>食品名</label>
        <input type="text" id="foodName" placeholder="鶏むね肉" required>

        <label>カテゴリー</label>
        <select id="foodCategory" required>
          <option value="">カテゴリーを選択</option>
          <option value="protein">タンパク質</option>
          <option value="carbs">炭水化物</option>
          <option value="fat">脂質</option>
        </select>

        <label>1食分の量 (g)</label>
        <input
          type="text"
          id="foodServing"
          placeholder="100g"
          value="100"
        >

        <label>カロリー（1食分）</label>
        <input type="number" id="foodCalories" placeholder="カロリー" min="1" required>

        <label>タンパク質 (g)</label>
        <input type="number" id="foodProtein" min="0" required>
       
        <label>脂質 (g)</label>
        <input type="number" id="foodFat" min="0" required>
        
        <label>炭水化物 (g)</label>
        <input type="number" id="foodCarbs" min="0" required>

        <div class="modal-actions">
          <button class="btn-cancel" type="button" onclick="closeAddFood()">キャンセル</button>
          <button class="btn-primary btn-lg" id="save_form" type="submit">追加</button>
        </div>
      </form>
    </div>
  </div>

  <script src="./js/data.js"></script>
  <!-- <script src="./js/app.js"></script> -->
  <script src="./js/foods.js"></script>
</body>
</html>
