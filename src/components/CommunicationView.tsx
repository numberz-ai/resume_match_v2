import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Send, Search, Mail, MessageSquare, Sparkles, FileText, Plus, Filter } from 'lucide-react';

interface Message {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateInitials: string;
  subject: string;
  preview: string;
  timestamp: string;
  unread: boolean;
  type: 'outreach' | 'reply' | 'system';
}

const mockMessages: Message[] = [
  {
    id: '1',
    candidateId: '1',
    candidateName: 'Dr. Emily Chen',
    candidateInitials: 'EC',
    subject: 'Re: Senior ML Engineer Position',
    preview: 'Thank you for reaching out! I\'m very interested in the role...',
    timestamp: '10 min ago',
    unread: true,
    type: 'reply',
  },
  {
    id: '2',
    candidateId: '2',
    candidateName: 'Michael Zhang',
    candidateInitials: 'MZ',
    subject: 'Interview Confirmation',
    preview: 'Looking forward to speaking with you tomorrow at 2 PM...',
    timestamp: '2 hours ago',
    unread: true,
    type: 'reply',
  },
  {
    id: '3',
    candidateId: '3',
    candidateName: 'Sarah Johnson',
    candidateInitials: 'SJ',
    subject: 'ML Research Scientist Opportunity',
    preview: 'I noticed your impressive background in computer vision...',
    timestamp: '1 day ago',
    unread: false,
    type: 'outreach',
  },
];

const emailTemplates = [
  { id: '1', name: 'Initial Outreach', category: 'Outreach' },
  { id: '2', name: 'Interview Invitation', category: 'Interview' },
  { id: '3', name: 'Rejection (Polite)', category: 'Rejection' },
  { id: '4', name: 'Offer Letter', category: 'Offer' },
  { id: '5', name: 'Follow-up', category: 'Follow-up' },
];

export function CommunicationView() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(mockMessages[0]);
  const [messageContent, setMessageContent] = useState('');

  const aiGeneratedMessage = `Hi ${selectedMessage?.candidateName.split(' ')[0]},

I came across your impressive work at Tech Innovations Inc. and was particularly interested in your expertise in machine learning and computer vision.

We have an exciting Senior ML Engineer position that would be perfect for someone with your background. The role involves:
• Leading ML infrastructure development
• Mentoring a team of engineers  
• Working on cutting-edge AI projects

Your experience with Python, TensorFlow, and your published research papers align perfectly with what we're looking for.

Would you be available for a brief call next week to discuss this opportunity?

Best regards,
John Doe
Senior Recruiter`;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Messages & Communication</h1>
          <p className="text-gray-600">Manage candidate communications</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <FileText className="size-4 mr-2" />
            Templates
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="size-4 mr-2" />
            New Message
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Message List */}
        <div className="col-span-4">
          <Card className="p-4">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
                <Input 
                  placeholder="Search messages..." 
                  className="pl-10"
                />
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">
                  Unread
                  <Badge className="ml-2 bg-blue-600 text-white">2</Badge>
                </TabsTrigger>
                <TabsTrigger value="sent">Sent</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4 space-y-2">
                {mockMessages.map((message) => (
                  <Card
                    key={message.id}
                    className={`p-3 cursor-pointer transition-all ${
                      selectedMessage?.id === message.id
                        ? 'bg-blue-50 border-blue-300 border-2'
                        : message.unread
                        ? 'bg-blue-50/30 border-2 border-transparent hover:border-gray-300'
                        : 'border-2 border-transparent hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="size-10 flex-shrink-0">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                          {message.candidateInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className={`text-sm truncate ${message.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                            {message.candidateName}
                          </p>
                          <span className="text-xs text-gray-500 flex-shrink-0">{message.timestamp}</span>
                        </div>
                        <p className={`text-xs mb-1 truncate ${message.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                          {message.subject}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{message.preview}</p>
                      </div>
                    </div>
                    {message.unread && (
                      <div className="size-2 bg-blue-600 rounded-full absolute top-3 right-3" />
                    )}
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="unread" className="mt-4">
                <div className="text-center py-8 text-gray-400">
                  <Mail className="size-12 mx-auto mb-2" />
                  <p className="text-sm">Unread messages</p>
                </div>
              </TabsContent>

              <TabsContent value="sent" className="mt-4">
                <div className="text-center py-8 text-gray-400">
                  <Send className="size-12 mx-auto mb-2" />
                  <p className="text-sm">Sent messages</p>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Message Detail & Compose */}
        <div className="col-span-8 space-y-4">
          {selectedMessage ? (
            <>
              {/* Message Thread */}
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="size-12">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                        {selectedMessage.candidateInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-gray-900">{selectedMessage.candidateName}</h3>
                      <p className="text-sm text-gray-600">{selectedMessage.subject}</p>
                      <p className="text-xs text-gray-500 mt-1">{selectedMessage.timestamp}</p>
                    </div>
                  </div>
                  <Badge className={selectedMessage.type === 'reply' ? 'bg-emerald-500' : 'bg-blue-500'}>
                    {selectedMessage.type}
                  </Badge>
                </div>

                <Separator className="my-4" />

                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700">{selectedMessage.preview}</p>
                  <p className="text-gray-700 mt-4">
                    I have over 8 years of experience in machine learning and have published several papers
                    in top-tier conferences. I'm particularly excited about your company's work in NLP and
                    computer vision.
                  </p>
                  <p className="text-gray-700 mt-4">
                    I'd love to learn more about the team structure and the specific projects I'd be working on.
                    I'm available for a call any day next week.
                  </p>
                  <p className="text-gray-700 mt-4">
                    Best regards,<br />
                    {selectedMessage.candidateName}
                  </p>
                </div>
              </Card>

              {/* AI-Generated Reply */}
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="size-5 text-purple-600" />
                  <h3 className="text-gray-900">AI-Generated Reply</h3>
                  <Badge className="bg-purple-600">Smart Compose</Badge>
                </div>
                
                <Textarea 
                  value={aiGeneratedMessage}
                  onChange={(e) => {}}
                  className="min-h-[300px] mb-4 bg-white"
                />

                <div className="flex items-center gap-2">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Send className="size-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline">
                    <Sparkles className="size-4 mr-2" />
                    Regenerate
                  </Button>
                  <Button variant="outline">Edit</Button>
                </div>
              </Card>

              {/* Email Templates */}
              <Card className="p-6">
                <h3 className="text-gray-900 mb-4">Quick Templates</h3>
                <div className="grid grid-cols-5 gap-2">
                  {emailTemplates.map((template) => (
                    <Button
                      key={template.id}
                      variant="outline"
                      size="sm"
                      className="flex flex-col h-auto py-3"
                    >
                      <FileText className="size-4 mb-1" />
                      <span className="text-xs">{template.name}</span>
                    </Button>
                  ))}
                </div>
              </Card>
            </>
          ) : (
            <Card className="p-12 text-center">
              <MessageSquare className="size-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">Select a message to view</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}