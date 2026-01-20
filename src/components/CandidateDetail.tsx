
import React, { useState, useEffect } from 'react';
import { mockCandidates } from '../data/mockData';
import { useCandidatesStore } from '../store/candidatesStore';
import { type Candidate } from '../types';
import jsPDF from 'jspdf';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { 
  ArrowLeft, Mail, Phone, MapPin, Linkedin, Github, Globe, 
  FileText, Download, Shield, TrendingUp, Briefcase, 
  GraduationCap, Users, Building2, Award, Lightbulb, 
  Target, CheckCircle, X, Star, Code, Calendar, Sparkles,
  MessageSquare, Send, ExternalLink, Zap, BookOpen, GitBranch,
  AlertCircle, ChevronRight, Clock, Brain,
  StickyNote, History, ClipboardList, Plus, Eye, Edit3,
  Activity, BarChart3, Gauge,
  ThumbsUp, ThumbsDown, Loader2
} from 'lucide-react';

interface CandidateDetailProps {
  candidateId: string;
  candidate?: Candidate | null;
  onClose: () => void;
}

// Use candidate data from props if available, otherwise fallback to mock data
export function CandidateDetail({ candidateId, candidate: candidateFromProps, onClose }: CandidateDetailProps) {
  const { getCandidateActiveTab, setCandidateActiveTab } = useCandidatesStore();
  const cachedActiveTab = getCandidateActiveTab(candidateId);
  
  // Use candidate from props if available, otherwise fallback to mock data
  const candidateFromSource = candidateFromProps || mockCandidates.find(c => c.id === candidateId) || mockCandidates[0];
  console.log('-----------------', candidateFromSource);
  // Ensure candidate has all required fields with defaults
  const candidate: Candidate = {
    id: candidateFromSource?.id || candidateId,
    name: candidateFromSource?.name || 'Unknown',
    title: candidateFromSource?.title || '',
    location: candidateFromSource?.location || '',
    email: candidateFromSource?.email || '',
    phone: candidateFromSource?.phone || '',
    avatar: candidateFromSource?.avatar || '',
    education: candidateFromSource?.education || '',
    skills: candidateFromSource?.skills || [],
    summary: candidateFromSource?.summary || '',
    matchScore: candidateFromSource?.matchScore || 0,
    experience: candidateFromSource?.experience || 0,
    status: candidateFromSource?.status || 'new',
    appliedDate: candidateFromSource?.appliedDate || new Date().toISOString(),
    resumeUrl: candidateFromSource?.resumeUrl || '',
    linkedIn: candidateFromSource?.linkedIn,
    github: candidateFromSource?.github,
    stackoverflow: candidateFromSource?.stackoverflow,
    medium: candidateFromSource?.medium,
    website: candidateFromSource?.website,
  };
  
  const [status, setStatus] = useState(candidate?.status || 'new');
  const [assignedTo, setAssignedTo] = useState('john-doe');
  const [activeTab, setActiveTab] = useState(cachedActiveTab);
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Persist active tab when it changes
  useEffect(() => {
    if (activeTab !== cachedActiveTab) {
      setCandidateActiveTab(candidateId, activeTab);
    }
  }, [activeTab, candidateId, cachedActiveTab, setCandidateActiveTab]);

  if (!candidate) return null;

  const getMatchLevel = (score: number) => {
    if (score >= 90) return { 
      label: 'High Match', 
      color: 'text-emerald-700', 
      bg: 'bg-emerald-500',
      lightBg: 'bg-emerald-50',
      border: 'border-emerald-500',
    };
    if (score >= 70) return { 
      label: 'Medium Match', 
      color: 'text-blue-700', 
      bg: 'bg-blue-500',
      lightBg: 'bg-blue-50',
      border: 'border-blue-500',
    };
    return { 
      label: 'Low Match', 
      color: 'text-amber-700', 
      bg: 'bg-amber-500',
      lightBg: 'bg-amber-50',
      border: 'border-amber-500',
    };
  };

  const matchLevel = getMatchLevel(candidate.matchScore);

  // Handle resume download - Generate PDF on frontend
  const handleDownloadResume = () => {
    if (!candidate || isDownloading) return;
    
    setIsDownloading(true);
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      let yPosition = margin;
      const lineHeight = 7;
      const sectionSpacing = 10;

      // Helper function to add text with word wrap
      const addText = (text: string, fontSize: number, isBold: boolean = false, color: string = '#000000', align: 'left' | 'center' | 'right' = 'left') => {
        doc.setFontSize(fontSize);
        doc.setFont('helvetica', isBold ? 'bold' : 'normal');
        doc.setTextColor(color);
        
        const maxWidth = pageWidth - (margin * 2);
        const lines = doc.splitTextToSize(text, maxWidth);
        
        if (yPosition + (lines.length * lineHeight) > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }
        
        lines.forEach((line: string) => {
          const xPosition = align === 'center' ? pageWidth / 2 : (align === 'right' ? pageWidth - margin : margin);
          doc.text(line, xPosition, yPosition, { align });
          yPosition += lineHeight;
        });
      };

      // Header (centered, matching Resume tab)
      addText(candidate.name, 24, true, '#000000', 'center');
      yPosition += 2;
      addText(candidate.title, 14, false, '#666666', 'center');
      yPosition += 5;

      // Contact Information (centered, using candidate data from props)
      const contactInfo: string[] = [];
      if (candidate.email && candidate.email !== 'N/A') contactInfo.push(candidate.email);
      if (candidate.phone && candidate.phone !== 'N/A') contactInfo.push(candidate.phone);
      if (candidate.location && candidate.location !== 'N/A') contactInfo.push(candidate.location);
      
      if (contactInfo.length > 0) {
        addText(contactInfo.join(' • '), 10, false, '#666666', 'center');
        yPosition += sectionSpacing;
      }

      // Add separator line
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += sectionSpacing;

      // Professional Summary (using candidate data from props)
      if (candidate.summary) {
        addText('Professional Summary', 16, true, '#333333');
        yPosition += 3;
        addText(candidate.summary, 10);
        yPosition += sectionSpacing;
      }

      // Work Experience (using candidate data)
      if (candidate.experience) {
        addText('Work Experience', 16, true, '#333333');
        yPosition += 3;
        addText(`${candidate.experience} years of experience`, 10);
        if (candidate.title) {
          yPosition += 2;
          addText(`Current Role: ${candidate.title}`, 10);
        }
        yPosition += sectionSpacing;
      }

      // Education (using candidate data from props)
      if (candidate.education) {
        addText('Education', 16, true, '#333333');
        yPosition += 3;
        addText(candidate.education, 10);
        yPosition += sectionSpacing;
      }

      // Technical Skills (using candidate data from props)
      if (candidate.skills && candidate.skills.length > 0) {
        addText('Technical Skills', 16, true, '#333333');
        yPosition += 3;
        addText(candidate.skills.join(', '), 10);
        yPosition += sectionSpacing;
      }

      // Social Links (if available)
      const socialLinks: string[] = [];
      if (candidate.linkedIn) socialLinks.push(`LinkedIn: ${candidate.linkedIn}`);
      if (candidate.github) socialLinks.push(`GitHub: ${candidate.github}`);
      if (candidate.website) socialLinks.push(`Website: ${candidate.website}`);
      
      if (socialLinks.length > 0) {
        addText('Online Presence', 16, true, '#333333');
        yPosition += 3;
        socialLinks.forEach((link) => {
          addText(link, 10);
          yPosition -= 1;
        });
        yPosition += sectionSpacing;
      }

      // Save the PDF
      const fileName = `${candidate.name.replace(/\s+/g, '_')}_Resume.pdf`;
      doc.save(fileName);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('Failed to generate PDF. Please try again later.');
    } finally {
      setIsDownloading(false);
    }
  };

  const matchBreakdown = [
    { 
      id: 'technical-skills',
      category: 'Technical Skills', 
      score: 96, 
      weight: 30,
      icon: Code,
      details: [
        { name: 'Machine Learning', match: 98, required: true },
        { name: 'Python', match: 100, required: true },
        { name: 'TensorFlow', match: 95, required: true },
        { name: 'PyTorch', match: 92, required: true },
        { name: 'NLP', match: 94, required: false },
      ]
    },
    { 
      id: 'experience',
      category: 'Experience Level', 
      score: 92, 
      weight: 25,
      icon: Briefcase,
      details: [
        { name: 'Years of Experience', match: 95, required: true },
        { name: 'Industry Experience', match: 90, required: true },
        { name: 'Company Size', match: 88, required: false },
        { name: 'Remote Work', match: 95, required: false },
      ]
    },
    { 
      id: 'education',
      category: 'Education & Credentials', 
      score: 98, 
      weight: 20,
      icon: GraduationCap,
      details: [
        { name: 'Degree Level', match: 100, required: true },
        { name: 'Field of Study', match: 100, required: true },
        { name: 'University Tier', match: 95, required: false },
        { name: 'Certifications', match: 92, required: false },
      ]
    },
    { 
      id: 'cultural-fit',
      category: 'Cultural Fit', 
      score: 88, 
      weight: 15,
      icon: Users,
      details: [
        { name: 'Work Style', match: 90, required: false },
        { name: 'Team Collaboration', match: 88, required: false },
        { name: 'Communication', match: 86, required: false },
        { name: 'Company Values', match: 88, required: false },
      ]
    },
    { 
      id: 'leadership',
      category: 'Leadership Potential', 
      score: 95, 
      weight: 10,
      icon: Star,
      details: [
        { name: 'Team Management', match: 96, required: false },
        { name: 'Mentorship', match: 98, required: false },
        { name: 'Strategic Thinking', match: 92, required: false },
        { name: 'Decision Making', match: 94, required: false },
      ]
    },
  ];

  const timeline = [
    { 
      year: '2023 - Present', 
      role: 'Senior ML Engineer', 
      company: 'Tech Innovations Inc.',
      description: 'Leading ML infrastructure and mentoring team of 5 engineers',
      duration: '1.5 years'
    },
    { 
      year: '2020 - 2023', 
      role: 'ML Engineer', 
      company: 'AI Research Labs',
      description: 'Built computer vision systems, published 8 research papers',
      duration: '3 years'
    },
    { 
      year: '2016 - 2020', 
      role: 'Ph.D. Researcher', 
      company: 'Stanford University',
      description: 'Research in machine learning and neural networks',
      duration: '4 years'
    },
  ];

  const aiInsights = [
    { 
      icon: GraduationCap, 
      title: 'Ph.D. Credentials',
      text: 'Ph.D. from Stanford - can contribute to advanced research initiatives and mentor junior researchers',
      category: 'Education',
      color: 'text-primary',
      bgColor: 'bg-primary/5',
      iconBg: 'bg-primary/10'
    },
    { 
      icon: Users, 
      title: 'Leadership Potential',
      text: 'Strong team lead potential - has mentored 5+ engineers and led cross-functional projects',
      category: 'Leadership',
      color: 'text-primary',
      bgColor: 'bg-primary/5',
      iconBg: 'bg-primary/10'
    },
    { 
      icon: Building2, 
      title: 'Similar Company Experience',
      text: 'Worked at AI Research Labs with similar scale and product complexity',
      category: 'Experience',
      color: 'text-primary',
      bgColor: 'bg-primary/5',
      iconBg: 'bg-primary/10'
    },
    { 
      icon: GitBranch, 
      title: 'Open Source Contributor',
      text: 'Active open source contributor with 5,000+ GitHub stars on ML framework',
      category: 'Technical',
      color: 'text-primary',
      bgColor: 'bg-primary/5',
      iconBg: 'bg-primary/10'
    },
    { 
      icon: Globe, 
      title: 'Strong Online Presence',
      text: 'Excellent GitHub, LinkedIn, and personal blog with technical articles',
      category: 'Profile',
      color: 'text-primary',
      bgColor: 'bg-primary/5',
      iconBg: 'bg-primary/10'
    },
    { 
      icon: BookOpen, 
      title: 'Research Publications',
      text: '8 publications in top-tier ML conferences (NeurIPS, ICML, CVPR)',
      category: 'Research',
      color: 'text-primary',
      bgColor: 'bg-primary/5',
      iconBg: 'bg-primary/10'
    },
  ];

  const suggestedRoles = [
    { title: 'ML Research Scientist', match: 96, department: 'AI Research', reqId: 'REQ-2024-089' },
    { title: 'Senior ML Engineer - NLP', match: 94, department: 'Product AI', reqId: 'REQ-2024-112' },
    { title: 'AI/ML Team Lead', match: 91, department: 'Engineering', reqId: 'REQ-2024-145' },
  ];

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus as any);
  };

  const getNextStatus = () => {
    const statusFlow = ['new', 'screening', 'interview', 'offer', 'hired'];
    const currentIndex = statusFlow.indexOf(status);
    return statusFlow[currentIndex + 1] || status;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500 text-white';
      case 'screening': return 'bg-amber-500 text-white';
      case 'interview': return 'bg-primary text-white';
      case 'offer': return 'bg-emerald-500 text-white';
      case 'hired': return 'bg-green-600 text-white';
      case 'rejected': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const biasScore = 94;

  return (
    <div className="p-8 space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onClose} className="hover:bg-gray-100">
          <ArrowLeft className="size-4 mr-2" />
          Back to Candidates
        </Button>
        <div className="flex items-center gap-3">
          <Select value={assignedTo} onValueChange={setAssignedTo}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Assign to..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="john-doe">
                <div className="flex items-center gap-2">
                  <Avatar className="size-5">
                    <AvatarFallback className="bg-primary text-white text-xs">JD</AvatarFallback>
                  </Avatar>
                  <span>John Doe (Recruiter)</span>
                </div>
              </SelectItem>
              <SelectItem value="sarah-miller">
                <div className="flex items-center gap-2">
                  <Avatar className="size-5">
                    <AvatarFallback className="bg-blue-600 text-white text-xs">SM</AvatarFallback>
                  </Avatar>
                  <span>Sarah Miller (Hiring Manager)</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="screening">Screening</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="offer">Offer</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50"
            onClick={() => handleStatusChange('rejected')}
          >
            <X className="size-4 mr-2" />
            Reject
          </Button>
          <Button
            className="bg-primary hover:bg-primary/90 text-white"
            onClick={() => handleStatusChange(getNextStatus())}
          >
            <ChevronRight className="size-4 mr-2" />
            Move to {getNextStatus().charAt(0).toUpperCase() + getNextStatus().slice(1)}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Profile Summary */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Profile Card */}
          <Card className="p-6">
            <div className="flex flex-col items-center text-center mb-4">
              <Avatar className="size-20 mb-3 border-4 border-white shadow-lg ring-2 ring-gray-100">
                {candidate.avatar ? (
                  <AvatarImage src={candidate.avatar} alt={candidate.name} />
                ) : null}
                <AvatarFallback className="bg-primary text-white text-xl">
                  {candidate.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-gray-900 mb-1">{candidate.name}</h2>
              <p className="text-sm text-gray-600 mb-2">{candidate.title}</p>
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <Badge className={`${getStatusColor(status)} px-2 py-0.5 text-xs`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  {candidate.experience}y exp
                </Badge>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {candidate.email && (
                <div className="flex items-center gap-2 text-sm text-gray-700 p-2 bg-gray-50 rounded">
                  <Mail className="size-4 text-primary flex-shrink-0" />
                  <span className="truncate text-xs">{candidate.email}</span>
                </div>
              )}
              {candidate.phone && (
                <div className="flex items-center gap-2 text-sm text-gray-700 p-2 bg-gray-50 rounded">
                  <Phone className="size-4 text-primary flex-shrink-0" />
                  <span className="text-xs">{candidate.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-700 p-2 bg-gray-50 rounded">
                <MapPin className="size-4 text-primary flex-shrink-0" />
                <span className="text-xs">{candidate.location}</span>
              </div>
            </div>

            <Separator className="my-3" />

            {/* Social Links */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {candidate.linkedIn && (
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={`https://${candidate.linkedIn}`} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="size-4" />
                  </a>
                </Button>
              )}
              {candidate.github && (
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={`https://${candidate.github}`} target="_blank" rel="noopener noreferrer">
                    <Github className="size-4" />
                  </a>
                </Button>
              )}
              {candidate.website && (
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={`https://${candidate.website}`} target="_blank" rel="noopener noreferrer">
                    <Globe className="size-4" />
                  </a>
                </Button>
              )}
            </div>

            <Separator className="my-4" />

            {/* Resume Download */}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleDownloadResume}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <FileText className="size-4 mr-2" />
                  Download Resume
                </>
              )}
            </Button>
          </Card>

          {/* Match Score Card */}
          <Card className={`border-2 ${matchLevel.border} ${matchLevel.lightBg} p-6`}>
            <div className="text-center mb-4">
              <div className={`text-5xl ${matchLevel.color} mb-2`}>{candidate.matchScore}%</div>
              <p className="text-sm text-gray-600 mb-2">Match Score</p>
              <Badge className={`${matchLevel.bg} text-white`}>
                {matchLevel.label}
              </Badge>
            </div>
            
            <Separator className="my-4" />

            <div className="space-y-3">
              {matchBreakdown.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="size-4 text-gray-600" />
                      <span className="text-sm text-gray-700">{item.category}</span>
                    </div>
                    <span className="text-sm text-gray-900">{item.score}%</span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Bias Score */}
          <Card className="p-6 bg-emerald-50 border-emerald-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="size-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Shield className="size-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="text-sm text-gray-900">Bias Score</h4>
                <p className="text-xs text-gray-600">Fairness assessment</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Progress value={biasScore} className="flex-1 mr-3" />
              <span className="text-2xl text-emerald-600">{biasScore}%</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">No bias indicators detected</p>
          </Card>
        </div>

        {/* Right Column - Tabbed Content */}
        <div className="col-span-12 lg:col-span-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="resume">Resume</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Skills */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="size-5 text-primary" />
                  <h3 className="text-gray-900">Technical Skills</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* Certifications */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="size-5 text-amber-600" />
                  <h3 className="text-gray-900">Certifications</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-600 text-white">
                    <Award className="size-3 mr-1" />
                    TensorFlow Certified
                  </Badge>
                  <Badge className="bg-primary text-white">
                    <Award className="size-3 mr-1" />
                    AWS ML Specialty
                  </Badge>
                  <Badge className="bg-emerald-600 text-white">
                    <Award className="size-3 mr-1" />
                    Google Cloud ML
                  </Badge>
                </div>
              </Card>

              {/* Match Breakdown Details */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="size-5 text-primary" />
                  <h3 className="text-gray-900">Match Breakdown</h3>
                </div>
                <Accordion type="single" collapsible className="space-y-2">
                  {matchBreakdown.map((item) => {
                    const Icon = item.icon;
                    return (
                      <AccordionItem key={item.id} value={item.id} className="border rounded px-4 bg-white">
                        <AccordionTrigger className="hover:no-underline py-3">
                          <div className="flex items-center justify-between w-full pr-4">
                            <div className="flex items-center gap-3">
                              <Icon className="size-5 text-gray-600" />
                              <span className="text-sm text-gray-900">{item.category}</span>
                            </div>
                            <span className="text-sm text-gray-900">{item.score}%</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pt-2 pb-3">
                            {item.details.map((detail, index) => (
                              <div key={index} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                  <span className="text-gray-700">{detail.name}</span>
                                  {detail.required && (
                                    <Badge variant="outline" className="text-xs">Required</Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Progress value={detail.match} className="w-24 h-1.5" />
                                  <span className="text-gray-900 w-10 text-right">{detail.match}%</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </Card>

              {/* Suggested Roles */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="size-5 text-primary" />
                  <h3 className="text-gray-900">Other Matching Roles</h3>
                </div>
                <div className="space-y-3">
                  {suggestedRoles.map((role, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded border hover:border-primary transition-colors cursor-pointer">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="text-sm text-gray-900 mb-1">{role.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Building2 className="size-3" />
                            <span>{role.department}</span>
                            <span>•</span>
                            <span>{role.reqId}</span>
                          </div>
                        </div>
                        <Badge className="bg-primary/10 text-primary">
                          {role.match}% match
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Resume Tab */}
            <TabsContent value="resume" className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <FileText className="size-5 text-primary" />
                    <h3 className="text-gray-900">Resume</h3>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleDownloadResume}
                    disabled={isDownloading}
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 className="size-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Download className="size-4 mr-2" />
                        Download PDF
                      </>
                    )}
                  </Button>
                </div>

                {/* Resume Preview */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-8 space-y-6">
                  {/* Header */}
                  <div className="text-center border-b pb-6">
                    <h1 className="text-3xl text-gray-900 mb-2">{candidate.name}</h1>
                    <p className="text-lg text-gray-600 mb-3">{candidate.title}</p>
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-600 flex-wrap">
                      {candidate.email && (
                        <>
                          <span className="flex items-center gap-1">
                            <Mail className="size-4" />
                            {candidate.email}
                          </span>
                          {(candidate.phone || candidate.location) && <span>•</span>}
                        </>
                      )}
                      {candidate.phone && (
                        <>
                          <span className="flex items-center gap-1">
                            <Phone className="size-4" />
                            {candidate.phone}
                          </span>
                          {candidate.location && <span>•</span>}
                        </>
                      )}
                      {candidate.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="size-4" />
                          {candidate.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  <div>
                    <h2 className="text-xl text-gray-900 mb-3">Professional Summary</h2>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Senior Machine Learning Engineer with {candidate.experience}+ years of experience in developing and deploying ML systems at scale. 
                      Ph.D. in Computer Science from Stanford University with focus on deep learning and neural networks. 
                      Proven track record of leading teams, publishing research, and building production ML infrastructure. 
                      Expertise in Python, TensorFlow, PyTorch, and distributed systems.
                    </p>
                  </div>

                  {/* Experience */}
                  <div>
                    <h2 className="text-xl text-gray-900 mb-4">Work Experience</h2>
                    <div className="space-y-5">
                      {timeline.map((item, index) => (
                        <div key={index}>
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg text-gray-900">{item.role}</h3>
                              <p className="text-sm text-gray-600">{item.company}</p>
                            </div>
                            <p className="text-sm text-gray-600">{item.year}</p>
                          </div>
                          <p className="text-sm text-gray-700">{item.description}</p>
                          <ul className="mt-2 ml-5 space-y-1 text-sm text-gray-700 list-disc">
                            <li>Led development of ML infrastructure serving 10M+ daily predictions</li>
                            <li>Mentored team of 5 engineers and established best practices</li>
                            <li>Improved model accuracy by 15% through novel architecture design</li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h2 className="text-xl text-gray-900 mb-4">Education</h2>
                    <div>
                      <h3 className="text-lg text-gray-900">Ph.D. in Computer Science</h3>
                      <p className="text-sm text-gray-600">Stanford University | 2016 - 2020</p>
                      <p className="text-sm text-gray-700 mt-1">
                        Dissertation: "Advanced Neural Network Architectures for Natural Language Understanding"
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        Published 8 papers in top-tier conferences (NeurIPS, ICML, CVPR)
                      </p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h2 className="text-xl text-gray-900 mb-3">Technical Skills</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm text-gray-900 mb-2">Languages & Frameworks</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {candidate.skills.slice(0, 6).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm text-gray-900 mb-2">Specializations</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {candidate.skills.slice(6).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <h2 className="text-xl text-gray-900 mb-3">Certifications</h2>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• TensorFlow Developer Certificate (Google, 2023)</li>
                      <li>• AWS Certified Machine Learning - Specialty (Amazon, 2022)</li>
                      <li>• Google Cloud Professional ML Engineer (Google, 2022)</li>
                      <li>• Kubernetes Administrator (CNCF, 2021)</li>
                    </ul>
                  </div>

                  {/* Publications */}
                  <div>
                    <h2 className="text-xl text-gray-900 mb-3">Selected Publications</h2>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>
                        <span className="text-gray-900">"{candidate.name.split(' ')[1]} et al. (2024)"</span> - 
                        Advanced Attention Mechanisms for Vision Tasks. <em>NeurIPS 2024</em>
                      </li>
                      <li>
                        <span className="text-gray-900">"{candidate.name.split(' ')[1]} et al. (2023)"</span> - 
                        Efficient Training of Large Language Models. <em>ICML 2023</em>
                      </li>
                      <li>
                        <span className="text-gray-900">"{candidate.name.split(' ')[1]} et al. (2022)"</span> - 
                        Neural Architecture Search for Computer Vision. <em>CVPR 2022</em>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience" className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Briefcase className="size-5 text-primary" />
                  <h3 className="text-gray-900">Work Experience</h3>
                </div>
                <div className="space-y-6">
                  {timeline.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Briefcase className="size-5 text-primary" />
                        </div>
                        {index < timeline.length - 1 && (
                          <div className="w-px h-full bg-gray-200 mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-gray-900">{item.role}</h4>
                            <p className="text-sm text-gray-600">{item.company}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">{item.year}</p>
                            <p className="text-xs text-gray-500">{item.duration}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <GraduationCap className="size-5 text-primary" />
                  <h3 className="text-gray-900">Education</h3>
                </div>
                <div className="flex gap-4">
                  <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="size-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-gray-900">Ph.D. in Computer Science</h4>
                    <p className="text-sm text-gray-600">Stanford University</p>
                    <p className="text-sm text-gray-500 mt-1">2016 - 2020</p>
                    <p className="text-sm text-gray-700 mt-2">Research focus: Machine Learning and Neural Networks</p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* AI Insights Tab */}
            <TabsContent value="insights" className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="size-5 text-primary" />
                  <h3 className="text-gray-900">AI-Generated Insights</h3>
                </div>
                <div className="space-y-3">
                  {aiInsights.map((insight, index) => {
                    const Icon = insight.icon;
                    return (
                      <div key={index} className={`p-4 ${insight.bgColor} rounded border border-gray-200`}>
                        <div className="flex items-start gap-3">
                          <div className={`size-10 ${insight.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`size-5 ${insight.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-1">
                              <h4 className="text-sm text-gray-900">{insight.title}</h4>
                              <Badge variant="outline" className="text-xs">{insight.category}</Badge>
                            </div>
                            <p className="text-sm text-gray-700">{insight.text}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="size-5 text-primary" />
                  <h3 className="text-gray-900">Training & Onboarding</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Estimated onboarding time</span>
                    <Badge className="bg-primary/10 text-primary">2 weeks</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Technical readiness</span>
                    <Badge className="bg-emerald-100 text-emerald-700">High</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Cultural fit probability</span>
                    <Badge className="bg-emerald-100 text-emerald-700">88%</Badge>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Activity className="size-5 text-primary" />
                  <h3 className="text-gray-900">Activity Timeline</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center pt-1">
                      <div className="size-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Eye className="size-4 text-blue-600" />
                      </div>
                      <div className="w-px h-full bg-gray-200 mt-2" />
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-sm text-gray-900">Profile viewed by John Doe</p>
                        <span className="text-xs text-gray-500">10 min ago</span>
                      </div>
                      <p className="text-xs text-gray-600">Viewed candidate details and resume</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex flex-col items-center pt-1">
                      <div className="size-8 bg-emerald-100 rounded-full flex items-center justify-center">
                        <MessageSquare className="size-4 text-emerald-600" />
                      </div>
                      <div className="w-px h-full bg-gray-200 mt-2" />
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-sm text-gray-900">Status changed to Screening</p>
                        <span className="text-xs text-gray-500">2 hours ago</span>
                      </div>
                      <p className="text-xs text-gray-600">By Sarah Miller</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex flex-col items-center pt-1">
                      <div className="size-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Calendar className="size-4 text-primary" />
                      </div>
                      <div className="w-px h-full bg-gray-200 mt-2" />
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-sm text-gray-900">Initial application received</p>
                        <span className="text-xs text-gray-500">1 day ago</span>
                      </div>
                      <p className="text-xs text-gray-600">Applied via LinkedIn</p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Notes Tab */}
            <TabsContent value="notes" className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <StickyNote className="size-5 text-primary" />
                  <h3 className="text-gray-900">Team Notes</h3>
                </div>
                
                {/* Add new note */}
                <Card className="p-4 border-2 border-dashed mb-6">
                  <Textarea placeholder="Add a new note..." className="mb-3" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="private" className="rounded" />
                      <label htmlFor="private" className="text-xs text-gray-600">Private note</label>
                    </div>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                      <Plus className="size-4 mr-1" />
                      Save Note
                    </Button>
                  </div>
                </Card>

                {/* Existing notes */}
                <div className="space-y-3">
                  <Card className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="size-8">
                          <AvatarFallback className="bg-primary text-white text-xs">JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-xs text-gray-900">John Doe</p>
                          <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                      <Badge variant="outline">Public</Badge>
                    </div>
                    <p className="text-sm text-gray-700">
                      Excellent technical background. Ph.D. from Stanford with strong publication record. Should definitely move forward with technical screening.
                    </p>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="size-8">
                          <AvatarFallback className="bg-blue-600 text-white text-xs">SM</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-xs text-gray-900">Sarah Miller</p>
                          <p className="text-xs text-gray-500">1 day ago</p>
                        </div>
                      </div>
                      <Badge variant="outline">Team</Badge>
                    </div>
                    <p className="text-sm text-gray-700">
                      Reviewed resume - publications look great. Experience aligns well with ML infrastructure role. Should we schedule technical screening?
                    </p>
                  </Card>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}