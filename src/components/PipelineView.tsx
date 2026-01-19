import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { mockCandidates } from '../data/mockData';
import { Plus, Filter, Mail, ExternalLink } from 'lucide-react';

type CandidateStatus = 'new' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';

const stages = [
  { id: 'new' as CandidateStatus, label: 'New', color: 'bg-blue-500' },
  { id: 'screening' as CandidateStatus, label: 'Screening', color: 'bg-amber-500' },
  { id: 'interview' as CandidateStatus, label: 'Interview', color: 'bg-purple-500' },
  { id: 'offer' as CandidateStatus, label: 'Offer', color: 'bg-emerald-500' },
  { id: 'hired' as CandidateStatus, label: 'Hired', color: 'bg-green-500' },
];

export function PipelineView() {
  const [candidatesByStage] = useState(() => {
    const stageMap: Record<CandidateStatus, typeof mockCandidates> = {
      new: [],
      screening: [],
      interview: [],
      offer: [],
      hired: [],
      rejected: [],
    };
    
    mockCandidates.forEach(candidate => {
      if (candidate.status in stageMap) {
        stageMap[candidate.status as CandidateStatus].push(candidate);
      }
    });
    
    return stageMap;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Recruitment Pipeline</h1>
          <p className="text-sm text-gray-600 mt-1">Drag and drop candidates between stages</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="size-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="size-4 mr-2" />
            Add Candidate
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-5 gap-4">
        {stages.map((stage) => {
          const candidates = candidatesByStage[stage.id];
          
          return (
            <div key={stage.id}>
              {/* Column Header */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm text-gray-900">{stage.label}</h3>
                  <Badge variant="outline" className="text-xs">
                    {candidates.length}
                  </Badge>
                </div>
                <div className={`h-1 ${stage.color} rounded-full`} />
              </div>

              {/* Candidate Cards */}
              <div className="space-y-3">
                {candidates.length === 0 ? (
                  <Card className="p-6 border-2 border-dashed border-gray-300">
                    <p className="text-xs text-center text-gray-400">No candidates</p>
                  </Card>
                ) : (
                  candidates.map((candidate) => (
                    <Card 
                      key={candidate.id} 
                      className="p-3 hover:shadow-md transition-shadow cursor-move"
                    >
                      {/* Candidate Info */}
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="size-10">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 truncate">{candidate.name}</p>
                          <p className="text-xs text-gray-500 truncate">{candidate.title}</p>
                        </div>
                      </div>

                      {/* Match Score */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-gray-600">Match</span>
                        <Badge 
                          className={`text-xs ${
                            candidate.matchScore >= 90 
                              ? 'bg-emerald-500' 
                              : candidate.matchScore >= 70 
                              ? 'bg-blue-500' 
                              : 'bg-amber-500'
                          }`}
                        >
                          {candidate.matchScore}%
                        </Badge>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        <Badge variant="outline" className="text-xs">Python</Badge>
                        <Badge variant="outline" className="text-xs">ML</Badge>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-7 text-xs flex-1">
                          <Mail className="size-3 mr-1" />
                          Email
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 text-xs flex-1">
                          <ExternalLink className="size-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
