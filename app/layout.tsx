import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { Metadata, Viewport } from "next";
import Head from "next/head";

const geist = GeistSans;

export const metadata: Metadata = {
  metadataBase: new URL("https://ai.agustinarias.com"),
  title: {
    default: "astnai",
    template: "%s | astnai",
  },
  description: "chat with astnai, your personal ai assistant by agustín arias.",
  openGraph: {
    title: "astnai",
    description:
      "chat with astnai, your personal ai assistant by agustín arias.",
    url: "https://ai.agustinarias.com",
    siteName: "astnai",
    locale: "en_us",
    type: "website",
    images: [
      {
        url: "https://ai.agustinarias.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "astnai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@astnai",
    title: "astnai",
    description:
      "chat with astnai, your personal ai assistant by agustín arias.",
    images: "https://ai.agustinarias.com/images/twitter-image.jpg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://ai.agustinarias.com",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  height: "device-height",
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "agustín arias",
  url: "https://ai.agustinarias.com",
  sameAs: [
    "https://www.linkedin.com/in/astnai",
    "https://twitter.com/astnai",
    "https://github.com/astnai",
    "https://instagram.com/agustnarias",
  ],
  jobTitle: "software engineer",
  worksFor: {
    "@type": "Organization",
    name: "agustín arias",
  },
  description:
    "agustín arias is a software engineer based in buenos aires, originally from patagonia, argentina. he is passionate about web development and ai interaction.",
  image: "https://ai.agustinarias.com/images/profile.jpg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "buenos aires",
    addressRegion: "ba",
    addressCountry: "argentina",
  },
  alumniOf: "self-taught",
  birthPlace: "patagonia, argentina",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="agustín arias" />
        <meta
          name="keywords"
          content="software engineer, buenos aires, ai, web development, patagonia, mate, argentina, technology, san francisco, y combinator, guillermo rauch, sam altman, messi, duki"
        />
        <meta
          name="description"
          content="chat with astnai, your personal ai assistant by agustín arias."
        />
        <meta property="og:title" content="astnai" />
        <meta
          property="og:description"
          content="chat with astnai, your personal ai assistant by agustín arias."
        />
        <meta
          property="og:image"
          content="https://ai.agustinarias.com/images/og-image.jpg"
        />
        <meta property="og:url" content="https://ai.agustinarias.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@astnai" />
        <meta name="twitter:title" content="astnai" />
        <meta
          name="twitter:description"
          content="chat with astnai, your personal ai assistant by agustín arias."
        />
        <meta
          name="twitter:image"
          content="https://ai.agustinarias.com/images/twitter-image.jpg"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://ai.agustinarias.com" />
        <link
          rel="alternate"
          href="https://ai.agustinarias.com"
          hrefLang="en"
        />
        <link
          rel="alternate"
          href="https://ai.agustinarias.com/es"
          hrefLang="es"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
      </Head>
      <body className={`${GeistSans.className} antialiased`}>{children}</body>
    </html>
  );
}
