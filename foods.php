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
  <title>GymExcel - Foods</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/global.css">
  <link rel="stylesheet" href="css/foods.css">
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
        <a href="profile.php" class="nav-link">MySelf</a>
        <a href="foods.php" class="nav-link active">Foods</a>
        <a href="./backend/auth/logout.php" class="nav-link">Logout</a>
      </nav>
    </div>
  </header>

  <div class="container">
    <div class="card mb-3">
      <h1 style="font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem;">Food Database / 食品データベース</h1>
      <p style="color: var(--text-secondary);">Browse and search through our nutrition database / 栄養データベースを閲覧・検索できます</p>
    </div>

    <div class="filters-section">
      <input
        type="text"
        class="search-input"
        id="searchInput"
        placeholder="Search foods..."
        onkeyup="filterFoods()"
      >
      <div class="filter-buttons">
        <button class="filter-btn active" data-filter="all" onclick="setFilter('all')">All</button>
        <button class="filter-btn" data-filter="protein" onclick="setFilter('protein')">Protein</button>
        <button class="filter-btn" data-filter="carbs" onclick="setFilter('carbs')">Carbs</button>
        <button class="filter-btn" data-filter="fat" onclick="setFilter('fat')">Fat</button>
        <button class="btn btn-primary" onclick="openAddFood()">+ Add Food</button>
      </div>
    </div>

    <div class="foods-grid" id="foodsGrid">
    </div>

    <div class="empty-state hidden" id="emptyState">
      <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
      <div class="empty-state-title">No foods found / 該当する食品が見つかりません</div>
      <div class="empty-state-description">Try adjusting your search or filters / 検索条件やフィルターを調整してみてください</div>
    </div>
  </div>

  <div class="modal hidden" id="addFoodModal">
    <div class="modal-content">
      <h2>Add Food</h2>
      <form id="addFoodForm">
        <label>Food name</label>
        <input type="text" id="foodName" placeholder="Chicken breast" required>

        <label>Category</label>
        <select id="foodCategory" required>
          <option value="">Select category</option>
          <option value="protein">Protein</option>
          <option value="carbs">Carbs</option>
          <option value="fat">Fat</option>
        </select>

        <label>Serving size (g)</label>
        <input
          type="text"
          id="foodServing"
          placeholder="100g"
          value="100"
        >

        <label>Calories (per serving)</label>
        <input type="number" id="foodCalories" placeholder="Calories" min = 1 required>

        <label>Protein (g)</label>
        <input type="number" id="foodProtein" min = 0 required>

        <label>Carbs (g)</label>
        <input type="number" id="foodCarbs" min = 0 required>

        <label>Fat (g)</label>
        <input type="number" id="foodFat" min = 0 required>

        <div class="modal-actions">
          <button class="btn-cancel" type="button" onclick="closeAddFood()">Cancel</button>
          <button class="btn-primary btn-lg" id ="save_form" type="submit" >Add</button>
        </div>
      </form>
    </div>
  </div>

  <script src="./js/data.js"></script>
  <!-- <script src="./js/app.js"></script> -->
  <script src="./js/foods.js"></script>
</body>
</html>
