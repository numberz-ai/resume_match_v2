import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { 
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  CheckCircle,
  XCircle,
  Sparkles,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Slider } from './ui/slider';

interface AssessmentCriteria {
  id: string;
  name: string;
  description: string;
  score: number;
  weight: number;
}

interface InterviewStage {
  id: string;
  name: string;
  interviewer: string;
  status: 'pending' | 'completed' | 'scheduled';
  date?: string;
  questions: string[];
}

interface InterviewAssessmentProps {
  candidateName: string;
  stage: InterviewStage;
  onSubmit: (assessment: any) => void;
  onClose: () => void;
}

export function InterviewAssessment({ candidateName, stage, onSubmit, onClose }: InterviewAssessmentProps) {
  const [overallRating, setOverallRating] = useState(0);
  const [recommendation, setRecommendation] = useState<'strong_yes' | 'yes' | 'no' | 'strong_no' | null>(null);
  const [notes, setNotes] = useState('');
  
  const [criteria, setCriteria] = useState<AssessmentCriteria[]>([
    { id: '1', name: 'Technical Skills', description: 'Coding ability and technical knowledge', score: 0, weight: 30 },
    { id: '2', name: 'Problem Solving', description: 'Analytical thinking and approach', score: 0, weight: 25 },
    { id: '3', name: 'Communication', description: 'Clarity and articulation', score: 0, weight: 20 },
    { id: '4', name: 'Culture Fit', description: 'Alignment with company values', score: 0, weight: 15 },
    { id: '5', name: 'Leadership', description: 'Initiative and influence', score: 0, weight: 10 }
  ]);

  const [questionResponses, setQuestionResponses] = useState<{ [key: string]: string }>(
    stage.questions.reduce((acc, _, idx) => ({ ...acc, [idx]: '' }), {})
  );

  const updateCriteriaScore = (id: string, score: number) => {
    setCriteria(criteria.map(c => c.id === id ? { ...c, score } : c));
  };

  const calculateWeightedScore = () => {
    const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);
    const weightedSum = criteria.reduce((sum, c) => sum + (c.score * c.weight), 0);
    return totalWeight > 0 ? (weightedSum / totalWeight).toFixed(1) : '0';
  };

  const handleSubmit = () => {
    const assessment = {
      stageId: stage.id,
      candidateName,
      overallRating,
      recommendation,
      criteria,
      questionResponses,
      notes,
      weightedScore: calculateWeightedScore(),
      submittedAt: new Date().toISOString()
    };
    onSubmit(assessment);
    onClose();
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-gray-900 mb-1">Interview Assessment</h2>
              <p className="text-gray-600">{candidateName} • {stage.name}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge>{stage.interviewer}</Badge>
                {stage.date && <Badge variant="outline">{new Date(stage.date).toLocaleDateString()}</Badge>}
              </div>
            </div>
            <Button variant="outline" onClick={onClose}>
              <XCircle className="size-4" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Overall Rating */}
          <Card className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
            <Label className="text-gray-900 mb-3 block">Overall Rating</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setOverallRating(rating)}
                  className="transition-all hover:scale-110"
                >
                  <Star
                    className={`size-10 ${
                      rating <= overallRating
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              {overallRating > 0 && (
                <span className="ml-4 text-2xl text-gray-900">{overallRating}/5</span>
              )}
            </div>
          </Card>

          {/* Recommendation */}
          <Card className="p-4">
            <Label className="text-gray-900 mb-3 block">Hiring Recommendation</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                variant={recommendation === 'strong_yes' ? 'default' : 'outline'}
                className={recommendation === 'strong_yes' ? 'bg-green-600 hover:bg-green-700' : ''}
                onClick={() => setRecommendation('strong_yes')}
              >
                <ThumbsUp className="size-4 mr-2" />
                Strong Yes
              </Button>
              <Button
                variant={recommendation === 'yes' ? 'default' : 'outline'}
                className={recommendation === 'yes' ? 'bg-green-500 hover:bg-green-600' : ''}
                onClick={() => setRecommendation('yes')}
              >
                <CheckCircle className="size-4 mr-2" />
                Yes
              </Button>
              <Button
                variant={recommendation === 'no' ? 'default' : 'outline'}
                className={recommendation === 'no' ? 'bg-red-500 hover:bg-red-600' : ''}
                onClick={() => setRecommendation('no')}
              >
                <AlertCircle className="size-4 mr-2" />
                No
              </Button>
              <Button
                variant={recommendation === 'strong_no' ? 'default' : 'outline'}
                className={recommendation === 'strong_no' ? 'bg-red-600 hover:bg-red-700' : ''}
                onClick={() => setRecommendation('strong_no')}
              >
                <ThumbsDown className="size-4 mr-2" />
                Strong No
              </Button>
            </div>
          </Card>

          {/* Assessment Criteria */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Label className="text-gray-900">Assessment Criteria</Label>
              <div className="flex items-center gap-2">
                <TrendingUp className="size-4 text-blue-600" />
                <span className="text-sm text-gray-600">
                  Weighted Score: <span className="text-blue-600 font-bold">{calculateWeightedScore()}/5</span>
                </span>
              </div>
            </div>
            <div className="space-y-4">
              {criteria.map((criterion) => (
                <div key={criterion.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-900">{criterion.name}</p>
                      <p className="text-xs text-gray-500">{criterion.description} • Weight: {criterion.weight}%</p>
                    </div>
                    <Badge variant="outline">{criterion.score}/5</Badge>
                  </div>
                  <Slider
                    value={[criterion.score]}
                    onValueChange={([value]) => updateCriteriaScore(criterion.id, value)}
                    max={5}
                    step={1}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Interview Questions */}
          <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="size-5 text-purple-600" />
              <Label className="text-gray-900">Interview Questions & Responses</Label>
            </div>
            <div className="space-y-4">
              {stage.questions.map((question, idx) => (
                <div key={idx} className="space-y-2">
                  <Label className="text-sm text-gray-900">Q{idx + 1}: {question}</Label>
                  <Textarea
                    placeholder="Enter candidate's response and your notes..."
                    value={questionResponses[idx] || ''}
                    onChange={(e) => setQuestionResponses({ ...questionResponses, [idx]: e.target.value })}
                    className="min-h-[80px] bg-white"
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Additional Notes */}
          <Card className="p-4">
            <Label className="text-gray-900 mb-3 block flex items-center gap-2">
              <MessageSquare className="size-4" />
              Additional Notes & Comments
            </Label>
            <Textarea
              placeholder="Any additional observations, strengths, concerns, or recommendations..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[120px]"
            />
          </Card>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t bg-gray-50 flex items-center justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleSubmit}
            disabled={!overallRating || !recommendation}
          >
            <CheckCircle className="size-4 mr-2" />
            Submit Assessment
          </Button>
        </div>
      </Card>
    </div>
  );
}
