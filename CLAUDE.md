# CLAUDE.md - Project Context for AI Sessions

## Project Overview

Portfolio website for **Santiago Arias** - Senior Frontend Developer, Technical Lead, and AI-First Engineer with 8+ years of experience. The portfolio showcases AI development capabilities through interactive demonstrations including RAG-powered chat and AI workflow visualizations.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Theme**: next-themes (dark/light mode)
- **Fonts**: Local Geist fonts (GeistVF, GeistMonoVF)

## Architecture

This project follows **Feature-Based Clean Architecture** with Vercel React/Next.js best practices.

### Folder Structure

```
portfolio-nextjs/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page (composes features)
│   ├── blog/               # Blog pages
│   └── globals.css         # Global styles
├── features/               # Feature modules (domain logic)
│   ├── ai/                 # AI feature (chat, workflow, expertise)
│   │   ├── components/     # AIChat, AIWorkflow, AIExpertiseSection
│   │   ├── data/           # ai-expertise.ts, knowledge-base.ts
│   │   ├── lib/            # rag-service.ts
│   │   └── index.ts        # Barrel export
│   ├── experience/         # Work experience feature
│   ├── education/          # Education feature
│   ├── hero/               # Hero section feature
│   └── github/             # GitHub activity (Server Component)
├── shared/                 # Cross-cutting concerns
│   ├── components/
│   │   ├── ui/             # shadcn/ui components
│   │   ├── layout/         # Header, Footer
│   │   └── providers/      # ThemeProvider
│   ├── lib/                # Utilities (cn function)
│   └── index.ts            # Barrel export
└── components.json         # shadcn/ui configuration
```

### Import Conventions

```typescript
// Feature imports
import { AIChat, AIWorkflow } from '@/features/ai';
import { ExperienceSection } from '@/features/experience';

// Shared imports
import { Button, Card, cn } from '@/shared';
import { Header, Footer } from '@/shared';
```

## Key Patterns

### 1. Server Components by Default (Next.js Best Practice)
- Components are Server Components unless they need interactivity
- `'use client'` directive only where required
- Example: `GitHubActivity` is a Server Component with ISR caching

### 2. Event Handlers Over useEffect (React Best Practice 5.7)
- Interaction logic belongs in event handlers, not effects
- Example: Scroll behavior in AIChat is handled in `handleSendMessage`

### 3. Barrel Exports for Encapsulation
- Each feature has an `index.ts` that exports its public API
- Internal implementation details stay private

### 4. Data Separation
- Each feature has a `data/` folder for static data
- Services go in `lib/` folder

## shadcn/ui Configuration

Components are installed to `@/shared/components/ui`. The `components.json` is configured:

```json
{
  "aliases": {
    "components": "@/shared/components",
    "utils": "@/shared/lib/utils",
    "ui": "@/shared/components/ui"
  }
}
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Profile Information

- **Name**: Santiago Arias
- **Title**: Senior Frontend Developer | Technical Lead | AI-First Engineer
- **Experience**: 8+ years, led teams of 30+ developers
- **Current**: BitcoinIRA (Apr 2025 - Present)
- **Previous**: Lean Tech, Rootstrap, Wolox, JIKKOSOFT, Decondux, Crear Publicitarios
- **Expertise**: React, Next.js, React Native, TypeScript, AI Integration
- **GitHub**: SOY4RIAS
- **Email**: me@santiagoarias.dev

## Important Notes

1. **No proficiency levels** on AI skills badges - intentionally removed
2. **Local fonts** - Using local Geist fonts to avoid Google Fonts fetch issues
3. **GitHub API** - Uses ISR with 1-hour revalidation; may fail during build in restricted environments
4. **RAG Chat** - Simulated RAG using keyword matching in `rag-service.ts`

## Legacy Files (Can Be Removed)

The following files in the old structure are superseded by the feature-based architecture:
- `/components/sections/*` - Migrated to `/features/*/components/`
- `/data/resume.ts` - Data distributed to feature modules
- `/lib/github.ts` - Moved to `/features/github/lib/`
- `/lib/utils.ts` - Moved to `/shared/lib/utils.ts`
- `/components/ui/*` - Moved to `/shared/components/ui/`
