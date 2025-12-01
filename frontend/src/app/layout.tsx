import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tech Campus – Formations numériques",
    template: "%s | Tech Campus",
  },
  description: "Programmes Bac+3/Bac+5, actualités et événements du Tech Campus.",
  metadataBase: new URL("https://tech-campus.example.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-slate-50 font-[family-name:var(--font-geist-sans)] text-slate-900 antialiased`}>
        <SiteHeader />
        <main className="mx-auto min-h-screen max-w-6xl space-y-16 px-4 py-12 sm:px-6 lg:px-0 lg:py-16">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
