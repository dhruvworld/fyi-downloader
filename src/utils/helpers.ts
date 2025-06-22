/**
 * Utility functions for the Video Downloader application
 */

/**
 * Validates if a string is a valid URL
 */
export function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

/**
 * Extracts domain from URL for display purposes
 */
export function getDomainFromUrl(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return domain.replace('www.', '');
  } catch {
    return 'Unknown';
  }
}

/**
 * Formats duration from seconds to MM:SS or HH:MM:SS
 */
export function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return '0:00';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Debounce function to limit API calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Sanitizes filename for safe download
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[<>:"/\\|?*]/g, '_')
    .replace(/\s+/g, '_')
    .substring(0, 255);
}

/**
 * Generates a unique ID for tracking downloads
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Checks if URL is from a supported platform
 */
export function isSupportedPlatform(url: string): boolean {
  const supportedDomains = [
    'youtube.com',
    'youtu.be',
    'instagram.com',
    'facebook.com',
    'fb.com',
    'tiktok.com',
    'twitter.com',
    'x.com',
    'vimeo.com',
    'dailymotion.com'
  ];

  try {
    const domain = new URL(url).hostname.replace('www.', '');
    return supportedDomains.some(supported => domain.includes(supported));
  } catch {
    return false;
  }
}

/**
 * Gets platform name from URL
 */
export function getPlatformName(url: string): string {
  const domain = getDomainFromUrl(url);
  
  if (domain.includes('youtube')) return 'YouTube';
  if (domain.includes('instagram')) return 'Instagram';
  if (domain.includes('facebook') || domain.includes('fb')) return 'Facebook';
  if (domain.includes('tiktok')) return 'TikTok';
  if (domain.includes('twitter') || domain.includes('x.com')) return 'Twitter';
  if (domain.includes('vimeo')) return 'Vimeo';
  if (domain.includes('dailymotion')) return 'Dailymotion';
  
  return 'Unknown Platform';
} 