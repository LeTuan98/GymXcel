import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Plus, Target, Calendar, TrendingUp, User, Settings, Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNotification } from '../contexts/NotificationContext';
import GoalModal from '../components/GoalModal';

interface Goal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  createdAt: string;
}

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { t } = useLanguage();
  const { addNotification } = useNotification();
  
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Weight Loss',
      description: 'Lose 5kg by summer',
      target: 61,
      current: 66,
      unit: 'kg',
      deadline: '2024-06-30',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Muscle Gain',
      description: 'Increase muscle mass',
      target: 70,
      current: 66,
      unit: 'kg',
      deadline: '2024-12-31',
      createdAt: '2024-01-20'
    }
  ]);

  // Mock posts data
  const userPosts = [
    {
      id: '1',
      content: 'Just completed my morning workout! 💪 Feeling great and ready to tackle the day.',
      image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=600',
      timestamp: '2024-01-20T08:30:00Z',
      likes: 15,
      comments: 3
    },
    {
      id: '2',
      content: 'Healthy meal prep Sunday! 🥗 Preparing nutritious meals for the week ahead.',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
      timestamp: '2024-01-19T15:45:00Z',
      likes: 22,
      comments: 7
    }
  ];

  const handleAddGoal = (goalData: Omit<Goal, 'id' | 'createdAt'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    setGoals([...goals, newGoal]);
    setShowGoalModal(false);
    
    addNotification({
      type: 'success',
      title: 'Goal Added!',
      message: `Your goal "${newGoal.title}" has been created successfully.`
    });
  };

  const calculateProgress = (current: number, target: number) => {
    if (target === 0) return 0;
    return Math.min((current / target) * 100, 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP');
  };

  const timeAgo = (dateString: string) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="card mb-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400'}
                  alt={user?.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-gold"
                />
                <button className="absolute bottom-2 right-2 p-2 bg-gold text-black rounded-full hover:bg-yellow-400 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{user?.name}</h1>
                    <p className="text-gray-400 mb-1">{user?.email}</p>
                    <p className="text-sm text-gold">Member since January 2024</p>
                  </div>
                  
                  <div className="flex space-x-3 mt-4 sm:mt-0">
                    <Link to="/profile/edit" className="btn-primary flex items-center">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Link>
                    <button className="btn-secondary flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {user?.age && (
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-gold">{user.age}</div>
                      <div className="text-sm text-gray-400">{t('age')}</div>
                    </div>
                  )}
                  {user?.height && (
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-gold">{user.height}cm</div>
                      <div className="text-sm text-gray-400">{t('height')}</div>
                    </div>
                  )}
                  {user?.weight && (
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-gold">{user.weight}kg</div>
                      <div className="text-sm text-gray-400">{t('weight')}</div>
                    </div>
                  )}
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-gold">{goals.length}</div>
                    <div className="text-sm text-gray-400">Active Goals</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Goals Section */}
            <div className="lg:col-span-2">
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <Target className="mr-2 h-6 w-6 text-gold" />
                    My Goals
                  </h2>
                  <button
                    onClick={() => setShowGoalModal(true)}
                    className="btn-primary flex items-center"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Goal
                  </button>
                </div>

                <div className="space-y-4">
                  {goals.map(goal => (
                    <div key={goal.id} className="p-4 bg-white/5 rounded-lg border border-gold/20">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{goal.title}</h3>
                          <p className="text-gray-400 text-sm">{goal.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-gold font-bold">
                            {goal.current} / {goal.target} {goal.unit}
                          </div>
                          <div className="text-xs text-gray-400">
                            Due: {formatDate(goal.deadline)}
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                        <div
                          className="bg-gradient-to-r from-gold to-yellow-400 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${calculateProgress(goal.current, goal.target)}%` }}
                        ></div>
                      </div>
                      
                      <div className="text-sm text-gray-400">
                        {calculateProgress(goal.current, goal.target).toFixed(1)}% complete
                      </div>
                    </div>
                  ))}

                  {goals.length === 0 && (
                    <div className="text-center py-8">
                      <Target className="mx-auto h-12 w-12 text-gray-600 mb-4" />
                      <p className="text-gray-400 mb-4">No goals set yet</p>
                      <button
                        onClick={() => setShowGoalModal(true)}
                        className="btn-primary"
                      >
                        Create Your First Goal
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Profile Stats */}
            <div className="space-y-6">
              {/* Body Measurements */}
              {(user?.waist || user?.neck || user?.hip) && (
                <div className="card">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <User className="mr-2 h-5 w-5 text-gold" />
                    Body Measurements
                  </h3>
                  <div className="space-y-3">
                    {user?.waist && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t('waist')}</span>
                        <span className="text-white font-medium">{user.waist} cm</span>
                      </div>
                    )}
                    {user?.neck && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t('neck')}</span>
                        <span className="text-white font-medium">{user.neck} cm</span>
                      </div>
                    )}
                    {user?.hip && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t('hip')}</span>
                        <span className="text-white font-medium">{user.hip} cm</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Recent Activity */}
              <div className="card">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-gold" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="text-gold font-medium">Today</div>
                    <div className="text-gray-400">Logged 3 meals • 1,250 calories</div>
                  </div>
                  <div className="text-sm">
                    <div className="text-gold font-medium">Yesterday</div>
                    <div className="text-gray-400">Completed workout • Updated weight</div>
                  </div>
                  <div className="text-sm">
                    <div className="text-gold font-medium">2 days ago</div>
                    <div className="text-gray-400">Set new personal record</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Posts */}
          <div className="card mt-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Calendar className="mr-2 h-6 w-6 text-gold" />
              My Posts
            </h2>

            <div className="space-y-6">
              {userPosts.map(post => (
                <div key={post.id} className="p-4 bg-white/5 rounded-lg border border-gray-700">
                  <div className="flex items-start space-x-4">
                    <img
                      src={user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400'}
                      alt={user?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-white">{user?.name}</span>
                        <span className="text-gray-400 text-sm">{timeAgo(post.timestamp)}</span>
                      </div>
                      
                      <p className="text-gray-300 mb-3">{post.content}</p>
                      
                      {post.image && (
                        <img
                          src={post.image}
                          alt="Post"
                          className="w-full max-w-md h-64 object-cover rounded-lg mb-3"
                        />
                      )}
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="hover:text-gold cursor-pointer">
                          ❤️ {post.likes} likes
                        </span>
                        <span className="hover:text-gold cursor-pointer">
                          💬 {post.comments} comments
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Goal Modal */}
      {showGoalModal && (
        <GoalModal
          onClose={() => setShowGoalModal(false)}
          onSave={handleAddGoal}
        />
      )}
    </div>
  );
};

export default Profile;