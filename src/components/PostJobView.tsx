import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { JDTemplateManager } from './JDTemplateManager';
import { 
  Briefcase, 
  Building2, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Users,
  Sparkles,
  Wand2,
  Globe,
  Linkedin,
  ExternalLink,
  Copy,
  CheckCircle,
  ChevronLeft,
  ArrowRight,
  Loader2,
  Tag,
  X,
  Plus,
  FileText,
  Target,
  TrendingUp,
  MessageSquare,
  Clock,
  Award
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface PostJobViewProps {
  onBack: () => void;
}

export function PostJobView({ onBack }: PostJobViewProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGeneratingJD, setIsGeneratingJD] = useState(false);
  const [isGeneratingKeywords, setIsGeneratingKeywords] = useState(false);
  const [showTemplateManager, setShowTemplateManager] = useState(false);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [showAutomatchResults, setShowAutomatchResults] = useState(false);
  
  // Company details from business setup
  const companyDetails = {
    name: 'Tech Innovations Inc.',
    legalName: 'Tech Innovations Incorporated',
    website: 'https://techinnovations.com',
    industry: 'Technology',
    size: '100-500 employees',
    location: 'San Francisco, CA',
    description: 'Leading AI and machine learning solutions provider focused on revolutionizing recruitment technology.',
    logoUrl: ''
  };

  const [jobData, setJobData] = useState({
    title: '',
    department: '',
    level: '',
    location: '',
    locationType: 'office',
    salaryMin: '',
    salaryMax: '',
    currency: 'USD',
    openings: '1',
    description: '',
    requirements: '',
    responsibilities: '',
    benefits: '',
    hiringManager: '',
    recruiters: [] as string[],
  });

  const [keywords, setKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState('');

  const [selectedPlatforms, setSelectedPlatforms] = useState({
    linkedin: false,
    monster: false,
    indeed: false,
    glassdoor: false,
    ziprecruiter: false,
    dice: false,
  });

  const platforms = [
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-600', description: 'Professional networking' },
    { id: 'monster', name: 'Monster', icon: Briefcase, color: 'bg-purple-600', description: 'Career marketplace' },
    { id: 'indeed', name: 'Indeed', icon: Globe, color: 'bg-blue-700', description: '#1 job site worldwide' },
    { id: 'glassdoor', name: 'Glassdoor', icon: Building2, color: 'bg-green-600', description: 'Company reviews & jobs' },
    { id: 'ziprecruiter', name: 'ZipRecruiter', icon: Briefcase, color: 'bg-cyan-600', description: 'Smart matching technology' },
    { id: 'dice', name: 'Dice', icon: Briefcase, color: 'bg-red-600', description: 'Tech & IT jobs' },
  ];

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => ({
      ...prev,
      [platformId]: !prev[platformId as keyof typeof prev]
    }));
  };

  const generateJobDescription = async () => {
    setIsGeneratingJD(true);
    // Simulate AI generation
    setTimeout(() => {
      const generatedJD = `We are seeking a talented ${jobData.title} to join our ${jobData.department} team at ${companyDetails.name}.

About ${companyDetails.name}:
${companyDetails.description}

Role Overview:
As a ${jobData.title}, you will play a crucial role in driving innovation and contributing to our mission of revolutionizing the industry through cutting-edge technology.

Key Responsibilities:
• Lead and contribute to major technical initiatives and projects
• Collaborate with cross-functional teams to deliver high-quality solutions
• Mentor junior team members and promote best practices
• Drive continuous improvement and innovation in processes and technology
• Participate in architectural decisions and technical strategy planning

Required Qualifications:
• Bachelor's degree in Computer Science, Engineering, or related field
• 5+ years of relevant experience in the field
• Strong technical skills and problem-solving abilities
• Excellent communication and collaboration skills
• Proven track record of delivering complex projects

What We Offer:
• Competitive salary and equity package
• Comprehensive health, dental, and vision insurance
• Flexible work arrangements and remote options
• Professional development opportunities
• Collaborative and innovative work environment
• Cutting-edge technology stack`;

      setJobData(prev => ({ ...prev, description: generatedJD }));
      setIsGeneratingJD(false);
    }, 2000);
  };

  const generateKeywords = async () => {
    setIsGeneratingKeywords(true);
    // Simulate AI generation
    setTimeout(() => {
      const generatedKeywords = [
        jobData.title.toLowerCase(),
        jobData.department.toLowerCase(),
        jobData.level,
        'remote work',
        'innovation',
        'technology',
        'team collaboration',
        'problem solving',
        companyDetails.industry.toLowerCase(),
        'career growth'
      ].filter(k => k);
      setKeywords(generatedKeywords);
      setIsGeneratingKeywords(false);
    }, 1500);
  };

  const addKeyword = () => {
    if (newKeyword && !keywords.includes(newKeyword.toLowerCase())) {
      setKeywords([...keywords, newKeyword.toLowerCase()]);
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    alert('Job posted successfully! The job will be published to selected platforms.');
    onBack();
  };

  return (
    <div className="space-y-6">
      {/* Template Manager Dialog */}
      {showTemplateManager && (
        <JDTemplateManager
          onSelectTemplate={(template) => {
            setJobData({ ...jobData, description: template.content });
            setShowTemplateManager(false);
          }}
          onClose={() => setShowTemplateManager(false)}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="size-10">
            <ChevronLeft className="size-5" />
          </Button>
          <div>
            <h1 className="text-gray-900 flex items-center gap-3">
              <div className="size-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Briefcase className="size-6 text-white" />
              </div>
              Post New Job
            </h1>
            <p className="text-gray-600 mt-1">
              Create and publish job listings with AI assistance
            </p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div className={`flex items-center gap-3 ${step < 3 ? 'flex-1' : ''}`}>
                <div className={`size-10 rounded-full flex items-center justify-center ${
                  currentStep >= step 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > step ? (
                    <CheckCircle className="size-5" />
                  ) : (
                    <span>{step}</span>
                  )}
                </div>
                <div className="hidden md:block">
                  <p className={`text-sm ${currentStep >= step ? 'text-gray-900' : 'text-gray-500'}`}>
                    {step === 1 && 'Job Details'}
                    {step === 2 && 'Description & Keywords'}
                    {step === 3 && 'Publish'}
                  </p>
                </div>
              </div>
              {step < 3 && (
                <div className={`h-0.5 flex-1 mx-4 ${
                  currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Step 1: Job Details */}
      {currentStep === 1 && (
        <div className="space-y-6">
          {/* Company Info Card */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
            <div className="flex items-start gap-4">
              <div className="size-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Building2 className="size-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-gray-900">{companyDetails.name}</h3>
                  <Badge className="bg-green-500 text-white">
                    <CheckCircle className="size-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{companyDetails.description}</p>
                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Building2 className="size-4" />
                    {companyDetails.industry}
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Users className="size-4" />
                    {companyDetails.size}
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="size-4" />
                    {companyDetails.location}
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Globe className="size-4" />
                    <a href={companyDetails.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Website
                    </a>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Edit Company Info
              </Button>
            </div>
          </Card>

          {/* Job Details Form */}
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Job Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g. Senior Software Engineer"
                  value={jobData.title}
                  onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="department">Department *</Label>
                <Select value={jobData.department} onValueChange={(value) => setJobData({ ...jobData, department: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="HR">Human Resources</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="level">Level *</Label>
                <Select value={jobData.level} onValueChange={(value) => setJobData({ ...jobData, level: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="mid">Mid Level</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="executive">Executive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g. San Francisco, CA"
                  value={jobData.location}
                  onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="locationType">Work Type *</Label>
                <Select value={jobData.locationType} onValueChange={(value) => setJobData({ ...jobData, locationType: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select work type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="office">On-site</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="salaryMin">Minimum Salary</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="salaryMin"
                    type="number"
                    placeholder="80000"
                    value={jobData.salaryMin}
                    onChange={(e) => setJobData({ ...jobData, salaryMin: e.target.value })}
                    className="flex-1"
                  />
                  <Select value={jobData.currency} onValueChange={(value) => setJobData({ ...jobData, currency: value })}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="salaryMax">Maximum Salary</Label>
                <Input
                  id="salaryMax"
                  type="number"
                  placeholder="120000"
                  value={jobData.salaryMax}
                  onChange={(e) => setJobData({ ...jobData, salaryMax: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="openings">Number of Openings</Label>
                <Input
                  id="openings"
                  type="number"
                  placeholder="1"
                  value={jobData.openings}
                  onChange={(e) => setJobData({ ...jobData, openings: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="hiringManager">Hiring Manager</Label>
                <Input
                  id="hiringManager"
                  placeholder="e.g. John Smith"
                  value={jobData.hiringManager}
                  onChange={(e) => setJobData({ ...jobData, hiringManager: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Step 2: Description & Keywords */}
      {currentStep === 2 && (
        <div className="space-y-6">
          {/* Template Selection */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="size-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="size-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-1">Use Job Description Template</h3>
                  <p className="text-sm text-gray-600">
                    Start with a pre-made template or create from scratch
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => setShowTemplateManager(true)}
                variant="outline"
                className="border-blue-300"
              >
                <FileText className="size-4 mr-2" />
                Browse Templates
              </Button>
            </div>
          </Card>

          {/* AI Job Description Generator */}
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="size-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="size-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-1">AI-Powered Job Description</h3>
                  <p className="text-sm text-gray-600">
                    Generate a comprehensive job description using AI based on your job details
                  </p>
                </div>
              </div>
              <Button 
                onClick={generateJobDescription}
                disabled={isGeneratingJD || !jobData.title}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isGeneratingJD ? (
                  <>
                    <Loader2 className="size-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="size-4 mr-2" />
                    Generate with AI
                  </>
                )}
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <Label htmlFor="description">Job Description *</Label>
            <Textarea
              id="description"
              placeholder="Enter the job description or use AI to generate one..."
              value={jobData.description}
              onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
              className="mt-2 min-h-[300px]"
            />
          </Card>

          {/* AI Keywords Generator */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="size-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Tag className="size-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-1">SEO Keywords</h3>
                  <p className="text-sm text-gray-600">
                    AI-generated keywords to improve job visibility on platforms
                  </p>
                </div>
              </div>
              <Button 
                onClick={generateKeywords}
                disabled={isGeneratingKeywords || !jobData.title}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isGeneratingKeywords ? (
                  <>
                    <Loader2 className="size-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4 mr-2" />
                    Generate Keywords
                  </>
                )}
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Add custom keyword..."
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                />
                <Button onClick={addKeyword} variant="outline">
                  <Plus className="size-4" />
                </Button>
              </div>

              {keywords.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary" className="px-3 py-1">
                      {keyword}
                      <button
                        onClick={() => removeKeyword(keyword)}
                        className="ml-2 hover:text-red-600"
                      >
                        <X className="size-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Step 3: Publish */}
      {currentStep === 3 && (
        <div className="space-y-6">
          {/* Platform Selection */}
          <Card className="p-6">
            <div className="mb-6">
              <h3 className="text-gray-900 mb-2">Select Publishing Platforms</h3>
              <p className="text-sm text-gray-600">
                Choose where you want to publish this job posting
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                const isSelected = selectedPlatforms[platform.id as keyof typeof selectedPlatforms];
                
                return (
                  <Card
                    key={platform.id}
                    className={`p-4 cursor-pointer transition-all border-2 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => togglePlatform(platform.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`size-10 ${platform.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className="size-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-gray-900">{platform.name}</h4>
                          {isSelected && (
                            <CheckCircle className="size-4 text-blue-600" />
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          {platform.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </Card>

          {/* Job Preview */}
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Job Preview</h3>
            <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
              <div>
                <h2 className="text-gray-900 mb-2">{jobData.title || 'Job Title'}</h2>
                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Building2 className="size-4" />
                    {companyDetails.name}
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="size-4" />
                    {jobData.location || 'Location'}
                  </div>
                  <span>•</span>
                  <Badge>{jobData.locationType}</Badge>
                  {jobData.salaryMin && jobData.salaryMax && (
                    <>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <DollarSign className="size-4" />
                        ${parseInt(jobData.salaryMin).toLocaleString()} - ${parseInt(jobData.salaryMax).toLocaleString()} USD
                      </div>
                    </>
                  )}
                </div>
              </div>

              {jobData.description && (
                <div>
                  <h4 className="text-gray-900 mb-2">Description</h4>
                  <p className="text-sm text-gray-600 whitespace-pre-line">
                    {jobData.description.substring(0, 500)}
                    {jobData.description.length > 500 && '...'}
                  </p>
                </div>
              )}

              {keywords.length > 0 && (
                <div>
                  <h4 className="text-gray-900 mb-2">Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {keywords.slice(0, 10).map((keyword) => (
                      <Badge key={keyword} variant="outline">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Selected Platforms Summary */}
          {Object.values(selectedPlatforms).some(v => v) && (
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
              <div className="flex items-start gap-3">
                <div className="size-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="size-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-2">Ready to Publish</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Your job will be published to {Object.values(selectedPlatforms).filter(v => v).length} platform(s)
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(selectedPlatforms)
                      .filter(([_, selected]) => selected)
                      .map(([platformId]) => {
                        const platform = platforms.find(p => p.id === platformId);
                        return platform ? (
                          <Badge key={platformId} className="bg-white text-gray-900">
                            {platform.name}
                          </Badge>
                        ) : null;
                      })}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t">
        <Button
          variant="outline"
          onClick={currentStep === 1 ? onBack : handleBack}
        >
          <ChevronLeft className="size-4 mr-2" />
          {currentStep === 1 ? 'Cancel' : 'Back'}
        </Button>

        <div className="flex gap-3">
          {currentStep < 3 ? (
            <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
              Continue
              <ArrowRight className="size-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              className="bg-green-600 hover:bg-green-700"
              disabled={!Object.values(selectedPlatforms).some(v => v)}
            >
              <Briefcase className="size-4 mr-2" />
              Publish Job
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}