'use client';

import { useState } from 'react';
import Head from 'next/head';
import UrlInput from '@/components/UrlInput';
import VideoInfo from '@/components/VideoInfo';
import { type VideoInfo as VideoInfoType } from '@/lib/api';

export default function Home() {
  const [videoInfo, setVideoInfo] = useState<VideoInfoType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleVideoInfo = (info: VideoInfoType) => {
    setVideoInfo(info);
    setError('');
    setSuccess('');
  };

  const handleError = (err: string) => {
    setError(err);
    setSuccess('');
  };

  const handleLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  const handleDownload = (filename: string) => {
    setSuccess(`Download completed! File: ${filename}`);
    setError('');
  };

  return (
    <>
      <Head>
        <title>Free Video Downloader - Download YouTube, Instagram, Facebook Videos</title>
        <meta name="description" content="Download videos from YouTube, Instagram, Facebook, TikTok, Twitter, Vimeo and more. Free, fast, and secure video downloader with multiple quality options." />
        <meta name="keywords" content="video downloader, youtube downloader, instagram downloader, facebook downloader, free video download, online video downloader" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Free Video Downloader - Download Videos from Multiple Platforms" />
        <meta property="og:description" content="Download videos from YouTube, Instagram, Facebook, TikTok and more. Free, fast, and secure." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-domain.com" />
        <meta property="og:image" content="https://your-domain.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Video Downloader" />
        <meta name="twitter:description" content="Download videos from multiple platforms for free" />
        <link rel="canonical" href="https://your-domain.com" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Video Downloader</h1>
                  <p className="text-sm text-gray-600">Free & Fast Downloads</p>
                </div>
              </div>
              
              <nav className="hidden md:flex items-center space-x-6">
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
                <a href="#supported" className="text-gray-600 hover:text-gray-900 transition-colors">Supported Sites</a>
                <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Download Videos from
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {' '}Any Platform
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Download videos from YouTube, Instagram, Facebook, TikTok, Twitter, Vimeo, and more. 
              Free, fast, and secure with multiple quality options.
            </p>
            
            {/* URL Input */}
            <UrlInput 
              onVideoInfo={handleVideoInfo}
              onError={handleError}
              onLoading={handleLoading}
            />

            {/* Loading State */}
            {loading && (
              <div className="mt-8 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
                <span className="text-gray-600">Fetching video information...</span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl max-w-2xl mx-auto">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl max-w-2xl mx-auto">
                <p className="text-green-600 text-sm">{success}</p>
              </div>
            )}
          </div>

          {/* Video Info Display */}
          {videoInfo && (
            <VideoInfo 
              videoInfo={videoInfo}
              onDownload={handleDownload}
              onError={handleError}
            />
          )}

          {/* Features Section */}
          <section id="features" className="mt-24">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Why Choose Our Video Downloader?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
                <p className="text-gray-600">Download videos instantly with our optimized servers</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Multiple Formats</h3>
                <p className="text-gray-600">Choose from various video and audio quality options</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">100% Free</h3>
                <p className="text-gray-600">No registration, no fees, no hidden costs</p>
              </div>
            </div>
          </section>

          {/* Supported Platforms */}
          <section id="supported" className="mt-24">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Supported Platforms
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'YouTube', icon: '🎥' },
                { name: 'Instagram', icon: '📷' },
                { name: 'Facebook', icon: '📘' },
                { name: 'TikTok', icon: '🎵' },
                { name: 'Twitter', icon: '🐦' },
                { name: 'Vimeo', icon: '🎬' },
                { name: 'Dailymotion', icon: '📺' },
                { name: 'And More', icon: '➕' }
              ].map((platform) => (
                <div key={platform.name} className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-2">{platform.icon}</div>
                  <p className="font-medium text-gray-900">{platform.name}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Video Downloader</h3>
                <p className="text-gray-400 text-sm">
                  Free online video downloader for multiple platforms. 
                  Download videos quickly and securely.
                </p>
              </div>
              
              <div>
                <h4 className="text-md font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#supported" className="hover:text-white transition-colors">Supported Sites</a></li>
                  <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-md font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="/dmca" className="hover:text-white transition-colors">DMCA</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-md font-semibold mb-4">Contact</h4>
                <p className="text-gray-400 text-sm">
                  Questions? Contact us at<br />
                  <a href="mailto:support@example.com" className="text-blue-400 hover:text-blue-300">
                    support@example.com
                  </a>
                </p>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>&copy; 2024 Video Downloader. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
