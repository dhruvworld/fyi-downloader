import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Free Video Downloader - Download YouTube, Instagram, Facebook Videos",
    template: "%s | Video Downloader"
  },
  description: "Download videos from YouTube, Instagram, Facebook, TikTok, Twitter, Vimeo and more. Free, fast, and secure video downloader with multiple quality options.",
  keywords: [
    "video downloader",
    "youtube downloader", 
    "instagram downloader",
    "facebook downloader",
    "tiktok downloader",
    "twitter downloader",
    "vimeo downloader",
    "free video download",
    "online video downloader",
    "video converter",
    "download videos online"
  ],
  authors: [{ name: "Video Downloader Team" }],
  creator: "Video Downloader",
  publisher: "Video Downloader",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://your-domain.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'Free Video Downloader - Download Videos from Multiple Platforms',
    description: 'Download videos from YouTube, Instagram, Facebook, TikTok and more. Free, fast, and secure.',
    siteName: 'Video Downloader',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Video Downloader - Free Online Video Downloader',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Video Downloader',
    description: 'Download videos from multiple platforms for free',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
