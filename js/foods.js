let currentFilter = 'all';
let searchQuery = '';

function initFoods() {
  renderFoods();
}

function setFilter(filter) {
  currentFilter = filter;

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  const activeBtn = document.querySelector(`[data-filter="${filter}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  renderFoods();
}

function filterFoods() {
  searchQuery = document.getElementById('searchInput').value.toLowerCase();
  renderFoods();
}

function getFilteredFoods() {
  let foods = FOODS_DATA;

  if (currentFilter !== 'all') {
    foods = foods.filter(food => food.category === currentFilter);
  }

  if (searchQuery) {
    foods = foods.filter(food =>
      food.name.toLowerCase().includes(searchQuery)
    );
  }

  return foods;
}

function renderFoods() {
  const foodsGrid = document.getElementById('foodsGrid');
  const emptyState = document.getElementById('emptyState');
  const foods = getFilteredFoods();

  if (foods.length === 0) {
    foodsGrid.classList.add('hidden');
    emptyState.classList.remove('hidden');
    return;
  }

  foodsGrid.classList.remove('hidden');
  emptyState.classList.add('hidden');

  let html = '';

  foods.forEach(food => {
    const categoryClass = `category-${food.category}`;

    html += `
      <div class="food-card">
        <div class="food-card-header">
          <div>
            <div class="food-card-title">${food.name}</div>
            <div class="food-card-serving">per ${food.serving}</div>
          </div>
          <span class="food-card-category ${categoryClass}">${food.category}</span>
        </div>

        <div class="food-card-nutrients">
          <div class="nutrient-item">
            <span class="nutrient-item-label">Protein</span>
            <span class="nutrient-item-value">${food.protein}g</span>
          </div>
          <div class="nutrient-item">
            <span class="nutrient-item-label">Carbs</span>
            <span class="nutrient-item-value">${food.carbs}g</span>
          </div>
          <div class="nutrient-item">
            <span class="nutrient-item-label">Fat</span>
            <span class="nutrient-item-value">${food.fat}g</span>
          </div>
        </div>

        <div class="food-card-calories">
          <div class="calories-label">Calories</div>
          <div class="calories-value">${food.calories} kcal</div>
        </div>
      </div>
    `;
  });

  foodsGrid.innerHTML = html;
}

if (document.getElementById('foodsGrid')) {
  initFoods();
}
