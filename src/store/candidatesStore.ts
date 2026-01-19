import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type CVSearchCandidate } from '../api';

interface FilterState {
  selectedFilter: string;
  locationFilter: string;
  experienceFilter: string;
  skillsFilter: string;
  searchQuery: string;
}

interface CandidatesStore {
  defaultCandidates: CVSearchCandidate[] | null;
  lastFetched: number | null;
  filters: FilterState;
  candidateActiveTab: Record<string, string>; // candidateId -> active tab
  setDefaultCandidates: (candidates: CVSearchCandidate[]) => void;
  getDefaultCandidates: () => CVSearchCandidate[] | null;
  clearCache: () => void;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  setCandidateActiveTab: (candidateId: string, tab: string) => void;
  getCandidateActiveTab: (candidateId: string) => string;
}

// Cache duration: 5 minutes (300000 ms)
const CACHE_DURATION = 5 * 60 * 1000;

const defaultFilters: FilterState = {
  selectedFilter: 'all',
  locationFilter: 'all',
  experienceFilter: 'all',
  skillsFilter: '',
  searchQuery: '',
};

export const useCandidatesStore = create<CandidatesStore>()(
  persist(
    (set, get) => ({
      defaultCandidates: null,
      lastFetched: null,
      filters: defaultFilters,
      candidateActiveTab: {},

      setDefaultCandidates: (candidates: CVSearchCandidate[]) => {
        set({
          defaultCandidates: candidates,
          lastFetched: Date.now(),
        });
      },

      getDefaultCandidates: () => {
        const { defaultCandidates, lastFetched } = get();
        
        // Check if cache is valid
        if (defaultCandidates && lastFetched) {
          const now = Date.now();
          const age = now - lastFetched;
          
          if (age < CACHE_DURATION) {
            console.log('✅ Using cached default candidates (age:', Math.round(age / 1000), 'seconds)');
            return defaultCandidates;
          } else {
            console.log('⏰ Cache expired, will fetch fresh data');
            // Clear expired cache
            set({ defaultCandidates: null, lastFetched: null });
          }
        }
        
        return null;
      },

      clearCache: () => {
        set({
          defaultCandidates: null,
          lastFetched: null,
        });
      },

      setFilters: (newFilters: Partial<FilterState>) => {
        set((state) => ({
          filters: {
            ...state.filters,
            ...newFilters,
          },
        }));
      },

      resetFilters: () => {
        set({
          filters: defaultFilters,
        });
      },

      setCandidateActiveTab: (candidateId: string, tab: string) => {
        set((state) => ({
          candidateActiveTab: {
            ...state.candidateActiveTab,
            [candidateId]: tab,
          },
        }));
      },

      getCandidateActiveTab: (candidateId: string) => {
        const { candidateActiveTab } = get();
        return candidateActiveTab[candidateId] || 'overview';
      },
    }),
    {
      name: 'candidates-store',
      // Only persist filters, not the cache (cache is in-memory only)
      partialize: (state) => ({
        filters: state.filters,
      }),
    }
  )
);
