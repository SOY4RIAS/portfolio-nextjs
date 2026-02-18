import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Santiago Arias',
  description:
    'Thoughts on frontend development, AI integration, and software engineering best practices by Santiago Arias.',
  openGraph: {
    title: 'Blog | Santiago Arias',
    description:
      'Thoughts on frontend development, AI integration, and engineering leadership.',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
