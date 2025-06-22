'use client';

import { useState } from 'react';
import { getFormats } from '@/lib/getFormats';

interface Format {
  id: string;
  ext: string;
  resolution: string;
  filesize: string;
}

export default function LinkInput() {
  const [url, setUrl] = useState('');
  const [formats, setFormats] = useState<Format[]>([]);
  const [selectedFormat, setSelectedFormat] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUrlChange = async (value: string) => {
    setUrl(value);
    setError('');
    setSuccess('');
    setFormats([]);
    setSelectedFormat('');

    if (value && isValidUrl(value)) {
      setLoading(true);
      try {
        const formatsData = await getFormats(value);
        setFormats(formatsData);
      } catch {
        setError('Failed to fetch available formats');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDownload = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          format: selectedFormat || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(`Download completed! File: ${data.filename}`);
        setUrl('');
        setFormats([]);
        setSelectedFormat('');
      } else {
        setError(data.error || 'Download failed');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* URL Input */}
      <div className="space-y-2">
        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
          Enter URL
        </label>
        <input
          id="url"
          type="url"
          value={url}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={loading}
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">Loading formats...</span>
        </div>
      )}

      {/* Format Selection */}
      {formats.length > 0 && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Select Format
          </label>
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Best quality (auto)</option>
            {formats.map((format) => (
              <option key={format.id} value={format.id}>
                {format.ext} - {format.resolution} - {format.filesize}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Download Button */}
      <button
        onClick={handleDownload}
        disabled={loading || !url}
        className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Downloading...' : 'Download'}
      </button>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-600 text-sm">{success}</p>
        </div>
      )}
    </div>
  );
} 