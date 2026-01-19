import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { CareerNode } from '../types';
import { Building2, TrendingUp, Calendar } from 'lucide-react';

interface CareerTrajectoryProps {
  candidateId: string;
}

export function CareerTrajectory({ candidateId }: CareerTrajectoryProps) {
  // Mock career data
  const careerHistory: CareerNode[] = [
    {
      id: '1',
      company: 'Tech Innovations Inc.',
      role: 'Senior Machine Learning Engineer',
      duration: '2 years 3 months',
      startDate: '2023-08',
      endDate: 'Present',
      skills: ['Machine Learning', 'TensorFlow', 'PyTorch', 'NLP', 'Team Leadership'],
      achievements: [
        'Led development of NLP pipeline processing 10M+ documents daily',
        'Reduced model inference time by 60% through optimization',
        'Mentored 3 junior ML engineers',
      ],
    },
    {
      id: '2',
      company: 'AI Research Labs',
      role: 'Machine Learning Engineer',
      duration: '3 years 1 month',
      startDate: '2020-07',
      endDate: '2023-08',
      skills: ['Deep Learning', 'Computer Vision', 'Python', 'Research'],
      achievements: [
        'Published 8 papers in top-tier ML conferences (NeurIPS, ICML)',
        'Built computer vision system with 95% accuracy for medical imaging',
        'Open-sourced ML framework with 5k+ GitHub stars',
      ],
    },
    {
      id: '3',
      company: 'Stanford University',
      role: 'Ph.D. Researcher',
      duration: '4 years',
      startDate: '2016-09',
      endDate: '2020-06',
      skills: ['Research', 'Machine Learning Theory', 'Algorithm Design', 'Teaching'],
      achievements: [
        'Completed Ph.D. in Computer Science specializing in ML',
        'Published 7 peer-reviewed papers',
        'Teaching assistant for ML and AI courses',
      ],
    },
    {
      id: '4',
      company: 'DataTech Solutions',
      role: 'Software Engineer Intern',
      duration: '6 months',
      startDate: '2016-01',
      endDate: '2016-06',
      skills: ['Python', 'Data Analysis', 'SQL', 'Web Development'],
      achievements: [
        'Built data visualization dashboard used by 100+ employees',
        'Automated reporting pipeline saving 20 hours/week',
      ],
    },
  ];

  // Career progression simulation
  const futureScenarios = [
    {
      timeline: '6 months',
      role: 'Senior ML Engineer (Current Role)',
      probability: 95,
      description: 'Continues to excel in current technical role, leading complex ML projects',
    },
    {
      timeline: '1-2 years',
      role: 'ML Team Lead / Tech Lead',
      probability: 85,
      description: 'Natural progression to technical leadership given strong background and mentorship experience',
    },
    {
      timeline: '3-4 years',
      role: 'Engineering Manager / ML Manager',
      probability: 70,
      description: 'Potential transition to people management, leading larger ML teams',
    },
    {
      timeline: '5+ years',
      role: 'Director of ML Engineering / VP of AI',
      probability: 55,
      description: 'Long-term potential for senior leadership in ML/AI organizations',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Career History */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="size-5 text-gray-600" />
          <h3 className="text-gray-900">Career History</h3>
        </div>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
          
          <div className="space-y-6">
            {careerHistory.map((job, index) => (
              <div key={job.id} className="relative pl-10">
                {/* Timeline dot */}
                <div className={`absolute left-2.5 top-1.5 size-3 rounded-full border-2 ${
                  index === 0 ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'
                }`} />
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-gray-900">{job.role}</p>
                      <p className="text-sm text-gray-600">{job.company}</p>
                    </div>
                    {index === 0 && (
                      <Badge className="bg-green-100 text-green-700">Current</Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar className="size-4" />
                    <span>{job.duration}</span>
                    <span>•</span>
                    <span>{job.startDate} - {job.endDate}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  {job.achievements && (
                    <ul className="space-y-1">
                      {job.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Career Path Simulation */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="size-5 text-gray-600" />
          <h3 className="text-gray-900">Career Path Simulation</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          AI-predicted career progression based on skills, experience, and industry trends
        </p>
        <div className="space-y-3">
          {futureScenarios.map((scenario, index) => (
            <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {scenario.timeline}
                  </Badge>
                  <p className="text-sm text-gray-900">{scenario.role}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono text-blue-600">{scenario.probability}%</div>
                  <div className="text-xs text-gray-500">probability</div>
                </div>
              </div>
              <p className="text-xs text-gray-600">{scenario.description}</p>
              <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                  style={{ width: `${scenario.probability}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
