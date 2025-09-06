import React from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, UserPlus, MessageCircle, Calendar, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserProfile: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock user data - in real app, this would be fetched based on id
  const profileUser = {
    id: id || '2',
    name: '山田 花子',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Marathon runner and fitness enthusiast. Love sharing healthy recipes and workout tips! 🏃‍♀️💪',
    joinDate: '2023-05-15',
    stats: {
      posts: 127,
      followers: 1240,
      following: 389,
      goals: 8
    },
    goals: [
      {
        id: '1',
        title: 'Marathon Training',
        progress: 85,
        target: '42.2 km'
      },
      {
        id: '2',
        title: 'Weight Management',
        progress: 70,
        target: '58 kg'
      }
    ],
    recentPosts: [
      {
        id: '1',
        content: 'Just completed my first marathon! 🏃‍♀️ 42.2km in 4:15:30. The training was tough but so worth it. Thank you everyone for the support! 💪',
        image: 'https://images.pexels.com/photos/2402926/pexels-photo-2402926.jpeg?auto=compress&cs=tinysrgb&w=600',
        timestamp: '2024-01-20T10:30:00Z',
        likes: 24,
        comments: 8
      },
      {
        id: '2',
        content: 'Pre-marathon fuel! 🍌🥖 Simple but effective breakfast before the big race.',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
        timestamp: '2024-01-20T06:00:00Z',
        likes: 18,
        comments: 5
      },
      {
        id: '3',
        content: 'Week 16 of marathon training complete! Consistency is key 🗝️ Even when motivation is low, just show up.',
        timestamp: '2024-01-18T19:15:00Z',
        likes: 31,
        comments: 12
      }
    ]
  };

  const timeAgo = (dateString: string) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-400 hover:text-gold transition-colors mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </button>

          {/* Profile Header */}
          <div className="card mb-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Avatar */}
              <img
                src={profileUser.avatar}
                alt={profileUser.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-gold"
              />

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{profileUser.name}</h1>
                    <p className="text-gray-300 mb-2">{profileUser.bio}</p>
                    <p className="text-sm text-gold flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      Member since {formatDate(profileUser.joinDate)}
                    </p>
                  </div>
                  
                  <div className="flex space-x-3 mt-4 sm:mt-0">
                    <button className="btn-primary flex items-center">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Follow
                    </button>
                    <button className="btn-secondary flex items-center">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Message
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-gold">{profileUser.stats.posts}</div>
                    <div className="text-sm text-gray-400">Posts</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-gold">{profileUser.stats.followers}</div>
                    <div className="text-sm text-gray-400">Followers</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-gold">{profileUser.stats.following}</div>
                    <div className="text-sm text-gray-400">Following</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-gold">{profileUser.stats.goals}</div>
                    <div className="text-sm text-gray-400">Goals</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Goals Section */}
            <div className="lg:col-span-1">
              <div className="card">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Target className="mr-2 h-5 w-5 text-gold" />
                  Current Goals
                </h2>

                <div className="space-y-4">
                  {profileUser.goals.map(goal => (
                    <div key={goal.id} className="p-4 bg-white/5 rounded-lg border border-gold/20">
                      <h3 className="font-semibold text-white mb-2">{goal.title}</h3>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Target: {goal.target}</span>
                        <span className="text-gold font-bold">{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-gold to-yellow-400 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Posts Section */}
            <div className="lg:col-span-2">
              <div className="card">
                <h2 className="text-xl font-bold text-white mb-6">Recent Posts</h2>

                <div className="space-y-6">
                  {profileUser.recentPosts.map(post => (
                    <div key={post.id} className="p-4 bg-white/5 rounded-lg border border-gray-700">
                      <div className="flex items-start space-x-4">
                        <img
                          src={profileUser.avatar}
                          alt={profileUser.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-semibold text-white">{profileUser.name}</span>
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

                {/* Load More */}
                <div className="text-center mt-6">
                  <button className="btn-secondary">
                    Load More Posts
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;