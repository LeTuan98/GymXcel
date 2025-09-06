import React, { useState } from 'react';
import { Plus, Target, Calendar, TrendingUp, Edit, Trash2, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import GoalModal from '../components/GoalModal';
import CircularProgress from '../components/CircularProgress';

interface Goal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  createdAt: string;
  completed: boolean;
  category: 'weight' | 'strength' | 'endurance' | 'nutrition' | 'habit';
}

const Goals: React.FC = () => {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Weight Loss Journey',
      description: 'Lose weight for better health and confidence',
      target: 61,
      current: 66,
      unit: 'kg',
      deadline: '2024-06-30',
      createdAt: '2024-01-15',
      completed: false,
      category: 'weight'
    },
    {
      id: '2',
      title: 'Build Upper Body Strength',
      description: 'Increase bench press max',
      target: 80,
      current: 65,
      unit: 'kg',
      deadline: '2024-08-31',
      createdAt: '2024-01-20',
      completed: false,
      category: 'strength'
    },
    {
      id: '3',
      title: 'Daily Water Intake',
      description: 'Drink enough water every day',
      target: 8,
      current: 8,
      unit: 'glasses',
      deadline: '2024-03-31',
      createdAt: '2024-01-10',
      completed: true,
      category: 'habit'
    },
    {
      id: '4',
      title: 'Running Endurance',
      description: 'Complete a 10K run',
      target: 10,
      current: 7.5,
      unit: 'km',
      deadline: '2024-05-15',
      createdAt: '2024-02-01',
      completed: false,
      category: 'endurance'
    }
  ]);

  const handleAddGoal = (goalData: Omit<Goal, 'id' | 'createdAt' | 'completed'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      completed: false
    };
    
    setGoals([...goals, newGoal]);
    setShowGoalModal(false);
    
    addNotification({
      type: 'success',
      title: 'Goal Created!',
      message: `Your goal "${newGoal.title}" has been added successfully.`
    });
  };

  const handleEditGoal = (goalData: Omit<Goal, 'id' | 'createdAt' | 'completed'>) => {
    if (!editingGoal) return;
    
    const updatedGoal: Goal = {
      ...editingGoal,
      ...goalData
    };
    
    setGoals(goals.map(goal => goal.id === editingGoal.id ? updatedGoal : goal));
    setEditingGoal(null);
    
    addNotification({
      type: 'success',
      title: 'Goal Updated!',
      message: `Your goal "${updatedGoal.title}" has been updated.`
    });
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
    
    addNotification({
      type: 'info',
      title: 'Goal Deleted',
      message: 'Your goal has been removed.'
    });
  };

  const handleCompleteGoal = (id: string) => {
    setGoals(goals.map(goal => {
      if (goal.id === id) {
        const updatedGoal = { ...goal, completed: true, current: goal.target };
        
        addNotification({
          type: 'success',
          title: 'Congratulations! 🎉',
          message: `You've completed your goal: ${updatedGoal.title}!`
        });
        
        return updatedGoal;
      }
      return goal;
    }));
  };

  const updateGoalProgress = (id: string, newCurrent: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === id) {
        const updatedGoal = { ...goal, current: newCurrent };
        
        // Check if goal is completed
        if (newCurrent >= goal.target && !goal.completed) {
          updatedGoal.completed = true;
          addNotification({
            type: 'success',
            title: 'Goal Achieved! 🎉',
            message: `Congratulations! You've reached your goal: ${goal.title}!`
          });
        }
        
        return updatedGoal;
      }
      return goal;
    }));
  };

  const calculateProgress = (current: number, target: number) => {
    if (target === 0) return 0;
    return Math.min((current / target) * 100, 100);
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffInTime = deadlineDate.getTime() - now.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
    return diffInDays;
  };

  const getDeadlineStatus = (deadline: string, completed: boolean) => {
    if (completed) return 'completed';
    const days = getDaysUntilDeadline(deadline);
    if (days < 0) return 'overdue';
    if (days <= 7) return 'urgent';
    if (days <= 30) return 'soon';
    return 'normal';
  };

  const filteredGoals = goals.filter(goal => {
    if (filter === 'active') return !goal.completed;
    if (filter === 'completed') return goal.completed;
    return true;
  });

  const categoryColors = {
    weight: '#f59e0b',
    strength: '#ef4444',
    endurance: '#3b82f6',
    nutrition: '#10b981',
    habit: '#8b5cf6'
  };

  const categoryIcons = {
    weight: '⚖️',
    strength: '💪',
    endurance: '🏃',
    nutrition: '🥗',
    habit: '✅'
  };

  const completedGoals = goals.filter(goal => goal.completed).length;
  const activeGoals = goals.filter(goal => !goal.completed).length;
  const overallProgress = goals.length > 0 ? (completedGoals / goals.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold gold-text mb-2">My Goals</h1>
              <p className="text-gray-400">Track your progress and achieve your dreams</p>
            </div>
            <button
              onClick={() => setShowGoalModal(true)}
              className="btn-primary flex items-center mt-4 md:mt-0"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Goal
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card text-center">
              <div className="text-3xl font-bold text-gold mb-2">{goals.length}</div>
              <div className="text-gray-400">Total Goals</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{completedGoals}</div>
              <div className="text-gray-400">Completed</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{activeGoals}</div>
              <div className="text-gray-400">Active</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {overallProgress.toFixed(0)}%
              </div>
              <div className="text-gray-400">Overall Progress</div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2 mb-6">
            {[
              { key: 'all', label: 'All Goals' },
              { key: 'active', label: 'Active' },
              { key: 'completed', label: 'Completed' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === tab.key
                    ? 'bg-gold text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Goals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGoals.map(goal => {
              const progress = calculateProgress(goal.current, goal.target);
              const deadlineStatus = getDeadlineStatus(goal.deadline, goal.completed);
              const daysUntilDeadline = getDaysUntilDeadline(goal.deadline);

              return (
                <div key={goal.id} className="card relative">
                  {/* Goal Category Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{categoryIcons[goal.category]}</span>
                      <span
                        className="px-2 py-1 rounded text-xs font-medium text-black"
                        style={{ backgroundColor: categoryColors[goal.category] }}
                      >
                        {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}
                      </span>
                    </div>
                    
                    {goal.completed && (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    )}
                  </div>

                  {/* Goal Info */}
                  <h3 className="text-xl font-bold text-white mb-2">{goal.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{goal.description}</p>

                  {/* Progress */}
                  <div className="flex items-center space-x-4 mb-4">
                    <CircularProgress
                      percentage={progress}
                      size={60}
                      strokeWidth={6}
                      color={goal.completed ? '#10b981' : categoryColors[goal.category]}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-300">Progress</span>
                        <span className="text-gold font-bold">
                          {goal.current} / {goal.target} {goal.unit}
                        </span>
                      </div>
                      
                      {!goal.completed && (
                        <div className="flex space-x-2">
                          <input
                            type="number"
                            value={goal.current}
                            onChange={(e) => updateGoalProgress(goal.id, parseFloat(e.target.value) || 0)}
                            className="form-input text-sm py-1 flex-1"
                            step="0.1"
                            min="0"
                            max={goal.target}
                          />
                          {goal.current >= goal.target && (
                            <button
                              onClick={() => handleCompleteGoal(goal.id)}
                              className="btn-primary text-xs px-2 py-1"
                            >
                              Complete
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Deadline */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-400">
                        {new Date(goal.deadline).toLocaleDateString('ja-JP')}
                      </span>
                    </div>
                    
                    {!goal.completed && (
                      <span
                        className={`text-xs px-2 py-1 rounded font-medium ${
                          deadlineStatus === 'overdue'
                            ? 'bg-red-500/20 text-red-400'
                            : deadlineStatus === 'urgent'
                            ? 'bg-orange-500/20 text-orange-400'
                            : deadlineStatus === 'soon'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-green-500/20 text-green-400'
                        }`}
                      >
                        {deadlineStatus === 'overdue'
                          ? `${Math.abs(daysUntilDeadline)} days overdue`
                          : `${daysUntilDeadline} days left`}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingGoal(goal);
                        setShowGoalModal(true);
                      }}
                      className="flex-1 btn-secondary flex items-center justify-center"
                    >
                      <Edit className="mr-1 h-4 w-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredGoals.length === 0 && (
            <div className="text-center py-12">
              <Target className="mx-auto h-16 w-16 text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                {filter === 'all' ? 'No goals yet' : `No ${filter} goals`}
              </h3>
              <p className="text-gray-500 mb-6">
                {filter === 'all' 
                  ? 'Start your fitness journey by setting your first goal!'
                  : `You don't have any ${filter} goals at the moment.`
                }
              </p>
              {filter === 'all' && (
                <button
                  onClick={() => setShowGoalModal(true)}
                  className="btn-primary"
                >
                  Create Your First Goal
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Goal Modal */}
      {showGoalModal && (
        <GoalModal
          goal={editingGoal}
          onClose={() => {
            setShowGoalModal(false);
            setEditingGoal(null);
          }}
          onSave={editingGoal ? handleEditGoal : handleAddGoal}
        />
      )}
    </div>
  );
};

export default Goals;