import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { AlternativeRole } from '../types';
import { Briefcase, TrendingUp } from 'lucide-react';

interface AlternativeRolesProps {
  candidateId: string;
}

export function AlternativeRoles({ candidateId }: AlternativeRolesProps) {
  // Mock alternative role matches
  const alternativeRoles: AlternativeRole[] = [
    {
      roleTitle: 'ML Research Scientist',
      matchScore: 96,
      department: 'AI Research Lab',
      reasons: [
        'Ph.D. background perfectly aligned with research role',
        'Strong publication record in top-tier conferences',
        'Experience with cutting-edge ML techniques',
      ],
    },
    {
      roleTitle: 'Senior ML Engineer - NLP Team',
      matchScore: 94,
      department: 'Product AI',
      reasons: [
        'Applied for ML Engineer role, but NLP expertise is exceptional',
        'Previous experience building production NLP systems',
        'Could accelerate our language model initiatives',
      ],
    },
    {
      roleTitle: 'AI/ML Team Lead',
      matchScore: 91,
      department: 'Engineering',
      reasons: [
        'Leadership potential identified by AI analysis',
        'Experience mentoring junior engineers',
        'Strong technical depth combined with communication skills',
      ],
    },
    {
      roleTitle: 'Computer Vision Engineer',
      matchScore: 88,
      department: 'Product AI',
      reasons: [
        'Published research in computer vision',
        'Built production CV systems in previous role',
        'Could support upcoming CV projects',
      ],
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    return 'text-yellow-600';
  };

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Briefcase className="size-5 text-gray-600" />
        <h3 className="text-gray-900">Alternative Role Matches</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        AI-identified alternative positions where this candidate may be an even better fit
      </p>
      <div className="space-y-3">
        {alternativeRoles.map((role, index) => (
          <div
            key={index}
            className="p-4 bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <p className="text-sm text-gray-900 mb-1">{role.roleTitle}</p>
                <Badge variant="outline" className="text-xs">
                  {role.department}
                </Badge>
              </div>
              <div className={`text-right ${getScoreColor(role.matchScore)}`}>
                <div className="font-mono">{role.matchScore}%</div>
                <div className="text-xs text-gray-500">match</div>
              </div>
            </div>
            <ul className="space-y-1 mt-3">
              {role.reasons.map((reason, i) => (
                <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
        <p className="text-xs text-purple-900">
          💡 <span className="font-semibold">AI Suggestion:</span> Consider discussing these alternative roles with the candidate. 
          The ML Research Scientist position may be a better long-term fit given their Ph.D. and research interests.
        </p>
      </div>
    </Card>
  );
}
