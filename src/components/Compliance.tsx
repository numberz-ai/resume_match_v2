import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Progress } from './ui/progress';
import { 
  Shield, FileText, Trash2, Download, Clock, CheckCircle, 
  AlertCircle, XCircle, User, Mail, Calendar, Database,
  Lock, Eye, Settings, Bell, Archive, Search, Filter, Loader2
} from 'lucide-react';
import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface DataRequest {
  id: string;
  candidateName: string;
  candidateEmail: string;
  requestType: 'access' | 'deletion' | 'export' | 'rectification';
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  requestDate: string;
  completionDate?: string;
  notes: string;
}

interface ConsentRecord {
  id: string;
  candidateName: string;
  candidateEmail: string;
  consentType: string;
  status: 'active' | 'withdrawn' | 'expired';
  grantedDate: string;
  expiryDate?: string;
  purpose: string;
}

interface RetentionPolicy {
  id: string;
  category: string;
  retentionPeriod: number; // days
  autoDelete: boolean;
  legalBasis: string;
  recordCount: number;
}

const mockDataRequests: DataRequest[] = [
  {
    id: '1',
    candidateName: 'John Smith',
    candidateEmail: 'john.smith@email.com',
    requestType: 'deletion',
    status: 'pending',
    requestDate: '2024-01-15',
    notes: 'Candidate requested complete data deletion under GDPR Article 17'
  },
  {
    id: '2',
    candidateName: 'Sarah Johnson',
    candidateEmail: 'sarah.j@email.com',
    requestType: 'export',
    status: 'completed',
    requestDate: '2024-01-10',
    completionDate: '2024-01-12',
    notes: 'Data export provided in JSON format'
  },
  {
    id: '3',
    candidateName: 'Michael Chen',
    candidateEmail: 'mchen@email.com',
    requestType: 'access',
    status: 'in-progress',
    requestDate: '2024-01-18',
    notes: 'Preparing comprehensive data access report'
  },
];

const mockConsentRecords: ConsentRecord[] = [
  {
    id: '1',
    candidateName: 'Emma Wilson',
    candidateEmail: 'emma.w@email.com',
    consentType: 'Marketing Communications',
    status: 'active',
    grantedDate: '2023-11-01',
    expiryDate: '2025-11-01',
    purpose: 'Send job opportunities and recruitment updates'
  },
  {
    id: '2',
    candidateName: 'David Brown',
    candidateEmail: 'dbrown@email.com',
    consentType: 'Data Processing',
    status: 'active',
    grantedDate: '2023-12-15',
    purpose: 'Process application data for recruitment purposes'
  },
  {
    id: '3',
    candidateName: 'Lisa Martinez',
    candidateEmail: 'lisa.m@email.com',
    consentType: 'Talent Pool',
    status: 'withdrawn',
    grantedDate: '2023-10-01',
    purpose: 'Store profile in talent pool for future opportunities'
  },
];

const mockRetentionPolicies: RetentionPolicy[] = [
  {
    id: '1',
    category: 'Rejected Candidates',
    retentionPeriod: 180,
    autoDelete: true,
    legalBasis: 'Legitimate Interest',
    recordCount: 245
  },
  {
    id: '2',
    category: 'Hired Candidates',
    retentionPeriod: 2555,
    autoDelete: false,
    legalBasis: 'Contract',
    recordCount: 89
  },
  {
    id: '3',
    category: 'Interview Records',
    retentionPeriod: 365,
    autoDelete: true,
    legalBasis: 'Legitimate Interest',
    recordCount: 567
  },
  {
    id: '4',
    category: 'Assessment Results',
    retentionPeriod: 730,
    autoDelete: true,
    legalBasis: 'Consent',
    recordCount: 423
  },
  {
    id: '5',
    category: 'Talent Pool',
    retentionPeriod: 1095,
    autoDelete: false,
    legalBasis: 'Consent',
    recordCount: 1247
  },
];

