import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  ArrowLeft, Users, Calendar, Clock, Video, FileText,
  Star, Award, Briefcase, Target, Play, Search, Filter,
  Plus, ChevronRight, CheckCircle, XCircle, AlertCircle,
  Flag, Sparkles, Download, Send, MessageSquare, Edit,
  MoreVertical, Smile, Meh, Frown, SkipBack, SkipForward,
  Volume2, Maximize2, ThumbsUp, ThumbsDown, TrendingUp,
  BarChart3, Eye, Phone, MapPin
} from 'lucide-react';
import { mockJobs, mockCandidates } from '../data/mockData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface JobInterviewViewProps {
  jobId: string;
  onBack: () => void;
  onSelectCandidate?: (candidateId: string) => void;
}

export function JobInterviewView({ jobId, onBack, onSelectCandidate }: JobInterviewViewProps) {
  const [activeTab, setActiveTab] = useState('schedule');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const job = mockJobs.find(j => j.id === jobId);
  const jobCandidates = mockCandidates.filter(c => job?.candidateIds.includes(c.id));

  if (!job) return null;

  const interviewStages = [
    { id: 'recruiter', name: 'Recruiter Screen', icon: Users, color: 'bg-gray-600' },
    { id: 'technical1', name: 'First Round', icon: Award, color: 'bg-blue-600' },
    { id: 'hiring_manager', name: 'Hiring Manager', icon: Briefcase, color: 'bg-primary' },
    { id: 'technical2', name: 'Tech Round', icon: Target, color: 'bg-indigo-600' },
    { id: 'hr', name: 'HR Round', icon: Users, color: 'bg-emerald-600' },
    { id: 'bar_raiser', name: 'Bar Raiser', icon: Star, color: 'bg-amber-600' }
  ];

  // Mock interview data
  const upcomingInterviews = [
    { 
      id: 1, 
      candidate: jobCandidates[0], 
      stage: 'technical1', 
      date: '2024-11-12', 
      time: '10:00 AM',
      interviewer: 'Sarah Chen',
      duration: '60 min',
      type: 'video',
      status: 'scheduled'
    },
    { 
      id: 2, 
      candidate: jobCandidates[1], 
      stage: 'recruiter', 
      date: '2024-11-12', 
      time: '2:00 PM',
      interviewer: 'John Doe',
      duration: '30 min',
      type: 'phone',
      status: 'scheduled'
    },
    { 
      id: 3, 
      candidate: jobCandidates[2], 
      stage: 'hiring_manager', 
      date: '2024-11-13', 
      time: '11:30 AM',
      interviewer: 'Mike Johnson',
      duration: '45 min',
      type: 'video',
      status: 'scheduled'
    }
  ];

  const completedInterviews = [
    {
      id: 4,
      candidate: jobCandidates[0],
      stage: 'recruiter',
      date: '2024-11-08',
      time: '10:00 AM',
      interviewer: 'John Doe',
      duration: '30 min',
      rating: 5,
      status: 'completed',
      feedback: 'Excellent candidate with strong technical background and communication skills.',
      hasRecording: true
    },
    {
      id: 5,
      candidate: jobCandidates[1],
      stage: 'technical1',
      date: '2024-11-09',
      time: '2:00 PM',
      interviewer: 'Sarah Chen',
      duration: '60 min',
      rating: 4,
      status: 'completed',
      feedback: 'Solid technical skills, needs improvement in system design.',
      hasRecording: true
    }
  ];

  const getStageInfo = (stageId: string) => {
    return interviewStages.find(s => s.id === stageId);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="size-5" />
            </Button>
            <div>
              <h1 className="text-gray-900 mb-1">Interview Management</h1>
              <p className="text-sm text-gray-600">{job.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="size-4 mr-2" />
              Export Report
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="size-4 mr-2" />
              Schedule Interview
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="size-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl text-gray-900 mb-1">12</div>
                <div className="text-xs text-gray-600">Total Scheduled</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-teal-50 rounded-lg flex items-center justify-center">
                <Clock className="size-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl text-gray-900 mb-1">3</div>
                <div className="text-xs text-gray-600">This Week</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="size-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-2xl text-gray-900 mb-1">45</div>
                <div className="text-xs text-gray-600">Completed</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="size-5 text-amber-600" />
              </div>
              <div>
                <div className="text-2xl text-gray-900 mb-1">4.2</div>
                <div className="text-xs text-gray-600">Avg Rating</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="bg-white border border-gray-200 mb-6">
            <TabsTrigger value="schedule">Schedule & Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed Interviews</TabsTrigger>
            <TabsTrigger value="recordings">Recordings & Analysis</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline Overview</TabsTrigger>
          </TabsList>

          {/* Schedule & Upcoming Tab */}
          <TabsContent value="schedule" className="flex-1 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search candidates or interviewers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={selectedStage} onValueChange={setSelectedStage}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="All Stages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  {interviewStages.map(stage => (
                    <SelectItem key={stage.id} value={stage.id}>{stage.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {upcomingInterviews.map(interview => {
                const stageInfo = getStageInfo(interview.stage);
                if (!stageInfo) return null;
                const StageIcon = stageInfo.icon;

                return (
                  <Card key={interview.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <Avatar className="size-14">
                        <AvatarImage src={interview.candidate?.avatar} />
                        <AvatarFallback>
                          {interview.candidate?.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 
                              className="text-gray-900 mb-1 cursor-pointer hover:text-blue-600"
                              onClick={() => onSelectCandidate?.(interview.candidate.id)}
                            >
                              {interview.candidate?.name}
                            </h4>
                            <p className="text-sm text-gray-600">{interview.candidate?.title}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="size-4 mr-2" />
                                Edit Schedule
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Send className="size-4 mr-2" />
                                Send Reminder
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <XCircle className="size-4 mr-2" />
                                Cancel Interview
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="flex items-center gap-4 mb-3">
                          <Badge className={`${stageInfo.color} text-white`}>
                            <StageIcon className="size-3 mr-1" />
                            {stageInfo.name}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Calendar className="size-4" />
                            <span>{interview.date}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Clock className="size-4" />
                            <span>{interview.time} • {interview.duration}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            {interview.type === 'video' ? (
                              <Video className="size-4" />
                            ) : (
                              <Phone className="size-4" />
                            )}
                            <span>{interview.type === 'video' ? 'Video Call' : 'Phone'}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="size-4" />
                            <span>Interviewer: {interview.interviewer}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <MessageSquare className="size-4 mr-2" />
                              Message
                            </Button>
                            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                              <Video className="size-4 mr-2" />
                              Join Meeting
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Completed Interviews Tab */}
          <TabsContent value="completed" className="flex-1 space-y-4">
            <div className="space-y-4">
              {completedInterviews.map(interview => {
                const stageInfo = getStageInfo(interview.stage);
                if (!stageInfo) return null;
                const StageIcon = stageInfo.icon;

                return (
                  <Card key={interview.id} className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="size-14">
                        <AvatarImage src={interview.candidate?.avatar} />
                        <AvatarFallback>
                          {interview.candidate?.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 
                              className="text-gray-900 mb-1 cursor-pointer hover:text-blue-600"
                              onClick={() => onSelectCandidate?.(interview.candidate.id)}
                            >
                              {interview.candidate?.name}
                            </h4>
                            <p className="text-sm text-gray-600">{interview.candidate?.title}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`size-4 ${
                                  i < interview.rating
                                    ? 'text-amber-500 fill-amber-500'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mb-3">
                          <Badge className={`${stageInfo.color} text-white`}>
                            <StageIcon className="size-3 mr-1" />
                            {stageInfo.name}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Calendar className="size-4" />
                            <span>{interview.date}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Clock className="size-4" />
                            <span>{interview.time} • {interview.duration}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Users className="size-4" />
                            <span>{interview.interviewer}</span>
                          </div>
                        </div>

                        <Card className="p-3 bg-gray-50 mb-3">
                          <p className="text-sm text-gray-700">{interview.feedback}</p>
                        </Card>

                        <div className="flex items-center gap-2">
                          {interview.hasRecording && (
                            <Button size="sm" variant="outline">
                              <Play className="size-4 mr-2" />
                              View Recording
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <FileText className="size-4 mr-2" />
                            View Full Feedback
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="size-4 mr-2" />
                            Export
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Recordings & Analysis Tab */}
          <TabsContent value="recordings" className="flex-1 space-y-4">
            <Card className="border-2 border-teal-200">
              <div className="bg-primary p-4 text-white">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white">Technical Round - ML Architecture</h4>
                  <Badge className="bg-white text-primary">45 mins</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-teal-50">
                  <Users className="size-4" />
                  <span>{jobCandidates[0]?.name} • Sarah Chen (Interviewer)</span>
                  <span>•</span>
                  <Calendar className="size-4" />
                  <span>Nov 8, 2024</span>
                </div>
              </div>

              {/* Video Player */}
              <div className="relative bg-black aspect-video">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                  <div className="text-center">
                    <div className="size-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                      <Play className="size-10 text-white ml-1" />
                    </div>
                    <p className="text-white text-sm">Interview Recording</p>
                    <p className="text-gray-400 text-xs mt-1">Click to play</p>
                  </div>
                </div>
                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center gap-3">
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Play className="size-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <SkipBack className="size-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <SkipForward className="size-4" />
                    </Button>
                    <div className="flex-1 h-1 bg-white/30 rounded-full">
                      <div className="h-full w-1/3 bg-primary rounded-full" />
                    </div>
                    <span className="text-white text-xs">15:23 / 45:12</span>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Volume2 className="size-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Maximize2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* AI Analysis */}
              <div className="p-4 bg-teal-50">
                <div className="flex items-center gap-2 mb-3">
                  <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
                    <Sparkles className="size-4 text-white" />
                  </div>
                  <h5 className="text-sm text-gray-900">AI-Generated Analysis</h5>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  Candidate demonstrated exceptional technical depth in ML architecture design. Successfully solved the distributed training 
                  optimization problem using novel approach. Strong communication skills evident throughout - explained complex concepts clearly.
                </p>

                {/* Sentiment Analysis */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="p-3 bg-white rounded-lg border border-emerald-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Smile className="size-4 text-emerald-600" />
                      <span className="text-xs text-gray-700">Positive</span>
                    </div>
                    <div className="text-lg text-emerald-700">78%</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Meh className="size-4 text-blue-600" />
                      <span className="text-xs text-gray-700">Neutral</span>
                    </div>
                    <div className="text-lg text-blue-700">18%</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-amber-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Frown className="size-4 text-amber-600" />
                      <span className="text-xs text-gray-700">Concern</span>
                    </div>
                    <div className="text-lg text-amber-700">4%</div>
                  </div>
                </div>

                {/* Key Moments */}
                <div className="space-y-2">
                  <h5 className="text-xs text-gray-900 mb-2">Key Moments</h5>
                  <div className="flex items-start gap-2 p-2 bg-white rounded border border-gray-200 cursor-pointer hover:border-primary transition-colors">
                    <Flag className="size-4 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-900">Excellent problem-solving approach</span>
                        <Badge variant="outline" className="text-xs">12:34</Badge>
                      </div>
                      <p className="text-xs text-gray-600">Demonstrated novel solution to distributed training challenge</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Pipeline Overview Tab */}
          <TabsContent value="pipeline" className="flex-1">
            <div className="grid grid-cols-6 gap-4">
              {interviewStages.map((stage, idx) => {
                const StageIcon = stage.icon;
                const candidatesInStage = Math.floor(Math.random() * 5) + 1;
                
                return (
                  <Card key={stage.id} className="p-4">
                    <div className={`size-12 ${stage.color} rounded-xl flex items-center justify-center mb-3`}>
                      <StageIcon className="size-6 text-white" />
                    </div>
                    <h4 className="text-sm text-gray-900 mb-1">{stage.name}</h4>
                    <div className="text-2xl text-gray-900 mb-2">{candidatesInStage}</div>
                    <p className="text-xs text-gray-600 mb-3">Candidates in stage</p>
                    <Button size="sm" variant="outline" className="w-full">
                      View All
                    </Button>
                  </Card>
                );
              })}
            </div>

            {/* Stage Details */}
            <Card className="mt-6 p-6">
              <h4 className="text-gray-900 mb-4">Interview Statistics by Stage</h4>
              <div className="space-y-4">
                {interviewStages.map(stage => {
                  const completed = Math.floor(Math.random() * 20) + 5;
                  const avgRating = (Math.random() * 2 + 3).toFixed(1);
                  const passRate = Math.floor(Math.random() * 30) + 60;
                  
                  return (
                    <div key={stage.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className={`size-10 ${stage.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <stage.icon className="size-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h5 className="text-sm text-gray-900 mb-1">{stage.name}</h5>
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          <span>{completed} completed</span>
                          <span>•</span>
                          <span>{avgRating} avg rating</span>
                          <span>•</span>
                          <span>{passRate}% pass rate</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}