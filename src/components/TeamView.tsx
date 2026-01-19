import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  Plus, Search, Filter, Mail, Phone, MoreVertical, 
  Shield, User, Users, Crown, UserCheck, Edit, Trash2,
  CheckCircle, Clock, Calendar, Award
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'hiring-manager' | 'recruiter' | 'interviewer';
  department: string;
  status: 'active' | 'inactive';
  joinedDate: string;
  candidatesAssigned: number;
  interviewsConducted: number;
  hires: number;
}

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    role: 'admin',
    department: 'HR',
    status: 'active',
    joinedDate: 'Jan 2024',
    candidatesAssigned: 45,
    interviewsConducted: 32,
    hires: 12,
  },
  {
    id: '2',
    name: 'Sarah Miller',
    email: 'sarah.miller@company.com',
    phone: '+1 (555) 234-5678',
    role: 'hiring-manager',
    department: 'Engineering',
    status: 'active',
    joinedDate: 'Feb 2024',
    candidatesAssigned: 38,
    interviewsConducted: 28,
    hires: 9,
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    phone: '+1 (555) 345-6789',
    role: 'recruiter',
    department: 'HR',
    status: 'active',
    joinedDate: 'Mar 2024',
    candidatesAssigned: 52,
    interviewsConducted: 15,
    hires: 8,
  },
  {
    id: '4',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    phone: '+1 (555) 456-7890',
    role: 'interviewer',
    department: 'Engineering',
    status: 'active',
    joinedDate: 'Apr 2024',
    candidatesAssigned: 0,
    interviewsConducted: 45,
    hires: 0,
  },
  {
    id: '5',
    name: 'Emily Brown',
    email: 'emily.brown@company.com',
    phone: '+1 (555) 567-8901',
    role: 'hiring-manager',
    department: 'Product',
    status: 'active',
    joinedDate: 'May 2024',
    candidatesAssigned: 29,
    interviewsConducted: 22,
    hires: 7,
  },
  {
    id: '6',
    name: 'David Wilson',
    email: 'david.wilson@company.com',
    phone: '+1 (555) 678-9012',
    role: 'recruiter',
    department: 'HR',
    status: 'inactive',
    joinedDate: 'Jan 2024',
    candidatesAssigned: 18,
    interviewsConducted: 8,
    hires: 3,
  },
];

const roleConfig = {
  admin: {
    label: 'Admin',
    icon: Crown,
    color: 'bg-red-500',
    lightBg: 'bg-red-50',
    textColor: 'text-red-700',
    description: 'Full system access',
  },
  'hiring-manager': {
    label: 'Hiring Manager',
    icon: Shield,
    color: 'bg-purple-500',
    lightBg: 'bg-purple-50',
    textColor: 'text-purple-700',
    description: 'Manage hiring process',
  },
  recruiter: {
    label: 'Recruiter',
    icon: Users,
    color: 'bg-blue-500',
    lightBg: 'bg-blue-50',
    textColor: 'text-blue-700',
    description: 'Source and screen candidates',
  },
  interviewer: {
    label: 'Interviewer',
    icon: UserCheck,
    color: 'bg-emerald-500',
    lightBg: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    description: 'Conduct interviews',
  },
};

