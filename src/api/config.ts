// Granular API Configuration
// Set each endpoint to true for mock data, false for real API calls

export const API_CONFIG = {
  baseUrl: 'https://api.recruix.com/v1',
  
  // Candidates API
  candidates: {
    getAll: false,          // Candidate listing - REAL API
    search: false,          // Candidate search - REAL API (uses CV API)
    getById: true,          // Candidate details - MOCK DATA
    updateStatus: true,     // Update candidate status - MOCK
    updateNotes: true,      // Update notes - MOCK
  },

  // CV API (Resume Upload & Search)
  cv: {
    upload: false,          // Upload resume - REAL API
    save: false,            // Save resume data - REAL API
    search: false,          // CV semantic search - REAL API
    delete: false,          // Delete candidate - REAL API
    clearAll: false,        // Clear all candidates - REAL API
  },

  // Jobs API
  jobs: {
    getAll: true,           // Jobs listing - MOCK
    getById: true,          // Job details - MOCK
    create: true,           // Create job - MOCK
    update: true,           // Update job - MOCK
    delete: true,           // Delete job - MOCK
    getCandidates: true,    // Get job candidates - MOCK
  },

  // Interviews API
  interviews: {
    getByCandidate: true,   // Get candidate interviews - MOCK
    getByJob: true,         // Get job interviews - MOCK
    getRecordings: true,    // Get recordings - MOCK
    getNotes: true,         // Get notes - MOCK
    addNote: true,          // Add note - MOCK
    updateFeedback: true,   // Update feedback - MOCK
  },

  // Analytics API
  analytics: {
    getDashboard: true,     // Dashboard metrics - MOCK
    getReports: true,       // Reports - MOCK
    getBiasAudit: true,     // Bias audit - MOCK
    getPredictions: true,   // Predictions - MOCK
  },

  // Communication API
  communication: {
    getMessages: true,      // Get messages - MOCK
    sendMessage: true,      // Send message - MOCK
    getTemplates: true,     // Email templates - MOCK
  },

  // Calendar API
  calendar: {
    getEvents: true,        // Get events - MOCK
    createEvent: true,      // Create event - MOCK
    updateEvent: true,      // Update event - MOCK
  },

  // Notifications API
  notifications: {
    getAll: true,           // Get notifications - MOCK
    markAsRead: true,       // Mark as read - MOCK
  }
};

// Helper function to check if an endpoint should use mock data
export const shouldUseMock = (module: keyof typeof API_CONFIG, endpoint: string): boolean => {
  if (module === 'baseUrl') return false;
  const moduleConfig = API_CONFIG[module];
  if (typeof moduleConfig === 'object' && endpoint in moduleConfig) {
    return (moduleConfig as any)[endpoint];
  }
  return true; // Default to mock if not specified
};

// Get the base URL for API calls
export const getBaseUrl = () => API_CONFIG.baseUrl;