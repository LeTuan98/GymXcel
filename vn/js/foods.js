let currentFilter = 'all';
let searchQuery = '';
let editingFoodId = null;

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
  let foods = FOODS_DATA.filter(Boolean);

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
            <div class="food-card-serving">mỗi ${food.serving}g</div>
          </div>
          <div class="food-card-actions">
            <span class="food-card-category ${categoryClass}">
              ${food.category}
            </span>

            <button
              class="icon-btn edit"
              title="Edit"
              onclick="openEditFood(${food.id})"
            >✏️</button>

            <button
              class="icon-btn delete"
              title="Delete"
              onclick="deleteFood(${food.id})"
            >🗑</button>
          </div>
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

// open add food
function openAddFood() {
  document.getElementById('addFoodModal').classList.remove('hidden');
}

function closeAddFood() {
  document.getElementById('addFoodModal').classList.add('hidden');
  document.querySelector('#addFoodModal h2').textContent = 'Add Food';
  document.getElementById('save_form').textContent = 'Add';
  document.getElementById('foodName').value = null;
  document.getElementById('foodCategory').value = "";
  document.getElementById('foodServing').value = 100;
  document.getElementById('foodCalories').value = null;
  document.getElementById('foodProtein').value = null;
  document.getElementById('foodCarbs').value = null;
  document.getElementById('foodFat').value = null;
  editingFoodId = null;
}

function addFood() {
  const data = {
    name: document.getElementById('foodName').value.trim(),
    category: document.getElementById('foodCategory').value,
    serving: document.getElementById('foodServing').value || '100g',
    calories: Number(document.getElementById('foodCalories').value),
    protein: Number(document.getElementById('foodProtein').value),
    carbs: Number(document.getElementById('foodCarbs').value),
    fat: Number(document.getElementById('foodFat').value)
  };

  fetch('../backend/api/add_food.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res => {
    if (res.success && res.data) {
      FOODS_DATA.unshift(res.data);
      renderFoods();
      closeAddFood();
    }
  })
  .catch(err => {
    console.error(err);
    alert('Failed to add food');
  });
}



async function deleteFood(id) {
  // if (!confirm('Delete this food?')) return;

  await fetch('../backend/api/delete_food.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `id=${id}`
  });
  // console.log(FOODS_DATA);
  FOODS_DATA = FOODS_DATA.filter(f => f.id !== id);
  // console.log(FOODS_DATA);
  renderFoods();
}

function openEditFood(id) {
  const food = FOODS_DATA.find(f => f.id == id);
  if (!food) return;

  editingFoodId = id;

  document.getElementById('foodName').value = food.name;
  document.getElementById('foodCategory').value = food.category;
  document.getElementById('foodServing').value = food.serving;
  document.getElementById('foodCalories').value = food.calories;
  document.getElementById('foodProtein').value = food.protein;
  document.getElementById('foodCarbs').value = food.carbs;
  document.getElementById('foodFat').value = food.fat;

  document.querySelector('#addFoodModal h2').textContent = 'Edit Food';
  document.getElementById('save_form').textContent = 'Update';

  openAddFood();
}

function updateFood() {
  const data = {
    id: editingFoodId,
    name: foodName.value.trim(),
    category: foodCategory.value,
    serving: foodServing.value,
    calories: Number(foodCalories.value),
    protein: Number(foodProtein.value),
    carbs: Number(foodCarbs.value),
    fat: Number(foodFat.value)
  };

  if (!editingFoodId) return;

  fetch('../backend/api/update_food.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        const index = FOODS_DATA.findIndex(f => f.id === editingFoodId);
        FOODS_DATA[index] = res.data;
        renderFoods();
        closeAddFood();
      }
    });
}


if (document.getElementById('foodsGrid')) {
  document.addEventListener('DOMContentLoaded', async () => {
    await loadFoods();   // ⬅️ đợi DB
    initFoods();         // ⬅️ lúc này FOODS_DATA mới có
  });
}

document.getElementById('addFoodForm')
  .addEventListener('submit', function (e) {
    e.preventDefault(); // ⛔ chặn reload
    if (editingFoodId) {
      updateFood();
    } else {
      addFood();
    }
  });

  