export function TeamView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredMembers = mockTeamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleInfo = (role: string) => roleConfig[role as keyof typeof roleConfig];

  const activeMembers = mockTeamMembers.filter(m => m.status === 'active').length;
  const totalHires = mockTeamMembers.reduce((sum, m) => sum + m.hires, 0);
  const totalInterviews = mockTeamMembers.reduce((sum, m) => sum + m.interviewsConducted, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Team & User Management</h1>
          <p className="text-sm text-gray-600 mt-1">Manage your recruitment team and permissions</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="size-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Team Members</p>
              <h3 className="text-2xl text-gray-900 mt-1">{mockTeamMembers.length}</h3>
            </div>
            <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="size-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Members</p>
              <h3 className="text-2xl text-gray-900 mt-1">{activeMembers}</h3>
            </div>
            <div className="size-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="size-6 text-emerald-600" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Interviews</p>
              <h3 className="text-2xl text-gray-900 mt-1">{totalInterviews}</h3>
            </div>
            <div className="size-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="size-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Hires</p>
              <h3 className="text-2xl text-gray-900 mt-1">{totalHires}</h3>
            </div>
            <div className="size-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Award className="size-6 text-amber-600" />
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="members" className="w-full">
        <TabsList>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
        </TabsList>

        {/* Team Members Tab */}
        <TabsContent value="members" className="space-y-4">
          {/* Filters */}
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  placeholder="Search team members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="hiring-manager">Hiring Manager</SelectItem>
                  <SelectItem value="recruiter">Recruiter</SelectItem>
                  <SelectItem value="interviewer">Interviewer</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Team Members Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => {
                  const roleInfo = getRoleInfo(member.role);
                  const RoleIcon = roleInfo.icon;
                  
                  return (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-10">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm text-gray-900">{member.name}</p>
                            <p className="text-xs text-gray-500">Joined {member.joinedDate}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`size-8 rounded-lg ${roleInfo.lightBg} flex items-center justify-center`}>
                            <RoleIcon className={`size-4 ${roleInfo.textColor}`} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-900">{roleInfo.label}</p>
                            <p className="text-xs text-gray-500">{roleInfo.description}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{member.department}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Mail className="size-3" />
                            <span>{member.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Phone className="size-3" />
                            <span>{member.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">Candidates:</span>
                            <span className="text-gray-900">{member.candidatesAssigned}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">Interviews:</span>
                            <span className="text-gray-900">{member.interviewsConducted}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">Hires:</span>
                            <span className="text-emerald-700">{member.hires}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={member.status === 'active' ? 'bg-emerald-500' : 'bg-gray-500'}>
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="size-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="ghost">
                            <MoreVertical className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Roles & Permissions Tab */}
        <TabsContent value="roles" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(roleConfig).map(([key, role]) => {
              const RoleIcon = role.icon;
              const count = mockTeamMembers.filter(m => m.role === key).length;
              
              return (
                <Card key={key} className={`p-6 ${role.lightBg} border-2`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`size-12 ${role.color} rounded-lg flex items-center justify-center`}>
                        <RoleIcon className="size-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-gray-900">{role.label}</h3>
                        <p className="text-sm text-gray-600">{role.description}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{count} members</Badge>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-gray-900 mb-2">Permissions:</p>
                    <div className="space-y-1.5">
                      {key === 'admin' && (
                        <>
                          <div className="flex items-center gap-2 text-xs text-gray-700">
                            <CheckCircle className="size-3 text-emerald-600" />
                            <span>Full system access</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-700">
                            <CheckCircle className="size-3 text-emerald-600" />
                            <span>Manage users and roles</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-700">
                            <CheckCircle className="size-3 text-emerald-600" />
                            <span>View all candidates</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-700">
                            <CheckCircle className="size-3 text-emerald-600" />
                            <span>Configure system settings</span>
                          </div>
                        </>
                      )}
                      {key === 'hiring-manager' && (
                        <>
                          <div className="flex items-center gap-2 text-xs text-gray-700">
                            <CheckCircle className="size-3 text-emerald-600" />
                            <span>View assigned candidates</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-700">
                            <CheckCircle className="size-3 text-emerald-600" />
                            <span>Make hiring decisions</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-700">
                            <CheckCircle className="size-3 text-emerald-600" />
                            <span>Schedule interviews</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-700">
                            <CheckCircle className="size-3 text-emerald-600" />
                            <span>View analytics</span>
                          </div>
                        </>
                      )}
                      {key === 'recruiter' && (
                        <>
                          <div className="flex items-center gap-2 text-xs text-gray-700">
                            <CheckCircle className="size-3 text-emerald-600" />
                            <span>Source candidates</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-700">
                            <CheckCircle className="size-3 text-emerald-600" />
                            <span>Screen applications</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-700">
                            <CheckCircle className="size-3 text-emerald-600" />
                            <span>Send outreach messages</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-700">
                            <CheckCircle className="size-3 text-emerald-600" />
                            <span>Update candidate status</span>
                          </div>
                        </>
                      )}
                      {key === 'interviewer' && (
                        <>
                          <div className="flex items-center gap-2 text-xs text-gray-700">
                            <CheckCircle className="size-3 text-emerald-600" />
                            <span>View assigned interviews</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-700">
                            <CheckCircle className="size-3 text-emerald-600" />
                            <span>Submit interview feedback</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-700">
                            <CheckCircle className="size-3 text-emerald-600" />
                            <span>View candidate profiles</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-4" size="sm">
                    <Edit className="size-3 mr-2" />
                    Edit Permissions
                  </Button>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
