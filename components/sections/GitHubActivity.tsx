import { getRecentGitHubActivity } from '@/lib/github';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GitCommit, GitPullRequest, Star } from 'lucide-react';
import Link from 'next/link';

export async function GitHubActivity() {
  const username = 'SOY4RIAS';
  const events = await getRecentGitHubActivity(username);

  // Filter for push, pull request, and watch events
  const displayEvents = events
    .filter(event =>
      ['PushEvent', 'PullRequestEvent', 'WatchEvent', 'CreateEvent'].includes(event.type)
    )
    .slice(0, 5);

  const getIcon = (type: string) => {
    switch (type) {
      case 'PushEvent': return <GitCommit className="h-4 w-4 text-green-500" />;
      case 'PullRequestEvent': return <GitPullRequest className="h-4 w-4 text-purple-500" />;
      case 'WatchEvent': return <Star className="h-4 w-4 text-yellow-500" />;
      default: return <GitCommit className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getActionText = (event: any) => {
     switch (event.type) {
      case 'PushEvent':
        return `Pushed ${event.payload.size} commit(s) to`;
      case 'PullRequestEvent':
        return `Opened PR in`;
      case 'WatchEvent':
        return `Starred`;
      case 'CreateEvent':
        return `Created repository`;
      default:
        return `Contributed to`;
    }
  };

  return (
    <section className="container py-20">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-10">
        <h2 className="text-3xl font-bold tracking-tight">Recent GitHub Activity</h2>
        <Link
          href={`https://github.com/${username}`}
          target="_blank"
          className="text-sm font-medium hover:underline text-muted-foreground"
        >
          View full profile &rarr;
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {displayEvents.length > 0 ? (
          displayEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center gap-2 p-4 pb-2 space-y-0">
                {getIcon(event.type)}
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
                     "{event.payload.commits[0].message}"
                   </p>
                )}
              </CardContent>
            </Card>
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
