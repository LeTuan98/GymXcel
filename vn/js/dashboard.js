let currentMeals = {
  breakfast: [],
  lunch: [],
  dinner: []
};

let updateAmountTimers = {};

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

    select.innerHTML = '<option value="">Chọn thực phẩm...</option>';

    FOODS_DATA.forEach(food => {
      const option = document.createElement('option');
      option.value = food.id;
      option.textContent = `${food.name} (${food.serving} ~ ${food.calories} kcal)`;
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
    const res = await fetch(`../backend/api/get_meals_by_date.php?date=${AppState.currentDate}`);
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
    const res = await fetch('../backend/api/add_meal.php', {
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
  // if (!confirm('Remove this food?')) return;

  const formData = new FormData();
  formData.append('meal_id', id);

  await fetch('../backend/api/delete_meal.php', {
    method: 'POST',
    body: formData
  });

  loadCurrentDateMeals();
}

async function updateMealAmount(meal, itemId, value) {
const input = document.querySelector(
    `.amount-input[data-id="${itemId}"]`
  );

  const amount = Number(value);
  if (isNaN(amount) || amount <= 0) return;

  const item = currentMeals[meal].find(i => i.id === itemId);
  if (!item) return;

  item.amount = amount;

  renderMeal(meal);
  updateCalorieOverview();

  // 👉 nếu dùng DB
  try {
    await fetch('../backend/api/update_meal.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        id: itemId,
        amount: amount
      })
    });
  } catch (e) {
    console.error('Update meal failed', e);
  }
  if (input) {
    input.classList.remove('saving'); // 👈 LƯU XONG
  }
}


function debounceUpdateAmount(meal, itemId, value) {
   const input = document.querySelector(
    `.amount-input[data-id="${itemId}"]`
  );

  if (input) {
    input.classList.add('saving'); // 👈 BẮT ĐẦU lưu
  }

  if (updateAmountTimers[itemId]) {
    clearTimeout(updateAmountTimers[itemId]);
  }

  updateAmountTimers[itemId] = setTimeout(() => {
    updateMealAmount(meal, itemId, value);
  }, 2000); // ⏱ 3 giây
}


/* =========================
   RENDER MEALS
========================= */
function renderMeal(meal) {
  const list = document.getElementById(`${meal}List`);
  const totalEl = document.getElementById(`${meal}Total`);
  const items = currentMeals[meal];

  if (!items || items.length === 0) {
    list.innerHTML = `<p style="text-align:center;color:#999">Không có dữ liệu</p>`;
    totalEl.textContent = '0 kcal';
    return;
  }

  let totalCalories = 0;
  let html = '';
  
  // console.log(items);
  items.forEach(item => {
    let factor = Number(item.amount) / Number(item.food.serving);
    let nutrients = {
      calories: Math.round((item.food.calories || 0) * factor),
      protein: Math.round((item.food.protein || 0) * factor),
      carbs: Math.round((item.food.carbs || 0) * factor),
      fat: Math.round((item.food.fat || 0) * factor)
    };
    totalCalories += nutrients.calories;

    html += `
      <div class="food-item">
        <div class="food-info">
          <div class="food-name">${item.food.name}</div>
          <div class="food-amount inline-amount">
            <input
              type="number"
              class="input-field amount-input"
              min="1"
              value="${item.amount}"
              oninput="debounceUpdateAmount('${meal}', ${item.id}, this.value)"
            />
            <span class="amount-unit">g</span>
          </div>
          <div class="food-nutrients">
            <div class="nutrient">
              <span class="nutrient-label">Cal:</span>
              <span class="nutrient-value">${nutrients.calories}</span>
            </div>
            <div class="nutrient">
              <span class="nutrient-label">P:</span>
              <span class="nutrient-value">${nutrients.protein}g</span>
            </div>
            <div class="nutrient">
              <span class="nutrient-label">C:</span>
              <span class="nutrient-value">${nutrients.carbs}g</span>
            </div>
            <div class="nutrient">
              <span class="nutrient-label">F:</span>
              <span class="nutrient-value">${nutrients.fat}g</span>
            </div>
          </div>
        </div>
        <button class="remove-btn" onclick="removeFood('${meal}', ${item.id})">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
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
    Math.max(0, Math.round(AppState.dailyTarget - totals.calories));

  // ===== TOTALS =====
  // document.getElementById('totalCalories').textContent = Math.round(totals.calories);
  // document.getElementById('totalProtein').textContent = totals.protein.toFixed(1);
  // document.getElementById('totalCarbs').textContent   = totals.carbs.toFixed(1);
  // document.getElementById('totalFat').textContent     = totals.fat.toFixed(1);

  document.getElementById('goalCalories').textContent = Math.round(totals.calories);
  document.getElementById('proteinValue').textContent = Math.round(totals.protein) + 'g';
  document.getElementById('carbsValue').textContent   = Math.round(totals.carbs) + 'g';
  document.getElementById('fatValue').textContent     = Math.round(totals.fat) + 'g';

  // ===== PROGRESS =====
  const progress = AppState.dailyTarget > 0
    ? Math.min(100, (totals.calories / AppState.dailyTarget) * 100)
    : 0;

  document.getElementById('progressFill').style.width = `${progress}%`;
  document.getElementById('progressPercent').textContent = `${Math.round(progress)}%`;
// 
  const progressProtein = macros.protein
    ? ((totals.protein / macros.protein) * 100)
    : 0;
  document.getElementById('proteinBar').style.width = `${Math.min(100,progressProtein)}%`;
  document.getElementById('proteinPercent').textContent = `${Math.round(progressProtein)}%`;
// 
  const progressCarbs = macros.carbs
    ? ((totals.carbs / macros.carbs) * 100)
    : 0;
  document.getElementById('carbsBar').style.width = `${Math.min(100,progressCarbs)}%`;
  document.getElementById('carbsPercent').textContent = `${Math.round(progressCarbs)}%`;
// 
  const progressFat = macros.fat
    ? ((totals.fat / macros.fat) * 100)
    : 0;
  document.getElementById('fatBar').style.width = `${Math.min(100,progressFat)}%`;
  document.getElementById('fatPercent').textContent = `${Math.round(progressFat)}%`;
}


function calculateNutrients(food, amount) {
  const factor = amount / 100;

  return {
    calories: Math.round((food.calories || 0) * factor),
    protein:  Math.round((food.protein  || 0) * factor * 10) / 10,
    carbs:    Math.round((food.carbs    || 0) * factor * 10) / 10,
    fat:      Math.round((food.fat      || 0) * factor * 10) / 10
  };
}


function calculateMealTotals(mealItems) {
  return mealItems.reduce((totals, item) => {
    const nutrients = calculateNutrients(item.food, item.amount);

    totals.calories += nutrients.calories || 0;
    totals.protein  += nutrients.protein  || 0;
    totals.carbs    += nutrients.carbs    || 0;
    totals.fat      += nutrients.fat      || 0;

    return totals;
  }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
}


/* =========================
   INIT
========================= */
if (document.getElementById('currentDate')) {
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      await loadFoods(); 
      await initProfile();          // 1️⃣ load DB
      populateFoodSelectors();      // 2️⃣ đổ vào select
      initDashboard();              // 3️⃣ render meal
    } catch (e) {
      console.error(e);
      alert('Không thể tải danh sách thực phẩm');
    }
  });
}

