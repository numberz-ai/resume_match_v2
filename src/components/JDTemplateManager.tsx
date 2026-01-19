import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { 
  FileText, 
  Plus, 
  Search,
  Trash2,
  Edit,
  Copy,
  CheckCircle,
  Sparkles,
  Star,
  Clock
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

interface JDTemplate {
  id: string;
  name: string;
  category: string;
  level: string;
  description: string;
  content: string;
  createdAt: string;
  usageCount: number;
  isFavorite: boolean;
}

interface JDTemplateManagerProps {
  onSelectTemplate: (template: JDTemplate) => void;
  onClose: () => void;
}

export function JDTemplateManager({ onSelectTemplate, onClose }: JDTemplateManagerProps) {
  const [templates, setTemplates] = useState<JDTemplate[]>([
    {
      id: '1',
      name: 'Senior Software Engineer',
      category: 'Engineering',
      level: 'Senior',
      description: 'Full-stack engineering role focused on scalable systems',
      content: `We are seeking a talented Senior Software Engineer to join our engineering team.

About the Role:
As a Senior Software Engineer, you will design, develop, and maintain scalable software solutions that power our platform. You'll work with cutting-edge technologies and collaborate with cross-functional teams to deliver high-quality products.

Key Responsibilities:
• Design and implement robust, scalable software solutions
• Lead technical discussions and architectural decisions
• Mentor junior engineers and promote best practices
• Collaborate with product managers and designers on feature development
• Write clean, maintainable, and well-tested code
• Participate in code reviews and contribute to technical documentation
• Optimize application performance and scalability

Required Qualifications:
• Bachelor's degree in Computer Science or related field
• 5+ years of professional software development experience
• Strong proficiency in modern programming languages (Python, Java, JavaScript/TypeScript)
• Experience with cloud platforms (AWS, GCP, or Azure)
• Deep understanding of data structures, algorithms, and software design patterns
• Excellent problem-solving and communication skills
• Experience with agile development methodologies

Preferred Qualifications:
• Master's degree in Computer Science
• Experience with microservices architecture
• Knowledge of containerization (Docker, Kubernetes)
• Open source contributions
• Experience leading technical projects

What We Offer:
• Competitive salary and equity package
• Comprehensive health, dental, and vision insurance
• Flexible work arrangements and remote options
• Professional development budget
• Collaborative and innovative work environment
• Cutting-edge technology stack`,
      createdAt: '2024-01-15',
      usageCount: 12,
      isFavorite: true
    },
    {
      id: '2',
      name: 'Product Manager',
      category: 'Product',
      level: 'Mid',
      description: 'Strategic product role for feature development',
      content: `We are looking for a Product Manager to drive product strategy and execution.

About the Role:
As a Product Manager, you will own the product roadmap, work closely with engineering and design teams, and ensure we're building products that delight our customers.

Key Responsibilities:
• Define product vision, strategy, and roadmap
• Conduct market research and competitive analysis
• Gather and prioritize product requirements
• Work closely with engineering and design teams
• Define and track product metrics and KPIs
• Lead product launches and go-to-market strategies

Required Qualifications:
• 3+ years of product management experience
• Strong analytical and problem-solving skills
• Excellent communication and stakeholder management
• Experience with agile methodologies
• Data-driven decision making

What We Offer:
• Competitive compensation
• Health benefits
• Growth opportunities
• Innovative environment`,
      createdAt: '2024-02-20',
      usageCount: 8,
      isFavorite: false
    },
    {
      id: '3',
      name: 'Data Scientist',
      category: 'Engineering',
      level: 'Senior',
      description: 'ML/AI focused data science role',
      content: `Join our data science team to build intelligent systems.

About the Role:
As a Senior Data Scientist, you will develop machine learning models, analyze complex datasets, and drive data-driven decision making across the organization.

Key Responsibilities:
• Design and implement machine learning models
• Analyze large-scale datasets to extract insights
• Collaborate with engineering to deploy models to production
• Develop data pipelines and ETL processes
• Present findings to stakeholders

Required Qualifications:
• Advanced degree in Computer Science, Statistics, or related field
• 5+ years of data science experience
• Strong Python and SQL skills
• Experience with ML frameworks (TensorFlow, PyTorch, scikit-learn)
• Excellent statistical analysis skills

What We Offer:
• Top-tier compensation
• Research opportunities
• Conference attendance
• Latest tools and technologies`,
      createdAt: '2024-03-10',
      usageCount: 5,
      isFavorite: true
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCreating, setIsCreating] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<JDTemplate | null>(null);

  const categories = ['all', ...Array.from(new Set(templates.map(t => t.category)))];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id: string) => {
    setTemplates(templates.map(t => 
      t.id === id ? { ...t, isFavorite: !t.isFavorite } : t
    ));
  };

  const deleteTemplate = (id: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      setTemplates(templates.filter(t => t.id !== id));
    }
  };

  const duplicateTemplate = (template: JDTemplate) => {
    const newTemplate = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
      usageCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTemplates([...templates, newTemplate]);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[85vh] p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="flex items-center gap-2">
            <FileText className="size-5 text-blue-600" />
            Job Description Templates
          </DialogTitle>
          <DialogDescription>
            Browse, create, and manage reusable job description templates
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-4 space-y-4 overflow-y-auto max-h-[calc(85vh-140px)]">
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  size="sm"
                  className={selectedCategory === category ? 'bg-blue-600 hover:bg-blue-700' : ''}
                >
                  {category === 'all' ? 'All' : category}
                </Button>
              ))}
              <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                <Plus className="size-4 mr-2" />
                Create Template
              </Button>
            </div>
          </div>

          {/* Templates Grid */}
          {filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="p-4 hover:shadow-md transition-all border hover:border-blue-300">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-gray-900 truncate">{template.name}</h4>
                        {template.isFavorite && (
                          <Star className="size-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{template.description}</p>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="text-xs">{template.category}</Badge>
                        <Badge variant="outline" className="text-xs">{template.level}</Badge>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Copy className="size-3" />
                          Used {template.usageCount}x
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(template.id)}
                      className="flex-shrink-0 h-8 w-8"
                    >
                      <Star className={`size-4 ${template.isFavorite ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`} />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t">
                    <Button
                      size="sm"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-8"
                      onClick={() => {
                        onSelectTemplate(template);
                        onClose();
                      }}
                    >
                      <CheckCircle className="size-3.5 mr-1.5" />
                      Use Template
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => duplicateTemplate(template)}
                      title="Duplicate"
                      className="h-8 w-8"
                    >
                      <Copy className="size-3.5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setEditingTemplate(template)}
                      title="Edit"
                      className="h-8 w-8"
                    >
                      <Edit className="size-3.5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => deleteTemplate(template.id)}
                      title="Delete"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <Clock className="size-3" />
                    Created {new Date(template.createdAt).toLocaleDateString()}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="size-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">No templates found</p>
              <p className="text-sm text-gray-500">Try adjusting your search or create a new template</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}