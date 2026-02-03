import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Santiago Arias | Senior Frontend Developer & AI Specialist",
  description: "Portfolio of Santiago Arias, a Senior Frontend Developer specializing in Next.js, React, and AI integration. Expert in building high-performance, intelligent web applications.",
  keywords: ["Next.js", "React", "Frontend Developer", "AI Engineer", "TypeScript", "Tailwind CSS", "Vercel"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://santiagoarias.dev",
    title: "Santiago Arias | Senior Frontend Developer",
    description: "Senior Frontend Developer & AI Specialist. View my work and experience.",
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
    title: "Santiago Arias | Senior Frontend Developer",
    description: "Senior Frontend Developer & AI Specialist.",
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
      <body className={cn(inter.variable, spaceGrotesk.variable, "min-h-screen bg-background font-sans antialiased")}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
          <GrainOverlay />
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
