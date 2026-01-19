import React, { useState, useEffect } from 'react';
import { mockJobs, mockCandidates } from '../data/mockData';
import { useJobsStore } from '../store/jobsStore';
import { Candidate } from '../types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { InterviewAssessment } from './InterviewAssessment';
import { CandidateComparison } from './CandidateComparison';
import { 
  ArrowLeft, 
  MapPin, 
  Building2, 
  DollarSign, 
  Users, 
  Calendar, 
  TrendingUp, 
  Mail, 
  MessageSquare, 
  MoreVertical,
  Target,
  CheckCircle2,
  Briefcase,
  XCircle,
  Sparkles,
  Clock,
  ChevronRight,
  Share2,
  Edit,
  Award,
  Star,
  FileText,
  Plus,
  ArrowRight
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface JobDetailViewProps {
  jobId: string;
  onBack: () => void;
  onSelectCandidate: (candidateId: string) => void;
  onOpenCommunication?: () => void;
  onOpenInterviews?: (jobId: string) => void;
  onOpenCandidateInterviews?: (candidateId: string, jobId: string) => void;
}

export function JobDetailView({ jobId, onBack, onSelectCandidate, onOpenCommunication, onOpenInterviews, onOpenCandidateInterviews }: JobDetailViewProps) {
  const { getJob, setJob, getActiveTab, setActiveTab: setActiveTabStore } = useJobsStore();
  const cachedJob = getJob(jobId);
  const cachedActiveTab = getActiveTab(jobId);
  
  const [activeTab, setActiveTab] = useState(cachedActiveTab);
  const [showAssessment, setShowAssessment] = useState(false);
  const [selectedStage, setSelectedStage] = useState<any>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [showComparison, setShowComparison] = useState(false);
  
  // Use cached job if available, otherwise find from mock
  const job = cachedJob || mockJobs.find(j => j.id === jobId);
  
  // Cache the job when it's found
  useEffect(() => {
    if (job && !cachedJob) {
      setJob(jobId, job);
    }
  }, [job, jobId, cachedJob, setJob]);
  
  // Persist active tab when it changes
  useEffect(() => {
    if (activeTab !== cachedActiveTab) {
      setActiveTabStore(jobId, activeTab);
    }
  }, [activeTab, jobId, cachedActiveTab, setActiveTabStore]);
  
  // Restore active tab from store on mount
  useEffect(() => {
    const storedTab = getActiveTab(jobId);
    if (storedTab && storedTab !== activeTab) {
      setActiveTab(storedTab);
    }
  }, [jobId, getActiveTab]);

  if (!job) {
    return (
      <div className="p-8">
        <Card className="p-12 text-center">
          <p className="text-gray-900">Job not found</p>
          <Button onClick={onBack} className="mt-4">
            Go Back
          </Button>
        </Card>
      </div>
    );
  }

  // Get candidates for this job
  const jobCandidates = mockCandidates.filter(c => job.candidateIds.includes(c.id));
  
  // Sort candidates by match score for the "Matching Candidates" section
  const matchedCandidates = [...jobCandidates].sort((a, b) => b.matchScore - a.matchScore);

  const formatSalary = () => {
    if (!job.salaryRange) return 'Competitive';
    const { min, max } = job.salaryRange;
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k USD`;
  };

  const getStatusColor = (status: Candidate['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'screening': return 'bg-yellow-100 text-yellow-700';
      case 'interview': return 'bg-purple-100 text-purple-700';
      case 'offer': return 'bg-green-100 text-green-700';
      case 'hired': return 'bg-emerald-100 text-emerald-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  // Group candidates by status for pipeline view
  const candidatesByStatus = {
    new: jobCandidates.filter(c => c.status === 'new'),
    screening: jobCandidates.filter(c => c.status === 'screening'),
    interview: jobCandidates.filter(c => c.status === 'interview'),
    offer: jobCandidates.filter(c => c.status === 'offer'),
    hired: jobCandidates.filter(c => c.status === 'hired'),
    rejected: jobCandidates.filter(c => c.status === 'rejected'),
  };

  const PipelineColumn = ({ title, status, candidates, count }: { 
    title: string; 
    status: Candidate['status']; 
    candidates: Candidate[]; 
    count: number 
  }) => (
    <div className="flex-1 min-w-[300px]">
      <div className="bg-white border-2 border-gray-200 rounded-lg p-3 mb-3 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-900">{title}</h3>
          <Badge className="bg-gray-100 text-gray-700">{count}</Badge>
        </div>
      </div>
      <div className="space-y-2">
        {candidates.map((candidate) => (
          <Card 
            key={candidate.id}
            className="p-3 hover:shadow-lg transition-all border-2 hover:border-blue-400 bg-white group cursor-pointer"
            onClick={() => onOpenCandidateInterviews?.(candidate.id, jobId)}
          >
            <div className="flex items-start gap-3">
              <Avatar className="size-10 cursor-pointer" onClick={(e) => {
                e.stopPropagation();
                onOpenCandidateInterviews?.(candidate.id, jobId);
              }}>
                <AvatarImage src={candidate.avatar} alt={candidate.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm">
                  {candidate.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p 
                    className="text-sm text-gray-900 truncate cursor-pointer hover:text-blue-600" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenCandidateInterviews?.(candidate.id, jobId);
                    }}
                  >
                    {candidate.name}
                  </p>
                  <div className={`text-xs px-2 py-0.5 rounded ${getMatchScoreColor(candidate.matchScore)} flex-shrink-0`}>
                    {candidate.matchScore}%
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-2 line-clamp-1">{candidate.title}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {candidate.skills.slice(0, 2).map(skill => (
                    <Badge key={skill} variant="outline" className="text-xs px-1.5 py-0">
                      {skill}
                    </Badge>
                  ))}
                  {candidate.skills.length > 2 && (
                    <span className="text-xs text-gray-500">+{candidate.skills.length - 2}</span>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-1 mt-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 px-2 text-xs hover:bg-blue-50 hover:text-blue-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle message
                      if (onOpenCommunication) onOpenCommunication();
                    }}
                  >
                    <MessageSquare className="size-3 mr-1" />
                    Message
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 px-2 text-xs hover:bg-purple-50 hover:text-purple-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle email
                      if (onOpenCommunication) onOpenCommunication();
                    }}
                  >
                    <Mail className="size-3 mr-1" />
                    Email
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 w-7 p-0 ml-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="size-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        onSelectCandidate(candidate.id);
                      }}>
                        View Full Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        onOpenCandidateInterviews?.(candidate.id, jobId);
                      }}>
                        Interview Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                        Schedule Interview
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                        Add Note
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                        Move to...
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </Card>
        ))}
        {candidates.length === 0 && (
          <Card className="p-6 text-center border-dashed border-2">
            <p className="text-xs text-gray-500">No candidates</p>
          </Card>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-8 space-y-6">
          {/* Header */}
          <div className="space-y-4">
        {/* Back Navigation */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span className="text-sm">Back</span>
        </button>

        {/* Job Info */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-green-100 text-green-700">{job.status}</Badge>
              <Badge className="bg-blue-100 text-blue-700">{job.level}</Badge>
              {job.openings > 1 && (
                <Badge variant="outline">{job.openings} openings</Badge>
              )}
            </div>
            <h1 className="text-gray-900 mb-3">{job.title}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-1">
                <Building2 className="size-4" />
                {job.department}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="size-4" />
                {job.location}
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="size-4" />
                {formatSalary()}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => onOpenInterviews?.(jobId)}
            >
              <Calendar className="size-4 mr-2" />
              Interview Management
            </Button>
            <Button variant="outline">
              <Share2 className="size-4 mr-2" />
              Share
            </Button>
            <Button variant="outline">
              <Edit className="size-4 mr-2" />
              Edit
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="size-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-xl text-gray-900">
                {job.pipeline.new + job.pipeline.screening + job.pipeline.interview + job.pipeline.offer}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="size-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Interview</p>
              <p className="text-xl text-gray-900">{job.pipeline.interview}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="size-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Offers</p>
              <p className="text-xl text-gray-900">{job.pipeline.offer}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Briefcase className="size-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Hired</p>
              <p className="text-xl text-gray-900">{job.pipeline.hired}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="size-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-xl text-gray-900">{job.pipeline.rejected}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-100">
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="matching">
            AI Matching
            <Sparkles className="size-3 ml-1.5 text-purple-600" />
          </TabsTrigger>
          <TabsTrigger value="details">Job Details</TabsTrigger>
          <TabsTrigger value="team">Hiring Team</TabsTrigger>
        </TabsList>

        {/* Pipeline Kanban View */}
        <TabsContent value="pipeline" className="mt-6">
          <div className="w-full overflow-x-auto">
            <div className="flex gap-4 pb-4 min-w-min">
              <PipelineColumn 
                title="New" 
                status="new" 
                candidates={candidatesByStatus.new}
                count={job.pipeline.new}
              />
              <PipelineColumn 
                title="Screening" 
                status="screening" 
                candidates={candidatesByStatus.screening}
                count={job.pipeline.screening}
              />
              <PipelineColumn 
                title="Interview" 
                status="interview" 
                candidates={candidatesByStatus.interview}
                count={job.pipeline.interview}
              />
              <PipelineColumn 
                title="Offer" 
                status="offer" 
                candidates={candidatesByStatus.offer}
                count={job.pipeline.offer}
              />
              <PipelineColumn 
                title="Hired" 
                status="hired" 
                candidates={candidatesByStatus.hired}
                count={job.pipeline.hired}
              />
            </div>
          </div>
        </TabsContent>

        {/* AI Matching Candidates */}
        <TabsContent value="matching" className="mt-6">
          {showComparison ? (
            <CandidateComparison 
              candidates={jobCandidates.map(c => ({
                id: c.id,
                name: c.name,
                email: c.email,
                matchScore: c.matchScore,
                overallScore: 4,
                recommendation: 'yes',
                experience: `${c.experience} years`,
                education: c.education || 'Bachelor\'s Degree',
                skills: c.skills,
                stages: {
                  recruiter: { score: 4, recommendation: 'Yes', interviewer: 'Sarah Lee', completed: true },
                  technical1: { score: 4, recommendation: 'Yes', interviewer: 'John Smith', completed: true },
                  hiring_manager: { score: 5, recommendation: 'Strong Yes', interviewer: 'Mike Johnson', completed: true },
                  technical2: { score: 3, recommendation: 'Yes', interviewer: 'Alex Chen', completed: false },
                  hr: { score: 0, recommendation: 'N/A', interviewer: 'Emily Davis', completed: false },
                  bar_raiser: { score: 0, recommendation: 'N/A', interviewer: 'David Kim', completed: false }
                },
                strengths: ['Strong technical skills', 'Great communication', 'Cultural fit'],
                concerns: ['Limited leadership experience', 'Short tenure at last company']
              }))}
              jobTitle={job.title}
              onClose={() => setShowComparison(false)}
              onSelectCandidate={onSelectCandidate}
            />
          ) : (
            <>
              <Card className="p-6 mb-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="size-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Sparkles className="size-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 mb-1">AI-Powered Candidate Matching</h3>
                      <p className="text-sm text-gray-600">
                        These candidates are ranked by AI-calculated match scores based on skills, experience, 
                        education, cultural fit, and leadership potential.
                      </p>
                    </div>
                  </div>
                  <Button onClick={() => setShowComparison(true)} className="bg-purple-600 hover:bg-purple-700">
                    <Users className="size-4 mr-2" />
                    Compare Candidates
                  </Button>
                </div>
              </Card>

              {matchedCandidates.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {matchedCandidates.map((candidate) => (
                    <Card 
                      key={candidate.id}
                      className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-blue-300"
                      onClick={() => onSelectCandidate(candidate.id)}
                    >
                      <div className="flex items-start gap-4">
                        <Avatar className="size-16">
                          <AvatarImage src={candidate.avatar} alt={candidate.name} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <h3 className="text-gray-900">{candidate.name}</h3>
                              <p className="text-sm text-gray-600">{candidate.title}</p>
                            </div>
                            <div className={`text-sm px-3 py-1.5 rounded-lg ${getMatchScoreColor(candidate.matchScore)}`}>
                              <TrendingUp className="size-3 inline mr-1" />
                              {candidate.matchScore}% Match
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                            <MapPin className="size-4" />
                            {candidate.location}
                            <span className="text-gray-400">•</span>
                            <Clock className="size-4" />
                            {candidate.experience} years exp
                          </div>

                          <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                            {candidate.summary}
                          </p>

                          <div className="flex items-center gap-2 mb-3">
                            {candidate.skills.slice(0, 3).map(skill => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {candidate.skills.length > 3 && (
                              <span className="text-xs text-gray-500">+{candidate.skills.length - 3} more</span>
                            )}
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t">
                            <Badge className={getStatusColor(candidate.status)}>
                              {candidate.status}
                            </Badge>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-blue-600 hover:text-blue-700"
                            >
                              View Profile
                              <ChevronRight className="size-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <Users className="size-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-900 mb-2">No matching candidates yet</p>
                  <p className="text-gray-600 text-sm">
                    Candidates will appear here once they apply or are sourced for this role.
                  </p>
                </Card>
              )}
            </>
          )}
        </TabsContent>

        {/* Job Details */}
        <TabsContent value="details" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <h3 className="text-gray-900 mb-4">Job Description</h3>
                <p className="text-gray-700">{job.description}</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-gray-900 mb-4">Responsibilities</h3>
                <ul className="space-y-2">
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <ChevronRight className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      {resp}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-gray-900 mb-4">Requirements</h3>
                <ul className="space-y-2">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                      {req}
                    </li>
                  ))}
                </ul>
              </Card>

              {job.benefits && job.benefits.length > 0 && (
                <Card className="p-6">
                  <h3 className="text-gray-900 mb-4">Benefits</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.benefits.map((benefit, idx) => (
                      <Badge key={idx} variant="secondary" className="text-sm">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-gray-900 mb-4">Job Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Department</p>
                    <p className="text-gray-900">{job.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Location</p>
                    <p className="text-gray-900">{job.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Job Type</p>
                    <p className="text-gray-900 capitalize">{job.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Level</p>
                    <p className="text-gray-900 capitalize">{job.level}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Salary Range</p>
                    <p className="text-gray-900">{formatSalary()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Posted Date</p>
                    <p className="text-gray-900">
                      {new Date(job.postedDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Hiring Team */}
        <TabsContent value="team" className="mt-6">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Hiring Team</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Avatar className="size-12">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {job.hiringTeam.hiringManager.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-gray-900">{job.hiringTeam.hiringManager}</p>
                  <p className="text-sm text-gray-600">Hiring Manager</p>
                </div>
                <Badge variant="secondary">Lead</Badge>
              </div>

              {job.hiringTeam.recruiters.map((recruiter, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <Avatar className="size-12">
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                      {recruiter.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-gray-900">{recruiter}</p>
                    <p className="text-sm text-gray-600">Recruiter</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}