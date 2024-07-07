import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata, Viewport } from "next";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Argento - Your Guide to Argentina",
  description:
    "Discover the wonders of Argentina with Argento, your AI travel companion.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#f0f9ff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} antialiased bg-gradient-to-br from-neutral-50 to-white text-neutral-900 flex flex-col min-h-screen`}
      >
        <main className="flex-grow flex items-center justify-center p-4 sm:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
