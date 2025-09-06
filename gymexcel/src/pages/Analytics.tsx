import React, { useState } from 'react';
import { TrendingUp, Calendar, BarChart3, PieChart, Target, Activity, Flame, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Analytics: React.FC = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | '3months' | 'year'>('month');

  // Mock data - in real app, this would come from API
  const weeklyCalories = [
    { day: 'Mon', consumed: 1850, target: 2200 },
    { day: 'Tue', consumed: 2100, target: 2200 },
    { day: 'Wed', consumed: 1950, target: 2200 },
    { day: 'Thu', consumed: 2250, target: 2200 },
    { day: 'Fri', consumed: 2000, target: 2200 },
    { day: 'Sat', consumed: 2400, target: 2200 },
    { day: 'Sun', consumed: 1800, target: 2200 }
  ];

  const macroDistribution = {
    protein: 25,
    carbs: 45,
    fat: 30
  };

  const monthlyProgress = [
    { week: 'Week 1', weight: 66.5, bodyFat: 23.8 },
    { week: 'Week 2', weight: 66.2, bodyFat: 23.6 },
    { week: 'Week 3', weight: 65.9, bodyFat: 23.4 },
    { week: 'Week 4', weight: 65.7, bodyFat: 23.2 }
  ];

  const workoutStats = {
    totalWorkouts: 16,
    averageCaloriesBurned: 380,
    mostActiveDay: 'Wednesday',
    favoriteExercise: 'Running'
  };

  const nutritionTrends = {
    averageDailyCalories: 2050,
    proteinGoalHitRate: 85,
    hydrationGoalHitRate: 92,
    streakDays: 12
  };

  const achievements = [
    { id: '1', title: '7-Day Streak', description: 'Logged meals for 7 consecutive days', date: '2024-01-20', type: 'nutrition' },
    { id: '2', title: 'Protein Master', description: 'Hit protein goals for 10 days', date: '2024-01-18', type: 'nutrition' },
    { id: '3', title: 'Consistency King', description: '20 workouts completed', date: '2024-01-15', type: 'fitness' },
    { id: '4', title: 'Goal Achiever', description: 'Completed first fitness goal', date: '2024-01-12', type: 'general' }
  ];

  const periods = [
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
    { key: '3months', label: '3 Months' },
    { key: 'year', label: 'This Year' }
  ];

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'nutrition': return '🥗';
      case 'fitness': return '💪';
      default: return '🏆';
    }
  };

  const calculateCalorieProgress = (consumed: number, target: number) => {
    return Math.min((consumed / target) * 100, 120); // Allow 120% to show overage
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold gold-text mb-2">Analytics & Reports</h1>
              <p className="text-gray-400">Track your progress and insights over time</p>
            </div>
            
            {/* Period Selector */}
            <div className="flex gap-2 mt-4 md:mt-0">
              {periods.map(period => (
                <button
                  key={period.key}
                  onClick={() => setSelectedPeriod(period.key as any)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                    selectedPeriod === period.key
                      ? 'bg-gold text-black'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="card text-center">
              <Flame className="mx-auto h-8 w-8 text-orange-400 mb-2" />
              <div className="text-2xl font-bold text-orange-400 mb-1">2,050</div>
              <div className="text-sm text-gray-400">Avg Daily Calories</div>
              <div className="text-xs text-green-400 mt-1">+5% vs last month</div>
            </div>
            
            <div className="card text-center">
              <Target className="mx-auto h-8 w-8 text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400 mb-1">85%</div>
              <div className="text-sm text-gray-400">Goals Hit Rate</div>
              <div className="text-xs text-green-400 mt-1">+12% vs last month</div>
            </div>
            
            <div className="card text-center">
              <Activity className="mx-auto h-8 w-8 text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400 mb-1">16</div>
              <div className="text-sm text-gray-400">Workouts</div>
              <div className="text-xs text-green-400 mt-1">+3 vs last month</div>
            </div>
            
            <div className="card text-center">
              <Award className="mx-auto h-8 w-8 text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400 mb-1">12</div>
              <div className="text-sm text-gray-400">Day Streak</div>
              <div className="text-xs text-green-400 mt-1">Personal best!</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Weekly Calorie Intake */}
            <div className="card">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-gold" />
                Weekly Calorie Intake
              </h2>
              
              <div className="space-y-4">
                {weeklyCalories.map(day => {
                  const progress = calculateCalorieProgress(day.consumed, day.target);
                  const isOver = day.consumed > day.target;
                  
                  return (
                    <div key={day.day} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-medium">{day.day}</span>
                        <div className="text-right">
                          <span className={`font-bold ${isOver ? 'text-red-400' : 'text-gold'}`}>
                            {day.consumed}
                          </span>
                          <span className="text-gray-400 text-sm"> / {day.target} cal</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-500 ${
                            isOver ? 'bg-red-500' : 'bg-gradient-to-r from-gold to-yellow-400'
                          }`}
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        ></div>
                        {progress > 100 && (
                          <div className="text-xs text-red-400 mt-1 text-right">
                            {((day.consumed - day.target) / day.target * 100).toFixed(0)}% over target
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Macro Distribution */}
            <div className="card">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <PieChart className="mr-2 h-5 w-5 text-gold" />
                Macro Distribution (Average)
              </h2>
              
              <div className="space-y-6">
                {/* Visual representation */}
                <div className="relative h-32 bg-gray-800 rounded-lg overflow-hidden">
                  <div className="flex h-full">
                    <div 
                      className="bg-green-500"
                      style={{ width: `${macroDistribution.protein}%` }}
                      title={`Protein: ${macroDistribution.protein}%`}
                    ></div>
                    <div 
                      className="bg-blue-500"
                      style={{ width: `${macroDistribution.carbs}%` }}
                      title={`Carbs: ${macroDistribution.carbs}%`}
                    ></div>
                    <div 
                      className="bg-yellow-500"
                      style={{ width: `${macroDistribution.fat}%` }}
                      title={`Fat: ${macroDistribution.fat}%`}
                    ></div>
                  </div>
                </div>
                
                {/* Legend */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{macroDistribution.protein}%</div>
                    <div className="text-sm text-gray-400">Protein</div>
                    <div className="w-full bg-green-500 h-1 rounded mt-2"></div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{macroDistribution.carbs}%</div>
                    <div className="text-sm text-gray-400">Carbs</div>
                    <div className="w-full bg-blue-500 h-1 rounded mt-2"></div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{macroDistribution.fat}%</div>
                    <div className="text-sm text-gray-400">Fat</div>
                    <div className="w-full bg-yellow-500 h-1 rounded mt-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Monthly Progress */}
            <div className="lg:col-span-2 card">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-gold" />
                Monthly Progress Trends
              </h2>
              
              <div className="space-y-6">
                {/* Weight Progress */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-3">Weight (kg)</h3>
                  <div className="space-y-3">
                    {monthlyProgress.map((week, index) => (
                      <div key={week.week} className="flex items-center">
                        <div className="w-16 text-sm text-gray-400">{week.week}</div>
                        <div className="flex-1 mx-4">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full"
                                style={{ width: `${((67 - week.weight) / (67 - 65)) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="w-12 text-right text-blue-400 font-bold text-sm">
                          {week.weight}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Body Fat Progress */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-3">Body Fat (%)</h3>
                  <div className="space-y-3">
                    {monthlyProgress.map(week => (
                      <div key={week.week} className="flex items-center">
                        <div className="w-16 text-sm text-gray-400">{week.week}</div>
                        <div className="flex-1 mx-4">
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full"
                              style={{ width: `${((24 - week.bodyFat) / (24 - 23)) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-12 text-right text-green-400 font-bold text-sm">
                          {week.bodyFat}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Workout Stats */}
            <div className="card">
              <h2 className="text-xl font-bold text-white mb-6">Workout Statistics</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Workouts</span>
                  <span className="text-gold font-bold">{workoutStats.totalWorkouts}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg Calories Burned</span>
                  <span className="text-orange-400 font-bold">{workoutStats.averageCaloriesBurned}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Most Active Day</span>
                  <span className="text-blue-400 font-bold">{workoutStats.mostActiveDay}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Favorite Exercise</span>
                  <span className="text-purple-400 font-bold">{workoutStats.favoriteExercise}</span>
                </div>
              </div>

              <hr className="my-4 border-gray-700" />
              
              <h3 className="text-lg font-semibold text-white mb-4">Nutrition Insights</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Protein Goal Hit Rate</span>
                  <span className="text-green-400 font-bold">{nutritionTrends.proteinGoalHitRate}%</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Hydration Goal Rate</span>
                  <span className="text-blue-400 font-bold">{nutritionTrends.hydrationGoalHitRate}%</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Streak</span>
                  <span className="text-gold font-bold">{nutritionTrends.streakDays} days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Award className="mr-2 h-5 w-5 text-gold" />
              Recent Achievements
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map(achievement => (
                <div key={achievement.id} className="p-4 bg-white/5 rounded-lg border border-gold/20">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{getAchievementIcon(achievement.type)}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{achievement.title}</h3>
                      <p className="text-gray-400 text-sm">{achievement.description}</p>
                      <p className="text-gold text-xs mt-2">
                        {new Date(achievement.date).toLocaleDateString('ja-JP')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;