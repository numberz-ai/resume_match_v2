import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Clock, 
  Eye, 
  UserPlus, 
  Mail, 
  Calendar, 
  FileText, 
  MessageSquare,
  CheckCircle,
  Edit
} from 'lucide-react';

interface Activity {
  id: string;
  type: 'view' | 'status_change' | 'email' | 'interview' | 'note' | 'upload' | 'edit';
  user: string;
  action: string;
  timestamp: Date;
  icon: any;
  color: string;
}

export function ActivityTimeline() {
  // Generate recent dates relative to now to ensure they're never expired
  const now = new Date();
  const getRecentDate = (hoursAgo: number) => {
    const date = new Date(now);
    date.setHours(date.getHours() - hoursAgo);
    return date;
  };

  const activities: Activity[] = [
    {
      id: '1',
      type: 'status_change',
      user: 'John Smith',
      action: 'moved candidate to Interview stage',
      timestamp: getRecentDate(2), // 2 hours ago
      icon: CheckCircle,
      color: 'text-emerald-600'
    },
    {
      id: '2',
      type: 'note',
      user: 'Sarah Johnson',
      action: 'added a comment',
      timestamp: getRecentDate(5), // 5 hours ago
      icon: MessageSquare,
      color: 'text-blue-600'
    },
    {
      id: '3',
      type: 'interview',
      user: 'Mike Chen',
      action: 'scheduled technical interview',
      timestamp: getRecentDate(8), // 8 hours ago
      icon: Calendar,
      color: 'text-purple-600'
    },
    {
      id: '4',
      type: 'email',
      user: 'John Smith',
      action: 'sent outreach email',
      timestamp: getRecentDate(24), // 1 day ago
      icon: Mail,
      color: 'text-amber-600'
    },
    {
      id: '5',
      type: 'view',
      user: 'Emily Watson',
      action: 'viewed candidate profile',
      timestamp: getRecentDate(26), // ~1 day ago
      icon: Eye,
      color: 'text-gray-600'
    },
    {
      id: '6',
      type: 'upload',
      user: 'System',
      action: 'uploaded resume and parsed data',
      timestamp: getRecentDate(48), // 2 days ago
      icon: FileText,
      color: 'text-indigo-600'
    },
    {
      id: '7',
      type: 'status_change',
      user: 'John Smith',
      action: 'added candidate to talent pool',
      timestamp: getRecentDate(50), // ~2 days ago
      icon: UserPlus,
      color: 'text-green-600'
    },
  ];

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMins = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / 3600000);
    const diffInDays = Math.floor(diffInMs / 86400000);

    if (diffInMins < 60) return `${diffInMins} minutes ago`;
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${diffInDays} days ago`;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="size-5 text-gray-700" />
        <h3 className="text-gray-900">Activity Timeline</h3>
        <Badge variant="secondary" className="text-xs">{activities.length}</Badge>
      </div>

      <div className="space-y-4 max-h-[500px] overflow-y-auto">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex gap-3">
              <div className="flex flex-col items-center pt-1">
                <div className={`size-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`size-4 ${activity.color}`} />
                </div>
                {index < activities.length - 1 && (
                  <div className="w-0.5 h-full bg-gray-200 mt-2" />
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {getTimeAgo(activity.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
