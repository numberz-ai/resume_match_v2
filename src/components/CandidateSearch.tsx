import { useState, useEffect, useRef } from 'react';
import { searchCandidates, type CVSearchCandidate } from '../api';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, Sparkles, X, Loader2 } from 'lucide-react';

interface CandidateSearchProps {
  onSearchResults?: (results: CVSearchCandidate[], query: string) => void;
  redirectOnSearch?: boolean;
  onNavigateToCandidates?: () => void;
  initialQuery?: string;
}

export function CandidateSearch({ 
  onSearchResults, 
  redirectOnSearch = false,
  onNavigateToCandidates,
  initialQuery = ''
}: CandidateSearchProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  
  // Update search query when initialQuery changes
  useEffect(() => {
    setSearchQuery(initialQuery || '');
  }, [initialQuery]);

  // Cleanup: abort any pending requests on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      if (onSearchResults) {
        onSearchResults([], '');
      }
      return;
    }

    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      console.log('🚫 Cancelling previous search request');
      abortControllerRef.current.abort();
    }

    // Create new AbortController for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    const currentQuery = searchQuery; // Capture current query value

    setIsSearching(true);
    
    try {
      console.log('🔍 Searching candidates with query:', currentQuery);
      const response = await searchCandidates(currentQuery, abortController.signal);
      
      // Check if request was aborted
      if (abortController.signal.aborted) {
        console.log('🚫 Search request was aborted, ignoring results');
        return;
      }
      
      if (response.success && response.response_data) {
        console.log('✅ Search results:', response.response_data);
        
        if (redirectOnSearch && onNavigateToCandidates) {
          // Store search results in sessionStorage for the candidates page
          console.log('📦 Storing search results in sessionStorage');
          sessionStorage.setItem('searchResults', JSON.stringify(response.response_data));
          sessionStorage.setItem('searchQuery', currentQuery);
          console.log('🔄 Navigating to candidates page');
          // Use setTimeout to ensure sessionStorage is written before navigation
          setTimeout(() => {
            onNavigateToCandidates();
          }, 50);
        } else if (onSearchResults) {
          onSearchResults(response.response_data, currentQuery);
        }
      } else {
        // Check if request was aborted before processing
        if (abortController.signal.aborted) {
          return;
        }
        console.warn('⚠️ Search returned no results');
        if (onSearchResults) {
          onSearchResults([], currentQuery);
        }
      }
    } catch (error) {
      // Ignore abort errors
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('🚫 Search was cancelled');
        return;
      }
      console.error('❌ Search error:', error);
      // Only update results if request wasn't aborted
      if (!abortController.signal.aborted && onSearchResults) {
        onSearchResults([], currentQuery);
      }
    } finally {
      // Only update loading state if this is still the current request
      if (abortControllerRef.current === abortController) {
        setIsSearching(false);
        abortControllerRef.current = null;
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    // Instantly trigger default query reload (no loader in search component)
    if (onSearchResults) {
      // Pass empty string for query - parent will handle reloading silently
      onSearchResults([], '');
    }
  };

  const handleQuickSearch = (term: string) => {
    setSearchQuery(term);
    setTimeout(() => {
      handleSearch();
    }, 100);
  };

  return (
    <div className="space-y-3">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search candidates by name, skills, title, or location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pl-9 pr-20 h-9 text-sm bg-white border-border focus:border-primary"
          disabled={isSearching}
        />
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {searchQuery && !isSearching && (
            <button
              onClick={clearSearch}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
            >
              <X className="size-4" />
            </button>
          )}
          <button
            onClick={handleSearch}
            disabled={isSearching || !searchQuery.trim()}
            className="p-1.5 text-muted-foreground hover:text-foreground disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isSearching ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Search className="size-4" />
            )}
          </button>
        </div>
      </div>

      {/* Quick Search Pills */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-muted-foreground self-center mr-1">Quick search:</span>
        {['Machine Learning', 'Senior Developer', 'Python', 'React', 'Leadership', 'Product Designer'].map((term) => (
          <Button
            key={term}
            variant="outline"
            size="sm"
            className="h-7 text-xs hover:bg-muted hover:border-primary/50 transition-colors"
            onClick={() => handleQuickSearch(term)}
            disabled={isSearching}
          >
            {term}
          </Button>
        ))}
      </div>
    </div>
  );
}