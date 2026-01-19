import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { 
  TrendingUp, TrendingDown, Brain, Target, Award, AlertCircle, 
  CheckCircle, Clock, DollarSign, Users, Zap, BarChart3, 
  Calendar, Briefcase, Star, ThumbsUp, ThumbsDown, ArrowUp, ArrowDown,
  Shield, XCircle, AlertTriangle, Info, ExternalLink, Github, Linkedin
} from 'lucide-react';
import { mockCandidates } from '../data/mockData';
import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';

interface PredictiveMetric {
  candidateId: string;
  candidateName: string;
  title: string;
  matchScore: number;
  acceptanceLikelihood: number;
  performancePrediction: number;
  successProbability: number;
  flightRisk: number;
  timeToProductivity: number; // days
  culturalFitScore: number;
  retentionPrediction: number; // years
  salaryExpectation: number;
  competingOffers: number;
  insights: string[];
}

type FlagSeverity = 'critical' | 'warning' | 'info';

interface VerificationFlag {
  type: string;
  severity: FlagSeverity;
  message: string;
  details?: string;
}

interface VerificationResult {
  candidateId: string;
  candidateName: string;
  title: string;
  overallStatus: 'verified' | 'warning' | 'critical';
  verificationScore: number;
  employmentAnomalies: VerificationFlag[];
  companyVerification: VerificationFlag[];
  crossPlatformVerification: VerificationFlag[];
  contentAnalysis: VerificationFlag[];
  linkedinUrl?: string;
  githubUrl?: string;
}

