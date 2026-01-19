import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Bell, 
  Check, 
  CheckCheck, 
  MessageSquare, 
  Calendar, 
  UserPlus, 
  FileText, 
  AlertCircle,
  Trash2,
  Filter,
  Download
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'message' | 'interview' | 'candidate' | 'system' | 'alert';
  title: string;
  message: string;
  time: string;
  read: boolean;
  targetView?: string;
  date: string;
}

interface NotificationsViewProps {
  onNavigate?: (view: string) => void;
}

export function NotificationsView({ onNavigate }: NotificationsViewProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'candidate',
      title: 'New Candidate Applied',
      message: 'Sarah Johnson applied for Senior ML Engineer position',
      time: '5m ago',
      date: 'Nov 10, 2025',
      read: false,
      targetView: 'candidates',
    },
    {
      id: '2',
      type: 'interview',
      title: 'Interview Scheduled',
      message: 'Interview with Dr. Emily Chen tomorrow at 2:00 PM',
      time: '1h ago',
      date: 'Nov 10, 2025',
      read: false,
      targetView: 'calendar',
    },
    {
      id: '3',
      type: 'message',
      title: 'Candidate Responded',
      message: 'Michael Zhang replied to your outreach message',
      time: '3h ago',
      date: 'Nov 10, 2025',
      read: false,
      targetView: 'communication',
    },
    {
      id: '4',
      type: 'system',
      title: 'Bias Alert',
      message: 'Low diversity in interview pipeline - Review recommended',
      time: '5h ago',
      date: 'Nov 10, 2025',
      read: true,
      targetView: 'bias',
    },
    {
      id: '5',
      type: 'alert',
      title: 'Offer Expiring Soon',
      message: 'Offer to John Doe expires in 2 days',
      time: '1d ago',
      date: 'Nov 9, 2025',
      read: true,
      targetView: 'candidates',
    },
    {
      id: '6',
      type: 'candidate',
      title: 'Candidate Status Update',
      message: 'James Liu moved to "Interview" stage',
      time: '1d ago',
      date: 'Nov 9, 2025',
      read: true,
      targetView: 'candidates',
    },
    {
      id: '7',
      type: 'interview',
      title: 'Interview Completed',
      message: 'Interview feedback submitted for Alex Rivera',
      time: '2d ago',
      date: 'Nov 8, 2025',
      read: true,
      targetView: 'calendar',
    },
    {
      id: '8',
      type: 'system',
      title: 'System Update',
      message: 'AI matching algorithm updated with improved accuracy',
      time: '3d ago',
      date: 'Nov 7, 2025',
      read: true,
    },
    {
      id: '9',
      type: 'alert',
      title: 'High Priority',
      message: '5 candidates require response within 24 hours',
      time: '3d ago',
      date: 'Nov 7, 2025',
      read: true,
      targetView: 'candidates',
    },
    {
      id: '10',
      type: 'message',
      title: 'New Message',
      message: 'Priya Sharma asked about team structure',
      time: '4d ago',
      date: 'Nov 6, 2025',
      read: true,
      targetView: 'communication',
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const allNotifications = notifications;
  const unreadNotifications = notifications.filter(n => !n.read);
  const candidateNotifications = notifications.filter(n => n.type === 'candidate');
  const interviewNotifications = notifications.filter(n => n.type === 'interview');
  const messageNotifications = notifications.filter(n => n.type === 'message');

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.targetView && onNavigate) {
      onNavigate(notification.targetView);
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

  const deleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'message': return <MessageSquare className="size-5" />;
      case 'interview': return <Calendar className="size-5" />;
      case 'candidate': return <UserPlus className="size-5" />;
      case 'system': return <FileText className="size-5" />;
      case 'alert': return <AlertCircle className="size-5" />;
      default: return <Bell className="size-5" />;
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

  const renderNotificationList = (notificationsList: Notification[]) => {
    if (notificationsList.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <Bell className="size-16 mb-4 text-gray-300" />
          <p className="text-lg">No notifications</p>
          <p className="text-sm mt-1">You're all caught up!</p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {notificationsList.map((notification) => (
          <Card
            key={notification.id}
            className={`p-5 hover:shadow-md transition-all cursor-pointer ${
              !notification.read ? 'bg-blue-50/50 border-blue-200' : ''
            }`}
            onClick={() => handleNotificationClick(notification)}
          >
            <div className="flex items-start gap-4">
              <div className={`size-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getColor(notification.type)}`}>
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h4 className="text-gray-900 mb-1">{notification.title}</h4>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                  </div>
                  {!notification.read && (
                    <div className="size-2.5 bg-blue-600 rounded-full flex-shrink-0 mt-1.5"></div>
                  )}
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{notification.time}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{notification.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notification.id);
                        }}
                      >
                        <Check className="size-3 mr-1" />
                        Mark read
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 text-gray-400 hover:text-red-600"
                      onClick={(e) => deleteNotification(notification.id, e)}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Notifications</h1>
          <p className="text-sm text-gray-600 mt-1">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Filter className="size-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="size-4 mr-2" />
            Export
          </Button>
          {unreadCount > 0 && (
            <Button onClick={markAllAsRead} className="bg-blue-600 hover:bg-blue-700">
              <CheckCheck className="size-4 mr-2" />
              Mark All Read
            </Button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total</p>
            <Bell className="size-5 text-gray-400" />
          </div>
          <h3 className="text-2xl text-gray-900">{notifications.length}</h3>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Unread</p>
            <div className="size-2 bg-blue-600 rounded-full"></div>
          </div>
          <h3 className="text-2xl text-blue-600">{unreadCount}</h3>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Candidates</p>
            <UserPlus className="size-5 text-emerald-600" />
          </div>
          <h3 className="text-2xl text-gray-900">{candidateNotifications.length}</h3>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Interviews</p>
            <Calendar className="size-5 text-purple-600" />
          </div>
          <h3 className="text-2xl text-gray-900">{interviewNotifications.length}</h3>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Messages</p>
            <MessageSquare className="size-5 text-blue-600" />
          </div>
          <h3 className="text-2xl text-gray-900">{messageNotifications.length}</h3>
        </Card>
      </div>

      {/* Notifications List with Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">
            All
            {notifications.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {notifications.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-blue-600">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="candidates">
            Candidates
            {candidateNotifications.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {candidateNotifications.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="interviews">
            Interviews
            {interviewNotifications.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {interviewNotifications.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="messages">
            Messages
            {messageNotifications.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {messageNotifications.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {renderNotificationList(allNotifications)}
        </TabsContent>

        <TabsContent value="unread" className="mt-6">
          {renderNotificationList(unreadNotifications)}
        </TabsContent>

        <TabsContent value="candidates" className="mt-6">
          {renderNotificationList(candidateNotifications)}
        </TabsContent>

        <TabsContent value="interviews" className="mt-6">
          {renderNotificationList(interviewNotifications)}
        </TabsContent>

        <TabsContent value="messages" className="mt-6">
          {renderNotificationList(messageNotifications)}
        </TabsContent>
      </Tabs>
    </div>
  );
}