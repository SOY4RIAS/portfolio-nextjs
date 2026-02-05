import { z } from 'zod';

/**
 * GitHub Tool: Fetch real-time GitHub activity
 */
export const getGitHubActivity = {
  description: `Get Santiago's recent GitHub activity including repositories and contributions.
Use this tool when asked about:
- Recent projects or repositories
- Open source contributions
- Coding activity
- Technologies used in recent projects`,
  parameters: z.object({
    type: z
      .enum(['repos', 'events'])
      .describe('Type of activity: repos for repositories, events for recent activity'),
    limit: z
      .number()
      .min(1)
      .max(10)
      .optional()
      .describe('Number of items to return'),
  }),
  execute: async (params: { type: 'repos' | 'events'; limit?: number }) => {
    const { type, limit } = params;
    const effectiveLimit = limit ?? 5;

    try {
      const username = 'SOY4RIAS';

      if (type === 'repos') {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=${effectiveLimit}`,
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
              'User-Agent': 'Santiago-Portfolio-Bot',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const repos = await response.json();

        return repos.map((repo: Record<string, unknown>) => ({
          name: repo.name,
          description: repo.description,
          language: repo.language,
          stars: repo.stargazers_count,
          updated: repo.updated_at,
          url: repo.html_url,
        }));
      }

      // Fetch events
      const response = await fetch(
        `https://api.github.com/users/${username}/events/public?per_page=${effectiveLimit}`,
        {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            'User-Agent': 'Santiago-Portfolio-Bot',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const events = await response.json();

      return events.map((event: Record<string, unknown>) => {
        const payload = event.payload as Record<string, unknown> | undefined;
        const commits = payload?.commits as Array<Record<string, unknown>> | undefined;
        const repo = event.repo as Record<string, unknown>;

        return {
          type: (event.type as string).replace('Event', ''),
          repo: repo.name,
          created: event.created_at,
          payload: commits?.[0]?.message,
        };
      });
    } catch (error) {
      console.error('GitHub activity error:', error);
      return [];
    }
  },
};
