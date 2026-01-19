import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Bell, X, Check, MessageSquare, Calendar, UserPlus, FileText, AlertCircle } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";

interface Notification {
  id: string;
  type: 'message' | 'interview' | 'candidate' | 'system' | 'alert';
  title: string;
  message: string;
  time: string;
  read: boolean;
  targetView?: string; // Add navigation target
}

interface NotificationsProps {
  onNavigate: (view: string) => void;
}

export function Notifications({ onNavigate }: NotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'candidate',
      title: 'New Candidate Applied',
      message: 'Sarah Johnson applied for Senior ML Engineer',
      time: '5m ago',
      read: false,
      targetView: 'candidates',
    },
    {
      id: '2',
      type: 'interview',
      title: 'Interview Scheduled',
      message: 'Interview with Dr. Emily Chen tomorrow at 2:00 PM',
      time: '1h ago',
      read: false,
      targetView: 'calendar',
    },
    {
      id: '3',
      type: 'message',
      title: 'Candidate Responded',
      message: 'Michael Zhang replied to your outreach message',
      time: '3h ago',
      read: false,
      targetView: 'communication',
    },
    {
      id: '4',
      type: 'system',
      title: 'Bias Alert',
      message: 'Low diversity in interview pipeline - Review recommended',
      time: '5h ago',
      read: true,
      targetView: 'bias',
    },
    {
      id: '5',
      type: 'alert',
      title: 'Offer Expiring Soon',
      message: 'Offer to John Doe expires in 2 days',
      time: '1d ago',
      read: true,
      targetView: 'candidates',
    },
  ]);

  const [open, setOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.targetView) {
      onNavigate(notification.targetView);
      setOpen(false);
    }
  };

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

  const getIcon = (type: string) => {
    switch (type) {
      case 'message': return <MessageSquare className="size-4" />;
      case 'interview': return <Calendar className="size-4" />;
      case 'candidate': return <UserPlus className="size-4" />;
      case 'system': return <FileText className="size-4" />;
      case 'alert': return <AlertCircle className="size-4" />;
      default: return <Bell className="size-4" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'message': return 'bg-blue-100 text-blue-600';
      case 'interview': return 'bg-purple-100 text-purple-600';
      case 'candidate': return 'bg-emerald-100 text-emerald-600';
      case 'system': return 'bg-gray-100 text-gray-600';
      case 'alert': return 'bg-amber-100 text-amber-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="size-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 size-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h3 className="text-gray-900">Notifications</h3>
            <p className="text-xs text-gray-500">{unreadCount} unread</p>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                <Check className="size-4 mr-2" />
                Mark all read
              </Button>
            )}
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Bell className="size-12 mx-auto mb-2 text-gray-400" />
              <p className="text-sm">No notifications</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b hover:bg-gray-50 transition-colors cursor-pointer ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-start gap-3">
                  <div className={`size-8 rounded-lg flex items-center justify-center flex-shrink-0 ${getColor(notification.type)}`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm text-gray-900">{notification.title}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-6 flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNotification(notification.id);
                        }}
                      >
                        <X className="size-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-500">{notification.time}</span>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs px-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(notification.id);
                          }}
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Footer */}
        <div className="p-3 border-t bg-gray-50">
          <Button 
            variant="outline" 
            className="w-full" 
            size="sm"
            onClick={() => {
              onNavigate('notifications');
              setOpen(false);
            }}
          >
            View All Notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}