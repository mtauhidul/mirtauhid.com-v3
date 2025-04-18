import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import Footer from "./components/footer";
import { Navbar } from "./components/nav";
import { metaData } from "./config";
import "./global.css";

export const metadata: Metadata = {
  metadataBase: new URL(metaData.baseUrl),
  title: {
    default: metaData.title,
    template: `%s | ${metaData.title}`,
  },
  description: metaData.description,
  openGraph: {
    images: [
      {
        url: metaData.ogImage,
        width: 1200,
        height: 630,
        alt: "Mir Tauhidul Islam Portfolio",
      },
    ],
    title: metaData.title,
    description: metaData.description,
    url: metaData.baseUrl,
    siteName: metaData.name,
    locale: "en_US",
    type: "website",
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
  twitter: {
    card: "summary_large_image",
    title: metaData.name,
    description: metaData.description,
    images: [metaData.ogImage],
  },
  alternates: {
    types: {
      "application/rss+xml": "/rss.xml",
      "application/atom+xml": "/atom.xml",
      "application/feed+json": "/feed.json",
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(GeistSans.variable, GeistMono.variable, "dark")}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            // Enforce dark mode
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
          `,
          }}
        />
      </head>
      <body className="antialiased bg-gray-950 text-gray-200 min-h-screen">
        <div className="flex flex-col min-h-screen">
          <div className="flex-1 flex flex-col items-center">
            <main className="w-full max-w-4xl px-5 flex-1">
              <Navbar />
              <div className="min-h-[calc(100vh-300px)]">{children}</div>
              <Footer />
            </main>
          </div>
        </div>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
