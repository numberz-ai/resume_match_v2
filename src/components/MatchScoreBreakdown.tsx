import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { MatchDetails } from '../types';

interface MatchScoreBreakdownProps {
  candidateId: string;
}

export function MatchScoreBreakdown({ candidateId }: MatchScoreBreakdownProps) {
  // Mock data - in real app, this would be fetched based on candidateId
  const matchDetails: MatchDetails = {
    overallScore: 94,
    skillsMatch: 96,
    experienceMatch: 92,
    educationMatch: 98,
    culturalFit: 88,
    leadershipPotential: 90,
    technicalDepth: 95,
  };

  const scoreItems = [
    { label: 'Skills Match', score: matchDetails.skillsMatch, description: 'Technical skills alignment with job requirements' },
    { label: 'Experience Match', score: matchDetails.experienceMatch, description: 'Years and relevance of experience' },
    { label: 'Education Match', score: matchDetails.educationMatch, description: 'Educational background alignment' },
    { label: 'Cultural Fit', score: matchDetails.culturalFit, description: 'Alignment with company values and culture' },
    { label: 'Leadership Potential', score: matchDetails.leadershipPotential, description: 'Ability to lead teams and projects' },
    { label: 'Technical Depth', score: matchDetails.technicalDepth, description: 'Deep expertise in required technologies' },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-blue-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  return (
    <Card className="p-4">
      <h3 className="text-gray-900 mb-4">Match Score Breakdown</h3>
      <div className="space-y-4">
        {scoreItems.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900">{item.label}</p>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
              <span className="text-sm font-mono text-gray-700">{item.score}%</span>
            </div>
            <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`absolute top-0 left-0 h-full ${getScoreColor(item.score)} transition-all`}
                style={{ width: `${item.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
