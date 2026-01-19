import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { 
  Bell, 
  UserPlus, 
  Calendar, 
  MessageSquare, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  X
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'candidate' | 'interview' | 'message' | 'system' | 'achievement';
  title: string;
  description: string;
  time: string;
  read: boolean;
  icon: any;
  color: string;
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'candidate',
      title: 'New candidate match',
      description: 'Dr. Sarah Chen - 97% match for Senior ML Engineer',
      time: '5 minutes ago',
      read: false,
      icon: UserPlus,
      color: 'text-blue-600'
    },
    {
      id: '2',
      type: 'interview',
      title: 'Interview scheduled',
      description: 'Technical interview with Michael Rodriguez tomorrow at 2 PM',
      time: '1 hour ago',
      read: false,
      icon: Calendar,
      color: 'text-purple-600'
    },
    {
      id: '3',
      type: 'message',
      title: 'Candidate response',
      description: 'Emily Watson replied to your outreach message',
      time: '2 hours ago',
      read: false,
      icon: MessageSquare,
      color: 'text-emerald-600'
    },
    {
      id: '4',
      type: 'achievement',
      title: 'Hiring goal achieved',
      description: 'You\'ve hired 5 candidates this month - 125% of target!',
      time: '3 hours ago',
      read: true,
      icon: TrendingUp,
      color: 'text-amber-600'
    },
    {
      id: '5',
      type: 'system',
      title: 'Bias check completed',
      description: 'All recent evaluations passed fairness review (94% score)',
      time: '5 hours ago',
      read: true,
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: '6',
      type: 'interview',
      title: 'Interview reminder',
      description: 'Interview with James Liu starts in 30 minutes',
      time: '6 hours ago',
      read: true,
      icon: AlertCircle,
      color: 'text-red-600'
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <Card className="w-96 shadow-lg">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Bell className="size-5 text-gray-700" />
            <h3 className="text-gray-900">Notifications</h3>
          </div>
          {unreadCount > 0 && (
            <Badge className="bg-blue-600 text-white">{unreadCount}</Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs text-blue-600 hover:text-blue-700 px-0"
            onClick={markAllAsRead}
          >
            Mark all as read
          </Button>
        )}
      </div>

      <ScrollArea className="h-[500px]">
        <div className="p-2">
          {notifications.map((notification, index) => {
            const Icon = notification.icon;
            return (
              <div key={notification.id}>
                <div 
                  className={`p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`size-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`size-5 ${notification.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-sm text-gray-900">{notification.title}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="size-6 p-0 -mt-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(notification.id);
                          }}
                        >
                          <X className="size-3 text-gray-400" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{notification.description}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">{notification.time}</p>
                        {!notification.read && (
                          <div className="size-2 bg-blue-600 rounded-full" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {index < notifications.length - 1 && (
                  <Separator className="my-2" />
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {notifications.length === 0 && (
        <div className="p-8 text-center">
          <Bell className="size-12 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">No notifications</p>
        </div>
      )}
    </Card>
  );
}
