import { shouldUseMock, getBaseUrl } from './config';
import { mockJobs } from '../data/mockData';

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  posted: string;
  status: string;
  applicants: number;
  description?: string;
  requirements?: string[];
  salary?: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Production API calls
const fetchJobsFromAPI = async (): Promise<Job[]> => {
  const response = await fetch(`${getBaseUrl()}/jobs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  
  return response.json();
};

const fetchJobByIdFromAPI = async (id: string): Promise<Job | null> => {
  const response = await fetch(`${getBaseUrl()}/jobs/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  
  return response.json();
};

const createJobAPI = async (jobData: Partial<Job>): Promise<Job> => {
  const response = await fetch(`${getBaseUrl()}/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
    },
    body: JSON.stringify(jobData)
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  
  return response.json();
};

const updateJobAPI = async (id: string, jobData: Partial<Job>): Promise<Job> => {
  const response = await fetch(`${getBaseUrl()}/jobs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
    },
    body: JSON.stringify(jobData)
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  
  return response.json();
};

const deleteJobAPI = async (id: string): Promise<void> => {
  const response = await fetch(`${getBaseUrl()}/jobs/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
};

// Public API methods with granular mock/real switching
export const jobsApi = {
  async getAll(): Promise<Job[]> {
    if (shouldUseMock('jobs', 'getAll')) {
      console.log('📦 [MOCK] Fetching all jobs from mock data');
      await delay(300);
      return mockJobs;
    }
    
    console.log('🌐 [API] Fetching all jobs from real API');
    return fetchJobsFromAPI();
  },

  async getById(id: string): Promise<Job | null> {
    if (shouldUseMock('jobs', 'getById')) {
      console.log(`📦 [MOCK] Fetching job ${id} from mock data`);
      await delay(200);
      return mockJobs.find(j => j.id === id) || null;
    }
    
    console.log(`🌐 [API] Fetching job ${id} from real API`);
    return fetchJobByIdFromAPI(id);
  },

  async create(jobData: Partial<Job>): Promise<Job> {
    if (shouldUseMock('jobs', 'create')) {
      console.log('📦 [MOCK] Creating job with mock data');
      await delay(500);
      const newJob: Job = {
        id: `job-${Date.now()}`,
        title: jobData.title || '',
        department: jobData.department || '',
        location: jobData.location || '',
        type: jobData.type || '',
        posted: new Date().toISOString(),
        status: 'active',
        applicants: 0,
        ...jobData
      };
      mockJobs.unshift(newJob);
      return newJob;
    }
    
    console.log('🌐 [API] Creating job with real API');
    return createJobAPI(jobData);
  },

  async update(id: string, jobData: Partial<Job>): Promise<Job> {
    if (shouldUseMock('jobs', 'update')) {
      console.log(`📦 [MOCK] Updating job ${id} with mock data`);
      await delay(300);
      const jobIndex = mockJobs.findIndex(j => j.id === id);
      if (jobIndex !== -1) {
        mockJobs[jobIndex] = { ...mockJobs[jobIndex], ...jobData };
        return mockJobs[jobIndex];
      }
      throw new Error('Job not found');
    }
    
    console.log(`🌐 [API] Updating job ${id} with real API`);
    return updateJobAPI(id, jobData);
  },

  async delete(id: string): Promise<void> {
    if (shouldUseMock('jobs', 'delete')) {
      console.log(`📦 [MOCK] Deleting job ${id} from mock data`);
      await delay(300);
      const jobIndex = mockJobs.findIndex(j => j.id === id);
      if (jobIndex !== -1) {
        mockJobs.splice(jobIndex, 1);
      }
      return;
    }
    
    console.log(`🌐 [API] Deleting job ${id} with real API`);
    return deleteJobAPI(id);
  }
};
