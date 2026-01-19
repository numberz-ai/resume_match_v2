import { apiConfig } from './config';

const CV_BASE_URL = 'https://api.dev.numberz.ai/cv';

export interface UploadResumeResponse {
  success: boolean;
  message: string;
  candidate_id: string;
  candidate_created: boolean;
  file_name: string;
  extracted_data: {
    name: string;
    title: string;
    bio: string;
    current_company: string;
    emails: string[];
    skills: string[];
    experience: number;
    location_city: string;
    location_country: string;
    availability: string;
    workPreference: string;
    expectedSalary: number;
    noticePeriod: string | null;
    profileConfidence: number;
    languages: string[];
    portfolio: Record<string, any>;
    education: {
      highest_degree: string;
      degrees: string[];
      schools: string[];
      graduation_year: number | null;
    };
  };
  text_data: any[];
}

export interface SaveResumeDataRequest {
  name: string;
  title: string;
  bio: string;
  current_company: string;
  emails: string[];
  skills: string[];
  experience: number;
  location_city: string;
  location_country: string;
  availability: string;
  workPreference: string;
  expectedSalary: string;
  noticePeriod: string | null;
  profileConfidence: string;
  languages: string[];
  portfolio: string | Record<string, any>;
  education: {
    highest_degree: string;
    degrees: string[];
    schools: string[];
    graduation_year: number | null;
  };
}

export interface SaveResumeDataResponse {
  success: boolean;
  message: string;
  candidate_id: string;
  text_data: any[];
}

export interface CVSearchRequest {
  query: string;
}

export interface CVSearchCandidate {
  id: string;
  name: string;
  title: string;
  location: string;
  image: string;
  skills: string[];
  topSkills: string[];
  profileSummary: string[];
  alsoMatches: string[];
  matchScore: number;
  years_of_experience: number;
  availability: string;
  starred: boolean;
  avg_score: number;
  keyword_score: number;
  vector_score: number;
}

export interface CVSearchResponse {
  success: boolean;
  message: string;
  response_data: CVSearchCandidate[];
}

/**
 * Upload a resume file
 */
export async function uploadResume(file: File): Promise<UploadResumeResponse> {
  console.log('📤 [CV API] Upload Resume Request:', {
    fileName: file.name,
    fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
    fileType: file.type,
    endpoint: `${CV_BASE_URL}/upload`
  });

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${CV_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    console.log('📥 [CV API] Upload Resume Response:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });

    if (!response.ok) {
      throw new Error(`Failed to upload resume: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ [CV API] Upload Resume Data:', data);
    
    return data;
  } catch (error) {
    console.error('❌ [CV API] Upload Resume Error:', error);
    throw error;
  }
}

/**
 * Save or update resume data for a candidate
 */
export async function saveResumeData(
  candidateId: string,
  data: SaveResumeDataRequest
): Promise<SaveResumeDataResponse> {
  console.log('📤 [CV API] Save Resume Data Request:', {
    candidateId,
    endpoint: `${CV_BASE_URL}/save/${candidateId}`,
    data
  });

  try {
    const response = await fetch(`${CV_BASE_URL}/save/${candidateId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('📥 [CV API] Save Resume Data Response:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });

    if (!response.ok) {
      throw new Error(`Failed to save resume data: ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log('✅ [CV API] Save Resume Data:', responseData);
    
    return responseData;
  } catch (error) {
    console.error('❌ [CV API] Save Resume Data Error:', error);
    throw error;
  }
}

/**
 * Search candidates using semantic search
 */
export async function searchCandidates(query: string, signal?: AbortSignal): Promise<CVSearchResponse> {
  console.log('📤 [CV API] Search Candidates Request:', {
    query,
    endpoint: `${CV_BASE_URL}/query`
  });

  try {
    const response = await fetch(`${CV_BASE_URL}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      signal, // Add abort signal to cancel request
    });

    console.log('📥 [CV API] Search Candidates Response:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });

    if (!response.ok) {
      throw new Error(`Failed to search candidates: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ [CV API] Search Candidates Data:', {
      success: data.success,
      message: data.message,
      candidatesFound: data.response_data?.length || 0,
      candidates: data.response_data
    });
    
    return data;
  } catch (error) {
    // Don't log error if request was aborted
    if (error instanceof Error && error.name === 'AbortError') {
      console.log('🚫 [CV API] Search Candidates Request Aborted:', query);
      throw error;
    }
    console.error('❌ [CV API] Search Candidates Error:', error);
    throw error;
  }
}

/**
 * Clear all candidates from the dataset
 */
export async function clearAllCandidates(): Promise<{ success: boolean; message: string }> {
  console.log('📤 [CV API] Clear All Candidates Request:', {
    endpoint: `${CV_BASE_URL}/clear-all`
  });

  try {
    const response = await fetch(`${CV_BASE_URL}/clear-all`, {
      method: 'DELETE',
    });

    console.log('📥 [CV API] Clear All Candidates Response:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });

    if (!response.ok) {
      throw new Error(`Failed to clear candidates: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ [CV API] Clear All Candidates Data:', data);
    
    return data;
  } catch (error) {
    console.error('❌ [CV API] Clear All Candidates Error:', error);
    throw error;
  }
}

/**
 * Delete a specific candidate from the dataset
 */
export async function deleteCandidate(candidateId: string): Promise<{ success: boolean; message: string }> {
  console.log('📤 [CV API] Delete Candidate Request:', {
    candidateId,
    endpoint: `${CV_BASE_URL}/candidate/${candidateId}`
  });

  try {
    const response = await fetch(`${CV_BASE_URL}/candidate/${candidateId}`, {
      method: 'DELETE',
    });

    console.log('📥 [CV API] Delete Candidate Response:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });

    if (!response.ok) {
      throw new Error(`Failed to delete candidate: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ [CV API] Delete Candidate Data:', data);
    
    return data;
  } catch (error) {
    console.error('❌ [CV API] Delete Candidate Error:', error);
    throw error;
  }
}