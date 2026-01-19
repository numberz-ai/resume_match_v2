import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { 
  ArrowLeft, Users, Calendar, Video, FileText,
  Star, Play, Download, Plus, Sparkles,
  Smile, Meh, Frown, Flag, SkipBack, SkipForward,
  Volume2, Maximize2, Search, CheckCircle, XCircle,
  AlertCircle, MessageSquare, Brain, TrendingUp,
  ThumbsUp, Award, Target, Lightbulb, Mail
} from 'lucide-react';
import { mockCandidates, mockJobs } from '../data/mockData';

interface CandidateInterviewNotesProps {
  candidateId: string;
  jobId: string;
  onBack: () => void;
  onOpenCommunication?: () => void;
}

const tabVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0
  })
};

export function CandidateInterviewNotes({ candidateId, jobId, onBack, onOpenCommunication }: CandidateInterviewNotesProps) {
  const [activeTab, setActiveTab] = useState('recordings');
  const [direction, setDirection] = useState(0);
  const [newNote, setNewNote] = useState('');
  
  const candidate = mockCandidates.find(c => c.id === candidateId);
  const job = mockJobs.find(j => j.id === jobId);

  if (!candidate || !job) return null;

  const tabs = ['recordings', 'notes', 'feedback'];
  
  const handleTabChange = (newTab: string) => {
    const currentIndex = tabs.indexOf(activeTab);
    const newIndex = tabs.indexOf(newTab);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveTab(newTab);
  };

  const interviewStages = [
    { id: 'recruiter', name: 'Recruiter Screen', color: 'bg-gray-500', borderColor: 'border-gray-500', completed: true, rating: 4, date: 'Nov 4' },
    { id: 'technical1', name: 'First Round', color: 'bg-blue-500', borderColor: 'border-blue-500', completed: true, rating: 5, date: 'Nov 8' },
    { id: 'hiring_manager', name: 'Hiring Manager', color: 'bg-purple-500', borderColor: 'border-purple-500', completed: true, rating: 5, date: 'Nov 6' },
    { id: 'technical2', name: 'Tech Round', color: 'bg-indigo-500', borderColor: 'border-indigo-500', completed: false, rating: null, date: 'Pending' },
    { id: 'hr', name: 'HR Round', color: 'bg-emerald-500', borderColor: 'border-emerald-500', completed: false, rating: null, date: 'Pending' },
    { id: 'bar_raiser', name: 'Bar Raiser', color: 'bg-amber-500', borderColor: 'border-amber-500', completed: false, rating: null, date: 'Pending' }
  ];

  const aiInsights = [
    { icon: Award, label: 'Technical Fit', score: '95%', color: 'emerald', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', textColor: 'text-emerald-700' },
    { icon: Users, label: 'Leadership Potential', score: '88%', color: 'blue', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', textColor: 'text-blue-700' },
    { icon: Target, label: 'Culture Match', score: '92%', color: 'purple', bgColor: 'bg-purple-50', borderColor: 'border-purple-200', textColor: 'text-purple-700' },
    { icon: TrendingUp, label: 'Growth Potential', score: 'High', color: 'indigo', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-200', textColor: 'text-indigo-700' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-8 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="size-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-gray-900 mb-1">Interview Details</h1>
              <p className="text-sm text-gray-600">
                {job.title} • Interview Pipeline
              </p>
            </div>
            <Button variant="outline" onClick={onOpenCommunication}>
              <Mail className="size-4 mr-2" />
              Email Candidate
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={onOpenCommunication}>
              <MessageSquare className="size-4 mr-2" />
              Message
            </Button>
          </div>

          {/* Candidate Summary Card */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left: Candidate Info */}
            <div className="col-span-8">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="size-20 flex-shrink-0">
                    <AvatarImage src={candidate.avatar} alt={candidate.name} className="object-cover" />
                    <AvatarFallback className="bg-primary text-white text-xl">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h2 className="text-xl text-gray-900 mb-1">{candidate.name}</h2>
                        <p className="text-sm text-gray-600 mb-2">{candidate.title}</p>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span>{candidate.location}</span>
                          <span>•</span>
                          <span>{candidate.experience} years exp.</span>
                        </div>
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-700 px-3 py-1 text-base">
                        {candidate.matchScore}% Match
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Interview Progress Timeline */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm text-gray-900">Interview Progress</h3>
                    <span className="text-xs text-gray-500">
                      {interviewStages.filter(s => s.completed).length} of {interviewStages.length} completed
                    </span>
                  </div>
                  <div className="relative">
                    {/* Progress Line */}
                    <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
                      <div 
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${(interviewStages.filter(s => s.completed).length / interviewStages.length) * 100}%` }}
                      />
                    </div>
                    
                    {/* Stages */}
                    <div className="relative flex items-start justify-between">
                      {interviewStages.map((stage, idx) => (
                        <div key={stage.id} className="flex flex-col items-center" style={{ width: '100px' }}>
                          {/* Circle */}
                          <div className={`size-10 rounded-full border-4 ${
                            stage.completed 
                              ? `${stage.color} border-white shadow-lg` 
                              : 'bg-white border-gray-300'
                          } flex items-center justify-center mb-2 relative z-10`}>
                            {stage.completed ? (
                              <CheckCircle className="size-5 text-white" />
                            ) : (
                              <span className="text-xs text-gray-400">{idx + 1}</span>
                            )}
                          </div>
                          
                          {/* Label */}
                          <div className="text-center">
                            <p className={`text-xs mb-1 ${stage.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                              {stage.name}
                            </p>
                            <p className="text-xs text-gray-400">{stage.date}</p>
                            {stage.rating && (
                              <div className="flex items-center justify-center gap-0.5 mt-1">
                                {[...Array(stage.rating)].map((_, i) => (
                                  <Star key={i} className="size-2.5 text-amber-500 fill-amber-500" />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right: AI Insights */}
            <div className="col-span-4">
              <Card className="p-5 bg-primary/5 border-2 border-primary/20">
                <div className="flex items-center gap-2 mb-4">
                  <div className="size-9 bg-primary rounded-lg flex items-center justify-center">
                    <Sparkles className="size-5 text-white" />
                  </div>
                  <h3 className="text-sm text-gray-900">AI Insights</h3>
                </div>
                <div className="space-y-3">
                  {aiInsights.map((insight, idx) => (
                    <div key={idx} className={`p-3 rounded-lg border ${insight.bgColor} ${insight.borderColor}`}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <insight.icon className={`size-4 ${insight.textColor}`} />
                          <span className="text-xs text-gray-700">{insight.label}</span>
                        </div>
                        <span className={`text-sm ${insight.textColor}`}>{insight.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="px-8">
          <div className="flex gap-1 border-b border-gray-200">
            <button
              onClick={() => handleTabChange('recordings')}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
                activeTab === 'recordings'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Video className="size-4" />
              <span className="text-sm">Recordings & AI Analysis</span>
            </button>
            <button
              onClick={() => handleTabChange('notes')}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
                activeTab === 'notes'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <FileText className="size-4" />
              <span className="text-sm">Interview Notes</span>
            </button>
            <button
              onClick={() => handleTabChange('feedback')}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
                activeTab === 'feedback'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Star className="size-4" />
              <span className="text-sm">Feedback Summary</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Area with Animation */}
      <div className="px-8 py-6 relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeTab}
            custom={direction}
            variants={tabVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="space-y-6"
          >
            {/* Recordings Tab */}
            {activeTab === 'recordings' && (
              <div className="space-y-6 max-w-5xl">
                {/* Technical Interview Recording */}
                <Card className="overflow-hidden border-2 border-purple-200">
                  <div className="bg-purple-600 p-5 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white text-lg">Technical Round - First Round</h3>
                      <Badge className="bg-white text-purple-700">45 mins</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-purple-100">
                      <Users className="size-4" />
                      <span>Sarah Chen (Interviewer)</span>
                      <span>•</span>
                      <Calendar className="size-4" />
                      <span>Nov 8, 2024</span>
                    </div>
                  </div>

                  {/* Video Player */}
                  <div className="relative bg-black aspect-video">
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                      <div className="text-center">
                        <div className="size-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm hover:bg-white/30 transition-colors cursor-pointer">
                          <Play className="size-10 text-white ml-1" />
                        </div>
                        <p className="text-white">Interview Recording</p>
                        <p className="text-gray-400 text-sm mt-1">Click to play</p>
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
                          <div className="h-full w-1/3 bg-purple-500 rounded-full" />
                        </div>
                        <span className="text-white text-sm">15:23 / 45:12</span>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <Volume2 className="size-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <Maximize2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* AI-Generated Summary */}
                  <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="size-10 bg-purple-600 rounded-xl flex items-center justify-center">
                        <Brain className="size-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-gray-900">AI-Generated Interview Analysis</h4>
                        <p className="text-xs text-gray-600">Powered by advanced ML models</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      Candidate demonstrated exceptional technical depth in system architecture design. Successfully solved complex problems using innovative approaches. Strong communication skills evident throughout - explained complex concepts clearly. Overall performance exceeded expectations.
                    </p>

                    {/* Sentiment Analysis */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="p-3 bg-white rounded-lg border-2 border-emerald-200">
                        <div className="flex items-center gap-2 mb-1">
                          <Smile className="size-5 text-emerald-600" />
                          <span className="text-xs text-gray-700">Positive</span>
                        </div>
                        <div className="text-2xl text-emerald-700">78%</div>
                      </div>
                      <div className="p-3 bg-white rounded-lg border-2 border-blue-200">
                        <div className="flex items-center gap-2 mb-1">
                          <Meh className="size-5 text-blue-600" />
                          <span className="text-xs text-gray-700">Neutral</span>
                        </div>
                        <div className="text-2xl text-blue-700">18%</div>
                      </div>
                      <div className="p-3 bg-white rounded-lg border-2 border-amber-200">
                        <div className="flex items-center gap-2 mb-1">
                          <Frown className="size-5 text-amber-600" />
                          <span className="text-xs text-gray-700">Concern</span>
                        </div>
                        <div className="text-2xl text-amber-700">4%</div>
                      </div>
                    </div>

                    {/* Key Moments */}
                    <div className="space-y-2">
                      <h5 className="text-sm text-gray-900 mb-2">Key Moments</h5>
                      <div className="flex items-start gap-2 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-purple-300 transition-colors">
                        <Flag className="size-4 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-900">Excellent problem-solving approach</span>
                            <Badge variant="outline" className="text-xs">12:34</Badge>
                          </div>
                          <p className="text-xs text-gray-600">Demonstrated novel solution to technical challenge</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-purple-300 transition-colors">
                        <Flag className="size-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-900">Leadership discussion</span>
                            <Badge variant="outline" className="text-xs">28:45</Badge>
                          </div>
                          <p className="text-xs text-gray-600">Shared insights on team collaboration</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transcript Preview */}
                  <div className="p-6 border-t">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-gray-900">Transcript</h4>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Search className="size-4 mr-2" />
                          Search
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="size-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-3 max-h-64 overflow-y-auto bg-gray-50 rounded-lg p-4">
                      <div className="flex gap-3">
                        <span className="text-xs text-gray-500 flex-shrink-0 w-16">00:12</span>
                        <div>
                          <p className="text-xs text-gray-900 mb-1"><strong>Interviewer:</strong></p>
                          <p className="text-sm text-gray-700">Thanks for joining us today. Let's discuss the technical challenges...</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-xs text-gray-500 flex-shrink-0 w-16">00:45</span>
                        <div>
                          <p className="text-xs text-gray-900 mb-1"><strong>{candidate.name}:</strong></p>
                          <p className="text-sm text-gray-700">That's an interesting problem. From my experience, I've dealt with similar challenges...</p>
                        </div>
                      </div>
                      <Button size="sm" variant="link" className="w-full text-purple-600">
                        View Full Transcript
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Hiring Manager Interview */}
                <Card className="overflow-hidden border-2 border-blue-200">
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white mb-1">Hiring Manager Round</h3>
                        <div className="flex items-center gap-2 text-sm text-blue-100">
                          <span>Mike Johnson</span>
                          <span>•</span>
                          <span>Nov 6, 2024</span>
                          <span>•</span>
                          <Badge className="bg-white text-blue-700">30 mins</Badge>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                        <Play className="size-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-6 bg-blue-50">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="size-5 text-blue-600" />
                      <span className="text-sm text-gray-900">AI Summary</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-4">
                      Strong cultural fit and team collaboration focus. Candidate showed enthusiasm for the role and company mission. 
                      Clear communication of career goals aligning with company growth trajectory.
                    </p>
                    <div className="flex gap-2">
                      <Badge className="bg-emerald-100 text-emerald-700">Culture Match: 92%</Badge>
                      <Badge className="bg-blue-100 text-blue-700">Communication: Excellent</Badge>
                    </div>
                  </div>
                </Card>

                {/* Recruiter Screen */}
                <Card className="overflow-hidden border-2 border-gray-200">
                  <div className="bg-gradient-to-r from-gray-600 to-gray-700 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white mb-1">Recruiter Screening</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <span>Jane Doe</span>
                          <span>•</span>
                          <span>Nov 4, 2024</span>
                          <span>•</span>
                          <Badge className="bg-white text-gray-700">20 mins</Badge>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                        <Play className="size-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="size-5 text-gray-600" />
                      <span className="text-sm text-gray-900">AI Summary</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Initial screen confirmed technical background and experience level. Salary expectations align with budget. 
                      Candidate showed strong interest and availability for next steps.
                    </p>
                  </div>
                </Card>
              </div>
            )}

            {/* Interview Notes Tab */}
            {activeTab === 'notes' && (
              <div className="space-y-6 max-w-4xl">
                <Card className="p-6">
                  <h3 className="text-gray-900 mb-4">Add Interview Note</h3>
                  <Textarea
                    placeholder="Add notes about this candidate's interview performance..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="mb-4 min-h-[120px]"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="size-4 mr-2" />
                    Save Note
                  </Button>
                </Card>

                {/* Existing Notes */}
                <Card className="p-6 border-2 border-blue-200 bg-blue-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10">
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                          SC
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm text-gray-900">Sarah Chen</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-600 text-white">Technical Interview</Badge>
                  </div>
                  <p className="text-sm text-gray-700">
                    Candidate showed exceptional problem-solving skills during the technical round. Very impressed with their approach to system design questions. Strong hire recommendation.
                  </p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                          MJ
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm text-gray-900">Mike Johnson</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                    <Badge className="bg-purple-600 text-white">Hiring Manager</Badge>
                  </div>
                  <p className="text-sm text-gray-700">
                    Great cultural fit. The candidate's values align well with our team. They asked thoughtful questions about the role and showed genuine interest in our mission.
                  </p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10">
                        <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                          JD
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm text-gray-900">Jane Doe</p>
                        <p className="text-xs text-gray-500">3 days ago</p>
                      </div>
                    </div>
                    <Badge className="bg-gray-600 text-white">Recruiter Screen</Badge>
                  </div>
                  <p className="text-sm text-gray-700">
                    Initial screening went very well. Candidate is well-qualified and enthusiastic about the opportunity. Experience matches the job requirements perfectly.
                  </p>
                </Card>
              </div>
            )}

            {/* Feedback Summary Tab */}
            {activeTab === 'feedback' && (
              <div className="space-y-6 max-w-4xl">
                <Card className="p-8 bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="size-16 bg-emerald-600 rounded-2xl flex items-center justify-center">
                      <CheckCircle className="size-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl text-gray-900 mb-1">Strong Hire Recommendation</h2>
                      <p className="text-sm text-gray-600">All interviewers recommend moving forward</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Overall Rating</p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="size-6 text-amber-500 fill-amber-500" />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Technical Skills</p>
                      <div className="text-3xl text-emerald-700">Excellent</div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Culture Fit</p>
                      <div className="text-3xl text-emerald-700">92%</div>
                    </div>
                  </div>
                </Card>

                {/* Strengths */}
                <Card className="p-6">
                  <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="size-5 text-emerald-600" />
                    Key Strengths
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                      <ThumbsUp className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-700">Exceptional technical problem-solving abilities</div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                      <ThumbsUp className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-700">Strong communication and collaboration skills</div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                      <ThumbsUp className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-700">Excellent cultural fit with team values</div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                      <ThumbsUp className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-700">Proven leadership and mentorship experience</div>
                    </div>
                  </div>
                </Card>

                {/* Areas for Development */}
                <Card className="p-6">
                  <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                    <Lightbulb className="size-5 text-amber-600" />
                    Development Opportunities
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <AlertCircle className="size-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-700">Could benefit from exposure to larger-scale systems</div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <AlertCircle className="size-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-700">Opportunity to develop public speaking skills</div>
                    </div>
                  </div>
                </Card>

                {/* Next Steps */}
                <Card className="p-6 bg-purple-50 border-2 border-purple-200">
                  <h3 className="text-gray-900 mb-4">Recommended Next Steps</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-purple-200">
                      <CheckCircle className="size-5 text-purple-600" />
                      <span className="text-sm text-gray-700">Schedule Tech Round interview</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-purple-200">
                      <CheckCircle className="size-5 text-purple-600" />
                      <span className="text-sm text-gray-700">Prepare reference check list</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-purple-200">
                      <CheckCircle className="size-5 text-purple-600" />
                      <span className="text-sm text-gray-700">Consider salary range discussion</span>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}