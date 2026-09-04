import type { Metadata } from "next";
import { Manrope, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import GrainOverlay from "@/components/GrainOverlay";
import AnimatedBackground from "@/components/AnimatedBackground";
import CodeBackground from "@/components/CodeBackground";
import { profile } from "@/lib/data";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description:
    "Personal portfolio — projects, skills, and what I'm currently learning.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${manrope.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        <ThemeProvider>
          <AnimatedBackground />
          <CodeBackground />
          <GrainOverlay />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
