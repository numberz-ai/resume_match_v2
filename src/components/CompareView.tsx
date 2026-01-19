import { mockCandidates } from '../data/mockData';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';
import { X, CheckCircle, XCircle, Mail, Phone, MapPin } from 'lucide-react';

interface CompareViewProps {
  candidateIds: string[];
  onClose: () => void;
}

export function CompareView({ candidateIds, onClose }: CompareViewProps) {
  const candidates = candidateIds.map(id => mockCandidates.find(c => c.id === id)).filter(Boolean);

  if (candidates.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-600">No candidates selected for comparison</p>
      </Card>
    );
  }

  const comparisonMetrics = [
    { label: 'Match Score', key: 'matchScore', type: 'percentage' },
    { label: 'Experience', key: 'experience', type: 'years' },
    { label: 'Education', key: 'education', type: 'text' },
    { label: 'Location', key: 'location', type: 'text' },
  ];

  const skillComparison = [
    { skill: 'Machine Learning', scores: [98, 92, 85] },
    { skill: 'Python', scores: [100, 95, 90] },
    { skill: 'TensorFlow', scores: [95, 88, 92] },
    { skill: 'Leadership', scores: [92, 85, 78] },
    { skill: 'Communication', scores: [90, 95, 88] },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Compare Candidates</h1>
          <p className="text-gray-600">Side-by-side comparison of {candidates.length} candidates</p>
        </div>
        <Button variant="outline" onClick={onClose}>
          <X className="size-4 mr-2" />
          Close Comparison
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <Card key={candidate!.id} className="p-6">
            {/* Profile Header */}
            <div className="text-center mb-6">
              <Avatar className="size-24 mx-auto mb-4 border-4 border-white shadow-lg ring-2 ring-gray-100">
                <AvatarImage src={candidate!.avatar} alt={candidate!.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-2xl">
                  {candidate!.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-gray-900 mb-1">{candidate!.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{candidate!.title}</p>
              <Badge className={`${
                candidate!.matchScore >= 90 ? 'bg-emerald-500' : 
                candidate!.matchScore >= 70 ? 'bg-blue-500' : 
                'bg-amber-500'
              } text-white`}>
                {candidate!.matchScore}% Match
              </Badge>
            </div>

            <Separator className="my-4" />

            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-xs text-gray-700">
                <Mail className="size-3 text-blue-600" />
                <span className="truncate">{candidate!.email}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-700">
                <Phone className="size-3 text-emerald-600" />
                <span>{candidate!.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-700">
                <MapPin className="size-3 text-purple-600" />
                <span>{candidate!.location}</span>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Key Metrics */}
            <div className="space-y-3 mb-6">
              <div>
                <p className="text-xs text-gray-600 mb-1">Experience</p>
                <p className="text-sm text-gray-900">{candidate!.experience} years</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Education</p>
                <p className="text-sm text-gray-900">{candidate!.education}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Current Status</p>
                <Badge variant="outline" className="text-xs capitalize">
                  {candidate!.status}
                </Badge>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Skills */}
            <div>
              <p className="text-xs text-gray-600 mb-3">Skills Overview</p>
              <div className="flex flex-wrap gap-2">
                {candidate!.skills.slice(0, 6).map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}

        {/* Fill empty slots if less than 3 candidates */}
        {candidates.length < 3 && Array.from({ length: 3 - candidates.length }).map((_, idx) => (
          <Card key={`empty-${idx}`} className="p-6 border-dashed border-2 border-gray-300 flex items-center justify-center min-h-[600px]">
            <div className="text-center text-gray-400">
              <p className="text-sm">No candidate selected</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Detailed Comparison Table */}
      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">Skill Comparison</h3>
        <div className="space-y-4">
          {skillComparison.map((item, idx) => (
            <div key={idx}>
              <p className="text-sm text-gray-900 mb-2">{item.skill}</p>
              <div className="grid grid-cols-3 gap-4">
                {candidates.map((candidate, cIdx) => {
                  const score = item.scores[cIdx] || 0;
                  return (
                    <div key={candidate!.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">{candidate!.name.split(' ')[0]}</span>
                        <span className="text-xs text-gray-900">{score}%</span>
                      </div>
                      <Progress value={score} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Pros & Cons */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <Card key={`pros-${candidate!.id}`} className="p-6">
            <h4 className="text-sm text-gray-900 mb-4">Strengths & Considerations</h4>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="size-4 text-emerald-600" />
                  <p className="text-xs text-gray-900">Strengths</p>
                </div>
                <ul className="space-y-1 ml-6 text-xs text-gray-700">
                  <li>• Exceptional technical skills</li>
                  <li>• Strong leadership potential</li>
                  <li>• Relevant industry experience</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="size-4 text-amber-600" />
                  <p className="text-xs text-gray-900">Considerations</p>
                </div>
                <ul className="space-y-1 ml-6 text-xs text-gray-700">
                  <li>• May require visa sponsorship</li>
                  <li>• Higher salary expectations</li>
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
