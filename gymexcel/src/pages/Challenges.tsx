import React, { useState } from 'react';
import { Trophy, Users, Calendar, Target, Star, Play, Check, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

interface Challenge {
  id: string;
  title: string;
  description: string;
  image: string;
  type: 'daily' | 'weekly' | 'monthly';
  category: 'cardio' | 'strength' | 'flexibility' | 'nutrition' | 'habit';
  target: number;
  unit: string;
  participants: number;
  duration: number; // in days
  startDate: string;
  endDate: string;
  rewards: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  isJoined: boolean;
  progress: number;
}

const Challenges: React.FC = () => {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '1',
      title: '30-Day Push-up Challenge',
      description: 'Build upper body strength with progressive push-up training',
      image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'monthly',
      category: 'strength',
      target: 1000,
      unit: 'push-ups',
      participants: 1247,
      duration: 30,
      startDate: '2024-01-15',
      endDate: '2024-02-14',
      rewards: ['Champion Badge', '50 XP', 'Strength Master Title'],
      difficulty: 'Intermediate',
      isJoined: true,
      progress: 45
    },
    {
      id: '2',
      title: 'Daily Water Intake',
      description: 'Stay hydrated by drinking 2L of water every day this week',
      image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'weekly',
      category: 'habit',
      target: 14,
      unit: 'liters',
      participants: 3421,
      duration: 7,
      startDate: '2024-01-20',
      endDate: '2024-01-27',
      rewards: ['Hydration Hero Badge', '25 XP'],
      difficulty: 'Beginner',
      isJoined: true,
      progress: 71
    },
    {
      id: '3',
      title: '10K Steps Daily',
      description: 'Walk 10,000 steps every day to improve cardiovascular health',
      image: 'https://images.pexels.com/photos/2402926/pexels-photo-2402926.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'daily',
      category: 'cardio',
      target: 10000,
      unit: 'steps',
      participants: 2156,
      duration: 30,
      startDate: '2024-01-10',
      endDate: '2024-02-09',
      rewards: ['Step Master Badge', '75 XP', 'Pedometer Champion'],
      difficulty: 'Beginner',
      isJoined: false,
      progress: 0
    },
    {
      id: '4',
      title: 'Flexibility & Mobility',
      description: '15 minutes of stretching every day to improve flexibility',
      image: 'https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'daily',
      category: 'flexibility',
      target: 15,
      unit: 'minutes',
      participants: 892,
      duration: 21,
      startDate: '2024-01-22',
      endDate: '2024-02-12',
      rewards: ['Flexibility Master', '40 XP'],
      difficulty: 'Beginner',
      isJoined: false,
      progress: 0
    },
    {
      id: '5',
      title: 'Protein Power Week',
      description: 'Meet your daily protein goals for 7 consecutive days',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'weekly',
      category: 'nutrition',
      target: 150,
      unit: 'grams/day',
      participants: 1567,
      duration: 7,
      startDate: '2024-01-25',
      endDate: '2024-02-01',
      rewards: ['Protein Pro Badge', '35 XP', 'Nutrition Expert'],
      difficulty: 'Intermediate',
      isJoined: false,
      progress: 0
    },
    {
      id: '6',
      title: 'Plank Endurance Challenge',
      description: 'Hold planks for increasing durations over 4 weeks',
      image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'monthly',
      category: 'strength',
      target: 300,
      unit: 'seconds',
      participants: 678,
      duration: 28,
      startDate: '2024-02-01',
      endDate: '2024-02-29',
      rewards: ['Core Champion', '60 XP', 'Endurance Master'],
      difficulty: 'Advanced',
      isJoined: false,
      progress: 0
    }
  ]);

  const categories = [
    { key: 'all', label: 'All Categories', icon: '🏆' },
    { key: 'cardio', label: 'Cardio', icon: '❤️' },
    { key: 'strength', label: 'Strength', icon: '💪' },
    { key: 'flexibility', label: 'Flexibility', icon: '🤸' },
    { key: 'nutrition', label: 'Nutrition', icon: '🥗' },
    { key: 'habit', label: 'Habits', icon: '✅' }
  ];

  const types = [
    { key: 'all', label: 'All Types' },
    { key: 'daily', label: 'Daily' },
    { key: 'weekly', label: 'Weekly' },
    { key: 'monthly', label: 'Monthly' }
  ];

  const filteredChallenges = challenges.filter(challenge => {
    const matchesCategory = selectedCategory === 'all' || challenge.category === selectedCategory;
    const matchesType = selectedType === 'all' || challenge.type === selectedType;
    return matchesCategory && matchesType;
  });

  const joinChallenge = (challengeId: string) => {
    setChallenges(challenges.map(challenge => {
      if (challenge.id === challengeId) {
        const updatedChallenge = { ...challenge, isJoined: true, participants: challenge.participants + 1 };
        
        addNotification({
          type: 'success',
          title: 'Challenge Joined! 🎯',
          message: `You've successfully joined "${challenge.title}". Good luck!`
        });
        
        return updatedChallenge;
      }
      return challenge;
    }));
  };

  const leaveChallenge = (challengeId: string) => {
    setChallenges(challenges.map(challenge => {
      if (challenge.id === challengeId) {
        return { 
          ...challenge, 
          isJoined: false, 
          participants: Math.max(0, challenge.participants - 1),
          progress: 0
        };
      }
      return challenge;
    }));
    
    addNotification({
      type: 'info',
      title: 'Left Challenge',
      message: 'You have left the challenge. You can join again anytime!'
    });
  };

  const updateProgress = (challengeId: string, newProgress: number) => {
    setChallenges(challenges.map(challenge => {
      if (challenge.id === challengeId) {
        const updatedChallenge = { ...challenge, progress: Math.min(100, newProgress) };
        
        if (updatedChallenge.progress === 100 && challenge.progress < 100) {
          addNotification({
            type: 'success',
            title: 'Challenge Completed! 🎉',
            message: `Congratulations! You've completed "${challenge.title}" and earned your rewards!`
          });
        }
        
        return updatedChallenge;
      }
      return challenge;
    }));
  };

  const difficultyColors = {
    Beginner: 'bg-green-500/20 text-green-400',
    Intermediate: 'bg-yellow-500/20 text-yellow-400',
    Advanced: 'bg-red-500/20 text-red-400'
  };

  const typeColors = {
    daily: 'bg-blue-500/20 text-blue-400',
    weekly: 'bg-purple-500/20 text-purple-400',
    monthly: 'bg-orange-500/20 text-orange-400'
  };

  const activeChallenges = challenges.filter(c => c.isJoined && c.progress < 100).length;
  const completedChallenges = challenges.filter(c => c.isJoined && c.progress === 100).length;
  const totalParticipants = challenges.reduce((sum, c) => sum + c.participants, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold gold-text mb-2">Fitness Challenges</h1>
            <p className="text-gray-400">Join challenges, compete with others, and achieve your goals</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card text-center">
              <Trophy className="mx-auto h-8 w-8 text-gold mb-2" />
              <div className="text-2xl font-bold text-gold mb-1">{activeChallenges}</div>
              <div className="text-sm text-gray-400">Active Challenges</div>
            </div>
            <div className="card text-center">
              <Award className="mx-auto h-8 w-8 text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400 mb-1">{completedChallenges}</div>
              <div className="text-sm text-gray-400">Completed</div>
            </div>
            <div className="card text-center">
              <Users className="mx-auto h-8 w-8 text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400 mb-1">{totalParticipants}</div>
              <div className="text-sm text-gray-400">Total Participants</div>
            </div>
            <div className="card text-center">
              <Star className="mx-auto h-8 w-8 text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400 mb-1">245</div>
              <div className="text-sm text-gray-400">XP Earned</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.key
                      ? 'bg-gold text-black'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.label}
                </button>
              ))}
            </div>
            
            <div className="flex gap-2">
              {types.map(type => (
                <button
                  key={type.key}
                  onClick={() => setSelectedType(type.key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedType === type.key
                      ? 'bg-gold text-black'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Challenges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map(challenge => (
              <div key={challenge.id} className="card relative">
                {/* Challenge Image */}
                <div className="relative h-48 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={challenge.image}
                    alt={challenge.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 flex gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${typeColors[challenge.type]}`}>
                      {challenge.type.charAt(0).toUpperCase() + challenge.type.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${difficultyColors[challenge.difficulty]}`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  {challenge.isJoined && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>

                {/* Challenge Info */}
                <h3 className="text-lg font-bold text-white mb-2">{challenge.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{challenge.description}</p>

                {/* Challenge Stats */}
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Target className="h-4 w-4 mr-1" />
                    <span>{challenge.target} {challenge.unit}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{challenge.participants}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{challenge.duration} days</span>
                  </div>
                </div>

                {/* Progress Bar (if joined) */}
                {challenge.isJoined && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Progress</span>
                      <span className="text-gold font-bold">{challenge.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-gold to-yellow-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${challenge.progress}%` }}
                      ></div>
                    </div>
                    {challenge.progress < 100 && (
                      <div className="flex space-x-2 mt-2">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={challenge.progress}
                          onChange={(e) => updateProgress(challenge.id, parseInt(e.target.value))}
                          className="flex-1"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Rewards */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gold mb-2">Rewards:</h4>
                  <div className="flex flex-wrap gap-1">
                    {challenge.rewards.map((reward, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gold/10 text-gold rounded text-xs"
                      >
                        {reward}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-auto">
                  {challenge.isJoined ? (
                    <div className="flex space-x-2">
                      {challenge.progress === 100 ? (
                        <div className="flex-1 bg-green-500/20 text-green-400 font-medium py-2 px-4 rounded-lg text-center">
                          <Award className="inline h-4 w-4 mr-1" />
                          Completed
                        </div>
                      ) : (
                        <button
                          onClick={() => leaveChallenge(challenge.id)}
                          className="flex-1 btn-secondary"
                        >
                          Leave Challenge
                        </button>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => joinChallenge(challenge.id)}
                      className="btn-primary w-full flex items-center justify-center"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Join Challenge
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredChallenges.length === 0 && (
            <div className="text-center py-12">
              <Trophy className="mx-auto h-16 w-16 text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No challenges found</h3>
              <p className="text-gray-500">Try adjusting your category or type filters</p>
            </div>
          )}

          {/* My Challenges Summary */}
          {activeChallenges > 0 && (
            <div className="card mt-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Trophy className="mr-2 h-6 w-6 text-gold" />
                My Active Challenges
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {challenges.filter(c => c.isJoined && c.progress < 100).map(challenge => (
                  <div key={challenge.id} className="p-4 bg-white/5 rounded-lg border border-gold/20">
                    <h3 className="font-semibold text-white mb-2">{challenge.title}</h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Progress</span>
                      <span className="text-gold font-bold">{challenge.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-gold to-yellow-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${challenge.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Challenges;