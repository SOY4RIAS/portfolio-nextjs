import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

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
  title: "Santiago Arias | AI-Augmented Full Stack Developer",
  description: "Portfolio of Santiago Arias - 8+ years building production apps with React/Next.js. Expert in AI-assisted development with Claude Code, RAG strategies, and custom slash commands.",
  keywords: ["Next.js", "React", "AI Developer", "Claude Code", "RAG", "TypeScript", "Tailwind CSS", "Full Stack", "Team Lead"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://santiagoarias.dev",
    title: "Santiago Arias | AI-Augmented Full Stack Developer",
    description: "8+ years of experience. Expert in React/Next.js and AI-assisted development. See interactive demos of RAG, slash commands, and AI workflows.",
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
    title: "Santiago Arias | AI-Augmented Full Stack Developer",
    description: "8+ years building production apps. Expert in AI-assisted development with Claude Code, RAG, and custom slash commands.",
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
