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

const reverseActivityMap = {
  1.2: "sedentary",
  1.375: "light",
  1.55: "moderate",
  1.725: "active",
  1.9: "very_active"
};

async function initProfile() {
  try {
    const res = await fetch('./backend/api/get_profile.php');
    const data = await res.json();
    if (!data) return;
    // console.log(data);
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
    displayMetrics();
    toggleHipField();
    renderProfile();
    bindProfileEvents();
    if (ProfileData.goal) {
      selectGoal(ProfileData.goal);
    }

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



function displayMetrics() {
  // ===== BMI =====
  if (Metrics.bmi !== null) {
    document.getElementById('bmiValue').textContent =
      Metrics.bmi.toFixed(1);
  } else {
    document.getElementById('bmiValue').textContent = '--';
  }

  // ===== BMR =====
  if (Metrics.bmr !== null) {
    document.getElementById('bmrValue').textContent =
      Math.round(Metrics.bmr);
  } else {
    document.getElementById('bmrValue').textContent = '--';
  }

  // ===== TDEE =====
  if (Metrics.tdee !== null) {
    document.getElementById('tdeeValue').textContent =
      Math.round(Metrics.tdee);
  } else {
    document.getElementById('tdeeValue').textContent = '--';
  }

  // ===== BFP =====
  if (Metrics.bfp !== null) {
    document.getElementById('bfpValue').textContent =
      Metrics.bfp.toFixed(1) + '%';
  } else {
    document.getElementById('bfpValue').textContent = '--';
  }

  // ===== BMI CATEGORY =====
  let bmiCategory = 'Not calculated';

  if (Metrics.bmi !== null) {
    if (Metrics.bmi < 18.5) {
      bmiCategory = 'Underweight';
    } else if (Metrics.bmi < 25) {
      bmiCategory = 'Normal weight';
    } else if (Metrics.bmi < 30) {
      bmiCategory = 'Overweight';
    } else {
      bmiCategory = 'Obese';
    }
  }

  document.getElementById('bmiCategory').textContent = bmiCategory;
}


function selectGoal(goal) {
  document.querySelectorAll('.goal-card').forEach(card => {
    card.classList.remove('active');
  });

  const selectedCard = document.querySelector(`[data-goal="${goal}"]`);
  if (selectedCard) {
    selectedCard.classList.add('active');
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

  const proteinGrams = Math.round((dailyTarget * proteinPercent / 100) / 4);
  const carbsGrams = Math.round((dailyTarget * carbsPercent / 100) / 4);
  const fatGrams = Math.round((dailyTarget * fatPercent / 100) / 9);

  const macros = {
    protein: proteinGrams,
    carbs: carbsGrams,
    fat: fatGrams,
    proteinPercent,
    carbsPercent,
    fatPercent
  };

  displayMacros(goal, dailyTarget, macros);
  ProfileData.goal = goal;
  saveProfile();
}

function displayMacros(goal, dailyTarget, macros) {
  const macrosCard = document.getElementById('macrosCard');
  if (macrosCard) {
    macrosCard.style.display = 'block';
  }

  const goalNames = {
    'muscle-gain': 'Muscle Gain',
    'fat-loss': 'Fat Loss',
    'weight-gain': 'Weight Gain',
    'weight-loss': 'Weight Loss'
  };

  document.getElementById('selectedGoalText').textContent = goalNames[goal] || goal;
  document.getElementById('goalCalories').textContent = dailyTarget;

  document.getElementById('proteinValue').textContent = `${macros.protein}g`;
  document.getElementById('proteinBar').style.width = `${macros.proteinPercent}%`;
  document.getElementById('proteinPercent').textContent = `${macros.proteinPercent}%`;

  document.getElementById('carbsValue').textContent = `${macros.carbs}g`;
  document.getElementById('carbsBar').style.width = `${macros.carbsPercent}%`;
  document.getElementById('carbsPercent').textContent = `${macros.carbsPercent}%`;

  document.getElementById('fatValue').textContent = `${macros.fat}g`;
  document.getElementById('fatBar').style.width = `${macros.fatPercent}%`;
  document.getElementById('fatPercent').textContent = `${macros.fatPercent}%`;
}

function renderProfile() {
  [
    'height',
    'weight',
    'age',
    'neck',
    'waist',
    'hip',
    'gender',
    'activityLevel'
  ].forEach(f => {
    const el = document.getElementById(f);
    if (!el) return;

    el.value = ProfileData[f] ?? '';
  });
}


// updata 
function updateProfileFromForm() {
  ProfileData.height = Number(document.getElementById('height')?.value) || null;
  ProfileData.weight = Number(document.getElementById('weight')?.value) || null;
  ProfileData.age    = Number(document.getElementById('age')?.value) || null;

  ProfileData.gender = document.getElementById('gender')?.value || null;
  ProfileData.activityLevel =
    Number(document.getElementById('activityLevel')?.value) || null;

  ProfileData.neck  = Number(document.getElementById('neck')?.value) || null;
  ProfileData.waist = Number(document.getElementById('waist')?.value) || null;
  ProfileData.hip   = Number(document.getElementById('hip')?.value) || null;
}

function onProfileInputChange() {
  updateProfileFromForm();
  calculateMetrics();
  displayMetrics();
}

function bindProfileEvents() {
  const fields = [
    'height',
    'weight',
    'age',
    'gender',
    'activityLevel',
    'neck',
    'waist',
    'hip'
  ];

  fields.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener('input', onProfileInputChange);
    el.addEventListener('change', onProfileInputChange);
  });
}

async function saveProfile() {
  try {
    const payload = {
      height: ProfileData.height,
      weight: ProfileData.weight,
      age: ProfileData.age,
      gender: ProfileData.gender === 'M' ? 'M' : 'F',
      activity_level: reverseActivityMap[ProfileData.activityLevel],

      neck: ProfileData.neck,
      waist: ProfileData.waist,
      hip: ProfileData.hip,

      goal: ProfileData.goal
    };

    const res = await fetch('./backend/api/update_profile.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (!result?.success) {
      console.error('Save profile failed', result);
      return;
    }

    console.log('Profile saved');

  } catch (e) {
    console.error('Save profile error', e);
  }
}

function toggleHipField() {
  const hipGroup = document.getElementById('hipGroup');
  if (!hipGroup) return;

  if (ProfileData.gender === 'M') {
    hipGroup.style.display = 'none';
    ProfileData.hip = null;   // ❗ rất quan trọng
  } else {
    hipGroup.style.display = 'block';
  }
}

document.getElementById('gender').addEventListener('change', (e) => {
  ProfileData.gender = e.target.value;
  toggleHipField();

  calculateMetrics();
  displayMetrics();
});

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('bmiValue')) {
    initProfile();
  }
});
