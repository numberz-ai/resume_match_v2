import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';
import { Upload, FileText, X, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';

interface UploadCandidateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UploadCandidateDialog({ open, onOpenChange }: UploadCandidateDialogProps) {
  const [uploadStep, setUploadStep] = useState<'upload' | 'processing' | 'review'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [candidateData, setCandidateData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    jobTitle: '',
    source: 'upload',
    status: 'new',
    notes: '',
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check if file is PDF or DOCX
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF or Word document');
      return;
    }
    
    setSelectedFile(file);
    // Start processing
    setUploadStep('processing');
    
    // Simulate AI processing
    setTimeout(() => {
      // Simulate extracted data from resume
      setCandidateData({
        name: 'Sarah Chen',
        email: 'sarah.chen@email.com',
        phone: '+1 (555) 234-5678',
        location: 'San Francisco, CA',
        jobTitle: 'Senior Machine Learning Engineer',
        source: 'upload',
        status: 'new',
        notes: '',
      });
      setUploadStep('review');
    }, 2500);
  };

  const handleSubmit = () => {
    console.log('Submitting candidate:', candidateData);
    alert('Candidate uploaded successfully!');
    resetDialog();
    onOpenChange(false);
  };

  const resetDialog = () => {
    setUploadStep('upload');
    setSelectedFile(null);
    setDragActive(false);
    setCandidateData({
      name: '',
      email: '',
      phone: '',
      location: '',
      jobTitle: '',
      source: 'upload',
      status: 'new',
      notes: '',
    });
  };

  const handleClose = () => {
    resetDialog();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Candidate Resume</DialogTitle>
          <DialogDescription>
            Upload a resume (PDF or Word) and our AI will automatically extract candidate information
          </DialogDescription>
        </DialogHeader>

        {/* Upload Step */}
        {uploadStep === 'upload' && (
          <div className="space-y-6 py-4">
            {/* Drag & Drop Zone */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <Upload className={`size-12 mx-auto mb-4 ${dragActive ? 'text-blue-600' : 'text-gray-400'}`} />
              <h3 className="text-gray-900 mb-2">
                {dragActive ? 'Drop your resume here' : 'Drag and drop resume here'}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                or click to browse files
              </p>
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileInput}
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload">
                <Button type="button" variant="outline" asChild>
                  <span>
                    <FileText className="size-4 mr-2" />
                    Choose File
                  </span>
                </Button>
              </label>
              <p className="text-xs text-gray-500 mt-3">
                Supported formats: PDF, DOC, DOCX (Max 10MB)
              </p>
            </div>

            {/* Quick Add Option */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-gray-500">Or add manually</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="manual-name">Full Name</Label>
                  <Input
                    id="manual-name"
                    placeholder="John Doe"
                    value={candidateData.name}
                    onChange={(e) => setCandidateData({ ...candidateData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="manual-email">Email</Label>
                  <Input
                    id="manual-email"
                    type="email"
                    placeholder="john@example.com"
                    value={candidateData.email}
                    onChange={(e) => setCandidateData({ ...candidateData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="manual-phone">Phone</Label>
                  <Input
                    id="manual-phone"
                    placeholder="+1 (555) 123-4567"
                    value={candidateData.phone}
                    onChange={(e) => setCandidateData({ ...candidateData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="manual-location">Location</Label>
                  <Input
                    id="manual-location"
                    placeholder="San Francisco, CA"
                    value={candidateData.location}
                    onChange={(e) => setCandidateData({ ...candidateData, location: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="manual-title">Current Job Title</Label>
                <Input
                  id="manual-title"
                  placeholder="Senior Software Engineer"
                  value={candidateData.jobTitle}
                  onChange={(e) => setCandidateData({ ...candidateData, jobTitle: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="manual-notes">Notes (Optional)</Label>
                <Textarea
                  id="manual-notes"
                  placeholder="Add any additional notes..."
                  rows={3}
                  value={candidateData.notes}
                  onChange={(e) => setCandidateData({ ...candidateData, notes: e.target.value })}
                />
              </div>

              <Button 
                onClick={handleSubmit} 
                className="w-full"
                disabled={!candidateData.name || !candidateData.email}
              >
                Add Candidate
              </Button>
            </div>
          </div>
        )}

        {/* Processing Step */}
        {uploadStep === 'processing' && (
          <div className="py-12">
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <div className="text-center space-y-4">
                <div className="size-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
                  <Sparkles className="size-8 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-2">AI Processing Resume</h3>
                  <p className="text-sm text-gray-600">
                    Extracting candidate information from {selectedFile?.name}...
                  </p>
                </div>
                <div className="space-y-2 max-w-xs mx-auto">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Loader2 className="size-4 animate-spin text-blue-600" />
                    <span>Parsing document structure...</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Loader2 className="size-4 animate-spin text-purple-600" />
                    <span>Extracting contact information...</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Loader2 className="size-4 animate-spin text-pink-600" />
                    <span>Analyzing skills and experience...</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Review Step */}
        {uploadStep === 'review' && (
          <div className="space-y-6 py-4">
            {/* Success Header */}
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-gray-900 mb-1">Resume Processed Successfully</h3>
                  <p className="text-sm text-gray-600">
                    Review and edit the extracted information before adding the candidate
                  </p>
                </div>
              </div>
            </Card>

            {/* Uploaded File Info */}
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="size-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-900">{selectedFile?.name}</p>
                    <p className="text-xs text-gray-500">
                      {selectedFile && (selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedFile(null);
                    setUploadStep('upload');
                  }}
                >
                  <X className="size-4" />
                </Button>
              </div>
            </Card>

            {/* Extracted Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-purple-600" />
                <h3 className="text-gray-900">AI-Extracted Information</h3>
                <Badge className="bg-purple-100 text-purple-700">Auto-filled</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="review-name">Full Name *</Label>
                  <Input
                    id="review-name"
                    value={candidateData.name}
                    onChange={(e) => setCandidateData({ ...candidateData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="review-email">Email *</Label>
                  <Input
                    id="review-email"
                    type="email"
                    value={candidateData.email}
                    onChange={(e) => setCandidateData({ ...candidateData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="review-phone">Phone</Label>
                  <Input
                    id="review-phone"
                    value={candidateData.phone}
                    onChange={(e) => setCandidateData({ ...candidateData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="review-location">Location</Label>
                  <Input
                    id="review-location"
                    value={candidateData.location}
                    onChange={(e) => setCandidateData({ ...candidateData, location: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="review-title">Current Job Title</Label>
                <Input
                  id="review-title"
                  value={candidateData.jobTitle}
                  onChange={(e) => setCandidateData({ ...candidateData, jobTitle: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="review-status">Initial Status</Label>
                  <Select value={candidateData.status} onValueChange={(value) => setCandidateData({ ...candidateData, status: value })}>
                    <SelectTrigger id="review-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="screening">Screening</SelectItem>
                      <SelectItem value="interview">Interview</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="review-source">Source</Label>
                  <Select value={candidateData.source} onValueChange={(value) => setCandidateData({ ...candidateData, source: value })}>
                    <SelectTrigger id="review-source">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upload">Direct Upload</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="job-board">Job Board</SelectItem>
                      <SelectItem value="agency">Agency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="review-notes">Notes (Optional)</Label>
                <Textarea
                  id="review-notes"
                  placeholder="Add any additional notes..."
                  rows={3}
                  value={candidateData.notes}
                  onChange={(e) => setCandidateData({ ...candidateData, notes: e.target.value })}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit} 
                className="flex-1"
                disabled={!candidateData.name || !candidateData.email}
              >
                <CheckCircle2 className="size-4 mr-2" />
                Add Candidate
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
