import React, { useState } from 'react';
import { Calendar, Plus, Filter, Target, TrendingUp, Activity } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import CircularProgress from '../components/CircularProgress';
import MealTable from '../components/MealTable';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMealType, setSelectedMealType] = useState<'all' | 'breakfast' | 'lunch' | 'dinner'>('all');

  // Mock data - in real app, this would come from API/localStorage
  const metrics = {
    mr: 1439,
    tdee: 2230.45,
    bmi: user?.height && user?.weight ? (user.weight / Math.pow(user.height / 100, 2)).toFixed(2) : '22.31',
    bodyFat: 23.6
  };

  const dailyNutrition = {
    calories: { current: 1250, target: 2200 },
    protein: { current: 85, target: 150 },
    carbs: { current: 120, target: 275 },
    fat: { current: 45, target: 80 }
  };

  const todayGoals = [
    'Drink 8 glasses of water',
    'Complete 30min cardio',
    'Hit protein target'
  ];

  const getWeekday = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', { weekday: 'long' });
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold gold-text mb-2">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-gray-400">Here's your fitness overview for today</p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card text-center">
            <div className="text-2xl font-bold text-gold mb-1">{metrics.mr}</div>
            <div className="text-sm text-gray-400">BMR</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-gold mb-1">{metrics.tdee}</div>
            <div className="text-sm text-gray-400">TDEE</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-gold mb-1">{metrics.bmi}</div>
            <div className="text-sm text-gray-400">BMI</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-gold mb-1">{metrics.bodyFat}%</div>
            <div className="text-sm text-gray-400">Body Fat</div>
          </div>
        </div>

        {/* Daily Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Nutrition Progress */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Activity className="mr-2 h-5 w-5 text-gold" />
                Daily Nutrition Progress
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <CircularProgress
                    percentage={calculateProgress(dailyNutrition.calories.current, dailyNutrition.calories.target)}
                    size={80}
                    strokeWidth={8}
                    color="#d4af37"
                  />
                  <div className="mt-2">
                    <div className="text-lg font-bold text-gold">
                      {dailyNutrition.calories.current}
                    </div>
                    <div className="text-sm text-gray-400">
                      / {dailyNutrition.calories.target} cal
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <CircularProgress
                    percentage={calculateProgress(dailyNutrition.protein.current, dailyNutrition.protein.target)}
                    size={80}
                    strokeWidth={8}
                    color="#10b981"
                  />
                  <div className="mt-2">
                    <div className="text-lg font-bold text-emerald-400">
                      {dailyNutrition.protein.current}g
                    </div>
                    <div className="text-sm text-gray-400">
                      / {dailyNutrition.protein.target}g protein
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <CircularProgress
                    percentage={calculateProgress(dailyNutrition.carbs.current, dailyNutrition.carbs.target)}
                    size={80}
                    strokeWidth={8}
                    color="#3b82f6"
                  />
                  <div className="mt-2">
                    <div className="text-lg font-bold text-blue-400">
                      {dailyNutrition.carbs.current}g
                    </div>
                    <div className="text-sm text-gray-400">
                      / {dailyNutrition.carbs.target}g carbs
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <CircularProgress
                    percentage={calculateProgress(dailyNutrition.fat.current, dailyNutrition.fat.target)}
                    size={80}
                    strokeWidth={8}
                    color="#f59e0b"
                  />
                  <div className="mt-2">
                    <div className="text-lg font-bold text-amber-400">
                      {dailyNutrition.fat.current}g
                    </div>
                    <div className="text-sm text-gray-400">
                      / {dailyNutrition.fat.target}g fat
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Goals */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Target className="mr-2 h-5 w-5 text-gold" />
              Today's Goals
            </h2>
            <div className="space-y-3">
              {todayGoals.map((goal, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-gold bg-transparent border-gold rounded focus:ring-gold"
                  />
                  <span className="text-gray-300">{goal}</span>
                </div>
              ))}
            </div>
            <button className="btn-primary w-full mt-4 text-sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Goal
            </button>
          </div>
        </div>

        {/* Date Selection and Meal Tracking */}
        <div className="card">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-xl font-bold mb-4 md:mb-0 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-gold" />
              Meal Tracking
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Date Selector */}
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gold" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="form-input text-sm"
                />
                <span className="text-sm text-gray-400">
                  ({getWeekday(selectedDate)})
                </span>
              </div>

              {/* Meal Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gold" />
                <select
                  value={selectedMealType}
                  onChange={(e) => setSelectedMealType(e.target.value as any)}
                  className="form-input text-sm"
                >
                  <option value="all">All Meals</option>
                  <option value="breakfast">{t('breakfast')}</option>
                  <option value="lunch">{t('lunch')}</option>
                  <option value="dinner">{t('dinner')}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Meal Table */}
          <MealTable selectedMealType={selectedMealType} selectedDate={selectedDate} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;