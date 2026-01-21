import React, { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Upload, FileText, CheckCircle2, Loader2, X, ArrowLeft, Users, Edit, Save, Linkedin, Github } from 'lucide-react';
import { uploadResume, saveResumeData, type UploadResumeResponse, type SaveResumeDataRequest } from '../api/cv.api';
import { Alert, AlertDescription } from './ui/alert';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { incrementCandidateCount } from '../utils/candidateCount';

type Step = 'upload' | 'review' | 'complete';

interface CandidateData {
  candidateId: string;
  fileName: string;
  extractedData: UploadResumeResponse['extracted_data'];
  formData: Partial<SaveResumeDataRequest>;
}

export function UploadCandidates() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<CandidateData[]>([]);
  const [selectedCandidateIndex, setSelectedCandidateIndex] = useState<number>(0);
  const [editMode, setEditMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    // Validate file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a PDF, DOC, or DOCX file');
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setSelectedFile(file);
    setError(null);
    setUploading(true);

    try {
      const response = await uploadResume(file);
      
      // Validate that candidate_id exists
      if (!response.candidate_id) {
        console.error('❌ [UploadCandidates] Missing candidate_id in response:', response);
        setError('Server error: Candidate ID not received. Please try uploading again.');
        setUploading(false);
        return;
      }
      
      // Initialize form data with extracted data
      const formData: Partial<SaveResumeDataRequest> = {
        name: response.extracted_data.name || '',
        title: response.extracted_data.title || '',
        bio: response.extracted_data.bio || '',
        current_company: response.extracted_data.current_company || '',
        emails: response.extracted_data.emails || [],
        skills: response.extracted_data.skills || [],
        experience: response.extracted_data.experience ?? 0,
        location_city: response.extracted_data.location_city || '',
        location_country: response.extracted_data.location_country || '',
        availability: response.extracted_data.availability || '',
        workPreference: response.extracted_data.workPreference || '',
        expectedSalary: response.extracted_data.expectedSalary != null 
          ? response.extracted_data.expectedSalary.toString() 
          : '',
        noticePeriod: response.extracted_data.noticePeriod || null,
        profileConfidence: response.extracted_data.profileConfidence != null
          ? response.extracted_data.profileConfidence.toString().replace(/%/g, '') + '%'
          : '0%',
        languages: response.extracted_data.languages || [],
        portfolio: response.extracted_data.portfolio || {},
        profile_image: response.extracted_data.profile_image || '',
        education: response.extracted_data.education || {
          highest_degree: '',
          degrees: [],
          schools: [],
          graduation_year: null,
        },
      };

      const candidateData: CandidateData = {
        candidateId: response.candidate_id,
        fileName: response.file_name || file.name,
        extractedData: response.extracted_data,
        formData,
      };

      setCandidates([...candidates, candidateData]);
      setSelectedCandidateIndex(candidates.length);
      setCurrentStep('review');
    } catch (err) {
      let errorMessage = 'Failed to upload resume';
      if (err instanceof Error) {
        errorMessage = err.message;
        // Make backend errors more user-friendly
        if (errorMessage.includes('No such file or directory') || errorMessage.includes('static')) {
          errorMessage = 'Server configuration error: Upload directory not found. Please contact the administrator.';
        } else if (errorMessage.includes('500') || errorMessage.includes('INTERNAL SERVER ERROR')) {
          errorMessage = 'Server error occurred. Please try again or contact support if the issue persists.';
        }
      }
      setError(errorMessage);
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
      setSelectedFile(null);
    }
  };

  const handleSaveCandidate = async () => {
    if (candidates.length === 0 || selectedCandidateIndex < 0) return;

    const candidate = candidates[selectedCandidateIndex];
    if (!candidate.formData.name || !candidate.formData.title) {
      setError('Name and Role are required fields');
      return;
    }

    // Validate candidateId exists
    if (!candidate.candidateId) {
      setError('Error: Candidate ID is missing. Please upload the resume again.');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      // Prepare portfolio for API (convert object to string if needed, or keep as object)
      const saveData: SaveResumeDataRequest = {
        ...candidate.formData,
        portfolio: typeof candidate.formData.portfolio === 'object' && candidate.formData.portfolio !== null
          ? candidate.formData.portfolio
          : (candidate.formData.portfolio || ''),
      } as SaveResumeDataRequest;
      
      await saveResumeData(candidate.candidateId, saveData);
      // Increment total candidates count
      incrementCandidateCount();
      setCurrentStep('complete');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save candidate');
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveCandidate = (index: number) => {
    const newCandidates = candidates.filter((_, i) => i !== index);
    setCandidates(newCandidates);
    if (newCandidates.length === 0) {
      setCurrentStep('upload');
      setSelectedCandidateIndex(0);
    } else if (selectedCandidateIndex >= newCandidates.length) {
      setSelectedCandidateIndex(newCandidates.length - 1);
    }
  };

  const handleFormDataChange = (field: keyof SaveResumeDataRequest, value: any) => {
    if (candidates.length === 0) return;
    const updatedCandidates = [...candidates];
    updatedCandidates[selectedCandidateIndex] = {
      ...updatedCandidates[selectedCandidateIndex],
      formData: {
        ...updatedCandidates[selectedCandidateIndex].formData,
        [field]: value,
      },
    };
    setCandidates(updatedCandidates);
  };

  const selectedCandidate = candidates[selectedCandidateIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4">
            {/* Step 1: Upload Resume */}
            <div className="flex items-center">
              <div className={`flex items-center justify-center size-10 rounded-full border-2 ${
                currentStep === 'upload' 
                  ? 'bg-primary border-primary text-white' 
                  : currentStep === 'review' || currentStep === 'complete'
                  ? 'bg-primary border-primary text-white'
                  : 'bg-white border-gray-300 text-gray-400'
              }`}>
                {currentStep === 'review' || currentStep === 'complete' ? (
                  <CheckCircle2 className="size-5" />
                ) : (
                  <span className="text-sm font-semibold">1</span>
                )}
              </div>
              <span className={`ml-2 text-sm font-medium ${
                currentStep === 'upload' || currentStep === 'review' || currentStep === 'complete'
                  ? 'text-gray-900'
                  : 'text-gray-400'
              }`}>
                Upload Resume
              </span>
            </div>

            {/* Connector Line */}
            <div className={`h-0.5 w-16 ${
              currentStep === 'review' || currentStep === 'complete'
                ? 'bg-primary'
                : 'bg-gray-300'
            }`} />

            {/* Step 2: Verify Details */}
            <div className="flex items-center">
              <div className={`flex items-center justify-center size-10 rounded-full border-2 ${
                currentStep === 'review'
                  ? 'bg-primary border-primary text-white'
                  : currentStep === 'complete'
                  ? 'bg-primary border-primary text-white'
                  : 'bg-white border-gray-300 text-gray-400'
              }`}>
                {currentStep === 'complete' ? (
                  <CheckCircle2 className="size-5" />
                ) : (
                  <span className="text-sm font-semibold">2</span>
                )}
              </div>
              <span className={`ml-2 text-sm font-medium ${
                currentStep === 'review' || currentStep === 'complete'
                  ? 'text-gray-900'
                  : 'text-gray-400'
              }`}>
                Verify Details
              </span>
      </div>

            {/* Connector Line */}
            <div className={`h-0.5 w-16 ${
              currentStep === 'complete'
                ? 'bg-primary'
                : 'bg-gray-300'
            }`} />

            {/* Step 3: Add to Database */}
            <div className="flex items-center">
              <div className={`flex items-center justify-center size-10 rounded-full border-2 ${
                currentStep === 'complete'
                  ? 'bg-primary border-primary text-white'
                  : 'bg-white border-gray-300 text-gray-400'
              }`}>
                <span className="text-sm font-semibold">3</span>
              </div>
              <span className={`ml-2 text-sm font-medium ${
                currentStep === 'complete'
                  ? 'text-gray-900'
                  : 'text-gray-400'
              }`}>
                Add to Database
              </span>
            </div>
                  </div>
                  </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Step 1: Upload Resume */}
        {currentStep === 'upload' && (
          <div className="space-y-6">
            {/* Banner */}
            <Card className="p-6 bg-primary/5 border-primary/20 border-dashed">
              <div className="flex items-start gap-4">
                <div className="size-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="size-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Build Your Talent Database with AI-Powered Intelligence
                  </h2>
                  <p className="text-gray-700">
                    Upload resumes individually or in bulk — our advanced AI instantly extracts candidate information, skills, and experience.
                  </p>
                  </div>
                </div>
              </Card>

            {/* Upload Section */}
            <Card className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to get started?</h3>
                <p className="text-gray-600">Upload your first resume to begin the automated extraction process</p>
              </div>

              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                  isDragging
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-300 hover:border-primary/50 hover:bg-gray-50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileInput}
                  className="hidden"
                />

                <div className="flex flex-col items-center gap-4">
                  <div className="size-16 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Upload className="size-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium mb-1">Drag & drop your resume here</p>
                    <p className="text-sm text-gray-600 mb-4">or click anywhere in this area to browse</p>
                    <p className="text-xs text-gray-500 mb-2">Supports PDF, DOC, DOCX</p>
                    <p className="text-xs text-gray-500">Maximum 10MB per file</p>
                  </div>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-primary hover:bg-primary/90"
                    disabled={uploading}
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="size-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <FileText className="size-4 mr-2" />
                        Choose Files
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Footer Actions */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => navigate('/dashboard')}>
                Cancel
              </Button>
              <Button
                variant="outline"
                disabled={candidates.length === 0}
                onClick={() => candidates.length > 0 && setCurrentStep('review')}
              >
                Continue to Review
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Review & Verify */}
        {currentStep === 'review' && selectedCandidate && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel: Review & Verify */}
            <div className="lg:col-span-1">
            <Card className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Verify</h2>
                <p className="text-sm text-gray-600 mb-6">
                Ensylons AI Engine has intelligently extracted candidate information from the uploaded resumes. Please review each profile carefully and make any necessary adjustments before saving to your talent pool.
                </p>

                <div className="space-y-3">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    {candidates.length} {candidates.length === 1 ? 'CANDIDATE' : 'CANDIDATES'} FOUND
              </div>
                  {candidates.map((candidate, index) => (
                  <div
                      key={candidate.candidateId || `candidate-${index}`}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        index === selectedCandidateIndex
                          ? 'bg-primary/5 border-primary/30'
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => {
                        setSelectedCandidateIndex(index);
                        setEditMode(false);
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{candidate.formData.name || 'Unknown'}</p>
                          <p className="text-sm text-gray-600">{candidate.formData.title || 'No title'}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveCandidate(index);
                          }}
                        >
                          <X className="size-4" />
                        </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            </div>

            {/* Right Panel: Candidate Profile */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Candidate Profile</h2>
                    <p className="text-sm text-gray-600">AI-extracted information ready for review</p>
              </div>
                  {!editMode && (
                <Button
                      variant="outline"
                      onClick={() => setEditMode(true)}
                      className="border-primary text-primary hover:bg-primary/5"
                >
                      <Edit className="size-4 mr-2" />
                      Edit Details
                </Button>
                  )}
              </div>

                <div className="space-y-6">
                  {/* Profile Image */}
                  {(editMode || selectedCandidate.formData.profile_image) && (
                    <div className="flex items-center gap-4 pb-4 border-b">
                      <Avatar className="size-20 border-2 border-gray-200">
                        {selectedCandidate.formData.profile_image ? (
                          <AvatarImage 
                            src={selectedCandidate.formData.profile_image} 
                            alt={selectedCandidate.formData.name || 'Candidate'}
                          />
                        ) : null}
                        <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                          {selectedCandidate.formData.name?.charAt(0).toUpperCase() || 'C'}
                        </AvatarFallback>
                      </Avatar>
                      {editMode && (
                        <div className="flex-1">
                          <Label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
                            PROFILE IMAGE (Base64)
                          </Label>
                          <Textarea
                            value={selectedCandidate.formData.profile_image || ''}
                            onChange={(e) => handleFormDataChange('profile_image', e.target.value)}
                            placeholder="Base64 image string (data:image/...;base64,...)"
                            rows={3}
                            className="text-base font-medium font-mono text-xs"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Profile image in base64 format
              </p>
            </div>
                      )}
                    </div>
                  )}
                  
                  {/* Basic Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
                        CANDIDATE NAME <span className="text-red-500">*</span>
                      </Label>
                      {editMode ? (
                        <Input
                          value={selectedCandidate.formData.name || ''}
                          onChange={(e) => handleFormDataChange('name', e.target.value)}
                          className="text-base font-medium"
                        />
                      ) : (
                        <p className="text-base font-medium text-gray-900 mt-1">{selectedCandidate.formData.name || 'N/A'}</p>
                      )}
                </div>
                    <div>
                      <Label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
                        ROLE <span className="text-red-500">*</span>
                      </Label>
                      {editMode ? (
                        <Input
                          value={selectedCandidate.formData.title || ''}
                          onChange={(e) => handleFormDataChange('title', e.target.value)}
                          className="text-base font-medium"
                        />
                      ) : (
                        <p className="text-base font-medium text-gray-900 mt-1">{selectedCandidate.formData.title || 'N/A'}</p>
                      )}
                </div>
                    <div>
                      <Label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
                        EXPERIENCE <span className="text-red-500">*</span>
                      </Label>
                      {editMode ? (
                        <Input
                          type="number"
                          value={selectedCandidate.formData.experience || ''}
                          onChange={(e) => handleFormDataChange('experience', parseInt(e.target.value) || 0)}
                          className="text-base font-medium"
                        />
                      ) : (
                        <p className="text-base font-medium text-gray-900 mt-1">{selectedCandidate.formData.experience || 0} years</p>
                      )}
                </div>
                    <div>
                      <Label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
                        CURRENT COMPANY <span className="text-red-500">*</span>
                      </Label>
                      {editMode ? (
                        <Input
                          value={selectedCandidate.formData.current_company || ''}
                          onChange={(e) => handleFormDataChange('current_company', e.target.value)}
                          className="text-base font-medium"
                        />
                      ) : (
                        <p className="text-base font-medium text-gray-900 mt-1">{selectedCandidate.formData.current_company || 'N/A'}</p>
                      )}
                </div>
                    <div>
                      <Label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
                        LOCATION <span className="text-red-500">*</span>
                      </Label>
                      {editMode ? (
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            placeholder="City"
                            value={selectedCandidate.formData.location_city || ''}
                            onChange={(e) => handleFormDataChange('location_city', e.target.value)}
                            className="text-base font-medium"
                          />
                          <Input
                            placeholder="Country"
                            value={selectedCandidate.formData.location_country || ''}
                            onChange={(e) => handleFormDataChange('location_country', e.target.value)}
                            className="text-base font-medium"
                          />
              </div>
                      ) : (
                        <p className="text-base font-medium text-gray-900 mt-1">
                          {selectedCandidate.formData.location_city || 'N/A'}, {selectedCandidate.formData.location_country || 'N/A'}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
                        EMAIL <span className="text-red-500">*</span>
                      </Label>
                      {editMode ? (
                        <Input
                          type="email"
                          value={selectedCandidate.formData.emails?.[0] || ''}
                          onChange={(e) => handleFormDataChange('emails', [e.target.value])}
                          className="text-base font-medium"
                        />
                      ) : (
                        <p className="text-base font-medium text-gray-900 mt-1">{selectedCandidate.formData.emails?.[0] || 'N/A'}</p>
                      )}
                  </div>
                    <div>
                      <Label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
                        EDUCATION <span className="text-red-500">*</span>
                      </Label>
                      {editMode ? (
                        <Input
                          value={selectedCandidate.formData.education?.degrees?.[0] || ''}
                          onChange={(e) => handleFormDataChange('education', {
                            ...selectedCandidate.formData.education,
                            degrees: [e.target.value],
                            highest_degree: selectedCandidate.formData.education?.highest_degree || '',
                            schools: selectedCandidate.formData.education?.schools || [],
                            graduation_year: selectedCandidate.formData.education?.graduation_year || null,
                          })}
                          className="text-base font-medium"
                        />
                      ) : (
                        <p className="text-base font-medium text-gray-900 mt-1">
                          {selectedCandidate.formData.education?.degrees?.[0] || 'N/A'}
                          {selectedCandidate.formData.education?.schools?.[0] && `, ${selectedCandidate.formData.education.schools[0]}`}
                          {selectedCandidate.formData.education?.graduation_year && ` (${selectedCandidate.formData.education.graduation_year})`}
                        </p>
                      )}
                </div>
                    {(() => {
                      // Helper function to check if portfolio has content
                      const hasPortfolioContent = (portfolio: any): boolean => {
                        if (!portfolio) return false;
                        if (typeof portfolio === 'string' && portfolio.trim() === '') return false;
                        if (typeof portfolio === 'object') {
                          // Check if it's an empty object
                          if (Object.keys(portfolio).length === 0) return false;
                          // Check if all values are empty/null/undefined
                          return Object.values(portfolio).some(value => {
                            if (value === null || value === undefined) return false;
                            if (typeof value === 'string' && value.trim() === '') return false;
                            return true;
                          });
                        }
                        return true;
                      };

                      const portfolio = selectedCandidate.formData.portfolio;
                      const hasContent = hasPortfolioContent(portfolio);

                      // Only show portfolio if it has content or we're in edit mode
                      if (!editMode && !hasContent) return null;

                      return (
                        <div>
                          <Label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
                            PORTFOLIO <span className="text-red-500">*</span>
                          </Label>
                          {editMode ? (
                            <Textarea
                              value={(() => {
                                const portfolio = selectedCandidate.formData.portfolio;
                                if (typeof portfolio === 'string') {
                                  try {
                                    // Try to parse if it's JSON string
                                    const parsed = JSON.parse(portfolio);
                                    return typeof parsed === 'object' ? JSON.stringify(parsed, null, 2) : portfolio;
                                  } catch {
                                    return portfolio;
                                  }
                                }
                                return typeof portfolio === 'object' ? JSON.stringify(portfolio, null, 2) : '';
                              })()}
                              onChange={(e) => {
                                try {
                                  const parsed = JSON.parse(e.target.value);
                                  handleFormDataChange('portfolio', parsed);
                                } catch {
                                  handleFormDataChange('portfolio', e.target.value);
                                }
                              }}
                              rows={4}
                              className="text-base font-medium font-mono text-sm"
                              placeholder="Enter portfolio as JSON object or plain text"
                            />
                          ) : (
                            <div className="mt-1">
                              {(() => {
                                const portfolio = selectedCandidate.formData.portfolio;
                                if (!portfolio) return null;
                                
                                // Try to parse if it's a JSON string
                                let portfolioObj: Record<string, any> | null = null;
                                if (typeof portfolio === 'string') {
                                  try {
                                    portfolioObj = JSON.parse(portfolio);
                                  } catch {
                                    // If not valid JSON, display as text if not empty
                                    if (portfolio.trim() === '') return null;
                                    return <p className="text-base font-medium text-gray-900">{portfolio}</p>;
                                  }
                                } else if (typeof portfolio === 'object') {
                                  portfolioObj = portfolio;
                                }
                                
                                // Display as formatted object with links if available
                                if (portfolioObj && typeof portfolioObj === 'object') {
                                  const entries = Object.entries(portfolioObj).filter(([key, value]) => {
                                    // Filter out empty values
                                    if (value === null || value === undefined) return false;
                                    if (typeof value === 'string' && value.trim() === '') return false;
                                    return true;
                                  });

                                  if (entries.length === 0) return null;

                                  return (
                                    <div className="space-y-2">
                                      {entries.map(([key, value]) => (
                                        <div key={key} className="text-sm">
                                          <span className="font-semibold text-gray-700 capitalize">{key.replace(/_/g, ' ')}:</span>{' '}
                                          {typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://')) ? (
                                            <a href={value} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                              {value}
                                            </a>
                                          ) : (
                                            <span className="text-gray-900">{String(value)}</span>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  );
                                }
                                
                                // If it's a non-empty string, display it
                                if (typeof portfolio === 'string' && portfolio.trim() !== '') {
                                  return <p className="text-base font-medium text-gray-900">{portfolio}</p>;
                                }
                                
                                return null;
                              })()}
                            </div>
                          )}
                  </div>
                      );
                    })()}
                    {(() => {
                      // Extract LinkedIn and GitHub from portfolio if they exist
                      const portfolio = selectedCandidate.formData.portfolio;
                      let linkedIn: string | null = null;
                      let github: string | null = null;

                      if (portfolio && typeof portfolio === 'object') {
                        const portfolioObj = portfolio as Record<string, any>;
                        // Check for various possible keys
                        linkedIn = portfolioObj.linkedin || portfolioObj.linkedIn || portfolioObj['linked-in'] || null;
                        github = portfolioObj.github || portfolioObj.GitHub || portfolioObj['git-hub'] || null;
                      } else if (portfolio && typeof portfolio === 'string') {
                        try {
                          const parsed = JSON.parse(portfolio);
                          if (typeof parsed === 'object') {
                            linkedIn = parsed.linkedin || parsed.linkedIn || parsed['linked-in'] || null;
                            github = parsed.github || parsed.GitHub || parsed['git-hub'] || null;
                          }
                        } catch {
                          // Not JSON, skip
                        }
                      }

                      // Only show if at least one exists
                      if (!linkedIn && !github) return null;

                      return (
                        <div>
                          <Label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
                            SOCIAL LINKS
                          </Label>
                          <div className="flex flex-wrap gap-3 mt-1">
                            {linkedIn && (
                              <a
                                href={linkedIn.startsWith('http') ? linkedIn : `https://${linkedIn}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                              >
                                <Linkedin className="size-4" />
                                <span className="text-sm font-medium">LinkedIn</span>
                              </a>
                            )}
                            {github && (
                              <a
                                href={github.startsWith('http') ? github : `https://${github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                <Github className="size-4" />
                                <span className="text-sm font-medium">GitHub</span>
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                    {(editMode || selectedCandidate.formData.availability) && (
                      <div>
                        <Label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
                          AVAILABILITY <span className="text-red-500">*</span>
                        </Label>
                        {editMode ? (
                          <Select
                            value={selectedCandidate.formData.availability || ''}
                            onValueChange={(value) => handleFormDataChange('availability', value)}
                          >
                            <SelectTrigger className="text-base font-medium">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Actively Looking">Actively Looking</SelectItem>
                              <SelectItem value="Open to Offers">Open to Offers</SelectItem>
                              <SelectItem value="Not Looking">Not Looking</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="text-base font-medium text-gray-900 mt-1">{selectedCandidate.formData.availability || 'N/A'}</p>
                        )}
                  </div>
                    )}
                    {(editMode || selectedCandidate.formData.workPreference) && (
                      <div>
                        <Label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
                          WORK PREFERENCE <span className="text-red-500">*</span>
                        </Label>
                        {editMode ? (
                          <Select
                            value={selectedCandidate.formData.workPreference || ''}
                            onValueChange={(value) => handleFormDataChange('workPreference', value)}
                          >
                            <SelectTrigger className="text-base font-medium">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="On-site">On-site</SelectItem>
                              <SelectItem value="Remote">Remote</SelectItem>
                              <SelectItem value="Hybrid">Hybrid</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="text-base font-medium text-gray-900 mt-1">{selectedCandidate.formData.workPreference || 'N/A'}</p>
                        )}
                </div>
                    )}
                    {(editMode || (selectedCandidate.formData.languages && selectedCandidate.formData.languages.length > 0)) && (
                      <div>
                        <Label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
                          LANGUAGES <span className="text-red-500">*</span>
                        </Label>
                        {editMode ? (
                          <Input
                            value={selectedCandidate.formData.languages?.join(', ') || ''}
                            onChange={(e) => handleFormDataChange('languages', e.target.value.split(',').map(l => l.trim()))}
                            className="text-base font-medium"
                          />
                        ) : (
                          <p className="text-base font-medium text-gray-900 mt-1">{selectedCandidate.formData.languages?.join(', ') || 'N/A'}</p>
                        )}
                  </div>
                    )}
                    <div>
                      <Label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
                        NOTICE PERIOD <span className="text-red-500">*</span>
                      </Label>
                      {editMode ? (
                        <Input
                          value={selectedCandidate.formData.noticePeriod || ''}
                          onChange={(e) => handleFormDataChange('noticePeriod', e.target.value)}
                          className="text-base font-medium"
                        />
                      ) : (
                        <p className="text-base font-medium text-gray-900 mt-1">{selectedCandidate.formData.noticePeriod || 'N/A'}</p>
                      )}
                  </div>
                    {(editMode || selectedCandidate.formData.expectedSalary) && (
                      <div>
                        <Label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
                          EXPECTED SALARY <span className="text-red-500">*</span>
                        </Label>
                        {editMode ? (
                          <Input
                            value={selectedCandidate.formData.expectedSalary || ''}
                            onChange={(e) => handleFormDataChange('expectedSalary', e.target.value)}
                            className="text-base font-medium"
                          />
                        ) : (
                          <p className="text-base font-medium text-gray-900 mt-1">{selectedCandidate.formData.expectedSalary || 'N/A'}</p>
                        )}
                  </div>
                    )}
                    {(editMode || selectedCandidate.formData.profileConfidence) && (
                      <div>
                        <Label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
                          PROFILE CONFIDENCE <span className="text-red-500">*</span>
                        </Label>
                        <p className="text-base font-medium text-gray-900 mt-1">{selectedCandidate.formData.profileConfidence || '0%'} (unverified)</p>
                  </div>
                    )}
                </div>

                  {/* Skills */}
                  <div>
                    <Label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
                      Core Skills & Expertise <span className="text-red-500">*</span>
                    </Label>
                    {editMode ? (
                      <Textarea
                        value={selectedCandidate.formData.skills?.join(', ') || ''}
                        onChange={(e) => handleFormDataChange('skills', e.target.value.split(',').map(s => s.trim()))}
                        placeholder="Enter skills separated by commas"
                        className="text-base font-medium"
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedCandidate.formData.skills?.map((skill, index) => (
                          <Badge key={index} className="bg-primary/10 text-primary border-primary/20 text-sm font-medium">
                        {skill}
                      </Badge>
                    ))}
                      </div>
                    )}
                  </div>

                  {/* AI-Generated Profile Summary - Only show if bio exists or in edit mode */}
                  {(editMode || (selectedCandidate.formData.bio && selectedCandidate.formData.bio.trim() !== '')) && (
                    <Card className="p-6 bg-primary/5 border-primary/20">
                      <div className="flex items-center gap-2 mb-4">
                        <Users className="size-5 text-primary" />
                        <h3 className="text-lg font-semibold text-gray-900">AI-Generated Profile Summary</h3>
                      </div>
                      <div>
                        <Label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
                          BIO <span className="text-red-500">*</span>
                        </Label>
                        {editMode ? (
                          <Textarea
                            value={selectedCandidate.formData.bio || ''}
                            onChange={(e) => handleFormDataChange('bio', e.target.value)}
                            rows={4}
                            className="text-base font-medium"
                          />
                        ) : (
                          <p className="text-base font-medium text-gray-900 mt-1 whitespace-pre-wrap">{selectedCandidate.formData.bio}</p>
                        )}
                      </div>
                      <div className="mt-4 text-right">
                        <p className="text-xs text-gray-500">Powered by ensylon</p>
                </div>
                    </Card>
                  )}
              </div>

                {/* Footer Actions */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button variant="outline" onClick={() => navigate('/dashboard')}>
                    Cancel
                  </Button>
                  <div className="flex gap-3">
                    {editMode && (
                      <Button
                        variant="outline"
                        onClick={() => setEditMode(false)}
                      >
                        Cancel Edit
                      </Button>
                    )}
                    <Button
                      onClick={editMode ? () => setEditMode(false) : handleSaveCandidate}
                      disabled={saving}
                      className="bg-primary hover:bg-primary/90"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="size-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : editMode ? (
                        <>
                          <Save className="size-4 mr-2" />
                          Save Changes
                        </>
                      ) : (
                        <>
                          Save to Database
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Step 3: Complete */}
        {currentStep === 'complete' && (
          <div className="text-center py-12">
            <Card className="p-12 max-w-2xl mx-auto">
              <div className="flex flex-col items-center gap-6">
                <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="size-10 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Candidate Added Successfully!</h2>
                  <p className="text-gray-600">
                    The candidate has been saved to your database and is now available for search and matching.
                  </p>
                </div>
                <div className="flex gap-4 mt-4">
              <Button
                variant="outline"
                    onClick={() => {
                      setCandidates([]);
                      setCurrentStep('upload');
                      setSelectedCandidateIndex(0);
                    }}
              >
                    Add Another Candidate
              </Button>
              <Button
                    onClick={() => navigate('/candidates')}
                    className="bg-primary hover:bg-primary/90"
              >
                    View Candidates
              </Button>
                </div>
              </div>
            </Card>
          </div>
      )}
      </div>
    </div>
  );
}
