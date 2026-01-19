import { create } from 'zustand';
import { type Job } from '../types';

interface JobsStore {
  jobs: Record<string, Job>; // jobId -> Job data
  activeTab: Record<string, string>; // jobId -> active tab
  setJob: (jobId: string, job: Job) => void;
  getJob: (jobId: string) => Job | null;
  setActiveTab: (jobId: string, tab: string) => void;
  getActiveTab: (jobId: string) => string;
  clearJob: (jobId: string) => void;
  clearAll: () => void;
}

export const useJobsStore = create<JobsStore>((set, get) => ({
  jobs: {},
  activeTab: {},

  setJob: (jobId: string, job: Job) => {
    set((state) => ({
      jobs: {
        ...state.jobs,
        [jobId]: job,
      },
    }));
  },

  getJob: (jobId: string) => {
    const { jobs } = get();
    return jobs[jobId] || null;
  },

  setActiveTab: (jobId: string, tab: string) => {
    set((state) => ({
      activeTab: {
        ...state.activeTab,
        [jobId]: tab,
      },
    }));
  },

  getActiveTab: (jobId: string) => {
    const { activeTab } = get();
    return activeTab[jobId] || 'pipeline';
  },

  clearJob: (jobId: string) => {
    set((state) => {
      const newJobs = { ...state.jobs };
      const newActiveTab = { ...state.activeTab };
      delete newJobs[jobId];
      delete newActiveTab[jobId];
      return {
        jobs: newJobs,
        activeTab: newActiveTab,
      };
    });
  },

  clearAll: () => {
    set({
      jobs: {},
      activeTab: {},
    });
  },
}));
