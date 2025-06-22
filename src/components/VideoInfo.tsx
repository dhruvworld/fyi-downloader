'use client';

import { useState } from 'react';
import { VideoFormat, downloadVideo, groupFormats, getBestFormats, type VideoInfo } from '@/lib/api';
import { formatDuration } from '@/utils/helpers';

interface VideoInfoProps {
  videoInfo: VideoInfo;
  onDownload: (filename: string) => void;
  onError: (error: string) => void;
}

export default function VideoInfo({ videoInfo, onDownload, onError }: VideoInfoProps) {
  const [downloading, setDownloading] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<string>('');
  
  const { video, audio } = groupFormats(videoInfo.formats);
  const { bestVideo, bestAudio } = getBestFormats(videoInfo.formats);

  const handleDownload = async (formatId?: string) => {
    setDownloading(true);
    onError('');

    try {
      const result = await downloadVideo(videoInfo.title, formatId);
      
      if (result.success && result.data) {
        onDownload(result.data.filename);
      } else {
        onError(result.error || 'Download failed');
      }
    } catch (error) {
      onError('Network error. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handleFormatSelect = (formatId: string) => {
    setSelectedFormat(formatId);
    handleDownload(formatId);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Video Details */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Thumbnail */}
          {videoInfo.thumbnail && (
            <div className="flex-shrink-0">
              <img
                src={videoInfo.thumbnail}
                alt={videoInfo.title}
                className="w-full md:w-64 h-48 object-cover rounded-lg"
              />
            </div>
          )}
          
          {/* Video Info */}
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 line-clamp-2">
              {videoInfo.title}
            </h2>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              {videoInfo.duration > 0 && (
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {formatDuration(videoInfo.duration)}
                </span>
              )}
              <span>{videoInfo.formats.length} formats available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Download Buttons */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Download</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bestVideo && (
            <button
              onClick={() => handleDownload(bestVideo.id)}
              disabled={downloading}
              className="flex items-center justify-center p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Best Video ({bestVideo.resolution})
            </button>
          )}
          
          {bestAudio && (
            <button
              onClick={() => handleDownload(bestAudio.id)}
              disabled={downloading}
              className="flex items-center justify-center p-4 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              Best Audio ({bestAudio.ext.toUpperCase()})
            </button>
          )}
        </div>
      </div>

      {/* All Formats */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">All Available Formats</h3>
        
        {/* Video Formats */}
        {video.length > 0 && (
          <div className="mb-6">
            <h4 className="text-md font-medium text-gray-700 mb-3">Video Formats</h4>
            <div className="grid gap-2">
              {video.map((format) => (
                <button
                  key={format.id}
                  onClick={() => handleFormatSelect(format.id)}
                  disabled={downloading}
                  className="flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-900">
                      {format.resolution}
                    </span>
                    <span className="text-xs text-gray-500">
                      {format.ext.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {format.filesize}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Audio Formats */}
        {audio.length > 0 && (
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-3">Audio Formats</h4>
            <div className="grid gap-2">
              {audio.map((format) => (
                <button
                  key={format.id}
                  onClick={() => handleFormatSelect(format.id)}
                  disabled={downloading}
                  className="flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-900">
                      Audio Only
                    </span>
                    <span className="text-xs text-gray-500">
                      {format.ext.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {format.filesize}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Loading State */}
      {downloading && (
        <div className="flex items-center justify-center p-4 bg-blue-50 rounded-xl">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
          <span className="text-blue-600">Downloading...</span>
        </div>
      )}
    </div>
  );
} 