/**
 * Utility functions for managing total candidates count in localStorage
 */

const CANDIDATE_COUNT_KEY = 'totalCandidatesCount';

/**
 * Get the total candidates count from localStorage
 */
export function getTotalCandidatesCount(): number {
  try {
    const count = localStorage.getItem(CANDIDATE_COUNT_KEY);
    return count ? parseInt(count, 10) : 0;
  } catch (error) {
    console.error('Error reading candidate count from localStorage:', error);
    return 0;
  }
}

/**
 * Update the total candidates count in localStorage
 */
export function updateTotalCandidatesCount(count: number): void {
  try {
    localStorage.setItem(CANDIDATE_COUNT_KEY, count.toString());
    // Dispatch a custom event to notify other components
    window.dispatchEvent(new CustomEvent('candidateCountUpdated', { detail: { count } }));
  } catch (error) {
    console.error('Error updating candidate count in localStorage:', error);
  }
}

/**
 * Increment the total candidates count by 1
 */
export function incrementCandidateCount(): void {
  const currentCount = getTotalCandidatesCount();
  updateTotalCandidatesCount(currentCount + 1);
}
