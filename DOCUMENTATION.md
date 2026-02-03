# Portfolio Architecture

## Overview
This portfolio is built with Next.js 16 (App Router), TypeScript, and Tailwind CSS. It uses Shadcn/UI for components and Framer Motion for animations.

## Directory Structure
- `app/`: Contains the App Router pages and layouts.
  - `page.tsx`: Landing page composing multiple sections.
  - `blog/`: Blog section.
  - `globals.css`: Global styles and theme variables.
- `components/`: React components.
  - `ui/`: Reusable UI primitives (Button, Card, etc.).
  - `layout/`: Header, Footer.
  - `sections/`: Feature-specific sections (Hero, Experience, etc.).
- `data/`: Static data files.
  - `resume.ts`: Centralized CV data.
- `lib/`: Utilities.
  - `github.ts`: GitHub API fetcher.
  - `utils.ts`: Tailwind class merger.

## Key Features
- **Server Components**: Used for fetching GitHub data (`GitHubActivity`) to reduce client bundle size and improve SEO.
- **Dynamic Content**: Experience and AI skills are mapped from `data/resume.ts` for easy updates.
- **Animations**: Sections animate on scroll using Framer Motion.
- **Theme**: Black and white base with vibrant accents controlled via CSS variables in `globals.css`.

## Data Sources
1.  **Resume**: Edit `data/resume.ts` to update personal info, experience, and skills.
2.  **GitHub**: Activity is fetched automatically from the public GitHub API.

## Customization
To change the color theme, modify the CSS variables in `app/globals.css`.
