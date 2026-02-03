// GitHub Feature - API Service
// Clean Architecture: Data fetching isolated in lib layer

export interface GitHubEvent {
  id: string;
  type: string;
  actor: {
    login: string;
    avatar_url: string;
  };
  repo: {
    name: string;
    url: string;
  };
  payload: {
    size?: number;
    commits?: Array<{ message: string }>;
  };
  created_at: string;
}

// GitHub username - centralized configuration
export const GITHUB_USERNAME = 'SOY4RIAS';

/**
 * Fetches recent public GitHub activity for a user.
 * Uses Next.js fetch with revalidation for optimal caching.
 */
export async function getRecentGitHubActivity(username: string = GITHUB_USERNAME): Promise<GitHubEvent[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=10`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
        // Next.js 15: Use revalidate for ISR caching (1 hour)
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.error('Failed to fetch GitHub data:', res.statusText);
      return [];
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching GitHub activity:', error);
    return [];
  }
}

// Helper to filter relevant event types
export const RELEVANT_EVENT_TYPES = [
  'PushEvent',
  'PullRequestEvent',
  'WatchEvent',
  'CreateEvent',
] as const;

export function filterRelevantEvents(events: GitHubEvent[], limit = 5): GitHubEvent[] {
  return events
    .filter((event) => RELEVANT_EVENT_TYPES.includes(event.type as typeof RELEVANT_EVENT_TYPES[number]))
    .slice(0, limit);
}
