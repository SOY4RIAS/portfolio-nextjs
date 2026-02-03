// GitHub Activity - Server Component (Next.js Best Practice: RSC by default)
// No 'use client' directive - this component fetches data on the server

import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';
import { GitCommit, GitPullRequest, Star } from 'lucide-react';
import {
  getRecentGitHubActivity,
  filterRelevantEvents,
  GITHUB_USERNAME,
  type GitHubEvent,
} from '../lib/github';

// Helper functions for event display
function getEventIcon(type: string) {
  switch (type) {
    case 'PushEvent':
      return <GitCommit className="h-4 w-4 text-green-500" />;
    case 'PullRequestEvent':
      return <GitPullRequest className="h-4 w-4 text-purple-500" />;
    case 'WatchEvent':
      return <Star className="h-4 w-4 text-yellow-500" />;
    default:
      return <GitCommit className="h-4 w-4 text-muted-foreground" />;
  }
}

function getActionText(event: GitHubEvent): string {
  switch (event.type) {
    case 'PushEvent':
      return `Pushed ${event.payload.size ?? 0} commit(s) to`;
    case 'PullRequestEvent':
      return 'Opened PR in';
    case 'WatchEvent':
      return 'Starred';
    case 'CreateEvent':
      return 'Created repository';
    default:
      return 'Contributed to';
  }
}

// Server Component - fetches data at request time with ISR caching
export async function GitHubActivity() {
  const events = await getRecentGitHubActivity(GITHUB_USERNAME);
  const displayEvents = filterRelevantEvents(events);

  return (
    <section className="container py-20">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-10">
        <h2 className="text-3xl font-bold tracking-tight">Recent GitHub Activity</h2>
        <Link
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          className="text-sm font-medium hover:underline text-muted-foreground"
        >
          View full profile &rarr;
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {displayEvents.length > 0 ? (
          displayEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground">
            No recent public activity found.
          </div>
        )}
      </div>
    </section>
  );
}

// Sub-component for event cards
function EventCard({ event }: { event: GitHubEvent }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-2 p-4 pb-2 space-y-0">
        {getEventIcon(event.type)}
        <span className="text-xs text-muted-foreground">
          {new Date(event.created_at).toLocaleDateString()}
        </span>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm">
          {getActionText(event)}{' '}
          <Link
            href={`https://github.com/${event.repo.name}`}
            target="_blank"
            className="font-medium text-primary hover:underline break-all"
          >
            {event.repo.name}
          </Link>
        </p>
        {event.type === 'PushEvent' && event.payload.commits?.[0] && (
          <p className="mt-2 text-xs text-muted-foreground truncate">
            &quot;{event.payload.commits[0].message}&quot;
          </p>
        )}
      </CardContent>
    </Card>
  );
}