const mockVerificationData: VerificationResult[] = [
  {
    candidateId: '1',
    candidateName: 'Sarah Chen',
    title: 'Senior ML Engineer',
    overallStatus: 'verified',
    verificationScore: 95,
    employmentAnomalies: [],
    companyVerification: [
      {
        type: 'Company Verified',
        severity: 'info',
        message: 'All companies verified in database',
        details: 'Google, Meta, and Tesla confirmed as legitimate employers'
      }
    ],
    crossPlatformVerification: [
      {
        type: 'LinkedIn Match',
        severity: 'info',
        message: '98% profile match with LinkedIn',
        details: 'Job titles, dates, and companies align perfectly'
      },
      {
        type: 'GitHub Active',
        severity: 'info',
        message: 'Active GitHub profile with 500+ contributions',
        details: 'Public repositories show ML/AI expertise matching resume'
      }
    ],
    contentAnalysis: [
      {
        type: 'High Relevance',
        severity: 'info',
        message: 'Experience descriptions show 92% relevance to claimed roles',
        details: 'NLP analysis shows authentic and specific technical details'
      }
    ],
    linkedinUrl: 'https://linkedin.com/in/sarahchen',
    githubUrl: 'https://github.com/sarahchen'
  },
  {
    candidateId: '2',
    candidateName: 'Michael Rodriguez',
    title: 'Data Scientist',
    overallStatus: 'warning',
    verificationScore: 72,
    employmentAnomalies: [
      {
        type: 'Short Tenure Pattern',
        severity: 'warning',
        message: 'Average tenure of 1.8 years across 4 companies',
        details: 'Multiple roles lasting less than 2 years may indicate instability'
      },
      {
        type: 'Employment Gap',
        severity: 'warning',
        message: '8-month gap between Aug 2021 - Apr 2022',
        details: 'No explanation provided for employment gap'
      }
    ],
    companyVerification: [
      {
        type: 'Company Verified',
        severity: 'info',
        message: 'All companies verified',
        details: 'IBM, Accenture, and Cognizant confirmed'
      }
    ],
    crossPlatformVerification: [
      {
        type: 'LinkedIn Discrepancy',
        severity: 'warning',
        message: 'LinkedIn shows different title for 2019-2020 role',
        details: 'Resume: "Senior Data Scientist" vs LinkedIn: "Data Scientist"'
      },
      {
        type: 'GitHub Low Activity',
        severity: 'warning',
        message: 'GitHub profile shows minimal recent activity',
        details: 'Only 45 contributions in past year despite claiming active development'
      }
    ],
    contentAnalysis: [
      {
        type: 'Generic Content',
        severity: 'warning',
        message: 'Some job descriptions contain generic templated language',
        details: '35% similarity to common resume templates detected'
      }
    ],
    linkedinUrl: 'https://linkedin.com/in/mrodriguez',
    githubUrl: 'https://github.com/mrodriguez'
  },
  {
    candidateId: '3',
    candidateName: 'Emily Watson',
    title: 'AI Research Scientist',
    overallStatus: 'verified',
    verificationScore: 98,
    employmentAnomalies: [],
    companyVerification: [
      {
        type: 'Company Verified',
        severity: 'info',
        message: 'All organizations verified including academic institutions',
        details: 'MIT, Stanford, and OpenAI confirmed'
      }
    ],
    crossPlatformVerification: [
      {
        type: 'Perfect Match',
        severity: 'info',
        message: '100% alignment across all platforms',
        details: 'Resume, LinkedIn, and academic profiles perfectly aligned'
      },
      {
        type: 'Strong Research Profile',
        severity: 'info',
        message: 'Google Scholar profile shows 12 published papers',
        details: 'Publications match claimed research areas in AI/ML'
      },
      {
        type: 'GitHub Excellent',
        severity: 'info',
        message: 'Highly active GitHub with 2.3K contributions',
        details: 'Multiple AI research repositories with significant stars'
      }
    ],
    contentAnalysis: [
      {
        type: 'Exceptional Quality',
        severity: 'info',
        message: 'Experience descriptions show high technical specificity',
        details: 'Detailed research methodologies and measurable outcomes'
      }
    ],
    linkedinUrl: 'https://linkedin.com/in/emilywatson',
    githubUrl: 'https://github.com/emilywatson'
  },
  {
    candidateId: '4',
    candidateName: 'James Liu',
    title: 'Backend Engineer',
    overallStatus: 'critical',
    verificationScore: 45,
    employmentAnomalies: [
      {
        type: 'Timeline Overlap',
        severity: 'critical',
        message: 'Overlapping employment dates detected',
        details: 'Claimed full-time at TechCorp (Jan 2020-Dec 2020) and DataSystems (Jun 2020-Mar 2021) simultaneously'
      },
      {
        type: 'Unrealistic Progression',
        severity: 'critical',
        message: 'Junior Engineer to CTO in 14 months',
        details: 'Progression from Junior at StartupX to CTO at StartupY in unusually short timeframe'
      },
      {
        type: 'Multiple Gaps',
        severity: 'warning',
        message: 'Multiple employment gaps totaling 16 months',
        details: 'Three separate gaps without explanation'
      }
    ],
    companyVerification: [
      {
        type: 'Suspicious Company',
        severity: 'critical',
        message: '"DataSystems Inc" not found in company databases',
        details: 'No online presence, no LinkedIn company page, domain not registered'
      },
      {
        type: 'Questionable Company',
        severity: 'warning',
        message: '"StartupY Technologies" has minimal online presence',
        details: 'Company website appears to be template, no employees found on LinkedIn'
      }
    ],
    crossPlatformVerification: [
      {
        type: 'Major Discrepancy',
        severity: 'critical',
        message: 'LinkedIn profile shows completely different work history',
        details: '50% of resume companies not mentioned on LinkedIn at all'
      },
      {
        type: 'GitHub Mismatch',
        severity: 'critical',
        message: 'GitHub shows no activity matching claimed 6 years of backend experience',
        details: 'Account created 8 months ago with only 12 contributions'
      }
    ],
    contentAnalysis: [
      {
        type: 'Low Relevance',
        severity: 'critical',
        message: 'Job descriptions show 68% similarity to online templates',
        details: 'Multiple descriptions copied verbatim from public job postings'
      },
      {
        type: 'Buzzword Inflation',
        severity: 'warning',
        message: 'Excessive use of buzzwords without technical depth',
        details: 'Generic terms like "leveraged cutting-edge technologies" without specifics'
      }
    ],
    linkedinUrl: 'https://linkedin.com/in/jamesliu',
    githubUrl: 'https://github.com/jamesliu'
  }
];

