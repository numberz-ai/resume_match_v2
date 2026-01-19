import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { TrainingNeed } from '../types';
import { Target, Clock, TrendingUp } from 'lucide-react';

interface TrainingNeedsProps {
  candidateId: string;
}

export function TrainingNeeds({ candidateId }: TrainingNeedsProps) {
  // Mock training needs assessment
  const trainingNeeds: TrainingNeed[] = [
    {
      skill: 'Internal ML Platform',
      currentLevel: 0,
      requiredLevel: 80,
      estimatedTime: '2 weeks',
      priority: 'high',
    },
    {
      skill: 'Company Product Domain',
      currentLevel: 40,
      requiredLevel: 85,
      estimatedTime: '3 weeks',
      priority: 'high',
    },
    {
      skill: 'Internal Tools & Processes',
      currentLevel: 0,
      requiredLevel: 70,
      estimatedTime: '1 week',
      priority: 'medium',
    },
    {
      skill: 'Team Collaboration Workflows',
      currentLevel: 60,
      requiredLevel: 90,
      estimatedTime: '1 week',
      priority: 'medium',
    },
    {
      skill: 'Cloud Infrastructure (AWS specific)',
      currentLevel: 70,
      requiredLevel: 85,
      estimatedTime: '2 weeks',
      priority: 'low',
    },
  ];

  const overallReadiness = 78;
  const totalTrainingTime = '6-8 weeks for full productivity';

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-900 mb-1">Overall Readiness</h3>
            <p className="text-sm text-gray-600">Technical skills vs. job requirements</p>
          </div>
          <div className="text-right">
            <div className="text-4xl text-blue-600 font-mono">{overallReadiness}%</div>
            <p className="text-sm text-gray-600">Ready</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-700">
          <Clock className="size-4" />
          <span>Estimated ramp-up time: {totalTrainingTime}</span>
        </div>
      </Card>

      {/* Training Needs Breakdown */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="size-5 text-gray-600" />
          <h3 className="text-gray-900">Training Needs Assessment</h3>
        </div>
        <div className="space-y-4">
          {trainingNeeds.map((need, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm text-gray-900">{need.skill}</p>
                    <Badge className={getPriorityColor(need.priority)} variant="secondary">
                      {need.priority} priority
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Current: {need.currentLevel}%</span>
                    <span>Required: {need.requiredLevel}%</span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {need.estimatedTime}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Progress bars */}
              <div className="space-y-1">
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-blue-500"
                    style={{ width: `${need.currentLevel}%` }}
                  />
                  <div
                    className="absolute top-0 h-full border-r-2 border-dashed border-purple-500"
                    style={{ left: `${need.requiredLevel}%` }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs">
                    <div className="size-2 bg-blue-500 rounded" />
                    <span className="text-gray-600">Current level</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <div className="size-2 border-2 border-purple-500 rounded" />
                    <span className="text-gray-600">Required level</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="size-5 text-gray-600" />
          <h3 className="text-gray-900">AI Recommendations</h3>
        </div>
        <div className="space-y-3">
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-900 mb-1">✓ Excellent Technical Foundation</p>
            <p className="text-xs text-green-700">
              Candidate's core ML skills exceed requirements. Training needed is primarily company-specific tools and processes.
            </p>
          </div>
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900 mb-1">📚 Suggested Onboarding Plan</p>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Week 1-2: Internal platform training & setup</li>
              <li>• Week 3-4: Product domain deep-dive with product team</li>
              <li>• Week 5-6: Shadow current team, pair programming</li>
              <li>• Week 7-8: First independent project with mentorship</li>
            </ul>
          </div>
          <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-sm text-purple-900 mb-1">🎯 Quick Win Opportunity</p>
            <p className="text-xs text-purple-700">
              Candidate's research background can immediately contribute to ongoing ML research initiatives while ramping up on product systems.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
