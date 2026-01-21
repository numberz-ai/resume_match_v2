import { useState, useEffect } from 'react';
import { mockCandidates, mockJobs } from '../data/mockData';
import { CandidateSearch } from './CandidateSearch';
import { searchCandidates } from '../api/cv.api';
import { getTotalCandidatesCount, updateTotalCandidatesCount } from '../utils/candidateCount';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { 
  Users, 
  Briefcase, 
  Target, 
  Clock, 
  Sparkles, 
  TrendingUp, 
  Calendar as CalendarIcon, 
  ChevronRight,
  Bell,
  CheckCircle,
  Check,
  Plus,
  X
} from 'lucide-react';

interface DashboardProps {
  onNavigateToCandidates: () => void;
}

export function Dashboard({ onNavigateToCandidates }: DashboardProps) {
  const [showAllReminders, setShowAllReminders] = useState(false);
  const [totalCandidates, setTotalCandidates] = useState(getTotalCandidatesCount());
  
  // Fetch candidates count on mount
  useEffect(() => {
    const fetchCandidatesCount = async () => {
      try {
        const response = await searchCandidates('');
        if (response.success && response.response_data) {
          const count = response.response_data.length;
          updateTotalCandidatesCount(count);
          setTotalCandidates(count);
        }
      } catch (error) {
        console.error('Error fetching candidates count:', error);
        // Use stored count if API fails
        setTotalCandidates(getTotalCandidatesCount());
      }
    };

    fetchCandidatesCount();

    // Listen for candidate count updates from other components
    const handleCountUpdate = (event: CustomEvent) => {
      setTotalCandidates(event.detail.count);
    };
    window.addEventListener('candidateCountUpdated', handleCountUpdate as EventListener);

    return () => {
      window.removeEventListener('candidateCountUpdated', handleCountUpdate as EventListener);
    };
  }, []);
  
  interface Reminder {
    id: string;
    type: 'interview' | 'follow-up' | 'deadline' | 'review';
    title: string;
    description: string;
    time: string;
    urgent: boolean;
    completed: boolean;
    candidateName?: string;
  }

  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      type: 'interview',
      title: 'Interview with Dr. Emily Chen',
      description: 'Technical interview for Senior ML Engineer position',
      time: 'Today at 2:00 PM',
      urgent: true,
      completed: false,
      candidateName: 'Dr. Emily Chen'
    },
    {
      id: '2',
      type: 'follow-up',
      title: 'Follow up with Sarah Johnson',
      description: 'Check application status and schedule next interview',
      time: 'Today at 4:30 PM',
      urgent: false,
      completed: false,
      candidateName: 'Sarah Johnson'
    },
    {
      id: '3',
      type: 'deadline',
      title: 'Offer expires for John Doe',
      description: 'Offer acceptance deadline in 2 days',
      time: 'Nov 12, 2025',
      urgent: true,
      completed: false,
      candidateName: 'John Doe'
    },
    {
      id: '4',
      type: 'review',
      title: 'Review new applications',
      description: '8 new candidates applied for Backend Engineer role',
      time: 'Tomorrow at 10:00 AM',
      urgent: false,
      completed: false
    },
    {
      id: '5',
      type: 'interview',
      title: 'Schedule interview with Marcus Lee',
      description: 'Second round technical assessment',
      time: 'Nov 11, 2025',
      urgent: false,
      completed: false,
      candidateName: 'Marcus Lee'
    }
  ]);

  const toggleReminderComplete = (id: string) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, completed: !r.completed } : r
    ));
  };

  const deleteReminder = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setReminders(reminders.filter(r => r.id !== id));
  };

  const getReminderIcon = (type: string) => {
    switch (type) {
      case 'interview': return CalendarIcon;
      case 'follow-up': return Bell;
      case 'deadline': return Clock;
      case 'review': return Users;
      default: return Bell;
    }
  };

  const getReminderColor = (type: string) => {
    switch (type) {
      case 'interview': return 'bg-purple-100 text-purple-600';
      case 'follow-up': return 'bg-green-100 text-green-600';
      case 'deadline': return 'bg-red-100 text-red-600';
      case 'review': return 'bg-emerald-100 text-emerald-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const stats = [
    {
      label: 'Total Candidates',
      value: totalCandidates,
      change: '+12%',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Open Jobs',
      value: mockJobs.filter(j => j.status === 'open').length,
      change: '+3',
      icon: Briefcase,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'High Match (90%+)',
      value: mockCandidates.filter(c => c.matchScore >= 90).length,
      change: '+25%',
      icon: Target,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      label: 'Active Interviews',
      value: mockCandidates.filter(c => c.status === 'interview' || c.status === 'offer').length,
      change: '+8%',
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Overview</h1>
          <p className="text-gray-600">Explore Talent</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-md transition-all border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl text-gray-900">{stat.value.toLocaleString()}</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="size-3 text-emerald-600" />
                      <span className="text-xs text-emerald-600">{stat.change}</span>
                    </div>
                  </div>
                </div>
                <div className={`size-14 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <Icon className={`size-7 ${stat.color}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* AI Search - Redirect to candidates page */}
      <CandidateSearch 
        redirectOnSearch={true}
        onNavigateToCandidates={onNavigateToCandidates}
        showQuickSearch={false}
      />

      {/* AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-gray-50 border border-gray-200">
          <div className="flex items-start gap-3">
            <div className="size-12 bg-[#118B80] rounded flex items-center justify-center flex-shrink-0">
              <CheckCircle className="size-6 text-white" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-1">3 Ready for Offer</h3>
              <p className="text-sm text-gray-600">
                High match scores and completed all interview stages
              </p>
              <Button variant="ghost" className="mt-3 p-0 h-auto text-[#118B80] hover:text-[#0e7068]" onClick={onNavigateToCandidates}>
                View Candidates →
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gray-50 border border-gray-200">
          <div className="flex items-start gap-3">
            <div className="size-12 bg-[#118B80] rounded flex items-center justify-center flex-shrink-0">
              <Sparkles className="size-6 text-white" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-1">New PhD Available</h3>
              <p className="text-sm text-gray-600">
                Dr. Sarah Chen has exceptional research background in ML
              </p>
              <Button variant="ghost" className="mt-3 p-0 h-auto text-[#118B80] hover:text-[#0e7068]" onClick={onNavigateToCandidates}>
                View Profile →
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gray-50 border border-gray-200">
          <div className="flex items-start gap-3">
            <div className="size-12 bg-gray-600 rounded flex items-center justify-center flex-shrink-0">
              <Clock className="size-6 text-white" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-1">5 Awaiting Review</h3>
              <p className="text-sm text-gray-600">
                Applications need attention within 48 hours
              </p>
              <Button variant="ghost" className="mt-3 p-0 h-auto text-gray-700 hover:text-gray-900" onClick={onNavigateToCandidates}>
                Review Now →
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Center */}
      <Card className="p-4 bg-gray-50 border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Bell className="size-4 text-gray-600" />
            <h4 className="text-gray-900">Action Center</h4>
          </div>
          <Button size="icon" variant="ghost" className="size-7 text-gray-500 hover:text-gray-700">
            <Plus className="size-3.5" />
          </Button>
        </div>

        <div className="space-y-2">
          {reminders.filter(r => !r.completed).slice(0, 3).map(reminder => {
            const Icon = getReminderIcon(reminder.type);
            return (
              <div 
                key={reminder.id} 
                className={`flex items-center gap-3 p-3 rounded-lg bg-white border transition-all hover:shadow-sm ${reminder.urgent ? 'border-red-200 bg-red-50/30' : 'border-gray-200'}`}
              >
                <div className={`size-8 ${getReminderColor(reminder.type)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-900 truncate">{reminder.title}</p>
                    {reminder.urgent && (
                      <Badge className="bg-red-500 text-white text-xs px-1.5 py-0">
                        Urgent
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="size-3" />
                      {reminder.time}
                    </span>
                    {reminder.candidateName && (
                      <>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-600 truncate">{reminder.candidateName}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                    onClick={() => toggleReminderComplete(reminder.id)}
                  >
                    <Check className="size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7 text-gray-400 hover:text-red-600 hover:bg-red-50"
                    onClick={(e) => deleteReminder(reminder.id, e)}
                  >
                    <X className="size-3.5" />
                  </Button>
                </div>
              </div>
            );
          })}
          
          {reminders.filter(r => !r.completed).length === 0 && (
            <div className="text-center py-6 text-gray-500">
              <Bell className="size-8 mx-auto mb-2 text-gray-300" />
              <p className="text-xs">No pending reminders</p>
            </div>
          )}
          
          {reminders.filter(r => !r.completed).length > 3 && (
            <div className="text-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-gray-600 hover:text-gray-900 h-7"
                onClick={() => setShowAllReminders(true)}
              >
                View all {reminders.filter(r => !r.completed).length} reminders
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* All Reminders Dialog */}
      <Dialog open={showAllReminders} onOpenChange={setShowAllReminders}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogTitle>All Reminders</DialogTitle>
          <DialogDescription>
            View and manage all your pending reminders
          </DialogDescription>
          <div className="space-y-2 mt-4">
            {reminders.filter(r => !r.completed).map(reminder => {
              const Icon = getReminderIcon(reminder.type);
              return (
                <div 
                  key={reminder.id} 
                  className={`flex items-center gap-3 p-3 rounded-lg bg-white border transition-all hover:shadow-sm ${reminder.urgent ? 'border-red-200 bg-red-50/30' : 'border-gray-200'}`}
                >
                  <div className={`size-8 ${getReminderColor(reminder.type)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-900">{reminder.title}</p>
                      {reminder.urgent && (
                        <Badge className="bg-red-500 text-white text-xs px-1.5 py-0">
                          Urgent
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{reminder.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="size-3" />
                        {reminder.time}
                      </span>
                      {reminder.candidateName && (
                        <>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-600">{reminder.candidateName}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                      onClick={() => toggleReminderComplete(reminder.id)}
                    >
                      <Check className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 text-gray-400 hover:text-red-600 hover:bg-red-50"
                      onClick={(e) => deleteReminder(reminder.id, e)}
                    >
                      <X className="size-3.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}