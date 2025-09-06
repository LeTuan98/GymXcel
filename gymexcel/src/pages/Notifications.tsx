import React, { useState } from 'react';
import { Bell, Check, Trash2, Heart, MessageCircle, Target, Award, Users, Settings } from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';

interface NotificationItem {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'goal' | 'achievement' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  avatar?: string;
}

const Notifications: React.FC = () => {
  const { addNotification } = useNotification();
  
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      type: 'like',
      title: '山田 花子 liked your post',
      message: 'Your post "Just completed my morning workout!" received a like',
      timestamp: '2024-01-20T14:30:00Z',
      isRead: false,
      actionUrl: '/community',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      type: 'goal',
      title: 'Goal Progress Update',
      message: 'You\'re 85% towards your weight loss goal! Keep it up!',
      timestamp: '2024-01-20T10:00:00Z',
      isRead: false,
      actionUrl: '/goals'
    },
    {
      id: '3',
      type: 'comment',
      title: '佐藤 太郎 commented on your post',
      message: '"Great job on your marathon! Inspiring stuff 💪"',
      timestamp: '2024-01-20T08:45:00Z',
      isRead: true,
      actionUrl: '/community',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '4',
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: 'You\'ve earned the "7-Day Streak" badge for consistent meal logging',
      timestamp: '2024-01-19T20:00:00Z',
      isRead: true,
      actionUrl: '/profile'
    },
    {
      id: '5',
      type: 'follow',
      title: 'New Follower',
      message: 'リー アン started following you',
      timestamp: '2024-01-19T16:20:00Z',
      isRead: true,
      actionUrl: '/user/4',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '6',
      type: 'system',
      title: 'Weekly Report Available',
      message: 'Your fitness analytics for this week are ready to view',
      timestamp: '2024-01-19T12:00:00Z',
      isRead: true,
      actionUrl: '/analytics'
    },
    {
      id: '7',
      type: 'goal',
      title: 'Goal Reminder',
      message: 'Don\'t forget to log your daily water intake!',
      timestamp: '2024-01-19T09:00:00Z',
      isRead: true,
      actionUrl: '/dashboard'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'likes' | 'comments' | 'goals' | 'achievements'>('all');

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="h-5 w-5 text-red-500" />;
      case 'comment':
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
      case 'follow':
        return <Users className="h-5 w-5 text-purple-500" />;
      case 'goal':
        return <Target className="h-5 w-5 text-gold" />;
      case 'achievement':
        return <Award className="h-5 w-5 text-green-500" />;
      case 'system':
        return <Settings className="h-5 w-5 text-gray-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const timeAgo = (timestamp: string) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - notificationTime.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return notificationTime.toLocaleDateString('ja-JP');
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, isRead: true })));
    addNotification({
      type: 'success',
      title: 'All notifications marked as read',
      message: 'Your notification list has been updated.'
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    addNotification({
      type: 'info',
      title: 'Notification deleted',
      message: 'The notification has been removed.'
    });
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'likes') return notification.type === 'like';
    if (filter === 'comments') return notification.type === 'comment';
    if (filter === 'goals') return notification.type === 'goal';
    if (filter === 'achievements') return notification.type === 'achievement';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'unread', label: `Unread (${unreadCount})` },
    { key: 'likes', label: 'Likes' },
    { key: 'comments', label: 'Comments' },
    { key: 'goals', label: 'Goals' },
    { key: 'achievements', label: 'Achievements' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold gold-text mb-2 flex items-center">
                <Bell className="mr-3 h-8 w-8" />
                Notifications
              </h1>
              <p className="text-gray-400">Stay updated with your fitness journey</p>
            </div>
            
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="btn-primary mt-4 md:mt-0 flex items-center"
              >
                <Check className="mr-2 h-4 w-4" />
                Mark All Read
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.map(filterOption => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  filter === filterOption.key
                    ? 'bg-gold text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.map(notification => (
              <div
                key={notification.id}
                className={`card transition-all duration-200 ${
                  !notification.isRead ? 'border-gold/40 bg-gold/5' : 'border-gray-700'
                }`}
              >
                <div className="flex items-start space-x-4">
                  {/* Avatar or Icon */}
                  <div className="flex-shrink-0">
                    {notification.avatar ? (
                      <img
                        src={notification.avatar}
                        alt="User avatar"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                        {getIcon(notification.type)}
                      </div>
                    )}
                    {!notification.isRead && (
                      <div className="w-3 h-3 bg-gold rounded-full absolute -mt-1 ml-9"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className={`font-semibold ${notification.isRead ? 'text-gray-300' : 'text-white'}`}>
                          {notification.title}
                        </h3>
                        <p className={`text-sm mt-1 ${notification.isRead ? 'text-gray-500' : 'text-gray-400'}`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-600 mt-2 flex items-center">
                          {getIcon(notification.type)}
                          <span className="ml-2">{timeAgo(notification.timestamp)}</span>
                        </p>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center space-x-2 ml-4">
                        {!notification.isRead && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-2 text-gold hover:bg-gold/10 rounded-lg transition-colors"
                            title="Mark as read"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete notification"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Action Button */}
                    {notification.actionUrl && (
                      <div className="mt-3">
                        <a
                          href={notification.actionUrl}
                          className="inline-flex items-center text-sm text-gold hover:text-yellow-400 transition-colors"
                        >
                          View Details →
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredNotifications.length === 0 && (
            <div className="text-center py-12">
              <Bell className="mx-auto h-16 w-16 text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                {filter === 'unread' ? 'No unread notifications' : 'No notifications found'}
              </h3>
              <p className="text-gray-500">
                {filter === 'unread' 
                  ? 'You\'re all caught up! Check back later for updates.'
                  : 'Try adjusting your filter to see more notifications.'
                }
              </p>
            </div>
          )}

          {/* Notification Settings */}
          <div className="card mt-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Settings className="mr-2 h-5 w-5 text-gold" />
              Notification Settings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-300 mb-3">Social Notifications</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3 text-gold" defaultChecked />
                    <span className="text-gray-400">Likes on posts</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3 text-gold" defaultChecked />
                    <span className="text-gray-400">Comments on posts</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3 text-gold" defaultChecked />
                    <span className="text-gray-400">New followers</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-300 mb-3">Fitness Notifications</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3 text-gold" defaultChecked />
                    <span className="text-gray-400">Goal progress updates</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3 text-gold" defaultChecked />
                    <span className="text-gray-400">Achievement unlocks</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3 text-gold" defaultChecked />
                    <span className="text-gray-400">Daily reminders</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-700">
              <button className="btn-primary">
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;