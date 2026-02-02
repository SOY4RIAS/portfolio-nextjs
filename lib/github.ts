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
  payload: any;
  created_at: string;
}

export async function getRecentGitHubActivity(username: string): Promise<GitHubEvent[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/events/public?per_page=10`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error('Failed to fetch GitHub data:', res.statusText);
      return [];
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching GitHub activity:', error);
    return [];
  }
}
