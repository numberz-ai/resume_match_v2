import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { TrendingUp, TrendingDown, Users, Clock, Target, Award, Download, Calendar, Filter } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const timeToHireData = [
  { month: 'Jun', days: 28 },
  { month: 'Jul', days: 32 },
  { month: 'Aug', days: 25 },
  { month: 'Sep', days: 22 },
  { month: 'Oct', days: 20 },
  { month: 'Nov', days: 18 },
];

const sourceEffectivenessData = [
  { name: 'LinkedIn', candidates: 45, hired: 12 },
  { name: 'Indeed', candidates: 32, hired: 8 },
  { name: 'Referrals', candidates: 28, hired: 15 },
  { name: 'Direct', candidates: 20, hired: 6 },
  { name: 'Agency', candidates: 15, hired: 4 },
];

const pipelineConversionData = [
  { name: 'Applied', value: 150 },
  { name: 'Screening', value: 85 },
  { name: 'Interview', value: 42 },
  { name: 'Offer', value: 18 },
  { name: 'Hired', value: 15 },
];

const diversityData = [
  { name: 'Women', value: 42, color: '#8b5cf6' },
  { name: 'Men', value: 58, color: '#3b82f6' },
];

const ethnicityData = [
  { name: 'Asian', value: 35, color: '#10b981' },
  { name: 'White', value: 30, color: '#3b82f6' },
  { name: 'Hispanic', value: 20, color: '#f59e0b' },
  { name: 'Black', value: 10, color: '#8b5cf6' },
  { name: 'Other', value: 5, color: '#6b7280' },
];

