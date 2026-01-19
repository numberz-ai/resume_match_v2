import { useState } from 'react';
import { uploadResume, type CandidateProfile } from '../api';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, Upload, FileText, X, CheckCircle, 
  ChevronRight, Loader2, UserPlus, Building2, Mail, 
  MapPin, Calendar, DollarSign, Briefcase, GraduationCap,
  Languages, Clock, TrendingUp, Code, Lightbulb, Users
} from 'lucide-react';

interface AddCandidateProps {
  onBack: () => void;
}

export function AddCandidate({ onBack }: AddCandidateProps) {
  const [currentStep, setCurrentStep] = useState<'upload' | 'verify' | 'success'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [candidateData, setCandidateData] = useState<CandidateProfile | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file: File) => {
    // Validate file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF or DOC file');
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      const response = await uploadResume(selectedFile);
      
      if (response.success && response.response_data) {
        setCandidateData(response.response_data);
        setCurrentStep('verify');
      } else {
        alert('Failed to process resume. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload resume. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveToDatabase = () => {
    // In a real app, this would save to the database
    setCurrentStep('success');
  };

  const handleAddMore = () => {
    setCurrentStep('upload');
    setSelectedFile(null);
    setCandidateData(null);
  };

  const getFileSize = (bytes: number) => {
    return `${Math.round(bytes / 1024)} KB`;
  };

  const getFileIcon = (type: string) => {
    return <FileText className="size-5 text-red-500" />;
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-7 py-3 flex items-center justify-between h-12">
        <h1 className="text-sm text-gray-800">Add New Candidates</h1>
        
        <div className="flex items-center gap-3">
          {/* Search placeholder */}
          <div className="w-80 h-8 bg-white border border-gray-300 rounded-md px-3 flex items-center gap-2">
            <svg className="size-4 text-gray-400" fill="none" viewBox="0 0 16 16">
              <path clipRule="evenodd" d="M11.5 7C11.5 9.48528 9.48528 11.5 7 11.5C4.51472 11.5 2.5 9.48528 2.5 7C2.5 4.51472 4.51472 2.5 7 2.5C9.48528 2.5 11.5 4.51472 11.5 7ZM10.7071 11.7071C9.68342 12.5329 8.39686 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7C13 8.39686 12.5329 9.68342 11.7071 10.7071L14.6464 13.6464C14.8417 13.8417 14.8417 14.1583 14.6464 14.3536C14.4512 14.5488 14.1346 14.5488 13.9393 14.3536L10.7071 11.7071Z" fill="currentColor" fillRule="evenodd" />
            </svg>
            <span className="text-sm text-gray-400">Search</span>
          </div>

          {/* Icons and user */}
          <div className="flex items-center gap-1.5">
            <button className="size-8 rounded flex items-center justify-center hover:bg-gray-100">
              <svg className="size-6" fill="none" viewBox="0 0 24 24">
                <path d="M17 10H19C20.1046 10 21 10.8954 21 12V17H20C20 18.6569 18.6569 20 17 20C15.3431 20 14 18.6569 14 17M17 10V7C17 5.89543 16.1046 5 15 5H5C3.89543 5 3 5.89543 3 7V17H4C4 18.6569 5.34315 20 7 20C8.65685 20 10 18.6569 10 17M17 10H10M10 17V10" fill="currentColor" opacity="0.3" />
              </svg>
            </button>
            <button className="size-8 rounded flex items-center justify-center hover:bg-gray-100 relative">
              <svg className="size-6" fill="none" viewBox="0 0 24 24">
                <path d="M12 2C10.9 2 10 2.9 10 4V5.13C7.03 6.21 5 9.11 5 12.5V17L3 19V20H21V19L19 17V12.5C19 9.11 16.97 6.21 14 5.13V4C14 2.9 13.1 2 12 2ZM12 6C14.76 6 17 8.24 17 11V18H7V11C7 8.24 9.24 6 12 6ZM10 21C10 22.1 10.9 23 12 23C13.1 23 14 22.1 14 21H10Z" fill="currentColor" opacity="0.6" />
                <circle cx="19.45" cy="4.4" fill="#118B80" r="2" />
              </svg>
            </button>
            <div className="flex items-center gap-2 ml-2">
              <div className="size-7 rounded overflow-hidden">
                <img src="https://i.pravatar.cc/150?img=33" alt="User" className="size-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-900">Albert Flores</span>
                <span className="text-[10px] text-gray-500">Hiring Manager</span>
              </div>
              <svg className="size-2.5 text-gray-900 opacity-50" fill="currentColor" viewBox="0 0 10 5">
                <path d="M0 0L5 5L10 0H0Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="bg-[#f6f8f9] border-b border-[rgba(0,101,255,0.3)] py-2 relative">
        <div className="flex items-center justify-center gap-3">
          <div className="absolute left-6 flex items-center gap-1 cursor-pointer hover:opacity-70" onClick={onBack}>
            <ArrowLeft className="size-5 text-gray-600" />
            <span className="text-xs text-gray-600">Back to Candidates</span>
          </div>
          
          {/* Step 1 */}
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full border ${
            currentStep === 'upload' 
              ? 'bg-white border-green-600' 
              : currentStep === 'verify' || currentStep === 'success'
              ? 'bg-white border-green-600/20'
              : 'bg-white border-gray-300'
          }`}>
            {currentStep === 'verify' || currentStep === 'success' ? (
              <CheckCircle className="size-6 text-green-600" />
            ) : (
              <Upload className="size-6 text-green-600" />
            )}
            <span className="text-xs text-green-600">Upload Resume</span>
          </div>

          {/* Step 2 */}
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full border ${
            currentStep === 'verify' 
              ? 'bg-white border-green-600' 
              : currentStep === 'success'
              ? 'bg-white border-green-600/20'
              : 'bg-white border-gray-300'
          }`}>
            {currentStep === 'success' ? (
              <CheckCircle className="size-6 text-green-600" />
            ) : (
              <svg className="size-6" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" stroke={currentStep === 'verify' ? '#118B80' : '#DBE9E8'} strokeWidth="1.5" />
              </svg>
            )}
            <span className={`text-xs ${currentStep === 'verify' || currentStep === 'success' ? 'text-green-600' : 'text-black'}`}>
              Verify Details
            </span>
          </div>

          {/* Step 3 */}
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full border ${
            currentStep === 'success' 
              ? 'bg-white border-green-600' 
              : 'bg-white border-gray-300'
          }`}>
            {currentStep === 'success' ? (
              <CheckCircle className="size-6 text-green-600" />
            ) : (
              <svg className="size-6" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" stroke="#DBE9E8" strokeWidth="1.5" />
              </svg>
            )}
            <span className="text-xs text-black">Add to Database</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center bg-white p-6 overflow-y-auto">
        {currentStep === 'upload' && (
          <Card className="w-full max-w-3xl p-6 border border-gray-200 rounded-xl bg-[#f6f8f9]">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="size-12 rounded-lg bg-green-600 flex items-center justify-center">
                <UserPlus className="size-8 text-white" />
              </div>
              <div>
                <h2 className="text-lg text-gray-800">Add Profiles to Your Database</h2>
                <p className="text-sm text-gray-600 mt-1">Upload resumes, or import in bulk, and we'll extract the details automatically.</p>
              </div>
            </div>

            <div className="h-px bg-gray-300 opacity-20 my-6" />

            {/* Upload Section */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-3">Please upload the resume to continue</p>
              
              <div
                className={`border-2 border-dashed rounded-lg bg-white p-10 text-center transition-colors ${
                  isDragging 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-3.5">
                    <svg className="size-8 text-gray-500" fill="none" viewBox="0 0 32 32">
                      <path d="M14 22V10.5L10 14.5L8 12.5L16 4.5L24 12.5L22 14.5L18 10.5V22H14ZM6 28C5.16667 28 4.45833 27.7083 3.875 27.125C3.29167 26.5417 3 25.8333 3 25V20H7V25H25V20H29V25C29 25.8333 28.7083 26.5417 28.125 27.125C27.5417 27.7083 26.8333 28 26 28H6Z" fill="currentColor" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-800">Drag and drop resume here or click to browse files</p>
                      <p className="text-xs text-gray-500 mt-1.5">Supported formats: PDF, DOC, DOCX (Max 10MB)</p>
                    </div>
                  </div>
                  <Input
                    id="resume-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFileInput}
                  />
                </label>
              </div>
            </div>

            {/* Selected File */}
            {selectedFile && (
              <div className="mb-6">
                <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-red-50 p-1 rounded">
                      {getFileIcon(selectedFile.type)}
                    </div>
                    <div>
                      <p className="text-xs text-gray-900">{selectedFile.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[10px] text-gray-600">PDF</span>
                        <div className="size-[3px] rounded-full bg-gray-400" />
                        <span className="text-[10px] text-gray-600">{getFileSize(selectedFile.size)}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedFile(null)}
                    className="size-5 bg-red-50 rounded flex items-center justify-center hover:bg-red-100"
                  >
                    <X className="size-2.5 text-red-600" />
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-6">
              <Button 
                variant="outline" 
                className="border-green-600 text-green-600 hover:bg-green-50 w-30"
                onClick={onBack}
              >
                Cancel
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white w-30"
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="size-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Continue
                    <ChevronRight className="size-3.5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}

        {currentStep === 'verify' && candidateData && (
          <Card className="w-full max-w-3xl p-6 border border-gray-200 rounded-xl bg-[#f6f8f9]">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="size-12 rounded-lg bg-green-600 flex items-center justify-center">
                <CheckCircle className="size-8 text-white" />
              </div>
              <div>
                <h2 className="text-lg text-gray-800">Verify Candidate Details</h2>
                <p className="text-sm text-gray-600 mt-1">Our AI has extracted the data from resumes. Review and confirm before saving.</p>
              </div>
            </div>

            <div className="h-px bg-gray-300 opacity-20 my-6" />

            {/* Candidate Details */}
            <div className="bg-white rounded-lg p-5 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl text-gray-900">{candidateData.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{candidateData.title}</p>
                </div>
                <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                  Edit Details
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-2">
                  <Briefcase className="size-4 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Experience</p>
                    <p className="text-sm text-gray-900">{candidateData.years_of_experience} years</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Building2 className="size-4 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Current Company</p>
                    <p className="text-sm text-gray-900">{candidateData.current_company || 'Not specified'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="size-4 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm text-gray-900">{candidateData.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="size-4 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm text-gray-900">{candidateData.email || 'Not available'}</p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              {candidateData.skills && candidateData.skills.length > 0 && (
                <div className="mb-6">
                  <p className="text-xs text-gray-500 mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {candidateData.skills.slice(0, 10).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700 text-xs px-2 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Profile Summary */}
              {candidateData.profileSummary && candidateData.profileSummary.length > 0 && (
                <div className="bg-green-600 rounded-lg p-4 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="size-5" />
                    <span className="text-sm">Profile Summary</span>
                    <Badge className="bg-white/20 text-white text-[10px] px-2 py-0">AI-generated</Badge>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {candidateData.profileSummary.slice(0, 4).map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-200">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                className="border-green-600 text-green-600 hover:bg-green-50 w-30"
                onClick={() => setCurrentStep('upload')}
              >
                Cancel
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white w-30"
                onClick={handleSaveToDatabase}
              >
                Submit
                <ChevronRight className="size-3.5 ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {currentStep === 'success' && candidateData && (
          <Card className="w-full max-w-3xl p-6 border border-gray-200 rounded-xl bg-[#f6f8f9]">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="size-12 rounded-lg bg-green-600 flex items-center justify-center">
                <CheckCircle className="size-8 text-white" />
              </div>
              <div>
                <h2 className="text-lg text-gray-800">Profile Saved to Your Talent Pool</h2>
                <p className="text-sm text-gray-600 mt-1">Uploaded profile is now part of your talent pool. You can view, search, or edit it anytime.</p>
              </div>
            </div>

            <div className="h-px bg-gray-300 opacity-20 my-6" />

            {/* Saved Candidate Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base text-gray-900">{candidateData.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{candidateData.title}</p>
                </div>
                <Button 
                  size="sm" 
                  className="bg-green-50 text-green-600 border border-green-100 hover:bg-green-100"
                  onClick={() => {/* Navigate to candidate detail */}}
                >
                  View Details
                  <ChevronRight className="size-4 ml-1" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                className="border-green-600 text-green-600 hover:bg-green-50 w-30"
                onClick={onBack}
              >
                Back to Home
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white w-30"
                onClick={handleAddMore}
              >
                Add More
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
