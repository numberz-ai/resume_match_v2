import { searchCandidates, type CVSearchCandidate } from './cv.api';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  title: string;
  location: string;
  experience: number;
  matchScore: number;
  status: string;
  avatar: string;
  appliedDate: string;
  education: string;
  skills: string[];
  resumeUrl?: string;
}

// Convert CVSearchCandidate to Candidate format
const convertCVSearchToCandidate = (cvCandidate: CVSearchCandidate): Candidate => {
  return {
    id: cvCandidate.id,
    name: cvCandidate.name,
    email: '', // CV search doesn't return email
    phone: '', // CV search doesn't return phone
    title: cvCandidate.title,
    location: cvCandidate.location,
    experience: cvCandidate.years_of_experience,
    matchScore: cvCandidate.matchScore,
    status: 'new',
    avatar: cvCandidate.profile_image || cvCandidate.image || '',
    appliedDate: new Date().toISOString(),
    education: cvCandidate.profileSummary?.[0] || '',
    skills: cvCandidate.skills || [],
    resumeUrl: undefined,
  };
};

// Public API methods - all use real CV search API
export const candidatesApi = {
  /**
   * Get all candidates by searching with a broad query
   * Note: CV API doesn't have a "list all" endpoint, so we use a broad search
   */
  async getAll(): Promise<Candidate[]> {
    console.log('🌐 [API] Fetching all candidates using CV search API');
    try {
      // Use a broad search query to get all candidates
      const response = await searchCandidates('candidate');
      return response.response_data.map(convertCVSearchToCandidate);
    } catch (error) {
      console.error('❌ [API] Error fetching all candidates:', error);
      // Return empty array on error instead of throwing
      return [];
    }
  },

  /**
   * Get candidate by ID
   * Note: CV API doesn't have a direct get-by-id endpoint, so we search and filter
   */
  async getById(id: string): Promise<Candidate | null> {
    console.log(`🌐 [API] Fetching candidate ${id} using CV search API`);
    try {
      // Search with a broad query and filter by ID
      const response = await searchCandidates('candidate');
      const candidate = response.response_data.find(c => c.id === id);
      return candidate ? convertCVSearchToCandidate(candidate) : null;
    } catch (error) {
      console.error(`❌ [API] Error fetching candidate ${id}:`, error);
      return null;
    }
  },

  /**
   * Search candidates using CV semantic search
   */
  async search(query: string): Promise<Candidate[]> {
    console.log(`🌐 [API] Searching candidates with query: "${query}"`);
    try {
      const response = await searchCandidates(query);
      return response.response_data.map(convertCVSearchToCandidate);
    } catch (error) {
      console.error(`❌ [API] Error searching candidates:`, error);
      // Return empty array on error instead of throwing
      return [];
    }
  },

  /**
   * Update candidate status
   * Note: CV API doesn't support status updates, so this is a no-op for now
   */
  async updateStatus(id: string, status: string): Promise<void> {
    console.log(`⚠️ [API] Status update not supported by CV API. Candidate ${id}, status: ${status}`);
    // CV API doesn't support status updates
    // This would need to be implemented in a separate candidates management API
    return Promise.resolve();
  }
};
