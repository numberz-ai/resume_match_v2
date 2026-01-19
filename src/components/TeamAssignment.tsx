import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Users, UserPlus, X } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
}

const availableTeamMembers: TeamMember[] = [
  { id: '1', name: 'John Smith', role: 'Senior Recruiter', email: 'john@company.com' },
  { id: '2', name: 'Sarah Johnson', role: 'Hiring Manager', email: 'sarah@company.com' },
  { id: '3', name: 'Mike Chen', role: 'Tech Lead', email: 'mike@company.com' },
  { id: '4', name: 'Emily Watson', role: 'HR Manager', email: 'emily@company.com' },
  { id: '5', name: 'David Park', role: 'Engineering Manager', email: 'david@company.com' },
];

export function TeamAssignment() {
  const [assignedMembers, setAssignedMembers] = useState<TeamMember[]>([
    availableTeamMembers[0],
    availableTeamMembers[1],
  ]);

  const [selectedMember, setSelectedMember] = useState<string>('');

  const unassignedMembers = availableTeamMembers.filter(
    m => !assignedMembers.find(am => am.id === m.id)
  );

  const addMember = () => {
    if (!selectedMember) return;
    
    const member = availableTeamMembers.find(m => m.id === selectedMember);
    if (member && !assignedMembers.find(am => am.id === member.id)) {
      setAssignedMembers([...assignedMembers, member]);
      setSelectedMember('');
    }
  };

  const removeMember = (id: string) => {
    setAssignedMembers(assignedMembers.filter(m => m.id !== id));
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Users className="size-5 text-blue-600" />
        <h3 className="text-gray-900">Team Assignment</h3>
        <Badge variant="secondary" className="text-xs">{assignedMembers.length}</Badge>
      </div>

      {/* Add Member */}
      <div className="flex items-center gap-2 mb-4">
        <Select value={selectedMember} onValueChange={setSelectedMember}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Select team member..." />
          </SelectTrigger>
          <SelectContent>
            {unassignedMembers.map((member) => (
              <SelectItem key={member.id} value={member.id}>
                {member.name} - {member.role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button size="sm" onClick={addMember} disabled={!selectedMember}>
          <UserPlus className="size-4 mr-2" />
          Add
        </Button>
      </div>

      {/* Assigned Members */}
      <div className="space-y-3">
        {assignedMembers.map((member) => (
          <div key={member.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Avatar className="size-10">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm">
                {member.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">{member.name}</p>
              <p className="text-xs text-gray-600">{member.role}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="size-7 p-0 text-gray-400 hover:text-red-600"
              onClick={() => removeMember(member.id)}
            >
              <X className="size-4" />
            </Button>
          </div>
        ))}
      </div>

      {assignedMembers.length === 0 && (
        <div className="text-center py-8">
          <Users className="size-12 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">No team members assigned</p>
        </div>
      )}
    </Card>
  );
}
