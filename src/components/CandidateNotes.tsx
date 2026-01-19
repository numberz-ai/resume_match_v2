import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { MessageSquare, Plus, Trash2, Edit } from 'lucide-react';

interface Note {
  id: string;
  author: string;
  role: string;
  content: string;
  timestamp: Date;
  isPrivate: boolean;
}

export function CandidateNotes() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      author: 'John Smith',
      role: 'Senior Recruiter',
      content: 'Had a great phone screen. Very strong technical background and excellent communication skills. Seems genuinely excited about the role.',
      timestamp: new Date(2024, 10, 8, 14, 30),
      isPrivate: false
    },
    {
      id: '2',
      author: 'Sarah Johnson',
      role: 'Hiring Manager',
      content: 'Technical interview went exceptionally well. Candidate demonstrated deep understanding of ML architectures. Would be a great addition to the team.',
      timestamp: new Date(2024, 10, 9, 10, 15),
      isPrivate: false
    },
    {
      id: '3',
      author: 'Mike Chen',
      role: 'Tech Lead',
      content: '(Private) Salary expectations are slightly above our range, but given the candidate\'s experience, I think we should make an exception.',
      timestamp: new Date(2024, 10, 9, 16, 45),
      isPrivate: true
    },
  ]);

  const [newNote, setNewNote] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const addNote = () => {
    if (!newNote.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      author: 'You',
      role: 'Recruiter',
      content: newNote,
      timestamp: new Date(),
      isPrivate
    };

    setNotes([note, ...notes]);
    setNewNote('');
    setIsPrivate(false);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="size-5 text-blue-600" />
        <h3 className="text-gray-900">Notes & Comments</h3>
        <Badge variant="secondary" className="text-xs">{notes.length}</Badge>
      </div>

      {/* Add Note */}
      <div className="mb-6">
        <Textarea
          placeholder="Add a note about this candidate..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="mb-3"
          rows={3}
        />
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="rounded border-gray-300"
            />
            <span>Private note (only visible to you)</span>
          </label>
          <Button size="sm" onClick={addNote} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="size-4 mr-2" />
            Add Note
          </Button>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Notes List */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {notes.map((note, index) => (
          <div key={note.id}>
            <div className="flex items-start gap-3">
              <Avatar className="size-10 flex-shrink-0">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm">
                  {note.author.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="text-sm text-gray-900">{note.author}</p>
                    <p className="text-xs text-gray-600">{note.role}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {note.isPrivate && (
                      <Badge variant="outline" className="text-xs">Private</Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="size-7 p-0 text-gray-400 hover:text-red-600"
                      onClick={() => deleteNote(note.id)}
                    >
                      <Trash2 className="size-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-2">{note.content}</p>
                <p className="text-xs text-gray-500">
                  {note.timestamp.toLocaleDateString()} at {note.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
            {index < notes.length - 1 && <Separator className="mt-4" />}
          </div>
        ))}
      </div>

      {notes.length === 0 && (
        <div className="text-center py-8">
          <MessageSquare className="size-12 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">No notes yet. Add the first note above.</p>
        </div>
      )}
    </Card>
  );
}
