function initProfile() {
  const profile = loadProfile();
  if (profile) {
    document.getElementById('height').value = profile.height;
    document.getElementById('weight').value = profile.weight;
    document.getElementById('age').value = profile.age;
    document.getElementById('gender').value = profile.gender;
    document.getElementById('activityLevel').value = profile.activityLevel;

    displayMetrics(profile);
  }

  const goalData = loadGoal();
  if (goalData) {
    const goalCard = document.querySelector(`[data-goal="${goalData.goal}"]`);
    if (goalCard) {
      goalCard.classList.add('active');
    }
    displayMacros(goalData.goal, goalData.dailyTarget, goalData.macros);
  }
}

function calculateMetrics() {
  const height = parseFloat(document.getElementById('height').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const age = parseInt(document.getElementById('age').value);
  const gender = document.getElementById('gender').value;
  const activityLevel = parseFloat(document.getElementById('activityLevel').value);

  if (!height || !weight || !age || !gender || !activityLevel) {
    alert('Please fill in all fields');
    return;
  }

  const bmi = weight / ((height / 100) ** 2);

  let bmr;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const tdee = bmr * activityLevel;

  let bfp;
  if (gender === 'male') {
    bfp = 1.20 * bmi + 0.23 * age - 16.2;
  } else {
    bfp = 1.20 * bmi + 0.23 * age - 5.4;
  }

  const profile = {
    height,
    weight,
    age,
    gender,
    activityLevel,
    bmi,
    bmr,
    tdee,
    bfp
  };

  saveProfile(profile);
  displayMetrics(profile);
}

function displayMetrics(profile) {
  document.getElementById('bmiValue').textContent = profile.bmi.toFixed(1);
  document.getElementById('bmrValue').textContent = Math.round(profile.bmr);
  document.getElementById('tdeeValue').textContent = Math.round(profile.tdee);
  document.getElementById('bfpValue').textContent = profile.bfp.toFixed(1) + '%';

  let bmiCategory = '';
  if (profile.bmi < 18.5) {
    bmiCategory = 'Underweight';
  } else if (profile.bmi < 25) {
    bmiCategory = 'Normal weight';
  } else if (profile.bmi < 30) {
    bmiCategory = 'Overweight';
  } else {
    bmiCategory = 'Obese';
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

  const profile = loadProfile();
  if (!profile) {
    alert('Please calculate your metrics first');
    return;
  }

  let dailyTarget;
  let proteinPercent, carbsPercent, fatPercent;

  switch (goal) {
    case 'muscle-gain':
      dailyTarget = Math.round(profile.tdee + 300);
      proteinPercent = 30;
      carbsPercent = 45;
      fatPercent = 25;
      break;
    case 'fat-loss':
      dailyTarget = Math.round(profile.tdee - 500);
      proteinPercent = 40;
      carbsPercent = 30;
      fatPercent = 30;
      break;
    case 'weight-gain':
      dailyTarget = Math.round(profile.tdee + 500);
      proteinPercent = 25;
      carbsPercent = 50;
      fatPercent = 25;
      break;
    case 'weight-loss':
      dailyTarget = Math.round(profile.tdee - 300);
      proteinPercent = 35;
      carbsPercent = 35;
      fatPercent = 30;
      break;
    default:
      dailyTarget = Math.round(profile.tdee);
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

  saveGoal(goal, dailyTarget, macros);
  displayMacros(goal, dailyTarget, macros);
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

if (document.getElementById('bmiValue')) {
  initProfile();
}
