import { Card } from './ui/card';
import { Button } from './ui/button';
import { FileText, Download, ExternalLink } from 'lucide-react';

interface ResumeViewerProps {
  candidateId: string;
}

export function ResumeViewer({ candidateId }: ResumeViewerProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="size-5 text-gray-600" />
          <h3 className="text-gray-900">Resume</h3>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Download className="size-4 mr-2" />
            Download
          </Button>
          <Button size="sm" variant="outline">
            <ExternalLink className="size-4 mr-2" />
            Open
          </Button>
        </div>
      </div>

      {/* Resume Preview */}
      <div className="border border-gray-200 rounded-lg bg-white p-8 min-h-[600px]">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-gray-900 mb-2">Dr. Sarah Chen</h1>
            <p className="text-gray-600 mb-2">Senior Machine Learning Engineer</p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <span>sarah.chen@email.com</span>
              <span>•</span>
              <span>+1 (555) 123-4567</span>
              <span>•</span>
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center justify-center gap-3 mt-2 text-sm text-blue-600">
              <a href="#">linkedin.com/in/sarahchen</a>
              <span>•</span>
              <a href="#">github.com/sarahchen</a>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-6">
            <h2 className="text-gray-900 border-b border-gray-300 pb-1 mb-3">Professional Summary</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Ph.D. in Computer Science with 8+ years of experience building production machine learning systems. 
              Published researcher with 15+ papers in top-tier conferences (NeurIPS, ICML, CVPR). Expertise in NLP, 
              computer vision, and distributed ML systems. Proven track record of delivering ML solutions at scale 
              and mentoring junior engineers.
            </p>
          </div>

          {/* Experience */}
          <div className="mb-6">
            <h2 className="text-gray-900 border-b border-gray-300 pb-1 mb-3">Experience</h2>
            
            <div className="mb-4">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h3 className="text-gray-900">Senior Machine Learning Engineer</h3>
                  <p className="text-sm text-gray-600">Tech Innovations Inc.</p>
                </div>
                <p className="text-sm text-gray-500">Aug 2023 - Present</p>
              </div>
              <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                <li>Led development of NLP pipeline processing 10M+ documents daily with 99.9% uptime</li>
                <li>Reduced model inference latency by 60% through optimization and distributed computing</li>
                <li>Mentored team of 3 junior ML engineers, conducting code reviews and technical guidance</li>
                <li>Architected ML feature store serving 50+ models across the organization</li>
              </ul>
            </div>

            <div className="mb-4">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h3 className="text-gray-900">Machine Learning Engineer</h3>
                  <p className="text-sm text-gray-600">AI Research Labs</p>
                </div>
                <p className="text-sm text-gray-500">Jul 2020 - Aug 2023</p>
              </div>
              <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                <li>Built computer vision system for medical imaging achieving 95% accuracy, deployed to 20+ hospitals</li>
                <li>Published 8 papers in top-tier ML conferences (NeurIPS, ICML, CVPR)</li>
                <li>Open-sourced ML framework that gained 5,000+ GitHub stars and 500+ contributors</li>
                <li>Collaborated with cross-functional teams to deploy ML models to production</li>
              </ul>
            </div>
          </div>

          {/* Education */}
          <div className="mb-6">
            <h2 className="text-gray-900 border-b border-gray-300 pb-1 mb-3">Education</h2>
            <div className="mb-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-gray-900">Ph.D. in Computer Science</h3>
                  <p className="text-sm text-gray-600">Stanford University</p>
                  <p className="text-sm text-gray-500">Dissertation: "Scalable Deep Learning for Natural Language Understanding"</p>
                </div>
                <p className="text-sm text-gray-500">2016 - 2020</p>
              </div>
            </div>
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-gray-900">B.S. in Computer Science</h3>
                  <p className="text-sm text-gray-600">MIT</p>
                  <p className="text-sm text-gray-500">Summa Cum Laude, GPA: 3.95/4.0</p>
                </div>
                <p className="text-sm text-gray-500">2012 - 2016</p>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h2 className="text-gray-900 border-b border-gray-300 pb-1 mb-3">Skills</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-700 mb-1"><span className="font-semibold">Languages:</span> Python, C++, Java, SQL</p>
                <p className="text-gray-700 mb-1"><span className="font-semibold">ML Frameworks:</span> TensorFlow, PyTorch, JAX, scikit-learn</p>
                <p className="text-gray-700 mb-1"><span className="font-semibold">Cloud:</span> AWS, GCP, Azure</p>
              </div>
              <div>
                <p className="text-gray-700 mb-1"><span className="font-semibold">Specialties:</span> NLP, Computer Vision, Deep Learning</p>
                <p className="text-gray-700 mb-1"><span className="font-semibold">Tools:</span> Docker, Kubernetes, Git, MLflow</p>
                <p className="text-gray-700 mb-1"><span className="font-semibold">Databases:</span> PostgreSQL, MongoDB, Redis</p>
              </div>
            </div>
          </div>

          {/* Publications */}
          <div>
            <h2 className="text-gray-900 border-b border-gray-300 pb-1 mb-3">Selected Publications</h2>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>"Efficient Transformers for Large-Scale NLP" - NeurIPS 2024</li>
              <li>"Self-Supervised Learning for Medical Image Analysis" - CVPR 2023</li>
              <li>"Scalable Distributed Training of Deep Neural Networks" - ICML 2022</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}
