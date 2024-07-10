import "./globals.css";
import { GeistSans } from "geist/font/sans";
import Head from "next/head";

const geist = GeistSans;

export const metadata = {
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
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className={geist.className}>{children}</body>
    </html>
  );
}
