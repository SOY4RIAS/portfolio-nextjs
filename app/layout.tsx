import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

// Shared imports (Clean Architecture)
import { Header, Footer, ThemeProvider, cn } from '@/shared';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff2",
  variable: "--font-sans",
  weight: "100 900",
  fallback: ["system-ui", "arial"],
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff2",
  variable: "--font-mono",
  weight: "100 900",
  fallback: ["monospace"],
});

export const metadata: Metadata = {
  title: "Santiago Arias | Senior Frontend Developer & Technical Lead",
  description: "Portfolio of Santiago Arias - 8+ years building web & mobile apps with React, Next.js & React Native. Technical Lead with experience managing 30+ developers. AI-first development approach.",
  keywords: ["React", "Next.js", "React Native", "Frontend Developer", "Technical Lead", "TypeScript", "AI Developer", "Team Lead"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://santiagoarias.dev",
    title: "Santiago Arias | Senior Frontend Developer & Technical Lead",
    description: "8+ years building web & mobile apps. React, Next.js & React Native expert. Technical Lead with AI-first development approach.",
    images: [
      {
        url: "https://github.com/soy4rias.png",
        width: 460,
        height: 460,
        alt: "Santiago Arias",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Santiago Arias | Senior Frontend Developer & Technical Lead",
    description: "8+ years building web & mobile apps with React, Next.js & React Native. Technical Lead with AI-first approach.",
    images: ["https://github.com/soy4rias.png"],
    creator: "@soy4rias",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://github.com" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="preconnect" href="https://avatars.githubusercontent.com" />
        <link rel="dns-prefetch" href="https://avatars.githubusercontent.com" />
      </head>
      <body className={cn(geistSans.variable, geistMono.variable, "min-h-screen bg-background font-sans antialiased")}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