export function Compliance() {
  const [retentionPolicies, setRetentionPolicies] = useState(mockRetentionPolicies);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRunningAudit, setIsRunningAudit] = useState(false);
  const [auditProgress, setAuditProgress] = useState(0);
  const [auditStep, setAuditStep] = useState('');

  const runAudit = () => {
    setIsRunningAudit(true);
    setAuditProgress(0);
    
    const steps = [
      'Initializing compliance audit...',
      'Scanning data retention policies...',
      'Verifying consent records...',
      'Checking GDPR request deadlines...',
      'Analyzing data lifecycle...',
      'Validating encryption settings...',
      'Reviewing access logs...',
      'Generating compliance report...',
      'Finalizing audit results...',
      'Audit complete!'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = (currentStep / steps.length) * 100;
      setAuditProgress(progress);
      setAuditStep(steps[currentStep - 1] || steps[steps.length - 1]);

      if (currentStep >= steps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsRunningAudit(false);
          setAuditProgress(0);
          setAuditStep('');
        }, 1000);
      }
    }, 1000);

    // Cleanup function
    return () => clearInterval(interval);
  };

  const getRequestTypeColor = (type: string) => {
    switch (type) {
      case 'deletion': return 'bg-red-100 text-red-700';
      case 'export': return 'bg-blue-100 text-blue-700';
      case 'access': return 'bg-purple-100 text-purple-700';
      case 'rectification': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="size-4 text-emerald-600" />;
      case 'in-progress': return <Clock className="size-4 text-blue-600" />;
      case 'pending': return <AlertCircle className="size-4 text-amber-600" />;
      case 'rejected': return <XCircle className="size-4 text-red-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-500';
      case 'in-progress': return 'bg-blue-500';
      case 'pending': return 'bg-amber-500';
      case 'rejected': return 'bg-red-500';
      case 'active': return 'bg-emerald-500';
      case 'withdrawn': return 'bg-gray-500';
      case 'expired': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const pendingRequests = mockDataRequests.filter(r => r.status === 'pending').length;
  const completedRequests = mockDataRequests.filter(r => r.status === 'completed').length;
  const activeConsents = mockConsentRecords.filter(c => c.status === 'active').length;
  const totalRecordsManaged = retentionPolicies.reduce((sum, p) => sum + p.recordCount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">GDPR Compliance & Data Retention</h1>
          <p className="text-sm text-gray-600 mt-1">Manage data privacy, consent, and retention policies</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="size-4 mr-2" />
            Export Compliance Report
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={runAudit}>
            <Shield className="size-4 mr-2" />
            Run Audit
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="size-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <AlertCircle className="size-6 text-amber-600" />
            </div>
            {pendingRequests > 0 && (
              <Badge className="bg-amber-500">Action Needed</Badge>
            )}
          </div>
          <p className="text-sm text-gray-600">Pending Requests</p>
          <h3 className="text-2xl text-gray-900 mt-1">{pendingRequests}</h3>
          <p className="text-xs text-gray-500 mt-2">GDPR data requests awaiting action</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="size-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="size-6 text-emerald-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600">Active Consents</p>
          <h3 className="text-2xl text-gray-900 mt-1">{activeConsents}</h3>
          <p className="text-xs text-gray-500 mt-2">Valid candidate consents on file</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="size-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Database className="size-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600">Records Managed</p>
          <h3 className="text-2xl text-gray-900 mt-1">{totalRecordsManaged.toLocaleString()}</h3>
          <p className="text-xs text-gray-500 mt-2">Total candidate records under retention</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="size-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Shield className="size-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600">Compliance Score</p>
          <h3 className="text-2xl text-gray-900 mt-1">98%</h3>
          <p className="text-xs text-gray-500 mt-2">GDPR compliance rating</p>
        </Card>
      </div>

      <Tabs defaultValue="data-requests" className="w-full">
        <TabsList>
          <TabsTrigger value="data-requests">Data Requests</TabsTrigger>
          <TabsTrigger value="consent">Consent Management</TabsTrigger>
          <TabsTrigger value="retention">Data Retention</TabsTrigger>
          <TabsTrigger value="settings">Privacy Settings</TabsTrigger>
        </TabsList>

        {/* Data Requests */}
        <TabsContent value="data-requests" className="space-y-4">
          <Card className="p-6 bg-blue-50 border-2 border-blue-200">
            <div className="flex items-start gap-4">
              <div className="size-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="size-6 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900 mb-2">GDPR Data Subject Requests</h3>
                <p className="text-sm text-gray-600">
                  Manage candidate requests for data access, deletion, rectification, and portability under GDPR Articles 15-20
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Active Requests</h3>
              <Button>
                <FileText className="size-4 mr-2" />
                New Request
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Request Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDataRequests.map((request) => {
                  const requestDate = new Date(request.requestDate);
                  // Ensure request date is not in the future (it's a past request)
                  const now = new Date();
                  const safeRequestDate = requestDate > now ? new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000) : requestDate;
                  
                  const deadline = new Date(safeRequestDate);
                  deadline.setDate(deadline.getDate() + 30); // GDPR 30-day deadline
                  
                  // Ensure deadline is in the future
                  const safeDeadline = deadline < now ? new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000) : deadline;

                  return (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div>
                          <p className="text-sm text-gray-900">{request.candidateName}</p>
                          <p className="text-xs text-gray-500">{request.candidateEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRequestTypeColor(request.requestType)}>
                          {request.requestType.charAt(0).toUpperCase() + request.requestType.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(request.status)}
                          <Badge className={getStatusColor(request.status)}>
                            {request.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="size-4" />
                          {safeRequestDate.toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="size-4 text-amber-600" />
                          <span className="text-amber-700">{safeDeadline.toLocaleDateString()}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {request.requestType === 'export' && (
                            <Button size="sm" variant="outline">
                              <Download className="size-3 mr-1" />
                              Export Data
                            </Button>
                          )}
                          {request.requestType === 'deletion' && (
                            <Button size="sm" variant="outline" className="text-red-600 border-red-300">
                              <Trash2 className="size-3 mr-1" />
                              Delete Data
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 bg-amber-50 border border-amber-200">
            <h3 className="text-gray-900 mb-4">GDPR Request Types</h3>
            <div className="grid grid-cols-4 gap-4">
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="size-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <Eye className="size-5 text-purple-600" />
                </div>
                <p className="text-sm text-gray-900 mb-1">Right to Access</p>
                <p className="text-xs text-gray-600">Article 15</p>
              </Card>
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="size-10 bg-red-100 rounded-lg flex items-center justify-center mb-3">
                  <Trash2 className="size-5 text-red-600" />
                </div>
                <p className="text-sm text-gray-900 mb-1">Right to Erasure</p>
                <p className="text-xs text-gray-600">Article 17</p>
              </Card>
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="size-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <Download className="size-5 text-blue-600" />
                </div>
                <p className="text-sm text-gray-900 mb-1">Data Portability</p>
                <p className="text-xs text-gray-600">Article 20</p>
              </Card>
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="size-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
                  <Settings className="size-5 text-amber-600" />
                </div>
                <p className="text-sm text-gray-900 mb-1">Right to Rectify</p>
                <p className="text-xs text-gray-600">Article 16</p>
              </Card>
            </div>
          </Card>
        </TabsContent>

        {/* Consent Management */}
        <TabsContent value="consent" className="space-y-4">
          <Card className="p-6 bg-emerald-50 border-2 border-emerald-200">
            <div className="flex items-start gap-4">
              <div className="size-12 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckCircle className="size-6 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900 mb-2">Consent Management</h3>
                <p className="text-sm text-gray-600">
                  Track and manage candidate consent for data processing, marketing, and talent pool storage
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Consent Records</h3>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <Input
                    placeholder="Search consents..."
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="size-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Consent Type</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Granted Date</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockConsentRecords.map((consent) => (
                  <TableRow key={consent.id}>
                    <TableCell>
                      <div>
                        <p className="text-sm text-gray-900">{consent.candidateName}</p>
                        <p className="text-xs text-gray-500">{consent.candidateEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{consent.consentType}</Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-600 max-w-xs">{consent.purpose}</p>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(consent.status)}>
                        {consent.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="size-4" />
                        {new Date(consent.grantedDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      {consent.expiryDate ? (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="size-4" />
                          {new Date(consent.expiryDate).toLocaleDateString()}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">No expiry</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {consent.status === 'active' && (
                          <Button size="sm" variant="outline">
                            Withdraw
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Consent Statistics */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Active Consents</p>
                <CheckCircle className="size-5 text-emerald-600" />
              </div>
              <h3 className="text-2xl text-gray-900">{activeConsents}</h3>
              <p className="text-xs text-gray-500 mt-1">Currently valid</p>
            </Card>
            <Card className="p-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Withdrawn</p>
                <XCircle className="size-5 text-gray-600" />
              </div>
              <h3 className="text-2xl text-gray-900">
                {mockConsentRecords.filter(c => c.status === 'withdrawn').length}
              </h3>
              <p className="text-xs text-gray-500 mt-1">Consent withdrawn</p>
            </Card>
            <Card className="p-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Expiring Soon</p>
                <AlertCircle className="size-5 text-amber-600" />
              </div>
              <h3 className="text-2xl text-gray-900">3</h3>
              <p className="text-xs text-gray-500 mt-1">Within 30 days</p>
            </Card>
          </div>
        </TabsContent>

        {/* Data Retention */}
        <TabsContent value="retention" className="space-y-4">
          <Card className="p-6 bg-purple-50 border-2 border-purple-200">
            <div className="flex items-start gap-4">
              <div className="size-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Database className="size-6 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900 mb-2">Data Retention Policies</h3>
                <p className="text-sm text-gray-600">
                  Configure automated data retention and deletion policies to comply with GDPR Article 5
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Retention Policies</h3>
              <Button>
                <Database className="size-4 mr-2" />
                Add Policy
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Retention Period</TableHead>
                  <TableHead>Auto-Delete</TableHead>
                  <TableHead>Legal Basis</TableHead>
                  <TableHead>Records</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {retentionPolicies.map((policy) => (
                  <TableRow key={policy.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="size-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Archive className="size-5 text-purple-600" />
                        </div>
                        <span className="text-sm text-gray-900">{policy.category}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="size-4 text-gray-600" />
                        <span className="text-sm text-gray-900">
                          {policy.retentionPeriod} days
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Switch checked={policy.autoDelete} />
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{policy.legalBasis}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-blue-100 text-blue-700">
                        {policy.recordCount.toLocaleString()} records
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-300">
                          <Trash2 className="size-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Retention Overview */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">Upcoming Deletions</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div>
                    <p className="text-sm text-gray-900">Rejected Candidates (180 days)</p>
                    <p className="text-xs text-gray-600 mt-1">45 records scheduled for deletion</p>
                  </div>
                  <Badge className="bg-red-500">Tomorrow</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div>
                    <p className="text-sm text-gray-900">Interview Records (365 days)</p>
                    <p className="text-xs text-gray-600 mt-1">23 records scheduled for deletion</p>
                  </div>
                  <Badge className="bg-amber-500">In 7 days</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div>
                    <p className="text-sm text-gray-900">Assessment Results (730 days)</p>
                    <p className="text-xs text-gray-600 mt-1">12 records scheduled for deletion</p>
                  </div>
                  <Badge className="bg-blue-500">In 14 days</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">Data Lifecycle</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Active Records</span>
                    <span className="text-gray-900">1,247 (48%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: '48%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Expiring Soon (30 days)</span>
                    <span className="text-gray-900">423 (16%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500" style={{ width: '16%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Archived</span>
                    <span className="text-gray-900">901 (36%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: '36%' }} />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="settings" className="space-y-4">
          <Card className="p-6 bg-blue-50 border-2 border-blue-200">
            <div className="flex items-start gap-4">
              <div className="size-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Lock className="size-6 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900 mb-2">Privacy & Security Settings</h3>
                <p className="text-sm text-gray-600">
                  Configure global privacy settings and data protection measures
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">GDPR Compliance Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-900">Enable Automatic Data Deletion</p>
                  <p className="text-xs text-gray-600 mt-1">Automatically delete records based on retention policies</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-900">Require Consent for Talent Pool</p>
                  <p className="text-xs text-gray-600 mt-1">Candidates must opt-in to be added to talent pool</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-900">Email Notifications for Data Requests</p>
                  <p className="text-xs text-gray-600 mt-1">Notify admins when new GDPR requests are received</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-900">Data Encryption at Rest</p>
                  <p className="text-xs text-gray-600 mt-1">Encrypt all candidate data stored in database</p>
                </div>
                <Switch defaultChecked disabled />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-900">Audit Logging</p>
                  <p className="text-xs text-gray-600 mt-1">Log all access and modifications to candidate data</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Default Retention Periods</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-700 mb-2 block">New Applicants</Label>
                <Select defaultValue="90">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm text-gray-700 mb-2 block">Rejected Candidates</Label>
                <Select defaultValue="180">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                    <SelectItem value="730">2 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm text-gray-700 mb-2 block">Interview Feedback</Label>
                <Select defaultValue="365">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="180">180 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                    <SelectItem value="730">2 years</SelectItem>
                    <SelectItem value="1095">3 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm text-gray-700 mb-2 block">Talent Pool</Label>
                <Select defaultValue="1095">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="365">1 year</SelectItem>
                    <SelectItem value="730">2 years</SelectItem>
                    <SelectItem value="1095">3 years</SelectItem>
                    <SelectItem value="1825">5 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <CheckCircle className="size-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Audit Dialog */}
      <Dialog open={isRunningAudit}>
        <DialogContent className="p-10">
          <DialogHeader>
            <DialogTitle>Compliance Audit</DialogTitle>
            <DialogDescription>
              Running a comprehensive compliance audit to ensure GDPR compliance.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">{auditStep}</p>
            <Progress value={auditProgress} className="h-2" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}