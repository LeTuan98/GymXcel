let FOODS_DATA = [];

async function loadFoods() {
  const res = await fetch('./backend/api/get_foods.php');
  const json = await res.json();

  if (!json.success) throw new Error('Load foods failed');
  FOODS_DATA = json.data.map(f => ({
    id: Number(f.id),
    name: f.name,
    calories: Number(f.calories) || 0,
    protein: Number(f.protein) || 0,
    carbs: Number(f.carbs) || 0,
    fat: Number(f.fat) || 0
  }));
  
}

