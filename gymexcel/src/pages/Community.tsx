import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Image, Send, Users, TrendingUp, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
}

interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
}

const Community: React.FC = () => {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: {
        id: '2',
        name: '山田 花子',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      content: 'Just completed my first marathon! 🏃‍♀️ 42.2km in 4:15:30. The training was tough but so worth it. Thank you everyone for the support! 💪',
      image: 'https://images.pexels.com/photos/2402926/pexels-photo-2402926.jpeg?auto=compress&cs=tinysrgb&w=600',
      timestamp: '2024-01-20T10:30:00Z',
      likes: 24,
      isLiked: false,
      comments: [
        {
          id: '1',
          author: {
            id: '3',
            name: '佐藤 太郎',
            avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400'
          },
          content: 'Congratulations! That\'s amazing! 🎉',
          timestamp: '2024-01-20T10:35:00Z'
        }
      ]
    },
    {
      id: '2',
      author: {
        id: '3',
        name: '佐藤 太郎',
        avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      content: 'Healthy meal prep for the week! 🥗 Grilled chicken, quinoa, and lots of veggies. Consistency is key to reaching our fitness goals!',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
      timestamp: '2024-01-19T18:45:00Z',
      likes: 18,
      isLiked: true,
      comments: [
        {
          id: '2',
          author: {
            id: '2',
            name: '山田 花子',
            avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400'
          },
          content: 'This looks delicious! Can you share the recipe?',
          timestamp: '2024-01-19T19:00:00Z'
        }
      ]
    },
    {
      id: '3',
      author: {
        id: '4',
        name: 'リー アン',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      content: 'New personal record at the gym today! 💪 Deadlifted 120kg × 5 reps. Small progress is still progress. What\'s your latest achievement?',
      timestamp: '2024-01-19T14:20:00Z',
      likes: 31,
      isLiked: false,
      comments: []
    }
  ]);

  const [newPost, setNewPost] = useState('');
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});

  const timeAgo = (dateString: string) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const handleCreatePost = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      author: {
        id: user?.id || '',
        name: user?.name || '',
        avatar: user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      content: newPost,
      timestamp: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      comments: []
    };

    setPosts([post, ...posts]);
    setNewPost('');
    setShowImageUpload(false);

    addNotification({
      type: 'success',
      title: 'Post Created!',
      message: 'Your post has been shared with the community.'
    });
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleComment = (postId: string) => {
    const commentContent = newComment[postId]?.trim();
    if (!commentContent) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        id: user?.id || '',
        name: user?.name || '',
        avatar: user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400'
      },
      content: commentContent,
      timestamp: new Date().toISOString()
    };

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, comment]
        };
      }
      return post;
    }));

    setNewComment({ ...newComment, [postId]: '' });
    
    addNotification({
      type: 'success',
      title: 'Comment Added!',
      message: 'Your comment has been posted.'
    });
  };

  const suggestedUsers = [
    {
      id: '5',
      name: '田中 健太',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      mutual: 3
    },
    {
      id: '6',
      name: 'エミリー ジョンソン',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=400',
      mutual: 7
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Community Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold gold-text mb-2">Fitness Community</h1>
            <p className="text-gray-400">Connect, inspire, and achieve your goals together</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Feed */}
            <div className="lg:col-span-3 space-y-6">
              {/* Create Post */}
              <div className="card">
                <div className="flex items-start space-x-4">
                  <img
                    src={user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400'}
                    alt={user?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  
                  <div className="flex-1">
                    <textarea
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="form-input min-h-[100px] resize-none"
                      placeholder="Share your fitness journey, achievements, or ask for advice..."
                      onFocus={() => setShowImageUpload(true)}
                    />
                    
                    {showImageUpload && (
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                            <Image className="mr-2 h-4 w-4" />
                            Add Photo
                          </button>
                          <span className="text-sm text-gray-400">Share your progress photos!</span>
                        </div>
                        
                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={() => {
                              setNewPost('');
                              setShowImageUpload(false);
                            }}
                            className="btn-secondary"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleCreatePost}
                            className="btn-primary flex items-center"
                            disabled={!newPost.trim()}
                          >
                            <Send className="mr-2 h-4 w-4" />
                            Post
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Posts */}
              {posts.map(post => (
                <div key={post.id} className="card">
                  {/* Post Header */}
                  <div className="flex items-center space-x-3 mb-4">
                    <Link to={`/user/${post.author.id}`}>
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-12 h-12 rounded-full object-cover hover:ring-2 hover:ring-gold transition-all"
                      />
                    </Link>
                    <div className="flex-1">
                      <Link 
                        to={`/user/${post.author.id}`}
                        className="font-semibold text-white hover:text-gold transition-colors"
                      >
                        {post.author.name}
                      </Link>
                      <div className="text-sm text-gray-400">{timeAgo(post.timestamp)}</div>
                    </div>
                    <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                      <Share className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>

                  {/* Post Content */}
                  <p className="text-gray-300 mb-4">{post.content}</p>

                  {/* Post Image */}
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post content"
                      className="w-full h-80 object-cover rounded-lg mb-4"
                    />
                  )}

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="flex items-center space-x-6">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center space-x-2 transition-colors ${
                          post.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
                        <span>{post.likes}</span>
                      </button>
                      
                      <button
                        onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                        className="flex items-center space-x-2 text-gray-400 hover:text-gold transition-colors"
                      >
                        <MessageCircle className="h-5 w-5" />
                        <span>{post.comments.length}</span>
                      </button>
                    </div>
                  </div>

                  {/* Comments Section */}
                  {expandedPost === post.id && (
                    <div className="mt-4 pt-4 border-t border-gray-700 space-y-4">
                      {/* Existing Comments */}
                      {post.comments.map(comment => (
                        <div key={comment.id} className="flex items-start space-x-3">
                          <img
                            src={comment.author.avatar}
                            alt={comment.author.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="flex-1 bg-gray-800 rounded-lg p-3">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-white text-sm">{comment.author.name}</span>
                              <span className="text-xs text-gray-400">{timeAgo(comment.timestamp)}</span>
                            </div>
                            <p className="text-gray-300 text-sm">{comment.content}</p>
                          </div>
                        </div>
                      ))}

                      {/* Add Comment */}
                      <div className="flex items-start space-x-3">
                        <img
                          src={user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400'}
                          alt={user?.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1 flex space-x-2">
                          <input
                            type="text"
                            value={newComment[post.id] || ''}
                            onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
                            className="form-input flex-1 py-2"
                            placeholder="Write a comment..."
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleComment(post.id);
                              }
                            }}
                          />
                          <button
                            onClick={() => handleComment(post.id)}
                            className="btn-primary px-4"
                            disabled={!newComment[post.id]?.trim()}
                          >
                            <Send className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Community Stats */}
              <div className="card">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-gold" />
                  Community Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Members</span>
                    <span className="text-gold font-bold">2,547</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Active Today</span>
                    <span className="text-gold font-bold">432</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Posts Today</span>
                    <span className="text-gold font-bold">89</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Goals Achieved</span>
                    <span className="text-gold font-bold">156</span>
                  </div>
                </div>
              </div>

              {/* Suggested Users */}
              <div className="card">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Users className="mr-2 h-5 w-5 text-gold" />
                  People You May Know
                </h3>
                <div className="space-y-4">
                  {suggestedUsers.map(suggestedUser => (
                    <div key={suggestedUser.id} className="flex items-center space-x-3">
                      <Link to={`/user/${suggestedUser.id}`}>
                        <img
                          src={suggestedUser.avatar}
                          alt={suggestedUser.name}
                          className="w-10 h-10 rounded-full object-cover hover:ring-2 hover:ring-gold transition-all"
                        />
                      </Link>
                      <div className="flex-1">
                        <Link 
                          to={`/user/${suggestedUser.id}`}
                          className="font-medium text-white hover:text-gold transition-colors block"
                        >
                          {suggestedUser.name}
                        </Link>
                        <div className="text-xs text-gray-400">
                          {suggestedUser.mutual} mutual connections
                        </div>
                      </div>
                      <button className="p-1 text-gold hover:bg-gold/10 rounded transition-colors">
                        <UserPlus className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card">
                <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Link to="/goals" className="block btn-secondary w-full text-center">
                    View My Goals
                  </Link>
                  <Link to="/challenges" className="block btn-secondary w-full text-center">
                    Join Challenge
                  </Link>
                  <Link to="/recipes" className="block btn-secondary w-full text-center">
                    Browse Recipes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;