export function AnalyticsView() {
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Recruitment Analytics</h1>
          <p className="text-gray-600">Data-driven insights into your hiring process</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Calendar className="size-4 mr-2" />
            Last 6 Months
          </Button>
          <Button variant="outline">
            <Download className="size-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Time to Hire</p>
              <h3 className="text-gray-900 mb-1">18 days</h3>
              <div className="flex items-center gap-1 text-xs text-emerald-600">
                <TrendingDown className="size-3" />
                <span>2 days faster</span>
              </div>
            </div>
            <div className="size-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Clock className="size-6 text-emerald-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Candidates</p>
              <h3 className="text-gray-900 mb-1">150</h3>
              <div className="flex items-center gap-1 text-xs text-blue-600">
                <TrendingUp className="size-3" />
                <span>+12% this month</span>
              </div>
            </div>
            <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="size-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Offer Acceptance</p>
              <h3 className="text-gray-900 mb-1">83%</h3>
              <div className="flex items-center gap-1 text-xs text-emerald-600">
                <TrendingUp className="size-3" />
                <span>+8% improvement</span>
              </div>
            </div>
            <div className="size-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="size-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Quality of Hire</p>
              <h3 className="text-gray-900 mb-1">4.2/5</h3>
              <div className="flex items-center gap-1 text-xs text-amber-600">
                <Award className="size-3" />
                <span>Above target</span>
              </div>
            </div>
            <div className="size-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Award className="size-6 text-amber-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Pipeline Funnel Visualization */}
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-gray-900 mb-1">Recruitment Pipeline Funnel</h3>
          <p className="text-sm text-gray-600">Visual breakdown of candidate progression through hiring stages</p>
        </div>
        
        <div className="flex items-center justify-center py-8">
          <div className="w-full max-w-4xl space-y-4">
            {pipelineConversionData.map((stage, index) => {
              const percentage = index === 0 ? 100 : Math.round((stage.value / pipelineConversionData[0].value) * 100);
              const conversionFromPrevious = index === 0 ? 100 : Math.round((stage.value / pipelineConversionData[index - 1].value) * 100);
              const width = 20 + (percentage * 0.8); // Dynamic width based on percentage
              
              // Color gradient based on stage
              const stageColors = [
                'from-blue-500 to-blue-600',
                'from-purple-500 to-purple-600',
                'from-indigo-500 to-indigo-600',
                'from-violet-500 to-violet-600',
                'from-emerald-500 to-emerald-600',
              ];
              
              return (
                <div key={stage.name} className="flex items-center gap-4">
                  {/* Stage Label */}
                  <div className="w-24 text-right">
                    <p className="text-sm text-gray-900">{stage.name}</p>
                    {index > 0 && (
                      <p className="text-xs text-gray-500">{conversionFromPrevious}% conversion</p>
                    )}
                  </div>
                  
                  {/* Funnel Bar */}
                  <div className="flex-1 relative">
                    <div className="relative" style={{ marginLeft: `${(100 - width) / 2}%`, marginRight: `${(100 - width) / 2}%` }}>
                      <div className={`h-16 bg-gradient-to-r ${stageColors[index]} rounded-lg shadow-md flex items-center justify-between px-6 transform transition-all hover:scale-105 hover:shadow-lg`}>
                        <div className="flex items-center gap-3">
                          <div className="size-10 bg-white/20 rounded-lg flex items-center justify-center">
                            <Users className="size-5 text-white" />
                          </div>
                          <div>
                            <p className="text-white text-sm opacity-90">Candidates</p>
                            <p className="text-2xl text-white">{stage.value}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white text-xl">{percentage}%</p>
                          <p className="text-white/80 text-xs">of total</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Drop-off Indicator */}
                  {index < pipelineConversionData.length - 1 && (
                    <div className="w-20 text-left">
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs">
                        -{pipelineConversionData[index].value - pipelineConversionData[index + 1].value} lost
                      </Badge>
                    </div>
                  )}
                  {index === pipelineConversionData.length - 1 && (
                    <div className="w-20" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Funnel Summary */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Overall Conversion</p>
            <p className="text-2xl text-gray-900">10%</p>
            <p className="text-xs text-gray-500">Applied to Hired</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Biggest Drop-off</p>
            <p className="text-2xl text-gray-900">43%</p>
            <p className="text-xs text-gray-500">Screening to Interview</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Best Conversion</p>
            <p className="text-2xl text-gray-900">83%</p>
            <p className="text-xs text-gray-500">Offer to Hired</p>
          </div>
        </div>
      </Card>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-2 gap-6">
        {/* Time to Hire Trend */}
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-gray-900 mb-1">Time to Hire Trend</h3>
            <p className="text-sm text-gray-600">Average days from application to offer</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeToHireData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="days" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="Days to Hire"
                dot={{ fill: '#3b82f6', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Source Effectiveness */}
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-gray-900 mb-1">Source Effectiveness</h3>
            <p className="text-sm text-gray-600">Candidate sources and conversion</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sourceEffectivenessData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="candidates" fill="#3b82f6" name="Total Candidates" />
              <Bar dataKey="hired" fill="#10b981" name="Hired" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-3 gap-6">
        {/* Pipeline Conversion */}
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-gray-900 mb-1">Pipeline Conversion</h3>
            <p className="text-sm text-gray-600">Candidate drop-off by stage</p>
          </div>
          <div className="space-y-3">
            {pipelineConversionData.map((stage, index) => {
              const percentage = index === 0 ? 100 : Math.round((stage.value / pipelineConversionData[0].value) * 100);
              return (
                <div key={stage.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-gray-700">{stage.name}</span>
                    <span className="text-sm text-gray-900">{stage.value} ({percentage}%)</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-900">
              <strong>Conversion Rate:</strong> 10% from application to hire
            </p>
          </div>
        </Card>

        {/* Gender Diversity */}
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-gray-900 mb-1">Gender Diversity</h3>
            <p className="text-sm text-gray-600">Pipeline composition</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={diversityData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {diversityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4">
            {diversityData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="size-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-gray-700">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Ethnicity Diversity */}
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-gray-900 mb-1">Ethnicity Diversity</h3>
            <p className="text-sm text-gray-600">Pipeline breakdown</p>
          </div>
          <div className="space-y-2.5">
            {ethnicityData.map((item) => (
              <div key={item.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <span className="text-sm text-gray-900">{item.value}%</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full"
                    style={{ 
                      width: `${item.value}%`,
                      backgroundColor: item.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
            <p className="text-xs text-emerald-900">
              <strong>Diversity Score:</strong> 85/100 - Meeting targets
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}