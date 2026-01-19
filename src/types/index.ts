export interface Candidate {
  id: string;
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  avatar?: string;
  experience: number;
  education: string;
  skills: string[];
  resumeUrl: string;
  status: 'new' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  matchScore: number;
  appliedDate: string;
  linkedIn?: string;
  github?: string;
  stackoverflow?: string;
  medium?: string;
  website?: string;
  summary: string;
}

export interface MatchDetails {
  overallScore: number;
  skillsMatch: number;
  experienceMatch: number;
  educationMatch: number;
  culturalFit: number;
  leadershipPotential: number;
  technicalDepth: number;
}

export interface AIInsight {
  id: string;
  type: 'strength' | 'opportunity' | 'concern' | 'training';
  category: string;
  title: string;
  description: string;
  confidence: number;
  icon?: string;
}

export interface CareerNode {
  id: string;
  company: string;
  role: string;
  duration: string;
  startDate: string;
  endDate: string;
  skills: string[];
  achievements?: string[];
}

export interface AlternativeRole {
  roleTitle: string;
  matchScore: number;
  reasons: string[];
  department: string;
}

export interface TrainingNeed {
  skill: string;
  currentLevel: number;
  requiredLevel: number;
  estimatedTime: string;
  priority: 'high' | 'medium' | 'low';
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  candidateId?: string;
  candidateName?: string;
  details: string;
  category: 'search' | 'view' | 'status_change' | 'export' | 'ai_interaction';
}

export interface BiasMetric {
  category: string;
  score: number;
  status: 'good' | 'warning' | 'concern';
  description: string;
  recommendations: string[];
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'intern';
  level: 'entry' | 'mid' | 'senior' | 'lead' | 'executive';
  status: 'open' | 'closed' | 'draft';
  openings: number;
  postedDate: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits?: string[];
  salaryRange?: {
    min: number;
    max: number;
    currency: string;
  };
  hiringTeam: {
    hiringManager: string;
    recruiters: string[];
  };
  pipeline: {
    new: number;
    screening: number;
    interview: number;
    offer: number;
    hired: number;
    rejected: number;
  };
  candidateIds: string[];
  createdBy: string;
  updatedAt: string;
}