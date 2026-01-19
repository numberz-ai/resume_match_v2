import { useNavigate, useLocation } from 'react-router-dom';

export function useNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveView = (): string => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') return 'dashboard';
    if (path.startsWith('/candidates')) return 'candidates';
    if (path.startsWith('/jobs')) return 'jobs';
    if (path === '/calendar') return 'calendar';
    if (path === '/analytics') return 'analytics';
    if (path === '/forecast') return 'forecast';
    if (path === '/communication') return 'communication';
    if (path === '/notifications') return 'notifications';
    if (path === '/bias') return 'bias';
    if (path === '/settings') return 'settings';
    return 'dashboard';
  };

  const navigateToView = (view: string) => {
    const routes: Record<string, string> = {
      dashboard: '/',
      candidates: '/candidates',
      jobs: '/jobs',
      calendar: '/calendar',
      analytics: '/analytics',
      forecast: '/forecast',
      communication: '/communication',
      notifications: '/notifications',
      bias: '/bias',
      settings: '/settings'
    };
    navigate(routes[view] || '/');
  };

  const navigateToCandidate = (id: string) => navigate(`/candidates/${id}`);
  const navigateToJob = (id: string) => navigate(`/jobs/${id}`);
  const navigateToJobInterviews = (jobId: string) => navigate(`/jobs/${jobId}/interviews`);
  const navigateToCandidateInterview = (jobId: string, candidateId: string) => 
    navigate(`/jobs/${jobId}/interview/${candidateId}`);

  return {
    navigate,
    location,
    activeView: getActiveView(),
    navigateToView,
    navigateToCandidate,
    navigateToJob,
    navigateToJobInterviews,
    navigateToCandidateInterview
  };
}
