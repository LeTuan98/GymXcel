import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNotification } from '../contexts/NotificationContext';

interface Meal {
  id: string;
  name: string;
  standardAmount: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  quantity: number;
  mealType: 'breakfast' | 'lunch' | 'dinner';
}

interface MealTableProps {
  selectedMealType: 'all' | 'breakfast' | 'lunch' | 'dinner';
  selectedDate: string;
}

const MealTable: React.FC<MealTableProps> = ({ selectedMealType, selectedDate }) => {
  const { t } = useLanguage();
  const { addNotification } = useNotification();
  
  // Mock meal data
  const [meals, setMeals] = useState<Meal[]>([
    {
      id: '1',
      name: 'Grilled Chicken Breast',
      standardAmount: 100,
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      quantity: 150,
      mealType: 'lunch'
    },
    {
      id: '2',
      name: 'Brown Rice',
      standardAmount: 100,
      calories: 123,
      protein: 2.6,
      carbs: 23,
      fat: 0.9,
      quantity: 80,
      mealType: 'lunch'
    },
    {
      id: '3',
      name: 'Oatmeal',
      standardAmount: 100,
      calories: 68,
      protein: 2.4,
      carbs: 12,
      fat: 1.4,
      quantity: 50,
      mealType: 'breakfast'
    },
    {
      id: '4',
      name: 'Greek Yogurt',
      standardAmount: 100,
      calories: 59,
      protein: 10,
      carbs: 3.6,
      fat: 0.4,
      quantity: 150,
      mealType: 'breakfast'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [newMeal, setNewMeal] = useState({
    name: '',
    standardAmount: 100,
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    quantity: 100,
    mealType: 'breakfast' as 'breakfast' | 'lunch' | 'dinner'
  });

  const filteredMeals = meals.filter(meal => {
    const matchesType = selectedMealType === 'all' || meal.mealType === selectedMealType;
    const matchesSearch = meal.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const calculateSubtotal = (meal: Meal, nutrient: keyof Pick<Meal, 'calories' | 'protein' | 'carbs' | 'fat'>) => {
    return ((meal.quantity / meal.standardAmount) * meal[nutrient]).toFixed(1);
  };

  const calculateTotal = (nutrient: keyof Pick<Meal, 'calories' | 'protein' | 'carbs' | 'fat'>) => {
    return filteredMeals.reduce((total, meal) => {
      return total + (meal.quantity / meal.standardAmount) * meal[nutrient];
    }, 0).toFixed(1);
  };

  const handleAddMeal = () => {
    const meal: Meal = {
      id: Date.now().toString(),
      ...newMeal
    };
    setMeals([...meals, meal]);
    setNewMeal({
      name: '',
      standardAmount: 100,
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      quantity: 100,
      mealType: 'breakfast'
    });
    setShowAddMeal(false);
    
    addNotification({
      type: 'success',
      title: 'Meal Added',
      message: `${meal.name} has been added to your ${meal.mealType}.`
    });
  };

  const handleDeleteMeal = (id: string) => {
    setMeals(meals.filter(meal => meal.id !== id));
    addNotification({
      type: 'info',
      title: 'Meal Removed',
      message: 'Meal has been removed from your log.'
    });
  };

  const updateMealQuantity = (id: string, quantity: number) => {
    setMeals(meals.map(meal => 
      meal.id === id ? { ...meal, quantity } : meal
    ));
  };

  const mealTypeLabels = {
    breakfast: t('breakfast'),
    lunch: t('lunch'),
    dinner: t('dinner')
  };

  return (
    <div className="space-y-6">
      {/* Search and Add Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search meals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input pl-10"
          />
        </div>
        
        <button
          onClick={() => setShowAddMeal(true)}
          className="btn-primary flex items-center justify-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Meal
        </button>
      </div>

      {/* Meals Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gold/20">
              <th className="text-left py-3 px-2 text-gold font-medium">Meal Type</th>
              <th className="text-left py-3 px-2 text-gold font-medium">Name</th>
              <th className="text-center py-3 px-2 text-gold font-medium">Standard (g)</th>
              <th className="text-center py-3 px-2 text-gold font-medium">Calories</th>
              <th className="text-center py-3 px-2 text-gold font-medium">Protein (g)</th>
              <th className="text-center py-3 px-2 text-gold font-medium">Carbs (g)</th>
              <th className="text-center py-3 px-2 text-gold font-medium">Fat (g)</th>
              <th className="text-center py-3 px-2 text-gold font-medium">Quantity</th>
              <th className="text-center py-3 px-2 text-gold font-medium">Subtotal</th>
              <th className="text-center py-3 px-2 text-gold font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMeals.map((meal) => (
              <tr key={meal.id} className="border-b border-gray-700 hover:bg-white/5">
                <td className="py-3 px-2">
                  <span className="inline-block px-2 py-1 rounded text-xs bg-gold/20 text-gold">
                    {mealTypeLabels[meal.mealType]}
                  </span>
                </td>
                <td className="py-3 px-2 text-white font-medium">{meal.name}</td>
                <td className="py-3 px-2 text-center text-gray-300">{meal.standardAmount}</td>
                <td className="py-3 px-2 text-center text-gray-300">{meal.calories}</td>
                <td className="py-3 px-2 text-center text-gray-300">{meal.protein}</td>
                <td className="py-3 px-2 text-center text-gray-300">{meal.carbs}</td>
                <td className="py-3 px-2 text-center text-gray-300">{meal.fat}</td>
                <td className="py-3 px-2">
                  <input
                    type="number"
                    value={meal.quantity}
                    onChange={(e) => updateMealQuantity(meal.id, parseInt(e.target.value) || 0)}
                    className="w-20 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-center text-white"
                    min="0"
                  />
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="text-gold font-medium">
                    {calculateSubtotal(meal, 'calories')} cal
                  </div>
                  <div className="text-xs text-gray-400">
                    P: {calculateSubtotal(meal, 'protein')}g |{' '}
                    C: {calculateSubtotal(meal, 'carbs')}g |{' '}
                    F: {calculateSubtotal(meal, 'fat')}g
                  </div>
                </td>
                <td className="py-3 px-2">
                  <div className="flex justify-center space-x-2">
                    <button className="p-1 text-blue-400 hover:text-blue-300">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteMeal(meal.id)}
                      className="p-1 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gold/40 bg-gold/5">
              <td className="py-3 px-2 font-bold text-gold" colSpan={8}>TOTAL</td>
              <td className="py-3 px-2 text-center">
                <div className="text-gold font-bold text-lg">
                  {calculateTotal('calories')} cal
                </div>
                <div className="text-sm text-gold">
                  P: {calculateTotal('protein')}g |{' '}
                  C: {calculateTotal('carbs')}g |{' '}
                  F: {calculateTotal('fat')}g
                </div>
              </td>
              <td className="py-3 px-2"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Add Meal Modal */}
      {showAddMeal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gold mb-4">Add New Meal</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Meal Name</label>
                <input
                  type="text"
                  value={newMeal.name}
                  onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                  className="form-input"
                  placeholder="e.g., Grilled Salmon"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Meal Type</label>
                <select
                  value={newMeal.mealType}
                  onChange={(e) => setNewMeal({ ...newMeal, mealType: e.target.value as any })}
                  className="form-input"
                >
                  <option value="breakfast">{t('breakfast')}</option>
                  <option value="lunch">{t('lunch')}</option>
                  <option value="dinner">{t('dinner')}</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Standard Amount (g)</label>
                  <input
                    type="number"
                    value={newMeal.standardAmount}
                    onChange={(e) => setNewMeal({ ...newMeal, standardAmount: parseInt(e.target.value) || 0 })}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Quantity (g)</label>
                  <input
                    type="number"
                    value={newMeal.quantity}
                    onChange={(e) => setNewMeal({ ...newMeal, quantity: parseInt(e.target.value) || 0 })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Calories</label>
                  <input
                    type="number"
                    value={newMeal.calories}
                    onChange={(e) => setNewMeal({ ...newMeal, calories: parseFloat(e.target.value) || 0 })}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Protein (g)</label>
                  <input
                    type="number"
                    value={newMeal.protein}
                    onChange={(e) => setNewMeal({ ...newMeal, protein: parseFloat(e.target.value) || 0 })}
                    className="form-input"
                    step="0.1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Carbs (g)</label>
                  <input
                    type="number"
                    value={newMeal.carbs}
                    onChange={(e) => setNewMeal({ ...newMeal, carbs: parseFloat(e.target.value) || 0 })}
                    className="form-input"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Fat (g)</label>
                  <input
                    type="number"
                    value={newMeal.fat}
                    onChange={(e) => setNewMeal({ ...newMeal, fat: parseFloat(e.target.value) || 0 })}
                    className="form-input"
                    step="0.1"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleAddMeal}
                className="btn-primary flex-1"
                disabled={!newMeal.name}
              >
                Add Meal
              </button>
              <button
                onClick={() => setShowAddMeal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealTable;