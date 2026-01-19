import { useState, useEffect } from 'react';
import { mockCandidates } from '../data/mockData';
import { type CVSearchCandidate } from '../api';
import { useNavigation } from '../hooks';
import { CandidateSearch } from './CandidateSearch';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ResumeUpload } from './ResumeUpload';
import { Download, CheckCircle, Briefcase, Star, Brain, List, MapPin, DollarSign, SlidersHorizontal, Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent } from './ui/dialog';

interface CandidateListProps {
  selectedCandidateId: string | null;
  onSelectCandidate: (id: string) => void;
}

// AI insights mapping for real candidates
const aiInsights: Record<string, {
  insights: string[];
  alternativeRoles: string[];
}> = {
  '1': {
    insights: [
      'PhD in AI - Can lead research initiatives',
      'Worked at similar product (Google AI)',
      'Strong team lead potential',
      'Open source contributor (2.3K GitHub stars)'
    ],
    alternativeRoles: ['ML Team Lead', 'AI Research Scientist']
  },
  '2': {
    insights: [
      'Strong GitHub profile (500+ contributions)',
      'Has skills not in JD: Cloud Architecture',
      'Experience in App Store management',
      'Active tech blogger on Medium (10K followers)'
    ],
    alternativeRoles: ['Tech Lead', 'Solutions Architect']
  },
  '3': {
    insights: [
      'PhD in ML from Stanford',
      'Published 15+ research papers',
      'Led ML team at Microsoft',
      'Expert in NLP and Computer Vision'
    ],
    alternativeRoles: ['ML Team Lead', 'AI Research Director', 'Staff Engineer']
  },
  '4': {
    insights: [
      'Excellent culture fit indicators',
      'Similar company experience (startup background)',
      'Strong technical skills match requirements',
      'High potential for long-term growth'
    ],
    alternativeRoles: ['Tech Lead', 'Engineering Manager']
  },
  '5': {
    insights: [
      '10+ years in mobile development',
      'Published 5 apps with 1M+ downloads',
      'Expert in React Native & Swift',
      'Strong UI/UX design skills'
    ],
    alternativeRoles: ['Mobile Team Lead', 'Product Engineer']
  },
  '6': {
    insights: [
      'DevOps expertise with AWS/GCP',
      'Automated deployment for 50+ services',
      'Strong security background',
      'Experience with Kubernetes at scale'
    ],
    alternativeRoles: ['DevOps Lead', 'Platform Engineer']
  },
  '7': {
    insights: [
      'Full-stack expertise across modern tech',
      'Built scalable systems for 10M+ users',
      'Strong architectural design skills',
      'Mentored 20+ junior engineers'
    ],
    alternativeRoles: ['Staff Engineer', 'Solutions Architect']
  },
  '8': {
    insights: [
      'Data science PhD with 8 years experience',
      'Expert in statistical modeling & ML',
      'Published research in top-tier journals',
      'Strong communication and presentation skills'
    ],
    alternativeRoles: ['Lead Data Scientist', 'ML Research Scientist']
  },
  '9': {
    insights: [
      'Product management background',
      'Strong user research skills',
      'Led teams of 15+ engineers',
      'Excellent stakeholder management'
    ],
    alternativeRoles: ['Engineering Manager', 'Director of Engineering']
  },
  '10': {
    insights: [
      'Security expert with certifications',
      'Prevented major security breaches',
      'Strong compliance knowledge',
      'Experience with security audits'
    ],
    alternativeRoles: ['Security Architect', 'CISO']
  }
};

