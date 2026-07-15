import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YSWS Project Idea Generator",
  description:
    "Don't know what to build for your next YSWS? Let's suggest what you should build for your next YSWS",
  openGraph: {
    type: "website",
    images: "https://az-ysws-idea-generator.vercel.app/project_screenshot.png",
    title: "YSWS Project Idea Generator",
    description:
      "Don't know what to build for your next YSWS? Let's suggest what you should build for your next YSWS",
    url: "https://az-ysws-idea-generator.vercel.app/",
  },
  twitter: {
    images: "https://az-ysws-idea-generator.vercel.app/project_screenshot.png",
    title: "YSWS Project Idea Generator",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
