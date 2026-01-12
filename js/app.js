const AppState = {
  currentDate: new Date().toISOString().split('T')[0],
  profile: null,
  goal: null,
  dailyTarget: 2000,
  macros: null
};

function saveProfile(profile) {
  try {
    localStorage.setItem('gymexcel_profile', JSON.stringify(profile));
    AppState.profile = profile;
  } catch (error) {
    console.error('Error saving profile:', error);
  }
}

function loadProfile() {
  try {
    const stored = localStorage.getItem('gymexcel_profile');
    if (stored) {
      AppState.profile = JSON.parse(stored);
      return AppState.profile;
    }
  } catch (error) {
    console.error('Error loading profile:', error);
  }
  return null;
}

function saveGoal(goal, dailyTarget, macros) {
  try {
    const goalData = { goal, dailyTarget, macros };
    localStorage.setItem('gymexcel_goal', JSON.stringify(goalData));
    AppState.goal = goal;
    AppState.dailyTarget = dailyTarget;
    AppState.macros = macros;
  } catch (error) {
    console.error('Error saving goal:', error);
  }
}

function loadGoal() {
  try {
    const stored = localStorage.getItem('gymexcel_goal');
    if (stored) {
      const goalData = JSON.parse(stored);
      AppState.goal = goalData.goal;
      AppState.dailyTarget = goalData.dailyTarget;
      AppState.macros = goalData.macros;
      return goalData;
    }
  } catch (error) {
    console.error('Error loading goal:', error);
  }
  return null;
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


function formatDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dateOnly = date.toISOString().split('T')[0];
  const todayOnly = today.toISOString().split('T')[0];
  const yesterdayOnly = yesterday.toISOString().split('T')[0];
  const tomorrowOnly = tomorrow.toISOString().split('T')[0];

  if (dateOnly === todayOnly) {
    return 'Today';
  } else if (dateOnly === yesterdayOnly) {
    return 'Yesterday';
  } else if (dateOnly === tomorrowOnly) {
    return 'Tomorrow';
  }

  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

loadGoal();
