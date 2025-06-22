export interface VideoFormat {
  id: string;
  ext: string;
  resolution: string;
  filesize: string;
  vcodec: string;
  acodec: string;
  format_note: string;
}

export interface VideoInfo {
  title: string;
  thumbnail: string;
  duration: number;
  formats: VideoFormat[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Fetch video information and available formats
 */
export async function getVideoInfo(url: string): Promise<ApiResponse<VideoInfo>> {
  try {
    const response = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch video information');
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch video information');
    }

    return {
      success: true,
      data: data.videoInfo
    };
  } catch (error) {
    console.error('Error fetching video info:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Download video with specified format
 */
export async function downloadVideo(url: string, formatId?: string): Promise<ApiResponse<{ filename: string }>> {
  try {
    const response = await fetch('/api/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        formatId
      }),
    });

    if (!response.ok) {
      throw new Error('Download failed');
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Download failed');
    }

    return {
      success: true,
      data: { filename: data.filename }
    };
  } catch (error) {
    console.error('Error downloading video:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Group formats by type (video, audio, etc.)
 */
export function groupFormats(formats: VideoFormat[]) {
  const videoFormats = formats.filter(f => f.vcodec !== 'none' && f.vcodec !== 'N/A');
  const audioFormats = formats.filter(f => f.vcodec === 'none' || f.vcodec === 'N/A');
  
  return {
    video: videoFormats,
    audio: audioFormats
  };
}

/**
 * Get best quality format for each type
 */
export function getBestFormats(formats: VideoFormat[]) {
  const { video, audio } = groupFormats(formats);
  
  const bestVideo = video.sort((a, b) => {
    const resA = parseInt(a.resolution.split('x')[0]) || 0;
    const resB = parseInt(b.resolution.split('x')[0]) || 0;
    return resB - resA;
  })[0];

  const bestAudio = audio.sort((a, b) => {
    const sizeA = parseInt(a.filesize.split(' ')[0]) || 0;
    const sizeB = parseInt(b.filesize.split(' ')[0]) || 0;
    return sizeB - sizeA;
  })[0];

  return {
    bestVideo,
    bestAudio
  };
} 