export function CandidateList({ selectedCandidateId, onSelectCandidate }: CandidateListProps) {
  const { navigateToCandidate } = useNavigation();
  const [viewMode, setViewMode] = useState<'insights' | 'list'>('insights');
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [apiSearchResults, setApiSearchResults] = useState<CVSearchCandidate[]>([]);
  const [useApiSearch, setUseApiSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter states
  const [matchScoreFilter, setMatchScoreFilter] = useState('all');
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [skillsFilter, setSkillsFilter] = useState('');

  // Load search results from sessionStorage (from Dashboard search)
  useEffect(() => {
    const storedResults = sessionStorage.getItem('searchResults');
    const storedQuery = sessionStorage.getItem('searchQuery');
    
    if (storedResults && storedQuery) {
      const results = JSON.parse(storedResults);
      setApiSearchResults(results);
      setUseApiSearch(true);
      setSearchQuery(storedQuery);
      // Clear storage after loading
      sessionStorage.removeItem('searchResults');
      sessionStorage.removeItem('searchQuery');
    }
  }, []);

  // Candidate avatars
  const candidatesWithAvatars = mockCandidates.map((candidate, index) => {
    const avatarIndex = (index % 10) + 1;
    return {
      ...candidate,
      fakeAvatar: `https://i.pravatar.cc/150?img=${avatarIndex}`
    };
  });

  const handleSearchResults = (results: CVSearchCandidate[], query: string) => {
    setApiSearchResults(results);
    setUseApiSearch(results.length > 0);
    setSearchQuery(query);
  };

  const getSkillColor = (skill: string) => {
    const colors: Record<string, string> = {
      'Python': 'bg-green-100 text-green-700 border-green-300',
      'Machine Learning': 'bg-orange-100 text-orange-700 border-orange-300',
      'TensorFlow': 'bg-pink-100 text-pink-700 border-pink-300',
      'React': 'bg-blue-100 text-blue-700 border-blue-300',
      'Leadership': 'bg-purple-100 text-purple-700 border-purple-300',
      'AWS': 'bg-yellow-100 text-yellow-700 border-yellow-300',
      'Docker': 'bg-cyan-100 text-cyan-700 border-cyan-300',
      'Kubernetes': 'bg-indigo-100 text-indigo-700 border-indigo-300',
      'Node.js': 'bg-lime-100 text-lime-700 border-lime-300',
      'TypeScript': 'bg-sky-100 text-sky-700 border-sky-300'
    };
    return colors[skill] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  // Filter candidates
  const filteredCandidates = candidatesWithAvatars.filter(candidate => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = !query || 
      candidate.name.toLowerCase().includes(query) ||
      candidate.title.toLowerCase().includes(query) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(query)) ||
      candidate.location.toLowerCase().includes(query);
    
    const matchesScore = matchScoreFilter === 'all' || 
      (matchScoreFilter === '90' && candidate.matchScore >= 90) ||
      (matchScoreFilter === '80' && candidate.matchScore >= 80) ||
      (matchScoreFilter === '70' && candidate.matchScore >= 70);

    const matchesExperience = experienceFilter === 'all' ||
      (experienceFilter === '0-3' && candidate.experience <= 3) ||
      (experienceFilter === '3-5' && candidate.experience >= 3 && candidate.experience <= 5) ||
      (experienceFilter === '5-10' && candidate.experience >= 5 && candidate.experience <= 10) ||
      (experienceFilter === '10+' && candidate.experience > 10);
    
    return matchesSearch && matchesScore && matchesExperience;
  });

  // Use API results if available, otherwise use filtered mock data
  const displayCandidates = useApiSearch ? apiSearchResults.map(apiCandidate => ({
    id: apiCandidate.id,
    name: apiCandidate.name,
    title: apiCandidate.title,
    location: apiCandidate.location,
    avatar: apiCandidate.image || '',
    fakeAvatar: apiCandidate.image || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 10) + 1}`,
    skills: apiCandidate.skills || [],
    topSkills: apiCandidate.topSkills || [],
    summary: apiCandidate.profileSummary?.join(' ') || '',
    matchScore: Math.round(apiCandidate.matchScore),
    experience: apiCandidate.years_of_experience,
    status: 'new' as const,
    education: '',
    yearsExperience: apiCandidate.years_of_experience,
  })) : filteredCandidates;

  console.log('displayCandidates', displayCandidates);
  return (
    <div className="p-8 space-y-6">
      {/* Header with Add Candidate Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Candidates</h1>
          <p className="text-gray-600">{displayCandidates.length} candidates found{searchQuery && ` for "${searchQuery}"`}</p>
        </div>
        <Button
          size="lg"
          className="bg-green-700 hover:bg-green-800 text-white"
          onClick={() => setShowUploadDialog(true)}
        >
          <Plus className="size-5 mr-2" />
          Add Candidate
        </Button>
      </div>

      {/* Resume Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <ResumeUpload
            onUploadSuccess={(candidateId, data) => {
              console.log('✅ Resume uploaded successfully:', candidateId, data);
              setShowUploadDialog(false);
            }}
            onClose={() => setShowUploadDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* AI Search Hero */}
      <CandidateSearch 
        onSearchResults={handleSearchResults}
        redirectOnSearch={false}
      />

      {/* Results Section */}
      <div className="flex gap-6">
        {/* Main Content */}
        <div className="flex-1">
          <Card className="p-6">
            {/* View Toggle & Actions */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={viewMode === 'insights' ? 'bg-[#e6f7f5] text-[#4DB8AC]' : 'text-gray-600'}
                  onClick={() => setViewMode('insights')}
                >
                  <Brain className="size-4 mr-2" />
                  Insight
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={viewMode === 'list' ? 'bg-[#e6f7f5] text-[#4DB8AC]' : 'text-gray-600'}
                  onClick={() => setViewMode('list')}
                >
                  <List className="size-4 mr-2" />
                  List View
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-[#4DB8AC] text-[#4DB8AC] hover:bg-[#e6f7f5]">
                  <Download className="size-4 mr-2" />
                  Export Profiles
                </Button>
                <Button size="sm" className="bg-[#4DB8AC] hover:bg-[#3da89c] text-white">
                  Save Search
                </Button>
              </div>
            </div>

            {/* Insights View */}
            {viewMode === 'insights' && (
              <div className="space-y-4">
                {displayCandidates.map((candidate) => {
                  const insights = aiInsights[candidate.id] || {
                    insights: candidate.summary ? [candidate.summary] : ['Strong technical background', 'Good culture fit', 'Relevant experience'],
                    alternativeRoles: ['Senior Engineer', 'Tech Lead']
                  };

                  return (
                    <Card 
                      key={candidate.id}
                      className="p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
                      onClick={() => navigateToCandidate(candidate.id)}
                    >
                      <div className="flex gap-6">
                        {/* Left: Avatar & Basic Info */}
                        <div className="flex-shrink-0">
                          <Avatar className="size-24 mb-3">
                            <ImageWithFallback 
                              src={candidate.fakeAvatar} 
                              alt={candidate.name}
                            />
                          </Avatar>
                        </div>

                        {/* Middle: Details */}
                        <div className="flex-1 space-y-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-gray-900">{candidate.name}</h3>
                              {candidate.matchScore >= 90 && (
                                <Star className="size-5 text-amber-500 fill-amber-500" />
                              )}
                            </div>
                            <p className="text-[#4DB8AC]">{candidate.title}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                              <div className="flex items-center gap-1">
                                <MapPin className="size-4" />
                                <span>{candidate.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Briefcase className="size-4" />
                                <span>{candidate.experience} years</span>
                              </div>
                            </div>
                          </div>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-2">
                            {candidate.skills.slice(0, 5).map((skill) => (
                              <Badge 
                                key={skill} 
                                variant="outline"
                                className={getSkillColor(skill)}
                              >
                                {skill}
                              </Badge>
                            ))}
                            {candidate.skills.length > 5 && (
                              <Badge variant="outline" className="bg-gray-50 text-gray-600">
                                +{candidate.skills.length - 5} more
                              </Badge>
                            )}
                          </div>

                          {/* AI Insights */}
                          <div className="bg-[#4DB8AC] rounded-lg p-4 space-y-2">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white text-sm">Profile Summary</span>
                              <Badge className="bg-white/20 text-white border-white/30">AI Generated</Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              {insights.insights.slice(0, 4).map((insight, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-white">
                                  <CheckCircle className="size-4 flex-shrink-0" />
                                  <span>{insight}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Also Relevant */}
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-600">Also relevant:</span>
                            {insights.alternativeRoles.map((role, idx) => (
                              <span key={idx}>
                                <span className="text-[#4DB8AC]">{role}</span>
                                {idx < insights.alternativeRoles.length - 1 && (
                                  <span className="text-gray-400 mx-1">·</span>
                                )}
                              </span>
                            ))}
                          </div>

                          {/* View Details Button */}
                          <Button variant="outline" size="sm" className="border-[#4DB8AC] text-[#4DB8AC] hover:bg-[#e6f7f5]">
                            View Details →
                          </Button>
                        </div>

                        {/* Right: Match Score */}
                        <div className="flex-shrink-0 text-center">
                          <div className="relative size-24">
                            <svg className="size-24 transform -rotate-90">
                              <circle
                                cx="48"
                                cy="48"
                                r="40"
                                stroke="#e5e7eb"
                                strokeWidth="8"
                                fill="none"
                              />
                              <circle
                                cx="48"
                                cy="48"
                                r="40"
                                stroke={candidate.matchScore >= 90 ? '#10b981' : candidate.matchScore >= 85 ? '#14b8a6' : '#3b82f6'}
                                strokeWidth="8"
                                fill="none"
                                strokeDasharray={`${(candidate.matchScore / 100) * 251} 251`}
                                strokeLinecap="round"
                              />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-2xl text-gray-900">{candidate.matchScore}</span>
                              <span className="text-xs text-gray-500">Match</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <div className="space-y-3">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm text-gray-600 border-b border-gray-200">
                  <div className="col-span-4">Candidate</div>
                  <div className="col-span-2 text-center">Match Score</div>
                  <div className="col-span-6">Top Skills</div>
                </div>

                {/* Table Rows */}
                {displayCandidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="grid grid-cols-12 gap-4 px-4 py-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer items-center"
                    onClick={() => navigateToCandidate(candidate.id)}
                  >
                    {/* Candidate */}
                    <div className="col-span-4 flex items-center gap-3">
                      <Avatar className="size-12">
                        <ImageWithFallback 
                          src={candidate.fakeAvatar} 
                          alt={candidate.name}
                        />
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-gray-900">{candidate.name}</p>
                          {candidate.matchScore >= 90 && (
                            <Star className="size-4 text-amber-500 fill-amber-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{candidate.title}</p>
                      </div>
                    </div>

                    {/* Match Score */}
                    <div className="col-span-2 flex justify-center">
                      <div className="relative size-16">
                        <svg className="size-16 transform -rotate-90">
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="#e5e7eb"
                            strokeWidth="6"
                            fill="none"
                          />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke={candidate.matchScore >= 90 ? '#10b981' : candidate.matchScore >= 85 ? '#14b8a6' : '#3b82f6'}
                            strokeWidth="6"
                            fill="none"
                            strokeDasharray={`${(candidate.matchScore / 100) * 176} 176`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg text-gray-900">
                            {candidate.matchScore}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Top Skills */}
                    <div className="col-span-6 flex flex-wrap gap-2">
                      {candidate.skills.slice(0, 4).map((skill) => (
                        <Badge 
                          key={skill}
                          variant="outline"
                          className={getSkillColor(skill)}
                        >
                          {skill}
                        </Badge>
                      ))}
                      {candidate.skills.length > 4 && (
                        <Badge variant="outline" className="bg-gray-50 text-gray-600">
                          +{candidate.skills.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Advanced Filters Sidebar */}
        <div className="w-80">
          <Card className="p-6 sticky top-8">
            <div className="flex items-center gap-2 mb-6">
              <SlidersHorizontal className="size-5 text-gray-600" />
              <h3 className="text-gray-900">Advanced Filters</h3>
            </div>

            <div className="space-y-4">
              {/* Match Score */}
              <div>
                <label className="text-sm text-gray-700 mb-2 block">Match Score</label>
                <Select value={matchScoreFilter} onValueChange={setMatchScoreFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="90">90% and above</SelectItem>
                    <SelectItem value="80">80% and above</SelectItem>
                    <SelectItem value="70">70% and above</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Total Experience */}
              <div>
                <label className="text-sm text-gray-700 mb-2 block">Total Experience</label>
                <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="0-3">0-3 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5-10">5-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    setMatchScoreFilter('all');
                    setExperienceFilter('all');
                    setLocationFilter('all');
                    setSkillsFilter('');
                  }}
                >
                  Clear
                </Button>
                <Button className="flex-1 bg-[#4DB8AC] hover:bg-[#3da89c] text-white">
                  Apply
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
