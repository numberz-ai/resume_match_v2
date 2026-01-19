import { useState, useEffect } from 'react';
import { candidatesApi, Candidate } from '../api';

export function useCandidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCandidates = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await candidatesApi.getAll();
      setCandidates(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load candidates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCandidates();
  }, []);

  const searchCandidates = async (query: string) => {
    try {
      setLoading(true);
      const data = await candidatesApi.search(query);
      setCandidates(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const updateCandidateStatus = async (id: string, status: string) => {
    try {
      await candidatesApi.updateStatus(id, status);
      await loadCandidates();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  return {
    candidates,
    loading,
    error,
    searchCandidates,
    updateCandidateStatus,
    refreshCandidates: loadCandidates
  };
}

export function useCandidate(id: string) {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCandidate = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await candidatesApi.getById(id);
        setCandidate(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load candidate');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadCandidate();
    }
  }, [id]);

  return { candidate, loading, error };
}
