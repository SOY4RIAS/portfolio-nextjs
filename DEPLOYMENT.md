# Deployment Instructions

## Vercel (Recommended)
1.  Push this repository to GitHub.
2.  Import the project in Vercel.
3.  Vercel should automatically detect `bun.lock` and use Bun for installation and building.
4.  If not detected, override the Install Command to `bun install` and Build Command to `bun run build`.
5.  Deploy.

## GitHub Token (Optional but Recommended)
To increase the rate limit for fetching GitHub activity, you can add a GitHub Token.
1.  Create a Personal Access Token on GitHub (no scopes needed for public data).
2.  Add it to your Vercel Environment Variables as `GITHUB_TOKEN`.
3.  Update `lib/github.ts` to use this token in the Authorization header if desired (currently configured for public access without token).

## Manual Deployment
1.  Ensure [Bun](https://bun.sh) is installed.
2.  Run `bun install`.
3.  Run `bun run build`.
4.  Run `bun start`.
