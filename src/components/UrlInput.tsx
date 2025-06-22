'use client';

import { useState, useCallback } from 'react';
import { isValidUrl, isSupportedPlatform, getPlatformName } from '@/utils/helpers';
import { getVideoInfo, VideoInfo } from '@/lib/api';
import { debounce } from '@/utils/helpers';

interface UrlInputProps {
  onVideoInfo: (videoInfo: VideoInfo) => void;
  onError: (error: string) => void;
  onLoading: (loading: boolean) => void;
}

export default function UrlInput({ onVideoInfo, onError, onLoading }: UrlInputProps) {
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [platform, setPlatform] = useState('');

  // Debounced function to fetch video info
  const debouncedFetchInfo = useCallback(
    debounce(async (url: string) => {
      if (!url || !isValidUrl(url)) return;

      onLoading(true);
      onError('');

      try {
        const result = await getVideoInfo(url);
        
        if (result.success && result.data) {
          onVideoInfo(result.data);
        } else {
          onError(result.error || 'Failed to fetch video information');
        }
      } catch (error) {
        onError('Network error. Please try again.');
      } finally {
        onLoading(false);
      }
    }, 1000) as (url: string) => void,
    [onVideoInfo, onError, onLoading]
  );

  const handleUrlChange = (value: string) => {
    setUrl(value);
    
    if (value) {
      const valid = isValidUrl(value);
      setIsValid(valid);
      
      if (valid) {
        const platformName = getPlatformName(value);
        setPlatform(platformName);
        
        if (isSupportedPlatform(value)) {
          debouncedFetchInfo(value);
        } else {
          onError('This platform is not supported yet.');
        }
      } else {
        setIsValid(false);
        setPlatform('');
        onError('');
      }
    } else {
      setIsValid(false);
      setPlatform('');
      onError('');
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      handleUrlChange(text);
    } catch (error) {
      onError('Failed to read clipboard. Please paste manually.');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* URL Input */}
      <div className="relative">
        <input
          type="url"
          value={url}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder="Paste video URL here (YouTube, Instagram, Facebook, etc.)"
          className={`w-full px-4 py-4 pr-12 text-lg border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${
            isValid 
              ? 'border-green-500 bg-green-50' 
              : url 
                ? 'border-red-500 bg-red-50' 
                : 'border-gray-300 bg-white hover:border-gray-400'
          }`}
        />
        
        {/* Paste Button */}
        <button
          onClick={handlePaste}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-blue-600 transition-colors"
          title="Paste from clipboard"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </button>
      </div>

      {/* Platform Indicator */}
      {platform && (
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>Detected: {platform}</span>
        </div>
      )}

      {/* Supported Platforms */}
      <div className="text-center text-sm text-gray-500">
        <p>Supports: YouTube, Instagram, Facebook, TikTok, Twitter, Vimeo, Dailymotion</p>
      </div>
    </div>
  );
} 