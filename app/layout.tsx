import "./styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { Metadata } from "next";

const geistSans = GeistSans;

export const metadata: Metadata = {
  title: "astnai | assistant project",
  description: "your personalized assistant for all things agustín arias",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={geistSans.className}>{children}</body>
    </html>
  );
}
