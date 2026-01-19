import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '../components/Dashboard';
import { CandidateList } from '../components/CandidateListRefactored';
import { CandidateDetail } from '../components/CandidateDetail';
import { Settings } from '../components/Settings';
import { BiasAudit } from '../components/BiasAudit';
import { CalendarView } from '../components/CalendarView';
import { AnalyticsView } from '../components/AnalyticsView';
import { PredictiveAnalytics } from '../components/PredictiveAnalytics';
import { NotificationsView } from '../components/NotificationsView';
import { CommunicationView } from '../components/CommunicationView';
import { JobsListView } from '../components/JobsListView';
import { JobDetailView } from '../components/JobDetailView';
import { PostJobView } from '../components/PostJobView';
import { JobInterviewView } from '../components/JobInterviewView';
import { CandidateInterviewNotes } from '../components/CandidateInterviewNotes';
import { UploadCandidates } from '../components/UploadCandidates';
import { useNavigate, useParams } from 'react-router-dom';

// Route Wrappers with proper param handling
function CandidateDetailRoute() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  return <CandidateDetail candidateId={id || ''} onClose={() => navigate('/candidates')} />;
}

function JobDetailRoute() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  return (
    <JobDetailView
      jobId={id || ''}
      onBack={() => navigate('/jobs')}
      onSelectCandidate={(candidateId) => navigate(`/candidates/${candidateId}`)}
      onOpenCommunication={() => navigate('/communication')}
      onOpenInterviews={(jobId) => navigate(`/jobs/${jobId}/interviews`)}
      onOpenCandidateInterviews={(candidateId, jobId) => navigate(`/jobs/${jobId}/interview/${candidateId}`)}
    />
  );
}

function JobInterviewRoute() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  return (
    <JobInterviewView
      jobId={jobId || ''}
      onBack={() => navigate(`/jobs/${jobId}`)}
      onSelectCandidate={(candidateId) => navigate(`/candidates/${candidateId}`)}
    />
  );
}

function CandidateInterviewRoute() {
  const { jobId, candidateId } = useParams<{ jobId: string; candidateId: string }>();
  const navigate = useNavigate();
  return (
    <CandidateInterviewNotes
      candidateId={candidateId || ''}
      jobId={jobId || ''}
      onBack={() => navigate(`/jobs/${jobId}`)}
      onOpenCommunication={() => navigate('/communication')}
    />
  );
}

export function AppRoutes() {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* Dashboard */}
      <Route path="/" element={<Dashboard onNavigateToCandidates={() => navigate('/candidates')} />} />
      <Route path="/dashboard" element={<Navigate to="/" replace />} />

      {/* Candidates */}
      <Route 
        path="/candidates" 
        element={
          <CandidateList 
            selectedCandidateId={null} 
            onSelectCandidate={(id) => navigate(`/candidates/${id}`)}
            onNavigateToAddCandidate={() => navigate('/upload-resume')}
          />
        } 
      />
      <Route path="/candidates/:id" element={<CandidateDetailRoute />} />

      {/* Resume Upload */}
      <Route 
        path="/upload-resume" 
        element={<UploadCandidates />} 
      />

      {/* Jobs */}
      <Route 
        path="/jobs" 
        element={
          <JobsListView 
            onSelectJob={(id) => navigate(`/jobs/${id}`)}
            onPostJob={() => navigate('/jobs/new')}
          />
        } 
      />
      <Route path="/jobs/new" element={<PostJobView onBack={() => navigate('/jobs')} />} />
      <Route path="/jobs/:id" element={<JobDetailRoute />} />
      <Route path="/jobs/:jobId/interviews" element={<JobInterviewRoute />} />
      <Route path="/jobs/:jobId/interview/:candidateId" element={<CandidateInterviewRoute />} />

      {/* Other Views */}
      <Route path="/calendar" element={<CalendarView />} />
      <Route path="/analytics" element={<AnalyticsView />} />
      <Route path="/forecast" element={<PredictiveAnalytics />} />
      <Route path="/communication" element={<CommunicationView />} />
      <Route path="/notifications" element={<NotificationsView />} />
      <Route path="/bias" element={<BiasAudit />} />
      <Route path="/settings" element={<Settings />} />

      {/* 404 Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}