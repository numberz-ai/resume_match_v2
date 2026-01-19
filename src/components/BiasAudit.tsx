import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { mockAuditLogs, mockBiasMetrics } from '../data/mockData';
import { Shield, AlertTriangle, CheckCircle, Download, FileText, Search, Filter, TrendingUp, Activity, Loader2 } from 'lucide-react';
import { Input } from './ui/input';
import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function BiasAudit() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRunningAnalysis, setIsRunningAnalysis] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStep, setAnalysisStep] = useState('');

  const runAnalysis = () => {
    setIsRunningAnalysis(true);
    setAnalysisProgress(0);
    
    const steps = [
      'Initializing bias analysis...',
      'Analyzing gender distribution...',
      'Checking age diversity...',
      'Evaluating educational background...',
      'Reviewing geographic representation...',
      'Analyzing skill requirements...',
      'Assessing interview patterns...',
      'Generating fairness metrics...',
      'Compiling recommendations...',
      'Analysis complete!'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = (currentStep / steps.length) * 100;
      setAnalysisProgress(progress);
      setAnalysisStep(steps[currentStep - 1] || steps[steps.length - 1]);

      if (currentStep >= steps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsRunningAnalysis(false);
          setAnalysisProgress(0);
          setAnalysisStep('');
        }, 1000);
      }
    }, 1000);

    // Cleanup function
    return () => clearInterval(interval);
  };

  const handleExportAuditLogs = () => {
    const csv = [
      ['Timestamp', 'Action', 'User', 'Candidate', 'Details', 'Category'],
      ...mockAuditLogs.map(log => [
        log.timestamp,
        log.action,
        log.user,
        log.candidateName || '',
        log.details,
        log.category,
      ]),
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'audit_logs.csv';
    a.click();
  };

  const handleExportBiasReport = () => {
    const report = `
BIAS & FAIRNESS REPORT
Generated: ${new Date().toISOString()}

${mockBiasMetrics.map(metric => `
${metric.category}
Score: ${metric.score}/100
Status: ${metric.status.toUpperCase()}
Description: ${metric.description}

Recommendations:
${metric.recommendations.map(r => `- ${r}`).join('\n')}
`).join('\n---\n')}
    `.trim();

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bias_report.txt';
    a.click();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'concern': return AlertTriangle;
      default: return Shield;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', bar: 'bg-emerald-500' };
      case 'warning': return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', bar: 'bg-amber-500' };
      case 'concern': return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', bar: 'bg-red-500' };
      default: return { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', bar: 'bg-gray-500' };
    }
  };

  const overallScore = Math.round(
    mockBiasMetrics.reduce((sum, m) => sum + m.score, 0) / mockBiasMetrics.length
  );

  const filteredLogs = mockAuditLogs.filter(log => {
    const matchesCategory = selectedCategory === 'all' || log.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.candidateName && log.candidateName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categoryStats = {
    all: mockAuditLogs.length,
    search: mockAuditLogs.filter(l => l.category === 'search').length,
    view: mockAuditLogs.filter(l => l.category === 'view').length,
    status_change: mockAuditLogs.filter(l => l.category === 'status_change').length,
    export: mockAuditLogs.filter(l => l.category === 'export').length,
    ai_interaction: mockAuditLogs.filter(l => l.category === 'ai_interaction').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-1">Bias Detection & Audit</h1>
        <p className="text-sm text-gray-600">Monitor fairness metrics and track all recruitment activities</p>
      </div>

      <Tabs defaultValue="bias" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="bias">
            <Shield className="size-4 mr-2" />
            Bias & Fairness
          </TabsTrigger>
          <TabsTrigger value="audit">
            <FileText className="size-4 mr-2" />
            Audit Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bias" className="space-y-6 mt-6">
          {/* Overall Score Card */}
          <Card className="p-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 border-2">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="size-6 text-blue-600" />
                  <h2 className="text-gray-900">Overall Fairness Score</h2>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Aggregate score across all bias detection metrics
                </p>
                <div className="flex items-center gap-3">
                  <Badge className="bg-emerald-500 text-white px-3 py-1">
                    <CheckCircle className="size-3 mr-1" />
                    Excellent
                  </Badge>
                  <span className="text-xs text-gray-600">Last updated: Today, 2:30 PM</span>
                </div>
              </div>
              <div className="text-center">
                <div className="relative size-32">
                  <svg className="size-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#e5e7eb"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#10b981"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${(overallScore / 100) * 351.68} 351.68`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl text-gray-900">{overallScore}</div>
                    <div className="text-xs text-gray-600">/ 100</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Bias Metrics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockBiasMetrics.map((metric, index) => {
              const StatusIcon = getStatusIcon(metric.status);
              const colors = getStatusColor(metric.status);
              
              return (
                <Card key={index} className={`p-6 border-2 ${colors.border} ${colors.bg}`}>
                  <div className="flex items-start gap-4">
                    <div className={`size-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0`}>
                      <StatusIcon className={`size-6 ${colors.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-gray-900 mb-1">{metric.category}</h3>
                          <Badge className={`${colors.bg} ${colors.text} border-0 capitalize`}>
                            {metric.status}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl text-gray-900">{metric.score}</div>
                          <div className="text-xs text-gray-600">/ 100</div>
                        </div>
                      </div>
                      
                      <Progress value={metric.score} className="h-2 mb-4" />
                      
                      <p className="text-sm text-gray-700 mb-4">{metric.description}</p>
                      
                      <div className="space-y-2">
                        <p className="text-xs text-gray-600">Recommendations:</p>
                        {metric.recommendations.map((rec, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                            <CheckCircle className="size-3 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span>{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Export Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-900 mb-1">Bias Analysis & Reports</h3>
                <p className="text-sm text-gray-600">Run bias analysis or download fairness report</p>
              </div>
              <div className="flex gap-3">
                <Button onClick={runAnalysis} className="bg-purple-600 hover:bg-purple-700">
                  <Activity className="size-4 mr-2" />
                  Run Analysis
                </Button>
                <Button onClick={handleExportBiasReport} className="bg-blue-600 hover:bg-blue-700">
                  <Download className="size-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6 mt-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
              { label: 'Total', value: categoryStats.all, category: 'all', color: 'text-gray-900', bg: 'bg-gray-50' },
              { label: 'Searches', value: categoryStats.search, category: 'search', color: 'text-blue-700', bg: 'bg-blue-50' },
              { label: 'Views', value: categoryStats.view, category: 'view', color: 'text-purple-700', bg: 'bg-purple-50' },
              { label: 'Status Changes', value: categoryStats.status_change, category: 'status_change', color: 'text-emerald-700', bg: 'bg-emerald-50' },
              { label: 'Exports', value: categoryStats.export, category: 'export', color: 'text-amber-700', bg: 'bg-amber-50' },
              { label: 'AI Actions', value: categoryStats.ai_interaction, category: 'ai_interaction', color: 'text-pink-700', bg: 'bg-pink-50' },
            ].map((stat) => (
              <Card 
                key={stat.category} 
                className={`p-4 cursor-pointer transition-all ${
                  selectedCategory === stat.category 
                    ? `${stat.bg} border-2 shadow-sm` 
                    : 'hover:shadow-sm'
                }`}
                onClick={() => setSelectedCategory(stat.category)}
              >
                <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
                <p className={`text-2xl ${stat.color}`}>{stat.value}</p>
              </Card>
            ))}
          </div>

          {/* Search & Filter */}
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  placeholder="Search audit logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" onClick={handleExportAuditLogs}>
                <Download className="size-4 mr-2" />
                Export Logs
              </Button>
            </div>
          </Card>

          {/* Audit Logs */}
          <Card className="p-6">
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredLogs.length === 0 ? (
                <div className="text-center py-12">
                  <Activity className="size-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No audit logs found</p>
                </div>
              ) : (
                filteredLogs.map((log) => (
                  <div key={log.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 flex-1">
                        <Badge variant="outline" className="text-xs capitalize">
                          {log.category.replace('_', ' ')}
                        </Badge>
                        <p className="text-sm text-gray-900">{log.action}</p>
                      </div>
                      <p className="text-xs text-gray-500 whitespace-nowrap ml-4">
                        {new Date(log.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{log.details}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <span className="text-gray-400">User:</span> {log.user}
                      </span>
                      {log.candidateName && (
                        <span className="flex items-center gap-1">
                          <span className="text-gray-400">Candidate:</span> {log.candidateName}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Analysis Dialog */}
      <Dialog open={isRunningAnalysis}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Bias Analysis</DialogTitle>
            <DialogDescription>Running bias analysis...</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Progress value={analysisProgress} className="h-2" />
            <p className="text-sm text-gray-600">{analysisStep}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}