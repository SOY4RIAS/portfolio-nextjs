// GitHub Feature - Barrel Export
// Clean Architecture: Single entry point for the GitHub feature

// Components
export { GitHubActivity } from './components/GitHubActivity';

// Lib/Services
export { getRecentGitHubActivity, filterRelevantEvents, GITHUB_USERNAME } from './lib/github';
export type { GitHubEvent } from './lib/github';
