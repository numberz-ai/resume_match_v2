import { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Settings as SettingsIcon, Zap, Database, Link, DollarSign, Check, AlertCircle, User, LogOut, Shield, Bell, Camera, Mail, Phone, MapPin, Trash2, Building2, Tag, Globe, Users as UsersIcon, Briefcase, Target, Plug } from 'lucide-react';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';
import { TeamView } from './TeamView';
import { IntegrationsView } from './IntegrationsView';
import { Compliance } from './Compliance';

export function Settings() {
  const [settings, setSettings] = useState({
    // AI Settings
    aiModel: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2000,
    enableSemanticSearch: true,
    enableAutoInsights: true,
    enableBiasDetection: true,
    
    // ATS Integration
    atsProvider: 'greenhouse',
    atsApiKey: '',
    atsEnabled: false,
    syncInterval: '15',
    
    // Token Usage
    monthlyTokenLimit: 1000000,
    currentTokenUsage: 245678,
    alertThreshold: 80,
    
    // Talent Pool
    autoAddToPool: true,
    poolRetentionDays: 365,
  });

  // Business Setup Settings
  const [businessData, setBusinessData] = useState({
    companyName: 'Tech Innovations Inc.',
    legalName: 'Tech Innovations Incorporated',
    website: 'https://techinnovations.com',
    industry: 'technology',
    companySize: '100-500',
    foundedYear: '2018',
    headquarters: 'San Francisco, CA',
    description: 'Leading AI and machine learning solutions provider focused on revolutionizing recruitment technology.',
    tags: ['AI/ML', 'SaaS', 'B2B', 'Enterprise'],
    logoUrl: '',
    focusAreas: ['Artificial Intelligence', 'Machine Learning', 'Data Science', 'Cloud Computing'],
    departments: ['Engineering', 'Product', 'Sales', 'Marketing', 'HR', 'Operations'],
    timezone: 'America/Los_Angeles',
    currency: 'USD',
    language: 'en',
  });

  const [newTag, setNewTag] = useState('');
  const [newFocusArea, setNewFocusArea] = useState('');
  const [newDepartment, setNewDepartment] = useState('');

  // Account Settings
  const [accountData, setAccountData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    jobTitle: 'Senior Recruiter',
    department: 'Human Resources',
    bio: 'Experienced technical recruiter specializing in AI and ML talent acquisition.',
    company: 'Tech Innovations Inc.',
    timezone: 'America/Los_Angeles',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newCandidateAlerts: true,
    interviewReminders: true,
    statusChangeNotifications: true,
    weeklyDigest: true,
    slackIntegration: false,
  });

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  const handleAccountUpdate = () => {
    alert('Account information updated successfully!');
  };

  const handleBusinessUpdate = () => {
    alert('Business information updated successfully!');
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      alert('Logged out successfully!');
      window.location.href = '/login';
    }
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deletion process initiated. You will receive a confirmation email.');
    }
  };

  const tokenUsagePercentage = (settings.currentTokenUsage / settings.monthlyTokenLimit) * 100;
  const tokensRemaining = settings.monthlyTokenLimit - settings.currentTokenUsage;

  const addTag = () => {
    if (newTag && !businessData.tags.includes(newTag)) {
      setBusinessData({ ...businessData, tags: [...businessData.tags, newTag] });
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setBusinessData({ ...businessData, tags: businessData.tags.filter(t => t !== tag) });
  };

  const addFocusArea = () => {
    if (newFocusArea && !businessData.focusAreas.includes(newFocusArea)) {
      setBusinessData({ ...businessData, focusAreas: [...businessData.focusAreas, newFocusArea] });
      setNewFocusArea('');
    }
  };

  const removeFocusArea = (area: string) => {
    setBusinessData({ ...businessData, focusAreas: businessData.focusAreas.filter(a => a !== area) });
  };

  const addDepartment = () => {
    if (newDepartment && !businessData.departments.includes(newDepartment)) {
      setBusinessData({ ...businessData, departments: [...businessData.departments, newDepartment] });
      setNewDepartment('');
    }
  };

  const removeDepartment = (dept: string) => {
    setBusinessData({ ...businessData, departments: businessData.departments.filter(d => d !== dept) });
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-gray-900 mb-1">Settings</h1>
        <p className="text-sm text-gray-600">Configure your AI recruitment platform</p>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="business">
            <Building2 className="size-4 mr-2" />
            Business
          </TabsTrigger>
          <TabsTrigger value="account">
            <User className="size-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="team">
            <UsersIcon className="size-4 mr-2" />
            Team
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Plug className="size-4 mr-2" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="compliance">
            <Shield className="size-4 mr-2" />
            GDPR
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="size-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Business Setup Tab */}
        <TabsContent value="business" className="space-y-6 mt-6">
          <Card className="p-6 bg-gray-50 border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="size-12 bg-[#118B80] rounded flex items-center justify-center flex-shrink-0">
                <Building2 className="size-6 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900 mb-2">Business Setup</h3>
                <p className="text-sm text-gray-600">Configure your company information and organizational settings</p>
              </div>
            </div>
          </Card>

          {/* Company Information */}
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Company Information</h3>
            
            <div className="flex items-start gap-6 mb-6">
              <div className="flex flex-col items-center gap-3">
                <div className="size-24 border border-gray-300 rounded bg-gray-100 flex items-center justify-center">
                  <Building2 className="size-12 text-gray-400" />
                </div>
                <Button size="sm" variant="outline">
                  <Camera className="size-4 mr-2" />
                  Upload Logo
                </Button>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-700 mb-2 block">Company Name</Label>
                  <Input
                    value={businessData.companyName}
                    onChange={(e) => setBusinessData({ ...businessData, companyName: e.target.value })}
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <Label className="text-sm text-gray-700 mb-2 block">Legal Name</Label>
                  <Input
                    value={businessData.legalName}
                    onChange={(e) => setBusinessData({ ...businessData, legalName: e.target.value })}
                    placeholder="Legal entity name"
                  />
                </div>
                <div>
                  <Label className="text-sm text-gray-700 mb-2 flex items-center gap-2">
                    <Globe className="size-4 text-gray-500" />
                    Website
                  </Label>
                  <Input
                    value={businessData.website}
                    onChange={(e) => setBusinessData({ ...businessData, website: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <Label className="text-sm text-gray-700 mb-2 block">Industry</Label>
                  <Select
                    value={businessData.industry}
                    onValueChange={(value) => setBusinessData({ ...businessData, industry: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <Label className="text-sm text-gray-700 mb-2 block">Company Size</Label>
                <Select
                  value={businessData.companySize}
                  onValueChange={(value) => setBusinessData({ ...businessData, companySize: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-100">51-100 employees</SelectItem>
                    <SelectItem value="100-500">100-500 employees</SelectItem>
                    <SelectItem value="500-1000">500-1,000 employees</SelectItem>
                    <SelectItem value="1000+">1,000+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm text-gray-700 mb-2 block">Founded Year</Label>
                <Input
                  value={businessData.foundedYear}
                  onChange={(e) => setBusinessData({ ...businessData, foundedYear: e.target.value })}
                  placeholder="2020"
                />
              </div>
              <div>
                <Label className="text-sm text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="size-4 text-gray-500" />
                  Headquarters
                </Label>
                <Input
                  value={businessData.headquarters}
                  onChange={(e) => setBusinessData({ ...businessData, headquarters: e.target.value })}
                  placeholder="City, State/Country"
                />
              </div>
            </div>

            <div className="mb-6">
              <Label className="text-sm text-gray-700 mb-2 block">Company Description</Label>
              <Textarea
                value={businessData.description}
                onChange={(e) => setBusinessData({ ...businessData, description: e.target.value })}
                placeholder="Describe your company..."
                rows={4}
              />
            </div>
          </Card>

          {/* Tags & Focus Areas */}
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Tags & Focus Areas</h3>
            <p className="text-sm text-gray-600 mb-4">
              Define what your company works on and specializes in
            </p>
            
            <div className="space-y-6">
              {/* Company Tags */}
              <div>
                <Label className="text-sm text-gray-700 mb-2 block">Company Tags</Label>
                <div className="flex gap-3 mb-3">
                  <Input
                    placeholder="Add a tag (e.g., SaaS, B2B, Enterprise)"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button onClick={addTag} variant="outline">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {businessData.tags.map((tag) => (
                    <Badge key={tag} className="bg-blue-100 text-blue-700 px-3 py-1.5 text-sm">
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-2 hover:text-blue-900"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Focus Areas */}
              <div>
                <Label className="text-sm text-gray-700 mb-2 block">Focus Areas</Label>
                <div className="flex gap-3 mb-3">
                  <Input
                    placeholder="Add focus area (e.g., Artificial Intelligence)"
                    value={newFocusArea}
                    onChange={(e) => setNewFocusArea(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addFocusArea()}
                  />
                  <Button onClick={addFocusArea} variant="outline">
                    Add
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {businessData.focusAreas.map((area) => (
                    <div
                      key={area}
                      className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded"
                    >
                      <span className="text-sm text-gray-900">{area}</span>
                      <button
                        onClick={() => removeFocusArea(area)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Departments */}
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Departments</h3>
            <p className="text-sm text-gray-600 mb-4">
              Manage your company's departments and teams
            </p>
            
            <div className="flex gap-3 mb-6">
              <Input
                placeholder="Add department (e.g., Engineering, Sales)"
                value={newDepartment}
                onChange={(e) => setNewDepartment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addDepartment()}
              />
              <Button onClick={addDepartment} variant="outline">
                Add
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {businessData.departments.map((dept) => (
                <div
                  key={dept}
                  className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-gray-100 rounded flex items-center justify-center">
                      <Briefcase className="size-5 text-gray-600" />
                    </div>
                    <span className="text-sm text-gray-900">{dept}</span>
                  </div>
                  <button
                    onClick={() => removeDepartment(dept)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Business Preferences */}
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Regional Preferences</h3>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-sm text-gray-700 mb-2 block">Default Timezone</Label>
                <Select
                  value={businessData.timezone}
                  onValueChange={(value) => setBusinessData({ ...businessData, timezone: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                    <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                    <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                    <SelectItem value="Europe/London">London (GMT)</SelectItem>
                    <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                    <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm text-gray-700 mb-2 block">Currency</Label>
                <Select
                  value={businessData.currency}
                  onValueChange={(value) => setBusinessData({ ...businessData, currency: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm text-gray-700 mb-2 block">Language</Label>
                <Select
                  value={businessData.language}
                  onValueChange={(value) => setBusinessData({ ...businessData, language: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="ja">Japanese</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <div className="flex gap-3">
            <Button onClick={handleBusinessUpdate} className="bg-[#118B80] hover:bg-[#0e7068]">
              <Check className="size-4 mr-2" />
              Save Business Settings
            </Button>
          </div>
        </TabsContent>

        {/* Account Settings */}
        <TabsContent value="account" className="space-y-6 mt-6">
          <Card className="p-6 bg-gray-50 border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="size-12 bg-[#118B80] rounded flex items-center justify-center flex-shrink-0">
                <User className="size-6 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900 mb-2">Account Information</h3>
                <p className="text-sm text-gray-600">Manage your personal information and account settings</p>
              </div>
            </div>
          </Card>

          {/* Profile Section */}
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Profile</h3>
            
            <div className="flex items-start gap-6 mb-6">
              <div className="flex flex-col items-center gap-3">
                <Avatar className="size-24 border border-gray-300">
                  <AvatarFallback className="bg-[#118B80] text-white text-2xl">
                    {accountData.firstName[0]}{accountData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <Button size="sm" variant="outline">
                  <Camera className="size-4 mr-2" />
                  Change Photo
                </Button>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-700 mb-2 block">First Name</Label>
                  <Input
                    value={accountData.firstName}
                    onChange={(e) => setAccountData({ ...accountData, firstName: e.target.value })}
                    placeholder="First name"
                  />
                </div>
                <div>
                  <Label className="text-sm text-gray-700 mb-2 block">Last Name</Label>
                  <Input
                    value={accountData.lastName}
                    onChange={(e) => setAccountData({ ...accountData, lastName: e.target.value })}
                    placeholder="Last name"
                  />
                </div>
                <div>
                  <Label className="text-sm text-gray-700 mb-2 block">Job Title</Label>
                  <Input
                    value={accountData.jobTitle}
                    onChange={(e) => setAccountData({ ...accountData, jobTitle: e.target.value })}
                    placeholder="Job title"
                  />
                </div>
                <div>
                  <Label className="text-sm text-gray-700 mb-2 block">Department</Label>
                  <Input
                    value={accountData.department}
                    onChange={(e) => setAccountData({ ...accountData, department: e.target.value })}
                    placeholder="Department"
                  />
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <Label className="text-sm text-gray-700 mb-2 flex items-center gap-2">
                  <Mail className="size-4 text-gray-500" />
                  Email Address
                </Label>
                <Input
                  type="email"
                  value={accountData.email}
                  onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <Label className="text-sm text-gray-700 mb-2 flex items-center gap-2">
                  <Phone className="size-4 text-gray-500" />
                  Phone Number
                </Label>
                <Input
                  type="tel"
                  value={accountData.phone}
                  onChange={(e) => setAccountData({ ...accountData, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label className="text-sm text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="size-4 text-gray-500" />
                  Location
                </Label>
                <Input
                  value={accountData.location}
                  onChange={(e) => setAccountData({ ...accountData, location: e.target.value })}
                  placeholder="City, State"
                />
              </div>
              <div>
                <Label className="text-sm text-gray-700 mb-2 block">Timezone</Label>
                <Select
                  value={accountData.timezone}
                  onValueChange={(value) => setAccountData({ ...accountData, timezone: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                    <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                    <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                    <SelectItem value="Europe/London">London (GMT)</SelectItem>
                    <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                    <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mb-6">
              <Label className="text-sm text-gray-700 mb-2 block">Bio</Label>
              <Textarea
                value={accountData.bio}
                onChange={(e) => setAccountData({ ...accountData, bio: e.target.value })}
                placeholder="Tell us about yourself..."
                rows={4}
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={handleAccountUpdate} className="bg-[#118B80] hover:bg-[#0e7068]">
                <Check className="size-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline">
                Cancel
              </Button>
            </div>
          </Card>

          {/* Security Section */}
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Security</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <Label className="text-sm text-gray-700 mb-2 block">Current Password</Label>
                <Input type="password" placeholder="Enter current password" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-700 mb-2 block">New Password</Label>
                  <Input type="password" placeholder="Enter new password" />
                </div>
                <div>
                  <Label className="text-sm text-gray-700 mb-2 block">Confirm Password</Label>
                  <Input type="password" placeholder="Confirm new password" />
                </div>
              </div>
            </div>

            <Button variant="outline">
              <Shield className="size-4 mr-2" />
              Update Password
            </Button>
          </Card>

          {/* Session Management */}
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Session Management</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-900">Current Session</p>
                  <p className="text-xs text-gray-500 mt-1">Chrome on MacOS • San Francisco, CA</p>
                  <p className="text-xs text-gray-500">Last activity: 2 minutes ago</p>
                </div>
                <Badge className="bg-emerald-500">Active</Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-900">Previous Session</p>
                  <p className="text-xs text-gray-500 mt-1">Safari on iPhone • San Francisco, CA</p>
                  <p className="text-xs text-gray-500">Last activity: 2 hours ago</p>
                </div>
                <Button size="sm" variant="outline">End Session</Button>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900">Logout from all devices</p>
                <p className="text-xs text-gray-500 mt-1">End all active sessions except this one</p>
              </div>
              <Button variant="outline">
                Logout All
              </Button>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="p-6 border-2 border-red-200 bg-red-50">
            <h3 className="text-gray-900 mb-4">Danger Zone</h3>
            
            <div className="space-y-4">
              <div className="flex items-start justify-between p-4 bg-white rounded-lg border border-red-200">
                <div className="flex-1">
                  <p className="text-sm text-gray-900 mb-1">Logout</p>
                  <p className="text-xs text-gray-600">End your current session and return to login</p>
                </div>
                <Button 
                  variant="outline" 
                  className="border-red-300 text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="size-4 mr-2" />
                  Logout
                </Button>
              </div>

              <div className="flex items-start justify-between p-4 bg-white rounded-lg border border-red-200">
                <div className="flex-1">
                  <p className="text-sm text-gray-900 mb-1">Delete Account</p>
                  <p className="text-xs text-gray-600">Permanently delete your account and all associated data. This action cannot be undone.</p>
                </div>
                <Button 
                  variant="destructive"
                  onClick={handleDeleteAccount}
                >
                  <Trash2 className="size-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Team Settings */}
        <TabsContent value="team" className="space-y-6 mt-6">
          <Card className="p-6 bg-gray-50 border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="size-12 bg-[#118B80] rounded flex items-center justify-center flex-shrink-0">
                <UsersIcon className="size-6 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900 mb-2">Team Management</h3>
                <p className="text-sm text-gray-600">Manage your team members and roles</p>
              </div>
            </div>
          </Card>

          <TeamView />
        </TabsContent>

        {/* Integrations Settings */}
        <TabsContent value="integrations" className="space-y-6 mt-6">
          <Card className="p-6 bg-gray-50 border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="size-12 bg-[#118B80] rounded flex items-center justify-center flex-shrink-0">
                <Plug className="size-6 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900 mb-2">Integration Management</h3>
                <p className="text-sm text-gray-600">Connect and manage third-party integrations</p>
              </div>
            </div>
          </Card>

          <IntegrationsView />
        </TabsContent>

        {/* GDPR & Compliance */}
        <TabsContent value="compliance" className="mt-6">
          <Compliance />
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card className="p-6 bg-gray-50 border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="size-12 bg-[#118B80] rounded flex items-center justify-center flex-shrink-0">
                <Bell className="size-6 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900 mb-2">Notification Preferences</h3>
                <p className="text-sm text-gray-600">Manage how and when you receive notifications</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Email Notifications</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-900">Enable Email Notifications</p>
                  <p className="text-xs text-gray-500 mt-1">Receive notifications via email</p>
                </div>
                <Switch
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) => 
                    setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-900">New Candidate Alerts</p>
                  <p className="text-xs text-gray-500 mt-1">Get notified when new candidates apply</p>
                </div>
                <Switch
                  checked={notificationSettings.newCandidateAlerts}
                  onCheckedChange={(checked) => 
                    setNotificationSettings({ ...notificationSettings, newCandidateAlerts: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-900">Interview Reminders</p>
                  <p className="text-xs text-gray-500 mt-1">Reminders for upcoming interviews</p>
                </div>
                <Switch
                  checked={notificationSettings.interviewReminders}
                  onCheckedChange={(checked) => 
                    setNotificationSettings({ ...notificationSettings, interviewReminders: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-900">Status Change Notifications</p>
                  <p className="text-xs text-gray-500 mt-1">When candidate status changes</p>
                </div>
                <Switch
                  checked={notificationSettings.statusChangeNotifications}
                  onCheckedChange={(checked) => 
                    setNotificationSettings({ ...notificationSettings, statusChangeNotifications: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-900">Weekly Digest</p>
                  <p className="text-xs text-gray-500 mt-1">Summary of weekly recruitment activity</p>
                </div>
                <Switch
                  checked={notificationSettings.weeklyDigest}
                  onCheckedChange={(checked) => 
                    setNotificationSettings({ ...notificationSettings, weeklyDigest: checked })
                  }
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Integration Notifications</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="size-6" viewBox="0 0 24 24" fill="none">
                      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#611f69"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">Slack Notifications</p>
                    <p className="text-xs text-gray-500 mt-1">Send notifications to Slack</p>
                  </div>
                </div>
                <Switch
                  checked={notificationSettings.slackIntegration}
                  onCheckedChange={(checked) => 
                    setNotificationSettings({ ...notificationSettings, slackIntegration: checked })
                  }
                />
              </div>
            </div>
          </Card>

          <div className="flex gap-3">
            <Button onClick={handleSave} className="bg-[#118B80] hover:bg-[#0e7068]">
              <Check className="size-4 mr-2" />
              Save Notification Settings
            </Button>
          </div>
        </TabsContent>

        {/* AI Settings */}
        <TabsContent value="ai" className="space-y-6 mt-6">
          <Card className="p-6 bg-gray-50 border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="size-12 bg-[#118B80] rounded flex items-center justify-center flex-shrink-0">
                <Zap className="size-6 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900 mb-2">AI Model Configuration</h3>
                <p className="text-sm text-gray-600">Configure AI model and generation parameters</p>
              </div>
            </div>
          </Card>

          {/* Token Usage & Efficiency */}
          <Card className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="size-12 bg-[#118B80] rounded flex items-center justify-center flex-shrink-0">
                <Database className="size-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-900">Token Usage & Efficiency</h3>
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300">
                    Optimized by numberz.ai
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Track your AI token consumption and see how much you're saving with our intelligent optimization
                </p>

                {/* Token Usage Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-gray-50 rounded border border-gray-200">
                    <p className="text-xs text-gray-600 mb-1">Tokens Used</p>
                    <p className="text-2xl text-gray-900 mb-1">
                      {settings.currentTokenUsage.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">of {settings.monthlyTokenLimit.toLocaleString()} monthly</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded border border-gray-200">
                    <p className="text-xs text-gray-600 mb-1">Tokens Saved</p>
                    <p className="text-2xl text-[#118B80] mb-1">847.5K</p>
                    <p className="text-xs text-gray-500">via numberz.ai optimization</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded border border-gray-200">
                    <p className="text-xs text-gray-600 mb-1">Cost Savings</p>
                    <p className="text-2xl text-[#118B80] mb-1">$2,542</p>
                    <p className="text-xs text-gray-500">this month</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Monthly Usage</span>
                    <span className="text-gray-900">{tokenUsagePercentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={tokenUsagePercentage} className="h-3" />
                  <p className="text-xs text-gray-500">
                    {tokensRemaining.toLocaleString()} tokens remaining
                  </p>
                </div>

                {/* numberz.ai Optimization Details */}
                <div className="p-4 bg-gray-50 rounded border border-gray-200">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="size-10 bg-[#118B80] rounded flex items-center justify-center flex-shrink-0">
                      <Zap className="size-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-gray-900 mb-1">Powered by numberz.ai Intelligence</h4>
                      <p className="text-xs text-gray-600">
                        Our AI optimization reduces token usage by 67% on average through intelligent caching, prompt optimization, and smart model selection
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Check className="size-4 text-green-600" />
                      <span>Intelligent prompt compression</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Check className="size-4 text-green-600" />
                      <span>Smart response caching</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Check className="size-4 text-green-600" />
                      <span>Adaptive model routing</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Check className="size-4 text-green-600" />
                      <span>Context optimization</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <Label className="text-sm text-gray-700 mb-2 block">AI Model</Label>
              <Select
                value={settings.aiModel}
                onValueChange={(value) => setSettings({ ...settings, aiModel: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">
                    <div className="flex items-center gap-2">
                      <span>GPT-4</span>
                      <Badge className="bg-blue-100 text-blue-700 text-xs">Recommended</Badge>
                    </div>
                  </SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="claude-3">Claude 3</SelectItem>
                </SelectContent>
              </Select>
            </Card>

            <Card className="p-6">
              <Label className="text-sm text-gray-700 mb-2 block">Max Tokens per Request</Label>
              <Input
                type="number"
                value={settings.maxTokens}
                onChange={(e) => setSettings({ ...settings, maxTokens: Number(e.target.value) })}
              />
              <p className="text-xs text-gray-500 mt-2">Maximum tokens for each AI generation</p>
            </Card>
          </div>

          <Card className="p-6">
            <Label className="text-sm text-gray-700 mb-3 block">
              Temperature (Creativity): {settings.temperature.toFixed(1)}
            </Label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.temperature}
              onChange={(e) => setSettings({ ...settings, temperature: Number(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-600">More Focused</span>
              <span className="text-xs text-gray-600">More Creative</span>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">AI Features</h3>
            <div className="space-y-4">
              {[
                {
                  label: 'Semantic Search',
                  description: 'Enable AI-powered natural language candidate search',
                  key: 'enableSemanticSearch'
                },
                {
                  label: 'Auto-Generate Insights',
                  description: 'Automatically analyze candidates and generate AI insights',
                  key: 'enableAutoInsights'
                },
                {
                  label: 'Bias Detection',
                  description: 'Monitor and alert on potential bias in recruitment',
                  key: 'enableBiasDetection'
                }
              ].map((feature) => (
                <div key={feature.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm text-gray-900">{feature.label}</p>
                      {settings[feature.key as keyof typeof settings] && (
                        <Badge className="bg-emerald-100 text-emerald-700 text-xs">Active</Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600">{feature.description}</p>
                  </div>
                  <Switch
                    checked={settings[feature.key as keyof typeof settings] as boolean}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, [feature.key]: checked })
                    }
                  />
                </div>
              ))}
            </div>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="bg-[#118B80] hover:bg-[#0e7068]">
              <Check className="size-4 mr-2" />
              Save AI Settings
            </Button>
          </div>
        </TabsContent>

        {/* ATS Integration */}
        <TabsContent value="ats" className="space-y-6 mt-6">
          <Card className="p-6 bg-gray-50 border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="size-12 bg-[#118B80] rounded flex items-center justify-center flex-shrink-0">
                <Link className="size-6 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900 mb-2">ATS Integration</h3>
                <p className="text-sm text-gray-600">Connect to your Applicant Tracking System</p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <Label className="text-sm text-gray-700 mb-2 block">ATS Provider</Label>
              <Select
                value={settings.atsProvider}
                onValueChange={(value) => setSettings({ ...settings, atsProvider: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="greenhouse">Greenhouse</SelectItem>
                  <SelectItem value="lever">Lever</SelectItem>
                  <SelectItem value="workday">Workday</SelectItem>
                  <SelectItem value="bamboohr">BambooHR</SelectItem>
                  <SelectItem value="ashby">Ashby</SelectItem>
                </SelectContent>
              </Select>
            </Card>

            <Card className="p-6">
              <Label className="text-sm text-gray-700 mb-2 block">Sync Interval</Label>
              <Select
                value={settings.syncInterval}
                onValueChange={(value) => setSettings({ ...settings, syncInterval: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">Every 5 minutes</SelectItem>
                  <SelectItem value="15">Every 15 minutes</SelectItem>
                  <SelectItem value="30">Every 30 minutes</SelectItem>
                  <SelectItem value="60">Every hour</SelectItem>
                </SelectContent>
              </Select>
            </Card>
          </div>

          <Card className="p-6">
            <Label className="text-sm text-gray-700 mb-2 block">API Key</Label>
            <Input
              type="password"
              placeholder="Enter your ATS API key"
              value={settings.atsApiKey}
              onChange={(e) => setSettings({ ...settings, atsApiKey: e.target.value })}
            />
            <p className="text-xs text-gray-500 mt-2">
              Your API key is encrypted and stored securely
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900 mb-1">Enable ATS Integration</p>
                <p className="text-xs text-gray-600">
                  Sync candidates and status updates with your ATS
                </p>
              </div>
              <Switch
                checked={settings.atsEnabled}
                onCheckedChange={(checked) => setSettings({ ...settings, atsEnabled: checked })}
              />
            </div>

            {settings.atsEnabled && (
              <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="size-2 bg-emerald-500 rounded-full animate-pulse" />
                  <p className="text-sm text-emerald-900">Connected to {settings.atsProvider}</p>
                </div>
                <p className="text-xs text-emerald-700">
                  Last sync: 2 minutes ago • Next sync: in 13 minutes
                </p>
              </div>
            )}
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
              <Check className="size-4 mr-2" />
              Save ATS Settings
            </Button>
          </div>
        </TabsContent>

        {/* Token Usage */}
        <TabsContent value="tokens" className="space-y-6 mt-6">
          <Card className="p-8 bg-gray-50 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-gray-900 mb-2">Token Usage This Month</h3>
                <p className="text-sm text-gray-600">Monitor your AI usage and limits</p>
              </div>
              <div className="size-16 bg-white rounded border border-gray-200 flex items-center justify-center">
                <DollarSign className="size-8 text-[#118B80]" />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 bg-white rounded border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Used</p>
                <p className="text-2xl text-gray-900">{settings.currentTokenUsage.toLocaleString()}</p>
              </div>
              <div className="text-center p-4 bg-white rounded border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Remaining</p>
                <p className="text-2xl text-[#118B80]">{tokensRemaining.toLocaleString()}</p>
              </div>
              <div className="text-center p-4 bg-white rounded border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Limit</p>
                <p className="text-2xl text-gray-900">{settings.monthlyTokenLimit.toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700">Usage Progress</span>
                <span className="text-gray-900">{tokenUsagePercentage.toFixed(1)}%</span>
              </div>
              <Progress 
                value={tokenUsagePercentage} 
                className="h-3"
              />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Usage Breakdown</h3>
            <div className="space-y-3">
              {[
                { label: 'Semantic Search', value: 85432, percentage: 34.8, color: 'bg-blue-500' },
                { label: 'AI Insights Generation', value: 78234, percentage: 31.8, color: 'bg-purple-500' },
                { label: 'AI Chat', value: 52012, percentage: 21.2, color: 'bg-emerald-500' },
                { label: 'Match Scoring', value: 30000, percentage: 12.2, color: 'bg-amber-500' },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">{item.value.toLocaleString()} tokens</span>
                      <span className="text-gray-500">({item.percentage}%)</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="bg-amber-600 hover:bg-amber-700">
              <Check className="size-4 mr-2" />
              Save Token Settings
            </Button>
          </div>
        </TabsContent>

        {/* Talent Pool */}
        <TabsContent value="talent" className="space-y-6 mt-6">
          <Card className="p-6 bg-gray-50 border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="size-12 bg-[#118B80] rounded flex items-center justify-center flex-shrink-0">
                <Database className="size-6 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900 mb-2">Talent Pool Management</h3>
                <p className="text-sm text-gray-600">Configure talent pool and retention settings</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-900 mb-1">Auto-add Candidates to Pool</p>
                  <p className="text-xs text-gray-600">
                    Automatically add all screened candidates to talent pool
                  </p>
                </div>
                <Switch
                  checked={settings.autoAddToPool}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, autoAddToPool: checked })
                  }
                />
              </div>

              <div>
                <Label className="text-sm text-gray-700 mb-2 block">Retention Period (days)</Label>
                <Input
                  type="number"
                  value={settings.poolRetentionDays}
                  onChange={(e) =>
                    setSettings({ ...settings, poolRetentionDays: Number(e.target.value) })
                  }
                />
                <p className="text-xs text-gray-500 mt-2">
                  How long to keep candidates in the talent pool
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Talent Pool Statistics</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Total Candidates', value: '1,247' },
                { label: 'Added This Month', value: '83' },
                { label: 'Hired from Pool', value: '15' }
              ].map((stat, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded border border-gray-200 text-center">
                  <p className="text-2xl text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700">
              <Check className="size-4 mr-2" />
              Save Talent Pool Settings
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}