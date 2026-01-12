let currentMeals = {
  breakfast: [],
  lunch: [],
  dinner: []
};

async function initDashboard() {
  updateDateDisplay();
  await loadCurrentDateMeals();

  document.getElementById('prevDay').addEventListener('click', () => changeDate(-1));
  document.getElementById('nextDay').addEventListener('click', () => changeDate(1));
}

function changeDate(days) {
  const currentDate = new Date(AppState.currentDate);
  currentDate.setDate(currentDate.getDate() + days);
  AppState.currentDate = currentDate.toISOString().split('T')[0];

  updateDateDisplay();
  loadCurrentDateMeals();
}

function populateFoodSelectors() {
  const meals = ['breakfast', 'lunch', 'dinner'];

  meals.forEach(meal => {
    const select = document.getElementById(`${meal}Food`);
    if (!select) return;

    select.innerHTML = '<option value="">Select food...</option>';

    FOODS_DATA.forEach(food => {
      const option = document.createElement('option');
      option.value = food.id;
      option.textContent = `${food.name} (${food.calories} kcal)`;
      select.appendChild(option);
    });
  });
}

function updateDateDisplay() {
  document.getElementById('currentDate').textContent = formatDate(AppState.currentDate);
}

/* =========================
   LOAD MEALS FROM DATABASE
========================= */
async function loadCurrentDateMeals() {
  try {
    const res = await fetch(`./backend/api/get_meals_by_date.php?date=${AppState.currentDate}`);
    const json = await res.json();
    // console.log(json);

    if (!json.success) {
      alert('Failed to load meals');
      return;
    }

    currentMeals = json.data;
    renderAllMeals();
    updateCalorieOverview();
  } catch (err) {
    console.error(err);
  }
}

/* =========================
   ADD MEAL → DATABASE
========================= */
async function addFood(meal) {
  const foodSelect = document.getElementById(`${meal}Food`);
  const amountInput = document.getElementById(`${meal}Amount`);

  const foodId = foodSelect.value;
  const amount = amountInput.value;

  if (!foodId || amount <= 0) {
    alert('Please select food & amount');
    return;
  }

  const formData = new FormData();
  formData.append('food_id', foodId);
  formData.append('meal_type', meal);
  formData.append('amount', amount);
  formData.append('meal_date', AppState.currentDate);

  try {
    const res = await fetch('./backend/api/add_meal.php', {
      method: 'POST',
      body: formData
    });

    const result = await res.json();

    if (!result.success) {
      alert(result.message);
      return;
    }

    foodSelect.value = '';
    amountInput.value = 100;

    await loadCurrentDateMeals();

  } catch (err) {
    console.error(err);
    alert('Failed to add meal');
  }
}


async function removeFood(meal, id) {
  if (!confirm('Remove this food?')) return;

  const formData = new FormData();
  formData.append('id', id);

  await fetch('./backend/api/delete_meal.php', {
    method: 'POST',
    body: formData
  });

  loadCurrentDateMeals();
}

/* =========================
   RENDER MEALS
========================= */
function renderMeal(meal) {
  const list = document.getElementById(`${meal}List`);
  const totalEl = document.getElementById(`${meal}Total`);
  const items = currentMeals[meal];

  if (!items || items.length === 0) {
    list.innerHTML = `<p style="text-align:center;color:#999">No items</p>`;
    totalEl.textContent = '0 kcal';
    return;
  }

  let totalCalories = 0;
  let html = '';
  
  console.log(items);
  items.forEach(item => {
    let factor = Number(item.amount) / Number(item.food.serving);
    let nutrients = {
      calories: Math.round((item.food.calories || 0) * factor),
      protein: ((item.food.protein || 0) * factor),
      carbs: ((item.food.carbs || 0) * factor),
      fat: ((item.food.fat || 0) * factor)
    };
    totalCalories += nutrients.calories;

    html += `
      <div class="food-item">
        <div class="food-info">
          <div class="food-name">${item.food.name}</div>
          <div class="food-amount">${item.amount}g</div>
          <div class="food-nutrients">
            <span>Cal: ${nutrients.calories}</span>
            <span>P: ${nutrients.protein.toFixed(1)}g</span>
            <span>C: ${nutrients.carbs.toFixed(1)}g</span>
            <span>F: ${nutrients.fat.toFixed(1)}g</span>
          </div>
        </div>
      </div>
    `;
  });

  list.innerHTML = html;
  totalEl.textContent = `${Math.round(totalCalories)} kcal`;
}

function renderAllMeals() {
  renderMeal('breakfast');
  renderMeal('lunch');
  renderMeal('dinner');
}

/* =========================
   CALORIE OVERVIEW
========================= */

function updateCalorieOverview() {
  const allMeals = [
    ...currentMeals.breakfast,
    ...currentMeals.lunch,
    ...currentMeals.dinner
  ];

  const totals = allMeals.reduce(
    (acc, item) => {
      const amount = Number(item.amount) || 0;
      const food = item.food || {};

      const calories = Number(food.calories) || 0;
      const protein  = Number(food.protein) || 0;
      const carbs    = Number(food.carbs) || 0;
      const fat      = Number(food.fat) || 0;

      const factor = amount / 100;

      acc.calories += calories * factor;
      acc.protein  += protein * factor;
      acc.carbs    += carbs * factor;
      acc.fat      += fat * factor;

      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  // ===== OVERVIEW =====
  document.getElementById('consumedCalories').textContent = Math.round(totals.calories);
  document.getElementById('remainingCalories').textContent =
    Math.max(0, AppState.dailyTarget - totals.calories);

  // ===== TOTALS =====
  document.getElementById('totalCalories').textContent = Math.round(totals.calories);
  document.getElementById('totalProtein').textContent = totals.protein.toFixed(1);
  document.getElementById('totalCarbs').textContent   = totals.carbs.toFixed(1);
  document.getElementById('totalFat').textContent     = totals.fat.toFixed(1);

  // ===== PROGRESS =====
  const progress = AppState.dailyTarget > 0
    ? Math.min(100, (totals.calories / AppState.dailyTarget) * 100)
    : 0;

  document.getElementById('progressFill').style.width = `${progress}%`;
  document.getElementById('progressPercent').textContent = `${Math.round(progress)}%`;
}



/* =========================
   INIT
========================= */
if (document.getElementById('currentDate')) {
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      await loadFoods();            // 1️⃣ load DB
      populateFoodSelectors();      // 2️⃣ đổ vào select
      initDashboard();              // 3️⃣ render meal
    } catch (e) {
      console.error(e);
      alert('Không thể tải danh sách thực phẩm');
    }
  });
}

