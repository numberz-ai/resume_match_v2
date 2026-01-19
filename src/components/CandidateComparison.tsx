import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Users,
  TrendingUp,
  Star,
  CheckCircle,
  XCircle,
  ArrowRight,
  Download,
  Share2,
  Briefcase,
  GraduationCap,
  Award,
  Target,
  MessageSquare,
  X,
  Sparkles,
  AlertCircle,
  ThumbsUp,
  Info
} from 'lucide-react';
import { CircularProgress } from './CircularProgress';

interface CandidateData {
  id: string;
  name: string;
  email: string;
  matchScore: number;
  overallScore: number;
  recommendation: 'strong_yes' | 'yes' | 'no' | 'strong_no';
  experience: string;
  education: string;
  skills: string[];
  stages: {
    [key: string]: {
      score: number;
      recommendation: string;
      interviewer: string;
      completed: boolean;
    };
  };
  strengths: string[];
  concerns: string[];
}

interface CandidateComparisonProps {
  candidates: CandidateData[];
  jobTitle: string;
  onClose: () => void;
  onSelectCandidate?: (candidateId: string) => void;
}

export function CandidateComparison({ candidates, jobTitle, onClose, onSelectCandidate }: CandidateComparisonProps) {
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>(
    candidates.slice(0, 3).map(c => c.id)
  );

  const stages = [
    { id: 'recruiter', name: 'Recruiter Screen', icon: Users },
    { id: 'technical1', name: 'First Round', icon: Award },
    { id: 'hiring_manager', name: 'Hiring Manager', icon: Briefcase },
    { id: 'technical2', name: 'Tech Round', icon: Target },
    { id: 'hr', name: 'HR Round', icon: Users },
    { id: 'bar_raiser', name: 'Bar Raiser', icon: Star }
  ];

  const toggleCandidate = (candidateId: string) => {
    if (selectedCandidates.includes(candidateId)) {
      setSelectedCandidates(selectedCandidates.filter(id => id !== candidateId));
    } else if (selectedCandidates.length < 4) {
      setSelectedCandidates([...selectedCandidates, candidateId]);
    }
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'strong_yes': return 'bg-green-600 text-white';
      case 'yes': return 'bg-green-100 text-green-700';
      case 'no': return 'bg-red-100 text-red-700';
      case 'strong_no': return 'bg-red-600 text-white';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRecommendationLabel = (rec: string) => {
    switch (rec) {
      case 'strong_yes': return 'Strong Yes';
      case 'yes': return 'Yes';
      case 'no': return 'No';
      case 'strong_no': return 'Strong No';
      default: return 'N/A';
    }
  };

  const selectedCandidateData = candidates.filter(c => selectedCandidates.includes(c.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 flex items-center gap-3">
            <div className="size-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Users className="size-6 text-white" />
            </div>
            Compare Candidates
          </h1>
          <p className="text-gray-600 mt-1">
            {jobTitle} • Side-by-side candidate comparison
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="size-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Share2 className="size-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>

      {/* Candidate Selection */}
      <Card className="p-4">
        <h3 className="text-gray-900 mb-3">Select Candidates to Compare (up to 4)</h3>
        <div className="flex flex-wrap gap-2">
          {candidates.map((candidate) => (
            <Button
              key={candidate.id}
              variant={selectedCandidates.includes(candidate.id) ? 'default' : 'outline'}
              onClick={() => toggleCandidate(candidate.id)}
              className={selectedCandidates.includes(candidate.id) ? 'bg-blue-600 hover:bg-blue-700' : ''}
            >
              {selectedCandidates.includes(candidate.id) && (
                <CheckCircle className="size-4 mr-2" />
              )}
              {candidate.name}
            </Button>
          ))}
        </div>
      </Card>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <Card className="p-0">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="p-4 text-left text-gray-900 sticky left-0 bg-gray-50 z-10 min-w-[200px]">
                  Criteria
                </th>
                {selectedCandidateData.map((candidate) => (
                  <th key={candidate.id} className="p-4 text-center min-w-[250px]">
                    <div className="flex flex-col items-center gap-2">
                      <div className="size-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-gray-900">{candidate.name}</p>
                        <p className="text-xs text-gray-500">{candidate.email}</p>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Match Score */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 sticky left-0 bg-white z-10">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="size-4 text-blue-600" />
                    <span className="text-gray-900">Match Score</span>
                  </div>
                </td>
                {selectedCandidateData.map((candidate) => (
                  <td key={candidate.id} className="p-4 text-center">
                    <div className="flex justify-center">
                      <CircularProgress value={candidate.matchScore} size={60} />
                    </div>
                  </td>
                ))}
              </tr>

              {/* Overall Interview Score */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 sticky left-0 bg-white z-10">
                  <div className="flex items-center gap-2">
                    <Star className="size-4 text-yellow-600" />
                    <span className="text-gray-900">Overall Interview Score</span>
                  </div>
                </td>
                {selectedCandidateData.map((candidate) => (
                  <td key={candidate.id} className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`size-5 ${
                            i < candidate.overallScore
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{candidate.overallScore}/5</p>
                  </td>
                ))}
              </tr>

              {/* Final Recommendation */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 sticky left-0 bg-white z-10">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-green-600" />
                    <span className="text-gray-900">Recommendation</span>
                  </div>
                </td>
                {selectedCandidateData.map((candidate) => (
                  <td key={candidate.id} className="p-4 text-center">
                    <Badge className={getRecommendationColor(candidate.recommendation)}>
                      {getRecommendationLabel(candidate.recommendation)}
                    </Badge>
                  </td>
                ))}
              </tr>

              {/* Experience */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 sticky left-0 bg-white z-10">
                  <div className="flex items-center gap-2">
                    <Briefcase className="size-4 text-blue-600" />
                    <span className="text-gray-900">Experience</span>
                  </div>
                </td>
                {selectedCandidateData.map((candidate) => (
                  <td key={candidate.id} className="p-4 text-center">
                    <p className="text-sm text-gray-700">{candidate.experience}</p>
                  </td>
                ))}
              </tr>

              {/* Education */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 sticky left-0 bg-white z-10">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="size-4 text-purple-600" />
                    <span className="text-gray-900">Education</span>
                  </div>
                </td>
                {selectedCandidateData.map((candidate) => (
                  <td key={candidate.id} className="p-4 text-center">
                    <p className="text-sm text-gray-700">{candidate.education}</p>
                  </td>
                ))}
              </tr>

              {/* Skills */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 sticky left-0 bg-white z-10">
                  <div className="flex items-center gap-2">
                    <Award className="size-4 text-orange-600" />
                    <span className="text-gray-900">Key Skills</span>
                  </div>
                </td>
                {selectedCandidateData.map((candidate) => (
                  <td key={candidate.id} className="p-4">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {candidate.skills.slice(0, 5).map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Interview Stages Header */}
              <tr className="bg-gradient-to-r from-blue-50 to-purple-50">
                <td colSpan={selectedCandidateData.length + 1} className="p-4">
                  <h4 className="text-gray-900 flex items-center gap-2">
                    <Target className="size-5 text-blue-600" />
                    Interview Pipeline Scores
                  </h4>
                </td>
              </tr>

              {/* Interview Stages */}
              {stages.map((stage) => {
                const StageIcon = stage.icon;
                return (
                  <tr key={stage.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 sticky left-0 bg-white z-10">
                      <div className="flex items-center gap-2">
                        <StageIcon className="size-4 text-gray-600" />
                        <span className="text-sm text-gray-900">{stage.name}</span>
                      </div>
                    </td>
                    {selectedCandidateData.map((candidate) => {
                      const stageData = candidate.stages[stage.id];
                      return (
                        <td key={candidate.id} className="p-4 text-center">
                          {stageData ? (
                            <div className="space-y-1">
                              <div className="flex items-center justify-center gap-1">
                                {stageData.completed ? (
                                  <CheckCircle className="size-4 text-green-600" />
                                ) : (
                                  <XCircle className="size-4 text-gray-400" />
                                )}
                                <span className="text-sm text-gray-900">{stageData.score}/5</span>
                              </div>
                              <p className="text-xs text-gray-500">{stageData.interviewer}</p>
                              <Badge variant="outline" className="text-xs">
                                {stageData.recommendation}
                              </Badge>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">Not completed</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}

              {/* Strengths */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 sticky left-0 bg-white z-10">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="size-4 text-green-600" />
                    <span className="text-gray-900">Key Strengths</span>
                  </div>
                </td>
                {selectedCandidateData.map((candidate) => (
                  <td key={candidate.id} className="p-4">
                    <ul className="text-sm text-gray-700 space-y-1 text-left">
                      {candidate.strengths.map((strength, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Concerns */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 sticky left-0 bg-white z-10">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="size-4 text-red-600" />
                    <span className="text-gray-900">Concerns</span>
                  </div>
                </td>
                {selectedCandidateData.map((candidate) => (
                  <td key={candidate.id} className="p-4">
                    <ul className="text-sm text-gray-700 space-y-1 text-left">
                      {candidate.concerns.map((concern, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <XCircle className="size-4 text-red-600 flex-shrink-0 mt-0.5" />
                          <span>{concern}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Comparing {selectedCandidateData.length} candidate{selectedCandidateData.length !== 1 ? 's' : ''}
        </p>
        <div className="flex gap-2">
          {selectedCandidateData.map((candidate) => (
            <Button
              key={candidate.id}
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => onSelectCandidate?.(candidate.id)}
            >
              View {candidate.name.split(' ')[0]}
              <ArrowRight className="size-4 ml-2" />
            </Button>
          ))}
        </div>
      </div>

      {/* AI Hiring Suggestions */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border-2 border-purple-200">
        <div className="flex items-start gap-3 mb-4">
          <div className="size-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="size-6 text-white" />
          </div>
          <div>
            <h3 className="text-gray-900 mb-1">AI-Powered Hiring Recommendations</h3>
            <p className="text-sm text-gray-600">Based on comprehensive analysis of interview data, skills, and performance</p>
          </div>
        </div>

        <div className="space-y-4">
          {selectedCandidateData.map((candidate, idx) => {
            // Generate smart recommendations based on data
            const avgScore = Object.values(candidate.stages)
              .filter(s => s.completed)
              .reduce((acc, s) => acc + s.score, 0) / Object.values(candidate.stages).filter(s => s.completed).length;
            
            let recommendation = '';
            let icon = ThumbsUp;
            let colorClass = '';
            
            if (candidate.matchScore >= 90 && avgScore >= 4.5) {
              recommendation = `🏆 Top Candidate - ${candidate.name} is an exceptional match with ${candidate.matchScore}% compatibility and stellar interview performance (${avgScore.toFixed(1)}/5). Strong technical skills combined with ${candidate.strengths[0]?.toLowerCase()}. Recommend immediate offer to secure this talent.`;
              icon = ThumbsUp;
              colorClass = 'bg-green-50 border-green-200 text-green-900';
            } else if (candidate.matchScore >= 80 && avgScore >= 4) {
              recommendation = `✅ Strong Hire - ${candidate.name} demonstrates solid fit with ${candidate.matchScore}% match score and consistent interview performance. ${candidate.strengths[0]} make them well-suited for this role. Recommend proceeding to offer stage.`;
              icon = CheckCircle;
              colorClass = 'bg-blue-50 border-blue-200 text-blue-900';
            } else if (avgScore >= 4 && candidate.matchScore < 80) {
              recommendation = `⚠️ Consider with Training - ${candidate.name} shows strong potential with excellent interview scores (${avgScore.toFixed(1)}/5) but moderate match (${candidate.matchScore}%). Could excel with targeted training in ${candidate.concerns[0]?.toLowerCase() || 'specific areas'}. Recommend if willing to invest in development.`;
              icon = AlertCircle;
              colorClass = 'bg-yellow-50 border-yellow-200 text-yellow-900';
            } else if (candidate.matchScore >= 85 && avgScore < 4) {
              recommendation = `🤔 High Potential, Mixed Performance - ${candidate.name} has excellent technical match (${candidate.matchScore}%) but variable interview performance. Concerns: ${candidate.concerns[0]?.toLowerCase()}. Consider second round or panel interview to validate cultural fit.`;
              icon = Info;
              colorClass = 'bg-orange-50 border-orange-200 text-orange-900';
            } else {
              recommendation = `💭 Proceed with Caution - ${candidate.name} shows moderate fit (${candidate.matchScore}% match, ${avgScore.toFixed(1)}/5 interview score). Key concerns: ${candidate.concerns.slice(0, 2).join(', ').toLowerCase()}. Consider for backup or alternative positions that better match their profile.`;
              icon = AlertCircle;
              colorClass = 'bg-gray-50 border-gray-200 text-gray-900';
            }

            const RecommendationIcon = icon;

            return (
              <Card key={candidate.id} className={`p-4 border-2 ${colorClass}`}>
                <div className="flex items-start gap-3">
                  <RecommendationIcon className="size-5 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed">{recommendation}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-purple-200">
          <div className="flex items-start gap-2 text-xs text-gray-600">
            <Info className="size-4 flex-shrink-0 mt-0.5" />
            <p>
              These recommendations are AI-generated based on match scores, interview performance, skills alignment, and hiring team feedback. 
              Final hiring decisions should incorporate additional factors including team dynamics, budget, and strategic priorities.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}