const mockPredictiveData: PredictiveMetric[] = [
  {
    candidateId: '1',
    candidateName: 'Sarah Chen',
    title: 'Senior ML Engineer',
    matchScore: 95,
    acceptanceLikelihood: 78,
    performancePrediction: 92,
    successProbability: 88,
    flightRisk: 15,
    timeToProductivity: 45,
    culturalFitScore: 89,
    retentionPrediction: 4.5,
    salaryExpectation: 185000,
    competingOffers: 2,
    insights: [
      'Strong technical background aligns perfectly with role requirements',
      'Previous experience at FAANG companies indicates high performance potential',
      'Low flight risk due to career stability and growth trajectory',
      'Salary expectations within range for senior ML engineer role'
    ]
  },
  {
    candidateId: '2',
    candidateName: 'Michael Rodriguez',
    title: 'Data Scientist',
    matchScore: 82,
    acceptanceLikelihood: 65,
    performancePrediction: 78,
    successProbability: 72,
    flightRisk: 42,
    timeToProductivity: 60,
    culturalFitScore: 74,
    retentionPrediction: 2.8,
    salaryExpectation: 145000,
    competingOffers: 3,
    insights: [
      'Multiple competing offers may impact acceptance likelihood',
      'Short tenure pattern indicates moderate flight risk',
      'Skills match well but may need cultural fit assessment',
      'Salary expectations competitive in current market'
    ]
  },
  {
    candidateId: '3',
    candidateName: 'Emily Watson',
    title: 'AI Research Scientist',
    matchScore: 98,
    acceptanceLikelihood: 85,
    performancePrediction: 96,
    successProbability: 94,
    flightRisk: 8,
    timeToProductivity: 30,
    culturalFitScore: 95,
    retentionPrediction: 5.2,
    salaryExpectation: 220000,
    competingOffers: 1,
    insights: [
      'Exceptional candidate with PhD and strong publication record',
      'Very high performance prediction based on academic achievements',
      'Minimal flight risk with strong career focus',
      'Premium salary expectations justified by qualifications'
    ]
  },
  {
    candidateId: '4',
    candidateName: 'James Liu',
    title: 'Backend Engineer',
    matchScore: 68,
    acceptanceLikelihood: 55,
    performancePrediction: 65,
    successProbability: 58,
    flightRisk: 58,
    timeToProductivity: 90,
    culturalFitScore: 62,
    retentionPrediction: 1.5,
    salaryExpectation: 125000,
    competingOffers: 1,
    insights: [
      'Verification concerns may impact hiring decision',
      'Higher flight risk due to unstable employment history',
      'Longer time to productivity expected',
      'Cultural fit assessment recommended before proceeding'
    ]
  }
];

