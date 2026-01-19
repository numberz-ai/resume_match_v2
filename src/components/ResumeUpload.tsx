import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { uploadResume, saveResumeData, type UploadResumeResponse, type SaveResumeDataRequest } from '../api';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, X, User, Briefcase, MapPin, Mail, DollarSign, Calendar } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface ResumeUploadProps {
  onUploadSuccess?: (candidateId: string, data: UploadResumeResponse) => void;
  onClose?: () => void;
}

export function ResumeUpload({ onUploadSuccess, onClose }: ResumeUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResponse, setUploadResponse] = useState<UploadResumeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Editable form state
  const [formData, setFormData] = useState<Partial<SaveResumeDataRequest>>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      if (selectedFile.type !== 'application/pdf') {
        setError('Please upload a PDF file');
        return;
      }
      setFile(selectedFile);
      setError(null);
      setUploadResponse(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const response = await uploadResume(file);
      setUploadResponse(response);
      
      // Initialize form data with extracted data
      setFormData({
        name: response.extracted_data.name,
        title: response.extracted_data.title,
        bio: response.extracted_data.bio,
        current_company: response.extracted_data.current_company,
        emails: response.extracted_data.emails,
        skills: response.extracted_data.skills,
        experience: response.extracted_data.experience,
        location_city: response.extracted_data.location_city,
        location_country: response.extracted_data.location_country,
        availability: response.extracted_data.availability,
        workPreference: response.extracted_data.workPreference,
        expectedSalary: response.extracted_data.expectedSalary.toString(),
        noticePeriod: response.extracted_data.noticePeriod,
        profileConfidence: response.extracted_data.profileConfidence.toString() + '%',
        languages: response.extracted_data.languages,
        portfolio: response.extracted_data.portfolio,
        education: response.extracted_data.education,
      });

      if (onUploadSuccess) {
        onUploadSuccess(response.candidate_id, response);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload resume');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!uploadResponse || !formData) return;

    setSaving(true);
    setError(null);

    try {
      await saveResumeData(uploadResponse.candidate_id, formData as SaveResumeDataRequest);
      setEditMode(false);
      // Show success message or close modal
      if (onClose) {
        onClose();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save resume data');
    } finally {
      setSaving(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      setError(null);
      setUploadResponse(null);
    } else {
      setError('Please upload a PDF file');
    }
  };

  const resetUpload = () => {
    setFile(null);
    setUploadResponse(null);
    setError(null);
    setFormData({});
    setEditMode(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Upload Resume</h2>
          <p className="text-sm text-gray-600">Upload a candidate's resume to extract and save their information</p>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="size-5" />
          </Button>
        )}
      </div>

      {/* Upload Section */}
      {!uploadResponse && (
        <Card className="p-8">
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-green-400 transition-colors cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            
            <div className="flex flex-col items-center gap-4">
              {file ? (
                <>
                  <FileText className="size-16 text-green-600" />
                  <div>
                    <p className="text-gray-900 mb-1">{file.name}</p>
                    <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpload();
                      }}
                      disabled={uploading}
                      className="bg-green-700 hover:bg-green-800"
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="size-4 mr-2 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="size-4 mr-2" />
                          Upload Resume
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        resetUpload();
                      }}
                    >
                      Change File
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Upload className="size-16 text-gray-400" />
                  <div>
                    <p className="text-gray-900 mb-1">Drop your PDF resume here or click to browse</p>
                    <p className="text-sm text-gray-500">Maximum file size: 10MB</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Success & Extracted Data */}
      {uploadResponse && (
        <div className="space-y-6">
          {/* Success Message */}
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="size-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Resume uploaded successfully! Candidate ID: {uploadResponse.candidate_id}
            </AlertDescription>
          </Alert>

          {/* Extracted Data Card */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-gray-900">Extracted Information</h3>
              <div className="flex gap-2">
                {!editMode ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditMode(true)}
                      className="border-green-600 text-green-700 hover:bg-green-50"
                    >
                      Edit Details
                    </Button>
                    <Button
                      size="sm"
                      onClick={resetUpload}
                      className="bg-green-700 hover:bg-green-800"
                    >
                      Upload Another
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSave}
                      disabled={saving}
                      className="bg-green-700 hover:bg-green-800"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="size-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                    <User className="size-4" />
                    Full Name
                  </Label>
                  {editMode ? (
                    <Input
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  ) : (
                    <p className="text-gray-900">{uploadResponse.extracted_data.name}</p>
                  )}
                </div>

                <div>
                  <Label className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                    <Briefcase className="size-4" />
                    Job Title
                  </Label>
                  {editMode ? (
                    <Input
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  ) : (
                    <p className="text-gray-900">{uploadResponse.extracted_data.title}</p>
                  )}
                </div>

                <div>
                  <Label className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                    <MapPin className="size-4" />
                    Location
                  </Label>
                  <p className="text-gray-900">
                    {uploadResponse.extracted_data.location_city}, {uploadResponse.extracted_data.location_country}
                  </p>
                </div>

                <div>
                  <Label className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                    <Mail className="size-4" />
                    Email
                  </Label>
                  <p className="text-gray-900">{uploadResponse.extracted_data.emails[0] || 'N/A'}</p>
                </div>
              </div>

              {/* Professional Details */}
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                    <Briefcase className="size-4" />
                    Current Company
                  </Label>
                  <p className="text-gray-900">{uploadResponse.extracted_data.current_company || 'N/A'}</p>
                </div>

                <div>
                  <Label className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                    <Calendar className="size-4" />
                    Experience
                  </Label>
                  <p className="text-gray-900">{uploadResponse.extracted_data.experience} years</p>
                </div>

                <div>
                  <Label className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                    <DollarSign className="size-4" />
                    Availability
                  </Label>
                  <Badge className="bg-green-100 text-green-700">
                    {uploadResponse.extracted_data.availability}
                  </Badge>
                </div>

                <div>
                  <Label className="text-sm text-gray-600 mb-2 block">Work Preference</Label>
                  <Badge variant="outline">
                    {uploadResponse.extracted_data.workPreference}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-6">
              <Label className="text-sm text-gray-600 mb-3 block">Skills</Label>
              <div className="flex flex-wrap gap-2">
                {uploadResponse.extracted_data.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-green-50 text-green-700">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Education */}
            {uploadResponse.extracted_data.education && (
              <div className="mt-6">
                <Label className="text-sm text-gray-600 mb-3 block">Education</Label>
                <div className="space-y-2">
                  <p className="text-gray-900">{uploadResponse.extracted_data.education.highest_degree}</p>
                  {uploadResponse.extracted_data.education.schools.map((school, index) => (
                    <p key={index} className="text-sm text-gray-600">
                      {uploadResponse.extracted_data.education.degrees[index]} - {school}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
