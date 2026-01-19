import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { ScrollArea } from './ui/scroll-area';
import { Mail, Send, Search, MoreVertical } from 'lucide-react';
import { Input } from './ui/input';

interface Message {
  id: string;
  sender: string;
  avatar?: string;
  preview: string;
  timestamp: string;
  unread: boolean;
  subject: string;
}

interface MessagesDropdownProps {
  onNavigateToMessages: () => void;
}

const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'Sarah Chen',
    preview: 'Thank you for considering my application. I\'m very excited about...',
    timestamp: '2 min ago',
    unread: true,
    subject: 'Re: Senior ML Engineer Position'
  },
  {
    id: '2',
    sender: 'Marcus Johnson',
    preview: 'I wanted to follow up on the interview process. When can I...',
    timestamp: '1 hour ago',
    unread: true,
    subject: 'Interview Follow-up'
  },
  {
    id: '3',
    sender: 'Priya Sharma',
    preview: 'I have a few questions about the role and team structure...',
    timestamp: '3 hours ago',
    unread: false,
    subject: 'Questions about Backend Engineer Role'
  },
  {
    id: '4',
    sender: 'Alex Rivera',
    preview: 'Just wanted to confirm our meeting scheduled for tomorrow...',
    timestamp: 'Yesterday',
    unread: false,
    subject: 'Meeting Confirmation'
  },
  {
    id: '5',
    sender: 'David Kim',
    preview: 'Thank you for the offer! I\'m reviewing the details and will...',
    timestamp: '2 days ago',
    unread: false,
    subject: 'Offer Response'
  }
];

export function MessagesDropdown({ onNavigateToMessages }: MessagesDropdownProps) {
  const [open, setOpen] = useState(false);
  const unreadCount = mockMessages.filter(m => m.unread).length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Mail className="size-5 text-gray-700" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 size-5 p-0 flex items-center justify-center bg-blue-600 text-white border-2 border-white"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-gray-900">Messages</h3>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700" onClick={onNavigateToMessages}>
              View All
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <Input 
              placeholder="Search messages..." 
              className="pl-9 h-9"
            />
          </div>
        </div>

        {/* Messages List */}
        <ScrollArea className="h-[400px]">
          <div className="divide-y">
            {mockMessages.map((message) => (
              <div
                key={message.id}
                onClick={() => {
                  onNavigateToMessages();
                  setOpen(false);
                }}
                className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  message.unread ? 'bg-blue-50/50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="size-10">
                    <AvatarImage src={message.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm">
                      {message.sender.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className={`text-sm ${message.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                        {message.sender}
                      </p>
                      <span className="text-xs text-gray-500 flex-shrink-0">
                        {message.timestamp}
                      </span>
                    </div>
                    <p className={`text-xs mb-1 ${message.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                      {message.subject}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {message.preview}
                    </p>
                  </div>
                  {message.unread && (
                    <div className="size-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-3 border-t bg-gray-50">
          <Button variant="outline" className="w-full" size="sm">
            <Send className="size-4 mr-2" />
            Compose Message
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}