export function PredictiveAnalytics() {
  const [selectedCandidate, setSelectedCandidate] = useState<PredictiveMetric | null>(null);
  const [isRunningAnalysis, setIsRunningAnalysis] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStep, setAnalysisStep] = useState('');

  const runAnalysis = () => {
    setIsRunningAnalysis(true);
    setAnalysisProgress(0);
    
    const steps = [
      'Initializing predictive analysis...',
      'Analyzing candidate acceptance patterns...',
      'Evaluating performance indicators...',
      'Calculating flight risk factors...',
      'Assessing cultural fit metrics...',
      'Reviewing compensation expectations...',
      'Analyzing competitive offer data...',
      'Generating success probabilities...',
      'Compiling AI insights...',
      'Analysis complete!'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = (currentStep / steps.length) * 100;
      setAnalysisProgress(progress);
      setAnalysisStep(steps[currentStep - 1] || steps[steps.length - 1]);

      if (currentStep >= steps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsRunningAnalysis(false);
          setAnalysisProgress(0);
          setAnalysisStep('');
        }, 1000);
      }
    }, 1000);

    // Cleanup function
    return () => clearInterval(interval);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return { color: 'text-emerald-700', bg: 'bg-emerald-100', badge: 'bg-emerald-500' };
    if (score >= 60) return { color: 'text-blue-700', bg: 'bg-blue-100', badge: 'bg-blue-500' };
    if (score >= 40) return { color: 'text-amber-700', bg: 'bg-amber-100', badge: 'bg-amber-500' };
    return { color: 'text-red-700', bg: 'bg-red-100', badge: 'bg-red-500' };
  };

  const getRiskColor = (risk: number) => {
    if (risk <= 20) return { color: 'text-emerald-700', bg: 'bg-emerald-100', badge: 'bg-emerald-500', label: 'Low Risk' };
    if (risk <= 40) return { color: 'text-amber-700', bg: 'bg-amber-100', badge: 'bg-amber-500', label: 'Medium Risk' };
    return { color: 'text-red-700', bg: 'bg-red-100', badge: 'bg-red-500', label: 'High Risk' };
  };

  const avgAcceptanceLikelihood = Math.round(
    mockPredictiveData.reduce((sum, c) => sum + c.acceptanceLikelihood, 0) / mockPredictiveData.length
  );

  const avgPerformancePrediction = Math.round(
    mockPredictiveData.reduce((sum, c) => sum + c.performancePrediction, 0) / mockPredictiveData.length
  );

  const avgFlightRisk = Math.round(
    mockPredictiveData.reduce((sum, c) => sum + c.flightRisk, 0) / mockPredictiveData.length
  );

  const topCandidates = [...mockPredictiveData]
    .sort((a, b) => b.successProbability - a.successProbability)
    .slice(0, 3);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Predictive Analytics</h1>
          <p className="text-sm text-gray-600 mt-1">AI-powered predictions for hiring success</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Calendar className="size-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={runAnalysis}>
            <Zap className="size-4 mr-2" />
            Run Analysis
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="size-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <ThumbsUp className="size-6 text-emerald-600" />
            </div>
            <Badge className="bg-emerald-500">
              <ArrowUp className="size-3 mr-1" />
              +12%
            </Badge>
          </div>
          <p className="text-sm text-gray-600">Avg Acceptance Rate</p>
          <h3 className="text-2xl text-gray-900 mt-1">{avgAcceptanceLikelihood}%</h3>
          <p className="text-xs text-gray-500 mt-2">Predicted likelihood to accept offer</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="size-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Star className="size-6 text-blue-600" />
            </div>
            <Badge className="bg-blue-500">
              <ArrowUp className="size-3 mr-1" />
              +8%
            </Badge>
          </div>
          <p className="text-sm text-gray-600">Avg Performance Score</p>
          <h3 className="text-2xl text-gray-900 mt-1">{avgPerformancePrediction}%</h3>
          <p className="text-xs text-gray-500 mt-2">Predicted job performance</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="size-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <AlertCircle className="size-6 text-amber-600" />
            </div>
            <Badge className="bg-amber-500">
              <ArrowDown className="size-3 mr-1" />
              -5%
            </Badge>
          </div>
          <p className="text-sm text-gray-600">Avg Flight Risk</p>
          <h3 className="text-2xl text-gray-900 mt-1">{avgFlightRisk}%</h3>
          <p className="text-xs text-gray-500 mt-2">Risk of leaving within 1 year</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="size-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Brain className="size-6 text-purple-600" />
            </div>
            <Badge className="bg-purple-500">AI</Badge>
          </div>
          <p className="text-sm text-gray-600">Candidates Analyzed</p>
          <h3 className="text-2xl text-gray-900 mt-1">{mockPredictiveData.length}</h3>
          <p className="text-xs text-gray-500 mt-2">Active predictions generated</p>
        </Card>
      </div>

      <Tabs defaultValue="all-candidates" className="w-full">
        <TabsList>
          <TabsTrigger value="all-candidates">All Candidates</TabsTrigger>
          <TabsTrigger value="top-performers">Top Performers</TabsTrigger>
          <TabsTrigger value="high-risk">High Risk</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="verification">
            <Shield className="size-4 mr-2" />
            Verification
          </TabsTrigger>
        </TabsList>

        {/* All Candidates */}
        <TabsContent value="all-candidates" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Candidate Predictions</h3>
            
            <div className="space-y-4">
              {mockPredictiveData.map((candidate) => {
                const acceptanceColor = getScoreColor(candidate.acceptanceLikelihood);
                const performanceColor = getScoreColor(candidate.performancePrediction);
                const riskColor = getRiskColor(candidate.flightRisk);

                return (
                  <Card 
                    key={candidate.candidateId} 
                    className="p-5 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedCandidate(candidate)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="size-14">
                          <AvatarFallback className="bg-primary text-white">
                            {candidate.candidateName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="text-gray-900">{candidate.candidateName}</h4>
                          <p className="text-sm text-gray-600">{candidate.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              Match: {candidate.matchScore}%
                            </Badge>
                            <Badge className={riskColor.badge}>
                              {riskColor.label}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-purple-100 text-purple-700">
                        <Brain className="size-3 mr-1" />
                        AI Analyzed
                      </Badge>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      {/* Acceptance Likelihood */}
                      <div className={`p-4 rounded-lg ${acceptanceColor.bg}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-600">Acceptance</span>
                          <ThumbsUp className={`size-4 ${acceptanceColor.color}`} />
                        </div>
                        <p className={`text-2xl ${acceptanceColor.color}`}>
                          {candidate.acceptanceLikelihood}%
                        </p>
                        <Progress 
                          value={candidate.acceptanceLikelihood} 
                          className="h-1.5 mt-2"
                        />
                      </div>

                      {/* Performance Prediction */}
                      <div className={`p-4 rounded-lg ${performanceColor.bg}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-600">Performance</span>
                          <Star className={`size-4 ${performanceColor.color}`} />
                        </div>
                        <p className={`text-2xl ${performanceColor.color}`}>
                          {candidate.performancePrediction}%
                        </p>
                        <Progress 
                          value={candidate.performancePrediction} 
                          className="h-1.5 mt-2"
                        />
                      </div>

                      {/* Success Probability */}
                      <div className="p-4 rounded-lg bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-600">Success Rate</span>
                          <Target className="size-4 text-gray-700" />
                        </div>
                        <p className="text-2xl text-gray-900">
                          {candidate.successProbability}%
                        </p>
                        <Progress 
                          value={candidate.successProbability} 
                          className="h-1.5 mt-2"
                        />
                      </div>

                      {/* Time to Productivity */}
                      <div className="p-4 rounded-lg bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-600">Productivity</span>
                          <Clock className="size-4 text-gray-700" />
                        </div>
                        <p className="text-2xl text-gray-900">
                          {candidate.timeToProductivity}d
                        </p>
                        <p className="text-xs text-gray-500 mt-1">to full productivity</p>
                      </div>
                    </div>

                    {/* Additional Metrics */}
                    <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Cultural Fit</span>
                        <span className="text-gray-900">{candidate.culturalFitScore}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Retention</span>
                        <span className="text-gray-900">{candidate.retentionPrediction}y</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Competing Offers</span>
                        <Badge variant="outline" className="text-xs">
                          {candidate.competingOffers}
                        </Badge>
                      </div>
                    </div>

                    {/* Top Insight */}
                    {candidate.insights.length > 0 && (
                      <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="flex items-start gap-2">
                          <Brain className="size-4 text-purple-600 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-purple-900">{candidate.insights[0]}</p>
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        {/* Top Performers */}
        <TabsContent value="top-performers" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Predicted Top Performers</h3>
            <p className="text-sm text-gray-600 mb-6">
              Candidates with highest predicted success probability
            </p>

            <div className="space-y-4">
              {topCandidates.map((candidate, index) => (
                <Card key={candidate.candidateId} className="p-5 bg-emerald-50 border-2 border-emerald-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="size-16">
                          <AvatarFallback className="bg-emerald-500 text-white text-xl">
                            {candidate.candidateName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-2 -right-2 size-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-sm">
                          #{index + 1}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-gray-900">{candidate.candidateName}</h4>
                        <p className="text-sm text-gray-600">{candidate.title}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Award className="size-4 text-emerald-600" />
                          <span className="text-sm text-emerald-700">
                            {candidate.successProbability}% Success Probability
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-emerald-500">
                      <Star className="size-3 mr-1" />
                      Top Performer
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Acceptance</p>
                      <p className="text-lg text-emerald-700">{candidate.acceptanceLikelihood}%</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Performance</p>
                      <p className="text-lg text-emerald-700">{candidate.performancePrediction}%</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">Retention</p>
                      <p className="text-lg text-emerald-700">{candidate.retentionPrediction}y</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    {candidate.insights.slice(0, 2).map((insight, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-emerald-900">
                        <CheckCircle className="size-3 mt-0.5 flex-shrink-0" />
                        <span>{insight}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* High Risk */}
        <TabsContent value="high-risk" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">High Risk Candidates</h3>
            <p className="text-sm text-gray-600 mb-6">
              Candidates requiring attention due to flight risk or competing offers
            </p>

            <div className="space-y-4">
              {mockPredictiveData
                .filter(c => c.flightRisk > 30 || c.competingOffers > 2)
                .map((candidate) => {
                  const riskColor = getRiskColor(candidate.flightRisk);
                  
                  return (
                    <Card key={candidate.candidateId} className="p-5 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="size-14">
                            <AvatarFallback className="bg-gradient-to-br from-red-500 to-orange-500 text-white">
                              {candidate.candidateName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="text-gray-900">{candidate.candidateName}</h4>
                            <p className="text-sm text-gray-600">{candidate.title}</p>
                          </div>
                        </div>
                        <Badge className="bg-red-500">
                          <AlertCircle className="size-3 mr-1" />
                          Action Required
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="p-3 bg-white rounded-lg border-2 border-red-200">
                          <p className="text-xs text-gray-600 mb-1">Flight Risk</p>
                          <p className="text-lg text-red-700">{candidate.flightRisk}%</p>
                        </div>
                        <div className="p-3 bg-white rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">Competing Offers</p>
                          <p className="text-lg text-gray-900">{candidate.competingOffers}</p>
                        </div>
                        <div className="p-3 bg-white rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">Acceptance Rate</p>
                          <p className="text-lg text-amber-700">{candidate.acceptanceLikelihood}%</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-gray-900">Recommended Actions:</p>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2 text-xs text-red-900">
                            <AlertCircle className="size-3 mt-0.5 flex-shrink-0" />
                            <span>Fast-track interview process - candidate has {candidate.competingOffers} competing offers</span>
                          </div>
                          <div className="flex items-start gap-2 text-xs text-red-900">
                            <AlertCircle className="size-3 mt-0.5 flex-shrink-0" />
                            <span>Consider compensation adjustment or additional benefits</span>
                          </div>
                          <div className="flex items-start gap-2 text-xs text-red-900">
                            <AlertCircle className="size-3 mt-0.5 flex-shrink-0" />
                            <span>Schedule culture-fit meeting to improve engagement</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
            </div>
          </Card>
        </TabsContent>

        {/* AI Insights */}
        <TabsContent value="insights" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">AI-Generated Insights</h3>
            
            <div className="space-y-4">
              {mockPredictiveData.map((candidate) => (
                <Card key={candidate.candidateId} className="p-5 bg-gradient-to-br from-purple-50 to-pink-50">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="size-12">
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                        {candidate.candidateName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-gray-900">{candidate.candidateName}</h4>
                      <p className="text-sm text-gray-600">{candidate.title}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {candidate.insights.map((insight, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                        <div className="size-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Brain className="size-4 text-purple-600" />
                        </div>
                        <p className="text-sm text-gray-700 flex-1">{insight}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-purple-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Confidence Level</span>
                      <Badge className="bg-purple-500">
                        {candidate.successProbability}% Confident
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Verification */}
        <TabsContent value="verification" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Candidate Verification</h3>
            <p className="text-sm text-gray-600 mb-6">
              Detailed verification results for each candidate
            </p>

            <div className="space-y-4">
              {mockVerificationData.map((verification) => {
                const riskColor = getRiskColor(verification.verificationScore);
                
                return (
                  <Card key={verification.candidateId} className="p-5 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="size-14">
                          <AvatarFallback className="bg-gradient-to-br from-red-500 to-orange-500 text-white">
                            {verification.candidateName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="text-gray-900">{verification.candidateName}</h4>
                          <p className="text-sm text-gray-600">{verification.title}</p>
                        </div>
                      </div>
                      <Badge className="bg-red-500">
                        <AlertCircle className="size-3 mr-1" />
                        Action Required
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="p-3 bg-white rounded-lg border-2 border-red-200">
                        <p className="text-xs text-gray-600 mb-1">Verification Score</p>
                        <p className="text-lg text-red-700">{verification.verificationScore}%</p>
                      </div>
                      <div className="p-3 bg-white rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Employment Anomalies</p>
                        <p className="text-lg text-gray-900">
                          {verification.employmentAnomalies.length > 0 ? verification.employmentAnomalies.map(a => a.message).join(', ') : 'None'}
                        </p>
                      </div>
                      <div className="p-3 bg-white rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Company Verification</p>
                        <p className="text-lg text-gray-900">
                          {verification.companyVerification.length > 0 ? verification.companyVerification.map(a => a.message).join(', ') : 'None'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm text-gray-900">Recommended Actions:</p>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 text-xs text-red-900">
                          <AlertCircle className="size-3 mt-0.5 flex-shrink-0" />
                          <span>Fast-track interview process - candidate has {verification.employmentAnomalies.length} anomalies</span>
                        </div>
                        <div className="flex items-start gap-2 text-xs text-red-900">
                          <AlertCircle className="size-3 mt-0.5 flex-shrink-0" />
                          <span>Consider compensation adjustment or additional benefits</span>
                        </div>
                        <div className="flex items-start gap-2 text-xs text-red-900">
                          <AlertCircle className="size-3 mt-0.5 flex-shrink-0" />
                          <span>Schedule culture-fit meeting to improve engagement</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Analysis Dialog */}
      <Dialog open={isRunningAnalysis}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Predictive Analysis</DialogTitle>
            <DialogDescription>Running predictive analysis...</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Progress value={analysisProgress} className="h-2" />
            <p className="text-sm text-gray-600">{analysisStep}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}