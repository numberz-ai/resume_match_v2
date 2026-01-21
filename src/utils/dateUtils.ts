/**
 * Utility functions for date handling to ensure no expired dates are shown
 */

/**
 * Format a date to a readable string (e.g., "Nov 12, 2025")
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Format a date to "Today at HH:MM AM/PM" or "Tomorrow at HH:MM AM/PM" or "Nov 12, 2025"
 */
export function formatDateTime(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const timeStr = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  if (dateOnly.getTime() === today.getTime()) {
    return `Today at ${timeStr}`;
  } else if (dateOnly.getTime() === tomorrow.getTime()) {
    return `Tomorrow at ${timeStr}`;
  } else {
    return `${formatDate(date)} at ${timeStr}`;
  }
}

/**
 * Ensure a date is in the future. If it's expired, return a date 2-5 days from now
 */
export function ensureFutureDate(date: Date, minDaysFromNow: number = 2, maxDaysFromNow: number = 5): Date {
  const now = new Date();
  
  // If the date/time is in the past, generate a future date
  if (date.getTime() < now.getTime()) {
    // Check if it's today but time has passed
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    if (dateOnly.getTime() === today.getTime()) {
      // Same day but time has passed - move to tomorrow with same time
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(date.getHours(), date.getMinutes(), date.getSeconds());
      return tomorrow;
    } else {
      // Different day in the past - generate a random date between minDaysFromNow and maxDaysFromNow days from now
      const daysToAdd = minDaysFromNow + Math.floor(Math.random() * (maxDaysFromNow - minDaysFromNow + 1));
      const futureDate = new Date(today);
      futureDate.setDate(futureDate.getDate() + daysToAdd);
      // Preserve the time from the original date
      futureDate.setHours(date.getHours(), date.getMinutes(), date.getSeconds());
      return futureDate;
    }
  }

  return date;
}

/**
 * Get a date string that's guaranteed to be in the future
 * Returns format like "Nov 12, 2025" or "Today at 2:00 PM" or "Tomorrow at 10:00 AM"
 */
export function getFutureDateString(
  date: Date,
  includeTime: boolean = false,
  minDaysFromNow: number = 2,
  maxDaysFromNow: number = 5
): string {
  const futureDate = ensureFutureDate(date, minDaysFromNow, maxDaysFromNow);
  return includeTime ? formatDateTime(futureDate) : formatDate(futureDate);
}

/**
 * Get a date X days from now
 */
export function getDateDaysFromNow(days: number, time?: { hours: number; minutes: number }): Date {
  const date = new Date();
  date.setDate(date.getDate() + days);
  if (time) {
    date.setHours(time.hours, time.minutes, 0, 0);
  }
  return date;
}
