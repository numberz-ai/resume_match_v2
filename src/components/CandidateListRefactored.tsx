import React, { useState, useEffect, useRef } from 'react';
import { type CVSearchCandidate } from '../api';
import { searchCandidates } from '../api/cv.api';
import { candidatesApi, type Candidate } from '../api/candidates.api';
import { CandidateSearch } from './CandidateSearch';
import { useCandidatesStore } from '../store/candidatesStore';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Download, 
  Briefcase, 
  MapPin, 
  SlidersHorizontal, 
  Plus,
  ArrowUpDown,
  Eye,
  Sparkles,
  Loader2,
  Users
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Skeleton } from './ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

interface CandidateListProps {
  selectedCandidateId?: string | null;
  onSelectCandidate?: (id: string, candidate?: Candidate) => void;
  onNavigateToAddCandidate?: () => void;
}

// AI insights mapping for real candidates
const aiInsights: Record<string, {
  insights: string[];
  alternativeRoles: string[];
}> = {
  '1': {
    insights: [
      'PhD research highly relevant',
      'Leadership experience',
      'Similar company background',
      'Strong open source presence'
    ],
    alternativeRoles: ['ML Team Lead', 'AI Research Scientist']
  },
  '2': {
    insights: [
      'Strong online profile',
      'Additional relevant skills',
      'App store management',
      'Active community contributor'
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
      'Similar company experience',
      'Strong technical skills match',
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

export function CandidateList({ 
  selectedCandidateId, 
  onSelectCandidate,
  onNavigateToAddCandidate 
}: CandidateListProps) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiSearchResults, setApiSearchResults] = useState<CVSearchCandidate[]>([]);
  const [useApiSearch, setUseApiSearch] = useState(false);
  const [showAIInsights, setShowAIInsights] = useState(true);
  const [sortField, setSortField] = useState<'name' | 'match' | 'experience'>('match');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [isLoadingDefaults, setIsLoadingDefaults] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const { getDefaultCandidates, setDefaultCandidates } = useCandidatesStore();
  
  // Initialize filters with default values (not persisted)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [skillsFilter, setSkillsFilter] = useState('');
  
  // Cleanup: abort any pending requests on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Load search results from sessionStorage (from Dashboard search)
  useEffect(() => {
    const storedResults = sessionStorage.getItem('searchResults');
    const storedQuery = sessionStorage.getItem('searchQuery');
    
    if (storedResults && storedQuery) {
      const results = JSON.parse(storedResults);
      console.log('🔍 Stored results:', results);
      setApiSearchResults(results);
      setUseApiSearch(true);
      setSearchQuery(storedQuery);
      sessionStorage.removeItem('searchResults');
      sessionStorage.removeItem('searchQuery');
      setLoading(false);
    } else {
      // Load candidates with empty query when no search query is present
      loadCandidates();
    }
  }, []);

  const loadCandidates = async (silent = false, preserveSearchQuery = false, forceRefresh = false) => {
    // Don't load defaults if we have an active search query (unless explicitly clearing)
    const currentSearchQuery = searchQuery;
    if (currentSearchQuery.trim() && !preserveSearchQuery) {
      return;
    }
    
    // Get cached candidates for reference (used in error handling)
    const cachedCandidates = getDefaultCandidates();
    
    // If forceRefresh is true (e.g., when clearing filters), always show loader and fetch fresh data
    if (forceRefresh) {
      setLoading(true);
    } else {
      // Check cache first - show immediately if available (only when not forcing refresh)
      if (cachedCandidates) {
        console.log('⚡ Using cached default candidates');
        setApiSearchResults(cachedCandidates);
        setUseApiSearch(true);
        if (!preserveSearchQuery) {
          setSearchQuery('');
        }
        // Still fetch in background to refresh cache, but don't show loading
        if (!silent) {
          setLoading(false);
        }
      } else {
        // No cache, show loading if not silent
        if (!silent) {
          setLoading(true);
        }
      }
    }
    
    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      console.log('🚫 Cancelling previous loadCandidates request');
      abortControllerRef.current.abort();
    }

    // Create new AbortController for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    
    setIsLoadingDefaults(true);
    
    try {
      // Use empty query when no search query is provided
      const response = await searchCandidates('', abortController.signal);
      
      // Check if request was aborted
      if (abortController.signal.aborted) {
        console.log('🚫 loadCandidates request was aborted, ignoring results');
        return;
      }
      
      console.log('🔍 API Response:', response);
      
      // Check if searchQuery changed while we were loading (user performed a search)
      // If so, don't overwrite the search results
      if (searchQuery.trim() && searchQuery !== currentSearchQuery) {
        console.log('⚠️ Search query changed during load, skipping default results');
        return;
      }
      
      if (response.success && response.response_data) {
        console.log('📊 Candidates data:', response.response_data);
        console.log('📊 First candidate matchScore:', response.response_data[0]?.matchScore);
        
        // Update cache
        setDefaultCandidates(response.response_data);
        
        // Update UI with fresh data
        setApiSearchResults(response.response_data);
        setUseApiSearch(true);
        // Only clear searchQuery if we're not preserving it (i.e., when explicitly loading defaults)
        if (!preserveSearchQuery) {
          setSearchQuery('');
        }
      } else {
        setApiSearchResults([]);
        setUseApiSearch(false);
      }
    } catch (error) {
      // Ignore abort errors
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('🚫 loadCandidates was cancelled');
        return;
      }
      console.error('Error loading candidates:', error);
      // Only update if search query hasn't changed and request wasn't aborted
      if (!abortController.signal.aborted && (!searchQuery.trim() || searchQuery === currentSearchQuery)) {
        // If we have cached data, keep showing it even if fetch fails
        if (!cachedCandidates) {
          setApiSearchResults([]);
          setUseApiSearch(false);
        }
      }
    } finally {
      // Only update loading state if this is still the current request
      if (abortControllerRef.current === abortController) {
        setIsLoadingDefaults(false);
        if (!silent) {
          setLoading(false);
        }
        abortControllerRef.current = null;
      }
    }
  };

  // Candidate avatars - remove fake avatars, only use real ones from API
  const candidatesWithAvatars = candidates.map((candidate) => {
    return {
      ...candidate,
    };
  });

  const handleSearchResults = (results: CVSearchCandidate[], query: string) => {
    // Stop any ongoing default loading to prevent overwriting search results
    setIsLoadingDefaults(false);
    
    // If query is empty, show skeleton loader and fetch defaults
    if (!query.trim()) {
      // Clear search query in UI
      setSearchQuery('');
      
      // Show skeleton loader and fetch defaults (forceRefresh = true)
      loadCandidates(false, false, true);
      return;
    }
    // Set search results immediately - don't let any other operation overwrite them
    setApiSearchResults(results);
    setUseApiSearch(true); // Always use API search when results are provided
    setSearchQuery(query);
  };

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 80) return 'text-primary';
    if (score >= 70) return 'text-blue-600';
    return 'text-muted-foreground';
  };

  const getMatchBadgeColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (score >= 80) return 'bg-primary/10 text-primary border-primary/20';
    if (score >= 70) return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-muted text-muted-foreground border-border';
  };

  // Helper function to check if a candidate matches filters
  const matchesFilters = (candidate: {
    matchScore: number;
    location: string;
    experience: number;
    skills: string[];
  }) => {
    const matchesScore = selectedFilter === 'all' || 
      (selectedFilter === '90' && candidate.matchScore >= 90) ||
      (selectedFilter === '80' && candidate.matchScore >= 80) ||
      (selectedFilter === '70' && candidate.matchScore >= 70);

    const matchesLocation = locationFilter === 'all' || 
      candidate.location.toLowerCase().includes(locationFilter.toLowerCase());

    const matchesExperience = experienceFilter === 'all' ||
      (experienceFilter === '0-2' && candidate.experience >= 0 && candidate.experience <= 2) ||
      (experienceFilter === '3-5' && candidate.experience >= 3 && candidate.experience <= 5) ||
      (experienceFilter === '6-10' && candidate.experience >= 6 && candidate.experience <= 10) ||
      (experienceFilter === '10+' && candidate.experience > 10);

    const matchesSkills = !skillsFilter || 
      candidate.skills.some(skill => 
        skill.toLowerCase().includes(skillsFilter.toLowerCase())
      );

    return matchesScore && matchesLocation && matchesExperience && matchesSkills;
  };

  // Filter candidates (for non-API search)
  const filteredCandidates = candidatesWithAvatars.filter(candidate => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = !query || 
      candidate.name.toLowerCase().includes(query) ||
      candidate.title.toLowerCase().includes(query) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(query)) ||
      candidate.location.toLowerCase().includes(query);
    
    return matchesSearch && matchesFilters(candidate);
  });

  // Use API search results if available, otherwise use filtered candidates from API
  const displayCandidates = useApiSearch ? apiSearchResults.map(apiCandidate => {
    // Extract matchScore - try multiple possible fields and formats
    let matchScore: number | null = null;
    
    // Try matchScore first - handle both number and string (remove % if present)
    if (apiCandidate.matchScore !== undefined && apiCandidate.matchScore !== null) {
      let scoreValue = apiCandidate.matchScore;
      // If it's a string, remove any % symbols and parse
      if (typeof scoreValue === 'string') {
        scoreValue = scoreValue.replace(/%/g, '').trim();
      }
      const parsed = Number(scoreValue);
      if (!isNaN(parsed) && parsed >= 0) {
        matchScore = Math.round(parsed);
      }
    }
    
    // Fallback to avg_score if matchScore is not available
    if (matchScore === null && (apiCandidate as any).avg_score !== undefined && (apiCandidate as any).avg_score !== null) {
      let scoreValue = (apiCandidate as any).avg_score;
      // If it's a string, remove any % symbols and parse
      if (typeof scoreValue === 'string') {
        scoreValue = scoreValue.replace(/%/g, '').trim();
      }
      const parsed = Number(scoreValue);
      if (!isNaN(parsed) && parsed >= 0) {
        matchScore = Math.round(parsed);
      }
    }
    
    console.log('🎯 Processing candidate:', apiCandidate);


    
    return {
      id: apiCandidate.id,
      name: apiCandidate.name,
      title: apiCandidate.title,
      location: apiCandidate.location,
      email: (apiCandidate as any).email || (apiCandidate as any).emails?.[0] || '',
      phone: (apiCandidate as any).phone || '',
      avatar: apiCandidate.profile_image || apiCandidate.image || '', // Use profile_image first, fallback to image
      skills: apiCandidate.skills || [],
      topSkills: apiCandidate.topSkills || [],
      summary: apiCandidate.profileSummary?.join(' ') || '',
      matchScore: matchScore ?? 0,
      experience: apiCandidate.years_of_experience || 0,
      status: 'new' as const,
      education: (apiCandidate as any).education || '',
      yearsExperience: apiCandidate.years_of_experience || 0,
      appliedDate: new Date().toISOString(),
      resumeUrl: '',
    };
  }).filter(matchesFilters) : filteredCandidates;

  // Sort candidates
  const sortedCandidates = [...displayCandidates].sort((a, b) => {
    let comparison = 0;
    if (sortField === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortField === 'match') {
      comparison = a.matchScore - b.matchScore;
    } else if (sortField === 'experience') {
      comparison = (a.experience || 0) - (b.experience || 0);
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-foreground">Candidates</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {sortedCandidates.length} candidate{sortedCandidates.length !== 1 ? 's' : ''} found
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {onNavigateToAddCandidate && (
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={onNavigateToAddCandidate}
              >
                <Plus className="size-4 mr-2" />
                Add Candidate
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-primary/5"
              onClick={() => {
                // TODO: Implement export functionality
                console.log('Export candidates');
              }}
            >
              <Download className="size-4 mr-2" />
              Export Profiles
            </Button>
          </div>
        </div>
      </div>


      {/* Search Section */}
      <div className="px-6 py-4 bg-white border-b border-border">
        <CandidateSearch 
          onSearchResults={handleSearchResults}
          redirectOnSearch={false}
          initialQuery={searchQuery}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Filters Sidebar */}
        <div className="w-64 border-r border-border bg-gray-50 p-6 overflow-y-auto">
          <div className="flex items-center gap-2 mb-6">
            <SlidersHorizontal className="size-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Advanced Filters</h3>
          </div>

          <div className="space-y-5">
            {/* Match Score Filter */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Match Score
              </label>
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="h-9 bg-white">
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

            {/* Total Experience Filter */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Total Experience
              </label>
              <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                <SelectTrigger className="h-9 bg-white">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="0-2">0-2 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="6-10">6-10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Location
              </label>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="h-9 bg-white">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Chicago">Chicago</SelectItem>
                  <SelectItem value="Austin">Austin</SelectItem>
                  <SelectItem value="San Francisco">San Francisco</SelectItem>
                  <SelectItem value="New York">New York</SelectItem>
                  <SelectItem value="Seattle">Seattle</SelectItem>
                  <SelectItem value="Boston">Boston</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Skills Filter */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Skills
              </label>
              <Input
                type="text"
                placeholder="e.g. Python, TensorFlow, Figma"
                value={skillsFilter}
                onChange={(e) => setSkillsFilter(e.target.value)}
                className="h-9 bg-white"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button 
                variant="outline" 
                size="sm"
                className="flex-1 border-primary text-primary hover:bg-primary/5"
                onClick={() => {
                  setSelectedFilter('all');
                  setLocationFilter('all');
                  setExperienceFilter('all');
                  setSkillsFilter('');
                  // Clear search query and reload defaults with skeleton loader
                  setSearchQuery('');
                  loadCandidates(false, false, true); // forceRefresh = true to always show loader
                }}
              >
                Clear
              </Button>
              <Button 
                size="sm"
                className="flex-1 bg-primary hover:bg-primary/90 text-white"
                onClick={() => {
                  // Filters are applied automatically via state
                }}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto bg-background">
          {loading ? (
            <div className="bg-white">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[40%]">Candidate</TableHead>
                    <TableHead className="w-[20%] text-center">Match</TableHead>
                    <TableHead className="w-[40%]">Top Skills</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...Array(5)].map((_, index) => (
                    <TableRow key={index}>
                      {/* Candidate */}
                      <TableCell>
                        <div className="flex items-center gap-3 py-1">
                          <Skeleton className="size-10 rounded-full bg-gray-200" />
                          <div className="min-w-0 space-y-2">
                            <Skeleton className="h-4 w-32 bg-gray-200" />
                            <Skeleton className="h-3 w-24 bg-gray-200" />
                            <div className="flex items-center gap-1">
                              <Skeleton className="size-3 rounded bg-gray-200" />
                              <Skeleton className="h-3 w-20 bg-gray-200" />
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      {/* Match Score */}
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          <Skeleton className="size-12 rounded-full bg-gray-200" />
                        </div>
                      </TableCell>

                      {/* Skills */}
                      <TableCell>
                        <div className="flex flex-wrap gap-1.5">
                          <Skeleton className="h-5 w-16 rounded-full bg-gray-200" />
                          <Skeleton className="h-5 w-20 rounded-full bg-gray-200" />
                          <Skeleton className="h-5 w-14 rounded-full bg-gray-200" />
                          <Skeleton className="h-5 w-18 rounded-full bg-gray-200" />
                        </div>
                      </TableCell>

                      {/* AI Insights */}
                      {showAIInsights && (
                        <TableCell>
                          <Skeleton className="h-4 w-full bg-gray-200" />
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : sortedCandidates.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Users className="size-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No candidates found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery 
                    ? `No candidates match your search "${searchQuery}"`
                    : 'Get started by uploading your first candidate resume'}
                </p>
                {!searchQuery && onNavigateToAddCandidate && (
                  <Button onClick={onNavigateToAddCandidate}>
                    <Plus className="size-4 mr-2" />
                    Add Candidate
                  </Button>
                )}
              </div>
            </div>
          ) : (
          <div className="bg-white">
            <Table>
              <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[40%]">
                      <button
                        onClick={() => handleSort('name')}
                        className="flex items-center gap-1 hover:text-foreground transition-colors"
                      >
                        Candidate
                        <ArrowUpDown className="size-3.5" />
                      </button>
                    </TableHead>
                    <TableHead className="w-[20%] text-center">
                      <button
                        onClick={() => handleSort('match')}
                        className="flex items-center gap-1 hover:text-foreground transition-colors mx-auto"
                      >
                        Match Score
                        <ArrowUpDown className="size-3.5" />
                      </button>
                    </TableHead>
                    <TableHead className="w-[40%]">Top Skills</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                {sortedCandidates.map((candidate) => {
                  const insights = aiInsights[candidate.id] || {
                    insights: candidate.summary ? [candidate.summary] : ['Strong technical background'],
                    alternativeRoles: ['Senior Engineer']
                  };

                  return (
                    <TableRow 
                      key={candidate.id}
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => onSelectCandidate?.(candidate.id, candidate)}
                    >
                      {/* Candidate */}
                      <TableCell>
                        <div className="flex items-center gap-3 py-1">
                          <Avatar className="size-10 border border-border">
                            {candidate.avatar ? (
                              <AvatarImage 
                                src={candidate.avatar} 
                                alt={candidate.name}
                              />
                            ) : null}
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {candidate.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="font-medium text-sm text-foreground truncate">
                              {candidate.name}
                            </p>
                            <p className="text-sm text-muted-foreground truncate">
                              {candidate.title}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                              <div className="flex items-center gap-1">
                                <MapPin className="size-3" />
                                <span>{candidate.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      {/* Match Score */}
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          {(() => {
                            const score = candidate.matchScore;
                            console.log('🎯 Rendering match score for', candidate.name, 'score:', score, 'type:', typeof score);
                            
                            // Display score if it's a valid number (including 0)
                            if (typeof score === 'number' && !isNaN(score) && score >= 0) {
                              const size = 48; // 48px = size-12
                              const strokeWidth = 4;
                              const radius = (size - strokeWidth) / 2;
                              const circumference = 2 * Math.PI * radius;
                              const percentage = Math.min(Math.max(score, 0), 100);
                              const offset = circumference - (percentage / 100) * circumference;
                              
                              // Get color based on score
                              let strokeColor = '#9ca3af'; // gray-400
                              if (score >= 90) {
                                strokeColor = '#10b981'; // emerald-600
                              } else if (score >= 80) {
                                strokeColor = '#2563eb'; // blue-600
                              } else if (score >= 70) {
                                strokeColor = '#d97706'; // amber-600
                              } else if (score > 0) {
                                strokeColor = '#6b7280'; // gray-500
                              }
                              
                              // Get text color based on score
                              let textColor = 'text-gray-700';
                              if (score >= 90) {
                                textColor = 'text-emerald-700';
                              } else if (score >= 80) {
                                textColor = 'text-blue-700';
                              } else if (score >= 70) {
                                textColor = 'text-amber-700';
                              }
                              
                              return (
                                <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
                                  <svg 
                                    width={size} 
                                    height={size} 
                                    className="transform -rotate-90 absolute inset-0"
                                  >
                                    {/* Background circle */}
                                    <circle
                                      cx={size / 2}
                                      cy={size / 2}
                                      r={radius}
                                      stroke="#e5e7eb"
                                      strokeWidth={strokeWidth}
                                      fill="none"
                                    />
                                    {/* Progress circle */}
                                    <circle
                                      cx={size / 2}
                                      cy={size / 2}
                                      r={radius}
                                      stroke={strokeColor}
                                      strokeWidth={strokeWidth}
                                      fill="none"
                                      strokeDasharray={circumference}
                                      strokeDashoffset={offset}
                                      strokeLinecap="round"
                                      className="transition-all duration-500 ease-out"
                                    />
                                  </svg>
                                  {/* Score text */}
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className={`text-xs font-bold ${textColor}`}>
                                      {score}
                                    </span>
                                  </div>
                                </div>
                              );
                            } else {
                              return (
                                <div className="size-12 rounded-full flex items-center justify-center text-gray-500 font-semibold text-xs bg-gray-100 border border-gray-200">
                                  N/A
                                </div>
                              );
                            }
                          })()}
                        </div>
                      </TableCell>

                      {/* Skills */}
                      <TableCell>
                        <div className="flex flex-wrap gap-1.5">
                          {candidate.skills.slice(0, 5).map((skill, skillIndex) => {
                            // Cycle through different badge colors
                            const colorClasses = [
                              'bg-green-100 text-green-700 border-green-200',
                              'bg-pink-100 text-pink-700 border-pink-200',
                              'bg-gray-100 text-gray-700 border-gray-200',
                              'bg-blue-100 text-blue-700 border-blue-200',
                              'bg-purple-100 text-purple-700 border-purple-200',
                            ];
                            const colorClass = colorClasses[skillIndex % colorClasses.length];
                            
                            return (
                              <Badge 
                                key={skill} 
                                variant="outline"
                                className={`${colorClass} text-xs font-normal`}
                              >
                                {skill}
                              </Badge>
                            );
                          })}
                          {candidate.skills.length > 5 && (
                            <Badge 
                              variant="outline" 
                              className="bg-gray-100 text-gray-600 border-gray-200 text-xs font-normal"
                            >
                              +{candidate.skills.length - 5} more
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
