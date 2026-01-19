import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Plug, 
  Upload, 
  CheckCircle2, 
  Settings,
  Link as LinkIcon,
  FileUp,
  Database,
  Cloud,
  Key,
  RefreshCw,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export function IntegrationsView() {
  const [selectedATS, setSelectedATS] = useState<string | null>(null);

  const atsProviders = [
    {
      id: 'greenhouse',
      name: 'Greenhouse',
      logo: '🏢',
      description: 'Industry-leading ATS with powerful hiring tools',
      connected: false,
      features: ['Candidate sync', 'Job postings', 'Interview scheduling', 'Offer management']
    },
    {
      id: 'lever',
      name: 'Lever',
      logo: '⚖️',
      description: 'Modern ATS and CRM for recruiting teams',
      connected: false,
      features: ['Candidate pipeline', 'Email integration', 'Analytics', 'Team collaboration']
    },
    {
      id: 'workday',
      name: 'Workday',
      logo: '💼',
      description: 'Enterprise HR and recruiting platform',
      connected: true,
      features: ['Full HRIS integration', 'Compliance', 'Onboarding', 'Reporting'],
      lastSync: '2 hours ago'
    },
    {
      id: 'bamboohr',
      name: 'BambooHR',
      logo: '🎋',
      description: 'All-in-one HR software for small to medium businesses',
      connected: false,
      features: ['Employee data', 'Applicant tracking', 'Onboarding', 'Time tracking']
    },
    {
      id: 'ashby',
      name: 'Ashby',
      logo: '🚀',
      description: 'Modern recruiting platform with analytics',
      connected: false,
      features: ['Recruiting analytics', 'Candidate sourcing', 'Interview scheduling']
    },
    {
      id: 'jobvite',
      name: 'Jobvite',
      logo: '📋',
      description: 'Comprehensive talent acquisition suite',
      connected: false,
      features: ['Social recruiting', 'Referral management', 'Mobile recruiting']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 flex items-center gap-3">
            <div className="size-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
              <Plug className="size-6 text-white" />
            </div>
            Integrations
          </h1>
          <p className="text-gray-600 mt-1">
            Connect your ATS and upload candidate data
          </p>
        </div>
      </div>

      <Tabs defaultValue="ats" className="w-full">
        <TabsList className="bg-gray-100">
          <TabsTrigger value="ats">
            <Plug className="size-4 mr-2" />
            ATS Connections
          </TabsTrigger>
          <TabsTrigger value="upload">
            <Upload className="size-4 mr-2" />
            Upload Data
          </TabsTrigger>
          <TabsTrigger value="api">
            <Key className="size-4 mr-2" />
            API Access
          </TabsTrigger>
        </TabsList>

        {/* ATS Connections */}
        <TabsContent value="ats" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {atsProviders.map((provider) => (
              <Card 
                key={provider.id}
                className={`p-6 hover:shadow-lg transition-all ${
                  provider.connected ? 'border-2 border-green-300 bg-green-50/30' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="text-4xl">{provider.logo}</div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-gray-900">{provider.name}</h3>
                        {provider.connected && (
                          <Badge className="bg-green-100 text-green-700">
                            <CheckCircle2 className="size-3 mr-1" />
                            Connected
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{provider.description}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <p className="text-sm text-gray-700">Features:</p>
                  <div className="flex flex-wrap gap-2">
                    {provider.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {provider.connected ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <RefreshCw className="size-4" />
                        Last synced: {provider.lastSync}
                      </div>
                      <Button variant="ghost" size="sm">
                        <RefreshCw className="size-4" />
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Settings className="size-4 mr-2" />
                        Configure
                      </Button>
                      <Button variant="outline" className="flex-1 text-red-600 hover:text-red-700">
                        Disconnect
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => setSelectedATS(provider.id)}
                  >
                    <LinkIcon className="size-4 mr-2" />
                    Connect {provider.name}
                  </Button>
                )}
              </Card>
            ))}
          </div>

          {/* Connection Instructions */}
          {selectedATS && (
            <Card className="mt-6 p-6 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-gray-900 mb-2">How to Connect</h3>
                  <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                    <li>Log into your {atsProviders.find(p => p.id === selectedATS)?.name} account</li>
                    <li>Navigate to Settings → Integrations → API Access</li>
                    <li>Generate a new API key for "AI Recruiter"</li>
                    <li>Copy the API key and paste it below</li>
                    <li>Click "Connect" to complete the integration</li>
                  </ol>
                </div>
              </div>
              <div className="space-y-3 mt-4">
                <div>
                  <Label htmlFor="api-key">API Key</Label>
                  <Input 
                    id="api-key" 
                    type="password" 
                    placeholder="Enter your API key"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="workspace">Workspace ID (Optional)</Label>
                  <Input 
                    id="workspace" 
                    placeholder="e.g., company-workspace-123"
                    className="mt-1"
                  />
                </div>
                <div className="flex gap-2">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <CheckCircle2 className="size-4 mr-2" />
                    Connect
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedATS(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </TabsContent>

        {/* Upload Data */}
        <TabsContent value="upload" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* CSV Upload */}
            <Card className="p-6">
              <div className="text-center">
                <div className="size-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FileUp className="size-8 text-blue-600" />
                </div>
                <h3 className="text-gray-900 mb-2">Upload CSV File</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Import candidates from a CSV file with candidate information
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Upload className="size-4 mr-2" />
                  Choose File
                </Button>
                <div className="mt-4 pt-4 border-t">
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1">
                    Download CSV Template
                    <ExternalLink className="size-3" />
                  </a>
                </div>
              </div>
            </Card>

            {/* Bulk Import */}
            <Card className="p-6">
              <div className="text-center">
                <div className="size-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Database className="size-8 text-purple-600" />
                </div>
                <h3 className="text-gray-900 mb-2">Bulk Import</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Import multiple candidate resumes at once (PDF, DOCX)
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Upload className="size-4 mr-2" />
                  Upload Resumes
                </Button>
                <p className="text-xs text-gray-500 mt-3">
                  AI will automatically parse resume information
                </p>
              </div>
            </Card>

            {/* LinkedIn Import */}
            <Card className="p-6">
              <div className="text-center">
                <div className="size-16 bg-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Cloud className="size-8 text-cyan-600" />
                </div>
                <h3 className="text-gray-900 mb-2">LinkedIn Import</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Import candidate profiles directly from LinkedIn
                </p>
                <Button variant="outline">
                  <LinkIcon className="size-4 mr-2" />
                  Connect LinkedIn
                </Button>
                <p className="text-xs text-gray-500 mt-3">
                  Requires LinkedIn Recruiter access
                </p>
              </div>
            </Card>

            {/* Job Board Import */}
            <Card className="p-6">
              <div className="text-center">
                <div className="size-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Plug className="size-8 text-green-600" />
                </div>
                <h3 className="text-gray-900 mb-2">Job Board Import</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Import applications from Indeed, Monster, and more
                </p>
                <Button variant="outline">
                  <LinkIcon className="size-4 mr-2" />
                  Configure
                </Button>
              </div>
            </Card>
          </div>

          {/* Upload History */}
          <Card className="mt-6 p-6">
            <h3 className="text-gray-900 mb-4">Recent Imports</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="size-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">candidates_batch_nov.csv</p>
                    <p className="text-xs text-gray-600">45 candidates imported • Nov 10, 2025</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700">Success</Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <RefreshCw className="size-5 text-blue-600 animate-spin" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">resume_bulk_upload.zip</p>
                    <p className="text-xs text-gray-600">Processing 12 of 30 resumes...</p>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-700">Processing</Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="size-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">linkedin_export_oct.csv</p>
                    <p className="text-xs text-gray-600">23 candidates imported • Nov 8, 2025</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700">Success</Badge>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* API Access */}
        <TabsContent value="api" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <h3 className="text-gray-900 mb-4">API Keys</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Use API keys to integrate AI Recruiter with your custom applications and workflows.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 mb-1">Production API Key</p>
                      <code className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        sk_prod_********************************
                      </code>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        Copy
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        Revoke
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 mb-1">Development API Key</p>
                      <code className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        sk_dev_*********************************
                      </code>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        Copy
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        Revoke
                      </Button>
                    </div>
                  </div>
                </div>

                <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                  <Key className="size-4 mr-2" />
                  Generate New Key
                </Button>
              </Card>

              <Card className="p-6">
                <h3 className="text-gray-900 mb-4">API Documentation</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Access our comprehensive API documentation to get started with integrations.
                </p>
                <div className="space-y-2">
                  <a 
                    href="#" 
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-sm text-gray-900">Getting Started Guide</span>
                    <ExternalLink className="size-4 text-gray-400" />
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-sm text-gray-900">API Reference</span>
                    <ExternalLink className="size-4 text-gray-400" />
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-sm text-gray-900">Code Examples</span>
                    <ExternalLink className="size-4 text-gray-400" />
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-sm text-gray-900">Webhooks Documentation</span>
                    <ExternalLink className="size-4 text-gray-400" />
                  </a>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-gray-900 mb-4">API Usage</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600">Requests this month</p>
                      <p className="text-sm text-gray-900">12,450</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '62%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">62% of 20,000 limit</p>
                  </div>

                  <div className="pt-4 border-t space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Last request</span>
                      <span className="text-gray-900">2 minutes ago</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Success rate</span>
                      <span className="text-green-600">99.8%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Avg. response time</span>
                      <span className="text-gray-900">143ms</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                <h3 className="text-gray-900 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Our team is here to help you with your integration.
                </p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
