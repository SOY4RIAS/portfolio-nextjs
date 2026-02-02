# Deployment Instructions

## Vercel (Recommended)
1.  Push this repository to GitHub.
2.  Import the project in Vercel.
3.  The build command `next build` and install command `npm install` (or `npm install --legacy-peer-deps` if needed) should be detected automatically.
4.  Deploy.

## GitHub Token (Optional but Recommended)
To increase the rate limit for fetching GitHub activity, you can add a GitHub Token.
1.  Create a Personal Access Token on GitHub (no scopes needed for public data).
2.  Add it to your Vercel Environment Variables as `GITHUB_TOKEN`.
3.  Update `lib/github.ts` to use this token in the Authorization header if desired (currently configured for public access without token).

## Manual Deployment
1.  Run `npm install`.
2.  Run `npm run build`.
3.  Run `npm start`.
