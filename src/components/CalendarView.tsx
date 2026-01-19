import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Calendar } from './ui/calendar';
import { ChevronLeft, ChevronRight, Clock, MapPin, Video, Users, Plus, Filter } from 'lucide-react';

interface Interview {
  id: string;
  candidateName: string;
  candidateInitials: string;
  role: string;
  time: string;
  duration: string;
  type: 'in-person' | 'video' | 'phone';
  interviewers: string[];
  status: 'scheduled' | 'completed' | 'cancelled';
}

const mockInterviews: Interview[] = [
  {
    id: '1',
    candidateName: 'Dr. Emily Chen',
    candidateInitials: 'EC',
    role: 'Senior ML Engineer',
    time: '10:00 AM',
    duration: '1 hour',
    type: 'video',
    interviewers: ['John Doe', 'Sarah Miller'],
    status: 'scheduled',
  },
  {
    id: '2',
    candidateName: 'Michael Zhang',
    candidateInitials: 'MZ',
    role: 'Senior ML Engineer',
    time: '2:00 PM',
    duration: '45 min',
    type: 'in-person',
    interviewers: ['John Doe'],
    status: 'scheduled',
  },
  {
    id: '3',
    candidateName: 'Sarah Johnson',
    candidateInitials: 'SJ',
    role: 'ML Research Scientist',
    time: '4:30 PM',
    duration: '30 min',
    type: 'phone',
    interviewers: ['Jane Smith'],
    status: 'scheduled',
  },
];

export function CalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="size-4" />;
      case 'phone': return <Clock className="size-4" />;
      case 'in-person': return <MapPin className="size-4" />;
      default: return <Clock className="size-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'phone': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'in-person': return 'bg-emerald-100 text-emerald-700 border-emerald-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Interview Calendar</h1>
          <p className="text-gray-600">Manage and schedule interviews</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 border border-gray-300 rounded-lg p-1">
            <Button
              variant={viewMode === 'day' ? 'default' : 'ghost'}
              size="sm"
              className={viewMode === 'day' ? 'bg-blue-600' : ''}
              onClick={() => setViewMode('day')}
            >
              Day
            </Button>
            <Button
              variant={viewMode === 'week' ? 'default' : 'ghost'}
              size="sm"
              className={viewMode === 'week' ? 'bg-blue-600' : ''}
              onClick={() => setViewMode('week')}
            >
              Week
            </Button>
            <Button
              variant={viewMode === 'month' ? 'default' : 'ghost'}
              size="sm"
              className={viewMode === 'month' ? 'bg-blue-600' : ''}
              onClick={() => setViewMode('month')}
            >
              Month
            </Button>
          </div>
          <Button variant="outline">
            <Filter className="size-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="size-4 mr-2" />
            Schedule Interview
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Calendar Picker */}
        <div className="col-span-4">
          <Card className="p-6">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-lg border"
            />

            {/* Quick Stats */}
            <div className="mt-6 space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Today's Interviews</span>
                  <Badge className="bg-blue-600">3</Badge>
                </div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">This Week</span>
                  <Badge className="bg-purple-600">12</Badge>
                </div>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Completed</span>
                  <Badge className="bg-emerald-600">45</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Schedule */}
        <div className="col-span-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="size-4" />
                </Button>
                <div>
                  <h2 className="text-gray-900">Today, November 10</h2>
                  <p className="text-sm text-gray-500">Monday, 2025</p>
                </div>
                <Button variant="outline" size="icon">
                  <ChevronRight className="size-4" />
                </Button>
              </div>
              <Badge variant="outline" className="text-sm">
                {mockInterviews.length} Scheduled
              </Badge>
            </div>

            {/* Interview List */}
            <div className="space-y-4">
              {mockInterviews.map((interview) => (
                <Card key={interview.id} className="p-4 hover:shadow-md transition-shadow border-2 border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="text-center pt-1">
                      <div className="text-sm text-gray-900">{interview.time}</div>
                      <div className="text-xs text-gray-500">{interview.duration}</div>
                    </div>

                    <div className="h-full w-px bg-gray-300 mx-2" />

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Avatar className="size-10">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                              {interview.candidateInitials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm text-gray-900">{interview.candidateName}</p>
                            <p className="text-xs text-gray-600">{interview.role}</p>
                          </div>
                        </div>
                        <Badge className={`${getTypeColor(interview.type)} border`}>
                          <span className="mr-1">{getTypeIcon(interview.type)}</span>
                          {interview.type}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-600 mt-3">
                        <div className="flex items-center gap-1.5">
                          <Users className="size-3" />
                          <span>{interview.interviewers.join(', ')}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-3">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Join Interview
                        </Button>
                        <Button size="sm" variant="outline">
                          Reschedule
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              {mockInterviews.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <Clock className="size-12 mx-auto mb-3" />
                  <p className="text-sm">No interviews scheduled</p>
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                    <Plus className="size-4 mr-2" />
                    Schedule Interview
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}