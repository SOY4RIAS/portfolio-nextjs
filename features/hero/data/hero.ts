// Hero Feature - Data
// Clean Architecture: Extracted from component for maintainability

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  github: string;
  linkedin: string;
}

export interface HeroStat {
  label: string;
  value: string;
}

// Animated roles for hero section
export const roles = [
  'Senior Frontend Developer',
  'Technical Lead',
  'React & React Native Expert',
  'AI-First Engineer',
] as const;

// Code snippets for AI demo animation
export const codeSnippets = [
  '> claude "analyze this PR"',
  '> /plan implement auth',
  '> cursor @codebase fix bug',
  '> npm run ai:review',
] as const;

// Hero section stats
export const heroStats: HeroStat[] = [
  { label: 'Years Exp', value: '8+' },
  { label: 'Team Led', value: '30+' },
  { label: 'Companies', value: '7' },
];

// Featured skills badges
export const featuredSkills = [
  'React/Next.js',
  'React Native',
  'Technical Lead',
  'TypeScript',
  'AI-First',
] as const;

// Personal info (subset needed for Hero)
export const personalInfo: PersonalInfo = {
  name: 'Santiago Arias',
  title: 'Senior Frontend Developer | Technical Lead | AI-First Engineer',
  email: 'me@santiagoarias.dev',
  github: 'https://github.com/SOY4RIAS',
  linkedin: 'https://www.linkedin.com/in/csarias/',
};
