const AppState = {
  currentDate: new Date().toISOString().split('T')[0],
  goal: null,
  dailyTarget: 2000,
};

const macros = {
  protein: null,
  carbs: null,
  fat: null
};

let ProfileData = {
  height: null,
  weight: null,
  age: null,
  gender: null,
  activityLevel: null,

  neck: null,
  waist: null,
  hip: null,

  goal: null
};

let Metrics = {
  bmi: null,
  bmr: null,
  tdee: null,
  bdf: null
};

const activityMap = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9
};

async function initProfile() {
  try {
    const res = await fetch('./backend/api/get_profile.php');
    const data = await res.json();
    if (!data) return;
    
    // Fill form
    ProfileData.height = data.height ?? null;
    ProfileData.weight = data.weight ?? null;
    ProfileData.age = data.age ?? null;

    if (data.gender) {
      ProfileData.gender = data.gender === 'M' ? 'M' : 'F';
    } else {
      ProfileData.gender = null;
    }

    ProfileData.activityLevel =
      activityMap?.[data.activity_level] ?? null;

    ProfileData.neck = data.neck ?? null;
    ProfileData.waist = data.waist ?? null;
    ProfileData.hip = data.hip ?? null;
    ProfileData.goal = data.goal ?? null;

    calculateMetrics();
    if (ProfileData.goal) {
      calculateGoal(ProfileData.goal);
    }else {
      if (!Metrics || typeof Metrics.tdee !== 'number') {
        console.warn('Metrics.tdee is null, skip calculateGoal');
      }else{
        AppState.dailyTarget = Math.round(Metrics.tdee);
      }
    }
    
    document.getElementById('targetCalories').textContent = AppState.dailyTarget;
    if (macros.protein){
      document.getElementById('proteinGoal').textContent = macros.protein + "g";
      document.getElementById('carbsGoal').textContent = macros.carbs + "g";
      document.getElementById('fatGoal').textContent = macros.fat + "g";
    };

  } catch (e) {
    console.error('Init profile error', e);
  }
}

function calculateMetrics() {
  const data = ProfileData;
  // ===== BMI =====
  if (data.height && data.weight) {
    Metrics.bmi = data.weight / ((data.height / 100) ** 2);
  } else {
    Metrics.bmi = null;
  }

  // ===== BMR =====
  if (data.height && data.weight && data.age && data.gender) {
    if (data.gender === 'M') {
      Metrics.bmr =
        10 * data.weight +
        6.25 * data.height -
        5 * data.age +
        5;
    } else {
      Metrics.bmr =
        10 * data.weight +
        6.25 * data.height -
        5 * data.age -
        161;
    }
  } else {
    Metrics.bmr = null;
  }

  // ===== TDEE =====
  if (Metrics.bmr && data.activityLevel) {
    Metrics.tdee = Metrics.bmr * data.activityLevel;
  } else {
    Metrics.tdee = null;
  }

  // ===== BFP (Body Fat %) =====
  if (
    data.gender &&
    data.height &&
    data.neck &&
    data.waist &&
    (data.gender === 'M' || data.hip)
  ) {
    if (data.gender === 'M') {
      Metrics.bfp =
        495 / (
          1.0324 -
          0.19077 * Math.log10(data.waist - data.neck) +
          0.15456 * Math.log10(data.height)
        ) - 450;
    } else {
      Metrics.bfp =
        495 / (
          1.29579 -
          0.35004 * Math.log10(data.waist + data.hip - data.neck) +
          0.221 * Math.log10(data.height)
        ) - 450;
    }
  } else {
    Metrics.bfp = null;
  }
}

function calculateGoal(goal) {
  if (!Metrics || typeof Metrics.tdee !== 'number') {
    console.warn('Metrics.tdee is null, skip calculateGoal');
    return null;
  }

  let dailyTarget;
  let proteinPercent, carbsPercent, fatPercent;

  switch (goal) {
    case 'muscle-gain':
      dailyTarget = Math.round(Metrics.tdee + 300);
      proteinPercent = 30;
      carbsPercent = 45;
      fatPercent = 25;
      break;
    case 'fat-loss':
      dailyTarget = Math.round(Metrics.tdee - 500);
      proteinPercent = 40;
      carbsPercent = 30;
      fatPercent = 30;
      break;
    case 'weight-gain':
      dailyTarget = Math.round(Metrics.tdee + 500);
      proteinPercent = 25;
      carbsPercent = 50;
      fatPercent = 25;
      break;
    case 'weight-loss':
      dailyTarget = Math.round(Metrics.tdee - 300);
      proteinPercent = 35;
      carbsPercent = 35;
      fatPercent = 30;
      break;
    default:
      dailyTarget = Math.round(Metrics.tdee);
      proteinPercent = 30;
      carbsPercent = 40;
      fatPercent = 30;
  }
  AppState.dailyTarget = dailyTarget;
  const proteinGrams = Math.round((dailyTarget * proteinPercent / 100) / 4);
  const carbsGrams = Math.round((dailyTarget * carbsPercent / 100) / 4);
  const fatGrams = Math.round((dailyTarget * fatPercent / 100) / 9);

  macros.protein = proteinGrams;
  macros.carbs = carbsGrams;
  macros.fat = fatGrams;

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

