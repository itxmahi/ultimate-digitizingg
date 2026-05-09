import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ultimate Digitizing | Premium Embroidery Marketplace",
  description: "The world's most advanced marketplace for embroidery digitizing and custom stitching services.",
};

import Providers from "@/components/providers/SessionProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased selection:bg-primary/30 overflow-x-hidden relative`}>
        {/* Global Cinematic Background Infrastructure */}
        <div className="fixed inset-0 pointer-events-none -z-10 bg-[#020617]">
          <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[180px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[900px] h-[900px] bg-blue-500/10 rounded-full blur-[200px] animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:100px_100px]" />
        </div>

        <Providers>
          <Navbar />
          <main className="min-h-screen pt-20 relative">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
